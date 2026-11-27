export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type NightlifeZoneId =
  | 'marmaris'
  | 'fethiye-hisaronu'
  | 'kas-kalkan'
  | 'gocek-dalyan'
  | 'datca-akyaka';

export type DistrictKind =
  | 'mega-club'
  | 'pub-street'
  | 'rooftop-jazz'
  | 'marina-meyhane';

export type NightlifePointKind = DistrictKind | 'festival';

export type VibeFilterId = 'all' | DistrictKind;

export type FestivalSeasonId = 'all' | 'winter' | 'spring' | 'summer' | 'autumn';
export type FestivalCategoryId = 'all' | 'music-arts' | 'gastro-culture' | 'regatta-sport';

export interface NightlifeZonePreset {
  id: NightlifeZoneId;
  code: string;
  coordinates: [number, number]; // [lon, lat]
  zoom: number;
  pitch: number;
  bearing: number;
  title: LocalizedText;
  subtitle: LocalizedText;
}

export interface NightlifeMapPoint {
  id: string;
  zoneId: NightlifeZoneId;
  kind: NightlifePointKind;
  coordinates: [number, number]; // [lon, lat]
  hoursBadge: LocalizedText;
  focusLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  note: LocalizedText;
  mapsUrl: string;
}

export interface NightlifeDistrictCard {
  id: string;
  kind: DistrictKind;
  mapPointId: string;
  zoneId: NightlifeZoneId;
  code: string;
  image: string;
  hoursBadge: LocalizedText;
  entryRule: LocalizedText;
  vibeMeter: LocalizedText;
  distanceNote: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  caveatNote: LocalizedText;
  mapsUrl: string;
}

export interface DrinkBudgetTier {
  id: string;
  categoryBadge: LocalizedText;
  priceRange: string;
  tryBenchmark: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  moneySaverTip: LocalizedText;
}

export interface NightTimelineSlot {
  id: string;
  timeLabel: string;
  clubEnergyPct: number;
  loungeVibePct: number;
  crowdLevel: LocalizedText;
  bestFor: LocalizedText;
  name: LocalizedText;
  insiderTip: LocalizedText;
}

export interface NightSafetyRule {
  id: string;
  tone: 'rose' | 'amber' | 'cyan' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}

export interface RegionalFestivalItem {
  id: string;
  season: Exclude<FestivalSeasonId, 'all'>;
  category: Exclude<FestivalCategoryId, 'all'>;
  monthOrder: number;
  mapPointId: string;
  zoneId: NightlifeZoneId;
  monthBadge: LocalizedText;
  locationBadge: LocalizedText;
  title: LocalizedText;
  nativeName: string;
  description: LocalizedText;
  insiderTip: LocalizedText;
  relatedHref?: string;
  relatedLabel?: LocalizedText;
}

export interface TurkeyHolidayNotice {
  id: string;
  tone: 'amber' | 'rose' | 'slate';
  dateBadge: LocalizedText;
  title: LocalizedText;
  impactNote: LocalizedText;
}
