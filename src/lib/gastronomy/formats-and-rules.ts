// SOURCE [24.11.2026]: Форматы турецких заведений общепита (Esnaf Lokantası, Kebapçı / Ocakbaşı, Pideci, Balık Restoranı, Meyhane, Pastane),
// пошаговый конструктор Рыбного рынка Фетхие (Fethiye Balık Pazarı), правило розничного запрета алкоголя 22:00–06:00 (Law No. 4250 / TAPDK) и квота Duty Free аэропорта DLM,
// ритуал подачи Rakı и местные напитки Муглы (Gara Guzu, Narince, Emir) + ориентиры счёта (Kuver / Servis Ücreti 10%) на сезон 2026:
// URL: https://www.goturkiye.com, https://www.ktb.gov.tr, https://www.turkeysforlife.com, https://www.tga.gov.tr.

import type { DiningFormatOption, GastroRuleCard, WaiterPhrase } from './types';

export const DINING_FORMATS: DiningFormatOption[] = [
  // =========================================================================
  // 6 TURKISH DINING FORMATS
  // =========================================================================
  {
    id: 'esnaf-lokantasi',
    tab: 'formats',
    badge: {
      ru: 'ОБЕД ДЛЯ МЕСТНЫХ',
      en: 'LOCAL LUNCH',
      de: 'EINHEIMISCHEN-LUNCH',
      tr: 'ESNAF LOKANTASI',
    },
    title: {
      ru: 'Локанта (Esnaf Lokantası / Ev Yemekleri)',
      en: 'Esnaf Lokantası (Home-Style Pot Kitchen)',
      de: 'Esnaf Lokantası (Hausmannskost-Theke)',
      tr: 'Esnaf Lokantası ve Ev Yemekleri',
    },
    priceRangeEur: '€5–10',
    priceUnit: {
      ru: 'за обед из 2–3 блюд с хлебом',
      en: 'for a 2–3 dish lunch with bread',
      de: 'für ein 2–3-Gänge-Mittagessen mit Brot',
      tr: '2–3 çeşit yemek ve ekmek dahil',
    },
    hoursOrContext: {
      ru: 'Пик выбора: 11:45–15:00 · Утренние супы с 07:30',
      en: 'Peak tray variety: 11:45–15:00 · Morning soups from 07:30',
      de: 'Größte Auswahl: 11:45–15:00 · Morgensuppen ab 07:30',
      tr: 'En bol çeşit: 11:45–15:00 · Sabah çorbaları 07:30’dan itibaren',
    },
    includedItems: {
      ru: [
        'Стеклянная витрина из 10–20 готовых кастрюль: чечевичный суп, карныярык, тушёная фасоль, рис и овощи',
        'Без туристических меню в картинках: вы просто показываете пальцем на понравившееся блюдо',
        'Тёплый свежий белый хлеб и часто стакан воды к столу',
      ],
      en: [
        'Steam-table showcase of 10–20 simmering daily pots: lentil soup, stuffed eggplant, beans, rice, stews',
        'Zero tourist gimmicks—simply walk up to the glass display and point',
        'Basket of fresh white bread and quick table service',
      ],
      de: [
        'Glasvitrine mit 10–20 täglich gekochten Töpfen: Linsensuppe, Auberginen, Bohnen, Reis',
        'Kein Schnickschnack: einfach an der Theke auf die gewünschten Gerichte zeigen',
        'Korb mit frischem Weißbrot inklusive',
      ],
      tr: [
        'Cam vitrinde 10–20 çeşit günlük ev yemeği: mercimek, karnıyarık, kuru fasulye, pilav, zeytinyağlılar',
        'Sıcak benmari tezgâhından görerek hızlı seçim imkânı',
        'Taze ekmek ve hızlı servis; öğle molasında en pratik durak',
      ],
    },
    insiderTip: {
      ru: 'Лучшие кастрюли в локантах Даламана, Фетхие и Каша разбирают к 14:30. Приходите к 12:30–13:30 за самым свежим выбором без очередей.',
      en: 'Top stew trays in Dalaman, Fethiye, and Kaş sell out by 14:30—arrive around 12:30–13:30 for full selection.',
      de: 'Beliebte Eintöpfe in Dalaman, Fethiye und Kaş sind oft ab 14:30 Uhr ausverkauft – am besten 12:30–13:30 Uhr kommen.',
      tr: 'Dalaman, Fethiye ve Kaş çarşı lokantalarında en sevilen tepsiler 14:30’da tükenir; tam çeşit için 12:30–13:30 arası gidin.',
    },
  },
  {
    id: 'pideci-lahmacun',
    tab: 'formats',
    badge: {
      ru: 'ДРОВЯНАЯ ПЕЧЬ',
      en: 'WOOD-FIRED OVEN',
      de: 'STEINOFEN-BÄCKEREI',
      tr: 'TAŞ FIRIN PİDECİ',
    },
    title: {
      ru: 'Пидеджи и Лахмаджун (Taş Fırın Pideci)',
      en: 'Pideci (Stone-Oven Flatbread Bakery)',
      de: 'Pideci (Steinofen-Fladenbäckerei)',
      tr: 'Taş Fırın Pideci ve Lahmacun Salonu',
    },
    priceRangeEur: '€4–9',
    priceUnit: {
      ru: 'за горячий пиде или пару лахмаджунов',
      en: 'for a whole pide boat or two lahmacun',
      de: 'für ein ganzes Pide oder zwei Lahmacun',
      tr: '1 tam pide veya 2 lahmacun + ayran',
    },
    hoursOrContext: {
      ru: 'Работают с 11:00 до 22:30–23:30 без выходных',
      en: 'Open 11:00–23:00 daily for sit-down or takeaway',
      de: 'Täglich 11:00–23:00 Uhr vor Ort oder zum Mitnehmen',
      tr: 'Her gün 11:00–23:00 arası taze taş fırın servisi',
    },
    includedItems: {
      ru: [
        'Тесто раскатывают прямо при вас и выпекают на камне за 4–6 минут',
        'Бесплатная миска хрустящего салата с зеленью, помидорами, луком и лимоном',
        'Идеальный солёный айран в медной кружке (Yayık Ayran)',
      ],
      en: [
        'Hand-stretched dough baked to order inside a wood-fired stone oven in 4–6 minutes',
        'Complimentary crisp herb, tomato, onion, and lemon garnish plate',
        'Best paired with foamy salted yogurt drink (Yayık Ayran)',
      ],
      de: [
        'Frisch ausgerollter Teig in 4–6 Minuten im Steinofen knusprig gebacken',
        'Gratis Beilagenteller mit Petersilie, Zwiebeln, Tomaten & Zitrone',
        'Perfekt mit schaumigem Yayık Ayran',
      ],
      tr: [
        'Sipariş anında açılıp odun ateşinde 4–6 dakikada pişen çıtır hamur',
        'Yanında ücretsiz mevsim salata, maydanoz ve limon tabağı',
        'Köpüklü yayık ayran veya şalgam eşliğinde servis',
      ],
    },
    insiderTip: {
      ru: 'Если видите на вывеске «Odun Ateşinde» или «Taş Fırın», смело заходите: за счёт высокого оборота теста здесь всё всегда свежее и без наценки за вид на море.',
      en: 'Look for signs reading "Odun Ateşinde" (wood-fired) or "Taş Fırın" (stone oven) two blocks behind any marina for top quality at half the boardwalk price.',
      de: 'Schilder mit „Odun Ateşinde“ (Holzfeuer) oder „Taş Fırın“ (Steinofen) garantieren frische Qualität abseits der Touristenpreise.',
      tr: 'Marinaların iki arka sokağındaki "Odun Ateşinde" veya "Taş Fırın" tabelalı pideciler her zaman en taze hamuru sunar.',
    },
  },
  {
    id: 'ocakbasi-kebapci',
    tab: 'formats',
    badge: {
      ru: 'УГЛИ И МАНГАЛ',
      en: 'CHARCOAL GRILL',
      de: 'HOLZKOHLE-GRILL',
      tr: 'KEBAPÇI / OCAKBAŞI',
    },
    title: {
      ru: 'Кебабчи и Оджакбаши (Kebapçı / Ocakbaşı)',
      en: 'Kebapçı & Ocakbaşı (Charcoal Grillhouse)',
      de: 'Kebapçı & Ocakbaşı (Offener Holzkohlegrill)',
      tr: 'Kebapçı ve Ocakbaşı Restoranları',
    },
    priceRangeEur: '€12–24',
    priceUnit: {
      ru: 'за основное мясное блюдо с закусками',
      en: 'per main grill platter with starters',
      de: 'pro Hauptgericht mit Vorspeisen',
      tr: 'kebap porsiyonu ve ikramlık mezeler dahil',
    },
    hoursOrContext: {
      ru: '12:00–23:30 · Жарче и живее всего вечером 19:00–22:30',
      en: '12:00–23:30 · Liveliest during dinner 19:00–22:30',
      de: '12:00–23:30 · Beste Stimmung abends 19:00–22:30',
      tr: '12:00–23:30 · En hareketli akşam 19:00–22:30',
    },
    includedItems: {
      ru: [
        'Адана, Урфа, Чёкертме, Искандер, печёные томаты и острые перчики с углей',
        'В хороших оджакбаши перед горячим бесплатно подают лаваш, сумах с луком, хайдари и аджылы эзме',
        'Именно здесь лучше всего пробовать горячий десерт Кюнефе на финал',
      ],
      en: [
        'Adana, Urfa, Çökertme, İskender, blistered tomatoes & sweet green peppers off embers',
        'Quality grillhouses bring warm lavash, sumac onions, and spicy ezme dips on the house',
        'Best venue format to finish with freshly baked hot Künefe',
      ],
      de: [
        'Adana, Urfa, Çökertme, İskender sowie gegrillte Tomaten und Paprika',
        'Gute Häuser servieren warmes Lavash-Brot, Sumak-Zwiebeln und Ezme gratis vorab',
        'Beste Adresse für frisch gebackenes heißes Künefe als Dessert',
      ],
      tr: [
        'Adana, Urfa, Çökertme, İskender, közlenmiş domates ve sivri biber',
        'İyi kebapçılarda yemek öncesi sıcak lavaş, sumaklı soğan ve ezme ikram edilir',
        'Yemek sonunda taze pişen sıcak künefe için en doğru adres',
      ],
    },
    insiderTip: {
      ru: 'Боитесь жгучего перца или заказываете детям? Обязательно просите Урфу (Urfa) и добавляйте «Acısız olsun» (не острый), а не Адану.',
      en: 'Want flavor without chili heat? Order Urfa Kebab and say "Acısız olsun" (not spicy) instead of Adana.',
      de: 'Kein Fan von Schärfe? Urfa statt Adana bestellen und „Acısız olsun“ (nicht scharf) dazu sagen.',
      tr: 'Acı sevmiyorsanız veya çocuklar için sipariş veriyorsanız Adana yerine Urfa isteyin ve "Acısız olsun" deyin.',
    },
  },
  {
    id: 'aegean-meyhane',
    tab: 'formats',
    badge: {
      ru: 'ВЕЧЕРНЕЕ МЕЗЕ И РАКЫ',
      en: 'MEZE & RAKI TAVERNA',
      de: 'ABEND-TAVERNE',
      tr: 'EGE MEYHANESİ',
    },
    title: {
      ru: 'Эгейская мейхане и рыбный ресторан (Meyhane / Balık)',
      en: 'Aegean Meyhane & Waterfront Seafood Taverna',
      de: 'Ägäis-Meyhane & Fisch-Taverne am Meer',
      tr: 'Ege Meyhanesi ve Balık Restoranları',
    },
    priceRangeEur: '€25–50',
    priceUnit: {
      ru: 'за ужин с 4–6 мезе, рыбой и напитками',
      en: 'for dinner with 4–6 meze plates, fish & drinks',
      de: 'für Abendessen mit 4–6 Meze, Fisch & Getränken',
      tr: '4–6 meze, balık ve içecek dahil kişi başı',
    },
    hoursOrContext: {
      ru: '18:30–00:30 · Стол берут на весь вечер на 2–3 часа',
      en: '18:30–00:30 · Linger 2–3 hours at one unhurried sitting',
      de: '18:30–00:30 · Man bleibt entspannt 2–3 Stunden am Tisch',
      tr: '18:30–00:30 · Acele edilmeyen 2–3 saatlik uzun akşam sofraları',
    },
    includedItems: {
      ru: [
        'Поднос с 15–25 холодными мезе (морская спаржа, фава, хайдари, цветки кабачка), которые выбираете глазами',
        'Тёплые закуски (Ara sıcak): кольца кальмара, креветки в глиняной плошке, сигара-бёрек',
        'Целая дикая рыба на гриле или осьминог + дыня и белый сыр к ракы',
      ],
      en: [
        'Tableside cold meze tray with 15–25 small plates (samphire, fava, haydari, stuffed blossoms)',
        'Warm mid-course ("Ara sıcak"): grilled calamari, buttered clay-pot shrimp, crispy börek',
        'Whole charcoal sea bream/bass or octopus plus melon & white cheese alongside rakı',
      ],
      de: [
        'Kaltes Meze-Tablett direkt am Tisch (Meeresspargel, Fava, Haydari, Zucchiniblüten)',
        'Warme Zwischengänge („Ara sıcak“): Kalmar, Knoblauchgarnelen aus dem Tontopf',
        'Ganze Dorade oder Oktopus vom Grill plus Melone und Schafskäse zum Rakı',
      ],
      tr: [
        'Masaya gelen tepsiden seçmeli 15–25 çeşit soğuk Ege mezesi',
        'Ara sıcaklar: tereyağlı güveç karides, ızgara kalamar ve paçanga böreği',
        'Ana yemekte közde balık veya ahtapot; yanında kavun ve beyaz peynir',
      ],
    },
    insiderTip: {
      ru: 'Не заказывайте сразу всё меню: выберите 4–5 мезе на стол, одну горячую закуску и 1 рыбу на двоих — порции в хороших мейхане очень щедрые.',
      en: 'Pace your order: 4–5 shared cold mezes, one warm starter, and a single whole fish easily satisfy two diners.',
      de: 'Nicht alles sofort bestellen: 4–5 Meze, eine warme Vorspeise und ein ganzer Fisch reichen locker für zwei Personen.',
      tr: 'Hepsini birden söylemeyin: iki kişi için 4–5 soğuk meze, bir ara sıcak ve paylaşımlı bir balık fazlasıyla yeterlidir.',
    },
  },
  {
    id: 'serpme-kahvalti-garden',
    tab: 'formats',
    badge: {
      ru: 'РИТУАЛ УТРА',
      en: 'MORNING FEAST',
      de: 'FRÜHSTÜCKS-RITUAL',
      tr: 'SERPME KAHVALTI',
    },
    title: {
      ru: 'Садовые кафе турецкого завтрака (Serpme Kahvaltı)',
      en: 'Garden Café & Village Breakfast Spread (Serpme)',
      de: 'Gartencafé & Dorf-Frühstück (Serpme Kahvaltı)',
      tr: 'Bahçe Serpme Kahvaltı Mekanları',
    },
    priceRangeEur: '€18–32',
    priceUnit: {
      ru: 'за весь стол на 2 персоны (включая чай)',
      en: 'for a full 2-person spread (unlimited tea)',
      de: 'für den kompletten Tisch für 2 Personen (inkl. Tee)',
      tr: '2 kişilik tam sofra (sınırsız çay dahil)',
    },
    hoursOrContext: {
      ru: '08:30–13:30 (в выходные приходят к 10:00 на 2 часа)',
      en: '08:30–13:30 (weekends peak around 10:00–12:30)',
      de: '08:30–13:30 (Wochenende am beliebtesten 10:00–12:30)',
      tr: '08:30–13:30 (hafta sonları 10:00–12:30 arası yoğun)',
    },
    includedItems: {
      ru: [
        '15–25 пиал: 4–5 видов сыров, оливки, сотовый мёд с каймаком, тахини с пекмезом, варенье из инжира и бергамота',
        'Горячие позиции: сковородка Менемен, яичница с суджуком, тёплое гёзлеме или лепёшки пиши',
        'Безлимитный заварочный чай в чайнике (Demlik Çay)',
      ],
      en: [
        '15–25 bowls: regional cheeses, cured olives, honeycomb with clotted cream, tahini-pekmez, fig & citrus jams',
        'Hot plates: sizzling Menemen skillet, sujuk sausage eggs, warm gözleme or fried pişi dough',
        'Bottomless brewed teapot (Demlik Çay) kept warm at your table',
      ],
      de: [
        '15–25 Schälchen: Käse, Oliven, Wabenhonig mit Kaymak, Tahin-Pekmez, Feigenmarmelade',
        'Warme Gerichte: Menemen aus der Pfanne, Knoblauchwurst, Gözleme oder Pişi-Gebäck',
        'Unbegrenzter frisch gebrühter Tee aus der Teekanne (Demlik Çay)',
      ],
      tr: [
        '15–25 tabaklık sofra: yöresel peynirler, zeytin, bal-kaymak, tahin-pekmez ve ev reçelleri',
        'Sıcaklar: sahanda menemen, sucuklu yumurta, gözleme veya puf pişi',
        'Masa ortasında sıcak demlik çay (sınırsız)',
      ],
    },
    insiderTip: {
      ru: 'После настоящего Serpme Kahvaltı обед не понадобится до 17:00 — смело планируйте его как плотный поздний завтрак-бруч перед дорогой или прогулкой.',
      en: 'A genuine Serpme spread easily replaces both breakfast and lunch—treat it as a late 10:30 brunch before exploring.',
      de: 'Ein echtes Serpme Kahvaltı ersetzt Frühstück und Mittagessen – ideal als gemütlicher Brunch um 10:30 Uhr.',
      tr: 'Gerçek bir serpme kahvaltı akşamüstüne kadar tok tutar; gezi öncesi 10:30 gibi brunch olarak planlayın.',
    },
  },
  {
    id: 'pastane-dondurma',
    tab: 'formats',
    badge: {
      ru: 'ВЫПЕЧКА И СЛАДКОЕ',
      en: 'PASTRY & COFFEE',
      de: 'KONDITOREI & EIS',
      tr: 'PASTANE & DONDURMA',
    },
    title: {
      ru: 'Пастане и кофейни-десертные (Pastane / Dondurmacı)',
      en: 'Turkish Pastane, Künefe Parlors & Goat-Milk Dondurma',
      de: 'Pastane, Baklava-Konditoreien & Ziegenmilch-Eis',
      tr: 'Pastaneler, Tatlıcılar ve Keçi Sütü Dondurma',
    },
    priceRangeEur: '€3–8',
    priceUnit: {
      ru: 'за порцию десерта с кофе или чаем',
      en: 'per dessert portion with Turkish coffee or tea',
      de: 'pro Dessertportion mit Mokka oder Tee',
      tr: 'tatlı porsiyonu + Türk kahvesi / çay',
    },
    hoursOrContext: {
      ru: '07:00–23:30 (утром симит и бёрек, вечером десерты)',
      en: '07:00–23:30 (morning simit/börek, evening sweets)',
      de: '07:00–23:30 (morgens Simit/Börek, abends Süßes)',
      tr: '07:00–23:30 (sabah simit/börek, akşam tatlı)',
    },
    includedItems: {
      ru: [
        'С 07:30 — тёплый хрустящий бублик Симит, слоёные Погача и сырный Су-бёрек',
        'Днём и вечером — запечённый молочный пудинг Фырын Сютлач, фисташковая Баклава и тыква Кабак Татлысы',
        'На побережье Каш–Кекова — домашняя козья дондурма (Yanık / Keçi sütü dondurma)',
      ],
      en: [
        'From 07:30: warm sesame Simit rings, flaky Poğaça pastries, and layered Su Böreği cheese pie',
        'Afternoon/evening: caramelized Fırın Sütlaç pudding, Gaziantep pistachio baklava, pumpkin dessert',
        'In Kaş & Kekova: smoky burnt goat-milk dondurma and homemade orchard-fruit scoops',
      ],
      de: [
        'Ab 07:30 Uhr: warme Sesamringe (Simit), Poğaça-Teilchen und Käse-Börek',
        'Nachmittags & abends: karamellisierter Milchreis (Sütlaç), Pistazien-Baklava, Kürbisdessert',
        'In Kaş & Kekova: traditionelles Ziegenmilch-Eis (Yanık Dondurma)',
      ],
      tr: [
        '07:30’dan itibaren sıcak susamlı simit, poğaça ve su böreği',
        'Öğleden sonra ve akşam: fırın sütlaç, fıstıklı baklava, tahinli kabak tatlısı',
        'Kaş ve Kekova’da keçi sütü yanık dondurma ve mevsim meyveli dondurmalar',
      ],
    },
    insiderTip: {
      ru: 'Утром берите к кофе слоёный Su Böreği — он мягкий, с тягучим белым сыром и напоминает нежную турецкую запеканку без мяса.',
      en: 'Pair morning coffee with a slice of Su Böreği ("water pastry")—soft boiled pastry sheets layered with salty white cheese.',
      de: 'Zum Morgenkaffee unbedingt ein Stück Su Böreği mit weißem Käse probieren – weich und saftig wie eine türkische Käselasagne.',
      tr: 'Sabah kahvaltısı için hafif ve yumuşak su böreği ile taze demlenmiş çay en iyi ikilidir.',
    },
  },

  // =========================================================================
  // 4 COASTAL CULINARY RITUALS
  // =========================================================================
  {
    id: 'ritual-balik-pazari',
    tab: 'rituals',
    badge: {
      ru: 'РИТУАЛ № 1 · ФЕТХИЕ',
      en: 'RITUAL #1 · FETHİYE',
      de: 'RITUAL NR. 1 · FETHİYE',
      tr: 'RİTÜEL 1 · FETHİYE',
    },
    title: {
      ru: 'Конструктор Рыбного рынка Фетхие (Balık Pazarı): 3 шага',
      en: 'Fethiye Fish Market ("Pick & Grill") in 3 Simple Steps',
      de: 'Fethiye Fischmarkt-Prinzip in 3 einfachen Schritten',
      tr: 'Fethiye Balık Pazarı Sistemi: 3 Adımda Taze Balık',
    },
    priceRangeEur: '€18–32',
    priceUnit: {
      ru: 'итого с человека за улов + готовку + салат',
      en: 'total per person including catch, grill & salad',
      de: 'gesamt pro Person inkl. Fisch, Grill & Salat',
      tr: 'balık + pişirme + salata dahil kişi başı',
    },
    hoursOrContext: {
      ru: 'Лучше приходить к 18:30–19:30 (пока не заняты все столы по периметру)',
      en: 'Best arrival 18:30–19:30 before outer tables fill up',
      de: 'Beste Zeit 18:30–19:30 Uhr, bevor die Tische voll sind',
      tr: 'En ideal saat 18:30–19:30 arası (masalar dolmadan)',
    },
    includedItems: {
      ru: [
        'Шаг 1: Выбираете свежую дораду, сибаса, красную барабульку, кальмаров или креветок на центральных прилавках со льдом и оплачиваете по весу рыбакам',
        'Шаг 2: Несёте пакет в любой понравившийся ресторан вокруг площади и садитесь за столик',
        'Шаг 3: Повара чистят и жарят ваш улов за фикс-плату (~4–6 € с чел.), принося большой зелёный салат и хрустящий хлеб',
      ],
      en: [
        'Step 1: Browse the central ice stalls for sea bream, red mullet, squid, or king prawns and pay the fishmonger by weight',
        'Step 2: Walk 10 paces to any surrounding restaurant table and hand over your bag',
        'Step 3: Kitchen cleans and grills your fish for a small per-person cooking fee (~€4–6) including big green salad & warm bread',
      ],
      de: [
        'Schritt 1: Am Mittelstand Dorade, Meerbarbe, Kalmar oder Garnelen nach Gewicht aussuchen und direkt bezahlen',
        'Schritt 2: Tüte in einem der umliegenden Restaurants abgeben und Platz nehmen',
        'Schritt 3: Gegen eine Pauschale (~4–6 € p. P.) wird alles frisch gegrillt – inkl. großem Salat und Brot',
      ],
      tr: [
        '1. Adım: Ortadaki tezgâhlardan çipura, barbun, kalamar veya karidesi tarttırıp balıkçıya ödeyin',
        '2. Adım: Poşetinizle çevredeki dilediğiniz restoranın masasına oturun',
        '3. Adım: Kişi başı sabit pişirme ücreti (~4–6 €) karşılığında balığınız ızgara yapılıp salata ve ekmekle getirilir',
      ],
    },
    insiderTip: {
      ru: 'Возьмите к рыбе на прилавке хотя бы 300 г кальмаров (Kalamar) или крупных креветок (Karides) — на углях или в чесночном масле в ресторане они получаются идеально.',
      en: 'Add 300 g of fresh squid (Kalamar) or large prawns (Karides) at the fish stall—the perimeter chefs cook them wonderfully in garlic butter.',
      de: 'Unbedingt 300 g frische Calamari oder Riesengarnelen dazu kaufen – die Köche bereiten sie perfekt in Knoblauchbutter zu.',
      tr: 'Tezgâhtan balığın yanına mutlaka 300 gr kalamar veya iri karides ekleyin; tereyağlı güveçte harika hazırlanır.',
    },
  },
  {
    id: 'ritual-raki-table',
    tab: 'rituals',
    badge: {
      ru: 'РИТУАЛ № 2 · ЭГЕЙСКИЙ ВЕЧЕР',
      en: 'RITUAL #2 · AEGEAN NIGHT',
      de: 'RITUAL NR. 2 · ÄGÄIS-ABEND',
      tr: 'RİTÜEL 2 · Çilingir Sofrası',
    },
    title: {
      ru: 'Искусство стола с Ракы («Львиное молоко») и беседа в мейхане',
      en: 'The Rakı Table Etiquette ("Lion’s Milk" & Cold Meze)',
      de: 'Die Kunst der Rakı-Tafel („Löwenmilch“ & Meze)',
      tr: 'Rakı Sofrası Adabı: Mezeler, Kavun ve Peynir',
    },
    priceRangeEur: '€25–45',
    priceUnit: {
      ru: 'на человека за вечер с 0,35 л ракы на двоих',
      en: 'per person with shared 350 ml rakı bottle',
      de: 'pro Person inkl. geteilter 0,35-l-Rakı-Flasche',
      tr: 'iki kişi paylaşımlı 35’lik rakı ve mezeler',
    },
    hoursOrContext: {
      ru: 'Только вечер (с 19:00) · Главный закон — не пить залпом и не спешить',
      en: 'Evenings from 19:00 · Never rush or shoot rakı straight',
      de: 'Abends ab 19:00 · Niemals stürzen, immer langsam genießen',
      tr: 'Akşam 19:00 sonrası · Acele etmeden, sohbet eşliğinde içilir',
    },
    includedItems: {
      ru: [
        'Порядок налива критичен: 1) треть анисового дистиллята, 2) треть холодной воды (напиток белеет), 3) лёд в самом конце',
        'Золотое трио закусок: солёный белый сыр Ezine, спелая сладкая дыня Kavun и зелёные травы',
        'Популярные мягкие серии: Tekirdağ Altın Seri, Efe Yaş Üzüm (зелёная бутылка) или классический Yeni Rakı',
      ],
      en: [
        'Exact pouring order: 1) one-third rakı, 2) chilled water (turns milky "Aslan sütü"), 3) 1–2 ice cubes last so anise oils don’t crystallize',
        'Essential pairing trio: salty aged white cheese (Ezine), sweet chilled melon (Kavun), and green herbs',
        'Smooth bottles to ask for: Tekirdağ Altın Seri, Efe Yaş Üzüm (fresh-grape), or classic Yeni Rakı',
      ],
      de: [
        'Gieß-Reihenfolge: 1) Drittel Rakı, 2) kaltes Wasser (wird milchig), 3) Eis erst ganz zum Schluss',
        'Unverzichtbares Trio: salziger Ezine-Schafskäse, süße Melone (Kavun) & grüne Kräuter',
        'Empfohlene Sorten: Tekirdağ Altın Seri, Efe Yaş Üzüm oder klassischer Yeni Rakı',
      ],
      tr: [
        'Doğru sıra: Önce rakı, sonra soğuk su (süt beyazına döner), en son 1–2 buz (anason kristalleşmemesi için)',
        'Olmazsa olmaz üçlü: Ezine beyaz peynir, soğuk kavun ve taze Ege mezeleri',
        'Yumuşak içim tercihleri: Tekirdağ Altın Seri, Efe Yaş Üzüm veya klasik Yeni Rakı',
      ],
    },
    insiderTip: {
      ru: 'Чокаются в Турции краем донышка бокала (или мягко звенят), но никогда не ставят пустой стакан обратно — рядом всегда стоит второй бокал с чистой водой.',
      en: 'Always keep a separate glass of plain water beside your rakı and sip slowly between cold meze bites.',
      de: 'Immer ein zweites Glas stilles Wasser neben dem Rakı stehen lassen und zwischen den Meze-Bissen abwechseln.',
      tr: 'Rakı bardağının yanında mutlaka bir bardak sade su bulundurun ve her yudumda soğuk meze ile dengeleyin.',
    },
  },
  {
    id: 'ritual-mugla-wine-craft',
    tab: 'rituals',
    badge: {
      ru: 'РИТУАЛ № 3 · ВИНА И КРАФТ МУГЛЫ',
      en: 'RITUAL #3 · WINES & CRAFT',
      de: 'RITUAL NR. 3 · WEIN & CRAFT',
      tr: 'RİTÜEL 3 · EGE ŞARABI & KRAFT',
    },
    title: {
      ru: 'Автохтонные вина Эгея и крафтовое пиво Муглы «Gara Guzu»',
      en: 'Aegean Grape Varietals & Muğla’s Craft Beer (Gara Guzu)',
      de: 'Ägäische Rebsorten & Muğlas Craft-Bier (Gara Guzu)',
      tr: 'Ege Şarapları ve Muğla’nın Yerel Kraft Birası: Gara Guzu',
    },
    priceRangeEur: '€6–15',
    priceUnit: {
      ru: 'бокал вина / крафтовое пиво в баре (дешевле в супермаркете до 22:00)',
      en: 'per glass in bars (buy bottles retail before 22:00)',
      de: 'pro Glas in Bars (Flaschen im Handel vor 22:00 Uhr günstiger)',
      tr: 'restoranda kadeh / şişe (marketlerde 22:00 öncesi çok daha ucuz)',
    },
    hoursOrContext: {
      ru: 'Розничный алкоголь (TEKEL / Migros): строго до 22:00!',
      en: 'Retail alcohol sales (TEKEL / Migros): strictly cut off at 22:00!',
      de: 'Alkoholverkauf im Laden (TEKEL / Migros): streng nur bis 22:00 Uhr!',
      tr: 'Tekel ve marketlerde perakende alkol satışı: 22:00’ye kadar!',
    },
    includedItems: {
      ru: [
        'Белые вина к рыбе и травам: Narince, минеральный Emir и цветочное эгейское Sultaniye (бутик-винодельни Книдоса/Датчи и Йешильузюмлю)',
        'Красные к кебабам: купаж Öküzgözü & Boğazkere (сочные ягоды + терпкость) или лёгкое Kalecik Karası',
        'Гордость провинции Мугла: независимая пивоварня Gara Guzu («Чёрный ягнёнок») — ищите Blonde Ale, Summer IPA и Amber Ale',
      ],
      en: [
        'Crisp seafood whites: Narince, volcanic Emir, and floral Aegean Sultaniye (plus boutique Knidos/Datça & Yeşilüzümlü labels)',
        'Grill reds: Öküzgözü–Boğazkere blends or Pinot-like Kalecik Karası',
        'Local Muğla pride: Gara Guzu craft brewery—look for Blonde Ale, Summer IPA, and Amber Ale in Kaş/Fethiye/Migros',
      ],
      de: [
        'Weißweine zu Fisch: Narince, Emir und blumiges Sultaniye (sowie kleine Weingüter in Datça & Yeşilüzümlü)',
        'Rotweine zu Kebabs: Öküzgözü–Boğazkere oder das leichte Kalecik Karası',
        'Lokalstolz aus Muğla: Craft-Bier von Gara Guzu (Blonde Ale, Summer IPA, Amber Ale)',
      ],
      tr: [
        'Balık ve meze yanına beyazlar: Narince, Emir ve Ege’nin Sultaniye üzümü (Datça / Yeşilüzümlü butik bağları)',
        'Et ve kebaplara kırmızılar: Öküzgözü–Boğazkere kupajı veya Kalecik Karası',
        'Muğla’nın yerel gururu: Gara Guzu kraft biraları (Blonde Ale, Summer IPA, Amber Ale)',
      ],
    },
    insiderTip: {
      ru: 'В бюджетных сетях BİM, A101 и Şok спиртного нет вообще. Если хотите вино или пиво на террасу виллы — заезжайте в Migros, CarrefourSA или TEKEL строго до 22:00.',
      en: 'Discount chains BİM, A101, and Şok sell zero alcohol. Visit Migros, CarrefourSA, Macrocenter, or TEKEL shops strictly before the 22:00 nationwide till lock.',
      de: 'Discounter wie BİM, A101 und Şok führen keinen Alkohol. Für den Vorrat unbedingt vor 22:00 Uhr zu Migros, CarrefourSA oder TEKEL.',
      tr: 'BİM, A101 ve Şok’ta alkol satılmaz; Migros, CarrefourSA veya Tekel bayilerine yasal saat olan 22:00’den önce uğrayın.',
    },
  },
  {
    id: 'ritual-souvenir-tastes',
    tab: 'rituals',
    badge: {
      ru: 'РИТУАЛ № 4 · ВКУСЫ ДОМОЙ',
      en: 'RITUAL #4 · TAKE HOME',
      de: 'RITUAL NR. 4 · MITBRINGSEL',
      tr: 'RİTÜEL 4 · YÖRESEL HEDİYELİK',
    },
    title: {
      ru: 'Что привезти съедобного: мёд Чай Балы, миндаль Датчи и гранатовый соус',
      en: 'Edible Coastal Treasures: Pine Honey, Datça Almonds & Pomegranate Molasses',
      de: 'Essbare Schätze aus Muğla: Pinienhonig, Datça-Mandeln & Granatapfelsirup',
      tr: 'Bölgeden Ne Alınır: Çam Balı, Datça Bademi ve Nar Ekşisi',
    },
    priceRangeEur: '€4–16',
    priceUnit: {
      ru: 'за банку / упаковку у фермеров на базаре',
      en: 'per jar or vacuum bag at village markets',
      de: 'pro Glas oder Beutel direkt vom Bauernmarkt',
      tr: 'köy pazarlarında kavanoz / paket başı',
    },
    hoursOrContext: {
      ru: 'Ищите на базарах Пн–Вс (Кёйджегиз, Фетхие, Датча) · В багаж!',
      en: 'Buy at Mon–Sun Pazars (Köyceğiz, Fethiye, Datça) · Pack in checked luggage!',
      de: 'Auf den Wochenmärkten Mo–So kaufen · In den Aufgabe-Koffer packen!',
      tr: 'Pzt–Paz halk pazarlarından alın · Sıvı kuralları için uçak altı bagaja koyun!',
    },
    includedItems: {
      ru: [
        'Сосновый мёд Муглы (Çam Balı) — тёмный, тягучий, с хвойной горчинкой и без приторности',
        'Сладкий миндаль сорта Nurlu из Датчи (сырой или в лёгкой обжарке) + паста из миндаля',
        '100% натуральный гранатовый соус Nar Ekşisi (смотрите состав без глюкозного сиропа) и оливковое масло холодного отжима',
      ],
      en: [
        'Muğla Pine Honey (Çam Balı)—dark, mineral-rich forest honeydew harvested around Marmaris & Dalaman',
        'Datça Nurlu almonds (unsalted, toasted, or creamy almond spread)',
        'Pure boiled pomegranate molasses (Nar Ekşisi—check label for 100% Nar without glucose syrup) & cold-pressed olive oil',
      ],
      de: [
        'Pinienhonig aus Muğla (Çam Balı) – dunkel, harzig-würzig und wenig süß',
        'Datça-Mandeln der Sorte Nurlu (roh, geröstet oder als Mandelcreme)',
        'Reiner Granatapfelsirup (Nar Ekşisi, auf 100 % Granatapfel ohne Glukosesirup achten) & Olivenöl',
      ],
      tr: [
        'Muğla Çam Balı — koyu renkli, yoğun kıvamlı ve düşük şekerli orman balı',
        'Datça Nurlu bademi — çiğ, kavrulmuş veya kavanoz badem ezmesi',
        '%100 doğal Nar Ekşisi (glikoz şurupsuz gerçek ev yapımı) ve erken hasat soğuk sıkım zeytinyağı',
      ],
    },
    insiderTip: {
      ru: 'Мёд, тахини и оливковое масло относятся к жидкостям на досмотре в аэропорту Даламан (DLM) — в ручную кладь пустят только баночки до 100 мл, всё крупное убирайте в сдаваемый чемодан.',
      en: 'Honey, tahini, pomegranate molasses, and olive oil count as liquids at Dalaman Airport (DLM) security—anything over 100 ml must go into checked luggage.',
      de: 'Honig, Tahin, Granatapfelsirup und Olivenöl gelten am Flughafen DLM als Flüssigkeiten (> 100 ml unbedingt ins Aufgabegepäck!).',
      tr: 'Bal, tahin, nar ekşisi ve zeytinyağı DLM güvenlik kontrolünde sıvı sayılır; 100 ml üzeri kavanozları mutlaka uçak altı bagajına koyun.',
    },
  },
];

