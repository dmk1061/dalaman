export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type ThermalRegionId =
  | 'sultaniye'
  | 'dalaman'
  | 'datca'
  | 'fethiye-gocek'
  | 'pamukkale';

export type ThermalMapPointKind = 'hot-spring' | 'mud-bath' | 'hammam' | 'spa-resort';

export type SpringFilterId = 'all' | 'hot' | 'mud' | 'free-budget';

export interface ThermalRegionPreset {
  id: ThermalRegionId;
  code: string;
  coordinates: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  title: LocalizedText;
  subtitle: LocalizedText;
}

export interface ThermalMapPoint {
  id: string;
  regionId: ThermalRegionId;
  kind: ThermalMapPointKind;
  coordinates: [number, number]; // [lon, lat]
  tempOrType: string;
  mineralsOrStyle: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  note: LocalizedText;
  mapsUrl: string;
}

export interface ThermalSpringSpot {
  id: string;
  mapPointId: string;
  regionId: ThermalRegionId;
  code: string;
  image: string;
  waterTemp: string;
  priceBadge: LocalizedText;
  filterTags: ('hot' | 'mud' | 'free-budget')[];
  minerals: LocalizedText;
  hoursLabel: LocalizedText;
  distanceFromDlm: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  caveatNote: LocalizedText;
  mapsUrl: string;
}

export interface CrowdTimeSlot {
  id: string;
  timeLabel: string;
  crowdPct: number;
  quietScore: 1 | 2 | 3 | 4 | 5;
  tempFeel: LocalizedText;
  boatTraffic: LocalizedText;
  name: LocalizedText;
  insiderTip: LocalizedText;
}

export interface HammamStage {
  step: 1 | 2 | 3 | 4 | 5;
  code: string;
  turkishTerm: string;
  durationMin: string;
  tempRange: string;
  title: LocalizedText;
  summary: LocalizedText;
  etiquetteTip: LocalizedText;
}

export interface WellnessPackage {
  id: string;
  category: 'thermal-mud' | 'hammam-spa';
  badge: LocalizedText;
  title: LocalizedText;
  priceBenchmark: string;
  priceNote: LocalizedText;
  durationOrAccess: LocalizedText;
  includedItems: LocalizedList;
  insiderTip: LocalizedText;
}

export interface WellnessVenue {
  id: string;
  regionId: ThermalRegionId;
  mapPointId: string;
  city: LocalizedText;
  badge: LocalizedText;
  name: string;
  address: string;
  summary: LocalizedText;
  formatAndHours: LocalizedText;
  mapsUrl: string;
}

export interface ThermalMonthEntry {
  month: number; // 1..12
  airTempC: string;
  springTempC: string;
  comfortScore: 1 | 2 | 3 | 4 | 5;
  bestChoice: LocalizedText;
  summary: LocalizedText;
}

export interface ThermalSafetyRule {
  id: string;
  tone: 'cyan' | 'amber' | 'rose' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
