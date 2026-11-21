"use client";

import React from 'react';
import { FaClock, FaMountain, FaRoute } from 'react-icons/fa';
import type { LocaleCode } from '@/lib/trekking-data';

export interface ProfileWaypointItem {
  id: string;
  pointIndex: number;
  lon: number;
  lat: number;
  ele: number;
  km: number;
  segmentMinutesFromPrev: number;
  title: string;
  shortLabel: string;
  note: string;
}

interface TrailElevationProfileProps {
  points: [number, number, number, number][];
  waypoints: ProfileWaypointItem[];
  activeWaypointIdx: number | null;
  onSelectWaypoint: (idx: number) => void;
  locale: LocaleCode;
}

const UI_COPY: Record<
  LocaleCode,
  {
    heading: string;
    peakLabel: string;
    distLabel: string;
    mUnit: string;
    kmUnit: string;
    minUnit: string;
    timeAxisLabel: string;
    hint: string;
  }
> = {
  ru: {
    heading: 'Профиль высот и расчётное время по отрезкам',
    peakLabel: 'Высшая точка',
    distLabel: 'Дистанция',
    mUnit: 'м',
    kmUnit: 'км',
    minUnit: 'мин',
    timeAxisLabel: 'Время отрезка:',
    hint: 'Нажмите на любую точку 1–7 на графике, чтобы подлететь к ней на 3D-карте',
  },
  en: {
    heading: 'Elevation Profile & Segment Walking Times',
    peakLabel: 'Highest point',
    distLabel: 'Distance',
    mUnit: 'm',
    kmUnit: 'km',
    minUnit: 'min',
    timeAxisLabel: 'Segment time:',
    hint: 'Click any waypoint 1–7 on the profile to fly the 3D camera there',
  },
  de: {
    heading: 'Höhenprofil & Gehzeiten je Abschnitt',
    peakLabel: 'Höchster Punkt',
    distLabel: 'Distanz',
    mUnit: 'm',
    kmUnit: 'km',
    minUnit: 'Min.',
    timeAxisLabel: 'Gehzeit:',
    hint: 'Klicken Sie auf einen Punkt 1–7, um ihn in der 3D-Ansicht anzufliegen',
  },
  tr: {
    heading: 'Rakım Profili ve Etap Süreleri',
    peakLabel: 'En yüksek nokta',
    distLabel: 'Mesafe',
    mUnit: 'm',
    kmUnit: 'km',
    minUnit: 'dk',
    timeAxisLabel: 'Etap süresi:',
    hint: '3D haritada odaklanmak için grafikteki 1–7 duraklarına tıklayın',
  },
};

