export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;

export type FamilyZoneId =
  | 'datca-marmaris'
  | 'koycegiz-dalyan-dalaman'
  | 'gocek-fethiye-oludeniz'
  | 'saklikent-patara-kas';

export type FamilySpotCategory =
  | 'calm-beach'
  | 'waterpark-ride'
  | 'nature-animals'
  | 'park-promenade';

export type AgeGroup = '0-3' | '4-7' | '8-12' | '13-17';

export type StrollerGrade = 'easy' | 'partial' | 'carrier';

export type ActivityCategory =
  | 'beach-park'
  | 'waterpark-ride'
  | 'animals-nature'
  | 'boat-sea'
  | 'active-teens';

export type SeasonStatus = 'peak' | 'good' | 'cool' | 'closed';

export interface FamilyZone {
  id: FamilyZoneId;
  order: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  center: [number, number]; // [lng, lat]
  zoom: number;
  dlmMinutes: LocalizedText;
}

export interface FamilySpot {
  id: string;
  number: number;
  zoneId: FamilyZoneId;
  category: FamilySpotCategory;
  name: LocalizedText;
  town: LocalizedText;
  coords: [number, number]; // [lng, lat]
  dlmMinutes: number;
  stroller: StrollerGrade;
  ageGroups: AgeGroup[];
  budgetEur: string;
  isFree?: boolean;
  shadeAndHeat: LocalizedText;
  summary: LocalizedText;
  parentTip: LocalizedText;
  image: string;
  activityIds: string[];
}

export interface FamilyActivity {
  id: string;
  category: ActivityCategory;
  name: LocalizedText;
  shortSubtitle: LocalizedText;
  ageGroups: AgeGroup[];
  stroller: StrollerGrade;
  dlmDriveRange: LocalizedText;
  familyBudgetEur: string;
  isFreeOrBudget: boolean;
  heatEscapeFriendly: boolean;
  description: LocalizedText;
  whatToPack: LocalizedText;
  parentWarning: LocalizedText;
  seasonality: SeasonStatus[]; // 12 entries: Jan (0) .. Dec (11)
  seasonNote: LocalizedText;
  recommendedSpotIds: string[];
  image: string;
  photoCredit?: string;
}

export interface ResortFamilyComparison {
  id: string;
  name: LocalizedText;
  dlmMinutes: number;
  dlmLabel: LocalizedText;
  shoreType: LocalizedText;
  hasCalmSand: boolean;
  stroller: StrollerGrade;
  quietNights: boolean;
  quietLabel: LocalizedText;
  infraLabel: LocalizedText;
  bestAges: AgeGroup[];
  verdict: LocalizedText;
  hrefSlug: string;
}

export interface HeatEscapeIdea {
  id: string;
  icon: 'river' | 'mall' | 'pine' | 'park';
  timeWindow: string;
  title: LocalizedText;
  places: LocalizedText;
  summary: LocalizedText;
}

export interface ParentPhrase {
  trPhrase: string;
  pronunciation: string;
  translation: LocalizedText;
  context: LocalizedText;
}

export interface ParentRule2026 {
  id: string;
  badge: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  actionHint: LocalizedText;
  linkHref?: string;
  linkLabel?: LocalizedText;
}