// SOURCE [24.11.2026]: Практический турецкий глоссарий для заказа в ресторанах, локантах и расчёта по счёту
// (URL: https://www.goturkiye.com, https://www.ktb.gov.tr)
export const WAITER_PHRASES: WaiterPhrase[] = [
  {
    trPhrase: 'Hesap lütfen',
    pronunciation: 'Хеса́п лю́тфен',
    ruMeaning: 'Счёт, пожалуйста',
    enMeaning: 'The bill, please',
    deMeaning: 'Die Rechnung, bitte',
    trContext: 'В конце ужина — подают чек в книжечке или на тарелке',
    whenToUse: {
      ru: 'Когда закончили ужин и готовы оплатить картой или наличными',
      en: 'When ready to pay by card or cash after dinner',
      de: 'Am Ende des Essens für Karte oder Barzahlung',
      tr: 'Yemek sonunda adisyon istemek için',
    },
  },
  {
    trPhrase: 'Kilo fiyatı mı, porsiyon mu?',
    pronunciation: 'Кило́ фияты́ мы, порсийо́н му?',
    ruMeaning: 'Цена указана за килограмм или за порцию?',
    enMeaning: 'Is this price per kilo or per portion?',
    deMeaning: 'Ist das der Kilopreis oder pro Portion?',
    trContext: 'Критически важно спрашивать до взвешивания свежей рыбы',
    whenToUse: {
      ru: 'Всегда перед заказом целой рыбы на набережных',
      en: 'Always ask before wild sea fish hits the weighing scales',
      de: 'Immer fragen, bevor ganzer Fisch gewogen wird',
      tr: 'Bütün balık seçerken sürpriz hesap yaşamamak için',
    },
  },
  {
    trPhrase: 'Servis ücreti dahil mi?',
    pronunciation: 'Серви́с юджрети́ дахи́ль ми?',
    ruMeaning: 'Плата за обслуживание уже включена?',
    enMeaning: 'Is service charge included?',
    deMeaning: 'Ist der Service schon inklusive?',
    trContext: 'Помогает не платить чаевые дважды поверх 10% Servis Ücreti',
    whenToUse: {
      ru: 'При проверке чека в ресторанах марин и Каша',
      en: 'Checking bills in marina restaurants & Kaş',
      de: 'Bei der Rechnungsprüfung in Marina-Lokalen',
      tr: 'Bahşiş bırakmadan önce fiş kontrolünde',
    },
  },
  {
    trPhrase: 'Acısız olsun lütfen',
    pronunciation: 'Аджысы́з олсу́н лю́тфен',
    ruMeaning: 'Пожалуйста, сделайте без острого',
    enMeaning: 'Not spicy, please',
    deMeaning: 'Bitte nicht scharf',
    trContext: 'Для кебабов, лахмаджуна, шалгама и соусов детям',
    whenToUse: {
      ru: 'Когда заказываете блюда, где обычно кладут хлопья перца',
      en: 'Ordering kebabs, lahmacun, or kid-friendly dishes',
      de: 'Für Kinder oder wenn man keine Chili-Flocken möchte',
      tr: 'Kebap, lahmacun veya çocuk yemekleri sipariş ederken',
    },
  },
  {
    trPhrase: 'Deniz çipurası / levreği var mı?',
    pronunciation: 'Дени́з чипурасы́ / левреи́ вар мы?',
    ruMeaning: 'Есть ли дикая (морская), а не фермерская дорада/сибас?',
    enMeaning: 'Do you have wild-caught sea bream / sea bass?',
    deMeaning: 'Haben Sie Wildfang-Dorade / -Wolfsbarsch?',
    trContext: 'Разделяет плотную дикую рыбу от дешёвой садковой',
    whenToUse: {
      ru: 'В рыбных тавернах и на Рыбном рынке Фетхие',
      en: 'In coastal seafood tavernas & Fethiye Fish Market',
      de: 'In Fisch-Tavernen & auf dem Markt in Fethiye',
      tr: 'Balık restoranlarında doğal av balığı sorarken',
    },
  },
  {
    trPhrase: 'Orta şekerli / Sade / Az şekerli',
    pronunciation: 'Орта́ шекерли́ / Саде́ / Аз шекерли́',
    ruMeaning: 'Кофе по-турецки: средний сахар / без сахара / чуть сладкий',
    enMeaning: 'Turkish coffee sweetness: medium / unsweetened / lightly sweet',
    deMeaning: 'Türkischer Mokka: mittel / ohne Zucker / wenig Zucker',
    trContext: 'Сахар в джезве варят сразу с кофе, потом добавить сложно',
    whenToUse: {
      ru: 'В момент заказа турецкого кофе в кофейне',
      en: 'Must be specified when ordering Turkish coffee (sugar is brewed in)',
      de: 'Immer direkt bei der Mokka-Bestellung angeben',
      tr: 'Türk kahvesi siparişinde şeker oranını belirtirken',
    },
  },
  {
    trPhrase: 'Günlük ev yemekleri neler var?',
    pronunciation: 'Гюнлю́к эв емеклери́ неле́р вар?',
    ruMeaning: 'Что сегодня свежего из домашней кастрюльной кухни?',
    enMeaning: 'What homemade pot dishes do you have today?',
    deMeaning: 'Welche hausgemachten Tagesgerichte gibt es heute?',
    trContext: 'У витрины в локантах — покажут лучшие свежие блюда дня',
    whenToUse: {
      ru: 'В обед (12:00–15:00) в любой городской локанте',
      en: 'At lunchtime inside neighborhood Esnaf Lokantası',
      de: 'Mittags an der Vitrine einer lokalen Lokanta',
      tr: 'Esnaf lokantalarında günün taze tencere yemeklerini sorarken',
    },
  },
  {
    trPhrase: 'Kuver var mı?',
    pronunciation: 'Куве́р вар мы?',
    ruMeaning: 'Есть ли сбор за сервировку стола (хлеб/воду)?',
    enMeaning: 'Is there a table cover charge (kuver)?',
    deMeaning: 'Gibt es eine Gedeckgebühr (Kuver)?',
    trContext: 'Помогает избежать неожиданных 1–3 € с человека за принесённый хлеб',
    whenToUse: {
      ru: 'В туристических ресторанах на первых линиях набережных',
      en: 'At waterfront restaurants before accepting extra bread/water trays',
      de: 'In Ufer-Restaurants bei Brot- und Wasser-Beilagen',
      tr: 'Masaya ekstra gelen ekmek/su ikramlarının ücretli olup olmadığını sorarken',
    },
  },
  {
    trPhrase: 'Paket yapabilir misiniz?',
    pronunciation: 'Паке́т япабили́р мисини́з?',
    ruMeaning: 'Можно завернуть с собой?',
    enMeaning: 'Could you pack this to go?',
    deMeaning: 'Können Sie das zum Mitnehmen einpacken?',
    trContext: 'Если не осилили огромное пиде, кебаб или сладости',
    whenToUse: {
      ru: 'Когда осталась половина вкусного пиде или баклавы',
      en: 'When you want leftover pide, kebab, or pastry packed for later',
      de: 'Für übriges Pide, Kebab oder Baklava zum Mitnehmen',
      tr: 'Artan pide, kebap veya tatlıyı yanınıza almak istediğinizde',
    },
  },
  {
    trPhrase: 'Elinize sağlık, çok lezzetliydi',
    pronunciation: 'Элинизе́ саалы́к, чок леззетлийди́',
    ruMeaning: 'Здоровья вашим рукам, было очень вкусно!',
    enMeaning: 'Bless your hands, it was delicious!',
    deMeaning: 'Ein Kompliment an die Küche, es war köstlich!',
    trContext: 'Лучший турецкий комплимент повару и хозяйке семейного кафе',
    whenToUse: {
      ru: 'Уходя из семейного кафе, пекарни или маленькой локанты',
      en: 'Leaving a family lokanta, village garden, or bakery',
      de: 'Beim Verlassen einer Familien-Lokanta oder Dorfbäckerei',
      tr: 'Aile işletmelerinden ve lokantalardan çıkarken teşekkür etmek için',
    },
  },
];

