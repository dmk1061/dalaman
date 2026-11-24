export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type FlightSiteId = 'babadag' | 'sakartepe' | 'kas-asas';

export type MapPointKind = 'takeoff' | 'landing' | 'teleferik' | 'siv';

export interface FlightMapPoint {
  id: string;
  siteId: FlightSiteId;
  kind: MapPointKind;
  coordinates: [number, number]; // [lon, lat]
  altitudeM: number;
  windDirs: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  note: LocalizedText;
  mapsUrl: string;
}

export interface GlideCorridor {
  id: string;
  siteId: FlightSiteId;
  label: LocalizedText;
  coordinates: [number, number][];
}

export interface BabadagRunway {
  id: string;
  mapPointId: string;
  altitudeM: number;
  code: string;
  windDirections: string;
  tempDropFromBeachC: string;
  flightDurationMin: string;
  name: LocalizedText;
  accessMethod: LocalizedText;
  bestFor: LocalizedText;
  facilities: LocalizedText;
  description: LocalizedText;
}

export interface DailyTimeSlot {
  id: string;
  timeRange: string;
  calmnessScore: 1 | 2 | 3 | 4 | 5;
  thermalScore: 1 | 2 | 3 | 4 | 5;
  photoLightScore: 1 | 2 | 3 | 4 | 5;
  demandLevel: LocalizedText;
  name: LocalizedText;
  recommendedFor: LocalizedText;
  airConditions: LocalizedText;
  bookingTip: LocalizedText;
}

export interface FlightPackageOption {
  id: string;
  tab: 'tandem' | 'solo-siv';
  badge: LocalizedText;
  title: LocalizedText;
  priceBenchmark: string;
  priceNote: LocalizedText;
  durationOrFormat: LocalizedText;
  includedItems: LocalizedList;
  insiderTip: LocalizedText;
}

export interface ParaglidingOperator {
  id: string;
  siteId: FlightSiteId;
  city: LocalizedText;
  badge: LocalizedText;
  name: string;
  address: string;
  summary: LocalizedText;
  licenseNote: LocalizedText;
  mapsUrl: string;
}

export interface FlyingSiteCard {
  id: FlightSiteId;
  code: string;
  coordinates: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  image: string;
  takeoffAltM: string;
  verticalDropM: string;
  flightMinutes: string;
  distanceFromDlm: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  caveatsAndRules: LocalizedText;
  mapsUrl: string;
}

export interface ParaglidingMonthEntry {
  month: number; // 1..12
  beachTempC: string;
  babadag1700TempC: string;
  flyabilityScore: 1 | 2 | 3 | 4 | 5;
  recommendedRunway: string;
  isAirGames?: boolean;
  summary: LocalizedText;
}

export interface ParaglidingRuleCard {
  id: string;
  tone: 'cyan' | 'amber' | 'rose' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
