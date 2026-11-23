export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type CoastZoneId = 'zone-1' | 'zone-2' | 'zone-3' | 'zone-4';

export type FishingLegalityStatus = 'allowed' | 'seasonal' | 'prohibited' | 'toxic';

export type ActivityFormat = 'shore' | 'boat' | 'diving';

export type SpotCategory = 'diving' | 'fishing' | 'both' | 'restricted';

export interface CoastZone {
  id: CoastZoneId;
  code: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  center: [number, number];
  zoom: number;
  highlightNote: LocalizedText;
}

export interface CoastalSpot {
  id: string;
  zoneId: CoastZoneId;
  category: SpotCategory;
  coordinates: [number, number]; // [lon, lat]
  image: string;
  depthOrMethod: LocalizedText;
  level: LocalizedText;
  visibilityOrSeason: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  lawAndSafetyNote: LocalizedText;
  speciesIds: string[];
  mapsUrl: string;
}

export interface ImageAttribution {
  fileTitle: string;
  artist: string;
  license: string;
  sourceUrl: string;
}

export interface MarineSpecies {
  id: string;
  trLocalName: string;
  latinName: string;
  name: LocalizedText;
  shortSubtitle: LocalizedText;
  status: FishingLegalityStatus;
  activities: ActivityFormat[];
  minSizeCm: number | null;
  minSizeNote: LocalizedText;
  dailyLimit: LocalizedText;
  closedSeason: LocalizedText;
  bestMonths: number[]; // 1..12
  depthRangeM: string;
  habitat: LocalizedText;
  catchingOrSpottingTip: LocalizedText;
  culinaryOrDangerNote: LocalizedText;
  zones: CoastZoneId[];
  image: string;
  imageAttribution: ImageAttribution;
}

export interface RentalOption {
  id: string;
  tab: 'diving' | 'fishing';
  badge: LocalizedText;
  title: LocalizedText;
  priceRangeEur: string;
  priceUnit: LocalizedText;
  durationOrFormat: LocalizedText;
  includedItems: LocalizedList;
  insiderTip: LocalizedText;
}

export interface VerifiedShopSpot {
  name: string;
  kind: 'shop' | 'dive' | 'marina';
  address: string;
  note: LocalizedText;
  mapsUrl: string;
}

export interface GearShopHub {
  id: string;
  city: LocalizedText;
  zoneId: CoastZoneId;
  focus: 'diving' | 'fishing' | 'both';
  summary: LocalizedText;
  whereToLook: LocalizedText;
  mapsQueryUrl: string;
  verifiedSpots: VerifiedShopSpot[];
}

export interface BaitTerm {
  trName: string;
  ruName: string;
  enName: string;
  deName: string;
  targetFish: LocalizedText;
}

export interface SeasonMonthEntry {
  month: number; // 1..12
  waterTempC: string;
  visibilityM: string;
  divingRating: 1 | 2 | 3 | 4 | 5;
  isTunaWindow: boolean;
  summary: LocalizedText;
  topSpeciesIds: string[];
}

export interface RegulationCard {
  id: string;
  tone: 'cyan' | 'amber' | 'rose' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
