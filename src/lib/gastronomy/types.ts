export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type GastroZoneId = 'zone-1' | 'zone-2' | 'zone-3' | 'zone-4';

export type DishCategory =
  | 'signature'
  | 'meze-breakfast'
  | 'grill-oven'
  | 'desserts-drinks';

export type DietaryTag = 'seafood' | 'meat' | 'vegetarian' | 'sweet-drink';

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'anytime';

export type VenueCategory =
  | 'seafood-meyhane'
  | 'lokanta-pide'
  | 'river-nature'
  | 'breakfast-cafe';

export interface ImageAttribution {
  fileTitle: string;
  artist: string;
  license: string;
  sourceUrl: string;
}

export interface RegionalDish {
  id: string;
  trName: string;
  pronunciation: string;
  name: LocalizedText;
  shortSubtitle: LocalizedText;
  category: DishCategory;
  dietaryTags: DietaryTag[];
  priceRangeEur: LocalizedText;
  bestTime: MealTime;
  whereFormat: LocalizedText;
  bestMonths: number[]; // 1..12
  whatItIs: LocalizedText;
  howToOrderTip: LocalizedText;
  bestPlacesNote: LocalizedText;
  recommendedSpotIds: string[];
  image: string;
  imageAttribution: ImageAttribution;
}

export interface GastroZone {
  id: GastroZoneId;
  code: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  center: [number, number]; // [lng, lat]
  zoom: number;
  highlightNote: LocalizedText;
}

export interface DiningSpot {
  id: string;
  zoneId: GastroZoneId;
  category: VenueCategory;
  coordinates: [number, number]; // [lng, lat]
  image: string;
  priceTier: LocalizedText;
  bestTime: LocalizedText;
  formatLabel: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  orderingAndBookingNote: LocalizedText;
  dishIds: string[];
  mapsUrl: string;
}

export interface DiningFormatOption {
  id: string;
  tab: 'formats' | 'rituals';
  badge: LocalizedText;
  title: LocalizedText;
  priceRangeEur: string;
  priceUnit: LocalizedText;
  hoursOrContext: LocalizedText;
  includedItems: LocalizedList;
  insiderTip: LocalizedText;
}

export interface WaiterPhrase {
  trPhrase: string;
  pronunciation: string;
  ruMeaning: string;
  enMeaning: string;
  deMeaning: string;
  trContext: string;
  whenToUse: LocalizedText;
}

export interface GastroRuleCard {
  id: string;
  tone: 'amber' | 'cyan' | 'rose' | 'slate';
  eyebrow: LocalizedText;
  title: LocalizedText;
  points: LocalizedList;
  sourceLabel: string;
  sourceUrl: string;
}
