import { TAXI_DESTINATIONS } from '@/lib/transport-data';

export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';
export type ResortStyleId = 'family' | 'yachting' | 'nature' | 'active' | 'culture';
export type DistanceBucket = 'near' | 'mid' | 'far';
export type ResortZone = 'west' | 'gateway' | 'east';
export type SatelliteKind = 'beach_hub' | 'village';

export interface SatellitePlaceItem {
  id: string;
  kind: SatelliteKind;
  parentSlug: string;
  href: string;
  image?: string;
  name: Record<LocaleCode, string>;
  meta: Record<LocaleCode, string>;
  summary: Record<LocaleCode, string>;
}

export interface ResortItem {
  slug: string;
  geoOrder: number;
  zone: ResortZone;
  isGateway?: boolean;
  distanceKm: number;
  durationMin: number;
  distanceBucket: DistanceBucket;
  budgetTier: 1 | 2 | 3;
  budgetLabel: string;
  styles: ResortStyleId[];
  image: string;
  articleSlug: string;
  name: Record<LocaleCode, string>;
  tagline: Record<LocaleCode, string>;
  beachType: Record<LocaleCode, string>;
  season: Record<LocaleCode, string>;
  bestFor: Record<LocaleCode, string>;
  tradeoff: Record<LocaleCode, string>;
  highlights: Record<LocaleCode, string[]>;
}

export interface ResortComboItem {
  id: string;
  durationLabel: Record<LocaleCode, string>;
  title: Record<LocaleCode, string>;
  description: Record<LocaleCode, string>;
  resortSlugs: string[];
  routeHref: string;
}

function getDlmMetrics(id: string): { distanceKm: number; durationMin: number } {
  const found = TAXI_DESTINATIONS.find((item) => item.id === id);
  return {
    distanceKm: found?.distanceKm ?? 0,
    durationMin: found?.durationMin ?? 0,
  };
}

