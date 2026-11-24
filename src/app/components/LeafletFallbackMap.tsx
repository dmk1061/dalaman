"use client";

import React, { useEffect, useRef, useState } from 'react';
import type LType from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaExternalLinkAlt, FaMapMarkedAlt, FaRedo } from 'react-icons/fa';

export interface LeafletMarkerItem {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  label: string;
  title: string;
  color: string;
  borderColor?: string;
  minWidth?: number;
  height?: number;
  paddingX?: number;
  fontSize?: number;
  visible?: boolean;
  dimmed?: boolean;
  active?: boolean;
  activeRingColor?: string;
  popupHtml: string;
}

export interface LeafletPolylineItem {
  id: string;
  coordinates: [number, number][]; // [lng, lat][]
  color: string;
  weight?: number;
  dashArray?: string;
  casingColor?: string;
  casingWeight?: number;
  casingOpacity?: number;
}

export interface LeafletCameraTarget {
  nonce: number;
  mode: 'flyTo' | 'fitBounds';
  center?: [number, number]; // [lng, lat]
  zoom?: number; // MapLibre zoom scale
  bounds?: [[number, number], [number, number]]; // [[minLng, minLat], [maxLng, maxLat]]
  maxZoom?: number; // MapLibre zoom scale
}

interface LeafletFallbackMapProps {
  baseLayer: 'satellite' | 'topo';
  initialCenter: [number, number]; // [lng, lat]
  initialZoom: number; // MapLibre zoom scale
  minZoom?: number; // MapLibre zoom scale
  maxZoom?: number; // MapLibre zoom scale
  cameraTarget?: LeafletCameraTarget | null;
  markers: LeafletMarkerItem[];
  activePopupId?: string | null;
  popupNonce?: number;
  onSelectMarker?: (id: string) => void;
  polylines?: LeafletPolylineItem[];
  userLocation?: [number, number] | null; // [lng, lat]
  heightClassName?: string;
  fallbackBadgeText?: string;
  retry3dLabel?: string;
  onRetry3d?: () => void;
  emergencyMapsUrl?: string;
  emergencyMapsLabel?: string;
  emergencyTitle?: string;
  emergencyDesc?: string;
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toLatLng([lng, lat]: [number, number]): [number, number] {
  return [lat, lng];
}

// MapLibre uses 512px tile scale; Leaflet uses 256px tile scale (+1 zoom offset)
function toLeafletZoom(maplibreZoom: number, minZ: number, maxZ: number): number {
  const minLeaflet = minZ + 1;
  const maxLeaflet = Math.min(18, maxZ + 1);
  return Math.min(maxLeaflet, Math.max(minLeaflet, maplibreZoom + 1));
}

function buildMarkerIconHtml(item: LeafletMarkerItem): { html: string; width: number; height: number } {
  const height = item.height ?? 28;
  const paddingX = item.paddingX ?? 0;
  const minWidth = item.minWidth ?? 28;
  const fontSize = item.fontSize ?? 11;
  const width = Math.max(minWidth, item.label.length * 7 + paddingX * 2 + 8);

  const visible = item.visible !== false;
  const dimmed = Boolean(item.dimmed);
  const active = Boolean(item.active);

  const boxShadow = active
    ? `0 0 0 4px ${item.activeRingColor ?? 'rgba(103, 232, 249, 0.75)'}, 0 6px 16px rgba(0,0,0,0.5)`
    : dimmed
    ? 'none'
    : '0 4px 12px rgba(0,0,0,0.45)';

  const transform = dimmed ? 'scale(0.82)' : active ? 'scale(1.24)' : 'scale(1)';

  const style = [
    'width:100%',
    `height:${height}px`,
    `padding:0 ${paddingX}px`,
    'border-radius:9999px',
    `background:${item.color}`,
    'color:#ffffff',
    `border:2.5px solid ${item.borderColor ?? '#ffffff'}`,
    `font-size:${fontSize}px`,
    'font-weight:800',
    'cursor:pointer',
    `display:${visible ? 'flex' : 'none'}`,
    'align-items:center',
    'justify-content:center',
    'line-height:1',
    'white-space:nowrap',
    `opacity:${dimmed ? '0.18' : '1'}`,
    `pointer-events:${dimmed || !visible ? 'none' : 'auto'}`,
    `transform:${transform}`,
    `box-shadow:${boxShadow}`,
    'transition:transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease',
  ].join(';');

  const html = `<button type="button" title="${escapeAttr(item.title)}" style="${style}">${escapeAttr(
    item.label
  )}</button>`;

  return { html, width, height };
}

export default function LeafletFallbackMap({
  baseLayer,
  initialCenter,
  initialZoom,
  minZoom = 5,
  maxZoom = 17,
  cameraTarget,
  markers,
  activePopupId,
  popupNonce = 0,
  onSelectMarker,
  polylines,
  userLocation,
  heightClassName = 'h-[380px] sm:h-[430px]',
  fallbackBadgeText,
  retry3dLabel,
  onRetry3d,
  emergencyMapsUrl,
  emergencyMapsLabel,
  emergencyTitle,
  emergencyDesc,
}: LeafletFallbackMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LType.Map | null>(null);
  const leafletRef = useRef<typeof LType | null>(null);
  const esriLayerRef = useRef<LType.TileLayer | null>(null);
  const topoLayerRef = useRef<LType.TileLayer | null>(null);
  const polylineGroupRef = useRef<LType.LayerGroup | null>(null);
  const markerMapRef = useRef<Map<string, LType.Marker>>(new Map());
  const userMarkerRef = useRef<LType.Marker | null>(null);
  const lastCameraNonceRef = useRef<number | null>(null);

  const onSelectMarkerRef = useRef(onSelectMarker);
  onSelectMarkerRef.current = onSelectMarker;

  const initialViewRef = useRef({ initialCenter, initialZoom, minZoom, maxZoom });

  const [isReady, setIsReady] = useState(false);
  const [leafletError, setLeafletError] = useState(false);

  // Initialize Leaflet map instance once
  useEffect(() => {
    let isCancelled = false;
    let mapInstance: LType.Map | null = null;
    let resizeObserver: ResizeObserver | null = null;
    const markerMap = markerMapRef.current;

    async function initLeaflet() {
      const el = containerRef.current;
      if (!el) return;

      try {
        const mod = await import('leaflet');
        const L = ((mod as any).default || mod) as typeof LType;
        if (isCancelled || !containerRef.current) return;

        // Protect against StrictMode double-mount on the same DOM container
        if ((el as any)._leaflet_id) {
          delete (el as any)._leaflet_id;
        }

        const {
          initialCenter: initCenter,
          initialZoom: initZoom,
          minZoom: minZ,
          maxZoom: maxZ,
        } = initialViewRef.current;

        leafletRef.current = L;
        mapInstance = L.map(el, {
          center: toLatLng(initCenter),
          zoom: toLeafletZoom(initZoom, minZ, maxZ),
          minZoom: minZ + 1,
          maxZoom: Math.min(18, maxZ + 1),
          zoomSnap: 0.25,
          zoomDelta: 0.5,
          zoomControl: false,
          attributionControl: false,
        });

        L.control.zoom({ position: 'topright' }).addTo(mapInstance);

        esriLayerRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { maxNativeZoom: 17, maxZoom: 18 }
        );
        topoLayerRef.current = L.tileLayer(
          'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          { subdomains: ['a', 'b', 'c'], maxNativeZoom: 17, maxZoom: 18 }
        );

        polylineGroupRef.current = L.layerGroup().addTo(mapInstance);
        mapRef.current = mapInstance;
        setIsReady(true);

        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(() => {
            try {
              mapInstance?.invalidateSize({ animate: false });
            } catch {
              // ignore resize errors during teardown
            }
          });
          resizeObserver.observe(el);
        }

        requestAnimationFrame(() => {
          if (!isCancelled) {
            try {
              mapInstance?.invalidateSize({ animate: false });
            } catch {
              // ignore
            }
          }
        });
      } catch (err) {
        console.warn('[LeafletFallbackMap] Failed to initialize Leaflet:', err);
        if (!isCancelled) {
          setLeafletError(true);
        }
      }
    }

    initLeaflet();

    return () => {
      isCancelled = true;
      resizeObserver?.disconnect();
      markerMap.clear();
      polylineGroupRef.current = null;
      userMarkerRef.current = null;
      esriLayerRef.current = null;
      topoLayerRef.current = null;
      lastCameraNonceRef.current = null;
      if (mapInstance) {
        mapInstance.remove();
      }
      mapRef.current = null;
      leafletRef.current = null;
      setIsReady(false);
    };
  }, []);

  // Synchronize base tile layer (satellite vs topo)
  useEffect(() => {
    const map = mapRef.current;
    const esri = esriLayerRef.current;
    const topo = topoLayerRef.current;
    if (!isReady || !map || !esri || !topo) return;

    if (baseLayer === 'topo') {
      if (map.hasLayer(esri)) map.removeLayer(esri);
      if (!map.hasLayer(topo)) topo.addTo(map);
    } else {
      if (map.hasLayer(topo)) map.removeLayer(topo);
      if (!map.hasLayer(esri)) esri.addTo(map);
    }
  }, [baseLayer, isReady]);

  // Synchronize markers and popups
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!isReady || !map || !L) return;

    const existingMap = markerMapRef.current;
    const incomingIds = new Set(markers.map((m) => m.id));

    Array.from(existingMap.entries()).forEach(([id, marker]) => {
      if (!incomingIds.has(id)) {
        marker.remove();
        existingMap.delete(id);
      }
    });

    markers.forEach((item) => {
      const { html, width, height } = buildMarkerIconHtml(item);
      const icon = L.divIcon({
        className: 'dalaman-leaflet-marker',
        html,
        iconSize: [width, height],
        iconAnchor: [width / 2, height / 2],
      });
      const zIndexOffset = item.active ? 500 : item.dimmed ? -100 : 100;
      const latLng = toLatLng(item.coordinates);

      const existing = existingMap.get(item.id);
      if (existing) {
        existing.setLatLng(latLng);
        existing.setIcon(icon);
        existing.setZIndexOffset(zIndexOffset);
        if (existing.getPopup()) {
          existing.setPopupContent(item.popupHtml);
        } else {
          existing.bindPopup(item.popupHtml, {
            maxWidth: 290,
            offset: [0, -14],
            closeButton: true,
          });
        }
      } else {
        const marker = L.marker(latLng, { icon, zIndexOffset }).addTo(map);
        marker.bindPopup(item.popupHtml, {
          maxWidth: 290,
          offset: [0, -14],
          closeButton: true,
        });
        marker.on('click', () => {
          onSelectMarkerRef.current?.(item.id);
        });
        existingMap.set(item.id, marker);
      }
    });
  }, [markers, isReady]);

  // Synchronize active popup open/close state
  useEffect(() => {
    const map = mapRef.current;
    if (!isReady || !map) return;

    if (!activePopupId) {
      map.closePopup();
      return;
    }

    const marker = markerMapRef.current.get(activePopupId);
    if (marker && !marker.isPopupOpen()) {
      marker.openPopup();
    }
  }, [activePopupId, popupNonce, isReady]);

  // Synchronize polylines
  useEffect(() => {
    const L = leafletRef.current;
    const group = polylineGroupRef.current;
    if (!isReady || !L || !group) return;

    group.clearLayers();
    (polylines ?? []).forEach((line) => {
      if (line.coordinates.length < 2) return;
      const latLngs = line.coordinates.map(toLatLng);
      const weight = line.weight ?? 3;

      if (line.casingColor) {
        L.polyline(latLngs, {
          color: line.casingColor,
          weight: line.casingWeight ?? weight + 2,
          opacity: line.casingOpacity ?? 0.85,
          lineCap: 'round',
          lineJoin: 'round',
          interactive: false,
        }).addTo(group);
      }

      L.polyline(latLngs, {
        color: line.color,
        weight,
        opacity: 1,
        dashArray: line.dashArray,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false,
      }).addTo(group);
    });
  }, [polylines, isReady]);

  // Synchronize optional user GPS location badge
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!isReady || !map || !L) return;

    if (!userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      return;
    }

    const latLng = toLatLng(userLocation);
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(latLng);
      return;
    }

    const icon = L.divIcon({
      className: 'dalaman-leaflet-marker',
      html: `<div style="padding:4px 8px;border-radius:9999px;background:#2563eb;color:#ffffff;border:2.5px solid #ffffff;font-size:10px;font-weight:900;line-height:1;text-align:center;box-shadow:0 0 0 5px rgba(37,99,235,0.35), 0 4px 12px rgba(0,0,0,0.45);">YOU</div>`,
      iconSize: [42, 24],
      iconAnchor: [21, 12],
    });

    userMarkerRef.current = L.marker(latLng, {
      icon,
      zIndexOffset: 600,
      interactive: false,
    }).addTo(map);
  }, [userLocation, isReady]);

  // Synchronize camera flyTo / fitBounds
  useEffect(() => {
    const map = mapRef.current;
    if (!isReady || !map || !cameraTarget) return;
    if (lastCameraNonceRef.current === cameraTarget.nonce) return;
    lastCameraNonceRef.current = cameraTarget.nonce;

    if (cameraTarget.mode === 'flyTo' && cameraTarget.center && typeof cameraTarget.zoom === 'number') {
      map.flyTo(
        toLatLng(cameraTarget.center),
        toLeafletZoom(cameraTarget.zoom, minZoom, maxZoom),
        { duration: 0.75 }
      );
    } else if (cameraTarget.mode === 'fitBounds' && cameraTarget.bounds) {
      map.fitBounds(
        [toLatLng(cameraTarget.bounds[0]), toLatLng(cameraTarget.bounds[1])],
        {
          padding: [48, 48],
          maxZoom: toLeafletZoom(cameraTarget.maxZoom ?? 11.4, minZoom, maxZoom),
          animate: true,
        }
      );
    }
  }, [cameraTarget, isReady, minZoom, maxZoom]);

  if (leafletError) {
    return (
      <div
        className={`${heightClassName} flex flex-col items-center justify-center p-6 text-center bg-slate-900/95 space-y-3`}
      >
        <FaMapMarkedAlt className="text-4xl text-cyan-400" />
        {emergencyTitle && <p className="font-bold text-sm text-white">{emergencyTitle}</p>}
        {emergencyDesc && <p className="text-xs text-slate-400 max-w-md">{emergencyDesc}</p>}
        {emergencyMapsUrl && (
          <a
            href={emergencyMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white"
          >
            <FaExternalLinkAlt size={10} /> {emergencyMapsLabel || 'Google Maps'}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={`relative z-0 isolate w-full ${heightClassName} bg-slate-950 overflow-hidden`}>
      <div ref={containerRef} className="dalaman-leaflet-container w-full h-full bg-slate-950" />

      {fallbackBadgeText && (
        <div className="absolute bottom-3 right-3 z-[1000] flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-200 shadow-lg">
          <span>{fallbackBadgeText}</span>
          {onRetry3d && retry3dLabel && (
            <button
              type="button"
              onClick={onRetry3d}
              className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold transition-colors"
            >
              <FaRedo size={9} /> {retry3dLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
