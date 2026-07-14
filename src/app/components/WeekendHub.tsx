"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    FaCalendarAlt, 
    FaClock, 
    FaMapMarkerAlt, 
    FaCheckCircle, 
    FaCoins, 
    FaShieldAlt, 
    FaCar, 
    FaUtensils, 
    FaBed, 
    FaCamera, 
    FaChevronRight, 
    FaHeart, 
    FaUsers, 
    FaLeaf, 
    FaExternalLinkAlt 
} from 'react-icons/fa';

export interface TimelineEvent {
    time: string;
    day: 'friday' | 'saturday' | 'sunday';
    title: Record<string, string>;
    desc: Record<string, string>;
    location: Record<string, string>;
    mapsQuery: string;
    iconType: 'food' | 'activity' | 'view' | 'hotel';
}

export interface WeekendItinerary {
    id: string;
    category: 'romantic' | 'family' | 'adventure' | 'boho';
    title: Record<string, string>;
    subtitle: Record<string, string>;
    locationName: Record<string, string>;
    heroImage: string;
    budgetEur: string;
    budgetTl: string;
    highlights: Record<string, string[]>;
    packingChecklist: Record<string, string[]>;
    timeline: TimelineEvent[];
}

const weekendGetaways: WeekendItinerary[] = [
    {
        id: 'kas-boho-romantic',
        category: 'romantic',
        title: {
            ru: 'Каш Богемный: 48 часов романтики, амфор и закатов над Ликией',
            en: 'Bohemian Kaş: 48 Hours of Romance, Amphoras & Lycian Sunsets',
            de: 'Bohemien Kaş: 48 Stunden Romantik, Amphoren & lykische Sonnenuntergänge',
            tr: 'Bohem Kaş: 48 Saatlik Romantizm, Amforalar ve Likya Gün Batımları'
        },
        subtitle: {
            ru: 'От утреннего кофе на старой набережной до морской прогулки к затонувшему городу Кекова и ужина у маяка',
            en: 'From morning espresso on the harbor stones to a boat cruise across sunken Kekova and lighthouse dining',
            de: 'Vom Morgenkaffee am Hafen bis zur Bootsfahrt ins versunkene Kekova und Abendessen am Leuchtturm',
            tr: 'Liman taşlarında sabah kahvesinden batık şehir Kekova tekne turuna ve fenerde romantik akşama'
        },
        locationName: { ru: 'Курорт Каш (Полуостров Чукурбаг)', en: 'Kaş & Çukurbağ Peninsula', de: 'Kaş & Çukurbağ Halbinsel', tr: 'Kaş & Çukurbağ Yarımadası' },
        heroImage: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg',
        budgetEur: '€180 – €260 на двоих',
        budgetTl: '6,500 – 9,500 TL (за 2 суток)',
        highlights: {
            ru: [
                'Встреча заката с вином в античном амфитеатре Antiphellos',
                'Купание в бирюзовой лагуне знаменитого пляжа Капуташ',
                'Приватный катер над античными руинами затонувшего острова Кекова',
                'Дегустация свежайших морепродуктов с видом на греческий остров Мейс'
            ],
            en: [
                'Sunset wine tasting inside the 2,000-year-old Antiphellos Amphitheater',
                'Swimming inside the dramatic turquoise canyon of Kaputaş Beach',
                'Private wooden boat trip above the sunken ruins of Kekova island',
                'Candlelight seafood dinner overlooking the lights of Greek Meis island'
            ],
            de: [
                'Sonnenuntergang mit Wein im 2.000 Jahre alten Amphitheater von Antiphellos',
                'Schwimmen im türkisfarbenen Kanyon des Strandes von Kaputaş',
                'Bootsfahrt über die versunkenen Ruinen der Insel Kekova',
                'Meeresfrüchte-Abendessen mit Blick auf die Lichter der griechischen Insel Meis'
            ],
            tr: [
                '2.000 yıllık Antiphellos Antik Tiyatrosu\'nda gün batımında şarap keyfi',
                'İkonik Kaputaş kanyon plajının turkuaz sularında yüzme molası',
                'Batık şehir Kekova kalıntıları üzerinde ahşap tekne gezisi',
                'Yunanistan\'ın Meis adası ışıklarına karşı romantik deniz mahsülleri akşamı'
            ]
        },
        packingChecklist: {
            ru: [
                'Удобные сандалии для мощеных улочек и каменистых входов в море',
                'Маска и трубка для снорклинга над саркофагами в Кекова',
                'Легкий вечерний палантин или пиджак (вечером у моря бывает бриз)',
                'Заряженный повербанк и 500-1000 TL наличными для парковок и лодочников'
            ],
            en: [
                'Comfortable sandals for cobblestone alleys and rocky swim platforms',
                'Snorkel gear to explore underwater sarcophagi in Kekova',
                'Light evening shawl or jacket (coastal breeze after sunset)',
                'Fully charged powerbank and 500-1000 TL cash for parking and water taxis'
            ],
            de: [
                'Bequeme Sandalen für Kopfsteinpflaster und felsige Badebucht-Einstiege',
                'Schnorchelausrüstung für die antiken Sarkophage in Kekova',
                'Leichter Schal oder Jacke für eine frische Brise am Abend',
                'Powerbank und 500-1000 TL Bargeld für Parkplätze und Bootstaxis'
            ],
            tr: [
                'Arnavut kaldırımlı sokaklar ve kayalık plajlar için rahat sandalet',
                'Kekova\'da su altındaki lahitleri izlemek için şnorkel maskesi',
                'Akşam deniz esintisi için hafif bir şal veya yazlık ceket',
                'Dolu powerbank ve otoparklar/tekneciler için 500-1000 TL nakit'
            ]
        },
        timeline: [
            {
                time: '19:00',
                day: 'friday',
                iconType: 'hotel',
                title: { ru: 'Заселение на полуострове Чукурбаг и приветственный коктейль', en: 'Check-in on Çukurbağ Peninsula & Welcome Cocktail', de: 'Check-in auf der Halbinsel Çukurbağ', tr: 'Çukurbağ Yarımadası Girişi ve Hoş Geldiniz Kokteyli' },
                desc: { ru: 'Размещаемся в бутик-отеле на полуострове Чукурбаг. Отсюда открывается панорамный вид на залив и горы. Выпиваем бокал местного вина или гранатового фреша на террасе при закате.', en: 'Settle into a boutique villa hotel on Çukurbağ Peninsula facing the open Mediterranean. Enjoy a glass of local Aegean wine on your sea-view balcony.', de: 'Ankunft im Boutique-Hotel auf der Halbinsel Çukurbağ mit Blick aufs Meer.', tr: 'Çukurbağ Yarımadası\'nda denize sıfır butik otele yerleşme ve balkonda gün batımına karşı nar suyu/şarap keyfi.' },
                location: { ru: 'Полуостров Чукурбаг, Каш', en: 'Çukurbağ Peninsula, Kaş', de: 'Halbinsel Çukurbağ, Kaş', tr: 'Çukurbağ Yarımadası, Kaş' },
                mapsQuery: 'Cukurbag Peninsula Kas'
            },
            {
                time: '20:30',
                day: 'friday',
                iconType: 'food',
                title: { ru: 'Ужин в портовой таверне со средиземноморскими мезе', en: 'Harbor Tavern Dinner with Aegean Meze Platter', de: 'Abendessen in einer Hafentaverne mit Meze', tr: 'Liman Meyhanesinde Akdeniz Meze Ziyafeti' },
                desc: { ru: 'Спускаемся в центр Каша. Столики стоят прямо на узких улочках под цветущими бугенвиллеями. Заказываем осьминога на гриле, кальмаров и ассорти из 6 холодных мезе с горячим лавашом.', en: 'Head down to the buzzy historic alleyways of Kaş. Tables spill out under bougainvillea blossoms. Order grilled octopus, calamari, and cold meze platter.', de: 'Tische in den historischen Gassen unter Bougainvilleen. Gegrillter Oktopus und frische Meze.', tr: 'Begonviller altındaki tarihi Kaş sokaklarında ızgara ahtapot, kalamar ve meşhur 6\'lı soğuk meze tepsisi eşliğinde akşam yemeği.' },
                location: { ru: 'Улица Узуnчаршы (Uzunçarşı), Каш', en: 'Uzunçarşı Street, Kaş', de: 'Uzunçarşı Straße, Kaş', tr: 'Uzunçarşı Caddesi, Kaş' },
                mapsQuery: 'Uzuncarsi Kas'
            },
            {
                time: '09:00',
                day: 'saturday',
                iconType: 'food',
                title: { ru: 'Турецкий завтрак на скалах в Лиман Агзы или на набережной', en: 'Cliffside Turkish Breakfast overlooking the Harbor', de: 'Türkisches Frühstück mit Blick auf den Hafen', tr: 'Kayalıklar Üzerinde Manzaralı Serpme Kahvaltı' },
                desc: { ru: 'Традиционный деревенский завтрак (`Serpme Kahvaltı`) с домашним козьим сыром, оливками из Датчи, инжирным вареньем, яичницей менемен и безлимитным чаем в тюльпанообразных стаканчиках.', en: 'Feast on a lavish village breakfast (`Serpme Kahvaltı`) featuring goat cheese, Datça olives, fig jam, sizzling menemen eggs, and endless Turkish tea.', de: 'Reichhaltiges Dorf-Frühstück mit Ziegenkäse, Oliven, Menemen und endlosem türkischen Tee.', tr: 'Keçi peyniri, ev yapımı incir reçeli, tereyağlı menemen ve ince belli bardakta sınırsız çay ile serpme köy kahvaltısı.' },
                location: { ru: 'Центральная набережная Каша', en: 'Kaş Central Harbor Promenade', de: 'Hafenpromenade Kaş', tr: 'Kaş Merkez Kordon Meydanı' },
                mapsQuery: 'Kas Kordon Marina'
            },
            {
                time: '11:00',
                day: 'saturday',
                iconType: 'activity',
                title: { ru: 'Морское сафари в затонувший город Кекова и крепость Симена', en: 'Boat Safari to Sunken City Kekova & Simena Castle', de: 'Boots-Safari zur versunkenen Stadt Kekova & Burg Simena', tr: 'Batık Şehir Kekova ve Simena Kalesi Tekne Safarisi' },
                desc: { ru: 'Арендуем деревянную лодочку из порта Учагыз. Плывем над руинами античного города Долихисте, ушедшего под воду следствие землетрясения во II веке. Высаживаемся в деревне Калекёй (Симена), поднимаемся в крепость и пробуем знаменитое домашнее персиковое мороженое из козьего молока.', en: 'Take a private wooden boat from Üçağız harbor across crystal-clear waters right above the ruins of ancient Dolichiste. Climb up to the medieval castle of Simena and taste handmade peach goat-milk ice cream.', de: 'Bootsfahrt über die Ruinen von Dolichiste. Aufstieg zur Burg Simena und hausgemachtes Ziegenmilch-Eis probieren.', tr: 'Üçağız limanından kiralanan ahşap tekneyle II. yy depreminde sulara gömülen Dolichiste kalıntıları üzerinde süzülüş, Simena kalesine tırmanış ve meşhur şeftalili keçi dondurması.' },
                location: { ru: 'Залив Кекова и Калекёй (Симена)', en: 'Kekova Bay & Kaleköy (Simena)', de: 'Kekova-Bucht & Kaleköy (Simena)', tr: 'Kekova Körfezi ve Kaleköy (Simena)' },
                mapsQuery: 'Kekova Simena Kalekoy'
            },
            {
                time: '17:00',
                day: 'saturday',
                iconType: 'view',
                title: { ru: 'Купание на пляже Капуташ в лучах предзакатного солнца', en: 'Golden Hour Swim inside dramatic Kaputaş Beach', de: 'Schwimmen im goldenen Licht am Strand von Kaputaş', tr: 'Gün Batımı Öncesi Altın Saatlerde Kaputaş Plajı Yüzmesi' },
                desc: { ru: 'На обратном пути останавливаемся у знаменитого ущелья Капуташ. В 17:00 жара спадает, а вода в каньоне приобретает невероятно насыщенный неоново-бирюзовый цвет. Спускаемся по 187 ступеням для 40-минутного освежающего заплыва.', en: 'Stop at the world-renowned Kaputaş gorge beach. At 5 PM the midday heat softens, while the water glows an electric turquoise color. Descend the 187 steps for a rejuvenating dip.', de: 'Stopp an der weltberühmten Bucht von Kaputaş. Abstieg über 187 Stufen für eine erfrischende Abkühlung.', tr: 'Dünyaca ünlü Kaputaş kanyon plajı durağı. 17:00 sularında kalabalık azalır ve su turkuazın en canlı tonunu alır. 187 basamaktan inerek serinletici yüzme molası.' },
                location: { ru: 'Пляж Капуташ (трасса D400 Каш-Калкан)', en: 'Kaputaş Beach (D400 Highway)', de: 'Strand Kaputaş (D400)', tr: 'Kaputaş Plajı (D400 Karayolu)' },
                mapsQuery: 'Kaputas Beach Turkey'
            },
            {
                time: '19:30',
                day: 'saturday',
                iconType: 'view',
                title: { ru: 'Закат в античном амфитеатре Antiphellos с видом на море', en: 'Sunset Wine inside Ancient Antiphellos Amphitheater', de: 'Sonnenuntergang im antiken Amphitheater Antiphellos', tr: 'Antiphellos Antik Tiyatrosu\'nda Gün Batımı ve Şarap' },
                desc: { ru: 'Бесплатный античный театр в 5 минутах пешком от центра Каша. Берем с собой бутылочку турецкого вина из Каппадокии или гранатовый сок, садимся на 2,000-летние каменные ступени и смотрим, как солнце садится прямо за горизонт Эгейского моря.', en: 'A well-preserved Hellenistic theater just 5 minutes walk from Kaş center. Bring local wine and sit upon 2,000-year-old stone tiers as the sun dips directly behind the Mediterranean islands.', de: 'Ein gut erhaltenes hellenistisches Theater nur 5 Gehminuten von Kaş entfernt. Sonnenuntergang von 2.000 Jahre alten Stufen erleben.', tr: 'Kaş merkeze 5 dakika yürüyüş mesafesindeki Helenistik tiyatro. 2.000 yıllık taş basamaklara oturup adalar arkasında batan güneşi izleme ritüeli.' },
                location: { ru: 'Амфитеатр Antiphellos, Каш', en: 'Antiphellos Amphitheater, Kaş', de: 'Amphitheater Antiphellos, Kaş', tr: 'Antiphellos Antik Tiyatrosu, Kaş' },
                mapsQuery: 'Antiphellos Ancient Theater Kas'
            },
            {
                time: '10:00',
                day: 'sunday',
                iconType: 'activity',
                title: { ru: 'Пешая прогулка по скалам к ликийским гробницам в Лиман Агзы', en: 'Morning Cliff Walk to Lycian Tombs & Liman Ağzı Cove', de: 'Klippenwanderung zu lykischen Gräbern & Bucht Liman Ağzı', tr: 'Liman Ağzı Kaya Mezarları ve Koyuna Sabah Yürüyüşü' },
                desc: { ru: 'Легкий часовой хайк по тропе над морем. Смотрим высеченные в скале царские гробницы Ликии, спускаемся в пляжные клубы Лиман Агзы, купаемся с морскими черепахами Caretta и возвращаемся в порт на деревянной лодочке-такси.', en: 'An easy 1-hour coastal hike past royal rock-cut sarcophagi. Arrive at the secluded beach clubs of Liman Ağzı, swim alongside sea turtles, and catch a wooden water taxi back across the bay.', de: 'Eine leichte 1-stündige Küstenwanderung zu lykischen Felsengräbern. Schwimmen mit Meeresschildkröten und Bootstaxi-Rückfahrt.', tr: 'Deniz kıyısı boyunca sarp falezlere oyulmuş kral mezarlarını izleyerek 1 saatlik kolay yürüyüş. Liman Ağzı plaj kulüplerinde Caretta kaplumbağalarıyla yüzme ve limana tekneyle dönüş.' },
                location: { ru: 'Бухта Лиман Агзы, Каш', en: 'Liman Ağzı Bay, Kaş', de: 'Bucht Liman Ağzı, Kaş', tr: 'Liman Ağzı Koyu, Kaş' },
                mapsQuery: 'Liman Agzi Bay Kas'
            },
            {
                time: '15:00',
                day: 'sunday',
                iconType: 'food',
                title: { ru: 'Покупка сувениров: керамика, амфоры и оливковое мыло', en: 'Artisan Shopping: Handmade Ceramics, Silver & Olive Soap', de: 'Kunsthandwerk-Shopping: Keramik, Silber & Oliven-Seife', tr: 'Sanat Sokaklarında Alışveriş: Seramik, Gümüş ve Zeytinyağlı Sabun' },
                desc: { ru: 'Улица Узунчаршы славится своими авторскими мастерскими. Никакой китайской штамповки: здесь продаются расписные тарелки в османском стиле, изделия из ликийского кедра и натуральное мыло ручной работы.', en: 'Uzunçarşı alley is renowned for authentic artisan studios. Browse hand-painted Ottoman ceramics, silver jewelry, and fragrant olive oil soaps crafted locally without tourist mass-production.', de: 'Die Gasse Uzunçarşı ist berühmt für authentische Kunsthandwerk-Studios. Handbemalte Keramik und Olivenölseifen.', tr: 'Uzunçarşı sokağındaki el sanatları atölyeleri. Osmanlı desenli el boyaması seramikler, gümüş takılar ve doğal zeytinyağlı sabunlar.' },
                location: { ru: 'Античный саркофаг в центре Каша (Львиная гробница)', en: 'Lion Sarcophagus Street, Kaş', de: 'Löwen-Sarkophag-Straße, Kaş', tr: 'Aslanlı Lahit Sokağı, Kaş' },
                mapsQuery: 'Kas Lion Sarcophagus'
            }
        ]
    },
    {
        id: 'dalyan-eco-family',
        category: 'family',
        title: {
            ru: 'Дальян и Кёйджегиз: 48 часов с черепахами Caretta, термами и качелями над рекой',
            en: 'Dalyan & Köyceğiz: 48 Hours of Caretta Turtles, Mud Baths & River Swings',
            de: 'Dalyan & Köyceğiz: 48 Stunden Schildkröten, Thermalbäder & Flussschaukeln',
            tr: 'Dalyan & Köyceğiz: Caretta Kaplumbağaları, Kaplıcalar ve Yuvarlakçay\'da 48 Saat'
        },
        subtitle: {
            ru: 'Идеальный семейный или оздоровительный уикенд без спешки, утопающий в зелени амбровых лесов',
            en: 'The ultimate relaxed family & wellness getaway surrounded by lush emerald liquidambar forests',
            de: 'Das perfekte Familien- und Wellness-Wochenende inmitten üppiger Wälder',
            tr: 'Sığla ormanlarının yeşilliğinde telaşsız, dinlendirici ve doğa harikası aile/wellness hafta sonu'
        },
        locationName: { ru: 'Дельта Дальян & Озеро Кёйджегиз', en: 'Dalyan Delta & Köyceğiz Lake', de: 'Dalyan-Delta & Köyceğiz-See', tr: 'Dalyan Deltası ve Köyceğiz Gölü' },
        heroImage: '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg',
        budgetEur: '€140 – €210 на семью',
        budgetTl: '5,000 – 7,500 TL (за 2 суток)',
        highlights: {
            ru: [
                'Круиз по тростниковым лабиринтам реки Дальян к пляжу Изтузу',
                'Встреча с гигантскими черепахами Caretta-Caretta в реальной среде',
                'Целебные термальные грязевые ванны Султание под открытым nebom',
                'Полёт на деревянных качелях над ледяной горной рекой Юварлакчай'
            ],
            en: [
                'Riverboat cruise through the labyrinthine reed mazes of Dalyan Delta',
                'Seeing 100 kg Caretta-Caretta sea turtles swimming in the natural wild',
                'Therapeutic sulphur mud baths and thermal pools at Sultaniye Hot Springs',
                'Soaring over the icy turquoise river rapids on Yuvarlakçay wooden swings'
            ],
            de: [
                'Bootsfahrt durch das Schilflabyrinth des Dalyan-Deltas zum Strand İztuzu',
                'Begegnung mit riesigen Caretta-Meeresschildkröten in freier Wildbahn',
                'Heilende Schwefel-Schlammbäder in Sultaniye unter freiem Himmel',
                'Schaukeln über den eiskalten Stromschnellen des Flusses Yuvarlakçay'
            ],
            tr: [
                'Dalyan nehrinin sazlık labirentleri arasından İztuzu plajına tekne turu',
                'Dev Caretta-Caretta deniz kaplumbağalarını doğal ortamlarında izleme',
                'Sultaniye kaplıcalarında açık havada kükürtlü çamur banyoları şifası',
                'Yuvarlakçay\'ın buz gibi turkuaz dağ suları üzerinde ahşap salıncak keyfi'
            ]
        },
        packingChecklist: {
            ru: [
                'Темные veya старые купальники для грязевых ванн Султание (сера может окрасить светлую ткань)',
                'Головной убор и детский солнцезащитный крем SPF 50+',
                'Средство от комаров (вечером у пресного озера могут появляться насекомые)',
                'Полотенца и сменная сухая одежда после купания в ледяном Юварлакчае'
            ],
            en: [
                'Dark/older swimwear for Sultaniye mud baths (sulphur can discolour white fabrics)',
                'Sun hat and high SPF kids sunscreen for the open riverboat deck',
                'Mosquito repellent (freshwater lake evenings can attract insects)',
                'Warm dry change of clothes after swimming in the freezing Yuvarlakçay mountain river'
            ],
            de: [
                'Dunkle Badesachen für die Schlammbäder in Sultaniye (Schwefel verfärbt)',
                'Sonnenhut und Kinder-Sonnencreme SPF 50+',
                'Mückenschutz für die Abende am Süßwassersee',
                'Wechselkleidung nach dem Schwimmen im eiskalten Fluss Yuvarlakçay'
            ],
            tr: [
                'Sultaniye çamur banyoları için koyu renkli veya eski mayo (kükürt beyaz kumaşı boyayabilir)',
                'Tekne güvertesi için geniş şapka ve çocuklar için SPF 50+ güneş kremi',
                'Tatlı su gölü kıyısında akşam saatleri için sivrisinek kovucu sprey',
                'Buz gibi Yuvarlakçay yüzmesi sonrası kurulanmak için yedek kuru kıyafet'
            ]
        },
        timeline: [
            {
                time: '18:30',
                day: 'friday',
                iconType: 'view',
                title: { ru: 'Прогулка по набережной Кёйджегиза и ужин у озера', en: 'Köyceğiz Lake Boardwalk Promenade & Sunset Dinner', de: 'Köyceğiz See-Promenade & Abendessen zum Sonnenuntergang', tr: 'Köyceğiz Gölü Kordon Yürüyüşü ve Göl Kıyısı Akşam Yemeği' },
                desc: { ru: 'Размещаемся в спокойном семейном пансионе в Кёйджегизе. Идем гулять по километровой деревянной набережной под вековыми амбровыми деревьями. Ужинаем свежей озерной кефалью в ресторане прямо над водой.', en: 'Arrive at a quiet family guesthouse in Köyceğiz. Walk along the tranquil 1-km wooden boardwalk beneath soaring liquidambar trees. Enjoy fresh grilled lake mullet overlooking silent waters.', de: 'Ankunft in einem ruhigen Familien-Gästehaus. Spaziergang auf dem Holzsteg unter Amberbäumen. Frische Seemeeräsche zum Abendessen.', tr: 'Köyceğiz\'de sakin bir aile pansiyonuna yerleşme. Asırlık sığla ağaçları altındaki 1 km\'lik ahşap kordonda yürüyüş ve göl kıyısında ızgara kefal akşamı.' },
                location: { ru: 'Набережная озера Кёйджегиз', en: 'Köyceğiz Lake Promenade', de: 'Seepromenade Köyceğiz', tr: 'Köyceğiz Gölü Kordonu' },
                mapsQuery: 'Koycegiz Lake Promenade'
            },
            {
                time: '09:30',
                day: 'saturday',
                iconType: 'activity',
                title: { ru: 'Речное сафари на лодке мимо Ликийских гробниц Кавна', en: 'Riverboat Safari past Kaunos Royal Lycian Tombs', de: 'Flussboot-Safari zu den Felsengräbern von Kaunos', tr: 'Kaunos Kral Mezarları Eşliğinde Nehir Tekne Safarisi' },
                desc: { ru: 'Садимся на традиционную деревянную лодку (`Piyade`) на причале Дальяна. Лодка петляет между зелеными стенами камыша. С воды открывается лучший вид на 2,400-летние гробницы ликийских царей, высеченные в отвесной 100-метровой скале.', en: 'Board a traditional shallow-draft boat (`Piyade`) at Dalyan harbor. Gliding through emerald reed channels, marvel at the 2,400-year-old Lycian King Tombs carved high into towering sandstone cliffs.', de: 'Fahrt mit dem traditionellen Holzboot durch Schilfkanäle zu den 2.400 Jahre alten Felsengräbern von Kaunos.', tr: 'Dalyan iskelesinden geleneksel piyade teknesine biniş. Sazlık labirentler arasından süzülerek sarp kayalara oyulmuş 2.400 yıllık Kaunos Kral Mezarları\'nı izleme.' },
                location: { ru: 'Река Дальян и античный Каун (Kaunos)', en: 'Dalyan River & Ancient Kaunos', de: 'Dalyan-Fluss & Antikes Kaunos', tr: 'Dalyan Nehri ve Kaunos Antik Kenti' },
                mapsQuery: 'Kaunos Lycian Tombs Dalyan'
            },
            {
                time: '11:30',
                day: 'saturday',
                iconType: 'activity',
                title: { ru: 'Лечебные грязи и сероводородные термы Султание', en: 'Sultaniye Thermal Springs & Sulphur Mud Baths', de: 'Sultaniye Thermalquellen & Schwefel-Schlammbäder', tr: 'Sultaniye Kaplıcaları ve Şifalı Çamur Banyoları' },
                desc: { ru: 'Причаливаем к древним термальным бассейнам Султание. Намазываемся лечебной минеральной глиной от макушки до пят, сушимся на солнце, смываем глину в озере и расслабляемся в горячих (+40°C) сероводородных ваннах.', en: 'Dock at the ancient Sultaniye thermal compound. Cover yourselves in rich mineral grey clay from head to toe, bake in the sun until tight, wash off in the lake, and soak in +40°C therapeutic sulfur pools.', de: 'Ankunft in den Thermalbädern von Sultaniye. Schlammpackung von Kopf bis Fuß, abwaschen im See und baden im +40°C heißen Schwefelbecken.', tr: 'Antik Sultaniye kaplıcalarına yanaşma. Baştan ayağa şifalı mineral çamuruna bulanma, güneşte kuruma ve ardından +40°C kükürtlü termal havuzlarda yenilenme.' },
                location: { ru: 'Термальные источники Султание (Sultaniye Kaplıcaları)', en: 'Sultaniye Hot Springs', de: 'Sultaniye Thermalbäder', tr: 'Sultaniye Kaplıcaları' },
                mapsQuery: 'Sultaniye Hot Springs Koycegiz'
            },
            {
                time: '14:00',
                day: 'saturday',
                iconType: 'view',
                title: { ru: 'Пляж Изтузу и черепаший госпиталь DEKAMER', en: 'İztuzu Turtle Beach & DEKAMER Sea Turtle Hospital', de: 'İztuzu Schildkrötenstrand & DEKAMER Rettungsstation', tr: 'İztuzu Kaplumbağa Plajı ve DEKAMER Rehabilitasyon Merkezi' },
                desc: { ru: 'Лодка выходит к 5-километровой песчаной косе Изтузу, разделяющей пресную реку и соленое Средиземное море. Купаемся, а затем посещаем госпиталь DEKAMER, где волонтеры лечат раненых морских черепашек перед выпуском на волю.', en: 'Arrive at the protected 5-km golden sandspit dividing the freshwater river from the Aegean Sea. After swimming, visit DEKAMER conservation clinic where biologists rehabilitate injured Caretta turtles.', de: 'Ankunft an der 5 km langen Sandzunge İztuzu. Baden und Besuch der DEKAMER-Station zur Rettung verletzter Meeresschildkröten.', tr: 'Tatlı nehir ile tuzlu Akdeniz\'i ayıran 5 km\'lik altın kumlu İztuzu plajına varış. Yüzme molası sonrası yaralı deniz kaplumbağalarının tedavi edildiği DEKAMER hastanesini ziyaret.' },
                location: { ru: 'Пляж Изтузу, Дальян', en: 'İztuzu Beach, Dalyan', de: 'Strand İztuzu, Dalyan', tr: 'İztuzu Plajı, Dalyan' },
                mapsQuery: 'Iztuzu Beach Dalyan'
            },
            {
                time: '10:30',
                day: 'sunday',
                iconType: 'food',
                title: { ru: 'Завтрак на реке Юварлакчай и качели над водопадом', en: 'Yuvarlakçay River Breakfast & Over-Water Swings', de: 'Frühstück am Yuvarlakçay & Schaukeln über dem Wasserfall', tr: 'Yuvarlakçay\'da Su Üstü Kahvaltı ve Salıncak Keyfi' },
                desc: { ru: 'Едем в горное ущелье Юварлакчай (15 минут от Кёйджегиза). Садимся в деревянном ресторане на помостах над ледяной бурлящей рекой. Дети (и взрослые!) качаются на огромных качелях, касаясь ногами бирюзовой воды.', en: 'Drive into the shaded Yuvarlakçay mountain canyon (15 mins from Köyceğiz). Sit at wooden platforms built right over rushing glacial currents. Swing on giant wooden swings dipping your toes into freezing waters.', de: 'Fahrt in die schattige Schlucht des Yuvarlakçay. Frühstück auf Holzstegen über dem Wasser und Schaukeln über den eiskalten Stromschnellen.', tr: 'Köyceğiz\'e 15 dakika mesafedeki gölgeli Yuvarlakçay kanyonuna sürüş. Gürül gürül akan buz gibi su üzerindeki köşklerde kahvaltı ve turkuaz suya dokunan dev salıncaklarda uçuş.' },
                location: { ru: 'Ущелье Юварлакчай (Ресторан Yeşil Vadi / Defne)', en: 'Yuvarlakçay Canyon Restaurants', de: 'Yuvarlakçay Schlucht-Restaurants', tr: 'Yuvarlakçay Kanyon Lokantaları' },
                mapsQuery: 'Yuvarlakcay Koycegiz Turkey'
            },
            {
                time: '15:00',
                day: 'sunday',
                iconType: 'view',
                title: { ru: 'Панорама с горы Радар (Radar Tepesi) и прощание с дельтой', en: 'Radar Hill (`Radar Tepesi`) Panoramic Viewpoint Overlook', de: 'Panoramablick vom Radar-Hügel (Radar Tepesi)', tr: 'Radar Tepesi Panaromik Seyir Noktası ve Deltaya Veda' },
                desc: { ru: 'Финальный аккорд уикенда: поднимаемся на смотровую площадку над Дальяном. Вся дельта, петляющая как змея среди зеленых камышей к пляжу Изтузу, видна как на ладони. Делаем лучшие семейные фотографии тура.', en: 'The breathtaking finale: ascend to the elevated overlook above Dalyan. See the entire emerald delta winding like a ribbon through vast marshlands out to İztuzu spith. Capture the finest family photos of your trip.', de: 'Das Finale: Aufstieg zum Aussichtspunkt über Dalyan. Das gesamte Delta liegt Ihnen wie auf einer Landkarte zu Füßen.', tr: 'Hafta sonunun muhteşem kapanışı: Dalyan üzerindeki seyir tepesine tırmanış. Sazlıklar arasında kıvrılarak Akdeniz\'e ulaşan tüm deltanın kartpostallık panaromasında aile fotoğrafları.' },
                location: { ru: 'Смотровая площадка Радар Тепеси, Дальян', en: 'Radar Tepesi Viewpoint, Dalyan', de: 'Aussichtspunkt Radar Tepesi, Dalyan', tr: 'Radar Tepesi Seyir Noktası, Dalyan' },
                mapsQuery: 'Radar Tepesi Dalyan'
            }
        ]
    },
    {
        id: 'fethiye-oludeniz-adventure',
        category: 'adventure',
        title: {
            ru: 'Фетхие & Олюдениз: 48 часов адреналина, полетов над лагуной и ледяных каньонов',
            en: 'Fethiye & Ölüdeniz: 48 Hours of Paragliding Adrenaline, Ghost Towns & Canyons',
            de: 'Fethiye & Ölüdeniz: 48 Stunden Paragliding-Adrenalin, Geisterdörfer & Kanyons',
            tr: 'Fethiye & Ölüdeniz: Babadağ Yamaç Paraşütü, Hayalet Şehir ve Kanyonlarda 48 Saat'
        },
        subtitle: {
            ru: 'Параплан с горы Бабадаг (2,000м), треккинг через город-призрак Каякёй и экспедиция в ущелье Саклыкент',
            en: 'Paragliding off 2,000m Mount Babadağ, hiking Kayaköy ghost village, and wading Saklıkent gorge',
            de: 'Paragliding vom 2.000m hohen Babadağ, Wandern durch Kayaköy und Waten im Saklıkent-Kanyon',
            tr: '2.000m Babadağ\'dan yamaç paraşütü, Kayaköy hayalet şehri yürüyüşü ve Saklıkent Kanyonu seferi'
        },
        locationName: { ru: 'Олюдениз, Каякёй & Саклыкент', en: 'Ölüdeniz, Kayaköy & Saklıkent Gorge', de: 'Ölüdeniz, Kayaköy & Saklıkent-Schlucht', tr: 'Ölüdeniz, Kayaköy ve Saklıkent Kanyonu' },
        heroImage: '/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg',
        budgetEur: '€220 – €320 на двоих (включая полет на параплане)',
        budgetTl: '8,000 – 11,500 TL (за 2 суток с активностями)',
        highlights: {
            ru: [
                'Тандемный полет на параплане с горы Бабадаг прямо на пляж Белчекиз',
                'Фотосессия среди 3,000 заброшенных каменных домов города-призрака Каякёй',
                'Проход вброд по руслу ледяной горной реки внутри 300-метрового каньона Саклыкент',
                'Ужин свежевыловленной форелью на водопадах Яка Парк'
            ],
            en: [
                'Tandem paragliding flight launching at 2,000m and landing right on Belcekiz beach',
                'Exploring the haunting ruins of 3,000 abandoned stone houses in Kayaköy ghost town',
                'Wading through freezing river rapids inside the 300m vertical Saklıkent Canyon',
                'Fresh grilled trout dinner served on platforms built right over mountain waterfalls'
            ],
            de: [
                'Tandem-Paragliding-Flug vom 2.000m hohen Babadağ mit Landung am Strand Belcekiz',
                'Erkundung der Ruinen von 3.000 verlassenen Steinhäusern im Geisterdorf Kayaköy',
                'Waten durch eiskalte Stromschnellen in der 300m tiefen Saklıkent-Schlucht',
                'Frische Forelle auf Holzstegen direkt über Wasserfällen im Yaka Park'
            ],
            tr: [
                '2.000 metre rakımlı Babadağ\'dan tandem yamaç paraşütüyle Belcekiz sahiline iniş',
                '3.000 terk edilmiş taş evin mistik atmosferinde Kayaköy hayalet şehri keşfi',
                '300 metre dik kayalıklar arasındaki Saklıkent Kanyonu\'nda buzlu suda yürüyüş',
                'Yaka Park şelalelerinde akan suların üzerindeki köşklerde taze kiremitte alabalık'
            ]
        },
        packingChecklist: {
            ru: [
                'Кроссовки на шнуровке (обязательны для взлета на параплане, в сандалиях не пустят!)',
                'Резиновые аквашузы для похода по камням в ущелье Саклыкент',
                'Герметичный чехол для смартфона (в каньоне вас могут обдать брызгами)',
                'Солнцезащитные очки и ветровка для горной вершины Бабадаг (+15°C на старте)'
            ],
            en: [
                'Laced running sneakers (strictly mandatory for paragliding takeoff, no open sandals!)',
                'Rubber water booties for wading over submerged rocks inside Saklıkent Canyon',
                'Waterproof phone pouch (river spray and deep wades occur inside the gorge)',
                'Windbreaker jacket and sunglasses for 2,000m Mount Babadağ summit (+15°C cooler)'
            ],
            de: [
                'Turnschuhe mit Schnürung (zwingend erforderlich für den Paragliding-Start!)',
                'Gummierte Aquaschuhe für das Waten auf felsigem Grund in Saklıkent',
                'Wasserdichte Handyhülle für die Flussschlucht',
                'Windjacke und Sonnenbrille für den 2.000m hohen Gipfel des Babadağ'
            ],
            tr: [
                'Bağcık ve kaymaz tabanlı spor ayakkabı (yamaç paraşütü kalkışı için zorunludur, sandalet alınmaz!)',
                'Saklıkent Kanyonu taşlarında kaymamak için lastik deniz/vadi ayakkabısı',
                'Kanyon içindeki su sıçramalarına karşı telefon için su geçirmez kılıf',
                '2.000 metre zirvesinde serin hava için rüzgarlık mont ve güneş gözlüğü'
            ]
        },
        timeline: [
            {
                time: '19:00',
                day: 'friday',
                iconType: 'food',
                title: { ru: 'Ужин на Рыбном рынке Фетхие (Balık Pazarı)', en: 'Fethiye Fish Market (`Balık Pazarı`) Seafood Feast', de: 'Abendessen auf dem Fischmarkt von Fethiye (Balık Pazarı)', tr: 'Fethiye Balık Pazarı\'nda Deniz Mahsülleri Şöleni' },
                desc: { ru: 'Заселяемся в Олюденизе или Фетхие. Вечером идем на культовый Рыбный рынок. Выбираем свежевыловленного сибаса, королевских креветок или кальмаров прямо на ледяном прилавке, и соседний ресторан готовит это для нас за 100 TL.', en: 'Check in near Oludeniz. Spend the evening at the lively circular Fethiye Fish Market. Pick fresh Aegean sea bass, tiger prawns, or octopus from the center ice stalls, and surrounding taverns grill it for ~100 TL.', de: 'Abendessen auf dem lebhaften Fischmarkt. Frischen Fisch vom Eisstand auswählen und direkt in den umliegenden Tavernen grillen lassen.', tr: 'Ölüdeniz veya Fethiye\'ye yerleşme. Akşam canlı atmosferiyle ünlü dairesel Balık Pazarı\'na gidip orta tezgahlardan taze levrek, karides veya kalamar seçme ve etraftaki restoranlarda pişirtme.' },
                location: { ru: 'Рыбный рынок Фетхие, Центр', en: 'Fethiye Fish Market, Center', de: 'Fischmarkt Fethiye, Zentrum', tr: 'Fethiye Balık Pazarı, Merkez' },
                mapsQuery: 'Fethiye Balik Pazari'
            },
            {
                time: '09:00',
                day: 'saturday',
                iconType: 'activity',
                title: { ru: 'Полет на параплане с горы Бабадаг над Голубой лагуной', en: 'Tandem Paragliding Flight off Mount Babadağ', de: 'Tandem-Paragliding-Flug vom Babadağ über der Lagune', tr: 'Babadağ 2.000 Metre Zirvesinden Tandem Yamaç Paraşütü' },
                desc: { ru: 'Главное приключение жизни! Поднимаемся по канатной дороге (`Teleferik`) на высоту 1,700–2,000 метров. Вместе с сертифицированным пилотом делаем три шага и парим 30 минут над бирюзовой лагуной Олюдениза, приземляясь на пляж Белчекиз.', en: 'The ultimate bucket-list thrill! Ride the modern cable car (`Teleferik`) to the 1,700-2,000m launchpad. Harnessed to a certified master pilot, take three steps into the sky and soar for 30 minutes over the turquoise Blue Lagoon before landing smoothly on Belcekiz beach.', de: 'Auffahrt mit der Seilbahn auf 2.000m. Tandemflug über die türkisfarbene Blaue Lagune mit Landung direkt am Strand.', tr: 'Hayatın en büyük heyecanı! Teleferik ile 1.700-2.000 metre kalkış pistine çıkış. Lisanslı pilot eşliğinde gökyüzüne üç adım atarak Ölüdeniz Mavi Lagünü üzerinde 30 dakika süzülme ve Belcekiz kumsalına iniş.' },
                location: { ru: 'Гора Бабадаг / Пляж Олюдениз', en: 'Mount Babadağ / Ölüdeniz Beach', de: 'Babadağ / Ölüdeniz Strand', tr: 'Babadağ Teleferik ve Ölüdeniz Sahili' },
                mapsQuery: 'Babadag Teleferik Oludeniz'
            },
            {
                time: '14:00',
                day: 'saturday',
                iconType: 'activity',
                title: { ru: 'Экспедиция по городу-призраку Каякёй и часовня на холме', en: 'Exploring Kayaköy Ghost Town & Hilltop Chapel', de: 'Erkundung des Geisterdorfs Kayaköy & Bergkapelle', tr: 'Kayaköy Hayalet Şehri ve Tepe Şapeli Keşfi' },
                desc: { ru: 'Едем в Каякёй (15 минут от Олюдениза). Бродим по пустынным каменным улицам, покинутым в 1923 году в ходе обмена населением. Поднимаемся к верхней часовне `Taş Kilise`, откуда видна панорама долины и море.', en: 'Drive to Kayaköy (15 mins from Oludeniz). Wander the silent, haunting stone streets abandoned during the 1923 population exchange. Climb up to the `Taş Kilise` hilltop chapel for panoramic views over the valley.', de: 'Spaziergang durch die stillen Gassen von Kayaköy (verlassen 1923). Aufstieg zur Felsenkapelle mit Blick über das Tal.', tr: 'Ölüdeniz\'e 15 dakika mesafedeki Kayaköy\'e geçiş. 1923 mübadelesinde boşaltılan 3.000 taş evin sessiz sokaklarında yürüyüş ve vadinin tepesindeki Taş Kilise şapeline tırmanış.' },
                location: { ru: 'Город-призрак Каякёй (Kayaköy)', en: 'Kayaköy Ghost Town (`Livissi`)', de: 'Geisterdorf Kayaköy (Livissi)', tr: 'Kayaköy Hayalet Şehri (Livissi)' },
                mapsQuery: 'Kayakoy Ghost Village Turkey'
            },
            {
                time: '18:00',
                day: 'saturday',
                iconType: 'view',
                title: { ru: 'Встреча заката над обрывом Долины Бабочек (Фаралья)', en: 'Sunset Overlook above Butterfly Valley (`Faralya`)', de: 'Sonnenuntergang am Abgrund des Schmetterlingstales', tr: 'Kelebekler Vadisi Uçurumunda Gün Batımı Manzarası (Faralya)' },
                desc: { ru: 'Едем по панорамному серпантину в горную деревню Фаралья. Останавливаемся на смотровой площадке прямо над 350-метровым обрывом Долины Бабочек. Пьем турецкий кофе и смотрим, как солнце садится в море между двух скал.', en: 'Drive along the winding coastal road to high Faralya village. Stand on the safe overlook directly above the 350-meter vertical canyon of Butterfly Valley. Sip Turkish coffee as the sun drops right between the cliff walls.', de: 'Fahrt auf der Panoramastraße nach Faralya. Aussichtspunkt direkt über dem 350 Meter tiefen Schmetterlingstal zum Sonnenuntergang.', tr: 'Virajlı sahil manzaralarından yüksekteki Faralya köyüne sürüş. Kelebekler Vadisi\'nin 350 metrelik sarp uçurumlarına tepeden bakan seyir noktasında Türk kahvesi eşliğinde eşsiz gün batımı.' },
                location: { ru: 'Смотровая площадка Долины Бабочек, Фаралья', en: 'Butterfly Valley Overlook, Faralya', de: 'Aussichtspunkt Schmetterlingstal, Faralya', tr: 'Kelebekler Vadisi Seyir Noktası, Faralya' },
                mapsQuery: 'Butterfly Valley Viewpoint Faralya'
            },
            {
                time: '10:00',
                day: 'sunday',
                iconType: 'activity',
                title: { ru: 'Водный каньонинг внутри ущелья Саклыкент', en: 'Ice-Water Wading Canyon Adventure inside Saklıkent', de: 'Canyoning-Abenteuer im Eiswasser der Saklıkent-Schlucht', tr: 'Saklıkent Kanyonu\'nda Buz Sularında Kanyon Yürüyüşü' },
                desc: { ru: 'Едем в национальный парк Саклыкент. Надеваем резиновые аквашузы и идем вброд по руслу ледяной реки (+8°C) между отвесными 300-метровыми скалами. Мажемся целебной серой глиной прямо со стен каньона.', en: 'Arrive at Saklıkent National Park. Strap on rubber water shoes and wade straight across rushing glacial river currents (+8°C) between 300-meter vertical canyon walls. Apply mineral grey clay from the canyon rocks.', de: 'Ankunft im Nationalpark Saklıkent. Waten im +8°C kalten Gletscherwasser zwischen 300 Meter hohen Felswänden.', tr: 'Saklıkent Milli Parkı\'na varış. Lastik deniz ayakkabılarını giyip 300 metre yüksekliğindeki sarp kanyon duvarları arasında +8°C buzul dağ suyunda yürüyüş ve doğal kil maskesi.' },
                location: { ru: 'Национальный парк Саклыкент (Saklıkent Milli Parkı)', en: 'Saklıkent National Park', de: 'Nationalpark Saklıkent', tr: 'Saklıkent Milli Parkı' },
                mapsQuery: 'Saklikent National Park Turkey'
            },
            {
                time: '14:30',
                day: 'sunday',
                iconType: 'food',
                title: { ru: 'Обед свежей форелью на водопадах Яка Парк (Yaka Park)', en: 'Waterfall Trout Lunch inside Lush Yaka Park', de: 'Forellen-Mittagessen an den Wasserfällen im Yaka Park', tr: 'Yaka Park Şelalelerinde Kiremitte Alabalık Ziyafeti' },
                desc: { ru: 'После каньона поднимаемся в горы к ресторанному комплексу Яка Парк. Здесь ледяная вода течет прямо по желобам в барной стойке и столах! Заказываем запеченную форель (`Kiremitte Alabalık`) и домашний гранатовый сок.', en: 'After the canyon, head up into the cooling mountains to rustic Yaka Park. Here, icy spring water rushes across stone channels right through the bar counters and dining tables! Feast on clay-pot trout and fresh pomegranate juice.', de: 'Nach der Schlucht hinauf in den kühlen Yaka Park. Hier fließt eiskaltes Quellwasser direkt durch die Tische im Restaurant. Frische Forelle genießen.', tr: 'Kanyon sonrası serin dağ havada Yaka Park lokantalarına tırmanış. Buz gibi suların bar tezgahı ve masaların ortasından aktığı otantik ortamda kiremitte fırınlanmış alabalık ve taze nar suyu.' },
                location: { ru: 'Яка Парк, Тлос / Каш-Фетхие', en: 'Yaka Park, near Tlos Ruins', de: 'Yaka Park, bei den Ruinen von Tlos', tr: 'Yaka Park, Tlos Ören Yeri Yanı' },
                mapsQuery: 'Yaka Park Restaurant Fethiye'
            }
        ]
    },
    {
        id: 'datca-aegean-roadtrip',
        category: 'boho',
        title: {
            ru: 'Датча Эгейская: 48 часов среди миндаля, каменных мельниц и двух морей в Книдосе',
            en: 'Aegean Datça: 48 Hours of Almond Groves, Stone Windmills & Two Seas at Knidos',
            de: 'Ägäische Datça: 48 Stunden Mandelgärten, Windmühlen & zwei Meere in Knidos',
            tr: 'Ege Datça: Badem Bahçeleri, Taş Değirmenler ve Knidos\'ta İki Denizin Birleştiği 48 Saat'
        },
        subtitle: {
            ru: 'Античный роуд-трип от поэтических улочек Старой Датчи до маяка, где Эгейское море сливается со Средиземным',
            en: 'An authentic road trip from the poetic stone alleys of Old Datça to the lighthouse where the Aegean meets the Mediterranean',
            de: 'Ein authentischer Roadtrip von den Gassen Alt-Datças zum Leuchtturm, wo die Ägäis auf das Mittelmeer trifft',
            tr: 'Eski Datça\'nın şiirsel taş sokaklarından Ege ile Akdeniz\'in birleştiği Knidos fenerine uzanan butik yolculuk'
        },
        locationName: { ru: 'Полуостров Датча & Книдос', en: 'Datça Peninsula & Knidos Cape', de: 'Halbinsel Datça & Kap Knidos', tr: 'Datça Yarımadası ve Knidos Burnu' },
        heroImage: '/api/images/locations/dacha/ruine/knidos/knidos.jpg',
        budgetEur: '€160 – €240 на двоих',
        budgetTl: '5,800 – 8,500 TL (за 2 суток)',
        highlights: {
            ru: [
                'Прогулка по мощеным улочкам Старой Датчи среди бугенвиллей и каменных домов',
                'Фотосессия у исторических каменных ветряных мельниц Кызлан (XIX век)',
                'Купание в кристальной бирюзовой бухте Паламутбюкю с видом на острова',
                'Встреча заката у маяка и храма Афродиты в античном Книдосе'
            ],
            en: [
                'Strolling the historic bougainvillea-covered cobblestone alleys of Old Datça',
                'Photo session around the iconic 19th-century stone windmills of Kızlan',
                'Swimming in the crystal-clear turquoise pebble waters of Palamutbükü Bay',
                'Experiencing sunset at the Aphrodite Temple & lighthouse in ancient Knidos'
            ],
            de: [
                'Spaziergang durch die blumenumrankten Gassen von Alt-Datça',
                'Foto-Stopp an den historischen steinernen Windmühlen von Kızlan (19. Jh.)',
                'Schwimmen im kristallklaren türkisfarbenen Wasser der Bucht Palamutbükü',
                'Sonnenuntergang am Aphrodite-Tempel und Leuchtturm im antiken Knidos'
            ],
            tr: [
                'Eski Datça\'nın begonvillerle kaplı Arnavut kaldırımlı taş sokaklarında yürüyüş',
                '19. yüzyıldan kalma tarihi Kızlan yel değirmenlerinde unutulmaz fotoğraf molası',
                'Palamutbükü\'nün akvaryum netliğindeki turkuaz sularında yüzme keyfi',
                'Antik Knidos kenti Afrodit Tapınağı ve fenerinde eşsiz gün batımı ritüeli'
            ]
        },
        packingChecklist: {
            ru: [
                'Очки от солнца и легкая шляпа (на мысе Книдос летом много солнца и ветра)',
                'Аквашузы для галечных пляжей Паламутбюкю и Овабюкю',
                'Наличные лиры для покупки домашнего миндального печенья и оливкового масла у фермеров',
                'Камера или смартфон для снимков ветряных мельниц на закате'
            ],
            en: [
                'Sunglasses and secure sun hat (Knidos cape gets plentiful sun and Aegean breezes)',
                'Aqua booties for smooth white pebble beaches in Palamutbükü and Ovabükü',
                'Turkish Lira cash to purchase handmade almond cookies and extra virgin olive oil from farmers',
                'Camera or smartphone for iconic golden hour windmill photos'
            ],
            de: [
                'Sonnenbrille und Hut (auf dem Kap Knidos scheint viel Sonne bei einer frischen Brise)',
                'Badeschuhe für die Kieselstrände in Palamutbükü und Ovabükü',
                'Bargeld in Lira für hausgemachte Mandelkekse und Olivenöl von Bauern',
                'Kamera für malerische Fotos der Windmühlen zum Sonnenuntergang'
            ],
            tr: [
                'Güneş gözlüğü ve şapka (Knidos burnu açık arazidir ve bol Ege rüzgarı alır)',
                'Palamutbükü ve Ovabükü\'nün beyaz çakıllı koyları için deniz ayakkabısı',
                'Köylülerden ev yapımı badem ezmesi ve sızma zeytinyağı almak için TL nakit',
                'Gün batımında yel değirmenlerinin muhteşem karelerini yakalamak için kamera'
            ]
        },
        timeline: [
            {
                time: '18:00',
                day: 'friday',
                iconType: 'view',
                title: { ru: 'Улочки Старой Датчи (Eski Datça) и бокал местного вина', en: 'Old Datça (`Eski Datça`) Alleys & Local Vineyard Wine Tasting', de: 'Gassen von Alt-Datça (Eski Datça) & Weinprobe', tr: 'Eski Datça Sokaklarında Akşam Yürüyüşü ve Yerel Şarap Keyfi' },
                desc: { ru: 'Заселяемся на полуострове. Вечером едем в атмосферную Старую Датчу. Каменные дома здесь отреставрированы с любовью, а улицы носят имена поэтов. Садимся в винном баре под деревом бугенвиллеи и дегустируем эгейские вина из сорта Карасакыз.', en: 'Arrive on the peninsula. Spend your first evening in enchanting Old Datça (`Eski Datça`). The stone houses here are beautifully preserved. Sit at a garden courtyard bar under flowering vines and sample boutique Aegean wines.', de: 'Ankunft auf der Halbinsel. Abendspaziergang durch das zauberhafte Alt-Datça. Weinprobe im Innenhof unter blühenden Bougainvilleen.', tr: 'Yarımadaya varış. Akşamı begonvilli taş evleri ve sanat atölyeleriyle ünlü Eski Datça\'da geçirme. Avlulu bir şarap evinde yerel Karasakız üzümünden yapılan Ege şaraplarının tadımı.' },
                location: { ru: 'Старая Датча (улица Джана Юджеля)', en: 'Old Datça (`Can Yücel Sokak`)', de: 'Alt-Datça (Can Yücel Straße)', tr: 'Eski Datça (Can Yücel Sokağı)' },
                mapsQuery: 'Eski Datca Can Yucel Sokak'
            },
            {
                time: '10:00',
                day: 'saturday',
                iconType: 'view',
                title: { ru: 'Ветряные мельницы Кызлан (Kızlan Değirmenleri)', en: 'Historic Stone Windmills of Kızlan', de: 'Historische Windmühlen von Kızlan', tr: 'Tarihi Kızlan Yel Değirmenleri Fotoğraf Molası' },
                desc: { ru: 'Останавливаемся у 6 старинных каменных ветряных мельниц XIX века, стоящих в ряд на вершине холма. Одна из мельниц отреставрирована и превращена в уютное кафе, где подают чай и традиционную выпечку с миндалем.', en: 'Stop beside 6 historic 19th-century stone windmills standing proudly in a row along a ridge. One windmill has been beautifully restored as a cozy cafe serving morning tea and freshly baked almond pastries.', de: 'Stopp an den 6 historischen Windmühlen aus dem 19. Jahrhundert auf einem Hügel. Eine davon beherbergt ein gemütliches Café mit Mandelgebäck.', tr: 'Sırt üzerinde yan yana dizilmiş 19. yüzyıldan kalma 6 tarihi taş yel değirmeninde duraklama. Restore edilmiş değirmen kafede sabah çayı ve bademli kurabiye.' },
                location: { ru: 'Деревня Кызлан, Датча', en: 'Kızlan Village, Datça', de: 'Dorf Kızlan, Datça', tr: 'Kızlan Köyü Yel Değirmenleri, Datça' },
                mapsQuery: 'Kizlan Windmills Datca'
            },
            {
                time: '13:00',
                day: 'saturday',
                iconType: 'activity',
                title: { ru: 'Бирюзовые бухты Паламутбюкю и Овабюкю', en: 'Turquoise Swimming at Palamutbükü & Ovabükü Bays', de: 'Türkisfarbenes Badeparadies in Palamutbükü & Ovabükü', tr: 'Palamutbükü ve Ovabükü Koylarında Akvaryum Yüzmesi' },
                desc: { ru: 'Едем по живописной дороге вдоль южного берега полуострова. Бухта Паламутбюкю славится своей невероятной прозрачностью воды — видно каждый камушек на глубине 10 метров! Обедаем свежим сибасом с чесночным соусом прямо у кромки воды.', en: 'Drive along the panoramic southern coast. Palamutbükü Bay is celebrated across Turkey for water so transparent you can count white pebbles 10 meters deep! Enjoy grilled Aegean sea bass at a beachside tavern.', de: 'Panoramafahrt entlang der Südküste nach Palamutbükü. Kristallklares Wasser und gegrillter Wolfsbarsch direkt am Strand.', tr: 'Yarımadanın güney kıyısı boyunca manzaralı sürüş. 10 metre derinlikte bile tabandaki taşların sayıldığı akvaryum kovanı Palamutbükü\'nde yüzme ve sahil lokantasında taze levrek ızgara.' },
                location: { ru: 'Бухта Паламутбюкю, Датча', en: 'Palamutbükü Bay, Datça', de: 'Bucht Palamutbükü, Datça', tr: 'Palamutbükü Sahili, Datça' },
                mapsQuery: 'Palamutbuku Datca Turkey'
            },
            {
                time: '17:30',
                day: 'saturday',
                iconType: 'view',
                title: { ru: 'Античный Книдос: встреча заката на стыке двух морей', en: 'Ancient Knidos: Sunset where Aegean meets Mediterranean', de: 'Antikes Knidos: Sonnenuntergang am Treffpunkt zweier Meere', tr: 'Antik Knidos: Ege ile Akdeniz\'in Birleştiği Noktada Gün Batımı' },
                desc: { ru: 'Добрались до самой западной точки полуострова — мыса Книдос. Здесь 2,500 лет назад стояла знаменитая статуя Афродиты работы Праксителя. Садимся на ступени амфитеатра у старого маяка и наблюдаем, как слева плещется Средиземное море, а справа — Эгейское.', en: 'Arrive at the westernmost tip of the peninsula: Cape Knidos. Here stood the legendary Statue of Aphrodite of Knidos carved by Praxiteles 2,500 years ago. Sit upon amphitheater stones near the old lighthouse overlooking the exact boundary where the Aegean and Mediterranean Seas converge.', de: 'Ankunft an der Westspitze des Kaps Knidos. Sonnenuntergang am Leuchtturm genau an der Grenze zwischen Ägäis und Mittelmeer erleben.', tr: 'Yarımadanın en batı ucundaki Knidos burnuna varış. 2.500 yıl önce Praksiteles\'in ünlü Afrodit heykelinin yükseldiği antik kentin tiyatro basamaklarında, solunuzda Akdeniz sağınızda Ege sularının birleştiği fenerde büyüleyici gün batımı.' },
                location: { ru: 'Античный Книдос (Текиir burnu)', en: 'Ancient Knidos (`Tekir Burnu`)', de: 'Antikes Knidos (Tekir Burnu)', tr: 'Knidos Antik Kenti (Tekir Burnu)' },
                mapsQuery: 'Knidos Ancient City Datca'
            },
            {
                time: '10:30',
                day: 'sunday',
                iconType: 'food',
                title: { ru: 'Фермерский рынок и дегустация миндальных сладостей', en: 'Farmer Market & Datça Sweet Almond Delicacies Tasting', de: 'Bauernmarkt & Datça-Mandel-Spezialitäten probieren', tr: 'Datça Köy Pazarı ve Nurlu Badem Ezmesi Tadımı' },
                desc: { ru: 'Датча — мировая столица миндаля. Покупаем у местных фермеров знаменитый сорт `Nurlu Badem`, миндальную пасту, инжир в оливковом масле и горный чабрец. Отличные гастрономические сувениры домой.', en: 'Datça is the world capital of sweet almonds. Sample and purchase the famed `Nurlu Badem` almonds, handmade almond paste, sun-dried figs preserved in olive oil, and wild mountain thyme straight from local growers.', de: 'Datça ist die Welthauptstadt der Mandeln. Berühmte Nurlu-Mandeln, Mandelpaste, feine Feigen im Olivenöl und Thymian probieren und kaufen.', tr: 'Bademin dünya başkenti Datça merkez veya köy tezgahları. Meşhur Nurlu Badem, ev yapımı badem ezmesi, zeytinyağlı incir ve dağ kekiği alışverişi.' },
                location: { ru: 'Центр Датчи / Рынок', en: 'Datça Town Center / Bazaar', de: 'Zentrum Datça / Markt', tr: 'Datça Merkez ve Köy Ürünleri Pazarı' },
                mapsQuery: 'Datca Merkez Pazar'
            }
        ]
    }
];

