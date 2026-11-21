// SOURCE [21.11.2026]: Геометрия, узлы и характеристики всех 15 этапов сверены с OpenStreetMap
// (URL: https://www.openstreetmap.org/relation/51855, https://www.openstreetmap.org/relation/7235931,
// https://www.openstreetmap.org/relation/19836740, https://www.openstreetmap.org/relation/19834307,
// https://www.openstreetmap.org/relation/11827824, https://www.openstreetmap.org/relation/13418707),
// официальными справочниками Culture Routes Society (URL: https://www.cultureroutesinturkey.com),
// Carian Trail (URL: https://www.cariantrail.com) и моделью рельефа Copernicus DEM через
// Open-Meteo Elevation API (URL: https://api.open-meteo.com/v1/elevation).

export type LocaleCode = 'ru' | 'en' | 'de' | 'tr';

export type TrailZoneId =
  | 'datca-bozburun'
  | 'dalyan-gocek'
  | 'fethiye-oludeniz'
  | 'patara-kas';

export type TrailRegionCategory = 'lycian' | 'carian' | 'dayhike' | 'canyon';

export interface TrailZone {
  id: TrailZoneId;
  code: string;
  title: Record<LocaleCode, string>;
  subtitle: Record<LocaleCode, string>;
  box: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
}

export interface TrailStage {
  id: string;
  trekNumber: number;
  zoneId: TrailZoneId;
  region: TrailRegionCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  distanceKm: number;
  elevationGainM: number;
  elevationLossM: number;
  maxElevationM: number;
  durationHours: string;
  hasDetailedGuide?: boolean;
  title: Record<LocaleCode, string>;
  subtitle: Record<LocaleCode, string>;
  description: Record<LocaleCode, string>;
  startPoint: Record<LocaleCode, string>;
  endPoint: Record<LocaleCode, string>;
  waterSources: Record<LocaleCode, string>;
  highlights: Record<LocaleCode, string[]>;
  gearAdvice: Record<LocaleCode, string>;
  mapsUrl: string;
  image: string;
}

export const TRAIL_ZONES: TrailZone[] = [
  {
    id: 'datca-bozburun',
    code: '01',
    title: {
      ru: 'Датча и Бозбурун',
      en: 'Datça & Bozburun',
      de: 'Datça & Bozburun',
      tr: 'Datça ve Bozburun',
    },
    subtitle: {
      ru: 'Карийская тропа, миндальные сады и Амос',
      en: 'Carian Trail, Knidos & Amos',
      de: 'Karischer Weg, Knidos & Amos',
      tr: 'Karia Yolu, Knidos ve Amos',
    },
    box: { left: '2%', top: '38%', width: '33%', height: '34%' },
  },
  {
    id: 'dalyan-gocek',
    code: '02',
    title: {
      ru: 'Дальян, Кёйджегиз и Гёджек',
      en: 'Dalyan, Köyceğiz & Göcek',
      de: 'Dalyan, Köyceğiz & Göcek',
      tr: 'Dalyan, Köyceğiz ve Göcek',
    },
    subtitle: {
      ru: 'Дельта Кауноса и полуостров Капыдаг',
      en: 'Kaunos Ridge & Kapıdağ Bays',
      de: 'Kaunos-Kamm & Kapıdağ-Buchten',
      tr: 'Kaunos Tepesi ve Kapıdağ Koyları',
    },
    box: { left: '36%', top: '27%', width: '26%', height: '30%' },
  },
  {
    id: 'fethiye-oludeniz',
    code: '03',
    title: {
      ru: 'Фетхие, Олюдениз и Бабадаг',
      en: 'Fethiye, Ölüdeniz & Babadağ',
      de: 'Fethiye, Ölüdeniz & Babadağ',
      tr: 'Fethiye, Ölüdeniz ve Babadağ',
    },
    subtitle: {
      ru: 'Старт Ликийской тропы, Кабак и Саклыкент',
      en: 'Western Lycian Way & Saklıkent',
      de: 'Westlicher Lykischer Weg & Saklıkent',
      tr: 'Batı Likya Yolu ve Saklıkent',
    },
    box: { left: '62%', top: '38%', width: '19%', height: '30%' },
  },
  {
    id: 'patara-kas',
    code: '04',
    title: {
      ru: 'Патара, Калкан и Каш',
      en: 'Patara, Kalkan & Kaş',
      de: 'Patara, Kalkan & Kaş',
      tr: 'Patara, Kalkan ve Kaş',
    },
    subtitle: {
      ru: 'Акведук Деликкемер, Безирган и Кекова',
      en: 'Delikkemer Aqueduct & Kekova',
      de: 'Delikkemer-Aquädukt & Kekova',
      tr: 'Delikkemer Su Kemeri ve Kekova',
    },
    box: { left: '81%', top: '50%', width: '18%', height: '34%' },
  },
];