// SOURCE [21.11.2026]: Расстояния и время в пути от аэропорта Даламан (DLM) синхронизированы с src/lib/transport-data.ts — UKOME Muğla Büyükşehir Belediyesi (URL: https://www.mugla.bel.tr/ukome) и Dalaman Havalimanı Taksiciler Kooperatifi (URL: https://www.dalaman-airport.com/taksi.html); профили курортов и сезонность — GoTürkiye (URL: https://www.goturkiye.com).
export const RESORTS_CATALOG: ResortItem[] = [
  {
    slug: 'dacha',
    geoOrder: 1,
    zone: 'west',
    ...getDlmMetrics('dacha'),
    distanceBucket: 'far',
    budgetTier: 2,
    budgetLabel: '€€',
    styles: ['nature', 'yachting', 'culture'],
    image: '/api/images/locations/dacha/ruine/knidos/knidos.jpg',
    articleSlug: 'datca-peninsula',
    name: {
      ru: 'Датча',
      en: 'Datça',
      de: 'Datça',
      tr: 'Datça',
    },
    tagline: {
      ru: 'Мыс двух морей, миндальные сады и тихие галечные бухты',
      en: 'Peninsula of two seas, almond groves, and quiet pebble coves',
      de: 'Halbinsel zweier Meere, Mandelhaine und ruhige Kieselbuchten',
      tr: 'İki denizin buluştuğu yarımada, badem bahçeleri ve sakin koylar',
    },
    beachType: {
      ru: 'Чистая галька и скалистые бухты',
      en: 'Clear pebble coves & rocky bays',
      de: 'Klare Kieselstrände & Felsbuchten',
      tr: 'Berrak çakıl koyları ve kayalık sahiller',
    },
    season: {
      ru: 'Июнь – Сентябрь',
      en: 'Jun – Sep',
      de: 'Jun – Sep',
      tr: 'Haz – Eyl',
    },
    bestFor: {
      ru: 'Побег от массовых отелей, сухой эгейский бриз, гастрономия и яхтенные бухты',
      en: 'Escaping package crowds, dry Aegean breeze, local gastronomy, and sailing coves',
      de: 'Ruhesuchende abseits großer Resorts, trockene Ägäis-Brise, Kulinarik & Buchten',
      tr: 'Kalabalıktan uzak tatil, kuru Ege esintisi, gastronomi ve bakir koylar',
    },
    tradeoff: {
      ru: 'Более 2 часов от DLM по горному серпантину; без арендованного авто перемещаться между бухтами сложно',
      en: 'Over 2 hours from DLM along winding mountain roads; a rental car is essential to explore the bays',
      de: 'Über 2 Stunden Transfer vom DLM über Bergserpentinen; für abgelegene Buchten ist ein Mietwagen nötig',
      tr: 'DLM’den virajlı dağ yollarıyla 2 saati aşan sürüş; koyları gezmek için araç kiralamak gerekir',
    },
    highlights: {
      ru: ['Античный Книдос', 'Паламутбюкю', 'Старая Датча'],
      en: ['Ancient Knidos', 'Palamutbükü', 'Old Datça'],
      de: ['Antikes Knidos', 'Palamutbükü', 'Alt-Datça'],
      tr: ['Antik Knidos', 'Palamutbükü', 'Eski Datça'],
    },
  },
  {
    slug: 'marmaris',
    geoOrder: 2,
    zone: 'west',
    ...getDlmMetrics('marmaris'),
    distanceBucket: 'mid',
    budgetTier: 1,
    budgetLabel: '€–€€',
    styles: ['family', 'yachting', 'active'],
    image: '/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg',
    articleSlug: 'icmeler',
    name: {
      ru: 'Мармарис',
      en: 'Marmaris',
      de: 'Marmaris',
      tr: 'Marmaris',
    },
    tagline: {
      ru: 'Большая закрытая бухта, 10-км набережная, марины и динамика',
      en: 'Wide sheltered bay, 10 km promenade, grand marinas, and lively nights',
      de: 'Geschützte Bucht, 10 km Promenade, große Marinas und lebendiges Flair',
      tr: 'Korunaklı büyük körfez, 10 km sahil yürüyüş yolu, marinalar ve dinamizm',
    },
    beachType: {
      ru: 'Песок с мелкой галькой, без волн',
      en: 'Sand & fine pebble, calm water',
      de: 'Sand mit Feinkiesel, ruhiges Wasser',
      tr: 'İnce çakıllı kum, dalgasız deniz',
    },
    season: {
      ru: 'Май – Октябрь',
      en: 'May – Oct',
      de: 'Mai – Okt',
      tr: 'Mayıs – Eki',
    },
    bestFor: {
      ru: 'Активная вечерняя жизнь, морские прогулки, паром на Родос, тихие пригороды Ичмелер и Турунч',
      en: 'Nightlife and promenades, boat excursions, Rhodes ferry, or greener suburbs İçmeler & Turunç',
      de: 'Nachtleben, Bootstouren, Fähre nach Rhodos sowie die ruhigeren Vororte İçmeler & Turunç',
      tr: 'Canlı gece hayatı, tekne turları, Rodos feribotu ve yeşil İçmeler ile Turunç koyları',
    },
    tradeoff: {
      ru: 'В центре шумно в пик сезона и плотная застройка; за тишиной и соснами лучше селиться в Ичмелере или Турунче',
      en: 'Busy town center in peak summer; pick nearby İçmeler or Turunç if you prioritize quiet pine coves',
      de: 'Lebhaftes Zentrum in der Hochsaison; für Ruhe bieten sich die Nachbarorte İçmeler oder Turunç an',
      tr: 'Yüksek sezonda merkez oldukça hareketlidir; sakinlik için İçmeler veya Turunç tercih edilmeli',
    },
    highlights: {
      ru: ['Ичмелер', 'Бухта Турунч', 'Античный Амос', 'Акьяка рядом'],
      en: ['İçmeler', 'Turunç Bay', 'Ancient Amos', 'Nearby Akyaka'],
      de: ['İçmeler', 'Turunç-Bucht', 'Antikes Amos', 'Akyaka in der Nähe'],
      tr: ['İçmeler', 'Turunç Koyu', 'Antik Amos', 'Yakındaki Akyaka'],
    },
  },
  {
    slug: 'koycegiz',
    geoOrder: 3,
    zone: 'west',
    ...getDlmMetrics('koycegiz'),
    distanceBucket: 'near',
    budgetTier: 1,
    budgetLabel: '€–€€',
    styles: ['nature', 'culture'],
    image: '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg',
    articleSlug: 'koycegiz-lake',
    name: {
      ru: 'Кёйджегиз',
      en: 'Köyceğiz',
      de: 'Köyceğiz',
      tr: 'Köyceğiz',
    },
    tagline: {
      ru: 'Реликтовое озеро, ликвидамбровые рощи и термы Султание',
      en: 'Freshwater lake, sweetgum forests, and Sultaniye thermal springs',
      de: 'Süßwassersee, Amberbaumwälder und die Sultaniye-Thermalquellen',
      tr: 'Sakin tatlı su gölü, sığla ormanları ve Sultaniye kaplıcaları',
    },
    beachType: {
      ru: 'Пресное озеро + морская бухта Экинчик',
      en: 'Freshwater lake + Ekincik sea cove',
      de: 'Badesee + Meeresbucht Ekincik',
      tr: 'Tatlı su gölü + Ekincik deniz koyu',
    },
    season: {
      ru: 'Круглый год',
      en: 'Year-round',
      de: 'Ganzjährig',
      tr: 'Yıl boyu',
    },
    bestFor: {
      ru: 'Ценители тишины и нетуристической Турции, термального отдыха и прохлады горных рек Юварлакчай',
      en: 'Slow non-touristy Turkey, mineral hot springs, lakeside walks, and cool Yuvarlakçay waterfalls',
      de: 'Authentische Kleinstadt-Ruhe, Thermalbäder, Seepromenade und die kühle Yuvarlakçay-Schlucht',
      tr: 'Sakin yerel yaşam, şifalı termal sular, göl kenarı yürüyüşleri ve serin Yuvarlakçay',
    },
    tradeoff: {
      ru: 'Сам город стоит на пресном озере — до открытого моря в бухте Экинчик около 40 минут через перевал',
      en: 'Town sits on a freshwater lake rather than the sea; reaching Ekincik sea cove takes ~40 min over a hill pass',
      de: 'Der Ort liegt am Süßwassersee — zur Meeresbucht Ekincik fährt man rund 40 Minuten über den Pass',
      tr: 'İlçe merkezi denizde değil göl kıyısındadır; Ekincik deniz koyuna geçit üzerinden ~40 dk sürer',
    },
    highlights: {
      ru: ['Озеро Кёйджегиз', 'Термы Султание', 'Бухта Экинчик', 'Юварлакчай'],
      en: ['Lake Köyceğiz', 'Sultaniye Hot Springs', 'Ekincik Bay', 'Yuvarlakçay'],
      de: ['Köyceğiz-See', 'Sultaniye-Thermen', 'Ekincik-Bucht', 'Yuvarlakçay'],
      tr: ['Köyceğiz Gölü', 'Sultaniye Kaplıcası', 'Ekincik Koyu', 'Yuvarlakçay'],
    },
  },
  {
    slug: 'dalyan',
    geoOrder: 4,
    zone: 'west',
    ...getDlmMetrics('dalyan'),
    distanceBucket: 'near',
    budgetTier: 1,
    budgetLabel: '€–€€',
    styles: ['family', 'nature', 'culture'],
    image: '/api/images/locations/dalyan/ruine/LycianTombs/lyciantombs.jpg',
    articleSlug: 'dalyan-guide',
    name: {
      ru: 'Дальян',
      en: 'Dalyan',
      de: 'Dalyan',
      tr: 'Dalyan',
    },
    tagline: {
      ru: 'Заповедник на реке, ликийские гробницы и черепашья коса Изтузу',
      en: 'Protected river town, cliffside tombs, and İztuzu turtle beach',
      de: 'Geschütztes Flussdelta, Felsengräber und der Schildkrötenstrand İztuzu',
      tr: 'Koruma altındaki nehir kasabası, kral mezarları ve İztuzu plajı',
    },
    beachType: {
      ru: '4,5 км заповедная песчаная коса Изтузу',
      en: '4.5 km protected sandy İztuzu spit',
      de: '4,5 km lange, geschützte Sandnehrung İztuzu',
      tr: '4,5 km doğal koruma kumulu (İztuzu Plajı)',
    },
    season: {
      ru: 'Май – Октябрь',
      en: 'May – Oct',
      de: 'Mai – Okt',
      tr: 'Mayıs – Eki',
    },
    bestFor: {
      ru: 'Семьи с детьми, любители природы и античности, уютные виллы и пансионы без многоэтажных отелей',
      en: 'Families, nature lovers, low-rise garden villas, river boat trips, and ancient Kaunos ruins',
      de: 'Familien, Naturliebhaber, flache Villen ohne Bettenburgen, Flussboote und das antike Kaunos',
      tr: 'Çocuklu aileler, doğa severler, çok katlı otelsiz butik villalar ve antik Kaunos gezileri',
    },
    tradeoff: {
      ru: 'До морского пляжа Изтузу нужно плыть ~35 мин на речном катере или ехать ~20 мин на долмуше/авто; пляж закрывается на ночь',
      en: 'Reaching İztuzu Beach requires a ~35 min river boat or ~20 min road ride; the beach closes at night for turtles',
      de: 'Zum Strand İztuzu gelangt man per Flussboot (~35 Min.) oder Dolmuş (~20 Min.); nachts wegen Schildkröten gesperrt',
      tr: 'İztuzu Plajı’na tekneyle (~35 dk) veya karayoluyla (~20 dk) gidilir; kaplumbağalar için gece kapalıdır',
    },
    highlights: {
      ru: ['Пляж Изтузу', 'Гробницы Кауноса', 'Речные катера', 'Центр DEKAMER'],
      en: ['İztuzu Beach', 'Kaunos Tombs', 'River Boats', 'DEKAMER Rescue'],
      de: ['İztuzu-Strand', 'Felsengräber Kaunos', 'Flussboote', 'DEKAMER-Zentrum'],
      tr: ['İztuzu Plajı', 'Kaunos Mezarları', 'Nehir Tekneleri', 'DEKAMER'],
    },
  },
  {
    slug: 'dalaman',
    geoOrder: 5,
    zone: 'gateway',
    isGateway: true,
    ...getDlmMetrics('dalaman'),
    distanceBucket: 'near',
    budgetTier: 1,
    budgetLabel: '€–€€',
    styles: ['family', 'nature', 'active'],
    image: '/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg',
    articleSlug: 'sarigerme-guide',
    name: {
      ru: 'Даламан',
      en: 'Dalaman',
      de: 'Dalaman',
      tr: 'Dalaman',
    },
    tagline: {
      ru: 'Главные ворота (DLM), 7-км пески Сарыгерме и дикая бухта Сарсала',
      en: 'Main Gateway (DLM), 7 km sandy Sarıgerme, and pine-framed Sarsala Bay',
      de: 'Haupttor (DLM), 7 km Sandstrand Sarıgerme und die Sarsala-Bucht',
      tr: 'Bölgenin Ana Kapısı (DLM), 7 km kumlu Sarıgerme ve Sarsala Koyu',
    },
    beachType: {
      ru: 'Широкий мелкий песок Сарыгерме и бухты',
      en: 'Wide fine-sand beach (Sarıgerme) & coves',
      de: 'Breiter Feinsandstrand Sarıgerme & Buchten',
      tr: 'Geniş ince kumlu plaj (Sarıgerme) ve koylar',
    },
    season: {
      ru: 'Май – Октябрь',
      en: 'May – Oct',
      de: 'Mai – Okt',
      tr: 'Mayıs – Eki',
    },
    bestFor: {
      ru: 'Быстрый старт за 10–20 минут от прилёта, семьи с малышами в Сарыгерме, база для выездов на авто по всему побережью',
      en: 'Fast 10–20 min arrival from DLM, families seeking shallow sand in Sarıgerme, and road-trip central base',
      de: 'Kurzer Transfer (10–20 Min. ab DLM), flacher Sandstrand für Kinder in Sarıgerme und zentraler Mietwagen-Startpunkt',
      tr: 'DLM’den 10–20 dakikada hızlı erişim, Sarıgerme’de sığ kumlu aile tatili ve tüm kıyıya merkezi başlangıç',
    },
    tradeoff: {
      ru: 'Сам город Даламан расположен в долине в 10–20 минутах от берега — ради пешего выхода к морю лучше выбирать Сарыгерме',
      en: 'Dalaman town sits inland 10–20 minutes from the water — stay directly in Sarıgerme for walkable beach access',
      de: 'Die Stadt Dalaman liegt 10–20 Minuten im Landesinneren — für direkten Strandzugang besser Sarıgerme wählen',
      tr: 'Dalaman ilçe merkezi sahile 10–20 dk mesafededir — yürüyerek denize inmek için Sarıgerme seçilmelidir',
    },
    highlights: {
      ru: ['Аэропорт DLM', 'Пляж Сарыгерме', 'Бухта Сарсала', 'Рафтинг и термы'],
      en: ['DLM Airport Hub', 'Sarıgerme Beach', 'Sarsala Bay', 'Rafting & Thermals'],
      de: ['Flughafen DLM', 'Sarıgerme-Strand', 'Sarsala-Bucht', 'Rafting & Thermen'],
      tr: ['DLM Havalimanı', 'Sarıgerme Plajı', 'Sarsala Koyu', 'Rafting & Kaplıca'],
    },
  },
  {
    slug: 'gocek',
    geoOrder: 6,
    zone: 'east',
    ...getDlmMetrics('gocek'),
    distanceBucket: 'near',
    budgetTier: 3,
    budgetLabel: '€€€',
    styles: ['yachting', 'nature'],
    image: '/api/images/locations/gocek/beach/bedri/bedri.jpg',
    articleSlug: 'gocek-guide',
    name: {
      ru: 'Гёджек',
      en: 'Göcek',
      de: 'Göcek',
      tr: 'Göcek',
    },
    tagline: {
      ru: 'Яхтенная столица: 6 марин, двухэтажная архитектура и 12 островов',
      en: 'Yachting capital: 6 marinas, low-rise waterfront, and 12 Islands bays',
      de: 'Yacht-Hauptstadt: 6 Marinas, flache Promenade und die 12 Inseln',
      tr: 'Yatçılık başkenti: 6 marina, iki katlı mimari ve 12 Adalar koyları',
    },
    beachType: {
      ru: 'Островные бухты с лодки и Инлидже в 10 мин',
      en: 'Boat-access island coves + İnlice (10 min)',
      de: 'Inselbuchten per Boot & Strand İnlice (10 Min.)',
      tr: 'Tekneyle koylar + 10 dk mesafede İnlice Plajı',
    },
    season: {
      ru: 'Апрель – Ноябрь',
      en: 'Apr – Nov',
      de: 'Apr – Nov',
      tr: 'Nis – Kas',
    },
    bestFor: {
      ru: 'Яхтсмены и аренда лодок, любители респектабельной тишины, прогулочных набережных и рыбных ресторанов',
      en: 'Sailors and yacht charters, quiet upscale atmosphere, waterfront dining, and daily 12 Islands boat trips',
      de: 'Segler & Yachtcharter, gehobene ruhige Atmosphäre, Hafenpromenade und Insel-Bootstouren',
      tr: 'Yat ve mavi yolculuk tutkunları, seçkin ve sakin atmosfer, sahil restoranları ve ada turları',
    },
    tradeoff: {
      ru: 'В центре городка нет большого бесплатного песчаного пляжа, а цены на жильё и рестораны выше среднего по региону',
      en: 'No sweeping public sand beach right in town center; accommodation and dining sit in the upper price bracket',
      de: 'Kein großer öffentlicher Sandstrand direkt im Zentrum; gehobenes Preisniveau bei Hotels und Restaurants',
      tr: 'Merkezde geniş halka açık kumsal bulunmaz; konaklama ve yeme-içme bölge ortalamasının üzerindedir',
    },
    highlights: {
      ru: ['6 марин', '12 островов', 'Бухта Бедри Рахми', 'Пляж Инлидже'],
      en: ['6 Yacht Marinas', '12 Islands Route', 'Bedri Rahmi Bay', 'İnlice Beach'],
      de: ['6 Yachthäfen', '12-Inseln-Route', 'Bedri-Rahmi-Bucht', 'İnlice-Strand'],
      tr: ['6 Marina', '12 Adalar Rotası', 'Bedri Rahmi Koyu', 'İnlice Plajı'],
    },
  },
  {
    slug: 'fethiye',
    geoOrder: 7,
    zone: 'east',
    ...getDlmMetrics('fethiye'),
    distanceBucket: 'mid',
    budgetTier: 2,
    budgetLabel: '€–€€€',
    styles: ['family', 'active', 'culture'],
    image: '/api/images/locations/fethiye/beach/bluelagoon/bluelagoon.jpg',
    articleSlug: 'oludeniz',
    name: {
      ru: 'Фетхие',
      en: 'Fethiye',
      de: 'Fethiye',
      tr: 'Fethiye',
    },
    tagline: {
      ru: 'Лагуна Олюдениз, полёты с Бабадага, Ликийская тропа и живой порт',
      en: 'Ölüdeniz Blue Lagoon, Babadağ paragliding, Lycian Way, and vibrant port',
      de: 'Blaue Lagune Ölüdeniz, Paragliding vom Babadağ, Lykischer Weg & Hafenstadt',
      tr: 'Ölüdeniz lagünü, Babadağ yamaç paraşütü, Likya Yolu ve canlı liman',
    },
    beachType: {
      ru: 'Галька, спокойная лагуна и длинный Чалыш',
      en: 'Lagoon spit, pebbles, and long Çalış Beach',
      de: 'Lagune, Kieselbuchten & langer Çalış-Strand',
      tr: 'Sakin lagün, çakıl koylar ve uzun Çalış Sahili',
    },
    season: {
      ru: 'Май – Октябрь',
      en: 'May – Oct',
      de: 'Mai – Okt',
      tr: 'Mayıs – Eki',
    },
    bestFor: {
      ru: 'Максимум впечатлений в одной точке: параглайдинг, семьи на пляже Чалыш, трекинг, руины Тлоса и каньон Саклыкент',
      en: 'All-in-one variety: paragliding, families along Çalış sunset promenade, hiking, Kayaköy, and Saklıkent Gorge',
      de: 'Maximale Vielfalt: Gleitschirmfliegen, Familien am Çalış-Strand, Wandern, Kayaköy und die Saklıkent-Schlucht',
      tr: 'Her şey bir arada: yamaç paraşütü, Çalış’ta aile tatili, Kayaköy, Likya Yolu ve Saklıkent Kanyonu',
    },
    tradeoff: {
      ru: 'Популярные бухты Олюдениза в июле–августе очень многолюдны; важно заранее выбрать подрайон (Чалыш, центр или Оваджик)',
      en: 'Ölüdeniz gets very crowded in July–August; choosing the right sub-area (Çalış, harbor, or cool Ovacık) matters',
      de: 'Ölüdeniz ist im Juli und August sehr belebt; die Wahl des richtigen Teilorts (Çalış, Zentrum, Ovacık) ist entscheidend',
      tr: 'Temmuz–Ağustos’ta Ölüdeniz çok kalabalık olur; konaklama için doğru alt bölge (Çalış, merkez veya Ovacık) seçilmeli',
    },
    highlights: {
      ru: ['Голубая лагуна', 'Гора Бабадаг', 'Долина Бабочек', 'Каякёй и Саклыкент'],
      en: ['Blue Lagoon', 'Mount Babadağ', 'Butterfly Valley', 'Kayaköy & Saklıkent'],
      de: ['Blaue Lagune', 'Berg Babadağ', 'Schmetterlingstal', 'Kayaköy & Saklıkent'],
      tr: ['Mavi Lagün', 'Babadağ', 'Kelebekler Vadisi', 'Kayaköy & Saklıkent'],
    },
  },
  {
    slug: 'kas',
    geoOrder: 8,
    zone: 'east',
    ...getDlmMetrics('kas'),
    distanceBucket: 'far',
    budgetTier: 3,
    budgetLabel: '€€–€€€',
    styles: ['yachting', 'active', 'culture'],
    image: '/api/images/locations/kas/beach/kaputas/kaputas.jpg',
    articleSlug: 'kas-guide',
    name: {
      ru: 'Каш и Калкан',
      en: 'Kaş & Kalkan',
      de: 'Kaş & Kalkan',
      tr: 'Kaş & Kalkan',
    },
    tagline: {
      ru: 'Богемный край побережья: дайвинг, Кекова, пляж Капуташ и виллы',
      en: 'Bohemian eastern edge: diving, sunken Kekova, Kaputaş Beach, and villas',
      de: 'Böhmischer Osten: Tauchen, versunkenes Kekova, Kaputaş-Strand und Villen',
      tr: 'Doğu ucun bohem ruhu: dalış, batık kent Kekova, Kaputaş ve manzaralı villalar',
    },
    beachType: {
      ru: 'Деревянные платформы, галька Капуташ и песок Патары',
      en: 'Sea-deck platforms, Kaputaş cove & Patara sand',
      de: 'Badeplattformen, Kaputaş-Bucht & Patara-Dünen',
      tr: 'Ahşap deniz platformları, Kaputaş ve Patara kumu',
    },
    season: {
      ru: 'Май – Ноябрь',
      en: 'May – Nov',
      de: 'Mai – Nov',
      tr: 'Mayıs – Kas',
    },
    bestFor: {
      ru: 'Пары и самостоятельные путешественники, дайвинг и каякинг над затонувшим городом Кекова, закаты у античного театра',
      en: 'Couples and independent travelers, scuba diving, sea kayaking over Kekova ruins, and boutique rooftop dining',
      de: 'Paare und Individualreisende, Tauchsport, Kajakfahren über dem versunkenen Kekova und Boutique-Flair',
      tr: 'Çiftler ve bağımsız gezginler, tüplü dalış, Kekova kano turları, butik oteller ve Meis feribotu',
    },
    tradeoff: {
      ru: 'Около 2 часов езды от DLM и нет песчаного пляжа в самом городе (вход с платформ в глубину; с коляской до моря неудобно)',
      en: '~2 hours from DLM and no central sand beach (deep-water platform entry in town; steep streets)',
      de: 'Rund 2 Stunden ab DLM, kein Sandstrand direkt im Ort (Einstieg über Leitern ins tiefe Wasser; hügelige Gassen)',
      tr: 'DLM’den ~2 saat sürüş ve merkezde kumsal yok (platformlardan derin suya girilir; sokaklar yokuşludur)',
    },
    highlights: {
      ru: ['Пляж Капуташ', 'Дюны Патары', 'Затонувшая Кекова', 'Паром на Меис'],
      en: ['Kaputaş Beach', 'Patara Dunes', 'Sunken Kekova', 'Meis Island Ferry'],
      de: ['Kaputaş-Strand', 'Patara-Strand', 'Versunkenes Kekova', 'Fähre nach Meis'],
      tr: ['Kaputaş Plajı', 'Patara Kumulları', 'Batık Kent Kekova', 'Meis Feribotu'],
    },
  },
];