// SOURCE [24.11.2026]: Правила расчёта, проверки рыбы, законодательства об алкоголе и диет в Турции на 2026 год
// (URL: https://www.ktb.gov.tr, https://www.goturkiye.com, https://www.turkeysforlife.com)
export const GASTRO_RULES_2026: GastroRuleCard[] = [
  {
    id: 'bill-kuver-tips',
    tone: 'amber',
    eyebrow: {
      ru: 'ЧЕК, KUVER И ЧАЕВЫЕ',
      en: 'BILLS, KUVER & TIPPING',
      de: 'RECHNUNG, KUVER & TRINKGELD',
      tr: 'ADİSYON, KUVER VE BAHŞİŞ',
    },
    title: {
      ru: 'Как не переплатить по счёту: Kuver, Servis Ücreti и бесплатный чай',
      en: 'Reading a Turkish Restaurant Bill: Kuver, 10% Service & Complimentary Tea',
      de: 'Türkische Rechnung verstehen: Kuver, Servicegebühr & Gratis-Tee',
      tr: 'Hesap Kontrolü: Kuver, %10 Servis Ücreti ve İkram Çay',
    },
    points: {
      ru: [
        'Kuver (сервировка): хлеб, масло, паста из оливок и запечатанная вода могут стоить 1–3 € с человека в чеке — в простых локантах и пидеджи этого сбора обычно нет.',
        'Servis Ücreti (плата за сервис 10%): в Гёджеке, Каше и Мармарисе её часто уже впечатывают в низ чека. Если строка есть — дополнительные чаевые оставлять не нужно.',
        'Если Servis Ücreti нет, принято округлять счёт или оставлять ~10% (желательно наличными в лирах прямо официанту).',
        'Маленький стакан турецкого чая (İkram Çay) после основного ужина почти всегда подаётся как бесплатный комплимент заведения.',
      ],
      en: [
        'Kuver (table cover): bread baskets, olive dip, and bottled water can add €1–3 per diner at tourist spots; neighborhood lokantas rarely charge kuver.',
        'Servis Ücreti (10% service): common in Göcek, Kaş, and Marmaris marinas—check the bottom line before adding extra tip.',
        'If no service charge appears, tipping roughly 10% in cash TRY is warm etiquette for good service.',
        'Small tulip glasses of Turkish black tea after dinner (İkram Çay) are almost always complimentary.',
      ],
      de: [
        'Kuver (Gedeck): Brotkorb, Olivenpaste und Wasserflasche kosten in Touristenlokalen oft 1–3 € p. P.; in Lokantas meist gratis.',
        'Servis Ücreti (10 % Service): in Göcek, Kaş und Marmaris oft bereits auf dem Bon enthalten – dann ist kein weiteres Trinkgeld nötig.',
        'Fehlt der Posten, sind ca. 10 % Trinkgeld in bar angemessen.',
        'Ein Glas schwarzer Tee nach dem Essen (İkram Çay) geht fast immer aufs Haus.',
      ],
      tr: [
        'Kuver: Turistik sahil restoranlarında ekmek, zeytin ezmesi ve kapalı su kişi başı 1–3 € kuver olarak yansıyabilir; esnaf lokantalarında genelde yoktur.',
        'Servis Ücreti (%10): Göcek, Kaş ve Marmaris marinalarında faturaya eklenebilir; varsa ekstra bahşiş gerekmez.',
        'Servis ücreti yoksa nakit ~%10 bahşiş bırakmak yaygındır.',
        'Yemek sonrası gelen ince belli bardaktaki çay genellikle müessesenin ikramıdır.',
      ],
    },
    sourceLabel: 'GoTürkiye Gastronomy Guide',
    sourceUrl: 'https://www.goturkiye.com',
  },
  {
    id: 'seafood-weight-check',
    tone: 'cyan',
    eyebrow: {
      ru: 'РЫБА, КРАБ И ЛОВУШКИ НАБЕРЕЖНЫХ',
      en: 'SEAFOOD WEIGHT & FAIR PRICING',
      de: 'FISCHPREIS & GEWICHTSKONTROLLE',
      tr: 'BALIK FİYATI VE TAZELİK KONTROLÜ',
    },
    title: {
      ru: 'Правило ледяного прилавка: цена за кг против цены за порцию',
      en: 'Ice-Counter Rule: Kilo Price vs. Portion Price & Freshness Checks',
      de: 'Eistheken-Regel: Kilopreis vs. Portionspreis & Frischecheck',
      tr: 'Balık Tezgâhı Kuralı: Kilo Fiyatı ve Tazelik Testi',
    },
    points: {
      ru: [
        'Целую дикую рыбу (сибас, дорада, красный группер, дентекс) на побережье часто продают на вес — уточняйте Kilo fiyatı до того, как рыбу отправят на гриль.',
        'Признаки реально свежей рыбы на льду: ясные выпуклые глаза (не мутные), ярко-красные жабры без слизи и упругое тело.',
        'Чтобы поужинать рыбой честно и без наценок первой линии, выбирайте Рыбный рынок Фетхие (Balık Pazarı) или прибрежные таверны без зазывал на улице.',
        'Избегайте заведений с огромными меню в картинках на 6 языках и агрессивным зазывалой у входа — вкуснее там, где обедают местные.',
      ],
      en: [
        'Whole wild fish (sea bass, bream, dentex) is usually priced per kilogram—confirm exact weight and total price before grilling.',
        'Freshness signs on ice: clear glossy eyes, bright crimson gills, and firm springy flesh.',
        'For transparent pricing and peak freshness, choose Fethiye Balık Pazarı or quiet backstreet tavernas.',
        'Skip waterfront spots with six-language photo binders and aggressive street touts; follow local diners instead.',
      ],
      de: [
        'Ganzer Wildfang wird meist pro Kilogramm abgerechnet – Gewicht und Gesamtpreis vor dem Grillen nennen lassen.',
        'Frischemerkmale auf Eis: klare gewölbte Augen, leuchtend rote Kiemen und festes Fleisch.',
        'Maximale Fairness bieten der Fischmarkt Fethiye sowie kleine Nebenstraßen-Tavernen.',
        'Lokale mit 6-sprachigen Bilderspeisekarten und aufdringlichen Werbern am Eingang besser meiden.',
      ],
      tr: [
        'Tezgâhtaki bütün deniz balıkları genelde kiloyla satılır; ızgaraya gitmeden önce mutlaka tarttırıp toplam fiyatı sorun.',
        'Taze balık belirtileri: parlak şeffaf gözler, canlı kırmızı solungaçlar ve diri gövde.',
        'Şeffaf fiyat için Fethiye Balık Pazarı’nı veya hanutçusu olmayan ara sokak meyhanelerini seçin.',
        'Kapıda ısrarcı davetçisi ve çok dilli resimli dev menüleri olan mekânlar yerine yerlilerin doluştuğu yerlere girin.',
      ],
    },
    sourceLabel: 'Turkeys for Life · Coastal Dining',
    sourceUrl: 'https://www.turkeysforlife.com',
  },
  {
    id: 'alcohol-curfew-dlm',
    tone: 'rose',
    eyebrow: {
      ru: 'АЛКОГОЛЬ 22:00 И DUTY FREE',
      en: '22:00 ALCOHOL LAW & DLM DUTY FREE',
      de: 'ALKOHOL-SPERRSTUNDE & DUTY FREE',
      tr: '22:00 ALKOL KURALI VE DLM',
    },
    title: {
      ru: 'Закон о продаже спиртного с 22:00 до 06:00 и экономия 30–50% по прилёту',
      en: 'Nationwide 22:00–06:00 Retail Curfew & Saving 30–50% at DLM Arrivals',
      de: 'Verkaufsverbot ab 22:00 Uhr & 30–50 % Ersparnis im DLM Duty Free',
      tr: '22:00–06:00 Perakende Yasağı ve DLM Duty Free Avantajı',
    },
    points: {
      ru: [
        'В магазинах (TEKEL, Migros, CarrefourSA) кассы физически блокируют продажу любого алкоголя с 22:00 до 06:00. На бары и рестораны запрет не действует.',
        'В бюджетных супермаркетах BİM, A101 и Şok алкоголь и сигареты не продаются круглосуточно.',
        'Из-за высоких акцизов (ÖTV) крепкие напитки и хорошее вино в городе дорогие — пользуйтесь магазином Duty Free в зоне выдачи багажа Dalaman (DLM) сразу по прилёту.',
        'В ресторанах бокал вина или коктейль нередко удваивают чек — учитывайте это при планировании бюджета на ужин.',
      ],
      en: [
        'Retail shops (TEKEL, Migros, CarrefourSA) lock all alcohol checkouts strictly between 22:00 and 06:00. Licensed bars and restaurants remain unaffected.',
        'Popular discount grocery chains BİM, A101, and Şok carry no alcohol at any hour.',
        'High Turkish excise taxes make spirits and wine pricey locally—use Arrivals Duty Free inside Dalaman (DLM) baggage claim for 30–50% savings.',
        'Ordered by the glass, imported spirits or wine can double a seafood dinner bill—budget accordingly.',
      ],
      de: [
        'Im Einzelhandel (TEKEL, Migros, CarrefourSA) sperren Kassen Alkoholkäufe streng zwischen 22:00 und 06:00 Uhr (Bars/Restaurants ausgenommen).',
        'Discounter wie BİM, A101 und Şok führen grundsätzlich keinen Alkohol.',
        'Durch hohe Steuern lohnt sich der Einkauf im Dalaman (DLM) Arrivals Duty Free direkt bei der Ankunft (oft 30–50 % günstiger).',
        'Wein und Spirituosen im Restaurant verdoppeln schnell die Gesamtrechnung.',
      ],
      tr: [
        'Tekel ve süpermarket kasaları yasa gereği 22:00–06:00 arası alkol satışını otomatik kilitler (restoran ve barlar bu saate tabi değildir).',
        'BİM, A101 ve Şok mağazalarında alkollü içecek satılmaz.',
        'Yüksek ÖTV nedeniyle kaliteli şarap veya yüksek alkollü içecekleri havalimanı geliş katındaki Duty Free’den almak ciddi tasarruf sağlar.',
        'Restoranlarda kadeh şarap veya kokteyl siparişleri toplam adisyonu kolayca iki katına çıkarabilir.',
      ],
    },
    sourceLabel: 'Ministry of Culture & Tourism (KTB)',
    sourceUrl: 'https://www.ktb.gov.tr',
  },
  {
    id: 'veg-kids-allergy',
    tone: 'slate',
    eyebrow: {
      ru: 'ВЕГЕТАРИАНЦАМ, ДЕТЯМ И АЛЛЕРГИКАМ',
      en: 'VEGETARIAN, KIDS & ALLERGY NOTES',
      de: 'VEGETARISCH, KINDER & ALLERGIEN',
      tr: 'VEJETARYEN, ÇOCUK VE ALERJİ',
    },
    title: {
      ru: 'Эгейская кухня идеальна без мяса — на что смотреть при заказе',
      en: 'Why Aegean Muğla Excels for Vegetarians, Kids & Nut-Allergy Awareness',
      de: 'Perfekt für Vegetarier & Kinder – plus Hinweise zu Nüssen & Milch',
      tr: 'Vejetaryenler, Çocuklar ve Alerjiler İçin Pratik İpuçları',
    },
    points: {
      ru: [
        'Вегетарианцы и веганы в Мугле в раю: раздел Zeytinyağlılar (блюда на оливковом масле — артишоки, фасоль, Имам Байылды, цветки кабачка, фава, морская спаржа) готовится без мяса и сливочного масла.',
        'Для детей беспроигрышны суп Мерджимек (Mercimek), сырное Пиде (Kaşarlı Pide), котлетки Кёфте без перца (Acısız Köfte) и рис Пилав.',
        'Важно при аллергии: в десертах, мезе и даже кофе Датчи очень часто есть грецкий орех, фисташка, миндаль или кунжут (тахини), а в йогуртовых соусах — молочные продукты.',
        'На 4–6 языках достаточно показать в меню слово «Sadece sebzeli / Etsiz» (только овощи / без мяса) или «Fıstıksız» (без орехов).',
      ],
      en: [
        'Vegetarians & vegans thrive here: dishes labeled "Zeytinyağlılar" (artichokes, stuffed zucchini flowers, İmam Bayıldı, fava, green beans) are cooked purely in cold olive oil with zero meat or butter.',
        'Kid-approved staples: smooth Mercimek lentil soup, cheesy Kaşarlı Pide, mild Köfte meatballs, and buttered Pilav rice.',
        'Allergy heads-up: walnuts, pistachios, Datça almonds, sesame tahini, and strained yogurt appear widely across mezes and desserts.',
        'Helpful phrases: "Etsiz" (meat-free), "Sütsüz" (dairy-free), and "Kuruyemişsiz" (nut-free).',
      ],
      de: [
        'Ideal für Vegetarier & Veganer: Die Kategorie „Zeytinyağlılar“ (Artischocken, İmam Bayıldı, Zucchiniblüten, Fava) wird rein mit Olivenöl ganz ohne Fleisch oder Butter gekocht.',
        'Kinder-Favoriten: milde Linsensuppe (Mercimek), Käse-Pide (Kaşarlı), milde Köfte und Reis.',
        'Allergie-Hinweis: Walnüsse, Pistazien, Mandeln, Sesam-Tahini und Joghurt stecken in vielen Meze und Desserts.',
        'Wichtige Wörter: „Etsiz“ (ohne Fleisch), „Sütsüz“ (ohne Milch), „Fıstıksız / Kuruyemişsiz“ (ohne Nüsse).',
      ],
      tr: [
        'Vejetaryen ve veganlar için cennet: "Zeytinyağlılar" bölümü (enginar, imambayıldı, kabak çiçeği, fava, deniz börülcesi) etsiz ve tereyağsız olarak zeytinyağıyla pişirilir.',
        'Çocuklar için güvenli seçimler: mercimek çorbası, kaşarlı pide, acısız köfte ve tereyağlı pirinç pilavı.',
        'Alerji notu: Ege mezeleri ve tatlılarında ceviz, Antep fıstığı, Datça bademi, tahin (susam) ve süzme yoğurt çok yaygın kullanılır.',
        'Siparişte "Etsiz" (vejetaryen), "Sütsüz" veya "Kuruyemişsiz" ifadelerini kullanabilirsiniz.',
      ],
    },
    sourceLabel: 'TGA · Turkish Cuisine Portal',
    sourceUrl: 'https://www.tga.gov.tr',
  },
];
