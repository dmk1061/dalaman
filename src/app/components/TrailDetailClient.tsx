"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaBookOpen,
  FaChevronRight,
  FaClock,
  FaCompass,
  FaExclamationCircle,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaMountain,
  FaRoute,
} from 'react-icons/fa';
import type {
  DetailedTrailGuideCopy,
  LocaleCode,
  TrailStage,
} from '@/lib/trekking-data';
import Trail3DViewer from './Trail3DViewer';
import TrailElevationProfile, { type ProfileWaypointItem } from './TrailElevationProfile';

interface RawTrailTrackData {
  id: string;
  osmRelationId: number;
  attribution: string;
  totalKm: number;
  sogukSuBranchKm: number;
  elevationGainM: number;
  elevationLossM: number;
  minElevationM: number;
  maxElevationM: number;
  points: [number, number, number, number][];
  sideBranchSogukSu: [number, number, number][];
  waypoints: {
    id: 'start' | 'ridge' | 'saddle' | 'junction' | 'cove-descent' | 'headland' | 'finish';
    pointIndex: number;
    lon: number;
    lat: number;
    ele: number;
    km: number;
    segmentMinutesFromPrev: number;
  }[];
}

interface TrailDetailClientProps {
  locale: LocaleCode;
  stage: TrailStage;
  guide: DetailedTrailGuideCopy;
  track: RawTrailTrackData;
  nearbyStages: TrailStage[];
}

const STAT_LABELS: Record<
  LocaleCode,
  {
    dist: string;
    gain: string;
    loss: string;
    peak: string;
    time: string;
    kmUnit: string;
    mUnit: string;
    hourUnit: string;
    openMap: string;
    waypointsStrip: string;
  }
> = {
  ru: {
    dist: 'Дистанция',
    gain: 'Набор высоты',
    loss: 'Спуск',
    peak: 'Высшая точка',
    time: 'Время',
    kmUnit: 'км',
    mUnit: 'м',
    hourUnit: 'ч.',
    openMap: 'Открыть в Google Maps',
    waypointsStrip: 'Контрольные точки на карте и профиле:',
  },
  en: {
    dist: 'Distance',
    gain: 'Ascent',
    loss: 'Descent',
    peak: 'Peak',
    time: 'Duration',
    kmUnit: 'km',
    mUnit: 'm',
    hourUnit: 'h',
    openMap: 'Open in Google Maps',
    waypointsStrip: 'Interactive checkpoints:',
  },
  de: {
    dist: 'Distanz',
    gain: 'Aufstieg',
    loss: 'Abstieg',
    peak: 'Gipfel',
    time: 'Dauer',
    kmUnit: 'km',
    mUnit: 'm',
    hourUnit: 'Std.',
    openMap: 'In Google Maps öffnen',
    waypointsStrip: 'Wegpunkte 1–7:',
  },
  tr: {
    dist: 'Mesafe',
    gain: 'Tırmanış',
    loss: 'İniş',
    peak: 'Zirve',
    time: 'Süre',
    kmUnit: 'km',
    mUnit: 'm',
    hourUnit: 'sa.',
    openMap: 'Google Haritalar’da aç',
    waypointsStrip: 'Kontrol noktaları 1–7:',
  },
};