export const RESORT_COMBOS: ResortComboItem[] = [
  {
    id: 'classic-split',
    durationLabel: {
      ru: '10–14 дней • Идеально для 1-й поездки',
      en: '10–14 Days • Best First-Timer Split',
      de: '10–14 Tage • Ideal für den Erstbesuch',
      tr: '10–14 Gün • İlk Kez Gelenler İçin İdeal',
    },
    title: {
      ru: 'Спокойный старт у DLM + Ликийская классика',
      en: 'Easy Start near DLM + Lycian Classics',
      de: 'Entspannter Start am DLM + Lykische Klassiker',
      tr: 'DLM Yakınında Sakin Başlangıç + Likya Klasikleri',
    },
    description: {
      ru: 'Первые 5 ночей без долгого переезда — в Даламане (Сарыгерме) или речном Дальяне, затем 5–7 ночей в Фетхие и Олюденизе ради лагуны, гор и Саклыкента.',
      en: 'Spend 5 nights right by the airport in Dalaman (Sarıgerme) or riverfront Dalyan, then move east for 5–7 nights in Fethiye & Ölüdeniz without long daily backtracking.',
      de: 'Die ersten 5 Nächte ohne lange Anfahrt in Dalaman (Sarıgerme) oder Dalyan, danach 5–7 Nächte in Fethiye & Ölüdeniz für Lagune, Berge und Saklıkent.',
      tr: 'İlk 5 gece havalimanına yakın Dalaman (Sarıgerme) veya Dalyan’da dinlenin; kalan 5–7 geceyi Ölüdeniz, Babadağ ve Saklıkent için Fethiye’de geçirin.',
    },
    resortSlugs: ['dalaman', 'dalyan', 'fethiye'],
    routeHref: '/routes',
  },
  {
    id: 'yachts-and-east',
    durationLabel: {
      ru: '10–14 дней • Море и эстетика',
      en: '10–14 Days • Yachts & Bohemian Coast',
      de: '10–14 Tage • Yachten & Boutique-Küste',
      tr: '10–14 Gün • Deniz, Yat ve Bohem Ruhu',
    },
    title: {
      ru: 'Залив 12 островов + богемный Каш',
      en: '12 Islands Marina Life + Bohemian Kaş',
      de: '12-Inseln-Marinas + Böhmisches Kaş',
      tr: '12 Adalar Marinaları + Bohem Kaş',
    },
    description: {
      ru: '4–5 дней в яхтенном Гёджеке с выходом в закрытые бухты, затем панорамный переезд на восток в Каш и Калкан ради дайвинга, Кековы и пляжа Капуташ.',
      en: 'Pair 4–5 calm days cruising island bays out of Göcek with 5–7 nights along the dramatic eastern cliffs of Kaş & Kalkan for Kekova and Kaputaş.',
      de: 'Kombinieren Sie 4–5 ruhige Tage mit Insel-Bootstouren ab Göcek mit 5–7 Nächten an der Steilküste von Kaş & Kalkan rund um Kekova und Kaputaş.',
      tr: 'Göcek’ten 12 Adalar’a tekne turlarıyla 4–5 gün geçirdikten sonra doğuya uzanıp Kaş ve Kalkan’da dalış, Kekova ve Kaputaş keyfi yapın.',
    },
    resortSlugs: ['gocek', 'kas'],
    routeHref: '/routes/weekends',
  },
  {
    id: 'slow-west',
    durationLabel: {
      ru: '7–12 дней • Природа и антитолпа',
      en: '7–12 Days • Slow Nature & Aegean Escape',
      de: '7–12 Tage • Natur & Entschleunigung',
      tr: '7–12 Gün • Doğa ve Kalabalıksız Ege',
    },
    title: {
      ru: 'Термальное озеро + полуостров Датча',
      en: 'Thermal Lake Retreat + Datça Peninsula',
      de: 'Thermal-See + Halbinsel Datça',
      tr: 'Termal Göl Huzuru + Datça Yarımadası',
    },
    description: {
      ru: 'Маршрут на авто на запад от аэропорта: нетуристический Кёйджегиз с термами Султание и водопадами, а затем сухие сосновые бухты Датчи до мыса Книдос.',
      en: 'Drive west from DLM into quiet lakeside Köyceğiz and Sultaniye hot springs before continuing to the wind-swept almond valleys and Knidos ruins of Datça.',
      de: 'Mit dem Mietwagen westwärts zuerst an den ruhigen Köyceğiz-See mit seinen Thermalquellen, anschließend durch die Mandel- und Pinientäler von Datça bis Knidos.',
      tr: 'DLM’den batıya doğru sakin Köyceğiz Gölü ve Sultaniye kaplıcalarıyla başlayıp, badem ağaçları ve Knidos harabeleriyle Datça yarımadasına uzanın.',
    },
    resortSlugs: ['koycegiz', 'dacha'],
    routeHref: '/routes',
  },
];

