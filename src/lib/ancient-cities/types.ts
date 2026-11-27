export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type AncientZoneId =
  | 'caria-west'
  | 'dalyan-kaunos'
  | 'fethiye-valleys'
  | 'xanthos-patara'
  | 'kas-demre';

export type AncientPointKind =
  | 'unesco-flagship'
  | 'caria-harbor'
  | 'free-mountain'
  | 'coastal-ruins';

export type ProfileFilterId = 'all' | 'lycia-top' | 'caria-ports' | 'hidden-special';

export type PassRegion = 'ege' | 'akdeniz' | 'free';

export interface AncientZonePreset {
  id: AncientZoneId;
  code: string;
  coordinates: [number, number]; // [lon, lat]
  zoom: number;
  pitch: number;
  bearing: number;
  title: LocalizedText;
  subtitle: LocalizedText;
}

export interface AncientMapPoint {
  id: string;
  zoneId: AncientZoneId;
  kind: AncientPointKind;
  passRegion: PassRegion;
  coordinates: [number, number]; // [lon, lat]
  ticketBadge: LocalizedText;
  focusLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  note: LocalizedText;
  mapsUrl: string;
}

export interface AncientCityProfile {
  id: string;
  filterGroup: Exclude<ProfileFilterId, 'all'>;
  mapPointId: string;
  zoneId: AncientZoneId;
  code: string;
  image: string;
  ticketBadge: LocalizedText;
  passBadge: LocalizedText;
  durationBadge: LocalizedText;
  bestTime: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  insiderNote: LocalizedText;
  articleSlug: string;
  mapsUrl: string;
}

export interface TicketCalcSite {
  id: string;
  passRegion: Exclude<PassRegion, 'free'>;
  priceEur: number;
  provinceBadge: LocalizedText;
  title: LocalizedText;
  note: LocalizedText;
}

export interface AncientRouteCombo {
  id: string;
  zoneId: AncientZoneId;
  focusPointId: string;
  badge: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  steps: LocalizedList;
  whyItWorks: LocalizedText;
}

export interface AncientEpoch {
  id: string;
  periodBadge: string;
  title: LocalizedText;
  keyPlaces: LocalizedText;
  summary: LocalizedText;
}

export interface AncientVisitRule {
  id: string;
  tone: 'amber' | 'rose' | 'cyan' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
