import { SITE_CONFIG } from './site-config';

/**
 * Стандартный атрибут rel для всех исходящих партнёрских ссылок
 * в соответствии с требованиями SEO Google и правилами партнёрских сетей.
 */
export const AFFILIATE_LINK_REL = 'noopener noreferrer nofollow sponsored';

interface TravelpayoutsProgramConfig {
  campaignId: string;
  p: string;
}

/**
 * Реестр партнёрских программ Travelpayouts для проекта Dalaman (marker 809006, trs 604146).
 * Для программ в статусе модерации поля campaignId и p оставлены пустыми —
 * конструктор вернёт чистый targetUrl, который автоматически перехватит Travelpayouts Drive LinkSwitcher после одобрения.
 */
export const TP_PROGRAMS = {
  // Активные и проверенные программы
  aviasales: { campaignId: '100', p: '4114' },
  localrent: { campaignId: '87', p: '2043' },
  kiwitaxi: { campaignId: '1', p: '647' },
  gettransfer: { campaignId: '147', p: '4439' },
  airalo: { campaignId: '541', p: '8310' },
  bikesbooking: { campaignId: '57', p: '1767' },
  compensair: { campaignId: '86', p: '4129' },

  // Зарезервированные слоты (на проверке в Travelpayouts — подхватятся через Drive или после вставки ID)
  booking: { campaignId: '', p: '' },
  tripcom: { campaignId: '', p: '' },
  ostrovok: { campaignId: '', p: '' },
  getyourguide: { campaignId: '', p: '' },
  sputnik8: { campaignId: '', p: '' },
  tripster: { campaignId: '', p: '' },
} as const satisfies Record<string, TravelpayoutsProgramConfig>;

export type TravelpayoutsProgramKey = keyof typeof TP_PROGRAMS;

/**
 * Собирает партнёрскую редирект-ссылку Travelpayouts (tp.media/r) для заданной программы.
 * Если монетизация отключена или программа ещё не одобрена, возвращает чистый targetUrl.
 */
export function buildTravelpayoutsLink(
  programKey: TravelpayoutsProgramKey,
  targetUrl: string,
  subId?: string
): string {
  const { enabled, travelpayoutsMarker, travelpayoutsTrs } = SITE_CONFIG.affiliates;
  const program = TP_PROGRAMS[programKey];

  if (!enabled || !travelpayoutsMarker || !travelpayoutsTrs || !program.campaignId || !program.p) {
    return targetUrl;
  }

  const params = [
    `campaign_id=${encodeURIComponent(program.campaignId)}`,
    `marker=${encodeURIComponent(travelpayoutsMarker)}`,
    `p=${encodeURIComponent(program.p)}`,
    `trs=${encodeURIComponent(travelpayoutsTrs)}`,
  ];

  if (subId) {
    params.push(`sub_id=${encodeURIComponent(subId)}`);
  }

  params.push(`u=${encodeURIComponent(targetUrl)}`);

  return `https://tp.media/r?${params.join('&')}`;
}

/**
 * Возвращает партнёрскую ссылку на поиск авиабилетов Aviasales в Даламан (DLM).
 */
export function getAviasalesSearchUrl({
  originIata,
  destinationIata = 'DLM',
  passengers = 2,
  locale = 'en',
  subId,
}: {
  originIata: string;
  destinationIata?: string;
  passengers?: number;
  locale?: string;
  subId?: string;
}): string {
  const domain = locale === 'ru' ? 'aviasales.ru' : 'aviasales.com';
  const targetUrl = `https://www.${domain}/search?origin_iata=${encodeURIComponent(originIata)}&destination_iata=${encodeURIComponent(destinationIata)}&passengers=${passengers}&trip_class=Y&with_request=true`;
  return buildTravelpayoutsLink('aviasales', targetUrl, subId);
}

const LOCALRENT_CITY_MAP: Record<string, string> = {
  dlm: 'dalaman',
  dalaman_city: 'dalaman',
  gocek: 'dalaman',
  sarigerme: 'dalaman',
  dalyan: 'dalaman',
  fethiye: 'fethiye',
  marmaris: 'marmaris',
  kas: 'kas',
};

/**
 * Возвращает партнёрскую ссылку на каталог автопроката Localrent по выбранному курорту.
 */
export function getLocalrentUrl({
  location = 'dlm',
  locale = 'en',
  subId,
}: {
  location?: string;
  locale?: string;
  subId?: string;
} = {}): string {
  const lang = locale === 'ru' ? 'ru' : 'en';
  const citySlug = LOCALRENT_CITY_MAP[location] || 'dalaman';
  const targetUrl = `https://localrent.com/${lang}/turkey/${citySlug}/`;
  return buildTravelpayoutsLink('localrent', targetUrl, subId);
}