// SOURCE [21.11.2026]: Расстояния до Сарыгерме (src/lib/transport-data.ts, URL: https://www.dalaman-airport.com/taksi.html), Олюдениза, Ичмелера, Турунча, Акьяки и Каякёя — GoTürkiye (URL: https://www.goturkiye.com) и UKOME Muğla (URL: https://www.mugla.bel.tr/ukome).
export const FEATURED_SATELLITES: SatellitePlaceItem[] = [
  {
    id: 'sarigerme',
    kind: 'beach_hub',
    parentSlug: 'dalaman',
    href: '/articles/sarigerme-guide',
    image: '/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg',
    name: {
      ru: 'Сарыгерме',
      en: 'Sarıgerme',
      de: 'Sarıgerme',
      tr: 'Sarıgerme',
    },
    meta: {
      ru: '16 км (~20 мин) от DLM • Даламан',
      en: '16 km (~20 min) from DLM • Dalaman',
      de: '16 km (~20 Min.) ab DLM • Dalaman',
      tr: 'DLM’den 16 km (~20 dk) • Dalaman',
    },
    summary: {
      ru: '7-километровый мелкий золотой песок, идеально пологий заход для детей, парк SARÇED и отели первой линии.',
      en: '7 km fine golden sand with shallow kid-safe waters, pine-shaded SARÇED park, and beachfront family resorts.',
      de: '7 km feiner Goldsand mit flachem Kindereinstieg, schattigem SARÇED-Park und großen Strandresorts.',
      tr: '7 km ince altın kum, çocuklara uygun sığ deniz, SARÇED parkı ve sahil sıfırı aile otelleri.',
    },
  },
  {
    id: 'oludeniz',
    kind: 'beach_hub',
    parentSlug: 'fethiye',
    href: '/articles/oludeniz',
    image: '/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg',
    name: {
      ru: 'Олюдениз и Бельджекиз',
      en: 'Ölüdeniz & Belcekız',
      de: 'Ölüdeniz & Belcekız',
      tr: 'Ölüdeniz ve Belcekız',
    },
    meta: {
      ru: '~62 км (~60 мин) от DLM • Фетхие',
      en: '~62 km (~60 min) from DLM • Fethiye',
      de: '~62 km (~60 Min.) ab DLM • Fethiye',
      tr: 'DLM’den ~62 km (~60 dk) • Fethiye',
    },
    summary: {
      ru: 'Знаменитая Голубая лагуна без волн, широкий галечный берег Бельджекиза и посадка парапланов с Бабадага.',
      en: 'Iconic sheltered Blue Lagoon, sweeping Belcekız pebble beach, and Babadağ tandem paraglider landings.',
      de: 'Berühmte Blaue Lagune ohne Wellen, weiter Belcekız-Kiesstrand und Gleitschirm-Landeplatz unter dem Babadağ.',
      tr: 'Dalgasız Mavi Lagün, geniş Belcekız plajı ve Babadağ yamaç paraşütü iniş alanı.',
    },
  },
  {
    id: 'icmeler',
    kind: 'beach_hub',
    parentSlug: 'marmaris',
    href: '/articles/icmeler',
    image: '/api/images/locations/marmaris/beach/Icmeler/icmeler.jpg',
    name: {
      ru: 'Ичмелер',
      en: 'İçmeler',
      de: 'İçmeler',
      tr: 'İçmeler',
    },
    meta: {
      ru: '~103 км (~85 мин) от DLM • Мармарис',
      en: '~103 km (~85 min) from DLM • Marmaris',
      de: '~103 km (~85 Min.) ab DLM • Marmaris',
      tr: 'DLM’den ~103 km (~85 dk) • Marmaris',
    },
    summary: {
      ru: 'Зелёный пригород Мармариса в сосновой бухте с ухоженным пляжем и 8-км пешеходным променадом до города.',
      en: 'Lush pine-framed suburb of Marmaris offering a calmer wide beach and an 8 km seaside walking promenade.',
      de: 'Grüner Vorort von Marmaris in einer Pinienbucht mit ruhigerem Strand und 8 km langer Uferpromenade.',
      tr: 'Marmaris’in çam ormanlarıyla çevrili yeşil komşusu; düzenli plajı ve şehre uzanan 8 km’lik yürüyüş yolu.',
    },
  },
  {
    id: 'turunc',
    kind: 'beach_hub',
    parentSlug: 'marmaris',
    href: '/articles/turunc',
    image: '/api/images/locations/marmaris/beach/Turunc/turunc.jpg',
    name: {
      ru: 'Турунч и Амос',
      en: 'Turunç & Amos',
      de: 'Turunç & Amos',
      tr: 'Turunç ve Amos',
    },
    meta: {
      ru: '20 км за перевалом от Мармариса',
      en: '20 km over pass from Marmaris',
      de: '20 km hinter Marmaris',
      tr: 'Marmaris’ten geçit sonrası 20 km',
    },
    summary: {
      ru: 'Камерная бухта с Голубым флагом без сквозного трафика, водное такси до Мармариса и античный театр Амос рядом.',
      en: 'Tucked-away Blue Flag horseshoe bay without through-traffic, summer water taxis, and hillside Amos ruins nearby.',
      de: 'Geschützte Blaue-Flagge-Bucht ohne Durchgangsverkehr, Wassertaxis im Sommer und antikes Theater Amos nebenan.',
      tr: 'Transit trafikten uzak Mavi Bayraklı koy, yazın deniz taksileri ve tepede antik Amos tiyatrosu.',
    },
  },
  {
    id: 'akyaka',
    kind: 'village',
    parentSlug: 'marmaris',
    href: '/articles/akyaka-azmak',
    image: '/api/images/locations/marmaris/beach/Akyaka/Akyaka.jpg',
    name: {
      ru: 'Акьяка и река Азмак',
      en: 'Akyaka & Azmak River',
      de: 'Akyaka & Fluss Azmak',
      tr: 'Akyaka ve Azmak Nehri',
    },
    meta: {
      ru: '~70 км (~60 мин) от DLM • Залив Гёкова',
      en: '~70 km (~60 min) from DLM • Gökova Bay',
      de: '~70 km (~60 Min.) ab DLM • Gökova-Golf',
      tr: 'DLM’den ~70 km (~60 dk) • Gökova Körfezi',
    },
    summary: {
      ru: 'Деревянная архитектура стиля Ула (премия Ага Хана), ледяная прозрачная река Азмак (+12 °C) и кайт-спот Акчапынар.',
      en: 'Aga Khan Award-winning timber houses, ice-cold crystal Azmak River boat rides (+12 °C), and Akçapınar kite bay.',
      de: 'Preisgekrönte Ula-Holzhäuser, eiskalter Azmak-Fluss (+12 °C) mit Restaurantstegen und Kite-Spot Akçapınar.',
      tr: 'Ağa Han ödüllü ahşap mimari, yıl boyu +12 °C berrak Kadın Azmağı ve Akçapınar kitesurf sahili.',
    },
  },
  {
    id: 'kayakoy',
    kind: 'village',
    parentSlug: 'fethiye',
    href: '/articles/kayakoy-ghost-town',
    image: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
    name: {
      ru: 'Каякёй (город-призрак)',
      en: 'Kayaköy Ghost Town',
      de: 'Geisterstadt Kayaköy',
      tr: 'Kayaköy (Hayalet Köy)',
    },
    meta: {
      ru: '8 км от Фетхие • Выезд на полдня',
      en: '8 km from Fethiye • Half-day trip',
      de: '8 km ab Fethiye • Halbtagsausflug',
      tr: 'Fethiye’den 8 km • Yarım günlük gezi',
    },
    summary: {
      ru: 'Сотни опустевших каменных домов Левисси 1923 года, две церкви, садовые мангал-рестораны и тропа в Олюдениз.',
      en: 'Hundreds of abandoned 1923 stone homes of ancient Levissi, two hilltop churches, and scenic trail down to Ölüdeniz.',
      de: 'Hunderte verlassene Steinhäuser aus dem Jahr 1923, zwei Kirchen, Gartenlokale und Wanderpfad nach Ölüdeniz.',
      tr: '1923 mübadelesinden kalan yüzlerce taş ev, iki tarihi kilise, bahçe restoranları ve Ölüdeniz patikası.',
    },
  },
  {
    id: 'faralya-kabak',
    kind: 'village',
    parentSlug: 'fethiye',
    href: '/articles/faralya-kabak',
    image: '/api/images/locations/fethiye/beach/kabakkoyu/kabakkoyu.jpg',
    name: {
      ru: 'Фаралья и долина Кабак',
      en: 'Faralya & Kabak Valley',
      de: 'Faralya & Kabak-Tal',
      tr: 'Faralya ve Kabak Koyu',
    },
    meta: {
      ru: '10–17 км южнее Олюдениза • Ликийская тропа',
      en: '10–17 km south of Ölüdeniz • Lycian Way',
      de: '10–17 km südlich von Ölüdeniz • Lykischer Weg',
      tr: 'Ölüdeniz güneyinde 10–17 km • Likya Yolu',
    },
    summary: {
      ru: 'Деревянные бунгало и йога-ретриты на 350-метровых скалах над Долиной Бабочек, спуск к дикой бухте Кабак.',
      en: 'Cliffside timber bungalows and yoga retreats 350 m above Butterfly Valley, plus a steep path down to Kabak Bay.',
      de: 'Holzbungalows und Yoga-Retreats 350 m über dem Schmetterlingstal sowie steiler Abstieg zur Bucht Kabak.',
      tr: 'Kelebekler Vadisi’nin 350 m üzerinde ahşap bungalovlar, yoga kampları ve bakir Kabak koyuna iniş.',
    },
  },
  {
    id: 'eski-datca',
    kind: 'village',
    parentSlug: 'dacha',
    href: '/articles/datca-peninsula',
    image: '/api/images/locations/dacha/todo/eskidacha/eski_dacha.jpg',
    name: {
      ru: 'Старая Датча (Эски-Датча)',
      en: 'Old Datça (Eski Datça)',
      de: 'Alt-Datça (Eski Datça)',
      tr: 'Eski Datça',
    },
    meta: {
      ru: '2,5 км от порта Датча • Каменный квартал',
      en: '2.5 km from Datça Port • Stone Quarter',
      de: '2,5 km ab Datça-Hafen • Steingassen',
      tr: 'Datça merkezden 2,5 km • Taş Mahalle',
    },
    summary: {
      ru: 'Каменные улочки без раствора в малиновых бугенвиллиях, лавки керамики, кофейни под оливами и дом поэта Джана Юджеля.',
      en: 'Dry-stone alleyways draped in bougainvillea, ceramic studios, olive-shaded cafés, and poet Can Yücel Street.',
      de: 'Trockenstein-Gassen voller Bougainvillea, Keramikläden, Gartencafés unter Olivenbäumen und Haus von Can Yücel.',
      tr: 'Begonvilli taş sokaklar, seramik atölyeleri, zeytin altı kahvecileri ve şair Can Yücel Sokağı.',
    },
  },
  {
    id: 'kekova-simena',
    kind: 'village',
    parentSlug: 'kas',
    href: '/articles/kekova-simena-kalekoy',
    image: '/api/images/locations/kas/ruines/kekova/kekova.jpg',
    name: {
      ru: 'Кекова и деревня Симена (Калекёй)',
      en: 'Kekova & Simena (Kaleköy)',
      de: 'Kekova & Simena (Kaleköy)',
      tr: 'Kekova ve Simena (Kaleköy)',
    },
    meta: {
      ru: '~33 км восточнее Каша • Без автодорог',
      en: '~33 km east of Kaş • Car-free harbor',
      de: '~33 km östlich von Kaş • Autofreies Dorf',
      tr: 'Kaş doğusunda ~33 km • Arabasız köy',
    },
    summary: {
      ru: 'Затонувший античный город, бездорожная деревня-крепость с театром на 300 мест и ликийским саркофагом прямо в море.',
      en: 'Submerged ancient streets, car-free castle village housing Lycia’s smallest 300-seat theater, and sea-top sarcophagus.',
      de: 'Versunkene Stadt vor der Küste, autofreies Burgdorf mit 300-Plätze-Felsentheater und Sarkophag direkt im Wasser.',
      tr: 'Batık antik kent kalıntıları, 300 kişilik kaya tiyatrolu arabasız kale köyü ve deniz içindeki lahit.',
    },
  },
];

