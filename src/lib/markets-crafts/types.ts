export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type DayOfWeekId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type MarketZoneId = 'fethiye' | 'dalaman-dalyan' | 'marmaris' | 'datca' | 'kas';

export type MarketMapPointKind = 'weekly-pazar' | 'old-bazaar' | 'craft-village' | 'mall-avm';

export type CraftCategoryId = 'all' | 'textile-craft' | 'food-honey' | 'ceramic-art';

export interface MarketZonePreset {
  id: MarketZoneId;
  code: string;
  coordinates: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  title: LocalizedText;
  subtitle: LocalizedText;
}

export interface MarketMapPoint {
  id: string;
  zoneId: MarketZoneId;
  kind: MarketMapPointKind;
  coordinates: [number, number]; // [lon, lat]
  openDaysBadge: LocalizedText;
  focusLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  note: LocalizedText;
  mapsUrl: string;
}

export interface WeeklyMarketEntry {
  id: string;
  day: DayOfWeekId;
  mapPointId: string;
  zoneId: MarketZoneId;
  hours: string;
  haggleAllowed: boolean;
  city: LocalizedText;
  badge: LocalizedText;
  bestFor: LocalizedText;
  description: LocalizedText;
  mapsUrl: string;
}

export interface CraftTreasureCard {
  id: string;
  category: Exclude<CraftCategoryId, 'all'>;
  priceRange: string;
  originTown: LocalizedText;
  badge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  howToVerifyReal: LocalizedText;
  avoidFakeTip: LocalizedText;
}

export interface BazaarDistrictCard {
  id: string;
  mapPointId: string;
  zoneId: MarketZoneId;
  code: string;
  image: string;
  scheduleBadge: LocalizedText;
  bargainRule: LocalizedText;
  bestTime: LocalizedText;
  distanceNote: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  caveatNote: LocalizedText;
  mapsUrl: string;
}

export interface MarketHourSlot {
  id: string;
  timeLabel: string;
  freshnessPct: number;
  priceDropPct: number;
  crowdLevel: LocalizedText;
  bestFor: LocalizedText;
  name: LocalizedText;
  insiderTip: LocalizedText;
}

export interface CustomsSafetyRule {
  id: string;
  tone: 'cyan' | 'amber' | 'rose' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