export default function TrailDetailClient({
  locale,
  stage,
  guide,
  track,
  nearbyStages,
}: TrailDetailClientProps) {
  const [activeWaypointIdx, setActiveWaypointIdx] = useState<number | null>(null);
  const stats = STAT_LABELS[locale] || STAT_LABELS.en;

  const localizedWaypoints: ProfileWaypointItem[] = useMemo(
    () =>
      track.waypoints.map((wp) => {
        const copy = guide.waypointLabels[wp.id];
        return {
          ...wp,
          title: copy.title,
          shortLabel: copy.shortLabel,
          note: copy.note,
        };
      }),
    [guide.waypointLabels, track.waypoints]
  );

  const stageTitle = stage.title[locale] || stage.title.en;

  return (
    <div className="space-y-10">
      {/* 1. Magazine Top Spread: TREK ESSENTIALS Box + Hero Photo */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Razzetti-style TREK ESSENTIALS Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-slate-900 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300">
                {guide.essentialsTitle}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-600 text-white">
                TREK {String(stage.trekNumber).padStart(2, '0')}
              </span>
            </div>

            <div className="p-5 sm:p-6 divide-y divide-slate-200/80">
              {guide.essentials.map((row) => (
                <div key={row.label} className="py-2.5 first:pt-0 last:pb-0">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-cyan-700 mb-0.5">
                    {row.label}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantitative Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-4 bg-slate-50 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block">{stats.dist}</span>
              <strong className="text-slate-900 font-extrabold text-sm">
                {track.totalKm} {stats.kmUnit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">{stats.gain}</span>
              <strong className="text-cyan-700 font-extrabold text-sm">
                +{track.elevationGainM} {stats.mUnit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">{stats.loss}</span>
              <strong className="text-rose-600 font-extrabold text-sm">
                −{track.elevationLossM} {stats.mUnit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">{stats.peak}</span>
              <strong className="text-slate-900 font-extrabold text-sm">
                {track.maxElevationM} {stats.mUnit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">{stats.time}</span>
              <strong className="text-slate-900 font-extrabold text-sm inline-flex items-center gap-1">
                <FaClock className="text-cyan-600" /> {stage.durationHours} {stats.hourUnit}
              </strong>
            </div>
          </div>
        </div>

        {/* Right: Leading Trail Photo & Intro Quote */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="relative h-64 sm:h-80 lg:flex-1 min-h-[260px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-900">
            <Image
              src={stage.image}
              alt={stageTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white text-xs">
              <span className="inline-flex items-center gap-1.5 bg-slate-900/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-semibold">
                <FaMapMarkerAlt className="text-cyan-300" />
                {stage.startPoint[locale] || stage.startPoint.en}
              </span>
              <a
                href={stage.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded-full font-bold transition-colors"
              >
                <FaExternalLinkAlt size={10} /> {stats.openMap}
              </a>
            </div>
          </div>

          <blockquote className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm border-l-4 border-l-cyan-600 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            {guide.introQuote}
          </blockquote>
        </div>
      </section>

      {/* 2. Interactive Atlas Block: Live 3D Bird's-Eye Map + Synchronized Elevation Profile */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-badge mb-1.5">
              <FaMountain /> OSM RELATION #{track.osmRelationId} + COPERNICUS DEM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {guide.mapSectionTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
            {guide.mapSectionSubtitle}
          </p>
        </div>

        {/* Checkpoint Quick Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-1">{stats.waypointsStrip}</span>
          {localizedWaypoints.map((wp, idx) => {
            const isSelected = activeWaypointIdx === idx;
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => setActiveWaypointIdx(idx)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-400 hover:text-cyan-700'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] inline-flex items-center justify-center font-extrabold ${
                    isSelected ? 'bg-white text-cyan-700' : 'bg-slate-900 text-white'
                  }`}
                >
                  {idx + 1}
                </span>
                <span>{wp.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <Trail3DViewer
          trailId={track.id}
          trailName={stageTitle}
          points={track.points}
          sideBranchSogukSu={track.sideBranchSogukSu}
          waypoints={localizedWaypoints}
          activeWaypointIdx={activeWaypointIdx}
          onSelectWaypoint={(idx) => setActiveWaypointIdx(idx)}
          mapsUrl={stage.mapsUrl}
          attribution={track.attribution}
          locale={locale}
        />

        <TrailElevationProfile
          points={track.points}
          waypoints={localizedWaypoints}
          activeWaypointIdx={activeWaypointIdx}
          onSelectWaypoint={(idx) => setActiveWaypointIdx(idx)}
          locale={locale}
        />
      </section>

      {/* 3. Magazine Narrative + Boxed Pace Note + Photo Trio */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Narrative Columns */}
        <div className="lg:col-span-8 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FaBookOpen className="text-cyan-600" /> {guide.narrativeTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.narrativeSegments.map((seg, idx) => (
              <article
                key={seg.title}
                className="portal-card p-5 sm:p-6 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold border border-cyan-200/70">
                      0{idx + 1} · {seg.distanceRange}
                    </span>
                    <span className="text-xs font-bold text-slate-500 inline-flex items-center gap-1">
                      <FaClock className="text-cyan-600" /> {seg.duration}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2 leading-snug">
                    {seg.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{seg.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: Razzetti Boxed Callout (PACE) & Mini Photo Gallery */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-extrabold uppercase tracking-widest mb-2.5">
              <FaExclamationCircle /> {guide.paceBoxTitle}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {guide.paceBoxBody}
            </p>
          </div>

          <div className="portal-card p-4 sm:p-5 space-y-3.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {guide.galleryTitle}
            </h3>
            <div className="space-y-3">
              {guide.gallery.map((photo) => (
                <figure key={photo.src} className="space-y-1.5">
                  <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-xs text-slate-600 font-medium leading-snug">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* 4. REGION DIRECTORY (3-Column Practical Logistics Spread) */}
      <section className="bg-white rounded-2xl border-2 border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="eyebrow-badge mb-1">
              <FaCompass /> REGION DIRECTORY
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {guide.directoryTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">{guide.directorySubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guide.directory.map((group) => (
            <div
              key={group.title}
              className="rounded-xl bg-slate-50 p-5 border border-slate-200/70 space-y-3.5"
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900 border-b border-slate-200 pb-2">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label} className="text-xs leading-relaxed">
                    <strong className="block text-cyan-800 font-bold mb-0.5">{item.label}</strong>
                    <span className="text-slate-600 font-medium">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Nearby Trails Interlinking & Back to Atlas */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FaRoute className="text-cyan-600" /> {guide.relatedTitle}
          </h2>
          <Link
            href={`/${locale}/routes/trekking`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            <FaArrowLeft size={10} /> {guide.backToAtlas}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearbyStages.map((near) => (
            <Link
              key={near.id}
              href={`/${locale}/routes/trekking#trek-${near.id}`}
              className="portal-card p-4 flex flex-col justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-cyan-700 mb-1.5">
                  <span>TREK {String(near.trekNumber).padStart(2, '0')}</span>
                  <span>
                    {near.distanceKm} {stats.kmUnit} · +{near.elevationGainM} {stats.mUnit}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug mb-1">
                  {near.title[locale] || near.title.en}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {near.subtitle[locale] || near.subtitle.en}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700">
                <span>{guide.backToAtlas}</span> <FaChevronRight size={9} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