export default function WeekendHub({ locale = 'ru' }: { locale?: string }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeTab, setActiveTab] = useState<string>(weekendGetaways[0].id);

    const filteredGetaways = weekendGetaways.filter(item => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
        return true;
    });

    const activeItinerary = weekendGetaways.find(item => item.id === activeTab) || weekendGetaways[0];

    const t = {
        ru: {
            badge: "48-ЧАСОВЫЕ ГОТОВЫЕ УИКЕНДЫ",
            title: "Идеи выходного дня: готовые сценарии на 2 дня",
            subtitle: "Пошаговые расписания с пятницы вечера по воскресенье с расчетом бюджета на двоих, таймлайнами по часам и чек-листами в дорогу.",
            filterAll: "✨ Все сценарии (4)",
            filterRomantic: "🍷 Романтика & Богемный Каш",
            filterFamily: "🐢 Семейный отдых & Дальян",
            filterAdv: "🪂 Экстрим & Олюдениз",
            filterBoho: "🏛️ Эгейский роуд-трип & Датча",
            timelineTitle: "⏱️ Пошаговое расписание уикенда:",
            dayFri: "Пятница (Вечер)",
            daySat: "Суббота (Насыщенный день)",
            daySun: "Воскресенье (Релакс и отъезд)",
            budgetLabelEur: "Бюджет на двоих:",
            budgetLabelTl: "Ориентировочно в лирах:",
            checkListTitle: "🎒 Что взять с собой в багажник / рюкзак:",
            openMapBtn: "Открыть точку на Google Maps",
            inflationShieldTitle: "🛡️ Щит от инфляции 2026: как мы считаем бюджет",
            inflationShieldDesc: "Бюджет указан на 2 человек и включает: 2 ночи в бутик-отеле 3-4★ или уютном пансионе (~3,500-5,000 TL за две ночи), расходы на бензин из аэропорта Даламан или соседнего города (~600-800 TL), 2 плотных ужина в рыбных тавернах с вином/мезе (~2,500-3,500 TL за оба ужина) и входные билеты/лодочные трансферы. Цены актуальны на сезон 2026 года и защищены от скачков курса благодаря ориентиру в евро."
        },
        en: {
            badge: "48-HOUR READY GETAWAYS",
            title: "Weekend Getaway Ideas: Curated 2-Day Itineraries",
            subtitle: "Turnkey hour-by-hour schedules from Friday evening through Sunday complete with 2-person budget estimations, interactive timelines, and essential packing checklists.",
            filterAll: "✨ All Getaways (4)",
            filterRomantic: "🍷 Romance & Bohemian Kaş",
            filterFamily: "🐢 Family Wellness & Dalyan",
            filterAdv: "🪂 Adrenaline & Ölüdeniz",
            filterBoho: "🏛️ Aegean Roadtrip & Datça",
            timelineTitle: "⏱️ Hour-by-Hour Weekend Schedule:",
            dayFri: "Friday Evening (Arrival & Dinner)",
            daySat: "Saturday (Full Day Exploration)",
            daySun: "Sunday (Relaxation & Farewell)",
            budgetLabelEur: "Estimated Budget (2 Persons):",
            budgetLabelTl: "Approx. Turkish Lira equivalent:",
            checkListTitle: "🎒 Essential Packing Checklist:",
            openMapBtn: "Open Waypoint on Google Maps",
            inflationShieldTitle: "🛡️ 2026 Inflation Shield: How we calculate budgets",
            inflationShieldDesc: "The budget is calculated for 2 adults over 48 hours and includes: 2 nights in a charming 3-4★ boutique hotel or local guesthouse (~3,500-5,000 TL total), fuel costs from Dalaman Airport (~600-800 TL), 2 generous seafood & meze dinners with wine (~2,500-3,500 TL total), plus all boat taxis/museum tickets. Prices verified for the 2026 season and shielded against currency volatility."
        },
        de: {
            badge: "48-STUNDEN-WOCHENEND-IDEEN",
            title: "Wochenend-Ideen: Fertige 2-Tages-Routen",
            subtitle: "Schritt-für-Schritt-Zeitpläne von Freitagabend bis Sonntagabend mit Budgetberechnung für zwei Personen, interaktiven Zeitplänen und Checklisten.",
            filterAll: "✨ Alle Routen (4)",
            filterRomantic: "🍷 Romantik & Bohemien Kaş",
            filterFamily: "🐢 Familien-Erholung & Dalyan",
            filterAdv: "🪂 Abenteuer & Ölüdeniz",
            filterBoho: "🏛️ Ägäische Halbinsel Datça",
            timelineTitle: "⏱️ Stundenplan für Ihr Wochenende:",
            dayFri: "Freitagabend (Ankunft)",
            daySat: "Samstag (Voller Erlebnistag)",
            daySun: "Sonntag (Entspannung & Abreise)",
            budgetLabelEur: "Geschätztes Budget (2 Personen):",
            budgetLabelTl: "Ungefähr in Türkischen Lira:",
            checkListTitle: "🎒 Checkliste für das Gepäck:",
            openMapBtn: "Ort auf Google Maps öffnen",
            inflationShieldTitle: "🛡️ Inflationsschutz 2026: Transparente Budgetberechnung",
            inflationShieldDesc: "Das Budget gilt für 2 Erwachsene (48 Stunden) und beinhaltet: 2 Nächte im Boutique-Hotel (3-4★), Benzin ab Flughafen Dalaman, 2 Meeresfrüchte-Abendessen mit Wein und Eintrittsgelder/Boote. Aktualisiert für 2026."
        },
        tr: {
            badge: "48 SAATLİK HAZIR HAFTA SONU ROTALARI",
            title: "Hafta Sonu Kaçamak İpuçları ve 2 Günlük Hazır Senaryolar",
            subtitle: "Cuma akşamından Pazar akşamına kadar saat saat planlanmış 2 kişilik bütçe hesabı, zaman çizelgesi ve valiz kontrol listeleriyle donatılmış rehber.",
            filterAll: "✨ Tüm Senaryolar (4)",
            filterRomantic: "🍷 Romantizm & Bohem Kaş",
            filterFamily: "🐢 Aile Boyu Huzur & Dalyan",
            filterAdv: "🪂 Adrenalin & Ölüdeniz",
            filterBoho: "🏛️ Ege Yolculuğu & Datça",
            timelineTitle: "⏱️ Saat Saat Hafta Sonu Programı:",
            dayFri: "Cuma Akşamı (Giriş ve Lezzet Molası)",
            daySat: "Cumartesi (Tam Gün Keşif)",
            daySun: "Pazar (Doğa, Dinlenme ve Veda)",
            budgetLabelEur: "2 Kişilik Tahmini Bütçe:",
            budgetLabelTl: "Türk Lirası Karşılığı (Ortalama):",
            checkListTitle: "🎒 Bagaja veya Sırt Çantasına Konulması Gerekenler:",
            openMapBtn: "Konumu Haritada Aç (Google Maps)",
            inflationShieldTitle: "🛡️ 2026 Enflasyon Koruması: Bütçeyi Nasıl Hesaplıyoruz?",
            inflationShieldDesc: "Bütçe 2 yetişkin için 48 saatlik harcamaları kapsar: 3-4★ butik otel veya taş konakta 2 gece konaklama (~3.500-5.000 TL), Dalaman Havalimanı çıkışlı benzin gideri (~600-800 TL), şaraplı/mezeli 2 akşam yemeği ziyafeti (~2.500-3.500 TL) ve tekne turu/müze giriş biletleri dahildir. 2026 sezonu gerçek fiyatlarına dayanır."
        }
    }[locale as 'ru' | 'en' | 'de' | 'tr'] || {
        badge: "48-ЧАСОВЫЕ ГОТОВЫЕ УИКЕНДЫ",
        title: "Идеи выходного дня: готовые сценарии на 2 дня",
        subtitle: "Пошаговые расписания с пятницы вечера по воскресенье с расчетом бюджета на двоих, таймлайнами по часам и чек-листами в дорогу.",
        filterAll: "✨ Все сценарии",
        filterRomantic: "🍷 Романтика",
        filterFamily: "🐢 Семейный",
        filterAdv: "🪂 Экстрим",
        filterBoho: "🏛️ Датча",
        timelineTitle: "⏱️ Пошаговое расписание уикенда:",
        dayFri: "Пятница",
        daySat: "Суббота",
        daySun: "Воскресенье",
        budgetLabelEur: "Бюджет на двоих:",
        budgetLabelTl: "В лирах:",
        checkListTitle: "🎒 Что взять с собой:",
        openMapBtn: "Google Maps",
        inflationShieldTitle: "🛡️ Щит от инфляции 2026",
        inflationShieldDesc: "Бюджет указан на 2 человек на 48 часов, включая 2 ночи в отеле, бензин, 2 ужина и билеты."
    };

    const renderTimelineSection = (dayKey: 'friday' | 'saturday' | 'sunday', dayTitle: string) => {
        const events = activeItinerary.timeline.filter(e => e.day === dayKey);
        if (events.length === 0) return null;

        return (
            <div className="mb-10 last:mb-0">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
                    <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                        {dayKey === 'friday' ? '1' : dayKey === 'saturday' ? '2' : '3'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-slate-900">
                        {dayTitle}
                    </h3>
                </div>

                <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-3 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500 before:to-slate-300">
                    {events.map((ev, evIdx) => {
                        const evTitle = ev.title[locale] || ev.title['ru'] || ev.title['en'];
                        const evDesc = ev.desc[locale] || ev.desc['ru'] || ev.desc['en'];
                        const evLoc = ev.location[locale] || ev.location['ru'] || ev.location['en'];

                        return (
                            <div key={evIdx} className="relative group bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all">
                                {/* Timeline Bullet Icon */}
                                <div className="absolute -left-[35px] md:-left-[49px] top-5 w-8 h-8 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center text-xs shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                                    {ev.iconType === 'food' ? <FaUtensils /> : ev.iconType === 'hotel' ? <FaBed /> : ev.iconType === 'activity' ? <FaClock /> : <FaCamera />}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                                            <FaClock /> {ev.time}
                                        </span>
                                        <h4 className="text-lg font-black text-slate-900 leading-tight">
                                            {evTitle}
                                        </h4>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapsQuery)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-emerald-600 transition-colors bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 self-start sm:self-auto"
                                    >
                                        <FaMapMarkerAlt className="text-rose-500" /> {evLoc} <FaExternalLinkAlt size={9} />
                                    </a>
                                </div>

                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                                    {evDesc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            {/* Intro Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4 border border-emerald-200/60 shadow-sm">
                    <FaCalendarAlt className="text-emerald-600" /> {t.badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase italic tracking-tight">
                    {t.title}
                </h2>
                <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
                    {t.subtitle}
                </p>
            </div>

            {/* Inflation Shield & Budget Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-[2.5rem] p-6 md:p-8 text-white mb-12 shadow-xl border border-emerald-500/30">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 text-3xl flex-shrink-0">
                        <FaShieldAlt />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-black text-lg md:text-xl uppercase italic tracking-wide text-emerald-300">
                            {t.inflationShieldTitle}
                        </h3>
                        <p className="text-slate-200/90 text-xs md:text-sm leading-relaxed font-medium">
                            {t.inflationShieldDesc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-slate-100 mb-10">
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                        { id: 'all', label: t.filterAll },
                        { id: 'romantic', label: t.filterRomantic },
                        { id: 'family', label: t.filterFamily },
                        { id: 'adventure', label: t.filterAdv },
                        { id: 'boho', label: t.filterBoho }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedCategory(tab.id)}
                            className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                                selectedCategory === tab.id
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Itineraries Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {filteredGetaways.map((item) => {
                    const itemTitle = item.title[locale] || item.title['ru'] || item.title['en'];
                    const itemLoc = item.locationName[locale] || item.locationName['ru'] || item.locationName['en'];
                    const isSelected = activeTab === item.id;

                    return (
                        <div
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 border flex flex-col justify-between ${
                                isSelected
                                    ? 'bg-slate-900 text-white border-emerald-500 shadow-2xl scale-105 ring-4 ring-emerald-500/20'
                                    : 'bg-white text-slate-800 border-slate-200/80 hover:shadow-xl hover:border-slate-300'
                            }`}
                        >
                            <div className="h-40 relative overflow-hidden">
                                <img
                                    src={item.heroImage}
                                    alt={itemTitle}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                                    {item.category === 'romantic' ? '🍷 Романтика' : item.category === 'family' ? '🐢 Семейный' : item.category === 'adventure' ? '🪂 Экстрим' : '🏛️ Датча'}
                                </span>
                                <span className="absolute bottom-3 left-4 text-emerald-300 text-xs font-bold flex items-center gap-1">
                                    <FaMapMarkerAlt /> {itemLoc}
                                </span>
                            </div>
                            <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                                <h4 className="font-black text-sm uppercase leading-snug">
                                    {itemTitle}
                                </h4>
                                <div className="pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs font-bold">
                                    <span className={isSelected ? 'text-emerald-400' : 'text-emerald-600'}>
                                        {item.budgetEur}
                                    </span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-black ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                        Выбрать план →
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Itinerary Detailed View */}
            {activeItinerary && (
                <div className="bg-white rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100">
                    {/* Header of selected itinerary */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-slate-100 pb-8 mb-10">
                        <div className="max-w-2xl">
                            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider mb-4 inline-block">
                                {activeItinerary.locationName[locale] || activeItinerary.locationName['ru'] || activeItinerary.locationName['en']}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight text-slate-900 mb-3">
                                {activeItinerary.title[locale] || activeItinerary.title['ru'] || activeItinerary.title['en']}
                            </h3>
                            <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                                {activeItinerary.subtitle[locale] || activeItinerary.subtitle['ru'] || activeItinerary.subtitle['en']}
                            </p>
                        </div>

                        {/* Budget Card Box */}
                        <div className="w-full lg:w-80 p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex-shrink-0 space-y-4">
                            <div className="flex items-center gap-3 border-b border-emerald-500/40 pb-3">
                                <FaCoins className="text-amber-300 text-2xl" />
                                <div>
                                    <span className="text-[11px] uppercase tracking-widest text-emerald-200 block font-bold">{t.budgetLabelEur}</span>
                                    <span className="text-2xl font-black text-white">{activeItinerary.budgetEur}</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-[11px] uppercase tracking-widest text-emerald-200 block font-bold">{t.budgetLabelTl}</span>
                                <span className="text-lg font-black text-amber-200">{activeItinerary.budgetTl}</span>
                            </div>
                        </div>
                    </div>

                    {/* Highlights Badges Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {(activeItinerary.highlights[locale] || activeItinerary.highlights['ru'] || activeItinerary.highlights['en']).map((hl, hlIdx) => (
                            <div key={hlIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 font-bold text-xs md:text-sm text-slate-800">
                                <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
                                <span>{hl}</span>
                            </div>
                        ))}
                    </div>

                    {/* Timeline Hour-by-Hour */}
                    <div className="mb-12">
                        <h4 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 mb-8 flex items-center gap-3">
                            <FaClock className="text-emerald-600" /> {t.timelineTitle}
                        </h4>
                        
                        {renderTimelineSection('friday', t.dayFri)}
                        {renderTimelineSection('saturday', t.daySat)}
                        {renderTimelineSection('sunday', t.daySun)}
                    </div>

                    {/* Packing Checklist */}
                    <div className="p-6 md:p-8 rounded-3xl bg-amber-50/70 border border-amber-200/60 space-y-4">
                        <h4 className="font-black text-amber-950 uppercase tracking-wide flex items-center gap-2 text-base">
                            <FaHeart className="text-rose-500" /> {t.checkListTitle}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-amber-900 font-medium">
                            {(activeItinerary.packingChecklist[locale] || activeItinerary.packingChecklist['ru'] || activeItinerary.packingChecklist['en']).map((chk, chkIdx) => (
                                <div key={chkIdx} className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✓</span>
                                    <span>{chk}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Nav inside Card */}
                    <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link
                            href={`/${locale}/routes/trekking`}
                            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-2 shadow-lg"
                        >
                            🥾 Переключаться на треккинговые тропы →
                        </Link>
                        <Link
                            href={`/${locale}/collections`}
                            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                        >
                            🗂️ Открыть весь каталог подборок и гайдов
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