/**
 * Возвращает партнёрскую ссылку на аренду скутеров, мотоциклов и велосипедов BikesBooking.
 */
export function getBikesBookingUrl({
  locale = 'en',
  subId,
}: {
  locale?: string;
  subId?: string;
} = {}): string {
  const lang = locale === 'ru' ? 'ru' : 'en';
  const targetUrl = `https://bikesbooking.com/${lang}/`;
  return buildTravelpayoutsLink('bikesbooking', targetUrl, subId);
}

/**
 * Возвращает партнёрскую ссылку на онлайн-бронирование трансфера Kiwitaxi из аэропорта Даламан.
 */
export function getKiwitaxiUrl({ subId }: { subId?: string } = {}): string {
  const targetUrl = 'https://kiwitaxi.com/turkey/dalaman+airport';
  return buildTravelpayoutsLink('kiwitaxi', targetUrl, subId);
}

/**
 * Возвращает партнёрскую ссылку на агрегатор трансферов GetTransfer из аэропорта Даламан.
 */
export function getGetTransferUrl({
  locale = 'en',
  subId,
}: {
  locale?: string;
  subId?: string;
} = {}): string {
  const lang = locale === 'ru' || locale === 'de' || locale === 'tr' ? locale : 'en';
  const targetUrl = `https://gettransfer.com/${lang}/transfers/dalaman-airport`;
  return buildTravelpayoutsLink('gettransfer', targetUrl, subId);
}

/**
 * Возвращает партнёрскую ссылку на туристические eSIM для Турции от Airalo.
 */
export function getAiraloTurkeyUrl({ subId }: { subId?: string } = {}): string {
  const targetUrl = 'https://www.airalo.com/turkey-esim';
  return buildTravelpayoutsLink('airalo', targetUrl, subId);
}

/**
 * Возвращает партнёрскую ссылку на сервис компенсаций за задержку/отмену рейсов Compensair.
 */
export function getCompensairUrl({
  locale = 'en',
  subId,
}: {
  locale?: string;
  subId?: string;
} = {}): string {
  const lang = locale === 'ru' ? 'ru' : 'en';
  const targetUrl = `https://www.compensair.com/${lang}/`;
  return buildTravelpayoutsLink('compensair', targetUrl, subId);
}

/**
 * Возвращает ссылку на поиск отелей на Booking.com (для автоматического перехвата Travelpayouts Drive).
 */
export function getBookingSearchUrl(destination: string, subId?: string): string {
  const targetUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`;
  return buildTravelpayoutsLink('booking', targetUrl, subId);
}

/**
 * Возвращает ссылку на легальный турецкий шлюз Otelz.com.
 */
export function getOtelzSearchUrl(destination: string): string {
  return `https://www.otelz.com/en/search?destination=${encodeURIComponent(destination)}`;
}

/**
 * Возвращает ссылку на каталог экскурсий Sputnik8 (для перехвата Drive / будущей прямой метки).
 */
export function getSputnik8Url(resort: string = 'all', subId?: string): string {
  const destination =
    resort === 'marmaris' || resort === 'kas' || resort === 'dalyan' ? resort : 'fethiye';
  const targetUrl = `https://www.sputnik8.com/ru/${destination}`;
  return buildTravelpayoutsLink('sputnik8', targetUrl, subId);
}

/**
 * Возвращает ссылку на каталог авторских экскурсий Tripster.
 */
export function getTripsterUrl(resort: string = 'all', subId?: string): string {
  const destination =
    resort === 'marmaris' ? 'Marmaris' : resort === 'kas' ? 'Kas' : 'Fethiye';
  const targetUrl = `https://experience.tripster.ru/experience/${destination}/`;
  return buildTravelpayoutsLink('tripster', targetUrl, subId);
}

/**
 * Возвращает ссылку на международный каталог экскурсий GetYourGuide.
 */
export function getGetYourGuideUrl(resort: string = 'all', subId?: string): string {
  const targetUrl =
    resort === 'marmaris'
      ? 'https://www.getyourguide.com/marmaris-l1376/'
      : resort === 'kas'
        ? 'https://www.getyourguide.com/s/?q=Kas+Turkey'
        : resort === 'dalyan'
          ? 'https://www.getyourguide.com/s/?q=Dalyan+Turkey'
          : 'https://www.getyourguide.com/fethiye-l1373/';
  return buildTravelpayoutsLink('getyourguide', targetUrl, subId);
}
