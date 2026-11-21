// SOURCE [21.11.2026]: Единый серверный реестр 15 маршрутов OpenStreetMap (ODbL)
// и высотных профилей Copernicus DEM (https://api.open-meteo.com/v1/elevation).

import type {
  DetailedTrailGuideCopy,
  LocaleCode,
  RawTrailTrackData,
} from '@/lib/trekking-data';

import { ZONE01_GUIDES } from './zone01-datca-bozburun';
import { ZONE02_GUIDES } from './zone02-dalyan-gocek';
import { ZONE03_GUIDES } from './zone03-fethiye-oludeniz';
import { ZONE04_GUIDES } from './zone04-patara-kas';

import track01 from '@/lib/trails/carian-datca-domuzcukuru.json';
import track02 from '@/lib/trails/carian-palamutbuku-knidos.json';
import track03 from '@/lib/trails/carian-turunc-amos-kumlubuk.json';
import track04 from '@/lib/trails/carian-taslica-phoenix-loryma.json';
import track05 from '@/lib/trails/dalyan-kaunos-radar.json';
import track06 from '@/lib/trails/gocek-kapidag-lydae.json';
import track07 from '@/lib/trails/kayakoy-oludeniz.json';
import track08 from '@/lib/trails/ovacik-faralya.json';
import track09 from '@/lib/trails/faralya-kabak.json';
import track10 from '@/lib/trails/kabak-alinca.json';
import track11 from '@/lib/trails/saklikent-canyon.json';
import track12 from '@/lib/trails/patara-delikkemer-kalkan.json';
import track13 from '@/lib/trails/kalkan-bezirgan-saribelen.json';
import track14 from '@/lib/trails/kas-limanagzi-ufakdere.json';
import track15 from '@/lib/trails/kas-ucagiz-simena-kekova.json';

const ALL_GUIDES: Record<string, Record<LocaleCode, DetailedTrailGuideCopy>> = {
  ...ZONE01_GUIDES,
  ...ZONE02_GUIDES,
  ...ZONE03_GUIDES,
  ...ZONE04_GUIDES,
};

function normalizeTrackJson(raw: any): RawTrailTrackData {
  // Normalize kayakoy-oludeniz sideBranchSogukSu into unified sideBranch shape
  const sideBranch = raw.sideBranch
    ? {
        id: String(raw.sideBranch.id),
        distanceKm: Number(raw.sideBranch.distanceKm),
        points: raw.sideBranch.points as [number, number, number][],
      }
    : Array.isArray(raw.sideBranchSogukSu) && raw.sideBranchSogukSu.length > 1
    ? {
        id: 'soguk-su-cove',
        distanceKm: Number(raw.sogukSuBranchKm ?? 1.7),
        points: raw.sideBranchSogukSu as [number, number, number][],
      }
    : undefined;

  return {
    id: String(raw.id),
    osmRelationId: raw.osmRelationId ?? null,
    attribution: String(raw.attribution),
    totalKm: Number(raw.totalKm),
    elevationGainM: Number(raw.elevationGainM),
    elevationLossM: Number(raw.elevationLossM),
    minElevationM: Number(raw.minElevationM),
    maxElevationM: Number(raw.maxElevationM),
    points: raw.points as [number, number, number, number][],
    ...(sideBranch ? { sideBranch } : {}),
    waypoints: raw.waypoints.map((w: any) => ({
      id: String(w.id),
      pointIndex: Number(w.pointIndex),
      lon: Number(w.lon),
      lat: Number(w.lat),
      ele: Number(w.ele),
      km: Number(w.km),
      segmentMinutesFromPrev: Number(w.segmentMinutesFromPrev),
      ...(w.isPeak ? { isPeak: true } : {}),
    })),
  };
}

const ALL_TRACKS: Record<string, RawTrailTrackData> = {
  'carian-datca-domuzcukuru': normalizeTrackJson(track01),
  'carian-palamutbuku-knidos': normalizeTrackJson(track02),
  'carian-turunc-amos-kumlubuk': normalizeTrackJson(track03),
  'carian-taslica-phoenix-loryma': normalizeTrackJson(track04),
  'dalyan-kaunos-radar': normalizeTrackJson(track05),
  'gocek-kapidag-lydae': normalizeTrackJson(track06),
  'kayakoy-oludeniz': normalizeTrackJson(track07),
  'ovacik-faralya': normalizeTrackJson(track08),
  'faralya-kabak': normalizeTrackJson(track09),
  'kabak-alinca': normalizeTrackJson(track10),
  'saklikent-canyon': normalizeTrackJson(track11),
  'patara-delikkemer-kalkan': normalizeTrackJson(track12),
  'kalkan-bezirgan-saribelen': normalizeTrackJson(track13),
  'kas-limanagzi-ufakdere': normalizeTrackJson(track14),
  'kas-ucagiz-simena-kekova': normalizeTrackJson(track15),
};

export function getDetailedTrailGuide(
  slug: string,
  locale: LocaleCode
): DetailedTrailGuideCopy | null {
  const bySlug = ALL_GUIDES[slug];
  if (!bySlug) return null;
  return bySlug[locale] || bySlug.en || null;
}

export function getTrailTrackData(slug: string): RawTrailTrackData | null {
  return ALL_TRACKS[slug] || null;
}
