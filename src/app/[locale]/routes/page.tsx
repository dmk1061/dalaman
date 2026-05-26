import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { FaCar, FaCalendarAlt, FaInfoCircle, FaMapMarkerAlt, FaClock, FaRoute, FaCompass } from 'react-icons/fa';

const translations: Record<string, {
    badge: string;
    title: string;
    subtitle: string;
    routesHeader: string;
    marketsHeader: string;
    marketsIntro: string;
    logisticsHeader: string;
    openRouteBtn: string;
    stopsLabel: string;
    itineraries: {
        title: string;
        subtitle: string;
        distance: string;
        duration: string;
        description: string;
        image: string;
        stops: { name: string; desc: string }[];
        mapsQuery: string;
    }[];
    markets: {
        day: string;
        places: { name: string; type: string }[];
    }[];
    logistics: {
        title: string;
        desc: string;
    }[];
}> = {
    en: {
        badge: "ROAD TRIPS",
        title: "Routes & Logistics",
        subtitle: "Ready-made road itineraries, current schedule of local markets, and essential logistics advice for an independent road trip.",
        routesHeader: "Ready-Made Road Trips",
        marketsHeader: "Nomadic Markets Calendar (Bazaars)",
        marketsIntro: "In Turkey, a farmer's market ('pazar') is the main event of the week for buying the freshest produce, local cheeses, olives, spices, and olive oil. The market moves from town to town on a weekly schedule:",
        logisticsHeader: "Road Logistics",
        openRouteBtn: "Open route on map",
        stopsLabel: "Key stops",
        itineraries: [
            {
                title: "Ancient Hellas and Wild Bays",
                subtitle: "Datça Peninsula",
                distance: "110 km",
                duration: "1 day",
                description: "A trip along the narrow and wild Datça peninsula. From the old stone wind mills of Kızlan to the ancient amphitheater of Aphrodite in Knidos at the junction of two seas.",
                image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg",
                stops: [
                    { name: "Kızlan Mills", desc: "Photo session at the historic stone towers of the 19th century." },
                    { name: "Old Datça (Eski Datça)", desc: "Stroll along stone streets covered with bougainvillea." },
                    { name: "Kargı Bay (Kargı)", desc: "Swimming and lunch with fresh fish in a calm pebble bay." },
                    { name: "Ancient Knidos", desc: "Watch the sunset at the lighthouse at the westernmost point of the peninsula." }
                ],
                mapsQuery: "Eski Datca to Knidos"
            },
            {
                title: "Lycian Necklace: Canyons, Turtles, and Ruins",
                subtitle: "Route from Fethiye",
                distance: "150 km",
                duration: "1-2 days",
                description: "A classic Lycian road trip. A combination of the coolness of the Saklıkent canyon, the mysterious ghost town of Kayaköy, and the golden dunes of ancient Patara.",
                image: "/api/images/locations/kas/ruines/patara/patara.jpg",
                stops: [
                    { name: "Ghost Town Kayaköy", desc: "Abandoned Greek village on the hills." },
                    { name: "Saklıkent Canyon", desc: "Walk along the bottom of a giant gorge in ice-cold water." },
                    { name: "Patara Ruins", desc: "Visit Nero's Roman lighthouse and the ancient parliament." },
                    { name: "Patara Sand Dunes", desc: "Watch the sun go down on the endless 18-kilometer beach." }
                ],
                mapsQuery: "Kayakoy to Saklikent to Patara Ancient City"
            },
            {
                title: "Lakes, Turtles, and Thermal Baths",
                subtitle: "Loop around Köyceğiz & Dalyan",
                distance: "85 km",
                duration: "1 day",
                description: "Wellness and nature route. Swimming in mineral springs, boat cruise past the Lycian tombs, and relaxing on the protected sandy spit of İztuzu.",
                image: "/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg",
                stops: [
                    { name: "Köyceğiz Promenade", desc: "Morning coffee under amber trees near the freshwater lake." },
                    { name: "Sultaniye Hot Springs", desc: "Rejuvenating baths with therapeutic mud and radon." },
                    { name: "Dalyan River & Kaunos Tombs", desc: "View of the tombs of Lycian kings carved into the rocks." },
                    { name: "İztuzu Turtle Beach", desc: "Relaxing on a sandy spit between the river and the sea." }
                ],
                mapsQuery: "Koycegiz to Sultaniye Hot Springs to Dalyan to Iztuzu Beach"
            }
        ],
        markets: [
            { day: "Monday", places: [
                { name: "Köyceğiz", type: "Main town bazaar near the lake - fruit, honey, textiles" },
                { name: "Dalyan", type: "Local food market" }
            ]},
            { day: "Tuesday", places: [
                { name: "Fethiye", type: "The largest clothing and food bazaar of the region (textiles, souvenirs)" }
            ]},
            { day: "Wednesday", places: [
                { name: "Fethiye / Çalış", type: "Medium food bazaar near the beach" }
            ]},
            { day: "Thursday", places: [
                { name: "Marmaris", type: "Large market in the city center" },
                { name: "Göcek", type: "Popular farmers market near the marina" }
            ]},
            { day: "Friday", places: [
                { name: "Fethiye", type: "Large food market (cheeses, vegetables, olives)" }
            ]},
            { day: "Saturday", places: [
                { name: "Dalyan", type: "Traditional bazaar with souvenirs and sweets" },
                { name: "Ortaca", type: "Authentic farmers market for locals" }
            ]},
            { day: "Sunday", places: [
                { name: "İçmeler", type: "Small market in the resort area of Marmaris" },
                { name: "Göcek", type: "Sunday food stalls" }
            ]}
        ],
        logistics: [
            { title: "Toll Roads (HGS)", desc: "To travel on toll bridges and highways in Turkey, a contactless HGS sticker mounted on the windshield is used. If you rent a car, the system is usually built-in, and the bill is presented at return. For personal cars, the sticker is purchased at any PTT post office." },
            { title: "Car Rental & Deposit", desc: "It is recommended to book cars with full insurance (Full Casco). Upon booking, a franchise is blocked on the credit card (from 100 to 300 euros). Check for the presence of the HGS chip when receiving the car." },
            { title: "Parking in Kaş & Marmaris", desc: "Parking in city centers is paid. In Kaş, use the municipal parking near the port (Kaş Marina). In Fethiye and Marmaris, parking attendants in vests operate (IsPark system) and collect payment on the spot." },
            { title: "Mountain Roads & Serpentines", desc: "Highway D400 is of excellent quality, four-lane. However, detours to secluded bays (e.g. Kabak or Çiftlik) are dirt roads or narrow mountain serpentines. Be extremely careful when driving in the dark." }
        ]
    },
    ru: {
        badge: "ПУТЕШЕСТВИЯ НА АВТО",
        title: "Маршруты и логистика",
        subtitle: "Готовые автодорожные маршруты, актуальный календарь местных рынков и важные советы по логистике для самостоятельной поездки.",
        routesHeader: "Готовые автомобильные маршруты",
        marketsHeader: "Календарь кочующих рынков (Базары)",
        marketsIntro: "В Турции фермерский рынок («pazar») — это главное событие недели для покупки свежайших продуктов, местных сыров, оливок, приправ и домашнего оливкового масла. Рынок кочует из города в город по расписанию:",
        logisticsHeader: "Дорожная логистика",
        openRouteBtn: "Открыть маршрут на карте",
        stopsLabel: "Ключевые точки",
        itineraries: [
            {
                title: "Древняя Эллада и дикие бухты",
                subtitle: "Полуостров Датча",
                distance: "110 км",
                duration: "1 день",
                description: "Путешествие по узкому и дикому полуострову Датча. От ветряных мельниц Кызлан до античного амфитеатра Афродиты в Книдосе на стыке двух морей.",
                image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg",
                stops: [
                    { name: "Мельницы Кызлан", desc: "Фотосессия у старинных каменных башен XIX века." },
                    { name: "Старая Датча (Eski Datça)", desc: "Прогулка по каменным улочкам, увитым бугенвиллеями." },
                    { name: "Бухта Карги (Kargı)", desc: "Купание и обед со свежей рыбой в спокойной галечной бухте." },
                    { name: "Античный Книдос", desc: "Провожаем закат у маяка на самой западной точке полуострова." }
                ],
                mapsQuery: "Eski Datca to Knidos"
            },
            {
                title: "Ликийское ожерелье: каньоны, черепахи и руины",
                subtitle: "Маршрут из Фетхие",
                distance: "150 км",
                duration: "1-2 дня",
                description: "Классический ликийский роуд-трип. Сочетание прохлады горного каньона, загадочного города-призрака Каякёй и золотых дюн древней Патары.",
                image: "/api/images/locations/kas/ruines/patara/patara.jpg",
                stops: [
                    { name: "Город-призрак Каякёй", desc: "Заброшенная греческая деревня на холмах." },
                    { name: "Каньон Саклыкент", desc: "Пешая прогулка по дну гигантского ущелья в ледяной воде." },
                    { name: "Руины Патары", desc: "Осмотр римского маяка Нерона и древнего парламента." },
                    { name: "Песчаные дюны Патары", desc: "Провожаем солнце на бесконечном 18-километровом пляже." }
                ],
                mapsQuery: "Kayakoy to Saklikent to Patara Ancient City"
            },
            {
                title: "Озера, черепахи и термальные ванны",
                subtitle: "Круг по Кёйджегизу и Дальяну",
                distance: "85 км",
                duration: "1 день",
                description: "Оздоровительно-природный маршрут. Купание в минеральных источниках, лодочный круиз мимо гробниц и отдых на заповедной песчаной косе.",
                image: "/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg",
                stops: [
                    { name: "Набережная Кёйджегиза", desc: "Утренний кофе под амбровыми деревьями у пресного озера." },
                    { name: "Термальные источники Султание", desc: "Омолаживающие ванны с лечебной грязью и радоном." },
                    { name: "Река Дальян и гробницы Кавна", desc: "Вид на высеченные в скалах усыпальницы ликийских царей." },
                    { name: "Черепаший пляж Изтузу", desc: "Отдых на песчаной косе между рекой и морем." }
                ],
                mapsQuery: "Koycegiz to Sultaniye Hot Springs to Dalyan to Iztuzu Beach"
            }
        ],
        markets: [
            { day: "Понедельник", places: [
                { name: "Кёйджегиз (Köyceğiz)", type: "Главный городской базар у озера — фрукты, мед, текстиль" },
                { name: "Дальян (Dalyan)", type: "Локальный продуктовый рынок" }
            ]},
            { day: "Вторник", places: [
                { name: "Фетхие (Fethiye)", type: "Самый большой вещевой и продуктовый базар региона (текстиль, сувениры)" }
            ]},
            { day: "Среда", places: [
                { name: "Фетхие / Чалыш (Çalış)", type: "Средний продуктовый базар рядом с пляжем" }
            ]},
            { day: "Четверг", places: [
                { name: "Мармарис (Marmaris)", type: "Большой рынок в центре города" },
                { name: "Гёджек (Göcek)", type: "Популярный фермерский рынок у марины" }
            ]},
            { day: "Пятница", places: [
                { name: "Фетхие (Fethiye)", type: "Крупный продуктовый рынок (сыры, овощи, оливки)" }
            ]},
            { day: "Суббота", places: [
                { name: "Дальян (Dalyan)", type: "Традиционный базар с сувенирами и сладостями" },
                { name: "Ортаджа (Ortaca)", type: "Аутентичный фермерский рынок для местных" }
            ]},
            { day: "Воскресенье", places: [
                { name: "Ичмелер (İçmeler)", type: "Небольшой рынок в курортной зоне Мармариса" },
                { name: "Гёджек (Göcek)", type: "Воскресные продуктовые ряды" }
            ]}
        ],
        logistics: [
            { title: "Оплата дорог (HGS)", desc: "Для проезда по платным мостам и автобанам в Турции используется бесконтактный стикер HGS, крепящийся на лобовое стекло. Если вы арендуете машину, система обычно встроена, и счет выставляется при сдаче. Для личного авто стикер покупается в любом отделении почты PTT." },
            { title: "Аренда авто и залог", desc: "Рекомендуется бронировать автомобили с полной страховкой (Full Casco). При оформлении блокируется франшиза на кредитной карте (от 100 до 300 евро). Проверяйте наличие HGS-чипа при получении машины." },
            { title: "Парковка в Каше и Мармарисе", desc: "Парковки в центрах городов платные. В Каше пользуйтесь муниципальной парковкой у порта (Каш Марина). В Фетхие и Мармарисе работают парковщики в жилетах (система IsPark), принимающие оплату на месте." },
            { title: "Горные дороги и серпантины", desc: "Трасса D400 — отличного качества, четырехполосная. Однако съезды к уединенным бухтам (например, Кабак или Чифтебюк) — это грунтовые или узкие горные серпантины. Будьте предельно осторожны при езде в темное время суток." }
        ]
    },
    de: {
        badge: "REISEN MIT DEM AUTO",
        title: "Routen & Logistik",
        subtitle: "Fertige Straßenrouten, aktueller Kalender der lokalen Märkte und wichtige Logistiktipps für eine eigenständige Reise.",
        routesHeader: "Fertige Autorouten",
        marketsHeader: "Kalender der Wandermärkte (Basare)",
        marketsIntro: "In der Türkei ist der Bauernmarkt („Pazar“) das Hauptereignis der Woche, um die frischesten Produkte, lokalen Käse, Oliven, Gewürze und hausgemachtes Olivenöl zu kaufen. Der Markt zieht nach folgendem Zeitplan von Stadt zu Stadt:",
        logisticsHeader: "Straßenlogistik",
        openRouteBtn: "Route auf Karte öffnen",
        stopsLabel: "Wichtige Stationen",
        itineraries: [
            {
                title: "Antikes Hellas und wilde Buchten",
                subtitle: "Halbinsel Datça",
                distance: "110 km",
                duration: "1 Tag",
                description: "Eine Reise entlang der schmalen und wilden Halbinsel Datça. Von den alten steinernen Windmühlen in Kızlan bis zum antiken Amphitheater der Aphrodite in Knidos am Schnittpunkt zweier Meere.",
                image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg",
                stops: [
                    { name: "Windmühlen von Kızlan", desc: "Fotoshooting an den historischen steinernen Windmühlen aus dem 19. Jahrhundert." },
                    { name: "Alt-Datça (Eski Datça)", desc: "Spaziergang durch die engen Gassen, bewachsen mit üppiger Bougainvillea." },
                    { name: "Kargı-Bucht (Kargı)", desc: "Schwimmen und Mittagessen mit frischem Fisch in einer ruhigen Kieselbucht." },
                    { name: "Antikes Knidos", desc: "Sonnenuntergang am Leuchtturm am westlichsten Punkt der Halbinsel genießen." }
                ],
                mapsQuery: "Eski Datca to Knidos"
            },
            {
                title: "Lykische Halskette: Schluchten, Schildkröten und Ruinen",
                subtitle: "Route ab Fethiye",
                distance: "150 km",
                duration: "1-2 Tage",
                description: "Ein klassischer lykischer Roadtrip. Kombination aus der Frische der Saklıkent-Schlucht, der geheimnisvollen Geisterstadt Kayaköy und den goldenen Dünen des antiken Patara.",
                image: "/api/images/locations/kas/ruines/patara/patara.jpg",
                stops: [
                    { name: "Geisterstadt Kayaköy", desc: "Verlassenes griechisches Dorf auf den Hügeln." },
                    { name: "Saklıkent-Schlucht", desc: "Wanderung durch die gigantische Schlucht im eiskalten Bergwasser." },
                    { name: "Ruinen von Patara", desc: "Besichtigung des römischen Leuchtturms von Nero und des antiken Parlaments." },
                    { name: "Sanddünen von Patara", desc: "Sonnenuntergang am endlosen 18 km langen Sandstrand genießen." }
                ],
                mapsQuery: "Kayakoy to Saklikent to Patara Ancient City"
            },
            {
                title: "Seen, Schildkröten und Thermalbäder",
                subtitle: "Runde um Köyceğiz & Dalyan",
                distance: "85 km",
                duration: "1 Tag",
                description: "Wellness- und Naturroute. Schwimmen in mineralischen Quellen, Bootstour vorbei an Felsengräbern und Entspannung auf der geschützten Sandzunge von İztuzu.",
                image: "/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg",
                stops: [
                    { name: "Promenade von Köyceğiz", desc: "Morgenkaffee unter Amberbäumen am Süßwassersee." },
                    { name: "Thermen von Sultaniye", desc: "Verjüngende Bäder mit Heilschlamm und Thermalwasser." },
                    { name: "Fluss Dalyan & Kaunos-Gräber", desc: "Blick auf die in den Fels gehauenen Gräber der lykischen Könige." },
                    { name: "Schildkrötenstrand İztuzu", desc: "Entspannung auf der Sandzunge zwischen Flussdelta und Meer." }
                ],
                mapsQuery: "Koycegiz to Sultaniye Hot Springs to Dalyan to Iztuzu Beach"
            }
        ],
        markets: [
            { day: "Montag", places: [
                { name: "Köyceğiz", type: "Hauptbasar am See - Obst, Honig, Textilien" },
                { name: "Dalyan", type: "Lokaler Lebensmittelmarkt" }
            ]},
            { day: "Dienstag", places: [
                { name: "Fethiye", type: "Größter Bekleidungs- und Lebensmittelbasar der Region (Textilien, Souvenirs)" }
            ]},
            { day: "Mittwoch", places: [
                { name: "Fethiye / Çalış", type: "Mittlerer Lebensmittelmarkt in Strandnähe" }
            ]},
            { day: "Donnerstag", places: [
                { name: "Marmaris", type: "Großer Markt im Stadtzentrum" },
                { name: "Göcek", type: "Beliebter Bauernmarkt in der Nähe des Jachthafens" }
            ]},
            { day: "Freitag", places: [
                { name: "Fethiye", type: "Großer Lebensmittelmarkt (Käse, Gemüse, Oliven)" }
            ]},
            { day: "Samstag", places: [
                { name: "Dalyan", type: "Traditioneller Basar mit Souvenirs und Süßigkeiten" },
                { name: "Ortaca", type: "Authentischer Bauernmarkt für Einheimische" }
            ]},
            { day: "Sonntag", places: [
                { name: "İçmeler", type: "Kleiner Markt in der Ferienzone von Marmaris" },
                { name: "Göcek", type: "Sonntags-Lebensmittelreihen" }
            ]}
        ],
        logistics: [
            { title: "Mautstraßen (HGS)", desc: "Für die Nutzung von gebührenpflichtigen Brücken und Autobahnen in der Türkei wird ein kontaktloser HGS-Aufkleber verwendet, der an der Windschutzscheibe angebracht wird. Wenn Sie ein Auto mieten, ist das System normalerweise integriert, und die Rechnung wird bei der Rückgabe vorgelegt. Für persönliche Fahrzeuge wird der Aufkleber in jeder Postfiliale (PTT) erworben." },
            { title: "Autovermietung & Kaution", desc: "Es wird empfohlen, Fahrzeuge mit Vollkaskoversicherung (Full Casco) zu buchen. Bei der Buchung wird eine Kaution auf der Kreditkarte blockiert (100 bis 300 Euro). Überprüfen Sie bei der Fahrzeugübergabe das Vorhandensein des HGS-Chips." },
            { title: "Parken in Kaş & Marmaris", desc: "Das Parken in den Stadtzentren ist gebührenpflichtig. Nutzen Sie in Kaş den städtischen Parkplatz am Hafen (Kaş Marina). In Fethiye und Marmaris arbeiten Parkwächter in Westen (IsPark-System) und kassieren direkt vor Ort." },
            { title: "Bergstraßen & Serpentinen", desc: "Die Autobahn D400 ist von hervorragender Qualität und vierspurig. Die Zufahrten zu abgelegenen Buchten (z. B. Kabak oder Çiftlik) sind jedoch unbefestigte Straßen oder enge Bergserpentinen. Seien Sie bei Fahrten im Dunkeln äußerst vorsichtig." }
        ]
    },
    tr: {
        badge: "ARABA YOLCULUKLARI",
        title: "Rotalar ve Lojistik",
        subtitle: "Hazır karayolu rotaları, yerel pazarların güncel takvimi ve bağımsız bir seyahat için önemli lojistik ipuçları.",
        routesHeader: "Hazır Araba Rotaları",
        marketsHeader: "Gezici Pazarlar Takvimi (Pazarlar)",
        marketsIntro: "Türkiye'de semt pazarları («pazar»), taze meyve-sebze, yöresel peynirler, zeytinler, baharatlar ve ev yapımı zeytinyağı satın almak için haftanın en önemli etkinliğidir. Pazar her gün farklı bir ilçede kurulur:",
        logisticsHeader: "Yol Lojistiği",
        openRouteBtn: "Rotayı haritada aç",
        stopsLabel: "Önemli noktalar",
        itineraries: [
            {
                title: "Antik Yunanistan ve Vahşi Koylar",
                subtitle: "Datça Yarımadası",
                distance: "110 km",
                duration: "1 gün",
                description: "Dar ve vahşi Datça Yarımadası boyunca yolculuk. Kızlan'daki tarihi yel değirmenlerinden, iki denizin birleştiği yerdeki Knidos antik tiyatrosuna uzanan bir rota.",
                image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg",
                stops: [
                    { name: "Kızlan Değirmenleri", desc: "19. yüzyıldan kalma tarihi taş yel değirmenlerinde fotoğraf çekimi." },
                    { name: "Eski Datça", desc: "Begonvillerle süslenmiş taş sokaklarda keyifli bir yürüyüş." },
                    { name: "Kargı Koyu", desc: "Sakin çakıllı koyda yüzme keyfi ve taze balık eşliğinde öğle yemeği." },
                    { name: "Antik Knidos", desc: "Yarımadanın en batı ucundaki deniz fenerinde gün batımını izleme." }
                ],
                mapsQuery: "Eski Datca to Knidos"
            },
            {
                title: "Likya Gerdanlığı: Kanyonlar, Kaplumbağalar ve Harabeler",
                subtitle: "Fethiye Çıkışlı Rota",
                distance: "150 km",
                duration: "1-2 gün",
                description: "Klasik bir Likya yolculuğu. Saklıkent Kanyonu'nun serinliği, gizemli Kayaköy hayalet şehri ve antik Patara'nın altın sarısı kum tepelerinin birleşimi.",
                image: "/api/images/locations/kas/ruines/patara/patara.jpg",
                stops: [
                    { name: "Kayaköy Hayalet Şehri", desc: "Tepelerdeki terk edilmiş tarihi Rum köyü." },
                    { name: "Saklıkent Kanyonu", desc: "Buz gibi dağ suyunda devasa kanyonun tabanında yürüyüş." },
                    { name: "Patara Antik Kenti", desc: "Neron'un yaptırdığı Roma deniz fenerini ve antik meclis binasını ziyaret." },
                    { name: "Patara Kum Tepeleri", desc: "Endamlı 18 kilometrelik plajda eşsiz gün batımını izleme." }
                ],
                mapsQuery: "Kayakoy to Saklikent to Patara Ancient City"
            },
            {
                title: "Göller, Kaplumbağalar ve Çamur Banyoları",
                subtitle: "Köyceğiz ve Dalyan Çevresi",
                distance: "85 km",
                duration: "1 gün",
                description: "Doğal ve şifalı bir rota. Mineral zengini kaplıcalarda yüzme, Likya kaya mezarlarının yanından tekne turu ve koruma altındaki İztuzu kumsalında dinlenme.",
                image: "/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg",
                stops: [
                    { name: "Köyceğiz Kordonu", desc: "Tatlı su gölü kenarındaki sığla ağaçları altında sabah kahvesi." },
                    { name: "Sultaniye Kaplıcaları", desc: "Şifalı çamur banyoları ve radon kaplıcaları ile yenilenme." },
                    { name: "Dalyan Çayı ve Kaya Mezarları", desc: "Kayalara oyulmuş görkemli Likya krallarının mezarlarını seyretme." },
                    { name: "İztuzu Kaplumbağa Plajı", desc: "Nehir ile deniz arasındaki eşsiz kum kumsalda dinlenme." }
                ],
                mapsQuery: "Koycegiz to Sultaniye Hot Springs to Dalyan to Iztuzu Beach"
            }
        ],
        markets: [
            { day: "Pazartesi", places: [
                { name: "Köyceğiz", type: "Göl kenarındaki en büyük üretici pazarı - meyve, bal, tekstil" },
                { name: "Dalyan", type: "Yerel gıda pazarı" }
            ]},
            { day: "Salı", places: [
                { name: "Fethiye", type: "Bölgenin en büyük giysi ve gıda pazarı (tekstil, hediyelik eşya)" }
            ]},
            { day: "Çarşamba", places: [
                { name: "Fethiye / Çalış", type: "Plaja yakın orta büyüklükte gıda pazarı" }
            ]},
            { day: "Perşembe", places: [
                { name: "Marmaris", type: "Şehir merkezindeki büyük pazar" },
                { name: "Göcek", type: "Marina yakınındaki popüler üretici pazarı" }
            ]},
            { day: "Cuma", places: [
                { name: "Fethiye", type: "Büyük gıda pazarı (peynir, taze sebze, zeytin)" }
            ]},
            { day: "Cumartesi", places: [
                { name: "Dalyan", type: "Hediyelik eşya ve tatlıların satıldığı geleneksel pazar" },
                { name: "Ortaca", type: "Yerel halk için otantik üretici pazarı" }
            ]},
            { day: "Pazar", places: [
                { name: "İçmeler", type: "Marmaris'in tatil bölgesinde kurulan küçük pazar" },
                { name: "Göcek", type: "Pazar günü kurulan gıda tezgahları" }
            ]}
        ],
        logistics: [
            { title: "Ücretli Yollar (HGS)", desc: "Türkiye'deki ücretli köprü ve otoyolları kullanmak için ön cama yapıştırılan temassız HGS etiketi kullanılır. Araç kiralıyorsanız, sistem genellikle araçta bulunur ve ücret dönüşte tahsil edilir. Şahsi araçlar için etiket herhangi bir PTT şubesinden satın alınabilir." },
            { title: "Araç Kiralama ve Depozito", desc: "Araçları tam kasko (Full Casco) ile kiralamanız önerilir. Kiralama esnasında kredi kartında bir bloke/depozito (100 ile 300 euro arası) uygulanır. Aracı teslim alırken HGS çipinin olup olmadığını kontrol edin." },
            { title: "Kaş ve Marmaris'te Otopark", desc: "Şehir merkezlerindeki otoparklar ücretlidir. Kaş'ta liman yakınındaki belediye otoparkını (Kaş Marina) kullanın. Fethiye ve Marmaris'te yelekli otopark görevlileri (IsPark sistemi) çalışır ve ücreti yerinde tahsil eder." },
            { title: "Dağ Yolları ve Virajlar", desc: "D400 karayolu mükemmel kalitede ve dört şeritlidir. Ancak tenha koylara giden yollar (örneğin Kabak veya Çiftlik) toprak yollar veya dar dağ virajlarıdır. Gece sürüşlerinde son derece dikkatli olun." }
        ]
    }
};

