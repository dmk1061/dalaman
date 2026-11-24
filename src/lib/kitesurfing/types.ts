export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type WindSpotId = 'akyaka' | 'datca' | 'sarigerme' | 'calis';

export type WindMapPointKind = 'kite-zone' | 'windsurf-wing' | 'school-base' | 'no-kite';

export type WindDisciplineId = 'kitesurf' | 'windsurf' | 'wingfoil';

export interface WindMapPoint {
  id: string;
  spotId: WindSpotId;
  kind: WindMapPointKind;
  coordinates: [number, number]; // [lon, lat]
  windKnots: string;
  windDirs: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  note: LocalizedText;
  mapsUrl: string;
}

export interface WindCorridor {
  id: string;
  spotId: WindSpotId;
  label: LocalizedText;
  coordinates: [number, number][];
}

export interface WindSpot {
  id: WindSpotId;
  code: string;
  coordinates: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  image: string;
  windKnots: string;
  windType: LocalizedText;
  waterState: LocalizedText;
  bestDisciplines: LocalizedText;
  levelBadge: LocalizedText;
  distanceFromDlm: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  caveatNote: LocalizedText;
  mapsUrl: string;
}

export interface ThermalSlot {
  id: string;
  timeLabel: string;
  knotsMin: number;
  knotsMax: number;
  svgKnots: number;
  waterSmoothness: 1 | 2 | 3 | 4 | 5;
  windPowerScore: 1 | 2 | 3 | 4 | 5;
  crowdScore: 1 | 2 | 3 | 4 | 5;
  name: LocalizedText;
  waterSurface: LocalizedText;
  bestCraft: LocalizedText;
  insiderTip: LocalizedText;
}

export interface DisciplineOverview {
  id: WindDisciplineId;
  badge: LocalizedText;
  windThreshold: string;
  beginnerHours: LocalizedText;
  bestSpot: LocalizedText;
  rentalRule: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
}

export interface IkoStage {
  level: 1 | 2 | 3;
  code: string;
  hoursLabel: LocalizedText;
  title: LocalizedText;
  skills: LocalizedList;
  unlocks: LocalizedText;
}

export interface WindPackage {
  id: string;
  category: 'courses' | 'rental-storage';
  badge: LocalizedText;
  title: LocalizedText;
  priceBenchmark: string;
  priceNote: LocalizedText;
  formatNote: LocalizedText;
  includedItems: LocalizedList;
  insiderTip: LocalizedText;
}

export interface WindSchool {
  id: string;
  spotId: WindSpotId;
  city: LocalizedText;
  badge: LocalizedText;
  name: string;
  address: string;
  summary: LocalizedText;
  gearAndCert: LocalizedText;
  mapsUrl: string;
}

export interface WindCalendarMonth {
  month: number; // 1..12
  windDaysPct: number;
  avgKnots: string;
  waterTempC: string;
  airTempC: string;
  wetsuit: LocalizedText;
  kiteSizeRange: string;
  summary: LocalizedText;
}

export interface NoKiteZone {
  id: string;
  mapPointId: string;
  coordinates: [number, number];
  title: LocalizedText;
  mythClaim: LocalizedText;
  realityReason: LocalizedText;
  alternativeLabel: LocalizedText;
  alternativeHref: string;
  mapsUrl: string;
}

export interface WindSafetyRule {
  id: string;
  tone: 'cyan' | 'amber' | 'rose' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