export default function TrailElevationProfile({
  points,
  waypoints,
  activeWaypointIdx,
  onSelectWaypoint,
  locale,
}: TrailElevationProfileProps) {
  const t = UI_COPY[locale] || UI_COPY.en;

  const totalKm = points.length > 0 ? points[points.length - 1][3] : 5.3;
  const maxEleRaw = points.reduce((acc, p) => Math.max(acc, p[2]), 0);
  const maxY = Math.max(300, Math.ceil((maxEleRaw + 25) / 50) * 50);
  const minY = 0;

  // SVG coordinate space
  const svgW = 980;
  const svgH = 330;
  const padLeft = 64;
  const padRight = 56;
  const padTop = 58;
  const chartBottom = 226;
  const chartW = svgW - padLeft - padRight;
  const chartH = chartBottom - padTop;

  const xForKm = (km: number) => padLeft + (km / (totalKm || 1)) * chartW;
  const yForEle = (ele: number) =>
    chartBottom - ((ele - minY) / (maxY - minY || 1)) * chartH;

  const polylinePts = points
    .map((p) => `${xForKm(p[3]).toFixed(1)},${yForEle(p[2]).toFixed(1)}`)
    .join(' ');

  const areaPath =
    points.length > 0
      ? `M ${xForKm(points[0][3]).toFixed(1)},${chartBottom} ` +
        points.map((p) => `L ${xForKm(p[3]).toFixed(1)},${yForEle(p[2]).toFixed(1)}`).join(' ') +
        ` L ${xForKm(points[points.length - 1][3]).toFixed(1)},${chartBottom} Z`
      : '';

  const gridLevels: number[] = [];
  for (let e = 0; e <= maxY; e += 50) {
    gridLevels.push(e);
  }

  const activeWp = activeWaypointIdx !== null ? waypoints[activeWaypointIdx] : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header strip */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-500/25" />
          <h3 className="text-sm font-bold tracking-tight">{t.heading}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-semibold">
          <span className="inline-flex items-center gap-1.5">
            <FaMountain className="text-cyan-400" />
            {t.peakLabel}: <strong className="text-white">{maxEleRaw} {t.mUnit}</strong>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaRoute className="text-cyan-400" />
            {t.distLabel}: <strong className="text-white">{totalKm.toFixed(1)} {t.kmUnit}</strong>
          </span>
        </div>
      </div>

      {/* Horizontal Scrollable SVG Chart */}
      <div className="p-3 sm:p-5 overflow-x-auto bg-gradient-to-b from-slate-50/70 to-white">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full min-w-[740px] h-auto select-none"
          role="img"
          aria-label={t.heading}
        >
          <defs>
            <linearGradient id="trailElevFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.34" />
              <stop offset="65%" stopColor="#0e7490" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Horizontal Elevation Gridlines */}
          {gridLevels.map((lvl) => {
            const y = yForEle(lvl);
            const isBase = lvl === 0;
            return (
              <g key={lvl}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgW - padRight}
                  y2={y}
                  stroke={isBase ? '#64748b' : '#cbd5e1'}
                  strokeWidth={isBase ? 1.4 : 1}
                  strokeDasharray={isBase ? undefined : '4 4'}
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fontWeight="700"
                  fill="#475569"
                >
                  {lvl} {t.mUnit}
                </text>
              </g>
            );
          })}

          {/* Vertical Drop Lines for Waypoints */}
          {waypoints.map((wp, idx) => {
            const x = xForKm(wp.km);
            const y = yForEle(wp.ele);
            const isSelected = activeWaypointIdx === idx;
            return (
              <line
                key={`drop-${wp.id}`}
                x1={x}
                y1={y}
                x2={x}
                y2={288}
                stroke={isSelected ? '#0891b2' : '#94a3b8'}
                strokeWidth={isSelected ? 1.8 : 1}
                strokeDasharray="3 3"
                opacity={isSelected ? 0.95 : 0.55}
              />
            );
          })}

          {/* Terrain Fill & Red Trail Line */}
          {areaPath && <path d={areaPath} fill="url(#trailElevFill)" />}
          {polylinePts && (
            <polyline
              fill="none"
              stroke="#dc2626"
              strokeWidth={3.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylinePts}
            />
          )}

          {/* Segment Timing Strip (Razzetti Style) */}
          <g>
            <text
              x={padLeft - 10}
              y={263}
              textAnchor="end"
              fontSize="10"
              fontWeight="700"
              fill="#64748b"
            >
              {t.timeAxisLabel}
            </text>

            {waypoints.map((wp, idx) => {
              if (idx === 0) return null;
              const prev = waypoints[idx - 1];
              const x1 = xForKm(prev.km);
              const x2 = xForKm(wp.km);
              const segW = Math.max(1, x2 - x1);
              const midX = (x1 + x2) / 2;
              const segKm = Math.max(0.1, +(wp.km - prev.km).toFixed(1));
              const isHighlighted = activeWaypointIdx === idx || activeWaypointIdx === idx - 1;

              return (
                <g
                  key={`seg-${wp.id}`}
                  onClick={() => onSelectWaypoint(idx)}
                  className="cursor-pointer"
                >
                  <rect
                    x={x1}
                    y={240}
                    width={segW}
                    height={44}
                    fill={
                      isHighlighted
                        ? '#cffafe'
                        : idx % 2 === 1
                        ? '#f1f5f9'
                        : '#e2e8f0'
                    }
                    stroke="#cbd5e1"
                    strokeWidth={1}
                  />
                  <text
                    x={midX}
                    y={259}
                    textAnchor="middle"
                    fontSize={segW < 58 ? '10' : '11.5'}
                    fontWeight="800"
                    fill="#0f172a"
                  >
                    {wp.segmentMinutesFromPrev} {t.minUnit}
                  </text>
                  <text
                    x={midX}
                    y={275}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="600"
                    fill="#475569"
                  >
                    {segKm} {t.kmUnit}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Km axis ticks */}
          {waypoints.map((wp) => {
            const x = xForKm(wp.km);
            return (
              <text
                key={`km-${wp.id}`}
                x={x}
                y={306}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#64748b"
              >
                {wp.km.toFixed(1)} {t.kmUnit}
              </text>
            );
          })}

          {/* Interactive Waypoint Nodes & Staggered Labels */}
          {waypoints.map((wp, idx) => {
            const x = xForKm(wp.km);
            const y = yForEle(wp.ele);
            const isSelected = activeWaypointIdx === idx;
            const isPeak = wp.id === 'ridge';

            // Stagger label offsets to prevent collisions on close points (3.52 km & 3.85 km)
            const placeBelow = wp.id === 'cove-descent';
            const labelAnchor = idx === 0 ? 'start' : idx === waypoints.length - 1 ? 'end' : 'middle';
            const labelX =
              idx === 0 ? x + 4 : idx === waypoints.length - 1 ? x - 4 : wp.id === 'cove-descent' ? x - 10 : wp.id === 'headland' ? x + 10 : x;
            const labelY = placeBelow ? y + 24 : y - 16;

            return (
              <g
                key={wp.id}
                onClick={() => onSelectWaypoint(idx)}
                className="cursor-pointer group"
              >
                {/* Invisible generous hit target */}
                <circle cx={x} cy={y} r={18} fill="transparent" />

                {isSelected && (
                  <circle cx={x} cy={y} r={12} fill="#0891b2" opacity={0.22} />
                )}

                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 7.5 : isPeak ? 6.5 : 5.5}
                  fill={isSelected ? '#0891b2' : '#ffffff'}
                  stroke={isSelected ? '#0f172a' : '#dc2626'}
                  strokeWidth={2.5}
                />

                {/* Label pill/text */}
                <text
                  x={labelX}
                  y={labelY - 12}
                  textAnchor={labelAnchor}
                  fontSize="11"
                  fontWeight="800"
                  fill={isSelected ? '#0e7490' : '#0f172a'}
                >
                  {idx + 1}. {wp.shortLabel}
                </text>
                <text
                  x={labelX}
                  y={labelY + 1}
                  textAnchor={labelAnchor}
                  fontSize="10"
                  fontWeight="700"
                  fill={isPeak ? '#dc2626' : '#64748b'}
                >
                  {wp.ele} {t.mUnit}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer note / Selected Waypoint Strip */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        {activeWp ? (
          <div className="flex flex-wrap items-center gap-2 text-slate-800">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-600 text-white text-[11px] font-bold">
              {(activeWaypointIdx ?? 0) + 1}
            </span>
            <strong className="font-bold">{activeWp.title}</strong>
            <span className="text-slate-500">
              ({activeWp.km.toFixed(2)} {t.kmUnit} · {activeWp.ele} {t.mUnit})
            </span>
            <span className="text-slate-600">— {activeWp.note}</span>
          </div>
        ) : (
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <FaClock className="text-cyan-600" /> {t.hint}
          </span>
        )}
      </div>
    </div>
  );
}