export const TRAIL_STAGES: TrailStage[] = [
  // ================= ЗОНА 01: ДАТЧА И БОЗБУРУН =================
  {
    id: 'carian-datca-domuzcukuru',
    trekNumber: 1,
    zoneId: 'datca-bozburun',
    region: 'carian',
    difficulty: 2,
    distanceKm: 17.5,
    elevationGainM: 347,
    elevationLossM: 388,
    maxElevationM: 257,
    durationHours: '5.0 - 6.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Старая Датча ➔ Перевал Каргы ➔ Бухта Домузчукуру',
      en: 'Old Datça ➔ Kargı Pass ➔ Domuzçukuru Cove',
      de: 'Alt-Datça ➔ Kargı-Pass ➔ Domuzçukuru',
      tr: 'Eski Datça ➔ Kargı Sırtı ➔ Domuzçukuru',
    },
    subtitle: {
      ru: 'Этап Карийской тропы: миндальные рощи, панорама залива Каргы и уединённая бухта',
      en: 'Carian Trail stage over coastal pine ridges to a roadless Aegean cove',
      de: 'Etappe des Karischen Weges durch Mandelgärten in eine einsame Bucht',
      tr: 'Karia Yolu etabı: badem bahçelerinden karayolu olmayan bakir koya',
    },
    description: {
      ru: 'Один из самых атмосферных отрезков полуострова Датча (этап Карийской тропы 19836740). От каменных переулков Старой Датчи трек выходит на сосновые склоны над заливом Каргы (с опциональным коротким спуском к воде в Каргы), пересекает гребень 257 м и спускается к морю в дикую бухту Домузчукуру, куда нет асфальтированной дороги.',
      en: 'One of the finest stretches of the Datça Peninsula along Carian Trail relation #19836740. Leaving Old Datça’s stone alleys, the path skirts coastal hills above Kargı Bay (with an optional spur down to the beach), climbs over a 257 m ridge, and drops to sea level in secluded Domuzçukuru Cove.',
      de: 'Einer der schönsten Abschnitte der Halbinsel Datça (Karischer Weg #19836740). Von Alt-Datça führt der Track oberhalb der Kargı-Bucht über einen 257-m-Pass hinab in die autofreie Bucht Domuzçukuru.',
      tr: 'Datça Yarımadası’nın en özel Karia Yolu etaplarından biri (#19836740). Eski Datça sokaklarından Kargı üstündeki sırtlara (isteğe bağlı Kargı Koyu inişiyle) geçip 257 m geçidi aşarak karayolu olmayan Domuzçukuru sahiline iner.',
    },
    startPoint: {
      ru: 'Старая Датча (Eski Datça, у каменной площади)',
      en: 'Old Datça (Eski Datça village square)',
      de: 'Alt-Datça (Dorfplatz Eski Datça)',
      tr: 'Eski Datça köy meydanı',
    },
    endPoint: {
      ru: 'Бухта Домузчукуру (Domuzçukuru Koyu)',
      en: 'Domuzçukuru Bay',
      de: 'Bucht Domuzçukuru',
      tr: 'Domuzçukuru Koyu',
    },
    waterSources: {
      ru: 'Кафе и источники в Старой Датче и бухте Каргы (3-й км). На прибрежном участке до Домузчукуру воды нет — берите от 2 л на человека.',
      en: 'Cafes in Old Datça and Kargı Bay (km 3). No springs along the coastal ridge to Domuzçukuru — carry at least 2 L.',
      de: 'Cafés in Alt-Datça und Kargı (km 3). Auf dem Kamm nach Domuzçukuru kein Wasser — mind. 2 L mitnehmen.',
      tr: 'Eski Datça ve Kargı Koyu’nda (3. km) kafe ve çeşme var. Domuzçukuru sırtında su yoktur; en az 2 L su taşıyın.',
    },
    highlights: {
      ru: [
        'Бугенвиллии и каменные дома ремесленников в Старой Датче',
        'Купание в тихой галечной бухте Каргы',
        'Панорамная тропа по сосновому склону над Эгейским морем',
        'Уединённый пляж Домузчукуру без машин и отелей',
      ],
      en: [
        'Bougainvillea-draped stone alleys of Old Datça',
        'Swim stop in calm, pine-framed Kargı Bay',
        'Coastal ridge traverse high above the Aegean Sea',
        'Roadless, serene cove at Domuzçukuru',
      ],
      de: [
        'Blumenumrankte Steingassen von Alt-Datça',
        'Badestopp in der geschützten Kargı-Bucht',
        'Küstenkammweg hoch über der Ägäis',
        'Autofreie Naturbucht Domuzçukuru',
      ],
      tr: [
        'Begonvilli taş evleriyle Eski Datça sokakları',
        'Sakin Kargı Koyu’nda yüzme molası',
        'Ege Denizi üzerindeki çam sırtı yürüyüşü',
        'Araba yolu olmayan bakir Domuzçukuru Koyu',
      ],
    },
    gearAdvice: {
      ru: 'Лучшее время — февраль–май (весной цветёт миндаль) и сентябрь–ноябрь. Нужны треккинговые кроссовки и запас воды; обратно из Домузчукуру можно вернуться лодкой или дойти до Месудие/Хайытбюкю.',
      en: 'Ideal in Feb–May (almond blossom season) and Sep–Nov. Wear trail sneakers and pack swimwear; arrange a boat pickup or continue to Mesudiye.',
      de: 'Ideal von Feb–Mai (Mandelblüte) und Sep–Nov. Profilschuhe und Badesachen einpacken; Rückfahrt per Boot oder Weiterweg nach Mesudiye planen.',
      tr: 'Şubat–Mayıs (badem çiçeği dönemi) ve Eylül–Kasım ayları idealdir. Kaymaz yürüyüş ayakkabısı giyin; dönüş için tekne veya Mesudiye bağlantısı planlayın.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.7433,27.6746&destination=36.6804,27.6149&travelmode=walking',
    image: '/api/images/locations/koycegiz/ruine/Kaunos/kaunos.jpg',
  },
  {
    id: 'carian-palamutbuku-knidos',
    trekNumber: 2,
    zoneId: 'datca-bozburun',
    region: 'carian',
    difficulty: 3,
    distanceKm: 17.5,
    elevationGainM: 409,
    elevationLossM: 403,
    maxElevationM: 229,
    durationHours: '5.0 - 6.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Паламутбюкю / Мурдала ➔ Античный Книдос и маяк Девебойну',
      en: 'Palamutbükü / Murdala ➔ Ancient Knidos & Deveboynu Lighthouse',
      de: 'Palamutbükü / Murdala ➔ Antikes Knidos & Leuchtturm',
      tr: 'Palamutbükü / Murdala ➔ Antik Knidos ve Deveboynu Feneri',
    },
    subtitle: {
      ru: 'Главный финал полуострова Датча на самом стыке Эгейского и Средиземного морей',
      en: 'Westernmost tip of Datça Peninsula where the Aegean meets the Mediterranean',
      de: 'Westspitze der Halbinsel Datça am Treffpunkt zweier Meere',
      tr: 'Datça’nın ucunda Ege ile Akdeniz’in buluştuğu efsanevi antik rota',
    },
    description: {
      ru: 'Классический финишный переход Карийской тропы по западному краю Датчи. Дорога идёт через дикие оливковые террасы и бухту Багьяка мимо суровых скал к двойной гавани античного Книдоса — одного из главных полисов эллинистической Карии — и завершается на мысе Девебойну у старого маяка.',
      en: 'The dramatic western finale of the Carian Trail on the Datça Peninsula. Following rocky goat paths past wild olive terraces and Bağyaka cove, the trail arrives at the twin harbors and marble theater of ancient Knidos before climbing to the Deveboynu Cape lighthouse.',
      de: 'Das eindrucksvolle Westfinale des Karischen Weges. Durch Olivenhaine und vorbei an wilden Buchten erreichen Sie die Doppelhäfen und das Theater von Knidos sowie den Leuchtturm am Kap Deveboynu.',
      tr: 'Karia Yolu’nun Datça Yarımadası’ndaki görkemli final etabı. Yabani zeytin terasları ve Bağyaka koyu üzerinden antik Knidos’un ikiz limanlarına ve tiyatrosuna, ardından Deveboynu Feneri’ne ulaşır.',
    },
    startPoint: {
      ru: 'Окраина Паламутбюкю / развилка у бухты Мурдала',
      en: 'Western trailhead near Palamutbükü / Murdala track',
      de: 'Westlicher Pfadbeginn bei Palamutbükü / Murdala',
      tr: 'Palamutbükü batı çıkışı / Murdala yol ayrımı',
    },
    endPoint: {
      ru: 'Античный Книдос и мыс Девебойну',
      en: 'Ancient Knidos & Cape Deveboynu Lighthouse',
      de: 'Antikes Knidos & Leuchtturm Deveboynu',
      tr: 'Knidos Antik Kenti ve Deveboynu Feneri',
    },
    waterSources: {
      ru: 'На диких участках у моря родников нет. Воду можно пополнить на старте в Паламутбюкю и в кафе у причала Книдоса на финише.',
      en: 'No springs along the arid cape. Refill in Palamutbükü at the start and at the Knidos harbor cafe at the finish.',
      de: 'Auf dem trockenen Kap kein Wasser. Vorräte in Palamutbükü auffüllen; Café am Hafen von Knidos am Ziel.',
      tr: 'Burun boyunca su kaynağı yoktur. Başlangıçta Palamutbükü’nden su alın; bitişte Knidos iskelesinde kafe vardır.',
    },
    highlights: {
      ru: [
        'Античный амфитеатр и руины храма Афродиты в Книдосе',
        'Вид на две гавани, где встречались торговые суда двух морей',
        'Панорама греческого острова Кос и мыса Девебойну на закате',
        'Оливковые рощи и каменистые бухты без толп туристов',
      ],
      en: [
        'Seaside Greek theater and Temple of Aphrodite ruins in Knidos',
        'Twin ancient harbors dividing the Aegean and Mediterranean',
        'Sunset panoramas from Deveboynu Lighthouse toward Kos',
        'Quiet olive terraces and clear swimming coves',
      ],
      de: [
        'Antikes Theater direkt am Meer in Knidos',
        'Die historischen Doppelhäfen zwischen zwei Meeren',
        'Sonnenuntergang am Leuchtturm mit Blick auf Kos',
        'Einsame Olivenhaine und kristallklare Buchten',
      ],
      tr: [
        'Denize bakan Knidos Antik Tiyatrosu ve Afrodit Tapınağı kalıntıları',
        'İki denizi ayıran tarihi ikiz liman manzarası',
        'Deveboynu Feneri’nden Kos Adası’na gün batımı',
        'Sakin zeytinlikler ve el değmemiş koylar',
      ],
    },
    gearAdvice: {
      ru: 'Открытый ветреный участок практически без тени — обязательны шляпа, крем SPF 50+ и не менее 2,5 л воды. Вход на территорию руин Книдоса платный (тарифы на muze.gov.tr).',
      en: 'Exposed, breezy terrain with minimal shade — bring a hat, SPF 50+, and 2.5 L water. Entrance to the Knidos archaeological site requires a ticket (see muze.gov.tr).',
      de: 'Offenes, windiges Gelände kaum Schatten — Hut, Sonnenschutz und 2,5 L Wasser mitnehmen. Eintritt für Knidos erforderlich (muze.gov.tr).',
      tr: 'Gölgesiz ve rüzgarlı açık arazidir — şapka, güneş kremi ve en az 2,5 L su alın. Knidos ören yeri girişi ücretlidir (muze.gov.tr).',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.6708,27.5036&destination=36.6869,27.3728&travelmode=walking',
    image: '/api/images/locations/dalaman/todo/kalynda/kalynda.jpg',
  },
  {
    id: 'carian-turunc-amos-kumlubuk',
    trekNumber: 3,
    zoneId: 'datca-bozburun',
    region: 'dayhike',
    difficulty: 2,
    distanceKm: 6.5,
    elevationGainM: 429,
    elevationLossM: 344,
    maxElevationM: 326,
    durationHours: '2.0 - 3.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Турунч ➔ Античный Амос ➔ Бухта Кумлубюк (Под Мармарисом)',
      en: 'Turunç ➔ Ancient Amos ➔ Kumlubük Bay (Near Marmaris)',
      de: 'Turunç ➔ Antikes Amos ➔ Kumlubük-Bucht (bei Marmaris)',
      tr: 'Turunç ➔ Antik Amos ➔ Kumlubük Koyu (Marmaris)',
    },
    subtitle: {
      ru: 'Видовой хайк по хребту 326 м мимо античного театра Амоса к просторному заливу Кумлубюк',
      en: 'Scenic 326 m ridge traverse past ancient Amos theater to Kumlubük Bay',
      de: 'Aussichtsreiche 326-m-Kammwanderung vorbei an Amos zur Kumlubük-Bucht',
      tr: 'Antik Amos yanından 326 m sırtı aşarak Kumlubük Koyu’na uzanan manzaralı yürüyüş',
    },
    description: {
      ru: 'Самый живописный короткий маршрут из окрестностей Мармариса по Карийской тропе (#19834307). От Турунча путь поднимается на сосновый хребет 326 м с видами на залив (с коротким 200-метровым выходом к амфитеатру Амоса) и спускается прямо к воде просторной бухты Кумлубюк.',
      en: 'The finest short coastal trek near Marmaris following Carian Trail #19834307. Climbing from Turunç over a 326 m pine ridge (with a 200 m spur to the Hellenistic theater of Amos), the route descends along the shoreline to sunny Kumlubük Bay.',
      de: 'Die schönste Kurzwanderung bei Marmaris auf dem Karischen Weg (#19834307). Von Turunç steigen Sie über den 326-m-Kamm (kurzer 200-m-Abstecher zum Theater von Amos) hinab zur Kumlubük-Bucht.',
      tr: 'Marmaris çevresindeki en güzel Karia Yolu yürüyüşü (#19834307). Turunç’tan 326 m sırtına çıkıp (Amos tiyatrosuna 200 m kısa yan geçişle) Kumlubük koyu sahiline iner.',
    },
    startPoint: {
      ru: 'Южная окраина посёлка Турунч (набережная)',
      en: 'Southern end of Turunç waterfront',
      de: 'Südende der Promenade von Turunç',
      tr: 'Turunç sahili güney çıkışı',
    },
    endPoint: {
      ru: 'Пляж бухты Кумлубюк (Kumlubük Plajı)',
      en: 'Kumlubük Beach',
      de: 'Strand von Kumlubük',
      tr: 'Kumlubük Plajı',
    },
    waterSources: {
      ru: 'Магазины и кафе в Турунче и на пляже Кумлубюк. На самом подъёме к театру источников нет.',
      en: 'Shops and cafes in Turunç and Kumlubük beach. No springs on the hilltop ruins.',
      de: 'Läden und Cafés in Turunç und Kumlubük. Auf dem Ruinenhügel kein Wasser.',
      tr: 'Turunç ve Kumlubük sahilinde market ve kafeler bulunur. Tepe üzerinde su yoktur.',
    },
    highlights: {
      ru: [
        'Эллинистический амфитеатр Амоса с видом на всю бухту Кумлубюк',
        'Бесплатный свободный вход к античным крепостным стенам',
        'Ароматный сосновый перевал без сложного рельефа',
        'Финиш на широком галечном пляже Кумлубюк с морепродуктами',
      ],
      en: [
        'Cliffside Hellenistic theater of Amos framing Kumlubük Bay',
        'Free access to ancient city walls and cisterns',
        'Gentle pine-shaded pass suitable for casual walkers',
        'Finish right on Kumlubük beach for a swim and lunch',
      ],
      de: [
        'Hellenistisches Theater von Amos über der Bucht',
        'Freier Zugang zu antiken Stadtmauern',
        'Sanfter Kiefernweg ideal für Einsteiger',
        'Badestopp und Fischrestaurants am Strand von Kumlubük',
      ],
      tr: [
        'Kumlubük Koyu’na bakan Helenistik Amos Antik Tiyatrosu',
        'Ücretsiz gezilebilen antik surlar ve sarnıçlar',
        'Her seviyeye uygun gölgeli çam patikası',
        'Kumlubük Plajı’nda yüzme ve yemek molası',
      ],
    },
    gearAdvice: {
      ru: 'Подходит для новичков и семей. Удобные кроссовки с рельефной подошвой и купальник; обратно в Турунч или Мармарис ходят долмуши и водные такси.',
      en: 'Beginner-friendly. Wear sneakers with grip and pack swimwear; dolmuş vans and water taxis return from Kumlubük to Turunç and Marmaris.',
      de: 'Auch für Einsteiger geeignet. Griffige Turnschuhe und Badesachen mitnehmen; Rückfahrt per Dolmuş oder Wassertaxi.',
      tr: 'Başlangıç seviyesi için uygundur. Kaymaz spor ayakkabı ve mayo alın; dönüşte Turunç ve Marmaris’e dolmuş veya deniz taksisi vardır.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.7745,28.2484&destination=36.7415,28.2698&travelmode=walking',
    image: '/api/images/locations/kas/ruines/theater/theaterkas.jpg',
  },
  {
    id: 'carian-taslica-phoenix-loryma',
    trekNumber: 4,
    zoneId: 'datca-bozburun',
    region: 'carian',
    difficulty: 4,
    distanceKm: 15.9,
    elevationGainM: 457,
    elevationLossM: 736,
    maxElevationM: 426,
    durationHours: '5.0 - 6.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Ташлыджа (Античный Феникс) ➔ Крепость Лорима (Бозуккале)',
      en: 'Taşlıca (Ancient Phoenix) ➔ Loryma Fortress (Bozukkale)',
      de: 'Taşlıca (Antikes Phoenix) ➔ Festung Loryma (Bozukkale)',
      tr: 'Taşlıca (Antik Feniks) ➔ Loryma Kalesi (Bozukkale)',
    },
    subtitle: {
      ru: 'Карийский хребет на полуострове Бозбурун с видом на остров Родос',
      en: 'Wild Bozburun limestone ridge leading to a secluded ancient sea fortress',
      de: 'Wilder Kalksteinkamm auf Bozburun hinab zur antiken Seefestung Loryma',
      tr: 'Bozburun’un sarp sırtlarından Rodos manzaralı antik deniz kalesine',
    },
    description: {
      ru: 'Эталонный дикий этап Карийской тропы на южной оконечности полуострова Бозбурун. Маршрут начинается в каменной деревне Ташлыджа, поднимается к руинам античного города Феникс (Phoenix) с редкими ступенчатыми пирамидальными гробницами и затем спускается по пустынным известняковым склонам к мощной эллинистической цитадели Лорима в бухте Бозуккале.',
      en: 'A signature wild stage of the Carian Trail at the tip of the Bozburun Peninsula. Starting in stone-built Taşlıca, the path climbs past the stepped-pyramid tombs of ancient Phoenix before crossing arid karst ridges down to the monumental Hellenistic sea fortress of Loryma in Bozukkale Bay.',
      de: 'Eine authentische Bergetappe auf der Halbinsel Bozburun. Von Taşlıca führt der Weg vorbei an den Stufenpyramiden-Gräbern von Phoenix über wilde Karsthänge hinab zur hellenistischen Festung Loryma.',
      tr: 'Bozburun Yarımadası ucundaki en vahşi Karia Yolu etabı. Taşlıca köyünden başlayan patika, basamaklı piramit mezarlarıyla ünlü antik Phoenix kentini geçip kıraç karstik tepelerden Bozukkale’deki görkemli Loryma Kalesi’ne iner.',
    },
    startPoint: {
      ru: 'Деревня Ташлыджа (Taşlıca Köyü, центр)',
      en: 'Taşlıca Village center',
      de: 'Dorfzentrum Taşlıca',
      tr: 'Taşlıca Köyü merkezi',
    },
    endPoint: {
      ru: 'Бухта Бозуккале и крепость Лорима (или продолжение к Сёгюту)',
      en: 'Bozukkale Bay & Loryma Fortress (exit option to Söğüt)',
      de: 'Bucht Bozukkale & Festung Loryma',
      tr: 'Bozukkale Koyu ve Loryma Kalesi',
    },
    waterSources: {
      ru: 'Колонка и магазин в Ташлыдже; затем на всём каменистом хребте воды нет до гостевых причалов/таверн в бухте Бозуккале (открыты в тёплый сезон).',
      en: 'Village shops in Taşlıca; completely dry across the karst ridge until seasonal yacht taverns in Bozukkale Bay.',
      de: 'Laden in Taşlıca; auf dem Karstkamm kein Wasser bis zu den saisonalen Tavernen in Bozukkale.',
      tr: 'Taşlıca köyünde bakkal bulunur; sarp geçitte su yoktur, sezonluk restoranlar Bozukkale koyundadır.',
    },
    highlights: {
      ru: [
        'Ступенчатая карийская гробница-пирамида в руинах Феникса',
        'Суровые каменные террасы полуострова Бозбурун',
        'Грандиозная 300-метровая стена античной крепости Лорима',
        'Панорама пролива в сторону греческого острова Родос и Сими',
      ],
      en: [
        'Rare stepped-pyramid tombs at ancient Phoenix',
        'Untouched dry-stone shepherd terraces across Bozburun',
        'Massive Hellenistic citadel walls of Loryma guarding the cove',
        'Clear views toward Rhodes and Symi islands',
      ],
      de: [
        'Seltene Stufenpyramiden-Gräber von Phoenix',
        'Ursprüngliche Steinterrassen der Halbinsel Bozburun',
        'Beeindruckende hellenistische Mauern der Festung Loryma',
        'Ausblick bis zu den griechischen Inseln Rhodos und Symi',
      ],
      tr: [
        'Antik Phoenix kentindeki nadir basamaklı piramit mezar anıtları',
        'Bozburun’un el değmemiş taş terasları ve keçi patikaları',
        'Koyu koruyan dev Helenistik Loryma Kalesi surları',
        'Rodos ve Sömbeki adalarına uzanan açık deniz manzarası',
      ],
    },
    gearAdvice: {
      ru: 'Острые известняковые камни и отсутствие тени — только прочные ботинки, минимум 3 л воды, офлайн-карта и договорённость о возврате (до трассы от Бозуккале идёт грунтовка или забирают из Сёгюта).',
      en: 'Sharp karst limestone and zero shade — sturdy boots, 3 L+ water, offline GPS maps, and pre-arranged pickup or hike back via Serçe/Söğüt required.',
      de: 'Scharfkantiger Kalkstein ohne Schatten — feste Bergschuhe, mind. 3 L Wasser, Offline-GPS und Rücktransfer einplanen.',
      tr: 'Keskin karstik taşlar ve gölgesiz parkur — sert tabanlı bot, 3 L su, çevrimdışı harita ve önceden ayarlanmış araç/tekne dönüşü şarttır.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.6305,28.1180&destination=36.5653,28.0124&travelmode=walking',
    image: '/api/images/locations/fethiye/ruines/lycaintombs/lyciantombs.jpg',
  },

  // ================= ЗОНА 02: ДАЛЬЯН, КЁЙДЖЕГИЗ И ГЁДЖЕК =================
  {
    id: 'dalyan-kaunos-radar',
    trekNumber: 5,
    zoneId: 'dalyan-gocek',
    region: 'dayhike',
    difficulty: 2,
    distanceKm: 3.8,
    elevationGainM: 306,
    elevationLossM: 98,
    maxElevationM: 237,
    durationHours: '2.5 - 3.5',
    hasDetailedGuide: true,
    title: {
      ru: 'Античный Каунос ➔ Утёс Чандыр (Смотровая над дельтой Дальяна и Изтузу)',
      en: 'Ancient Kaunos ➔ Çandır Cliff Viewpoint (Dalyan Delta & İztuzu)',
      de: 'Antikes Kaunos ➔ Çandır-Aussichtsfelsen (Dalyan-Delta & İztuzu)',
      tr: 'Antik Kaunos ➔ Çandır Seyir Kayalıkları (Dalyan Deltası ve İztuzu)',
    },
    subtitle: {
      ru: 'Панорама лабиринта каналов и 4,5-километровой косы Изтузу с высоты 237 м (3,8 км в одну сторону / ~7,5 км туда-обратно)',
      en: 'Bird’s-eye view of the reed delta & İztuzu Spit from 237 m cliffside (3.8 km one-way / ~7.5 km round-trip)',
      de: 'Panoramablick auf Schilfdelta und İztuzu aus 237 m Höhe (3,8 km einfach / ~7,5 km hin & zurück)',
      tr: '237 m yükseklikten Dalyan deltası ve İztuzu panoraması (3,8 km tek yön / ~7,5 km gidiş-dönüş)',
    },
    description: {
      ru: 'Лучший видовой хайк в центре региона Даламан. Переправившись на лодке через реку Дальян в Чандыр, вы проходите мимо руин античного Кауноса и поднимаетесь на западный смотровой утёс Чандыр (237 м над уровнем моря) — именно его туристы часто ищут по запросу «Радар», хотя одноимённая горная вышка Гёкбель лежит на восточном берегу. Отсюда открывается открыточный ракурс на дельту и косу Изтузу.',
      en: 'The premier viewpoint hike in central Dalaman. Ferry across the Dalyan River to Çandır, pass ancient Kaunos ruins, and climb 3.8 km (~7.5 km round-trip) to the dramatic 237 m western Çandır cliff balcony — often informally searched as the Dalyan "Radar" viewpoint (while the eastern Gökbel Radar ridge sits across the river). Unrivaled panorama over İztuzu Spit.',
      de: 'Die aussichtsreichste Kurztour bei Dalyan: Nach der Flussüberfahrt nach Çandır steigen Sie an den Ruinen von Kaunos vorbei 3,8 km (ca. 7,5 km hin & zurück) hinauf zum 237 m hohen Aussichtsfelsen über dem İztuzu-Strand.',
      tr: 'Dalaman merkezindeki en ikonik seyir yürüyüşü. Dalyan’dan sandalla Çandır yakasına geçip antik Kaunos yanından yükselen 237 m Çandır seyir kayalıklarına (tek yön 3,8 km / gidiş-dönüş ~7,5 km) çıkılır; sıklıkla karşı kıyıdaki Gökbel Radar Tepesi ile karıştırılsa da en ünlü delta ve İztuzu kumsalı fotoğrafı buradan çekilir.',
    },
    startPoint: {
      ru: 'Лодочная переправа в Дальяне → вход к руинам Кауноса (деревня Чандыр, 29 м)',
      en: 'Dalyan rowboat crossing → Kaunos ruins trailhead (Çandır, 29 m)',
      de: 'Flussfähre Dalyan → Ruinen von Kaunos (Çandır, 29 m)',
      tr: 'Dalyan sandal iskelesi → Kaunos ören yeri girişi (Çandır, 29 m)',
    },
    endPoint: {
      ru: 'Западный смотровой утёс Чандыр над Изтузу (237 м) и возврат тем же путём',
      en: 'Çandır Cliff Balcony (237 m) above İztuzu & return to crossing',
      de: 'Çandır-Aussichtsfelsen (237 m) & Rückweg zur Fähre',
      tr: 'Çandır Seyir Tepesi (237 m) ve Kaunos iskelesine dönüş',
    },
    waterSources: {
      ru: 'Кафе в Чандыре и у переправы; на самом подъёме на вершину источников нет — берите 2 л воды на человека.',
      en: 'Cafes at the crossing and Çandır; no springs on the ascent — carry 2 L per person.',
      de: 'Cafés an der Fähre und in Çandır; am Berg kein Wasser — 2 L mitnehmen.',
      tr: 'İskele ve Çandır’da büfe vardır; tırmanışta çeşme yoktur — kişi başı 2 L su alın.',
    },
    highlights: {
      ru: [
        'Акрополь и римский театр античного Кауноса по пути вверх',
        'Лучший ракурс в регионе на извилистое русло реки Дальян и песчаную косу Изтузу',
        'Тихие хвойные склоны в 25 минутах от аэропорта Даламан',
        'Совмещение прогулки с осмотром ликийских скальных гробниц',
      ],
      en: [
        'Ancient Kaunos theater and acropolis walls on the lower slope',
        'Unrivaled bird’s-eye view over the Dalyan reed maze and İztuzu spit',
        'Quiet pine ridge just 25 minutes from Dalaman Airport',
        'Easy to combine with a boat look at the Lycian rock tombs',
      ],
      de: [
        'Akropolis und Theater von Kaunos am Fuße des Berges',
        'Berühmtester Blick auf die Flussschleifen und İztuzu',
        'Ruhiger Kiefernberg nur 25 Min. vom Flughafen DLM',
        'Ideal kombinierbar mit den Felsengräbern von Dalyan',
      ],
      tr: [
        'Tırmanış başlangıcında Kaunos Antik Tiyatrosu ve akropolü',
        'Dalyan nehir kıvrımları ve İztuzu sahiline kuş bakışı en ikonik açı',
        'Dalaman Havalimanı’na 25 dakika mesafede sakin orman rotası',
        'Kaya mezarları tekne gezisiyle kolayca birleştirilebilir',
      ],
    },
    gearAdvice: {
      ru: 'Тропа местами идёт по старой каменистой грунтовке и крутому подъёму — наденьте кроссовки с хорошим протектором и начинайте утром, пока нет зноя.',
      en: 'Steep rocky forest track in sections — wear supportive trail shoes and start early to avoid midday heat.',
      de: 'Teils steile Schotter- und Waldpfade — feste Schuhe tragen und früh am Morgen starten.',
      tr: 'Bazı kısımlar dik ve taşlıktır — iyi tabanlı ayakkabı giyin ve sıcak basmadan sabah erken başlayın.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.8253,28.6227&destination=36.8130,28.6057&travelmode=walking',
    image: '/api/images/locations/dalyan/todo/radar/radar.jpg',
  },
  {
    id: 'gocek-kapidag-lydae',
    trekNumber: 6,
    zoneId: 'dalyan-gocek',
    region: 'dayhike',
    difficulty: 3,
    distanceKm: 10.1,
    elevationGainM: 696,
    elevationLossM: 567,
    maxElevationM: 527,
    durationHours: '4.0 - 5.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Бухта Сарсала ➔ Залив Хамам ➔ Руины Лидая (Полуостров Капыдаг)',
      en: 'Sarsala Bay ➔ Hamam (Cleopatra) Bay ➔ Ancient Lydae (Kapıdağ)',
      de: 'Sarsala-Bucht ➔ Hamam-Bucht ➔ Antikes Lydae (Kapıdağ)',
      tr: 'Sarsala Koyu ➔ Hamam Koyu ➔ Antik Lydae (Kapıdağ)',
    },
    subtitle: {
      ru: 'Горный хребет 527 м над заливом Гёджек, затопленные бани Клеопатры и лесные мавзолеи Лидая',
      en: '527 m coastal ridge above Göcek Gulf linking sunken Cleopatra Baths with forest ruins of Lydae',
      de: '527-m-Küstenkamm über dem Golf von Göcek zwischen Kleopatra-Bad und den Ruinen von Lydae',
      tr: 'Göcek körfezi üzerinde 527 m sırt geçişi, batık Kleopatra Hamamı ve orman içi Lydae kalıntıları',
    },
    description: {
      ru: 'Живописный переход по лесистому полуострову Капыдаг между заливом Сарсала, бухтой Клеопатры (Хамам) и горной седловиной с развалинами античного полиса Лидай (Lydae). От причала Сарсалы тропа набирает 527 м на панорамный лесной гребень над островами Гёджека, спускается к руинам римских бань у воды в бухте Хамам и далее поднимается к древним мавзолеям и цистернам Лидая.',
      en: 'A rewarding point-to-point traverse on the forested Kapıdağ Peninsula connecting Sarsala Bay, Hamam (Cleopatra’s Bath) cove, and the secluded highland ruins of Lydae. Climbing a 527 m forested saddle with wide vistas across Göcek’s islands, the trail drops past sunken seaside ruins at Hamam before ascending to ancient stone mausoleums.',
      de: 'Abwechslungsreiche Traverse auf der bewaldeten Halbinsel Kapıdağ von Sarsala über den 527-m-Kamm hinab zur Hamam-Bucht (Kleopatra-Bad) und hinauf zu den verborgenen Bergruinen von Lydae.',
      tr: 'Kapıdağ Yarımadası’nın çam ormanları içinde Sarsala Koyu’nu 527 m sırt üzerinden Kleopatra Hamamı’na ve yamaçtaki antik Lydae harabelerine bağlayan ıssız yürüyüş rotası.',
    },
    startPoint: {
      ru: 'Бухта Сарсала (пляж и причал, 36.6627, 28.8518)',
      en: 'Sarsala Bay beach & jetty (36.6627, 28.8518)',
      de: 'Strand & Steg der Bucht Sarsala (36.6627, 28.8518)',
      tr: 'Sarsala Koyu sahili ve iskelesi (36.6627, 28.8518)',
    },
    endPoint: {
      ru: 'Руины античного Лидая над заливом Гёгджек (36.6215, 28.8569)',
      en: 'Ancient Lydae ruins ridge (36.6215, 28.8569)',
      de: 'Antike Ruinen von Lydae (36.6215, 28.8569)',
      tr: 'Antik Lydae kalıntıları (36.6215, 28.8569)',
    },
    waterSources: {
      ru: 'Питьевой воды на тропе нет (кафе у бухты Хамам и Сарсала работают только в навигацию с мая по октябрь). Несите весь запас воды с собой.',
      en: 'No reliable trail springs (seasonal yacht jetties open May–Oct only). Carry all water from Göcek or Dalaman.',
      de: 'Keine Trinkwasserquellen unterwegs (Steg-Tavernen nur Mai–Okt geöffnet). Gesamten Vorrat mitbringen.',
      tr: 'Parkurda içme suyu yoktur (koylardaki iskeleler sadece Mayıs–Ekim arası açıktır). Tüm suyunuzu yanınızda getirin.',
    },
    highlights: {
      ru: [
        'Античные мавзолеи, цистерны и храм Лидая в глубине хвойного леса',
        'Вид сверху на знаменитые 12 островов залива Гёджек',
        'Тропа над затопленными римскими банями в бухте Клеопатры',
        'Абсолютная тишина и аромат можжевельника и земляничника',
      ],
      en: [
        'Forest-shrouded Roman mausoleums and agora of Lydae',
        'Elevated views across Göcek’s 12 Islands yacht sanctuary',
        'Overlook above the sunken ruins of Cleopatra’s Bath',
        'Complete solitude among wild arbutus and pine trees',
      ],
      de: [
        'Im Wald verborgene römische Mausoleen von Lydae',
        'Ausblick über die 12 Inseln vor Göcek',
        'Blick auf die versunkenen Ruinen der Kleopatra-Bucht',
        'Stille Natur abseits großer Straßen',
      ],
      tr: [
        'Orman içine gizlenmiş antik Lydae anıt mezarları ve agorası',
        'Göcek’in ünlü 12 Adalar körfezine tepeden bakış',
        'Kleopatra Hamamı’nın su altındaki kalıntıları üzerinden geçiş',
        'Sadece yatların ve yürüyüşçülerin bildiği tam sessizlik',
      ],
    },
    gearAdvice: {
      ru: 'Сотовая связь на полуострове нестабильна — заранее скачайте офлайн-карту. Если едете из Даламана или Гёджека на авто, последний серпантин требует аккуратного вождения.',
      en: 'Cell coverage is patchy — download offline maps in advance. Drive cautiously on the steep gravel descent if arriving by car.',
      de: 'Mobilfunknetz lückenhaft — Offline-Karte herunterladen. Bei Anfahrt mit dem Auto vorsichtig auf den Bergserpentinen fahren.',
      tr: 'Telefon sinyali yer yer kesilir — çevrimdışı harita indirin. Araçla ulaşacaksanız toprak dağ yolunda dikkatli sürün.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.6627,28.8518&waypoints=36.6408,28.8549&destination=36.6215,28.8569&travelmode=walking',
    image: '/api/images/locations/gocek/beach/hamam/hamam.jpg',
  },

  // ================= ЗОНА 03: ФЕТХИЕ, ОЛЮДЕНИЗ И БАБАДАГ =================
  {
    id: 'kayakoy-oludeniz',
    trekNumber: 7,
    zoneId: 'fethiye-oludeniz',
    region: 'dayhike',
    difficulty: 2,
    distanceKm: 5.3,
    elevationGainM: 284,
    elevationLossM: 429,
    maxElevationM: 278,
    durationHours: '2.0 - 2.5',
    hasDetailedGuide: true,
    title: {
      ru: 'Каякёй ➔ (Бухта Soğuk Su) ➔ Олюдениз',
      en: 'Kayaköy ➔ (Cold Water Bay) ➔ Ölüdeniz Blue Lagoon',
      de: 'Kayaköy ➔ (Bucht Soğuk Su) ➔ Blaue Lagune Ölüdeniz',
      tr: 'Kayaköy ➔ (Soğuk Su Koyu) ➔ Ölüdeniz Mavi Lagün',
    },
    subtitle: {
      ru: 'Главный однодневный хайк региона: город-призрак, сосновый гребень 278 м и спуск к лагуне',
      en: 'Signature day hike: ghost village, 278 m pine ridge, Cold Water Bay branch & Blue Lagoon',
      de: 'Die berühmteste Tageswanderung: Geisterdorf, 278-m-Kamm & Blaue Lagune',
      tr: 'Bölgenin bir numaralı günübirlik rotası: hayalet şehir, 278 m sırt ve Mavi Lagün',
    },
    description: {
      ru: 'Самый популярный однодневный маршрут под Фетхие по официальной разметке OpenStreetMap (Relation #11827824). От южной кромки каменного города-призрака Каякёй тропа поднимается на перевал 278 м с видами на Бабадаг, предлагает боковое ответвление (+1,7 км) в бухту Холодной Воды Soğuk Su Koyu, а затем по древним каменным плитам спускается прямо к Голубой лагуне Олюдениза.',
      en: 'Fethiye’s most beloved short trek following the mapped footpath (OSM Relation #11827824). Starting from the southern edge of ghost village Kayaköy, the trail climbs a 278 m ridge overlooking Mount Babadağ, offers an optional 1.7 km branch down to spring-fed Cold Water Bay (Soğuk Su Koyu), and descends stone paving straight into Ölüdeniz Blue Lagoon.',
      de: 'Die beliebteste Tageswanderung bei Fethiye (OSM Relation #11827824). Vom Geisterdorf Kayaköy steigen Sie auf den 278 m hohen Kiefernpass, können zur kalten Bucht Soğuk Su abzweigen und wandern hinab zur Blauen Lagune.',
      tr: 'Fethiye bölgesinin en sevilen günübirlik rotası (OSM Relation #11827824). Kayaköy hayalet şehrinin güneyinden 278 m rakımlı sırta tırmanır, dileyenler için 1,7 km’lik Soğuk Su Koyu ayrımını sunar ve tarihi taş döşeme patikadan Ölüdeniz Mavi Lagünü’ne iner.',
    },
    startPoint: {
      ru: 'Каякёй, южный выход из руин (36.5759, 29.0923, выс. 150 м)',
      en: 'Kayaköy south ruins trailhead (36.5759, 29.0923, elev. 150 m)',
      de: 'Kayaköy Südausgang der Ruinen (36.5759, 29.0923, 150 m)',
      tr: 'Kayaköy güney çıkışı (36.5759, 29.0923, rakım 150 m)',
    },
    endPoint: {
      ru: 'Голубая лагуна / Олюдениз (36.5473, 29.1213, выс. 5 м)',
      en: 'Ölüdeniz Blue Lagoon / Belceğiz (36.5473, 29.1213, elev. 5 m)',
      de: 'Blaue Lagune Ölüdeniz (36.5473, 29.1213, 5 m)',
      tr: 'Ölüdeniz Mavi Lagün (36.5473, 29.1213, rakım 5 m)',
    },
    waterSources: {
      ru: 'Купить воду перед стартом в Каякёе. На самом гребне источников нет — родники и таверна есть только в ответвлении в бухту Soğuk Su и на финише в Олюденизе.',
      en: 'Stock up in Kayaköy before starting. Dry ridge; cold springs and a seasonal tavern await only via the Soğuk Su side branch or at the Ölüdeniz finish.',
      de: 'Wasser vorab in Kayaköy kaufen. Auf dem Kamm trocken; Quellen gibt es erst beim Abstecher nach Soğuk Su oder am Ziel in Ölüdeniz.',
      tr: 'Başlamadan önce Kayaköy’den su alın. Ana sırtta çeşme yoktur; su ve mola sadece Soğuk Su Koyu ayrımında veya Ölüdeniz’de mevcuttur.',
    },
    highlights: {
      ru: [
        'Атмосферные руины 350+ каменных домов и церквей города-призрака Каякёй',
        'Гребень 278 м с панорамой сосен, скал и взлетающих над морем парапланов',
        'Опциональный спуск (+1,7 км) в бухту Soğuk Su с ледяными ключами в море',
        'Финиш у лазурной косы Олюдениза с удобным возвратом на долмуше',
      ],
      en: [
        'Atmospheric abandoned Greek stone town of Kayaköy at the trailhead',
        '278 m forested crest with views of Mount Babadağ and paragliders',
        'Optional 1.7 km detour to Soğuk Su Cove’s icy underwater springs',
        'Finish directly by Ölüdeniz Blue Lagoon with easy dolmuş return',
      ],
      de: [
        'Historische Steinhäuser des Geisterdorfs Kayaköy am Start',
        '278 m hoher Kamm mit Blick auf Gleitschirmflieger am Babadağ',
        'Optionaler Abstecher (1,7 km) zur eiskalten Quelle in Soğuk Su',
        'Ziel an der Blauen Lagune von Ölüdeniz mit dichtem Dolmuş-Takt',
      ],
      tr: [
        'Rota başlangıcında mistik Kayaköy taş evleri ve kiliseleri',
        'Babadağ ve süzülen yamaç paraşütleri eşliğinde 278 m sırt geçişi',
        'İsteğe bağlı 1,7 km’lik soğuk su kaynaklı Soğuk Su Koyu etabı',
        'Ölüdeniz Mavi Lagün kıyısında bitiş ve kolay dolmuş dönüşü',
      ],
    },
    gearAdvice: {
      ru: 'Отполированные ногами известняковые камни на спуске к Олюденизу могут скользить — идите только в цепких кроссовках, а не в сандалиях.',
      en: 'Polished limestone paving on the descent to Ölüdeniz can be slick — wear grippy trail sneakers, never flip-flops.',
      de: 'Abgegriffene Kalksteine im Abstieg können rutschig sein — nur Schuhe mit gutem Profil tragen.',
      tr: 'Ölüdeniz inişindeki cilalanmış kireçtaşları kaygandır — kesinlikle kaymaz spor veya yürüyüş ayakkabısı giyin.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.5759,29.0923&destination=36.5473,29.1213&travelmode=walking',
    image: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
  },
  {
    id: 'ovacik-faralya',
    trekNumber: 8,
    zoneId: 'fethiye-oludeniz',
    region: 'lycian',
    difficulty: 3,
    distanceKm: 13.8,
    elevationGainM: 627,
    elevationLossM: 608,
    maxElevationM: 797,
    durationHours: '4.5 - 5.5',
    hasDetailedGuide: true,
    title: {
      ru: 'Оваджик ➔ Кирме ➔ Фаралья (Официальный старт Ликийской тропы)',
      en: 'Ovacık ➔ Kirme ➔ Faralya (Official Lycian Way Stage 1)',
      de: 'Ovacık ➔ Kirme ➔ Faralya (Offizielle Etappe 1 Lykischer Weg)',
      tr: 'Ovacık ➔ Kirme ➔ Faralya (Resmi Likya Yolu 1. Etap)',
    },
    subtitle: {
      ru: 'Траверс западного плеча Бабадага до перевала 797 м с открыточной панорамой Голубой лагуны',
      en: '797 m mountain traverse along Babadağ’s western slope above Ölüdeniz Lagoon',
      de: '797-m-Höhenwanderung am Westabhang des Babadağ über der Blauen Lagune',
      tr: 'Babadağ batı yamacından 797 m geçide çıkan Ölüdeniz ve Kelebekler Vadisi etabı',
    },
    description: {
      ru: 'Классический первый день 540-километровой Ликийской тропы (OSM Relation #51855). От каменной стартовой арки в Оваджике тропа набирает высоту до 797 м по западному склону Бабадага, огибая горные террасы мимо деревень Козагач и Кирме и выходя к краю обрыва над Долиной Бабочек в Фаралье.',
      en: 'The iconic Stage 1 of the 540 km Lycian Way (OSM Relation #51855). Leaving the stone arch in Ovacık, the path climbs steadily to 797 m along the flank of Mount Babadağ, sweeping high above Ölüdeniz Lagoon through Kozağaç and Kirme before ending above Butterfly Valley in Faralya.',
      de: 'Die klassische erste Etappe des 540 km langen Lykischen Weges (OSM Relation #51855). Vom Tor in Ovacık führt der Weg auf bis zu 797 m am Babadağ entlang über Kozağaç und Kirme nach Faralya über dem Schmetterlingstal.',
      tr: '540 km’lik Likya Yolu’nun efsanevi ilk etabı (OSM Relation #51855). Ovacık başlangıç takından Babadağ’ın batı yamacına 797 m rakıma tırmanan patika, Kozağaç ve Kirme köylerinden geçerek Kelebekler Vadisi üzerindeki Faralya köyüne varır.',
    },
    startPoint: {
      ru: 'Оваджик, стартовая арка Ликийской тропы (36.5664, 29.1379, 296 м)',
      en: 'Ovacık Lycian Way Gate (36.5664, 29.1379, 296 m)',
      de: 'Startbogen des Lykischen Weges in Ovacık (36.5664, 29.1379, 296 m)',
      tr: 'Ovacık Likya Yolu Başlangıç Takı (36.5664, 29.1379, 296 m)',
    },
    endPoint: {
      ru: 'Деревня Фаралья (смотровая над Долиной Бабочек)',
      en: 'Faralya Village (Butterfly Valley viewpoint)',
      de: 'Dorf Faralya (Aussichtspunkt Schmetterlingstal)',
      tr: 'Faralya Köyü (Kelebekler Vadisi seyir noktası)',
    },
    waterSources: {
      ru: 'Источник на первом отрезке подъёма и сельские краны/чайные в Козагаче и Кирме (сезонно могут пересыхать к сентябрю). Несите минимум 2,5 л.',
      en: 'Early ascent tap plus village cisterns/tea stalls in Kozağaç and Kirme (springs can run dry late summer). Carry at least 2.5 L.',
      de: 'Brunnen im ersten Anstieg sowie in Kozağaç und Kirme (im Spätsommer teils trocken). Mind. 2,5 L mitnehmen.',
      tr: 'İlk tırmanışta çeşme ile Kozağaç ve Kirme köylerinde su/çay imkanı vardır (yaz sonunda kuruyabilir). En az 2,5 L su alın.',
    },
    highlights: {
      ru: [
        'Знаменитая каменная арка старта Ликийской тропы в Оваджике',
        'Каноническая смотровая на песчаную косу Олюдениза на фоне парапланов',
        'Старинные горные цистерны и пастушьи тропы через Кирме',
        'Панорама отвесного каньона Долины Бабочек в Фаралье',
      ],
      en: [
        'Iconic stone archway marking the start of the Lycian Way',
        'Postcard viewpoint overlooking Oludeniz Lagoon and soaring paragliders',
        'Ancient stone water cisterns and rural lanes through Kirme',
        'Cliff-edge overview into Butterfly Valley gorge at Faralya',
      ],
      de: [
        'Symbolischer Startbogen in Ovacık',
        'Panorama auf die Sandzunge von Ölüdeniz und Gleitschirme',
        'Traditionelle Steinterrassen und Zisternen bei Kirme',
        'Blick in die Schlucht des Schmetterlingstals bei Faralya',
      ],
      tr: [
        'Ovacık’taki simgesel Likya Yolu başlangıç takı',
        'Ölüdeniz Lagünü ve gökyüzündeki yamaç paraşütleri manzarası',
        'Kirme ve Kozağaç yayla yollarındaki tarihi sarnıçlar',
        'Faralya’da Kelebekler Vadisi uçurumuna tepeden bakış',
      ],
    },
    gearAdvice: {
      ru: 'Суммарный набор +627 м и затяжной спуск −608 м по каменистому грунту ощутимы для колен: берите треккинговые палки и высокие ботинки. Назад в Олюдениз/Фетхие ходят долмуши из Фаральи.',
      en: 'Sustained +627 m climbing and −608 m stony descent — trekking poles and ankle-supporting boots strongly advised. Return via Faralya–Fethiye dolmuş.',
      de: 'Langer +627-m-Aufstieg und −608-m-Abstieg auf Geröll — Trekkingstöcke und knöchelhohe Schuhe empfohlen. Rückfahrt per Dolmuş ab Faralya.',
      tr: 'Taşlık zeminde +627 m tırmanış ve −608 m iniş için trekking botu ve baton önerilir. Faralya’dan Fethiye’ye dolmuşla dönülebilir.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.5664,29.1379&waypoints=36.5356,29.1436&destination=36.4946,29.1319&travelmode=walking',
    image: '/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg',
  },
  {
    id: 'faralya-kabak',
    trekNumber: 9,
    zoneId: 'fethiye-oludeniz',
    region: 'lycian',
    difficulty: 2,
    distanceKm: 5.9,
    elevationGainM: 369,
    elevationLossM: 630,
    maxElevationM: 653,
    durationHours: '2.5 - 3.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Фаралья ➔ Обзор Долины Бабочек ➔ Бухта Кабак',
      en: 'Faralya ➔ Butterfly Valley Overlook ➔ Kabak Bay',
      de: 'Faralya ➔ Schmetterlingstal-Aussicht ➔ Kabak-Bucht',
      tr: 'Faralya ➔ Kelebekler Vadisi Seyir ➔ Kabak Koyu',
    },
    subtitle: {
      ru: 'Сосновые террасы над отвесными скалами и спуск в долину эко-кемпингов',
      en: 'Pine-forest traverse high above sea cliffs down to bohemian Kabak beach',
      de: 'Kiefernweg über den Klippen hinab zum Naturstrand von Kabak',
      tr: 'Sarp falezlerin üzerinden çam ormanlarıyla Kabak Koyu’na iniş',
    },
    description: {
      ru: 'Красивый и умеренный по нагрузке этап от деревни Фаралья до бухты Кабак. Тропа идёт высоко по краю соснового плато мимо мыса Акташ с головокружительными видами на бирюзовое море, а затем спускается по лесному серпантину в уютную долину бунгало и пляжа Кабак.',
      en: 'A scenic moderate stage connecting Faralya village with Kabak Bay. Skirting the high pine rim past Aktaş headland with open Mediterranean vistas, the path winds gently down into the tucked-away amphitheater of Kabak valley and its relaxed eco-camps.',
      de: 'Malerische, mittelschwere Etappe von Faralya nach Kabak. Der Pfad folgt dem Kiefernplateau am Kap Aktaş entlang mit Traumblicken und steigt dann ins Tal von Kabak hinab.',
      tr: 'Faralya’yı Kabak Koyu’na bağlayan keyifli bir Likya Yolu etabı. Aktaş burnu üzerindeki çam yamaçlarından Akdeniz’i izleyerek Kabak vadisindeki ekolojik kamplara ve sahile iner.',
    },
    startPoint: {
      ru: 'Фаралья, смотровая площадка / центр деревни',
      en: 'Faralya Village center',
      de: 'Ortszentrum Faralya',
      tr: 'Faralya köy merkezi',
    },
    endPoint: {
      ru: 'Пляж бухты Кабак (Kabak Sahili)',
      en: 'Kabak Beach (Kabak Sahili)',
      de: 'Strand von Kabak',
      tr: 'Kabak Koyu Plajı',
    },
    waterSources: {
      ru: 'Магазины в Фаралье, у оливковых садов Акташа и кафе/кемпинги на финише в Кабаке.',
      en: 'Grocers in Faralya, seasonal fountain near Aktaş, and many cafes upon reaching Kabak.',
      de: 'Läden in Faralya, Brunnen bei Aktaş und viele Cafés in Kabak.',
      tr: 'Faralya ve Aktaş civarında su noktaları, Kabak vadisinde ise çok sayıda kafe mevcuttur.',
    },
    highlights: {
      ru: [
        'Вид сверху на отвесные стены каньона Долины Бабочек (без опасного спуска по верёвкам)',
        'Лесной траверс мимо скалистого мыса Акташ',
        'Панорама амфитеатра бухты Кабак с высоты тропы',
        'Купание на крупногалечном пляже среди сосновых склонов',
      ],
      en: [
        'Safe cliff-top panoramas of Butterfly Valley (never climb down the cliff ropes!)',
        'Scented Mediterranean pine forest around Aktaş headland',
        'Aerial amphitheater view into Kabak valley before descending',
        'Relaxed swim and eco-camp atmosphere at Kabak Beach',
      ],
      de: [
        'Sichere Aussicht von oben ins Schmetterlingstal (ohne Kletterseile)',
        'Duftender Kiefernwald am Kap Aktaş',
        'Panoramablick auf das Amphitheater der Kabak-Bucht',
        'Erfrischendes Bad am Naturstrand von Kabak',
      ],
      tr: [
        'Kelebekler Vadisi’ne yukarıdan güvenli seyir (tehlikeli halat inişine girmeyin)',
        'Aktaş Burnu çevresindeki çam ormanı geçişi',
        'Kabak Vadisi’ne tepeden bakan amfi manzarası',
        'Kabak sahilinde yüzme ve kamp atmosferi',
      ],
    },
    gearAdvice: {
      ru: 'Внимание: спуск по верёвкам со скалы Фаральи прямо на пляж Долины Бабочек крайне опасен — проходите этот участок строго по официальной маркированной тропе в сторону Кабака.',
      en: 'Safety rule: never attempt the perilous cliff ropes down into Butterfly Valley from Faralya — stay on the official red-white trail toward Kabak.',
      de: 'Wichtiger Sicherheitshinweis: Benutzen Sie keinesfalls die gefährlichen Seile hinab ins Schmetterlingstal, sondern bleiben Sie auf dem markierten Pfad nach Kabak.',
      tr: 'Güvenlik uyarısı: Faralya’dan Kelebekler Vadisi tabanına iplerle inmeye çalışmak son derece tehlikelidir; resmi kırmızı-beyaz patikadan Kabak’a devam edin.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.4946,29.1319&destination=36.4631,29.1243&travelmode=walking',
    image: '/api/images/locations/dalaman/todo/river/river.jpg',
  },
  {
    id: 'kabak-alinca',
    trekNumber: 10,
    zoneId: 'fethiye-oludeniz',
    region: 'lycian',
    difficulty: 5,
    distanceKm: 6.3,
    elevationGainM: 799,
    elevationLossM: 111,
    maxElevationM: 742,
    durationHours: '3.0 - 4.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Бухта Кабак ➔ Алинджа (+ ветка к Гей / Семь Мысов)',
      en: 'Kabak Bay ➔ Alınca (+ Optional Branch to Gey / Seven Capes)',
      de: 'Kabak-Bucht ➔ Alınca (+ Abzweig nach Gey / Sieben Kaps)',
      tr: 'Kabak Koyu ➔ Alınca (+ Gey / Yediburunlar Yan Hattı)',
    },
    subtitle: {
      ru: 'Самый крутой прибрежный подъём Западной Ликии (+799 м от уровня моря в «орлиное гнездо» 742 м)',
      en: 'Steepest vertical climb of Western Lycia (+799 m from sea level up to 742 m eagle-nest terraces)',
      de: 'Der steilste Aufstieg Westlykiens (+799 m vom Meer hinauf ins Bergdorf auf 742 m)',
      tr: 'Batı Likya’nın deniz seviyesinden 742 m Alınca sırtına çıkan en dik (+799 m) etabı',
    },
    description: {
      ru: 'Мощный горный этап: от пляжа Кабак тропа за 6,3 км поднимается почти на +800 метров вверх мимо сезонного водопада в ущелье к горному селению Алинджа (высота 742 м), нависающему над обрывом. Опытные туристы могут продлить день ещё на 6,5 км по хребту до деревни Гей с видом на знаменитые «Семь мысов» (Yediburunlar) — этот отрезок нанесён на 3D-карте пунктиром.',
      en: 'A relentless vertical challenge: climbing +799 m in just 6.3 km from Kabak beach past the seasonal canyon waterfall up to cliff-perched Alınca (742 m). Strong hikers can continue another 6.5 km (shown as the dashed spur on the 3D map) toward Gey and the iconic Seven Capes (Yediburunlar) panorama.',
      de: 'Eine schweißtreibende Bergetappe: Auf nur 6,3 km klettern Sie +799 Höhenmeter vom Strand bis ins Bergdorf Alınca (742 m). Geübte Wanderer folgen der gestrichelten 6,5-km-Linie bis Gey.',
      tr: 'Likya Yolu’nun en zorlu tırmanışlarından biri: Kabak sahilinden sadece 6,3 km içinde +799 m yükselerek uçurum kenarındaki Alınca köyüne (742 m) çıkar. Gücü kalanlar 3D haritada kesikli çizilen +6,5 km’lik Gey / Yediburunlar hattına devam edebilir.',
    },
    startPoint: {
      ru: 'Пляж бухты Кабак (Kabak Sahili, уровень моря)',
      en: 'Kabak Beach (sea level)',
      de: 'Strand von Kabak (Meereshöhe)',
      tr: 'Kabak Koyu sahili (deniz seviyesi)',
    },
    endPoint: {
      ru: 'Деревня Алинджа (или деревня Гей при продлении до ~14 км)',
      en: 'Alınca Village (or Gey Village for 14 km full day)',
      de: 'Dorf Alınca (oder Gey bei Verlängerung auf 14 km)',
      tr: 'Alınca Köyü (uzatma ile Gey köyü, toplam ~14 km)',
    },
    waterSources: {
      ru: 'На 3,5-часовом крутом подъёме от Кабака к Алиндже питьевых источников НЕТ. Минимум 3 литра воды на человека обязательны; кафе и родник есть только в самой Алиндже.',
      en: 'ZERO drinking water during the 3.5-hour climb from Kabak to Alınca. Carry at least 3 L per person; cafes and water await at the top in Alınca.',
      de: 'KEIN Trinkwasser auf dem 3,5-stündigen Steilanstieg. Mindestens 3 L Wasser pro Person mitführen; Einkehr erst oben in Alınca.',
      tr: 'Kabak’tan Alınca’ya süren 3,5 saatlik dik tırmanışta İÇME SUYU YOKTUR. Kişi başı en az 3 L su zorunludur; köyde çeşme ve pansiyon vardır.',
    },
    highlights: {
      ru: [
        'Водопад в ущелье Кабак по дороге наверх (весной и ранним летом)',
        'Головокружительная смотровая в Алиндже на бухты Кабак и Фаралья далеко внизу',
        'Опция хребта к деревне Гей с панорамой «Семи мысов» (Yediburunlar)',
        'Традиционный айран и гезлеме на высокогорных террасах',
      ],
      en: [
        'Hidden Kabak gorge waterfall (flowing in spring/early summer)',
        'Cliff-edge terraces in Alınca looking straight down to Kabak Bay',
        'Optional Seven Capes (Yediburunlar) ridge traverse toward Gey',
        'Homemade ayran and gözleme at mountain homesteads',
      ],
      de: [
        'Versteckter Wasserfall in der Kabak-Schlucht (im Frühjahr)',
        'Adlerhorst-Terrassen von Alınca hoch über der Bucht',
        'Optionale Fortsetzung mit Blick auf die Sieben Kaps (Yediburunlar)',
        'Hausgemachter Ayran und Gözleme auf dem Bergplateau',
      ],
      tr: [
        'Tırmanış yolundaki Kabak Şelalesi (bahar aylarında akışlıdır)',
        'Aşağıdaki koyları kuş bakışı izleyen Alınca seyir terasları',
        'Gey yönüne devam edildiğinde büyüleyici Yediburunlar manzarası',
        'Dağ köylerinde taze gözleme ve yayla ayranı molası',
      ],
    },
    gearAdvice: {
      ru: 'ЭКСТРЕМАЛЬНЫЙ НАБОР ВЫСОТЫ. Категорически избегайте в июле–августе. Обязательны треккинговые палки, ботинки с фиксацией голеностопа и ранний выход на рассвете.',
      en: 'EXTREME ASCENT. Avoid completely in July–August heat. Trekking poles, sturdy ankle boots, and a dawn start are mandatory.',
      de: 'EXTREMER ANSTIEG. Im Hochsommer (Juli–Aug) meiden. Stöcke, feste Bergstiefel und Start im Morgengrauen zwingend.',
      tr: 'ZORLU TIRMANIŞ. Temmuz–Ağustos sıcaklarında kesinlikle çıkmayın. Baton, bilekli bot ve gün doğumu çıkışı şarttır.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.4631,29.1243&destination=36.4478,29.1431&travelmode=walking',
    image: '/api/images/locations/fethiye/todo/babadag/babadag2.jpg',
  },
  {
    id: 'saklikent-canyon',
    trekNumber: 11,
    zoneId: 'fethiye-oludeniz',
    region: 'canyon',
    difficulty: 3,
    distanceKm: 1.6,
    elevationGainM: 425,
    elevationLossM: 248,
    maxElevationM: 406,
    durationHours: '2.0 - 2.5',
    hasDetailedGuide: true,
    title: {
      ru: 'Каньон Саклыкент (Водный каньонинговый маршрут)',
      en: 'Saklıkent Gorge (River-Wading Canyon Trek)',
      de: 'Saklıkent-Schlucht (Flussbett-Canyoning)',
      tr: 'Saklıkent Kanyonu (Su İçi Kanyon Yürüyüşü)',
    },
    subtitle: {
      ru: '1,6 км в одну сторону (~3,2 км туда-обратно) вброд по воде +8°C среди отвесных скал до 406 м',
      en: '1.6 km one-way (~3.2 km round-trip) wading through +8°C rapids inside a 406 m cliff gorge',
      de: '1,6 km einfach (~3,2 km hin & zurück) durch +8°C Flusswasser zwischen bis zu 406 m hohen Wänden',
      tr: '406 m duvarlı dar kanyonda +8°C buz gibi suda 1,6 km gidiş (~3,2 km gidiş-dönüş)',
    },
    description: {
      ru: 'Уникальный водный каньон в 45 км от Фетхие (идеально в сухой сезон с мая по октябрь). После 200-метровых деревянных мостков маршрут переходит в русло ледяной горной реки (+8°C), уходя на 1,6 км вглубь узкой известняковой щели и возвращаясь назад (~3,2 км итого). Примечание к профилю высот: из-за ширины щели 2–5 м спутниковый радар Copernicus DEM фиксирует перепады верхних кромок скал (до 406 м), тогда как само русло ручья пологое.',
      en: 'A thrilling river-wading adventure 45 km east of Fethiye (best May–Oct). After cliffside boardwalks, hikers ford the +8°C river and wade 1.6 km deep into the canyon before turning back (~3.2 km round-trip). Elevation note: because the slot narrows to just a few meters, 30 m Copernicus DEM cells capture the towering 300–406 m canyon rim walls rather than the gently sloping stream bed.',
      de: 'Einzigartige Schluchtwanderung 45 km östlich von Fethiye (ideal Mai–Okt): 1,6 km tief ins +8°C kalte Flussbett und zurück (~3,2 km gesamt). Hinweis zum Höhenprofil: In der engen Felsspalte misst das Satelliten-DEM die bis zu 406 m hohen Schluchtwände oberhalb des flachen Bachbetts.',
      tr: 'Fethiye’ye 45 km mesafede benzersiz bir kanyon yürüyüşü (Mayıs–Ekim idealdir): ahşap iskelelerin ardından +8°C akarsuda 1,6 km ilerleyip aynı yoldan dönülür (toplam ~3,2 km). Rakım notu: dar kanyon yarıkları nedeniyle Copernicus DEM verisi düz dere tabanından ziyade 406 m’ye ulaşan dik yan kaya duvarlarını yansıtır.',
    },
    startPoint: {
      ru: 'Вход в Национальный парк Саклыкент (кассы и мостки)',
      en: 'Saklıkent National Park entrance gate',
      de: 'Eingang zum Nationalpark Saklıkent',
      tr: 'Saklıkent Milli Parkı giriş gişeleri',
    },
    endPoint: {
      ru: 'Точка разворота у внутреннего каскада (~1,5 км вглубь каньона)',
      en: 'Inner gorge waterfall turnaround (~1.5 km in, 3 km round-trip)',
      de: 'Wendepunkt am inneren Wasserfall (~3 km hin & zurück)',
      tr: 'İç şelale dönüş noktası (~1,5 km gidiş, toplam 3 km)',
    },
    waterSources: {
      ru: 'У входа и выхода вдоль реки работают десятки ресторанов на деревянных помостах; воду для питья можно купить на входе.',
      en: 'Numerous riverside restaurants and shops right at the canyon entrance and exit.',
      de: 'Zahlreiche Flussrestaurants und Kioske direkt am Ein- und Ausgang.',
      tr: 'Girişte ve çıkışta su üzerindeki ahşap platformlarda çok sayıda restoran ve büfe bulunur.',
    },
    highlights: {
      ru: [
        'Подвесная деревянная тропа прямо над мощными подземными родниками',
        'Бодрящий переход ледяного брода (+8°C даже в сорокаградусную жару)',
        'Смыкающиеся наверху 300-метровые известняковые стены',
        'Свежая форель в беседках над водой после выхода из ущелья',
      ],
      en: [
        'Wooden cliff boardwalks suspended above roaring karst springs',
        'Exhilarating +8°C icy river crossing — natural AC in mid-summer',
        'Soaring 300-meter limestone walls narrowing to a strip of sky',
        'Grilled trout on cushioned river platforms after the trek',
      ],
      de: [
        'Holzstege direkt über tosenden Karstquellen',
        'Erfrischende +8°C Flussdurchquerung selbst im Hochsommer',
        '300 m hohe Felswände, die den Himmel fast verdecken',
        'Frische Forelle in den Pavillons über dem Fluss',
      ],
      tr: [
        'Güçlü karstik kaynakların üzerine kurulu ahşap asma yürüme yolu',
        'Yaz sıcağında bile +8°C kalan buz gibi akarsu geçişi',
        'Gökyüzünü daraltan 300 metrelik devasa kanyon duvarları',
        'Yürüyüş sonrası su üzerindeki köşklerde kiremitte alabalık keyfi',
      ],
    },
    gearAdvice: {
      ru: 'НЕ ИДИТЕ БОСИКОМ ИЛИ В ШЛЁПАНЦАХ: в мутной воде лежат скользкие камни. Обязательны закрытые резиновые аквашузы (можно взять в аренду на входе), гермочехол для телефона и наличные на входной билет.',
      en: 'NEVER wade barefoot or in flip-flops: riverbed stones are slippery and hidden in milky water. Closed-toe rubber aqua shoes (rentable at gate), dry pouch, and cash for park entry are essential.',
      de: 'NICHT barfuß oder in Flip-Flops gehen! Geschlossene Aquaschuhe (vor Ort mietbar), wasserdichte Handyhülle und Bargeld für den Eintritt mitnehmen.',
      tr: 'ÇIPLAK AYAK VEYA TERLİKLE GİRMEYİN: su bulanık ve taşlar kaygandır. Kapalı lastik deniz ayakkabısı (girişte kiralanır), su geçirmez telefon kılıfı ve park girişi için nakit bulundurun.',
    },
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=36.4735,29.4041',
    image: '/api/images/locations/fethiye/todo/saklikent/saklikent.jpg',
  },

  // ================= ЗОНА 04: ПАТАРА, КАЛКАН И КАШ =================
  {
    id: 'patara-delikkemer-kalkan',
    trekNumber: 12,
    zoneId: 'patara-kas',
    region: 'lycian',
    difficulty: 3,
    distanceKm: 19.3,
    elevationGainM: 558,
    elevationLossM: 502,
    maxElevationM: 228,
    durationHours: '6.0 - 7.0',
    hasDetailedGuide: true,
    title: {
      ru: 'Патара ➔ Римский акведук Деликкемер ➔ Калкан',
      en: 'Patara ➔ Delikkemer Roman Aqueduct ➔ Kalkan',
      de: 'Patara ➔ Römisches Aquädukt Delikkemer ➔ Kalkan',
      tr: 'Patara ➔ Delikkemer Roma Su Kemeri ➔ Kalkan',
    },
    subtitle: {
      ru: 'Инженерный шедевр античности — каменный сифонный акведук на пути к бухте Калкана',
      en: 'Following ancient Roman inverted-siphon masonry above coastal cliffs to Kalkan',
      de: 'Entlang des antiken römischen Druckwasser-Aquädukts über den Klippen nach Kalkan',
      tr: 'Antik Roma ters sifon su kemerini izleyerek falezlerden Kalkan’a uzanan etap',
    },
    description: {
      ru: 'Настоящий исторический хит центральной части западной Ликии (именно здесь, между Патарой и Калканом, а не у Ксантоса, стоит великий акведук). Из деревни Гелемиш тропа идёт вдоль 200-метровой стены римского сифонного акведука Деликкемер с каменными трубами, проходит через посёлок Акбель и спускается в белую бухту Калкана.',
      en: 'One of the richest historical stages of the Lycian Way (this is where the famous Roman aqueduct actually stands — between Patara and Kalkan). Leaving Gelemiş/Patara, the trail runs straight atop the dramatic Delikkemer inverted-siphon masonry wall before climbing coastal limestone ridges toward Akbel and dropping into Kalkan.',
      de: 'Eine der eindrucksvollsten historischen Etappen (genau zwischen Patara und Kalkan steht das berühmte römische Aquädukt Delikkemer). Der Pfad verläuft direkt entlang der antiken Wasserleitung und über Küstenhügel hinab nach Kalkan.',
      tr: 'Likya Yolu’nun tarih dolu etabı (meşhur Roma su kemeri Ksantos değil, tam olarak Patara–Kalkan arasındadır). Gelemiş’ten çıkan patika, taş bloklardan yapılı dev Delikkemer su kemeri duvarının üzerinden geçer ve Akbel sırtlarından Kalkan koyuna iner.',
    },
    startPoint: {
      ru: 'Патара / деревня Гелемиш (36.2610, 29.3143)',
      en: 'Patara / Gelemiş village trailhead (36.2610, 29.3143)',
      de: 'Patara / Dorf Gelemiş (36.2610, 29.3143)',
      tr: 'Patara / Gelemiş köyü (36.2610, 29.3143)',
    },
    endPoint: {
      ru: 'Калкан, набережная / трасса D400 (36.2660, 29.4126)',
      en: 'Kalkan town & harbor (36.2660, 29.4126)',
      de: 'Hafen von Kalkan (36.2660, 29.4126)',
      tr: 'Kalkan merkez / liman (36.2660, 29.4126)',
    },
    waterSources: {
      ru: 'В деревнях Гелемиш и Узюмлю (в начале), затем длинный открытый сухой перегон до Акбеля/Калкана. Берите не меньше 2,5–3 л воды.',
      en: 'Shops in Gelemiş and Üzümlü early on, followed by an exposed dry ridge until Akbel/Kalkan. Carry 2.5–3 L.',
      de: 'Läden in Gelemiş und Üzümlü zu Beginn, danach trockener Bergrücken bis Akbel/Kalkan. 2,5–3 L mitnehmen.',
      tr: 'Başlangıçta Gelemiş ve Üzümlü’de su vardır; Akbel/Kalkan’a kadar gölgesiz ve kurak etaptır. En az 2,5–3 L su alın.',
    },
    highlights: {
      ru: [
        'Стена римского акведука Деликкемер с массивными каменными сифонами I в. н.э.',
        'Пляж и руины античного парламента Ликийского союза на старте в Патаре',
        'Морские панорамы над бухтой Фирназ (Fırnaz Koyu)',
        'Возврат в цивилизацию — спуск к белоснежным террасам Калкана',
      ],
      en: [
        'Delikkemer Roman Aqueduct — 1st-century AD stone pressure-pipe engineering',
        'Start near Patara’s ancient Parliament and 18 km golden beach',
        'Coastal headland views above turquoise Fırnaz Bay',
        'Scenic descent into Kalkan’s whitewashed amphitheater',
      ],
      de: [
        'Römisches Aquädukt Delikkemer — antike Ingenieurskunst aus dem 1. Jh. n. Chr.',
        'Start nahe den Ruinen und Dünen von Patara',
        'Küstenblicke über die Bucht von Fırnaz',
        'Abstieg in die weißen Gassen von Kalkan',
      ],
      tr: [
        'MS 1. yüzyıl mühendislik harikası Delikkemer Roma su kemerleri',
        'Patara Antik Kenti meclis binası ve kumsalı yakınında başlangıç',
        'Fırnaz Koyu üzerindeki açık deniz manzaraları',
        'Kalkan’ın beyaz teraslarına keyifli iniş',
      ],
    },
    gearAdvice: {
      ru: '20-километровый переход почти без тени — выходите ранним утром; если хочется короткой версии на 2,5 часа, можно пройти только радиальный участок Гелемиш → Деликкемер → назад.',
      en: 'A long 20 km exposed walk with little shade — start early. For a shorter 2.5-hour outing, hike out-and-back from Gelemiş to Delikkemer Aqueduct only.',
      de: '20 km kaum schattige Strecke — früh starten. Für eine 2,5-Stunden-Kurztour reicht der Hin- und Rückweg bis zum Aquädukt.',
      tr: '20 km’lik gölgesiz uzun bir etaptır — erken başlayın. 2,5 saatlik kısa versiyon için Gelemiş’ten sadece Delikkemer’e gidip dönebilirsiniz.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.2610,29.3143&waypoints=36.2498,29.3452&destination=36.2660,29.4126&travelmode=walking',
    image: '/api/images/locations/kas/ruines/patara/patara.jpg',
  },
  {
    id: 'kalkan-bezirgan-saribelen',
    trekNumber: 13,
    zoneId: 'patara-kas',
    region: 'lycian',
    difficulty: 4,
    distanceKm: 14.7,
    elevationGainM: 983,
    elevationLossM: 263,
    maxElevationM: 940,
    durationHours: '5.5 - 6.5',
    hasDetailedGuide: true,
    title: {
      ru: 'Калкан ➔ Плато Безирган (Кедровые амбары) ➔ Сарыбелен',
      en: 'Kalkan ➔ Bezirgan Plateau (Cedar Granaries) ➔ Sarıbelen',
      de: 'Kalkan ➔ Hochebene Bezirgan (Zedernspeicher) ➔ Sarıbelen',
      tr: 'Kalkan ➔ Bezirgan Yaylası (Tarihi Ambarlar) ➔ Sarıbelen',
    },
    subtitle: {
      ru: 'Подъём +983 м по древней караванной лестнице до перевала 940 м на ликийское плато',
      en: 'Ancient mule stairs climbing +983 m from Kalkan’s coast to the 940 m Sarıbelen ridge',
      de: 'Antike Karawanenstufen mit +983 m Anstieg hinauf auf den 940-m-Pass nach Sarıbelen',
      tr: 'Kıyıdan tarihi katır yollarıyla +983 m tırmanıp 940 m geçitten Sarıbelen’e çıkış',
    },
    description: {
      ru: 'Серьёзный высокогорный переход из Калкана вглубь Ликийского плато. От трассы над городом тропа поднимается через ущелье по древней караванной лестнице на плодородную долину Безирган (~700 м), где сохранились 200–300-летние кедровые амбары без единого гвоздя, и затем через высокий перевал 940 м спускается в деревню Сарыбелен (778 м).',
      en: 'A demanding alpine transition from the coast into the cool Lycian highlands (+983 m). Ascending from upper Kalkan through a narrow canyon on ancient mule steps, you reach the lush Bezirgan plateau (~700 m) — famous for interlocking cedar granaries built without nails — before crossing a 940 m pine pass down to Sarıbelen (778 m).',
      de: 'Anspruchsvolle Bergetappe von der Küste ins lykische Hochland (+983 m). Über antike Maultierpfade steigen Sie zur Hochebene Bezirgan (700 m) mit den nagellosen Zedernholz-Speichern und über den 940-m-Pass hinab nach Sarıbelen (778 m).',
      tr: 'Kıyı sıcağından serin Likya yaylalarına çıkan zorlu dağ etabı (+983 m). Kalkan üstünden tarihi katır yoluyla çivisiz sedir ambarlarıyla ünlü Bezirgan yaylasına (~700 m), oradan da 940 m geçidi aşarak Sarıbelen köyüne (778 m) varır.',
    },
    startPoint: {
      ru: 'Верхний Калкан, начало тропы у трассы D400 (36.2683, 29.4136)',
      en: 'Upper Kalkan trailhead along D400 (36.2683, 29.4136)',
      de: 'Oberer Ortsrand Kalkan an der D400 (36.2683, 29.4136)',
      tr: 'Kalkan üst sınırı D400 çıkışı (36.2683, 29.4136)',
    },
    endPoint: {
      ru: 'Деревня Сарыбелен (36.2689, 29.4858)',
      en: 'Sarıbelen Village (36.2689, 29.4858)',
      de: 'Dorf Sarıbelen (36.2689, 29.4858)',
      tr: 'Sarıbelen Köyü (36.2689, 29.4858)',
    },
    waterSources: {
      ru: 'На затяжном подъёме от Калкана к Безиргану воды нет. Источники и сельские магазины работают в самом Безиргане (на 10-м км) и в Сарыбелене.',
      en: 'No water during the long uphill climb to Bezirgan. Springs and local grocers await in Bezirgan (km 10) and Sarıbelen.',
      de: 'Kein Wasser während des langen Aufstiegs nach Bezirgan. Brunnen und Dorfläden erst in Bezirgan (km 10) und Sarıbelen.',
      tr: 'Bezirgan’a kadar olan uzun tırmanışta çeşme yoktur. Bezirgan (10. km) ve Sarıbelen köylerinde su ve bakkal bulunur.',
    },
    highlights: {
      ru: [
        'Захватывающий вид сверху на бухту Калкана и острова Мышь/Змеиный',
        'Ущелье с древней каменной кладкой «козьей лестницы»',
        'Исторические кедровые амбары-зернохранилища в Безиргане',
        'Сельская прохлада, сады и тишина ликийской глубинки в Сарыбелене',
      ],
      en: [
        'Soaring views over Kalkan Bay and offshore islands on the climb',
        'Ancient dry-stone pack trail winding through a limestone gorge',
        '18th–19th century interlocking cedar granary barns in Bezirgan',
        'Authentic highland farming valleys of Sarıbelen',
      ],
      de: [
        'Weitblick über die Bucht von Kalkan beim Aufstieg',
        'Historischer gepflasterter Karawanenweg durch die Schlucht',
        'Traditionelle Zedern-Speicher in Bezirgan',
        'Ursprüngliches Hochlandleben in Sarıbelen',
      ],
      tr: [
        'Tırmanış boyunca Kalkan koyu ve adalara kuş bakışı panaroma',
        'Kanyon içinden geçen tarihi taş döşemeli katır yolu',
        'Bezirgan yaylasının yüzlerce yıllık çivisiz sedir tahıl ambarları',
        'Sarıbelen yayla köylerinin serin ve otantik atmosferi',
      ],
    },
    gearAdvice: {
      ru: 'Непрерывный подъём суммарно >1000 м требует выносливости. Обязательны треккинговые палки, минимум 3 л воды на подъём и договорённость о трансфере из Сарыбелена.',
      en: 'Over 1,000 m cumulative climbing requires strong stamina. Pack trekking poles, 3 L water, and plan transport back from Sarıbelen.',
      de: 'Über 1.000 Höhenmeter Anstieg erfordern gute Kondition. Trekkingstöcke, 3 L Wasser und Rücktransfer ab Sarıbelen einplanen.',
      tr: '1.000 m üzeri toplam tırmanış iyi kondisyon gerektirir. Baton, 3 L su ve Sarıbelen’den dönüş aracı planlaması şarttır.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.2683,29.4136&waypoints=36.2654,29.4508&destination=36.2689,29.4858&travelmode=walking',
    image: '/api/images/locations/fethiye/ruines/tlos/tlos.jpg',
  },
  {
    id: 'kas-limanagzi-ufakdere',
    trekNumber: 14,
    zoneId: 'patara-kas',
    region: 'lycian',
    difficulty: 3,
    distanceKm: 10.7,
    elevationGainM: 365,
    elevationLossM: 364,
    maxElevationM: 120,
    durationHours: '3.5 - 4.5',
    hasDetailedGuide: true,
    title: {
      ru: 'Каш ➔ Бухта Лиман Агзы ➔ Уфакдере',
      en: 'Kaş ➔ Liman Ağzı Cove ➔ Ufakdere Bay',
      de: 'Kaş ➔ Bucht Liman Ağzı ➔ Bucht Ufakdere',
      tr: 'Kaş ➔ Liman Ağzı Koyu ➔ Ufakdere',
    },
    subtitle: {
      ru: 'Скальные гробницы Себеда, спуск по лестницам к черепахам и возврат на лодке-такси',
      en: 'Lycian cliff tombs, rock ladders over sea coves, and wooden water-taxi return',
      de: 'Lykische Felsengräber, Eisenleitern über dem Meer & Rückfahrt per Bootstaxi',
      tr: 'Kaya mezarları, falez merdivenleri ve ahşap tekne taksisiyle keyifli dönüş',
    },
    description: {
      ru: 'Лучший прибрежный однодневный трек прямо из центра Каша. От пляжа Бююк Чакыл тропа траверсирует карстовые скалы над заливом Лиман Агзы (с небольшими стальными скобами и верёвками на коротком скальном спуске), проходит мимо античных ликийских гробниц Себеда и уводит к уединённому каменистому заливу Уфакдере.',
      en: 'The signature coastal day hike straight out of Kaş town. From Büyük Çakıl beach, the trail traverses dramatic limestone cliffs with fixed steel ladders/ropes down to turtle-rich Liman Ağzı bay, continues past rock-cut Lycian tombs at Sebeda, and winds into tranquil Ufakdere cove.',
      de: 'Die schönste Küstenwanderung ab Kaş. Vom Strand Büyük Çakıl geht es an Klippen entlang (kurze Leiter/Seilsicherung) hinab nach Liman Ağzı, vorbei an den Felsengräbern von Sebeda bis in die Bucht Ufakdere.',
      tr: 'Kaş merkezden başlayan en popüler sahil yürüyüşü. Büyük Çakıl plajından falezlere tırmanan rota, demir merdiven ve halatlı geçişle Liman Ağzı’na iner, Sebeda kaya mezarlarını geçerek ıssız Ufakdere koyuna ulaşır.',
    },
    startPoint: {
      ru: 'Каш, пляж Большой Галечный (Büyük Çakıl Plajı)',
      en: 'Kaş Büyük Çakıl Beach',
      de: 'Kaş Strand Büyük Çakıl',
      tr: 'Kaş Büyük Çakıl Plajı çıkışı',
    },
    endPoint: {
      ru: 'Бухта Уфакдере (или финиш в Лиман Агзы с лодкой-такси в порт Каша)',
      en: 'Ufakdere Bay (or boat shuttle back from Liman Ağzı to Kaş)',
      de: 'Bucht Ufakdere (oder Bootstaxi ab Liman Ağzı nach Kaş)',
      tr: 'Ufakdere Koyu (veya Liman Ağzı’ndan Kaş limanına tekne)',
    },
    waterSources: {
      ru: 'Бич-клабы с водой и едой в Лиман Агзы (~4,5 км от старта) в летний сезон (май–октябрь). Дальше в Уфакдере инфраструктуры может не быть.',
      en: 'Beach clubs in Liman Ağzı (~4.5 km in, open May–Oct). Beyond that, carry water to remote Ufakdere.',
      de: 'Strandbars in Liman Ağzı (~4,5 km, Mai–Okt geöffnet). Richtung Ufakdere eigenes Wasser mitnehmen.',
      tr: 'Liman Ağzı tesislerinde (~4,5. km, Mayıs–Ekim açık) su ve yemek vardır. Ufakdere yönünde yanınızda su taşıyın.',
    },
    highlights: {
      ru: [
        'Скальный спуск с фиксированными лестницами и перилами над бирюзовой водой',
        'Ликийские гробницы, вырубленные в отвесной стене у Себеда',
        'Купание с морскими черепахами каретта-каретта в Лиман Агзы',
        'Удобный 10-минутный возврат в гавань Каша на деревянном катере',
      ],
      en: [
        'Short rock-scramble ladder descent above clear azure coves',
        'Monumental Lycian cliff tombs of ancient Sebeda',
        'Snorkeling alongside sea turtles in calm Liman Ağzı',
        '10-minute wooden boat shuttle back to Kaş marina',
      ],
      de: [
        'Spannender Leiterabstieg über türkisblauen Buchten',
        'Lykische Felsengräber von Sebeda direkt in der Felswand',
        'Schnorcheln mit Meeresschildkröten in Liman Ağzı',
        '10-minütige Rückfahrt mit dem Holzboot nach Kaş',
      ],
      tr: [
        'Turkuaz suların üzerinde demir merdiven ve halatlı heyecanlı geçiş',
        'Sarp kayalara oyulmuş Sebeda Likya kaya mezarları',
        'Liman Ağzı’nın sakin sularında Caretta kaplumbağalarıyla yüzme',
        'Yürüyüş sonu dolmuş teknelerle Kaş limanına konforlu dönüş',
      ],
    },
    gearAdvice: {
      ru: 'Острый вулканический и карстовый известняк режет тонкую подошву — нужна толстая треккинговая подошва, маска для снорклинга и наличные на лодку-такси (если возвращаетесь из Лиман Агзы).',
      en: 'Razor-sharp karst limestone — wear thick-soled hiking shoes, pack snorkel gear, and bring cash for the Liman Ağzı shuttle boat.',
      de: 'Messerscharfes Karstgestein — feste Schuhe mit dicker Sohle Pflicht! Badesachen und Bargeld fürs Bootstaxi mitnehmen.',
      tr: 'Keskin karstik kayalar nedeniyle kalın tabanlı trekking ayakkabısı şarttır; mayo ve Liman Ağzı dönüş teknesi için nakit alın.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.1972,29.6508&waypoints=36.1856,29.6440&destination=36.1485,29.7046&travelmode=walking',
    image: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg',
  },
  {
    id: 'kas-ucagiz-simena-kekova',
    trekNumber: 15,
    zoneId: 'patara-kas',
    region: 'lycian',
    difficulty: 2,
    distanceKm: 10.1,
    elevationGainM: 218,
    elevationLossM: 176,
    maxElevationM: 95,
    durationHours: '3.5 - 4.5',
    hasDetailedGuide: true,
    title: {
      ru: 'Симена (Калекёй) ➔ Учагыз ➔ Бухта Аперлае (Кекова)',
      en: 'Simena (Kaleköy) ➔ Üçağız ➔ Aperlai Bay (Kekova)',
      de: 'Simena (Kaleköy) ➔ Üçağız ➔ Bucht Aperlai (Kekova)',
      tr: 'Simena (Kaleköy) ➔ Üçağız ➔ Aperlai Koyu (Kekova)',
    },
    subtitle: {
      ru: 'Один из красивейших приморских треков Ликии: замок без автодорог и затонувшие стены Аперлае',
      en: 'Coastal Lycian Way from car-free Simena Castle via Üçağız to the sunken ruins of Aperlai',
      de: 'Küsten-Highlight von der autofreien Burg Simena über Üçağız zu den versunkenen Ruinen von Aperlai',
      tr: 'Arabasız Kaleköy (Simena) kalesinden Üçağız üzerinden Aperlai batık surlarına kıyı yürüyüşü',
    },
    description: {
      ru: 'Знаковый прибрежный этап Восточного края нашего региона. Стартуя в автомобильно-свободном Калекёе (античной Симене) с византийской крепостью и саркофагами в воде, вы идёте вдоль тихой лагуны к бухте Учагыз, а затем по каменистому перешейку мимо оливковых рощ — к древнему порту Аперлае, чьи стены частично ушли под воду после античных землетрясений.',
      en: 'A standout coastal traverse in the Kekova sanctuary (OSM Relation #51855). Starting at car-free Kaleköy (ancient Simena) with its hilltop castle and water-logged Lycian sarcophagi, you skirt the lagoon to Üçağız harbor and follow the olive-lined footpath west across the isthmus to the partially submerged ancient port of Aperlai.',
      de: 'Ein Küsten-Highlight im Schutzgebiet Kekova (#51855): Vom autofreien Kaleköy (Simena) wandern Sie am Hafen von Üçağız vorbei durch Olivenhaine bis zu den versunkenen Hafenmauern von Aperlai.',
      tr: 'Kekova koruma bölgesindeki en özel Likya Yolu etabı (#51855). Karayolu olmayan Kaleköy (Simena) kalesinden ve deniz içindeki Likya lahitlerinden başlayıp Üçağız limanı üzerinden zeytinlikler arasından batık antik kent Aperlai koyuna varır.',
    },
    startPoint: {
      ru: 'Симена / Калекёй (36.1904, 29.8622)',
      en: 'Simena / Kaleköy harbor (36.1904, 29.8622)',
      de: 'Simena / Hafen von Kaleköy (36.1904, 29.8622)',
      tr: 'Simena / Kaleköy (36.1904, 29.8622)',
    },
    endPoint: {
      ru: 'Античный залив Аперлае (36.1592, 29.7848, возврат на лодке в Учагыз)',
      en: 'Aperlai Bay ruins (36.1592, 29.7848, water taxi back to Üçağız)',
      de: 'Bucht Aperlai (36.1592, 29.7848, Bootstaxi zurück nach Üçağız)',
      tr: 'Aperlai Koyu kalıntıları (36.1592, 29.7848, tekneyle Üçağız’a dönüş)',
    },
    waterSources: {
      ru: 'Большой выбор кафе и воды в Учагызе и Калекёе (Симена), а также сезонная бухта-пансион у перешейка Аперлае.',
      en: 'Abundant cafes and water in Üçağız and Kaleköy, plus a seasonal seaside guesthouse at Aperlai cove.',
      de: 'Viele Cafés in Üçağız und Kaleköy sowie eine saisonale Einkehr in Aperlai.',
      tr: 'Üçağız ve Kaleköy’de bolca kafe mevcuttur; Aperlai koyunda sezonluk küçük bir pansiyon yer alır.',
    },
    highlights: {
      ru: [
        'Одинокий ликийский саркофаг, стоящий прямо в бирюзовой воде у Симены',
        'Средневековая крепость Калекёй с самым маленьким античным театром Ликии',
        'Вид через пролив на затонувшие кварталы острова Кекова',
        'Затопленные городские стены в кристально чистом заливе Аперлае',
      ],
      en: [
        'Iconic half-submerged Lycian sarcophagus standing in the sea at Simena',
        'Car-free Kaleköy Castle housing Lycia’s smallest rock-cut theater',
        'Views across Kekova strait facing the Sunken City island',
        'Ancient submerged harbor walls along secluded Aperlai Bay',
      ],
      de: [
        'Der berühmte lykische Sarkophag im türkisblauen Wasser von Simena',
        'Autofreie Burg von Kaleköy mit kleinem Felsentheater',
        'Blick über den Sund auf die versunkene Stadt von Kekova',
        'Antike Hafenmauern im flachen Wasser von Aperlai',
      ],
      tr: [
        'Simena kıyısında doğrudan denizin içinde duran ikonik Likya lahiti',
        'Arabasız Kaleköy kalesi ve Likya’nın en küçük kaya tiyatrosu',
        'Karşı kıyıdaki Kekova Batık Şehir adası manzarası',
        'Aperlai koyunun cam gibi suları altındaki antik liman surları',
      ],
    },
    gearAdvice: {
      ru: 'Обратите внимание: вход в замок Симены платный (muze.gov.tr), а прыгать с лодок и плавать прямо над затонувшими руинами острова Кекова запрещено законом. Из Аперлае удобно уехать на катере обратно в Учагыз.',
      en: 'Simena Castle requires a site ticket (muze.gov.tr), and swimming directly over the Kekova sunken city ruins is strictly prohibited. Arrange a boat taxi from Aperlai back to Üçağız.',
      de: 'Für die Burg Simena fällt Eintritt an (muze.gov.tr); Schwimmen direkt über der versunkenen Stadt Kekova ist verboten. Bootstaxi ab Aperlai nutzen.',
      tr: 'Simena Kalesi girişi ücretlidir (muze.gov.tr) ve Kekova batık kent kalıntıları üzerinde yüzmek yasaktır. Aperlai’den Üçağız’a tekne dönüşü ayarlayabilirsiniz.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.1904,29.8622&waypoints=36.1927,29.8458&destination=36.1592,29.7848&travelmode=walking',
    image: '/api/images/locations/kas/ruines/kekova/kekova.jpg',
  },
];

export const DETAILED_TRAIL_SLUGS = [
  'carian-datca-domuzcukuru',
  'carian-palamutbuku-knidos',
  'carian-turunc-amos-kumlubuk',
  'carian-taslica-phoenix-loryma',
  'dalyan-kaunos-radar',
  'gocek-kapidag-lydae',
  'kayakoy-oludeniz',
  'ovacik-faralya',
  'faralya-kabak',
  'kabak-alinca',
  'saklikent-canyon',
  'patara-delikkemer-kalkan',
  'kalkan-bezirgan-saribelen',
  'kas-limanagzi-ufakdere',
  'kas-ucagiz-simena-kekova',
] as const;

export interface TrailSideBranchData {
  id: string;
  distanceKm: number;
  points: [number, number, number][];
}

export interface RawTrailTrackData {
  id: string;
  osmRelationId: number | null;
  attribution: string;
  totalKm: number;
  sogukSuBranchKm?: number;
  elevationGainM: number;
  elevationLossM: number;
  minElevationM: number;
  maxElevationM: number;
  points: [number, number, number, number][];
  sideBranch?: TrailSideBranchData;
  sideBranchSogukSu?: [number, number, number][];
  waypoints: {
    id: string;
    pointIndex: number;
    lon: number;
    lat: number;
    ele: number;
    km: number;
    segmentMinutesFromPrev: number;
    isPeak?: boolean;
  }[];
}

export interface TrailEssentialRow {
  label: string;
  value: string;
}

export interface TrailNarrativeSegment {
  distanceRange: string;
  duration: string;
  title: string;
  body: string;
}

export interface TrailDirectoryGroup {
  title: string;
  items: { label: string; detail: string }[];
}

export interface TrailWaypointCopy {
  title: string;
  shortLabel: string;
  note: string;
}

export type KayakoyWaypointCopy = TrailWaypointCopy;

export interface DetailedTrailGuideCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  essentialsTitle: string;
  essentials: TrailEssentialRow[];
  mapSectionTitle: string;
  mapSectionSubtitle: string;
  sideBranchLabel?: string;
  introQuote: string;
  narrativeTitle: string;
  narrativeSegments: TrailNarrativeSegment[];
  paceBoxTitle: string;
  paceBoxBody: string;
  galleryTitle: string;
  gallery: { src: string; alt: string; caption: string }[];
  directoryTitle: string;
  directorySubtitle: string;
  directory: TrailDirectoryGroup[];
  relatedTitle: string;
  backToAtlas: string;
  waypointLabels: Record<string, TrailWaypointCopy>;
}

// Серверные детальные гиды для всех 15 маршрутов вынесены в src/lib/trail-guides/,
// чтобы не утяжелять клиентский бандл TrekkingAtlas.tsx.

