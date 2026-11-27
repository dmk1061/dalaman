export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type NatureZoneId =
  | 'gokova-marmaris'
  | 'koycegiz-dalyan'
  | 'dalaman-gocek'
  | 'oludeniz-valleys'
  | 'saklikent-patara';

export type NaturePointKind =
  | 'national-park'
  | 'turtle-reserve'
  | 'canyon-river'
  | 'lake-mountain';

export type NatureProfileFilterId =
  | 'all'
  | 'reserves'
  | 'canyons-rivers'
  | 'parks-lagoons';

export interface NatureZonePreset {
  id: NatureZoneId;
  code: string;
  coordinates: [number, number]; // [lon, lat]
  zoom: number;
  pitch: number;
  bearing: number;
  title: LocalizedText;
  subtitle: LocalizedText;
}

export interface NatureMapPoint {
  id: string;
  zoneId: NatureZoneId;
  kind: NaturePointKind;
  coordinates: [number, number]; // [lon, lat]
  statusBadge: LocalizedText;
  focusLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  note: LocalizedText;
  mapsUrl: string;
}

export interface NatureParkProfile {
  id: string;
  filterGroup: Exclude<NatureProfileFilterId, 'all'>;
  mapPointId: string;
  zoneId: NatureZoneId;
  code: string;
  image: string;
  feeBadge: LocalizedText;
  statusBadge: LocalizedText;
  waterTempBadge: LocalizedText;
  bestSeason: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  ruleWarning: LocalizedText;
  articleSlug: string;
  mapsUrl: string;
}

export interface WaterTempContrast {
  id: string;
  place: LocalizedText;
  tempLabel: string;
  fillPct: number;
  barClass: string;
  note: LocalizedText;
}

export interface WildlifeSeasonSlot {
  id: string;
  seasonBadge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
}

export interface RegionalEndemic {
  id: string;
  badge: LocalizedText;
  latinName: string;
  title: LocalizedText;
  whereToSee: LocalizedText;
  description: LocalizedText;
}

export interface NatureRule2026 {
  id: string;
  tone: 'emerald' | 'rose' | 'cyan' | 'amber';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
