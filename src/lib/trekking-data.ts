// SOURCE [21.11.2026]: Геометрия, узлы и характеристики этапов сверены с OpenStreetMap
// (URL: https://www.openstreetmap.org/relation/51855, https://www.openstreetmap.org/relation/7235931, https://www.openstreetmap.org/relation/11827824),
// официальными справочниками Culture Routes Society (URL: https://www.cultureroutesinturkey.com), Carian Trail (URL: https://www.cariantrail.com)
// и моделью рельефа Copernicus DEM через Open-Meteo Elevation API (URL: https://api.open-meteo.com/v1/elevation).

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
    distanceKm: 10.5,
    elevationGainM: 470,
    elevationLossM: 470,
    maxElevationM: 240,
    durationHours: '3.5 - 4.5',
    title: {
      ru: 'Старая Датча ➔ Бухта Каргы ➔ Домузчукуру',
      en: 'Old Datça ➔ Kargı Bay ➔ Domuzçukuru Cove',
      de: 'Alt-Datça ➔ Kargı-Bucht ➔ Domuzçukuru',
      tr: 'Eski Datça ➔ Kargı Koyu ➔ Domuzçukuru',
    },
    subtitle: {
      ru: 'Этап Карийской тропы: миндальные рощи, каменные улочки и уединённая бухта',
      en: 'Carian Trail stage through almond groves to a roadless Aegean cove',
      de: 'Etappe des Karischen Weges durch Mandelgärten in eine einsame Bucht',
      tr: 'Karia Yolu etabı: badem bahçelerinden karayolu olmayan bakir koya',
    },
    description: {
      ru: 'Один из самых атмосферных отрезков полуострова Датча (этап 10/10a Карийской тропы). От каменных переулков Старой Датчи тропа выводит к спокойной галечной бухте Каргы, а затем поднимается на сосновый прибрежный гребень и спускается в дикую бухту Домузчукуру (Domuzçukuru), куда нет автомобильной дороги.',
      en: 'One of the finest stretches of the Datça Peninsula (Carian Trail stage 10/10a). Leaving the stone alleys of Old Datça, the trail descends to sheltered Kargı Bay before climbing a pine-clad coastal headland and dropping into secluded Domuzçukuru Cove, accessible only on foot or by boat.',
      de: 'Einer der schönsten Abschnitte der Halbinsel Datça (Karischer Weg Etappe 10/10a). Von Alt-Datça wandern Sie zur Kargı-Bucht und weiter über den Küstenkamm in die autofreie Bucht Domuzçukuru.',
      tr: 'Datça Yarımadası’nın en keyifli Karia Yolu etaplarından biri (10/10a). Eski Datça’nın taş sokaklarından Kargı Koyu’na, oradan da çam sırtlarını aşarak karayolu bağlantısı bulunmayan sakin Domuzçukuru Koyu’na ulaşır.',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.7433,27.6746&waypoints=36.7069,27.6696&destination=36.6878,27.6245&travelmode=walking',
    image: '/api/images/locations/koycegiz/ruine/Kaunos/kaunos.jpg',
  },
  {
    id: 'carian-palamutbuku-knidos',
    trekNumber: 2,
    zoneId: 'datca-bozburun',
    region: 'carian',
    difficulty: 3,
    distanceKm: 13.0,
    elevationGainM: 420,
    elevationLossM: 420,
    maxElevationM: 290,
    durationHours: '4.0 - 5.0',
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
    difficulty: 1,
    distanceKm: 4.5,
    elevationGainM: 180,
    elevationLossM: 180,
    maxElevationM: 130,
    durationHours: '1.5 - 2.0',
    title: {
      ru: 'Турунч ➔ Античный Амос ➔ Бухта Кумлубюк (Под Мармарисом)',
      en: 'Turunç ➔ Ancient Amos ➔ Kumlubük Bay (Near Marmaris)',
      de: 'Turunç ➔ Antikes Amos ➔ Kumlubük-Bucht (bei Marmaris)',
      tr: 'Turunç ➔ Antik Amos ➔ Kumlubük Koyu (Marmaris)',
    },
    subtitle: {
      ru: 'Лёгкий видовой хайк к бесплатному эллинистическому театру над бирюзовым заливом',
      en: 'Accessible coastal walk to a hilltop Hellenistic theater overlooking the sea',
      de: 'Leichte Küstenwanderung zum hellenistischen Theater über dem Meer',
      tr: 'Denize bakan antik tiyatroya uzanan kolay ve keyifli sahil yürüyüşü',
    },
    description: {
      ru: 'Идеальный короткий маршрут из окрестностей Мармариса. От южной окраины посёлка Турунч тропа поднимается через хвойный лесок на холм Асарджик, где стоит отлично сохранившийся античный театр полиса Амос, а затем спускается в просторную бухту Кумлубюк.',
      en: 'The best short coastal walk near Marmaris. Leaving the southern end of Turunç, a pine trail climbs Asarcık Hill to the well-preserved Hellenistic theater of ancient Amos with sweeping bay panoramas before descending to Kumlubük beach.',
      de: 'Die beste Kurzwanderung bei Marmaris. Vom Südende von Turunç steigt der Waldpfad zum Hügel von Asarcık mit dem hellenistischen Theater von Amos hinauf und endet am Strand von Kumlubük.',
      tr: 'Marmaris çevresindeki en güzel kısa doğa yürüyüşü. Turunç’un güneyinden orman içi patikayla Asarcık Tepesi’ndeki antik Amos tiyatrosuna çıkar ve Kumlubük sahiline iner.',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.7745,28.2484&waypoints=36.7576,28.2602&destination=36.7525,28.2571&travelmode=walking',
    image: '/api/images/locations/kas/ruines/theater/theaterkas.jpg',
  },
  {
    id: 'carian-taslica-phoenix-loryma',
    trekNumber: 4,
    zoneId: 'datca-bozburun',
    region: 'carian',
    difficulty: 4,
    distanceKm: 16.5,
    elevationGainM: 640,
    elevationLossM: 950,
    maxElevationM: 430,
    durationHours: '5.5 - 6.5',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.6305,28.1180&waypoints=36.6203,28.0968&destination=36.5653,28.0124&travelmode=walking',
    image: '/api/images/locations/fethiye/ruines/lycaintombs/lyciantombs.jpg',
  },

  // ================= ЗОНА 02: ДАЛЬЯН, КЁЙДЖЕГИЗ И ГЁДЖЕК =================
  {
    id: 'dalyan-kaunos-radar',
    trekNumber: 5,
    zoneId: 'dalyan-gocek',
    region: 'dayhike',
    difficulty: 3,
    distanceKm: 9.5,
    elevationGainM: 520,
    elevationLossM: 520,
    maxElevationM: 460,
    durationHours: '3.5 - 4.5',
    title: {
      ru: 'Античный Каунос ➔ Смотровая «Радар» над дельтой Дальяна и Изтузу',
      en: 'Ancient Kaunos ➔ Radar Viewpoint above Dalyan Delta & İztuzu',
      de: 'Antikes Kaunos ➔ Radar-Gipfel über Dalyan-Delta & İztuzu',
      tr: 'Antik Kaunos ➔ Dalyan Deltası ve İztuzu Radar Seyir Tepesi',
    },
    subtitle: {
      ru: 'Панорама лабиринта тростниковых каналов и 4,5-километровой косы Изтузу с высоты 460 м',
      en: '360° summit panorama overlooking the reed delta, Lake Köyceğiz, and Turtle Beach',
      de: 'Panoramagipfel über dem Schilfdelta von Dalyan und dem Strand İztuzu',
      tr: '460 m yükseklikten Dalyan sazlık labirenti ve İztuzu Kumsalı panoraması',
    },
    description: {
      ru: 'Лучший горный видовой хайк в центре региона Даламан. Переправившись на лодке через реку Дальян в деревню Чандыр, вы проходите мимо руин древнего Кауноса и поднимаетесь по сосновому склону на хребет Бозбурун-Тепе («Радар»), откуда открывается открыточный вид на всю дельту, озеро Сюлюнгюр и косу Изтузу.',
      en: 'The premier viewpoint hike in the heart of the Dalaman region. After a quick rowboat ferry across the Dalyan River to Çandır, hike past the ruins of ancient Kaunos up pine-clad slopes to the Bozburun Tepe ("Radar") summit for an aerial view of the entire delta and İztuzu sandspit.',
      de: 'Die aussichtsreichste Bergtour im Raum Dalyan. Nach der Flussüberfahrt Richtung Çandır steigen Sie an den Ruinen von Kaunos vorbei auf den Gipfel („Radar“) mit Blick auf Delta und İztuzu.',
      tr: 'Dalaman bölgesinin tam merkezindeki en iyi seyir rotası. Dalyan nehrini sandalla geçip Çandır tarafındaki Kaunos antik kenti yanından çam ormanıyla Bozburun Tepe’ye (Radar) tırmanarak tüm delta ve İztuzu manzarasını izlersiniz.',
    },
    startPoint: {
      ru: 'Лодочная переправа в Дальяне → вход к руинам Кауноса (деревня Чандыр)',
      en: 'Dalyan rowboat crossing → Kaunos ruins trailhead (Çandır)',
      de: 'Flussfähre Dalyan → Ruinen von Kaunos (Çandır)',
      tr: 'Dalyan sandal iskelesi → Kaunos ören yeri (Çandır)',
    },
    endPoint: {
      ru: 'Вершина «Радар» (460 м) и спуск обратно к Кауносу / переправе',
      en: 'Radar Summit (460 m) & loop return to Kaunos crossing',
      de: 'Radar-Gipfel (460 m) und Rückweg zur Fähre',
      tr: 'Radar Seyir Tepesi (460 m) ve Kaunos iskelesine dönüş',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.8253,28.6227&destination=36.7988,28.6061&travelmode=walking',
    image: '/api/images/locations/dalyan/todo/radar/radar.jpg',
  },
  {
    id: 'gocek-kapidag-lydae',
    trekNumber: 6,
    zoneId: 'dalyan-gocek',
    region: 'dayhike',
    difficulty: 3,
    distanceKm: 11.0,
    elevationGainM: 380,
    elevationLossM: 380,
    maxElevationM: 320,
    durationHours: '3.5 - 4.5',
    title: {
      ru: 'Полуостров Капыдаг (Гёджек): бухты и руины античного Лидая',
      en: 'Kapıdağ Peninsula (Göcek): Hidden Bays & Ancient Lydae',
      de: 'Halbinsel Kapıdağ (Göcek): Buchten & Antikes Lydae',
      tr: 'Kapıdağ Yarımadası (Göcek): Saklı Koylar ve Antik Lydae',
    },
    subtitle: {
      ru: 'Затерянные в горах карийско-ликийские руины над яхтенным заливом Фетхие',
      en: 'Secluded classical ruins and pine coves towering over Göcek’s yachting gulf',
      de: 'Versteckte Ruinen und Buchten über dem Segelrevier von Göcek',
      tr: 'Göcek yat koylarının üzerindeki çam ormanlarında saklı antik kent',
    },
    description: {
      ru: 'Живописный круговой маршрут по лесистому полуострову Капыдаг между бухтой Сарсала, заливом Клеопатры (Хамам) и горной седловиной с развалинами античного города Лидай (Lydae). Сюда почти не добираются обычные туристы на автобусах — только яхтсмены и любители тихих лесных троп.',
      en: 'A rewarding loop on the forested Kapıdağ Peninsula connecting coves near Hamam (Cleopatra’s Bath) and Sarsala with the remote mountain ruins of Lydae. Far removed from resort crowds, the path offers serene bay vistas framed by maritime pines.',
      de: 'Abwechslungsreiche Rundtour auf der bewaldeten Halbinsel Kapıdağ zwischen einsamen Buchten und den versteckten Bergruinen von Lydae hoch über dem Golf von Fethiye.',
      tr: 'Kapıdağ Yarımadası’nın çam ormanları içinde Hamam Koyu (Kleopatra), Sarsala ve dağlık sırtlardaki antik Lydae harabelerini bağlayan ıssız ve büyüleyici bir yürüyüş rotası.',
    },
    startPoint: {
      ru: 'Бухта Хамам (Cleopatra Bay) / подъезд со стороны Капынарга',
      en: 'Hamam Bay (Cleopatra’s Bath) / Kapıkargın access road',
      de: 'Hamam-Bucht (Kleopatra-Bad) / Zufahrt Kapıkargın',
      tr: 'Hamam Koyu (Kleopatra Hamamı) / Kapıkargın yolu',
    },
    endPoint: {
      ru: 'Руины Лидая и возврат к бухте Хамам / Сарсала',
      en: 'Lydae ruins & return to Hamam / Sarsala cove',
      de: 'Ruinen von Lydae und Rückweg zur Bucht',
      tr: 'Lydae antik kalıntıları ve koya dönüş',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.6498,28.8673&destination=36.6352,28.8598&travelmode=walking',
    image: '/api/images/locations/fethiye/ruines/castle/castle.jpg',
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
    distanceKm: 14.0,
    elevationGainM: 765,
    elevationLossM: 410,
    maxElevationM: 740,
    durationHours: '4.5 - 5.5',
    title: {
      ru: 'Оваджик ➔ Кирме ➔ Фаралья (Официальный старт Ликийской тропы)',
      en: 'Ovacık ➔ Kirme ➔ Faralya (Official Lycian Way Stage 1)',
      de: 'Ovacık ➔ Kirme ➔ Faralya (Offizielle Etappe 1 Lykischer Weg)',
      tr: 'Ovacık ➔ Kirme ➔ Faralya (Resmi Likya Yolu 1. Etap)',
    },
    subtitle: {
      ru: 'Траверс западного плеча Бабадага с открыточной панорамой Голубой лагуны',
      en: 'Mountain traverse along Babadağ’s western slope above Oludeniz Lagoon',
      de: 'Höhenwanderung am Westabhang des Babadağ über der Blauen Lagune',
      tr: 'Babadağ batı yamacından Ölüdeniz Lagünü ve Kelebekler Vadisi manzarası',
    },
    description: {
      ru: 'Классический первый день 540-километровой Ликийской тропы. От каменной стартовой арки в Оваджике тропа набирает высоту до ~740 м по западному склону Бабадага, огибая горные террасы мимо деревень Козагач и Кирме и выходя к краю обрыва над Долиной Бабочек в Фаралье.',
      en: 'The iconic Stage 1 of the 540 km Lycian Way. Leaving the stone arch in Ovacık, the path climbs steadily to ~740 m along the flank of Mount Babadağ, sweeping high above Oludeniz Lagoon through Kozağaç and Kirme before ending above Butterfly Valley in Faralya.',
      de: 'Die klassische erste Etappe des 540 km langen Lykischen Weges. Vom Tor in Ovacık führt der Weg auf bis zu ~740 m am Babadağ entlang über Kozağaç und Kirme nach Faralya über dem Schmetterlingstal.',
      tr: '540 km’lik Likya Yolu’nun efsanevi ilk etabı. Ovacık başlangıç takından Babadağ’ın batı yamacına tırmanan patika, Kozağaç ve Kirme köylerinden geçerek Kelebekler Vadisi üzerindeki Faralya köyüne varır.',
    },
    startPoint: {
      ru: 'Оваджик, стартовая арка Ликийской тропы (36.5786, 29.1419)',
      en: 'Ovacık Lycian Way Gate (36.5786, 29.1419)',
      de: 'Startbogen des Lykischen Weges in Ovacık (36.5786, 29.1419)',
      tr: 'Ovacık Likya Yolu Başlangıç Takı (36.5786, 29.1419)',
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
      ru: 'Суммарный набор +765 м по каменистому грунту ощутим для колен: берите треккинговые палки и высокие ботинки. Назад в Олюдениз/Фетхие ходят долмуши из Фаральи.',
      en: 'Sustained +765 m ascent on stony ground — trekking poles and ankle-supporting boots strongly advised. Return via Faralya–Fethiye dolmuş.',
      de: 'Langer +765-m-Aufstieg auf Geröll — Trekkingstöcke und knöchelhohe Schuhe empfohlen. Rückfahrt per Dolmuş ab Faralya.',
      tr: 'Taşlık zeminde +765 m tırmanış için trekking botu ve baton önerilir. Faralya’dan Fethiye’ye dolmuşla dönülebilir.',
    },
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.5786,29.1419&waypoints=36.5356,29.1436&destination=36.4946,29.1319&travelmode=walking',
    image: '/api/images/locations/fethiye/beach/kelebekler/kelebekler.jpg',
  },
  {
    id: 'faralya-kabak',
    trekNumber: 9,
    zoneId: 'fethiye-oludeniz',
    region: 'lycian',
    difficulty: 2,
    distanceKm: 7.5,
    elevationGainM: 320,
    elevationLossM: 450,
    maxElevationM: 460,
    durationHours: '2.5 - 3.5',
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
    distanceKm: 6.5,
    elevationGainM: 900,
    elevationLossM: 200,
    maxElevationM: 780,
    durationHours: '3.5 - 4.5',
    title: {
      ru: 'Бухта Кабак ➔ Алинджа (Опция продолжения до Гей / Семь Мысов)',
      en: 'Kabak Bay ➔ Alınca (Optional Extension to Gey / Seven Capes)',
      de: 'Kabak-Bucht ➔ Alınca (Optional weiter nach Gey)',
      tr: 'Kabak Koyu ➔ Alınca (Opsiyonel: Gey / Yediburunlar)',
    },
    subtitle: {
      ru: 'Самый крутой прибрежный подъём Западной Ликии (+900 м от уровня моря в «орлиное гнездо»)',
      en: 'Steepest vertical climb of Western Lycia (+900 m from sea level to eagle-nest vistas)',
      de: 'Der steilste Aufstieg Westlykiens (+900 m direkt vom Meer hinauf)',
      tr: 'Batı Likya’nın deniz seviyesinden +900 m tırmanan en dik etabı',
    },
    description: {
      ru: 'Мощный горный этап: от пляжа Кабак тропа за 6,5 км поднимается почти на +900 метров вверх мимо сезонного водопада в ущелье к горному селению Алинджа (высота ~750–780 м), нависающему над обрывом. Опытные туристы могут продлить день ещё на ~7,5 км по хребту до деревни Гей с видом на знаменитые «Семь мысов» (Yediburunlar).',
      en: 'A relentless vertical challenge: climbing nearly +900 m in just 6.5 km from Kabak beach past the seasonal canyon waterfall up to the cliff-perched hamlet of Alınca (~780 m). Strong hikers can extend another ~7.5 km along the ridge to Gey for the iconic Seven Capes (Yediburunlar) panorama.',
      de: 'Eine schweißtreibende Bergetappe: Auf nur 6,5 km klettern Sie fast +900 Höhenmeter vom Strand bis ins Bergdorf Alınca (~780 m). Geübte Wanderer können um 7,5 km bis nach Gey verlängern.',
      tr: 'Likya Yolu’nun en zorlu tırmanışlarından biri: Kabak sahilinden sadece 6,5 km içinde yaklaşık +900 m yükselerek uçurum kenarındaki Alınca köyüne (~780 m) çıkar. Enerjisi kalanlar Yediburunlar manzaralı Gey köyüne (+7,5 km) devam edebilir.',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.4631,29.1243&destination=36.4337,29.1332&travelmode=walking',
    image: '/api/images/locations/fethiye/todo/babadag/babadag2.jpg',
  },
  {
    id: 'saklikent-canyon',
    trekNumber: 11,
    zoneId: 'fethiye-oludeniz',
    region: 'canyon',
    difficulty: 3,
    distanceKm: 3.0,
    elevationGainM: 50,
    elevationLossM: 50,
    maxElevationM: 180,
    durationHours: '2.0 - 2.5',
    title: {
      ru: 'Каньон Саклыкент (Водный каньонинговый маршрут)',
      en: 'Saklıkent Gorge (River-Wading Canyon Trek)',
      de: 'Saklıkent-Schlucht (Flussbett-Canyoning)',
      tr: 'Saklıkent Kanyonu (Su İçi Kanyon Yürüyüşü)',
    },
    subtitle: {
      ru: 'Пеший выход вброд по ледяному руслу (+8°C) между 300-метровых каменных стен',
      en: 'Wading upstream through icy +8°C canyon rapids flanked by 300 m limestone walls',
      de: 'Waten durch eiskaltes Gebirgswasser (+8°C) zwischen 300 m hohen Felswänden',
      tr: '300 metrelik kaya duvarları arasında +8°C buzul suyunda kanyon yürüyüşü',
    },
    description: {
      ru: 'Уникальный водный каньон в 45 км от Фетхие (идеально в сухой сезон с мая по октябрь). После 200-метровых деревянных мостков над бурным порогом маршрут переходит в русло ледяной горной реки (+8°C круглый год), уходя на 1,5 км вглубь узкой известняковой расщелины и возвращаясь тем же путём.',
      en: 'A thrilling river-wading canyon adventure 45 km east of Fethiye (best May–Oct in lower water). After suspended wooden walkways above surging springs, hikers cross the +8°C glacial river ford and wade ~1.5 km deep into the towering limestone gorge before turning back.',
      de: 'Einzigartige Schluchtwanderung 45 km östlich von Fethiye (ideal Mai–Okt). Nach Holzstegen über tosenden Quellen waten Sie ~1,5 km tief durch das +8°C kalte Flussbett zwischen 300 m hohen Klippen.',
      tr: 'Fethiye’ye 45 km mesafede benzersiz bir su yürüyüşü (su seviyesinin düştüğü Mayıs–Ekim arası idealdir). Ahşap iskelelerin ardından yıl boyu +8°C olan buz gibi akarsuyu geçip kanyon içinde ~1,5 km ilerleyip aynı yoldan dönülür.',
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
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=36.4785,29.5435',
    image: '/api/images/locations/fethiye/todo/saklikent/saklikent.jpg',
  },

  // ================= ЗОНА 04: ПАТАРА, КАЛКАН И КАШ =================
  {
    id: 'patara-delikkemer-kalkan',
    trekNumber: 12,
    zoneId: 'patara-kas',
    region: 'lycian',
    difficulty: 3,
    distanceKm: 20.0,
    elevationGainM: 670,
    elevationLossM: 620,
    maxElevationM: 240,
    durationHours: '6.0 - 7.0',
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
    distanceKm: 14.5,
    elevationGainM: 1050,
    elevationLossM: 410,
    maxElevationM: 860,
    durationHours: '5.0 - 6.0',
    title: {
      ru: 'Калкан ➔ Плато Безирган (Кедровые амбары) ➔ Сарыбелен',
      en: 'Kalkan ➔ Bezirgan Plateau (Cedar Granaries) ➔ Sarıbelen',
      de: 'Kalkan ➔ Hochebene Bezirgan (Zedernspeicher) ➔ Sarıbelen',
      tr: 'Kalkan ➔ Bezirgan Yaylası (Tarihi Ambarlar) ➔ Sarıbelen',
    },
    subtitle: {
      ru: 'Подъём с побережья по древней караванной лестнице на прохладное плато Ликии',
      en: 'Ancient mule stairs climbing from Kalkan’s coast to historic highland cedar barns',
      de: 'Antike Karawanenstufen von der Küste auf das kühle Bergplateau von Bezirgan',
      tr: 'Kıyıdan tarihi katır yollarıyla Bezirgan yaylasının çivisiz ambarlarına tırmanış',
    },
    description: {
      ru: 'Серьёзный высокогорный переход из Калкана вглубь Ликийского плато. От верхней части города тропа поднимается через скалистое ущелье по древней караванной тропе на плодородную долину Безирган (~700 м), где сохранились 200–300-летние кедровые амбары без единого гвоздя, и уходит через лесистый перевал 860 м в тихую деревню Сарыбелен.',
      en: 'A demanding alpine transition from the coast into the cool Lycian highlands. Ascending from upper Kalkan through a narrow canyon on ancient mule steps, you reach the lush Bezirgan plateau (~700 m) — famous for interlocking cedar granaries built without nails — before crossing an 860 m pine pass to pastoral Sarıbelen.',
      de: 'Anspruchsvolle Bergetappe von der Küste ins lykische Hochland. Über antike Maultierpfade steigen Sie zur Hochebene Bezirgan (700 m) mit den nagellosen Zedernholz-Getreidespeichern und weiter über den 860-m-Pass nach Sarıbelen.',
      tr: 'Kıyı sıcağından serin Likya yaylalarına çıkan zorlu dağ etabı. Kalkan üstünden kanyon içindeki tarihi katır yoluyla çivisiz sedir ambarlarıyla ünlü Bezirgan yaylasına (~700 m), oradan da 860 m geçidi aşarak Sarıbelen köyüne varır.',
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
    distanceKm: 11.0,
    elevationGainM: 350,
    elevationLossM: 350,
    maxElevationM: 140,
    durationHours: '3.5 - 4.5',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.1972,29.6508&waypoints=36.1856,29.6394&destination=36.1745,29.6672&travelmode=walking',
    image: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg',
  },
  {
    id: 'kas-ucagiz-simena-kekova',
    trekNumber: 15,
    zoneId: 'patara-kas',
    region: 'lycian',
    difficulty: 2,
    distanceKm: 13.0,
    elevationGainM: 320,
    elevationLossM: 320,
    maxElevationM: 160,
    durationHours: '4.0 - 5.0',
    title: {
      ru: 'Учагыз ➔ Симена (Калекёй) ➔ Бухта Аперлае (Кекова)',
      en: 'Üçağız ➔ Simena (Kaleköy) ➔ Aperlai Bay (Kekova)',
      de: 'Üçağız ➔ Simena (Kaleköy) ➔ Bucht Aperlai (Kekova)',
      tr: 'Üçağız ➔ Simena (Kaleköy) ➔ Aperlai Koyu (Kekova)',
    },
    subtitle: {
      ru: 'Один из красивейших приморских треков Ликии: замок без автодорог и затонувшие стены',
      en: 'Coastal Lycian Way across car-free Simena Castle to the sunken ruins of Aperlai',
      de: 'Küsten-Highlight: Autofreie Burg Simena und die versunkenen Ruinen von Aperlai',
      tr: 'Arabasız Kaleköy kalesinden Aperlai batık surlarına Likya’nın en güzel kıyı rotası',
    },
    description: {
      ru: 'Знаковый прибрежный этап Восточного края нашего региона. Из тихой бухты Учагыз вы идёте в автомобильно-свободный Калекёй (античную Симену) с византийской крепостью и саркофагами в воде, а затем продолжаете по каменистому перешейку мимо оливковых рощ к древнему порту Аперлае, чьи стены частично ушли под воду после античных землетрясений.',
      en: 'A standout coastal walk in the Kekova sanctuary. Starting from quiet Üçağız harbor, visit car-free Kaleköy (ancient Simena) with its hilltop castle and water-logged Lycian sarcophagi, then follow the olive-lined footpath west across the peninsula to the partially submerged ancient port of Aperlai.',
      de: 'Ein Küsten-Highlight im Schutzgebiet Kekova: Vom Hafen Üçağız wandern Sie ins autofreie Kaleköy (Simena) mit seiner Burg und Sarkophagen im Wasser und weiter bis zu den versunkenen Ruinen von Aperlai.',
      tr: 'Kekova koruma bölgesindeki en özel kıyı yürüyüşü. Üçağız limanından başlayıp karayolu olmayan Kaleköy (Simena) kalesine ve deniz içindeki Likya lahitlerine ulaşır; ardından zeytinlikler arasından batık antik kent Aperlai koyuna varır.',
    },
    startPoint: {
      ru: 'Гавань Учагыз (36.1927, 29.8458)',
      en: 'Üçağız Village harbor (36.1927, 29.8458)',
      de: 'Hafen von Üçağız (36.1927, 29.8458)',
      tr: 'Üçağız Köyü iskelesi (36.1927, 29.8458)',
    },
    endPoint: {
      ru: 'Античный залив Аперлае (возврат через Сейрекчакыл или на лодке в Учагыз)',
      en: 'Aperlai Bay ruins (return by water taxi to Üçağız or road above)',
      de: 'Bucht Aperlai (Rückfahrt per Bootstaxi nach Üçağız)',
      tr: 'Aperlai Koyu kalıntıları (tekneyle Üçağız’a dönüş)',
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
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&origin=36.1927,29.8458&waypoints=36.1904,29.8622&destination=36.1592,29.7848&travelmode=walking',
    image: '/api/images/locations/kas/ruines/kekova/kekova.jpg',
  },
];

export const DETAILED_TRAIL_SLUGS = ['kayakoy-oludeniz'] as const;

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

export interface KayakoyWaypointCopy {
  title: string;
  shortLabel: string;
  note: string;
}

export interface DetailedTrailGuideCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  essentialsTitle: string;
  essentials: TrailEssentialRow[];
  mapSectionTitle: string;
  mapSectionSubtitle: string;
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
  waypointLabels: Record<
    'start' | 'ridge' | 'saddle' | 'junction' | 'cove-descent' | 'headland' | 'finish',
    KayakoyWaypointCopy
  >;
}

export const KAYAKOY_DETAILED_GUIDE: Record<LocaleCode, DetailedTrailGuideCopy> = {
  ru: {
    eyebrow: 'ЗОНА 03 · TREK 07 · ЭТАЛОННЫЙ РАЗВОРОТ МАРШРУТА',
    h1: 'Каякёй → Голубая лагуна Олюдениза (+ ветка в бухту Soğuk Su)',
    lead: 'Реальный трек OpenStreetMap (Relation #11827824) и высоты Copernicus DEM: от каменного города-призрака Левисси через сосновый хребет 278 м с ответвлением к ледяным подводным ключам прямо к песчаной косе Олюдениза.',
    essentialsTitle: 'TREK ESSENTIALS · ПАСПОРТ ТРОПЫ',
    essentials: [
      { label: 'ПРОТЯЖЁННОСТЬ', value: '5,3 км основной трек (2–2,5 ч) • +1,7 км в одну сторону до бухты Soğuk Su' },
      { label: 'ДОСТУП И СТАРТ', value: 'Долмуш из Фетхие каждые 20–30 мин до Каякёя; финиш прямо у пляжа в Олюденизе' },
      { label: 'ВЫСШАЯ ТОЧКА', value: '278 м (хребет над Каякёем, 0,72 км от старта); набор +284 м / сброс −429 м' },
      { label: 'ХАРАКТЕР ТРОПЫ', value: 'Маркированный однодневный хайк без рюкзака; известняковая осыпь и сосновый лес' },
      { label: 'СЕЗОН И ЗАПРЕТЫ', value: 'Идеально в марте–мае и сентябре–ноябре. Проверяйте лесные запреты (Orman Yasağı) в июле–августе' },
      { label: 'ВАРИАНТЫ ПРОДОЛЖЕНИЯ', value: 'Официальный старт Ликийской тропы в Оваджике (Трек 08) или лодка из бухты Soğuk Su' },
    ],
    mapSectionTitle: '3D-рельеф местности и профиль высот',
    mapSectionSubtitle: 'Вращайте 3D-ландшафт, переключайтесь на топографическую карту, кликайте по контрольным точкам 1–7 или скачайте GPX-трек для офлайн-навигатора.',
    introQuote: 'Немногие маршруты на турецком побережье дают такой контраст всего за два часа ходьбы: вы стартуете в тишине заброшенных греческих храмов XVIII–XIX веков, поднимаетесь на обдуваемый хвоей известняковый гребень над проливом и завершаете путь купанием в тёплой Голубой лагуне.',
    narrativeTitle: 'Пошаговая нитка маршрута',
    narrativeSegments: [
      {
        distanceRange: '0,0 – 0,72 км',
        duration: '25 мин',
        title: 'Через каменные руины Левисси на верхний гребень (278 м)',
        body: 'Маршрут стартует на южной окраине Каякёя (150 м над уровнем моря) и почти сразу уводит вверх по каменистой тропе среди оливковых террас. В первые 700 метров происходит весь основной набор высоты до 278 м — самая высокая точка пути. Обязательно оглянитесь назад: вся котловина города-призрака лежит как на ладони на фоне массивного горного хребта Бабадаг.',
      },
      {
        distanceRange: '0,72 – 1,65 км',
        duration: '20 мин',
        title: 'Сосновая седловина и развилка на бухту Soğuk Su',
        body: 'Тропа ныряет в тенистый сосновый лес и плавно сбрасывает высоту к седловине на отметке 157 м (1,65 км). Здесь от основной нитки уходит 1,7-километровая лесная тропа на запад в закрытую от волн бухту Холодной Воды (Soğuk Su Koyu), где на берегу бьют ледяные пресные ключи и работает сезонная таверна. Можно спуститься туда на обед и вернуться либо дойти прямо к Олюденизу.',
      },
      {
        distanceRange: '1,65 – 2,71 км',
        duration: '20 мин',
        title: 'Лесной траверс к панорамной смотровой над лагуной',
        body: 'Основной маршрут в сторону Олюдениза идёт по утоптанной земляной дороге и каменной кладке сквозь ароматные сосны и можжевельник. На 2,71 км (высота ~148 м) лес расступается на обзорной площадке: прямо под ногами открывается бирюзовый серп песчаной косы Кумбурну, а справа в небе парят парапланы, стартующие с вершин Бабадага.',
      },
      {
        distanceRange: '2,71 – 5,30 км',
        duration: '55 мин',
        title: 'Известняковый серпантин, скальный мыс и финиш в Олюденизе',
        body: 'Финальная половина пути — почти сплошной спуск (−429 м за весь поход). На 3,52 км тропа выходит к западной бухте лагуны почти на уровень моря (16 м), огибает небольшой скальный мыс (48 м) с лучшим ракурсом для фотографий косы и по каменным плитам спускается к дороге у входа в Олюдениз (5 м). Сюда же подходят долмуши обратно в Фетхие.',
      },
    ],
    paceBoxTitle: 'ТЕМП, ВОДА И ИЗВЕСТНЯК НА СПУСКЕ',
    paceBoxBody: 'Набор высоты здесь невелик (+284 м), главная коварность — крутой спуск ко второй половине пути по отполированному известняку. Закладывайте 2,5 часа с учётом фотоостановок, идите в кроссовках с цепкой подошвой (не в шлёпанцах) и возьмите 1,5–2 л воды на человека: на основном гребне родников нет.',
    galleryTitle: 'Характер тропы в реальных фотографиях',
    gallery: [
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
        alt: 'Каменные дома Каякёя на фоне горного массива Бабадаг',
        caption: 'Старт: каменные кварталы города-призрака Каякёй у подножия перевала.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy2.jpg',
        alt: 'Склон с руинами Левисси и сосновым лесом',
        caption: 'Первые 700 метров подъёма вверх к гребню 278 м среди руин и сосен.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy3.jpg',
        alt: 'Панорама долины Каякёй с верхнего склона',
        caption: 'Вид назад на зелёную долину Каякёя при выходе на верхнюю полку.',
      },
    ],
    directoryTitle: 'REGION DIRECTORY · СПРАВОЧНИК ПО УЧАСТКУ',
    directorySubtitle: 'Транспорт, вода, билеты и бытовая логистика именно для отрезка Каякёй — Олюдениз',
    directory: [
      {
        title: 'Транспорт и долмуши',
        items: [
          { label: 'Фетхие → Каякёй', detail: 'Маршрутки (долмуши) от центра и автовокзала Фетхие (и от мечети напротив торговой улицы) идут в сезон примерно каждые 20–30 минут (~25 мин в пути).' },
          { label: 'Олюдениз → Фетхие', detail: 'Финиш тропы выводит прямо к остановкам долмушей в Олюденизе; маршрутки ходят допоздна каждые 10–15 минут в сезон.' },
          { label: 'Лодка из Soğuk Su', detail: 'Если вы спустились в бухту Холодной Воды (ветка 1,7 км), в тёплый сезон туда подходят экскурсионные и частные лодки из Олюдениза и Гемилера.' },
        ],
      },
      {
        title: 'Вода, еда и остановки',
        items: [
          { label: 'Запас перед стартом', detail: 'Покупайте воду в магазинах деревни Каякёй до выхода на грунтовку: на гребне 278 м источников нет.' },
          { label: 'Бухта Soğuk Su Koyu', detail: 'Сезонный семейный ресторан у воды (обычно открыт с весны до ноября) — отличная точка для обеда и купания в освежающей воде.' },
          { label: 'Олюдениз и Бельчекиз', detail: 'На финише десятки кафе, душевые (платный вход на косу Кумбурну / бесплатный городской пляж Бельчекиз).' },
        ],
      },
      {
        title: 'Сборы, сезон и безопасность 2026',
        items: [
          { label: 'Плата за вход', detail: 'Сама лесная тропа бесплатна 100%. Билет нужен только если вы заходите внутрь огороженной музейной зоны Каякёя или на платный пляж заповедника Кумбурну (актуальные тарифы — muze.gov.tr).' },
          { label: 'Лучшее окно дня', detail: 'Стартуйте из Каякёя в 08:30–09:30 утра: вы пройдёте открытый подъём до полуденного солнца и спуститесь в лагуну к обеду.' },
          { label: 'Экстренная связь', detail: 'Единый номер спасателей и скорой в Турции — 112. Связь на склоне со стороны Олюдениза ловит, но в глубоких складках к Soğuk Su возможны провалы.' },
        ],
      },
    ],
    relatedTitle: 'Соседние тропы Зоны 03 (Фетхие и Олюдениз)',
    backToAtlas: 'Ко всем 15 тропам Атласа',
    waypointLabels: {
      start: { title: 'Старт: Каякёй (руины)', shortLabel: 'Каякёй', note: 'Южная кромка города-призрака, 150 м над у.м.' },
      ridge: { title: 'Верхний гребень (пик)', shortLabel: 'Гребень 278 м', note: 'Высшая точка маршрута, панорама Бабадага.' },
      saddle: { title: 'Седловина / развилка Soğuk Su', shortLabel: 'Разв. Soğuk Su', note: 'Отсюда уходит ветка 1,7 км в бухту Холодной Воды.' },
      junction: { title: 'Смотровая над Лагуной', shortLabel: 'Смотровая', note: 'Открытый вид на Голубую лагуну и парапланы.' },
      'cove-descent': { title: 'Спуск к западной бухте', shortLabel: 'Западная бухта', note: 'Выход к уровню моря у края лагуны.' },
      headland: { title: 'Скальный мыс над косой', shortLabel: 'Мыс 48 м', note: 'Финальная фототочка над бирюзовой водой.' },
      finish: { title: 'Финиш: Олюдениз (лагуна)', shortLabel: 'Олюдениз', note: 'Уровень моря, пляж и остановки долмушей в Фетхие.' },
    },
  },
  en: {
    eyebrow: 'ZONE 03 · TREK 07 · SIGNATURE TRAIL SPREAD',
    h1: 'Kayaköy → Ölüdeniz Blue Lagoon (+ Cold Water Bay Branch)',
    lead: 'Real OpenStreetMap geometry (Relation #11827824) paired with Copernicus DEM elevation: hike from the stone ghost town of Kayaköy over a 278 m pine crest — with an optional detour to spring-fed Soğuk Su Bay — down to Ölüdeniz Lagoon.',
    essentialsTitle: 'TREK ESSENTIALS',
    essentials: [
      { label: 'LENGTH', value: '5.3 km main trail (2–2.5 hrs) • +1.7 km one-way side branch to Soğuk Su Bay' },
      { label: 'ACCESS', value: 'Frequent dolmuş vans from Fethiye to Kayaköy; easy dolmuş return from Ölüdeniz beach' },
      { label: 'HIGHEST POINT', value: '278 m ridge above Kayaköy (0.72 km in); +284 m ascent / −429 m descent' },
      { label: 'TREK STYLE', value: 'Waymarked day hike, no heavy pack; stony limestone footing & shaded pine paths' },
      { label: 'RESTRICTIONS', value: 'Best Mar–May & Sep–Nov; verify summer forest-entry bans (Orman Yasağı) in July–Aug' },
      { label: 'FURTHER OPTIONS', value: 'Lycian Way Stage 1 at Ovacık (Trek 08) or boat transfer out of Cold Water Bay' },
    ],
    mapSectionTitle: '3D Terrain Overview & Elevation Profile',
    mapSectionSubtitle: 'Orbit the 3D coastline, switch to 2D Topo Map, click waypoints 1–7, or download the verified GPX track for offline hiking.',
    introQuote: 'Few Mediterranean walks pack so much contrast into two hours: you leave the silent stone churches of an abandoned 19th-century hillside town, crest a fragrant limestone ridge high above the sea, and finish beside Turkey’s most famous turquoise lagoon.',
    narrativeTitle: 'Stage-by-Stage Route Notes',
    narrativeSegments: [
      {
        distanceRange: '0.0 – 0.72 km',
        duration: '25 min',
        title: 'Ghost Village Climb to the 278 m Crest',
        body: 'Starting from the southern fringe of Kayaköy (150 m), the marked stone trail wastes no time climbing through ancient olive terraces. Within the first 720 meters you complete the main ascent to 278 m — the trek’s highest point — rewarding hikers with backward vistas across hundreds of roofless stone homes framed by Mount Babadağ.',
      },
      {
        distanceRange: '0.72 – 1.65 km',
        duration: '20 min',
        title: 'Pine Saddle & Branch to Cold Water Bay (Soğuk Su)',
        body: 'Entering cool Mediterranean pine woodland, the path eases down to a saddle at 157 m (1.65 km). Here a 1.7 km footpath branches west down to secluded Soğuk Su Koyu, famous for icy freshwater springs bubbling straight into the sea and a rustic seasonal tavern.',
      },
      {
        distanceRange: '1.65 – 2.71 km',
        duration: '20 min',
        title: 'Forest Traverse to the Blue Lagoon Overlook',
        body: 'Staying on the main Ölüdeniz line, you follow well-trodden pine trails and historic stone paving. At 2.71 km (~148 m), the canopy parts to reveal a dazzling elevated viewpoint straight down onto the Kumburnu sandspit while paragliders drift overhead from Babadağ.',
      },
      {
        distanceRange: '2.71 – 5.30 km',
        duration: '55 min',
        title: 'Limestone Zigzags & Lagoon Finish',
        body: 'The second half is a steady descent (−429 m total loss). Dropping to sea level near the western inlet (3.52 km, 16 m), the trail skirts one small rocky headland (48 m) before winding down stone-paved tracks straight to Ölüdeniz Beach and Fethiye-bound dolmuş stops.',
      },
    ],
    paceBoxTitle: 'PACE, WATER & LIMESTONE GRIP',
    paceBoxBody: 'With modest climbing (+284 m), the real challenge is the sustained descent over foot-polished limestone cobbles. Allow 2.5 hours with photo stops, wear grippy trail shoes (never sandals), and carry 1.5–2 L of water — the main ridge is dry.',
    galleryTitle: 'Along the Trail',
    gallery: [
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
        alt: 'Abandoned stone houses of Kayaköy with Mount Babadağ behind',
        caption: 'Trailhead backdrop: Kayaköy’s stone ruins below the forested pass.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy2.jpg',
        alt: 'Hiking ascent above Kayaköy valley through pines',
        caption: 'Climbing away from the ghost village toward the 278 m crest.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy3.jpg',
        alt: 'Kayaköy green valley panorama from the hillside path',
        caption: 'Looking back across the Kayaköy basin along the upper slope.',
      },
    ],
    directoryTitle: 'REGION DIRECTORY',
    directorySubtitle: 'Practical logistics for the Kayaköy – Ölüdeniz corridor',
    directory: [
      {
        title: 'Transport & Dolmuş',
        items: [
          { label: 'Fethiye → Kayaköy', detail: 'Dolmuş minibuses depart central Fethiye every 20–30 minutes in season (~25 min ride).' },
          { label: 'Ölüdeniz → Fethiye', detail: 'Frequent dolmuş buses run every 10–15 minutes from right near the trail finish.' },
          { label: 'Soğuk Su Boat Pickup', detail: 'During May–Oct, small excursion boats occasionally call at Soğuk Su Cove toward Ölüdeniz/Gemiler.' },
        ],
      },
      {
        title: 'Water & Refreshments',
        items: [
          { label: 'Kayaköy Shops', detail: 'Buy water and snacks in Kayaköy before hitting the dirt trailhead.' },
          { label: 'Soğuk Su Cove', detail: 'Seasonal waterfront tavern offers cold drinks, lunch, and swimming in spring-chilled water.' },
          { label: 'Ölüdeniz Promenade', detail: 'Cafes and free public access on Belceğiz Beach; paid park gate at Kumburnu spit.' },
        ],
      },
      {
        title: 'Fees & Safety 2026',
        items: [
          { label: 'Trail Access', detail: 'The hiking path itself is 100% free; tickets apply only inside the fenced Kayaköy museum zone or Kumburnu Nature Park (muze.gov.tr).' },
          { label: 'Best Start Time', detail: 'Leave Kayaköy between 08:30 and 09:30 to beat afternoon heat and swim before lunch.' },
          { label: 'Emergency', detail: 'Dial 112 anywhere in Türkiye. Signal is good facing Ölüdeniz but dips inside the Soğuk Su ravine.' },
        ],
      },
    ],
    relatedTitle: 'Nearby Trails in Zone 03 (Fethiye & Ölüdeniz)',
    backToAtlas: 'Back to All 15 Atlas Trails',
    waypointLabels: {
      start: { title: 'Start: Kayaköy Ruins', shortLabel: 'Kayaköy', note: 'South edge of ghost village, 150 m.' },
      ridge: { title: 'Upper Crest (Summit)', shortLabel: 'Crest 278 m', note: 'Highest point on the trek above Babadağ valley.' },
      saddle: { title: 'Saddle / Soğuk Su Fork', shortLabel: 'Soğuk Su Fork', note: '1.7 km footpath branch down to Cold Water Bay.' },
      junction: { title: 'Blue Lagoon Overlook', shortLabel: 'Overlook', note: 'Open view over Kumburnu Lagoon and paragliders.' },
      'cove-descent': { title: 'Western Cove Descent', shortLabel: 'West Cove', note: 'Trail drops toward sea level by the lagoon.' },
      headland: { title: 'Rocky Lagoon Headland', shortLabel: 'Headland 48 m', note: 'Final coastal bluff viewpoint before the beach.' },
      finish: { title: 'Finish: Ölüdeniz Beach', shortLabel: 'Ölüdeniz', note: 'Sea level, swimming and Fethiye dolmuş stops.' },
    },
  },
  de: {
    eyebrow: 'ZONE 03 · TREK 07 · DETAIL-ETAPPE',
    h1: 'Kayaköy → Blaue Lagune Ölüdeniz (+ Abzweig Soğuk Su)',
    lead: 'Verifizierter OpenStreetMap-Track (Relation #11827824) mit Copernicus-DEM-Höhendaten: vom Geisterdorf Kayaköy über den 278-m-Kiefernpass hinab zur Blauen Lagune von Ölüdeniz.',
    essentialsTitle: 'TREK ESSENTIALS',
    essentials: [
      { label: 'LÄNGE', value: '5,3 km Hauptweg (2–2,5 Std.) • +1,7 km Abzweig einfach nach Soğuk Su' },
      { label: 'ANREISE', value: 'Dolmuş ab Fethiye alle 20–30 Min. nach Kayaköy; Rückfahrt direkt ab Ölüdeniz' },
      { label: 'HÖCHSTER PUNKT', value: '278 m (Kamm bei km 0,72); +284 m Aufstieg / −429 m Abstieg' },
      { label: 'CHARAKTER', value: 'Markierte Tageswanderung; steinige Kalkpfade & schattiger Kiefernwald' },
      { label: 'SAISON & REGELN', value: 'Ideal März–Mai & Sept–Nov; im Juli–Aug mögliche Waldverbote (Orman Yasağı) prüfen' },
      { label: 'WEITERWEGE', value: 'Start des Lykischen Weges in Ovacık (Trek 08) oder Boot ab Soğuk Su' },
    ],
    mapSectionTitle: '3D-Geländeansicht & Höhenprofil',
    mapSectionSubtitle: 'Drehen Sie die 3D-Landschaft, wechseln Sie zur Topo-Karte, klicken Sie auf Punkte 1–7 oder laden Sie die GPX-Datei herunter.',
    introQuote: 'Kaum eine Wanderung bietet auf zwei Stunden so viel Kontrast: verlassene Steinhäuser am Berg, duftender Kiefernwald hoch über dem Meer und zum Abschluss ein Sprung in die Blaue Lagune.',
    narrativeTitle: 'Etappenbeschreibung',
    narrativeSegments: [
      {
        distanceRange: '0,0 – 0,72 km',
        duration: '25 Min.',
        title: 'Aufstieg aus Kayaköy zum 278-m-Kamm',
        body: 'Vom Südrand von Kayaköy (150 m) steigt der steinige Pfad zügig durch alte Olivenhaine auf den höchsten Punkt (278 m) mit tollem Blick zurück über das Geisterdorf und den Babadağ.',
      },
      {
        distanceRange: '0,72 – 1,65 km',
        duration: '20 Min.',
        title: 'Kiefernsattel & Abzweig nach Soğuk Su Koyu',
        body: 'Im Schatten der Kiefern geht es leicht bergab bis zum Sattel auf 157 m (1,65 km). Dort zweigt ein 1,7 km langer Pfad zur ruhigen Bucht Soğuk Su mit ihren eiskalten Süßwasserquellen im Meer ab.',
      },
      {
        distanceRange: '1,65 – 2,71 km',
        duration: '20 Min.',
        title: 'Waldweg zum Aussichtspunkt über der Lagune',
        body: 'Der Hauptweg nach Ölüdeniz folgt alten Steinpfaden bis zum Panorama-Punkt bei km 2,71 (~148 m) mit Blick auf die Sandzunge Kumburnu und Gleitschirmflieger.',
      },
      {
        distanceRange: '2,71 – 5,30 km',
        duration: '55 Min.',
        title: 'Kalkstein-Serpentinen hinab nach Ölüdeniz',
        body: 'In mehreren Kehren fällt der Weg bis fast auf Meereshöhe ab, umrundet ein letztes Felskap (48 m) und erreicht die Strandpromenade sowie die Dolmuş-Haltestellen in Ölüdeniz.',
      },
    ],
    paceBoxTitle: 'TEMPO, WASSER & TRITTSICHERHEIT',
    paceBoxBody: 'Die Hauptforderung ist nicht der Aufstieg (+284 m), sondern der Abstieg auf glatt poliertem Kalkstein. Planen Sie 2,5 Stunden ein, tragen Sie griffige Schuhe und nehmen Sie 1,5–2 L Wasser mit.',
    galleryTitle: 'Eindrücke entlang des Weges',
    gallery: [
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
        alt: 'Steinhäuser von Kayaköy vor den Bergen des Babadağ',
        caption: 'Startpunkt am Rande des Geisterdorfs Kayaköy.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy2.jpg',
        alt: 'Anstieg über die Ruinen von Kayaköy in den Kiefernwald',
        caption: 'Blick während des ersten Anstiegs Richtung Passhöhe.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy3.jpg',
        alt: 'Panorama über das grüne Tal von Kayaköy',
        caption: 'Rückblick ins grüne Tal von Kayaköy vom Berghang.',
      },
    ],
    directoryTitle: 'REGION DIRECTORY · INFOS VOR ORT',
    directorySubtitle: 'Verkehrsmittel, Wasser & praktische Hinweise für Kayaköy – Ölüdeniz',
    directory: [
      {
        title: 'Dolmuş & Busse',
        items: [
          { label: 'Fethiye → Kayaköy', detail: 'In der Saison alle 20–30 Min. ab Zentrum/Otogar (~25 Min. Fahrt).' },
          { label: 'Ölüdeniz → Fethiye', detail: 'Dichter Takt alle 10–15 Min. direkt ab Strandpromenade.' },
        ],
      },
      {
        title: 'Wasser & Einkehr',
        items: [
          { label: 'Start Kayaköy', detail: 'Wasser vor dem Abmarsch im Dorf kaufen; auf dem Kamm kein Brunnen.' },
          { label: 'Soğuk Su & Ölüdeniz', detail: 'Saisonale Taverne in Soğuk Su (Abzweig) und viele Lokale am Ziel.' },
        ],
      },
      {
        title: 'Gebühren & Sicherheit',
        items: [
          { label: 'Eintritt', detail: 'Der Wanderweg ist kostenfrei; Gebühren nur im umzäunten Museum Kayaköy oder Park Kumburnu.' },
          { label: 'Notruf 112', detail: 'Türkeiweite Notrufnummer 112; bester Start zwischen 08:30 und 09:30 Uhr.' },
        ],
      },
    ],
    relatedTitle: 'Weitere Routen in Zone 03',
    backToAtlas: 'Alle 15 Wanderrouten im Atlas',
    waypointLabels: {
      start: { title: 'Start: Kayaköy Ruinen', shortLabel: 'Kayaköy', note: 'Südrand des Geisterdorfs, 150 m.' },
      ridge: { title: 'Kammhöhe (Gipfel)', shortLabel: 'Kamm 278 m', note: 'Höchster Punkt der Tour über dem Tal.' },
      saddle: { title: 'Sattel / Abzweig Soğuk Su', shortLabel: 'Abzw. Soğuk Su', note: '1,7 km Seitenpfad in die kalte Bucht.' },
      junction: { title: 'Lagunen-Aussichtspunkt', shortLabel: 'Aussicht', note: 'Freier Blick auf Kumburnu und Babadağ.' },
      'cove-descent': { title: 'Abstieg Westbucht', shortLabel: 'Westbucht', note: 'Erreichen der Küstennähe (16 m).' },
      headland: { title: 'Felskap über dem Strand', shortLabel: 'Kap 48 m', note: 'Letzter Panoramablick auf die Lagune.' },
      finish: { title: 'Ziel: Strand Ölüdeniz', shortLabel: 'Ölüdeniz', note: 'Meereshöhe, Badestopp und Dolmuş-Anschluss.' },
    },
  },
  tr: {
    eyebrow: 'BÖLGE 03 · PARKUR 07 · ÖRNEK ROTA REHBERİ',
    h1: 'Kayaköy → Ölüdeniz Mavi Lagün (+ Soğuk Su Koyu Ayrımı)',
    lead: 'Gerçek OpenStreetMap geometrisi (Relation #11827824) ve Copernicus DEM yükseklik verileriyle: Kayaköy hayalet şehrinden 278 m çam sırtını aşarak — dileyenler için Soğuk Su ayrımıyla — Ölüdeniz sahiline iniş.',
    essentialsTitle: 'TREK ESSENTIALS · ROTA KİMLİĞİ',
    essentials: [
      { label: 'MESAFE', value: '5,3 km ana parkur (2–2,5 sa.) • +1,7 km tek yön Soğuk Su Koyu ayrımı' },
      { label: 'ULAŞIM', value: 'Fethiye’den Kayaköy’e 20–30 dk’da bir dolmuş; Ölüdeniz’den kolay dönüş' },
      { label: 'EN YÜKSEK NOKTA', value: '278 m sırt (0,72. km); toplam +284 m tırmanış / −429 m iniş' },
      { label: 'ROTA TİPİ', value: 'İşaretli günübirlik yürüyüş; taşlık kireçtaşı patika ve çam ormanı' },
      { label: 'SEZON & KURALLAR', value: 'Mart–Mayıs ve Eylül–Kasım idealdir; Temmuz–Ağustos’ta orman giriş yasaklarını kontrol edin' },
      { label: 'DEVAM SEÇENEKLERİ', value: 'Ovacık Likya Yolu başlangıcı (Parkur 08) veya Soğuk Su’dan tekne dönüşü' },
    ],
    mapSectionTitle: '3D Arazi Görünümü ve Rakım Profili',
    mapSectionSubtitle: '3D haritayı döndürün, Topo haritaya geçin, 1–7 durak noktalarına tıklayın veya çevrimdışı kullanım için GPX dosyasını indirin.',
    introQuote: 'İki saatlik yürüyüşe bu kadar güçlü bir kontrast sığdıran rota azdır: terk edilmiş taş evlerin sessizliğinden çam kokulu 278 m sırta çıkar, finalde ise Türkiye’nin en ünlü turkuaz lagününe inersiniz.',
    narrativeTitle: 'Adım Adım Rota Anlatımı',
    narrativeSegments: [
      {
        distanceRange: '0,0 – 0,72 km',
        duration: '25 dk',
        title: 'Kayaköy’den 278 m Sırtına Tırmanış',
        body: 'Kayaköy’ün güney ucundan (150 m) başlayan işaretli patika, zeytin terasları arasından doğrudan ana tırmanışa geçer ve 720. metrede rotanın zirvesi olan 278 m sırtına ulaşır. Geriye baktığınızda Babadağ önünde uzanan taş hayalet şehrin tamamı ayaklarınızın altındadır.',
      },
      {
        distanceRange: '0,72 – 1,65 km',
        duration: '20 dk',
        title: 'Çam Geçidi ve Soğuk Su Koyu Yol Ayrımı',
        body: 'Gölge veren kızılçam ormanına giren patika 1,65. km’de 157 m rakımlı geçide iner. Buradan batıya ayrılan 1,7 km’lik patika, dibinden buz gibi kaynak suları çıkan Soğuk Su Koyu’na ve sezonluk aile lokantasına ulaşır.',
      },
      {
        distanceRange: '1,65 – 2,71 km',
        duration: '20 dk',
        title: 'Lagün Seyir Noktasına Orman Geçişi',
        body: 'Ölüdeniz ana hattını izleyen yürüyüşçüler 2,71. km’de (~148 m) muhteşem Kumburnu Lagünü seyir noktasına varır; gökyüzünde Babadağ’dan kalkan yamaç paraşütleri süzülür.',
      },
      {
        distanceRange: '2,71 – 5,30 km',
        duration: '55 dk',
        title: 'Taş Patika İnişi ve Ölüdeniz Plajı',
        body: 'Yolun ikinci yarısı neredeyse kesintisiz bir iniştir (toplam −429 m). Batı koyuna (16 m) indikten sonra son bir kayalık burnu (48 m) aşarak Ölüdeniz sahiline ve Fethiye dolmuş duraklarına ulaşılır.',
      },
    ],
    paceBoxTitle: 'TEMPO, SU VE KAYGAN KİREÇTAŞI',
    paceBoxBody: 'Tırmanışı mütevazıdır (+284 m), ancak ikinci yarıdaki cilalanmış taş iniş dikkat ister. Fotoğraf molalarıyla 2,5 saat planlayın, kaymaz tabanlı spor ayakkabı giyin ve kişi başı 1,5–2 L su taşıyın.',
    galleryTitle: 'Parkurdan Gerçek Kareler',
    gallery: [
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy.jpg',
        alt: 'Babadağ eteklerinde Kayaköy taş evleri',
        caption: 'Başlangıç: geçidin hemen altındaki tarihi Kayaköy taş mahallesi.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy2.jpg',
        alt: 'Kayaköy üzerinden 278 m sırtına tırmanan patika',
        caption: 'Hayalet şehirden orman sırtına yükselen ilk kilometre.',
      },
      {
        src: '/api/images/locations/fethiye/ruines/kayakoy/kayakoy3.jpg',
        alt: 'Üst patikadan Kayaköy ovası panoraması',
        caption: 'Sırta yaklaşırken Kayaköy vadisine geriye bakış.',
      },
    ],
    directoryTitle: 'BÖLGE REHBERİ · PRATİK BİLGİLER',
    directorySubtitle: 'Kayaköy – Ölüdeniz hattı için ulaşım, su ve güvenlik notları',
    directory: [
      {
        title: 'Dolmuş ve Ulaşım',
        items: [
          { label: 'Fethiye → Kayaköy', detail: 'Sezonda merkezden her 20–30 dakikada bir minibüs kalkar (~25 dk sürer).' },
          { label: 'Ölüdeniz → Fethiye', detail: 'Sahilden merkeze sık aralıklarla dolmuş işler.' },
        ],
      },
      {
        title: 'Su ve Mola',
        items: [
          { label: 'Kayaköy Bakkal', detail: 'Patikaya girmeden önce su stoğunuzu tamamlayın; ana sırtta çeşme yoktur.' },
          { label: 'Soğuk Su & Ölüdeniz', detail: 'Soğuk Su ayrımında sezonluk kır lokantası, bitişte Ölüdeniz kafeleri bulunur.' },
        ],
      },
      {
        title: 'Ücretler ve Güvenlik 2026',
        items: [
          { label: 'Ücretsiz Patika', detail: 'Orman rotası ücretsizdir; bilet yalnızca Kayaköy ören yeri içi veya Kumburnu Tabiat Parkı kapısında istenir (muze.gov.tr).' },
          { label: 'Acil Yardım 112', detail: 'Sabah 08:30–09:30 arası başlangıç idealdir; acil durumlarda 112’yi arayın.' },
        ],
      },
    ],
    relatedTitle: 'Bölge 03 Yakın Parkurları',
    backToAtlas: 'Tüm 15 Atlas Rotasına Dön',
    waypointLabels: {
      start: { title: 'Başlangıç: Kayaköy', shortLabel: 'Kayaköy', note: 'Hayalet şehir güney çıkışı, 150 m.' },
      ridge: { title: 'Üst Sırt (Zirve)', shortLabel: '278 m Sırt', note: 'Rotanın en yüksek noktası, Babadağ manzarası.' },
      saddle: { title: 'Geçit / Soğuk Su Ayrımı', shortLabel: 'Soğuk Su Ayrımı', note: '1,7 km Soğuk Su Koyu yan patikası başlangıcı.' },
      junction: { title: 'Lagün Seyir Noktası', shortLabel: 'Seyir Noktası', note: 'Ölüdeniz Lagünü ve paraşüt manzarası.' },
      'cove-descent': { title: 'Batı Koyu İnişi', shortLabel: 'Batı Koyu', note: 'Deniz seviyesine yaklaşım (16 m).' },
      headland: { title: 'Kayalık Burun', shortLabel: '48 m Burun', note: 'Plaj öncesi son panoramik burun.' },
      finish: { title: 'Bitiş: Ölüdeniz Plajı', shortLabel: 'Ölüdeniz', note: 'Deniz seviyesi, yüzme ve Fethiye dolmuşları.' },
    },
  },
};