type RoutesPageProps = {
    params: {
        locale: string;
    }
}

const RoutesPage = ({ params }: RoutesPageProps) => {
    const locale = params.locale || 'en';
    const t = translations[locale] || translations['en'];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <Header locale={locale} />

            <main className="flex-grow container mx-auto px-4 py-12 pb-20">
                {/* Intro */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">{t.badge}</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">
                        {t.title}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {t.subtitle}
                    </p>
                </div>

                {/* Section 1: Itineraries */}
                <div className="space-y-16 mb-24">
                    <div className="border-b border-slate-200 pb-4 mb-8">
                        <h2 className="text-2xl font-black text-slate-800 uppercase italic flex items-center gap-2">
                            <FaRoute className="text-cyan-600" /> {t.routesHeader}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {t.itineraries.map((itinerary, index) => (
                            <div key={index} className="group bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-slate-100 flex flex-col hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-56 w-full">
                                    <img
                                        src={itinerary.image}
                                        alt={itinerary.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                        <div>
                                            <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider mb-2 inline-block">
                                                {itinerary.subtitle}
                                            </span>
                                            <h3 className="text-white font-black text-lg uppercase italic leading-tight">{itinerary.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center space-x-6 text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">
                                            <span className="flex items-center gap-1.5"><FaCompass /> {itinerary.distance}</span>
                                            <span className="flex items-center gap-1.5"><FaClock /> {itinerary.duration}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                                            {itinerary.description}
                                        </p>
                                        <div className="space-y-4 mb-8">
                                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{t.stopsLabel}:</h4>
                                            <ol className="space-y-3">
                                                {itinerary.stops.map((stop, sIdx) => (
                                                    <li key={sIdx} className="flex gap-3 text-xs text-slate-600 font-medium leading-normal">
                                                        <span className="w-5 h-5 rounded-full bg-cyan-50 text-cyan-600 font-bold flex items-center justify-center flex-shrink-0">{sIdx + 1}</span>
                                                        <div>
                                                            <strong className="text-slate-800">{stop.name}</strong> — {stop.desc}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(itinerary.mapsQuery)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center block bg-cyan-600 text-white py-3.5 rounded-2xl hover:bg-cyan-700 font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-cyan-100"
                                    >
                                        {t.openRouteBtn}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Market Calendar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    <div className="lg:col-span-8">
                        <div className="border-b border-slate-200 pb-4 mb-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase italic flex items-center gap-2">
                                <FaCalendarAlt className="text-cyan-600" /> {t.marketsHeader}
                            </h2>
                        </div>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                            {t.marketsIntro}
                        </p>

                        <div className="bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-slate-100 divide-y divide-slate-100">
                            {t.markets.map((dayItem, idx) => (
                                <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start hover:bg-slate-50/50 transition-colors">
                                    <div className="w-full md:w-32 flex-shrink-0">
                                        <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-black uppercase tracking-wider">
                                            {dayItem.day}
                                        </span>
                                    </div>
                                    <div className="flex-grow space-y-3">
                                        {dayItem.places.map((place, pIdx) => (
                                            <div key={pIdx} className="text-sm">
                                                <h4 className="font-bold text-slate-800">{place.name}</h4>
                                                <p className="text-slate-400 text-xs mt-0.5">{place.type}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Road Logistics */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="border-b border-slate-200 pb-4 mb-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase italic flex items-center gap-2">
                                <FaInfoCircle className="text-cyan-600" /> {t.logisticsHeader}
                            </h2>
                        </div>

                        <div className="bg-white rounded-[2rem] p-6 premium-shadow border border-slate-100 space-y-6">
                            {t.logistics.map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span> {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            
            <Footer locale={locale} />
        </div>
    );
};

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ru' },
    { locale: 'de' },
    { locale: 'tr' }
  ];
}

export default RoutesPage;