export const MORE_SATELLITES: SatellitePlaceItem[] = [
  {
    id: 'kalkan',
    kind: 'beach_hub',
    parentSlug: 'kas',
    href: '/articles/kalkan-guide',
    name: {
      ru: 'Калкан',
      en: 'Kalkan',
      de: 'Kalkan',
      tr: 'Kalkan',
    },
    meta: {
      ru: '~125 км от DLM • Рядом с Кашем',
      en: '~125 km from DLM • Near Kaş',
      de: '~125 km ab DLM • Nahe Kaş',
      tr: 'DLM’den ~125 km • Kaş yakınında',
    },
    summary: {
      ru: 'Белый амфитеатр вилл с инфинити-бассейнами, крышные рестораны, платформы у моря и 10 мин до Капуташа.',
      en: 'Whitewashed cliffside villas, signature rooftop dining, sea-deck clubs, and 10 min hop to Kaputaş Beach.',
      de: 'Weiße Hangvillen, Rooftop-Restaurants, Badeplattformen und nur 10 Minuten bis zum Kaputaş-Strand.',
      tr: 'Beyaz taşlı yamaç villaları, teras restoranları, deniz platformları ve Kaputaş’a 10 dk mesafe.',
    },
  },
  {
    id: 'ovacik-hisaronu',
    kind: 'beach_hub',
    parentSlug: 'fethiye',
    href: '/articles/ovacik-hisaronu',
    name: {
      ru: 'Оваджик и Хисарёню',
      en: 'Ovacık & Hisarönü',
      de: 'Ovacık & Hisarönü',
      tr: 'Ovacık ve Hisarönü',
    },
    meta: {
      ru: 'Плато над Олюденизом • Фетхие',
      en: 'Plateau above Ölüdeniz • Fethiye',
      de: 'Hochplateau über Ölüdeniz • Fethiye',
      tr: 'Ölüdeniz üstü yayla • Fethiye',
    },
    summary: {
      ru: 'Горная прохлада на 4–5 °C ниже побережья, старт Ликийской тропы и более доступное жильё рядом с лагуной.',
      en: 'Cooler pine plateau 4–5 °C fresher than the coast, official start of the Lycian Way, and gentler stay rates.',
      de: 'Kühleres Bergplateau (4–5 °C frischer als am Meer), Start des Lykischen Wegs und günstigere Hotels nahe der Lagune.',
      tr: 'Sahilden 4–5 °C daha serin yayla havası, Likya Yolu başlangıcı ve lagüne yakın daha hesaplı konaklama.',
    },
  },
  {
    id: 'patara',
    kind: 'beach_hub',
    parentSlug: 'kas',
    href: '/articles/patara-guide',
    name: {
      ru: 'Патара и Гелемиш',
      en: 'Patara & Gelemiş',
      de: 'Patara & Gelemiş',
      tr: 'Patara ve Gelemiş',
    },
    meta: {
      ru: '16 км западнее Калкана • Пески и дюны',
      en: '16 km west of Kalkan • Sand dunes',
      de: '16 km westlich von Kalkan • Sanddünen',
      tr: 'Kalkan’dan 16 km batıda • Kumullar',
    },
    summary: {
      ru: '18-километровый заповедный песчаный пляж, античный парламент Булевтерион и бюджетные пансионы деревни Гелемиш.',
      en: '18 km protected sand beach, restored Lycian Parliament ruins, and quiet budget-friendly village pensions.',
      de: '18 km langer geschützter Sandstrand, antikes Parlament (Bouleuterion) und bodenständige Dorfpensionen in Gelemiş.',
      tr: '18 km koruma altındaki kumsal, antik Likya Meclisi kalıntıları ve Gelemiş köyünün sakin pansiyonları.',
    },
  },
  {
    id: 'bozburun-selimiye',
    kind: 'village',
    parentSlug: 'marmaris',
    href: '/articles/bozburun-selimiye-orhaniye',
    name: {
      ru: 'Селимие, Орхание и Бозбурун',
      en: 'Selimiye, Orhaniye & Bozburun',
      de: 'Selimiye, Orhaniye & Bozburun',
      tr: 'Selimiye, Orhaniye ve Bozburun',
    },
    meta: {
      ru: '30–50 км к юго-западу от Мармариса',
      en: '30–50 km southwest of Marmaris',
      de: '30–50 km südwestlich von Marmaris',
      tr: 'Marmaris güneybatısında 30–50 km',
    },
    summary: {
      ru: 'Коса Кызкуму («хождение по воде»), рыбные рестораны на пирсах Селимие и традиционные верфи гулетов в Бозбуруне.',
      en: 'Kızkumu shallow sandspit, candlelit seafood piers in Selimiye, and traditional wooden gulet yards in Bozburun.',
      de: 'Sandbank Kızkumu, Fischrestaurants auf den Holzstegen von Selimiye und traditionelle Gulet-Werften in Bozburun.',
      tr: 'Orhaniye Kızkumu sığlığı, Selimiye’nin iskele restoranları ve Bozburun’daki el yapımı gulet tersaneleri.',
    },
  },
  {
    id: 'yesiluzumlu',
    kind: 'village',
    parentSlug: 'fethiye',
    href: '/articles/yesiluzumlu-village',
    name: {
      ru: 'Йешильузюмлю и Кадианда',
      en: 'Yeşilüzümlü & Cadyanda',
      de: 'Yeşilüzümlü & Kadyanda',
      tr: 'Yeşilüzümlü ve Kadyanda',
    },
    meta: {
      ru: '20 км в горы от Фетхие • 500 м над морем',
      en: '20 km inland from Fethiye • 500 m alt',
      de: '20 km ins Hinterland von Fethiye • 500 m',
      tr: 'Fethiye’den 20 km içerde • 500 m rakım',
    },
    summary: {
      ru: 'Сосновая горная деревня с домашним виноделием, ткачеством дастар, фестивалем сморчков и античным полисом Кадианда.',
      en: 'Cool mountain village famed for home winemaking, dastar handweaving, April mushroom fest, and hilltop Cadyanda ruins.',
      de: 'Kühles Bergdorf mit Hauswein, traditioneller Dastar-Weberei, Morchel-Festival und einsamer Bergruine Kadyanda.',
      tr: 'Ev yapımı şarapları, dastar dokumacılığı, kuzu göbeği festivali ve Kadyanda antik kentiyle ünlü dağ köyü.',
    },
  },
  {
    id: 'yuvarlakcay',
    kind: 'village',
    parentSlug: 'koycegiz',
    href: '/articles/yuvarlakcay-guide',
    name: {
      ru: 'Ущелье Юварлакчай',
      en: 'Yuvarlakçay River Valley',
      de: 'Flusstal Yuvarlakçay',
      tr: 'Yuvarlakçay Vadisi',
    },
    meta: {
      ru: '25–30 км от DLM • Кёйджегиз / Даламан',
      en: '25–30 km from DLM • Köyceğiz / Dalaman',
      de: '25–30 km ab DLM • Köyceğiz / Dalaman',
      tr: 'DLM’den 25–30 km • Köyceğiz / Dalaman',
    },
    summary: {
      ru: 'Ледяная горная река (+10 °C) в тени вековых платанов, беседки и качели прямо над водой, форель и сельский завтрак.',
      en: 'Ice-cold (+10 °C) mountain stream beneath giant plane trees, swings over water, and river-deck trout lunches.',
      de: 'Eisiger Bergfluss (+10 °C) unter Riesenplatanen, Holzplattformen & Schaukeln über dem Wasser und frische Forellen.',
      tr: 'Asırlık çınarlar altında +10 °C buz gibi dere, su üstü köşkler, nehir salıncakları ve kiremitte alabalık.',
    },
  },
];

export const ALL_SATELLITES: SatellitePlaceItem[] = [...FEATURED_SATELLITES, ...MORE_SATELLITES];
