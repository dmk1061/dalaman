import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FaShieldAlt, FaCheckCircle, FaBookOpen, FaExternalLinkAlt, FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaStar, FaChevronRight } from "react-icons/fa";
import TransfersSmartHub from "@/app/components/TransfersSmartHub";
import CarRentalSmartHub from "@/app/components/CarRentalSmartHub";
import GeoSmartHotelHub from "@/app/components/GeoSmartHotelHub";
import YachtRentalSmartHub from "@/app/components/YachtRentalSmartHub";
import FlightsSmartHub from "@/app/components/FlightsSmartHub";
import ExcursionsSmartHub from "@/app/components/ExcursionsSmartHub";

interface ServiceItem {
    title: Record<string, string>;
    desc: Record<string, string>;
    features: Record<string, string[]>;
    priceNote: Record<string, string>;
    guides: { slug: string; label: Record<string, string> }[];
    externalLink?: { url: string; label: Record<string, string> };
    heroBg: string;
}

const servicesRegistry: Record<string, ServiceItem> = {
    transfers: {
        title: {
            ru: "VIP & Индивидуальные Трансферы из Аэропорта Даламан (DLM)",
            en: "VIP & Private Transfers from Dalaman Airport (DLM)",
            de: "VIP & Privat-Transfers vom Flughafen Dalaman (DLM)",
            tr: "Dalaman Havalimanı (DLM) VIP ve Özel Transfer Hizmetleri"
        },
        desc: {
            ru: "Комфортабельная встреча с именной табличкой прямо у выхода из терминала. Mercedes Vito/Sprinter с кондиционером, бесплатным Wi-Fi и детскими креслами по запросу. Фиксированные цены без скрытых доплат.",
            en: "Comfortable meet & greet right outside the DLM arrivals terminal. Air-conditioned Mercedes Vito/Sprinter vans featuring free Wi-Fi and complimentary child safety seats. Fixed rates with absolutely no hidden fees.",
            de: "Komfortabler Empfang direkt am Ausgang des DLM-Terminals mit Namensschild. Klimatisierte Mercedes Vito/Sprinter mit kostenlosem WLAN und Kindersitzen. Festpreise ohne versteckte Zuschläge.",
            tr: "DLM terminal çıkışında isim tabelası ile konforlu karşılama. Klimalı, ücretsiz Wi-Fi ve çocuk koltuğu imkanı sunan Mercedes Vito/Sprinter araçlar. Gizli ek ücret içermeyen sabit fiyatlar."
        },
        features: {
            ru: [
                "Встреча с табличкой в зоне прилета DLM 24/7",
                "Бесплатное ожидание при задержке авиарейса",
                "Детские бустеры и автокресла бесплатно",
                "Фиксированный тариф в EUR/USD/TL без доплат за пробки",
                "Опытные русскоговорящие и англоговорящие водители"
            ],
            en: [
                "Meet & greet with name sign at DLM arrival zone 24/7",
                "Free flight delay tracking and extended waiting time",
                "Complimentary child boosters and infant car seats",
                "Fixed upfront rates in EUR/USD/TL with no traffic surcharges",
                "Experienced multilingual professional drivers"
            ],
            de: [
                "Empfang mit Namensschild am DLM-Ankunftsbereich 24/7",
                "Kostenlose Wartezeit bei Flugverspätungen",
                "Kostenlose Kindersitze und Sitzerhöhungen inklusive",
                "Feste Tarife in EUR/USD/TL ohne Stauzuschläge",
                "Erfahrene mehrsprachige Berufsfahrer"
            ],
            tr: [
                "DLM gelen yolcu çıkışında 7/24 isim tabelası ile karşılama",
                "Uçak rötarlarında ücretsiz bekleme ve uçuş takibi",
                "Ücretsiz çocuk koltuğu ve yükseltici desteği",
                "Trafik yoğunluğu fark etmeksizin sabit EUR/USD/TL fiyat garantisi",
                "Deneyimli ve çok dilli profesyonel şoför kadrosu"
            ]
        },
        priceNote: {
            ru: "Ориентировочные тарифы 2026: DLM -> Гёджек (~35-45 EUR), DLM -> Фетхие (~45-60 EUR), DLM -> Мармарис (~65-80 EUR), DLM -> Каш (~90-110 EUR).",
            en: "Estimated 2026 rates: DLM -> Göcek (~€35-45), DLM -> Fethiye (~€45-60), DLM -> Marmaris (~€65-80), DLM -> Kaş (~€90-110).",
            de: "Richtpreise 2026: DLM -> Göcek (~35-45 €), DLM -> Fethiye (~45-60 €), DLM -> Marmaris (~65-80 €), DLM -> Kaş (~90-110 €).",
            tr: "Tahmini 2026 fiyatları: DLM -> Göcek (~35-45 €), DLM -> Fethiye (~45-60 €), DLM -> Marmaris (~65-80 €), DLM -> Kaş (~90-110 €)."
        },
        guides: [
            { slug: "airport-dalaman", label: { ru: "Гид по Аэропорту Даламан (DLM)", en: "Dalaman Airport (DLM) Guide", de: "Flughafen Dalaman (DLM) Leitfaden", tr: "Dalaman Havalimanı (DLM) Rehberi" } },
            { slug: "transport-system", label: { ru: "Транспортная система региона: автобусы Havaş & Muttaş", en: "Regional Transport System: Havaş & Muttaş Buses", de: "Öffentlicher Verkehr: Havaş & Muttaş Busse", tr: "Bölgesel Ulaşım Sistemi: Havaş & Muttaş Otobüsleri" } }
        ],
        heroBg: "/api/images/locations/dalaman/beach/sarsala/sarsala.jpg"
    },
    "car-rental": {
        title: {
            ru: "Аренда Автомобилей, Скутеров и Велосипедов",
            en: "Car, Scooter, and Bicycle Rentals",
            de: "Mietwagen, Roller- und Fahrradverleih",
            tr: "Araç, Motosiklet ve Bisiklet Kiralama"
        },
        desc: {
            ru: "Свобода передвижения по бирюзовому побережью: от экономичных седанов с получением в аэропорту Даламан до кабриолетов и горных скутеров для серпантинов Каша и Датчи.",
            en: "Explore the Turquoise Coast at your own pace: from economical airport pick-up sedans to convertibles and mountain scooters tailored for coastal serpentines.",
            de: "Erkunden Sie die Türkische Riviera ganz flexibel: von wirtschaftlichen Limousinen ab Flughafen bis hin zu Cabrios und Rollern für Küstenstraßen.",
            tr: "Turkuaz Kıyıları özgürce keşfedin: havalimanı teslim ekonomik sedanlardan Kaş ve Datça virajları için özel motosikletlere kadar geniş filo seçenekleri."
        },
        features: {
            ru: [
                "Получение и возврат прямо в аэропорту Даламан (DLM)",
                "Полная страховка (Full Kasko / Zero Excess) без франшизы",
                "Новые автомобили с автоматической коробкой передач и кондиционером",
                "Возможность аренды без залога по кредитной карте у надежных партнеров",
                "Круглосуточная помощь на дорогах (Roadside Assistance)"
            ],
            en: [
                "Direct pick-up and drop-off right at Dalaman Airport (DLM)",
                "Comprehensive insurance coverage (Full Kasko / Zero Excess available)",
                "Modern well-maintained fleet with automatic transmission and A/C",
                "No-deposit cash or debit card rental options through reliable local partners",
                "24/7 emergency roadside assistance across all provinces"
            ],
            de: [
                "Direkte Abholung und Rückgabe am Flughafen Dalaman (DLM)",
                "Vollkaskoversicherung ohne Selbstbeteiligung möglich",
                "Moderne Fahrzeuge mit Automatikgetriebe und Klimaanlage",
                "Mietoptionen ohne Kaution bei zuverlässigen lokalen Partnern",
                "24/7 Pannenhilfe und Notfallunterstützung"
            ],
            tr: [
                "Dalaman Havalimanı (DLM) doğrudan teslimat ve iade imkanı",
                "Muafiyetsiz tam kapsamlı kasko (Full Kasko) seçenekleri",
                "Otomatik vites ve klimalı modern ve bakımlı araç filosu",
                "Güvenilir partnerler aracılığıyla depozitosuz kiralama alternatifleri",
                "7/24 kesintisiz yol yardım desteği"
            ]
        },
        priceNote: {
            ru: "Ориентировочные цены 2026: Эконом авто (~30-45 EUR/сутки), Кроссоверы/SUV (~55-80 EUR/сутки), Скутер 125cc (~20-25 EUR/сутки).",
            en: "Estimated 2026 rates: Economy sedans (~€30-45/day), SUVs/Crossovers (~€55-80/day), 125cc Scooters (~€20-25/day).",
            de: "Richtpreise 2026: Kleinwagen (~30-45 €/Tag), SUVs (~55-80 €/Tag), Roller 125cc (~20-25 €/Tag).",
            tr: "Tahmini 2026 fiyatları: Ekonomik sedan (~30-45 €/gün), SUV pazar (~55-80 €/gün), 125cc Motosiklet (~20-25 €/gün)."
        },
        guides: [
            { slug: "vehicle-rental-cars-scooters-bikes", label: { ru: "Подробный гид по аренде транспорта и ПДД Турции", en: "Detailed Vehicle Rental Guide & Turkish Driving Rules", de: "Ausführlicher Leitfaden zu Mietwagen und Verkehrsregeln", tr: "Detaylı Araç Kiralama ve Trafik Kuralları Rehberi" } },
            { slug: "transport-system", label: { ru: "Альтернативы: общественный транспорт и паромы", en: "Alternatives: Public Bus Routes & Ferries", de: "Alternativen: Öffentliche Busse & Fähren", tr: "Alternatifler: Toplu Taşıma ve Feribot Hatları" } }
        ],
        heroBg: "/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg"
    },
    "yacht-rental": {
        title: {
            ru: "Аренда Яхт, Гулетов и Морские Чартры",
            en: "Yacht Charters, Gulets, and Private Boat Tours",
            de: "Yachtcharter, Gulets und private Bootsausflüge",
            tr: "Yat Kiralama, Gulet Turları ve Özel Tekne Çarterleri"
        },
        desc: {
            ru: "Откройте легендарный 12 островов Гёджека, уединенные бухты Фетхие и бирюзовые лагуны Олюдениза с палубы роскошной парусной яхты, катамарана или традиционного деревянного гулета с капитаном.",
            en: "Explore the legendary 12 Islands of Göcek, secluded bays of Fethiye, and crystal lagoons of Oludeniz from the deck of a private sailing yacht, luxury catamaran, or traditional gulet with a dedicated crew.",
            de: "Entdecken Sie die berühmten 12 Inseln von Göcek, einsame Buchten von Fethiye und die türkisfarbene Lagune von Ölüdeniz an Bord einer Segelyacht, eines Katamarans oder einer traditionellen Gulet.",
            tr: "Göcek'in efsanevi 12 Adaları'nı, Fethiye'nin saklı koylarını ve Ölüdeniz lagününü özel yelkenli yat, lüks katamaran veya geleneksel ahşap gulet güvertesinden keşfedin."
        },
        features: {
            ru: [
                "Ежедневные частные туры (Daily Private Charters) с обедом и шеф-поваром",
                "Недельные чартеры (Blue Cruise / Mavi Yolculuk) по островам Ликии",
                "Большой выбор судов: от моторных катеров до люксовых катамаранов",
                "Старт из лучших марин: D-Marin Göcek, Ece Marina Fethiye, Kaş Marina",
                "Предоставление сап-бордов (SUP), масок для снорклинга и снастей"
            ],
            en: [
                "Daily private charters featuring freshly prepared Mediterranean lunches",
                "Multi-day Blue Cruises (`Mavi Yolculuk`) along pristine Lycian coves",
                "Wide vessel selection: motor cruisers, sailing yachts, and catamarans",
                "Departures from top marinas: D-Marin Göcek, Ece Fethiye, and Kaş Marina",
                "Onboard SUP paddleboards, snorkeling gear, and fishing tackle included"
            ],
            de: [
                "Tägliche private Charters inkl. mediterranem Mittagessen an Bord",
                "Mehrtägige Blaue Reisen (Blue Cruise) entlang der lykischen Küste",
                "Große Auswahl: Motorboote, Segelyachten und Luxus-Katamarane",
                "Abfahrt aus Top-Marinas: D-Marin Göcek, Ece Fethiye, Kaş Marina",
                "SUP-Boards, Schnorchelausrüstung und Angelzubehör inklusive"
            ],
            tr: [
                "Taze Ege lezzetleri sunan aşçılı günlük özel tekne turları",
                "Likya koyları boyunca haftalık Mavi Yolculuk konaklamalı turlar",
                "Geniş filo: sürat tekneleri, yelkenli yatlar ve lüks katamaranlar",
                "Seçkin marinalardan çıkış: D-Marin Göcek, Ece Fethiye ve Kaş Marina",
                "SUP kürek sörfü, şnorkel ekipmanları ve balık takımları dahil"
            ]
        },
        priceNote: {
            ru: "Ориентировочные цены 2026: Ежедневный чартер гулета/яхты на компанию (~350-700 EUR/день), Недельный чартер катамарана (~3500-6500 EUR/неделя).",
            en: "Estimated 2026 rates: Private daily boat charter for groups (~€350-700/day), Weekly catamaran charter (~€3,500-6,500/week).",
            de: "Richtpreise 2026: Privater Tagescharter für Gruppen (~350-700 €/Tag), Wöchentlicher Katamarancharter (~3.500-6.500 €/Woche).",
            tr: "Tahmini 2026 fiyatları: Gruplar için günlük özel tekne kiralama (~350-700 €/gün), Haftalık katamaran çarteri (~3.500-6.500 €/hafta)."
        },
        guides: [
            { slug: "yachting", label: { ru: "Полный гид по яхтингу и морским прогулкам", en: "Comprehensive Yachting & Blue Cruise Guide", de: "Ausführlicher Leitfaden für Yachting & Blaue Reisen", tr: "Kapsamlı Yatçılık ve Mavi Yolculuk Rehberi" } },
            { slug: "islands-bays", label: { ru: "Острова, бухты и заливы Ликийского побережья", en: "Top Islands, Bays, and Secluded Coves", de: "Schönste Inseln, Buchten und Ankerplätze", tr: "Likya Kıyılarının En Güzel Koyları ve Adaları" } }
        ],
        heroBg: "/api/images/locations/gocek/beach/dresort/dresort.jpg"
    },
    flights: {
        title: {
            ru: "Авиабилеты и Прямые Чартеры в Даламан (DLM)",
            en: "Flights & Direct Charters to Dalaman Airport (DLM)",
            de: "Flüge & Direktcharter zum Flughafen Dalaman (DLM)",
            tr: "Dalaman Havalimanı (DLM) Uçak Bileti ve Çarter Seferleri"
        },
        desc: {
            ru: "Ищите выгодные прямые перелёты и стыковочные рейсы через Стамбул. Сравнивайте цены всех авиакомпаний на одном экране с прямой реферальной интеграцией Aviasales и скидками без наценок агентств.",
            en: "Search the best direct non-stop flights and budget connections via Istanbul. Compare fares across all major carriers in one intelligent dashboard powered by official Aviasales benchmarks.",
            de: "Finden Sie günstige Direktflüge und Verbindungen über Istanbul. Vergleichen Sie die Tarife aller Fluggesellschaften in einem intelligenten Dashboard mit offiziellen Aviasales-Preisen.",
            tr: "İstanbul aktarmalı veya doğrudan en uygun Dalaman (DLM) uçak biletlerini bulun. Aviasales ve resmi havayolu partnerliğiyle tüm firmaların fiyatlarını tek ekranda karşılaştırın."
        },
        features: {
            ru: [
                "Прямые чартерные и регулярные рейсы в сезон (июнь–октябрь)",
                "Удобные стыковки через Стамбул (IST / SAW) круглый год",
                "Интеграция с Aviasales, Turkish Airlines, Pegasus и Corendon",
                "Анализ тарифов с багажом 20 кг и безбагажных лоукостеров",
                "Бесплатная проверка расписания и помощь в планировании стыковок"
            ],
            en: [
                "Direct seasonal charter and scheduled routes (June–October)",
                "Convenient year-round connections via Istanbul (IST / SAW)",
                "Official gateways with Aviasales, Turkish Airlines, and Pegasus",
                "Smart breakdown of checked baggage (20kg) vs budget cabin luggage",
                "Instant flight schedule benchmarks & transfer time recommendations"
            ],
            de: [
                "Direkte saisonale Charter- und Linienflüge (Juni–Oktober)",
                "Bequeme ganzjährige Verbindungen über Istanbul (IST / SAW)",
                "Offizielle Partner von Aviasales, Turkish Airlines und SunExpress",
                "Vergleich von 20kg Aufgabegepäck und Handgepäck-Tarifen",
                "Sofortige Übersicht der Flugzeiten und Umsteigeempfehlungen"
            ],
            tr: [
                "Sezon boyunca (Haziran-Ekim) doğrudan çarter ve tarifeli seferler",
                "İstanbul (IST / SAW) üzerinden yıl boyu 15+ günlük bağlantı",
                "Aviasales, Türk Hava Yolları, Pegasus ve AJet doğrudan sorgulama",
                "20 kg bagajlı ve ekonomik el bagajlı biletlerin anlık analizi",
                "Uçuş takvimi kontrolü ve havalimanı transfer önerileri"
            ]
        },
        priceNote: {
            ru: "Ориентиры цен 2026: Пряной перелёт из Москвы (~22,000–35,000 ₽ туда-обратно), через Стамбул (~16,000–24,000 ₽). Из Стамбула в Даламан (~3,500–6,500 ₽ / ~1,200 TRY).",
            en: "2026 Price Benchmarks: Direct round-trip from Europe (~€220–400), via Istanbul (~€160–260). Domestic Istanbul to Dalaman flights (~€35–70 / ~1,200 TRY).",
            de: "Richtpreise 2026: Direktflüge ab Deutschland (~220–400 € hin und zurück), über Istanbul (~160–260 €). Inlandsflüge Istanbul-Dalaman (~35–70 €).",
            tr: "Tahmini 2026 Fiyatları: Avrupa'dan doğrudan gidiş-dönüş (~220-400 €), İstanbul aktarmalı (~160-260 €). İstanbul-Dalaman iç hat uçuşları (~1.200-2.500 TRY)."
        },
        guides: [
            { slug: "airport-dalaman", label: { ru: "Полный гид по терминалам аэропорта Даламан (DLM) и дьюти-фри", en: "Comprehensive Dalaman Airport (DLM) Guide & Duty Free", de: "Ausführlicher Leitfaden zum Flughafen Dalaman (DLM)", tr: "Kapsamlı Dalaman Havalimanı (DLM) ve Duty Free Rehberi" } },
            { slug: "transport", label: { ru: "Как добраться из аэропорта: автобусы Havaş, Muttaş и такси", en: "How to Get to Resorts: Havaş & Muttaş Airport Shuttles & Taxis", de: "Flughafentransfers: Havaş & Muttaş Shuttlebusse & Taxis", tr: "Havalimanından Ulaşım: Havaş, Muttaş ve Taksi Seçenekleri" } }
        ],
        heroBg: "/api/images/locations/dalaman/sights/airport/airport.jpg"
    },
    diving: {
        title: {
            ru: "Дайвинг, Снорклинг и Подводные Экскурсии",
            en: "Diving, Snorkeling, and Underwater Adventures",
            de: "Tauchen, Schnorcheln und Unterwasserabenteuer",
            tr: "Dalış, Şnorkel ve Sualtı Maceraları"
        },
        desc: {
            ru: "Погрузитесь в прозрачные воды Каша (лучшей дайв-столицы Турции) и Фетхие: затонувшие античные амфоры, рифы, пещера Аладdin и встречи с морскими черепахами Caretta-Caretta.",
            en: "Dive into the crystal-clear waters of Kaş (Turkey's premier diving capital) and Fethiye: ancient amphora fields, dramatic caverns, canyon reefs, and sea turtle encounters.",
            de: "Tauchen Sie ein in das glasklare Wasser von Kaş (Türkeis Tauchparadies Nr. 1) und Fethiye: antike Amphorenfelder, Riffe, Höhlen und Begegnungen mit Meeresschildkröten.",
            tr: "Türkiye'nin dalış başkenti Kaş ve Fethiye'nin kristal sularına dalın: antik amfora tarlaları, büyüleyici mağaralar, kanyon resifleri ve Caretta Caretta kaplumbağaları."
        },
        features: {
            ru: [
                "Ознакомительные погружения для новичков (Discover Scuba Diving)",
                "Сертификационные курсы PADI / SSI (Open Water, Advanced)",
                "Дайв-сафари к затонувшим кораблям, самолетам и подводным каньонам",
                "Современное снаряжение и опытные сертифицированные инструкторы",
                "Снорклинг-туры для всей семьи в тихих прозрачных лагунах"
            ],
            en: [
                "Introductory Discover Scuba Diving experiences for absolute beginners",
                "Full PADI & SSI global certification courses (Open Water, Advanced)",
                "Wreck dives, sunken aircraft canyons, and archaeological amphora dives",
                "Top-tier certified equipment and English-speaking dive instructors",
                "Relaxing snorkeling excursions tailored for families and children"
            ],
            de: [
                "Schnuppertauchen für Anfänger (Discover Scuba Diving)",
                "Internationale PADI & SSI Zertifizierungskurse (Open Water, Advanced)",
                "Wracktauchen zu versunkenen Flugzeugen und antiken Amphorenfeldern",
                "Moderne Ausrüstung und zertifizierte mehrsprachige Tauchlehrer",
                "Entspannte Schnorcheltouren für die ganze Familie in ruhigen Lagunen"
            ],
            tr: [
                "Yeni başlayanlar için rehber eşliğinde keşif dalışı (Discover Scuba)",
                "Uluslararası geçerli PADI ve SSI sertifika programları",
                "Batık uçak, gemi resifleri ve antik amfora kanyonlarına dalışlar",
                "Üst düzey bakımlı ekipman ve tecrübeli sertifikalı eğitmenler",
                "Aileler ve çocuklar için sakin lagünlerde özel şnorkel turları"
            ]
        },
        priceNote: {
            ru: "Ориентировочные цены 2026: Ознакомительное погружение с лодки (~45-60 EUR), Курс PADI Open Water (~320-380 EUR).",
            en: "Estimated 2026 rates: Single boat discovery dive with gear (~€45-60), Full PADI Open Water course (~€320-380).",
            de: "Richtpreise 2026: Schnuppertauchgang vom Boot inkl. Ausrüstung (~45-60 €), PADI Open Water Kurs (~320-380 €).",
            tr: "Tahmini 2026 fiyatları: Ekipman dahil tekne ile keşif dalışı (~45-60 €), PADI Open Water sertifika kursu (~320-380 €)."
        },
        guides: [
            { slug: "diving", label: { ru: "Гид по дайвингу: лучшие споты Каша и Фетхие", en: "Diving Guide: Best Spots in Kaş & Fethiye", de: "Tauchführer: Top-Spots in Kaş & Fethiye", tr: "Dalış Rehberi: Kaş ve Fethiye'nin En İyi Noktaları" } },
            { slug: "diving-and-tuna-fishing", label: { ru: "Подводная охота и морская рыбалка", en: "Spearfishing & Deep Sea Fishing Adventures", de: "Unterwasserjagd & Hochseefischen", tr: "Zıpkınla Avcılık ve Açık Deniz Balıkçılığı" } }
        ],
        heroBg: "/api/images/locations/kas/ruines/kastombs/kastombs.jpg"
    },
    "excursions-tours": {
        title: {
            ru: "Экскурсии, Приключения и Авторские Туры",
            en: "Excursions, Adventures, and Guided Tours",
            de: "Ausflüge, Abenteuer und geführte Touren",
            tr: "Geziler, Macera Aktiviteleri ve Rehberli Turlar"
        },
        desc: {
            ru: "От полетов на параплане над Голубой лагуной Олюдениза с высоты 2000 метров до рафтинга по реке Даламан, сафари в каньоне Саклыкент и грязевых ванн Дальяна.",
            en: "From world-famous paragliding over Oludeniz Blue Lagoon (2,000m) to thrilling Dalaman River rafting, Saklikent Gorge jeep safaris, and therapeutic mud baths in Dalyan.",
            de: "Von weltberühmten Paragliding-Flügen über die Blaue Lagune von Ölüdeniz (2.000m) bis hin zu Rafting auf dem Dalaman-Fluss, Jeep-Safaris in der Saklıkent-Schlucht und Schlammbädern in Dalyan.",
            tr: "Babadağ'dan Ölüdeniz Mavi Lagünü üzerinde yamaç paraşütü uçuşlarından (2.000m), Dalaman Çayı rafting maceralarına, Saklıkent kanyonu safari turlarına ve Dalyan çamur banyolarına."
        },
        features: {
            ru: [
                "Параглайдинг в Олюденизе (Тандем с сертифицированным пилотом)",
                "Рафтинг по горной реке Даламан с обедом на природе",
                "Джип-сафари в каньон Саклыкент и древний город Тлос",
                "Лодочная экскурсия в Дальян к черепахам Caretta и гробницам Ликии",
                "Треккинг-сопровождение по этапам Ликийской тропы (Lycian Way)"
            ],
            en: [
                "Tandem Paragliding from Babadağ over Oludeniz with Go-Pro photos/videos",
                "White-water rafting along the Dalaman River canyon featuring riverside lunch",
                "Jeep safari adventures through Saklikent Gorge and ancient Tlos ruins",
                "River boat tours to Dalyan mud baths, Lycian tombs, and Iztuzu turtle beach",
                "Guided day-hikes along scenic stretches of the historic Lycian Way"
            ],
            de: [
                "Tandem-Paragliding über Ölüdeniz mit professionellem Piloten und Fotos",
                "Wildwasser-Rafting im Dalaman-Canyon inkl. Picknick am Fluss",
                "Jeep-Safari durch die Saklıkent-Schlucht und zu den Ruinen von Tlos",
                "Flussboot-Touren in Dalyan zu Schlammbädern und Meeresschildkröten",
                "Geführte Tageswanderungen auf dem historischen Lykischen Weg"
            ],
            tr: [
                "Profesyonel pilot eşliğinde Babadağ'dan Ölüdeniz tandem yamaç paraşütü",
                "Dalaman Çayı kanyonunda nehir kenarı öğle yemeği dahil heyecanlı rafting",
                "Saklıkent Kanyonu ve antik Tlos harabelerini kapsayan Jeep safari turları",
                "Dalyan çamur banyoları, kral mezarları ve İztuzu plajı nehir turu",
                "Tarihi Likya Yolu'nun en manzaralı etaplarında rehberli doğa yürüyüşleri"
            ]
        },
        priceNote: {
            ru: "Ориентировочные цены 2026: Параглайдинг в Олюденизе (~90-120 EUR), Рафтинг на реке Даламан (~40-55 EUR), Экскурсия в Дальян (~35-45 EUR).",
            en: "Estimated 2026 rates: Oludeniz Paragliding (~€90-120), Dalaman River Rafting (~€40-55), Dalyan Boat Excursion (~€35-45).",
            de: "Richtpreise 2026: Paragliding in Ölüdeniz (~90-120 €), Rafting am Dalaman-Fluss (~40-55 €), Dalyan Bootsausflug (~35-45 €).",
            tr: "Tahmini 2026 fiyatları: Ölüdeniz Yamaç Paraşütü (~90-120 €), Dalaman Nehir Rafting (~40-55 €), Dalyan Nehir Turu (~35-45 €)."
        },
        guides: [
            { slug: "events-and-festivals-calendar", label: { ru: "Календарь фестивалей и ярких событий региона", en: "Regional Events & Cultural Festival Calendar", de: "Veranstaltungen & Kulturkalender der Region", tr: "Bölgesel Etkinlik ve Festival Takvimi" } },
            { slug: "guides-and-travel-agencies", label: { ru: "Как выбрать проверенного гида и агентство", en: "Selecting Verified Guides & Tour Agencies", de: "Auswahl zuverlässiger Reiseleiter & Agenturen", tr: "Güvenilir Rehber ve Seyahat Acentesi Seçimi" } }
        ],
        heroBg: "/api/images/locations/fethiye/beach/belcekiz/belcekiz2.jpg"
    },
    "real-estate": {
        title: {
            ru: "Недвижимость, Покупка и Долгосрочная Аренда",
            en: "Real Estate, Property Investment, and Long-Term Rentals",
            de: "Immobilien, Kauf und langfristige Vermietung",
            tr: "Gayrimenkul, Konut Yatırımı ve Uzun Dönem Kiralama"
        },
        desc: {
            ru: "Инвестиции в виллы и апартаменты на Бирюзовом побережье Турции. Обзор районов Фетхие, Гёджека, Каша и Кёйджегиза: юридическое сопровождение, ВНЖ по недвижимости и налоговые нюансы.",
            en: "Invest in Mediterranean luxury villas and sea-view apartments along the Turquoise Coast. Comprehensive insights into Fethiye, Göcek, Kaş, and Köyceğiz property markets, residence permit (`Ikamat`) regulations, and legal protection.",
            de: "Investieren Sie in Villen und Meerblick-Wohnungen an der Türkischen Riviera. Umfassender Überblick über Fethiye, Göcek, Kaş und Köyceğiz: rechtliche Begleitung, Aufenthaltstitel (Ikamat) und Steuern.",
            tr: "Turkuaz Kıyılarda lüks villa ve deniz manzaralı daire yatırımları. Fethiye, Göcek, Kaş ve Köyceğiz gayrimenkul pazarı, ikametgah prosedürleri ve hukuki danışmanlık rehberliği."
        },
        features: {
            ru: [
                "Подбор вилл и апартаментов от лицензированных застройщиков и агентств",
                "Юридическая экспертиза чистоты сделки и получение Тапу (Tapu)",
                "Помощь в оформлении ВНЖ (Икамет) и гражданства Турции за инвестиции",
                "Управление недвижимостью и сдача в краткосрочную аренду",
                "Анализ доходности районов (ROI) и ликвидности объектов"
            ],
            en: [
                "Curated villa and apartment portfolio from licensed regional developers",
                "Full due diligence and title deed (`Tapu`) acquisition assistance",
                "Guidance on Residence Permits (`Ikamat`) and Citizenship-by-Investment",
                "Property management and high-yield holiday rental services",
                "Comprehensive ROI and liquidity analysis across coastal municipalities"
            ],
            de: [
                "Geprüftes Immobilienportfolio von lizenzierten Bauträgern und Maklern",
                "Rechtliche Prüfung des Eigentumstitels (Tapu) und Notarbegleitung",
                "Unterstützung bei Aufenthaltserlaubnis (Ikamat) und Staatsbürgerschaft",
                "Immobilienverwaltung und Vermietungs-Management für Ferienobjekte",
                "Detaillierte Renditeanalyse (ROI) der verschiedenen Küstenregionen"
            ],
            tr: [
                "Lisanslı geliştiricilerden ve emlak ofislerinden seçkin villa/daire portföyü",
                "Tapu devir işlemleri, ekspertiz ve tam hukuki güvence desteği",
                "İkamet izni ve Yatırım Yoluyla Vatandaşlık süreçlerinde danışmanlık",
                "Gayrimenkul yönetimi ve yüksek getirili sezonluk kiralama hizmetleri",
                "Bölgesel gayrimenkul değer artış ve amortisman analizi"
            ]
        },
        priceNote: {
            ru: "Ориентировочные цены 2026: Апартаменты 1+1 в Фетхие/Чалыш (от ~120,000 EUR), Вилла с бассейном в Оваджике/Хисароню (от ~280,000 EUR), Люкс-вилла в Гёджеке или Каше (от ~600,000 EUR).",
            en: "Estimated 2026 benchmarks: 1+1 Apartments in Fethiye/Çalış (from ~€120,000), Private pool villas in Ovacık/Hisarönü (from ~€280,000), Luxury stone villas in Göcek or Kaş (from ~€600,000).",
            de: "Richtpreise 2026: 1+1 Wohnungen in Fethiye/Çalış (ab ~120.000 €), Villen mit Pool in Ovacık/Hisarönü (ab ~280.000 €), Luxusvillen in Göcek oder Kaş (ab ~600.000 €).",
            tr: "Tahmini 2026 referansları: Fethiye/Çalış 1+1 daireler (~120.000 €'dan başlar), Ovacık/Hisarönü havuzlu villalar (~280.000 €'dan başlar), Göcek veya Kaş lüks villalar (~600.000 €'dan başlar)."
        },
        guides: [
            { slug: "real-estate", label: { ru: "Пошаговый гид по покупке недвижимости и оформлению Тапу", en: "Step-by-Step Property Purchasing & Tapu Guide", de: "Schritt-für-Schritt Leitfaden zum Immobilienkauf & Tapu", tr: "Adım Adım Gayrimenkul Satın Alma ve Tapu Rehberi" } },
            { slug: "accommodation", label: { ru: "Где остановиться: обзор районов и типов жилья", en: "Where to Stay: Regional Neighborhoods & Housing Types", de: "Wo übernachten: Stadtteile und Unterkunftsarten", tr: "Nerede Kalınır: Bölge ve Konaklama Türleri İncelemesi" } }
        ],
        heroBg: "/api/images/locations/kas/ruines/kekova/kekova.jpg"
    },
    "hotels": {
        title: {
            ru: "Отели, Апартаменты и Частные Виллы с Бассейном",
            en: "Hotels, Apartments, and Private Pool Villas",
            de: "Hotels, Ferienwohnungen und Luxusvillen mit Pool",
            tr: "Oteller, Daireler ve Özel Havuzlu Villalar"
        },
        desc: {
            ru: "Бронирование жилья на Бирюзовом побережье Турции: 100% легальные турецкие тарифы через официальный шлюз Otelz.com без предоплаты на картах, а также международное бронирование и прямая связь с владельцами бутик-отелей и вилл.",
            en: "Accommodation booking across Turkey's Turquoise Coast: 100% legal domestic rates via official partner Otelz.com (pay at hotel with zero credit card block), plus international Booking.com gateways and direct boutique villa inquiries.",
            de: "Unterkunftsbuchung an der Türkischen Riviera: 100% legale Inlandsraten über den offiziellen Partner Otelz.com (Bezahlung im Hotel ohne Kreditkartenblockade) sowie internationale Gateways und direkte Buchung von Luxusvillen.",
            tr: "Turkuaz Kıyılarda konaklama rezervasyonu: Otelz.com resmi partnerliği ile otelde ödeme imkanı, uluslararası arama şebekesi ve komisyonsuz doğrudan butik villa kiralama rehberi."
        },
        features: {
            ru: [
                "100% соответствие Закону № 1618 (TÜRSAB) для бронирования внутри Турции",
                "Опция «Оплата при заселении» через официальный шлюз Otelz.com",
                "Лучшие бутик-отели и виллы в Фетхие, Гёчеке, Сарыгерме и Каше",
                "Прямая связь в WhatsApp с консьержем по аренде вилл без комиссии",
                "Интерактивный расчет стоимости проживания с учетом сезонных скидок"
            ],
            en: [
                "100% compliance with Turkish Law No. 1618 for local Turkey bookings",
                "'Pay at Check-in' options via official Turkey partner Otelz.com",
                "Handpicked luxury pool villas and boutique hotels across Fethiye, Göcek, & Kaş",
                "Direct WhatsApp concierge inquiries with property owners (no OTA commission)",
                "Interactive live accommodation price estimation with duration discounts"
            ],
            de: [
                "100% Übereinstimmung mit dem türkischen Gesetz Nr. 1618 für Inlandsbuchungen",
                "Option 'Zahlen bei Ankunft' über den offiziellen Partner Otelz.com",
                "Ausgewählte Luxusvillen und Boutique-Hotels in Fethiye, Göcek & Kaş",
                "Direkter WhatsApp-Kontakt zu Villenbesitzern (keine OTA-Provision)",
                "Interaktive Preisberechnung mit Langzeitrabatten"
            ],
            tr: [
                "Türkiye içi rezervasyonlar için 1618 Sayılı TÜRSAB Kanununa %100 uygunluk",
                "Otelz.com resmi partnerliği ile 'Otelde Ödeme' ve ön ödemesiz rezervasyon",
                "Fethiye, Göcek, Sarıgerme ve Kaş'ta seçkin havuzlu villa ve butik otel portföyü",
                "Platform komisyonu olmadan ev sahipleriyle doğrudan WhatsApp iletişimi",
                "Uzun dönem konaklama indirimleri sunan canlı fiyat hesaplama motoru"
            ]
        },
        priceNote: {
            ru: "Ориентиры сезона 2026: Апартаменты у моря 1+1 (от €45/ночь), Бутик-отель 4★ с завтраком (от €95/ночь), 5★ Ultra All-Inclusive в Сарыгерме (от €210/ночь), Частная люкс-вилла 3+1 с бассейном в Гёчеке (от €320/ночь).",
            en: "2026 Season Benchmarks: Beachside 1+1 apartments (from €45/night), 4★ Boutique hotels with breakfast (from €95/night), 5★ Ultra All-Inclusive in Sarıgerme (from €210/night), Private pool 3+1 luxury villas in Göcek (from €320/night).",
            de: "Richtpreise 2026: Strandnahe 1+1 Wohnungen (ab 45 €/Nacht), 4★ Boutique-Hotels mit Frühstück (ab 95 €/Nacht), 5★ Ultra All-Inclusive (ab 210 €/Nacht), Luxusvillen mit Pool in Göcek (ab 320 €/Nacht).",
            tr: "2026 Sezonu Referansları: Sahile yakın 1+1 daireler (45 €/gece'den başlar), Kahvaltılı 4★ Butik oteller (95 €/gece), Sarıgerme'de 5★ Ultra Her Şey Dahil (210 €/gece), Göcek'te özel havuzlu lüks villalar (320 €/gece)."
        },
        guides: [
            { slug: "accommodation", label: { ru: "Где остановиться на Бирюзовом побережье: гид по курортам", en: "Where to Stay on the Turquoise Coast: Resort Guide", de: "Wo übernachten an der Türkischen Riviera", tr: "Turkuaz Kıyılarda Nerede Kalınır: Bölge Rehberi" } },
            { slug: "real-estate", label: { ru: "Инвестиции в недвижимость и покупка вилл в Турции", en: "Property Investment & Buying Villas in Turkey", de: "Immobilienkauf und Investitionen in der Türkei", tr: "Türkiye'de Gayrimenkul Yatırımı ve Villa Satın Alma" } }
        ],
        heroBg: "/api/images/locations/kas/ruines/kekova/kekova.jpg"
    },
    "tuna-fishing": {
        title: {
            ru: "Трофейная Морская Рыбалка на Тунца и Хищника",
            en: "Deep-Sea Big Game Tuna & Sport Fishing Charters",
            de: "Hochseefischen auf Thunfisch & Big Game Fishing",
            tr: "Açık Deniz Orkinos (Ton Balığı) ve Sportif Balıkçılık"
        },
        desc: {
            ru: "Азартная трофейная рыбалка в открытом море напротив Гёджека, Фетхие и Каша. Охота на синеперого тунца (Bluefin Tuna), амберджека и дорадо с профессиональной командой и эхолотами.",
            en: "Thrilling deep-sea big game fishing across the Mediterranean drops off Göcek, Fethiye, and Kaş. Target giant Bluefin Tuna, Amberjack, and Mahi-Mahi equipped with tournament-grade tackle and sonar.",
            de: "Spannendes Hochseefischen im offenen Mittelmeer vor Göcek, Fethiye und Kaş. Jagd auf Blauflossen-Thunfisch (Bluefin), Bernsteinmakrele und Goldbrasse mit professioneller Ausrüstung.",
            tr: "Göcek, Fethiye ve Kaş açıklarındaki derin sularda heyecan verici sportif balıkçılık turları. Son teknoloji sonar ve profesyonel takımlarla Mavi Yüzgeçli Orkinos, Akya ve Lambuka avı."
        },
        features: {
            ru: [
                "Специализированые скоростные катера с сонарами и даунриггерами",
                "Опытные капитаны, знающие пути миграции тунца в Эгейском море",
                "Предоставление снастей класса Shimano/Penn Tiagra Big Game",
                "Утренние и вечерние выходы (полный или полдня)",
                "Возможность приготовить пойманный трофей в ресторане марины"
            ],
            en: [
                "Custom sport-fishing boats equipped with advanced sonar and downriggers",
                "Expert captains with deep knowledge of seasonal Mediterranean tuna migration",
                "High-end Shimano & Penn Tiagra Big Game rods and reels provided",
                "Flexible half-day (morning/sunset) or full-day offshore charters",
                "Option to have your fresh catch professionally cooked at a marina restaurant"
            ],
            de: [
                "Spezialisierte Angelboote mit modernster Sonar- und Echolot-Technik",
                "Erfahrene Kapitäne mit Kenntnis der Thunfisch-Wanderrouten im Ägäischen Meer",
                "Bereitstellung von professionellem Shimano & Penn Tiagra Angelgerät",
                "Halbtages- oder Ganztages-Touren auf dem offenen Meer",
                "Möglichkeit, den frisch gefangenen Fisch im Marina-Restaurant zubereiten zu lassen"
            ],
            tr: [
                "Gelişmiş sonar ve sırtı sistemlerine sahip özel donanımlı sürat tekneleri",
                "Akdeniz orkinos göç yollarını iyi bilen tecrübeli yerel kaptanlar",
                "Shimano ve Penn Tiagra üst düzey Big Game balık avı takımları",
                "Yarım gün (gündoğumu/günbatımı) veya tam gün açık deniz tur seçenekleri",
                "Tutulan balığı marina restoranlarında şeflere özel olarak pişirtme imkanı"
            ]
        },
        priceNote: {
            ru: "Ориентировочные цены 2026: Индивидуальный выход на катере (до 4-5 человек, 5 часов ~400-550 EUR, полный день на тунца ~700-900 EUR).",
            en: "Estimated 2026 rates: Private sport-fishing charter (up to 4-5 anglers, 5 hours ~€400-550, full-day big game tuna expedition ~€700-900).",
            de: "Richtpreise 2026: Privater Charter (bis 4-5 Personen, 5 Stunden ~400-550 €, Ganztages-Thunfisch-Expedition ~700-900 €).",
            tr: "Tahmini 2026 fiyatları: Özel balık avı teknesi (4-5 kişiye kadar, 5 saatlik tur ~400-550 €, tam gün orkinos avı ~700-900 €)."
        },
        guides: [
            { slug: "diving-and-tuna-fishing", label: { ru: "Подробный гид по подводной охоте и рыбалке в регионе", en: "Detailed Spearfishing & Sport Fishing Guide", de: "Ausführlicher Leitfaden zum Fischen & Unterwasserjagd", tr: "Detaylı Sportif Balıkçılık ve Zıpkın Avı Rehberi" } },
            { slug: "yachting", label: { ru: "Аренда яхт и морские прогулки", en: "Yacht Charters & Private Boat Excursions", de: "Yachtcharter & Bootsausflüge", tr: "Yat Kiralama ve Özel Tekne Gezileri" } }
        ],
        heroBg: "/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg"
    },
    pharmacies: {
        title: {
            ru: "Аптеки (`Eczane`), Медицина и Дежурные Аптеки 24/7",
            en: "Pharmacies (`Eczane`), Medical Care, and On-Duty Pharmacies 24/7",
            de: "Apotheken (`Eczane`), medizinische Versorgung und Notdienst 24/7",
            tr: "Eczaneler, Sağlık Hizmetleri ve 7/24 Nöbetçi Eczaneler"
        },
        desc: {
            ru: "В Турции аптеки обозначены большим красным знаком «Eczane». Здесь можно приобрести качественные европейские и турецкие медикаменты по строгим государственным ценам без риска подделок.",
            en: "In Turkey, pharmacies are easily recognized by the prominent red `Eczane` sign. Turkish pharmacies sell high-quality European and local medications strictly regulated by government pricing, eliminating counterfeit risks.",
            de: "In der Türkei sind Apotheken an dem großen roten Schild `Eczane` zu erkennen. Hier erhalten Sie hochwertige europäische und türkische Medikamente zu staatlich festgelegten Preisen ohne Fälschungsrisiko.",
            tr: "Türkiye'de eczaneler kırmızı `Eczane` tabelası ile kolayca tanınır. Devlet tarafından belirlenen karekodlu ve sıkı denetimli fiyatlarla yüksek kaliteli yerli ve ithal ilaç temin edebilirsiniz."
        },
        features: {
            ru: [
                "Стандартные часы работы аптек: Пн-Сб с 09:00 до 19:00 (Воскресенье — выходной)",
                "В нерабочее время, ночью и по воскресеньям работают дежурные аптеки (Nöbetçi Eczane)",
                "Многие препараты (анальгетики, антигистаминные, мази) продаются без рецепта",
                "Фармацевты в туристических зонах Фетхие, Мармариса и Каша говорят по-английски",
                "Вызов скорой медицинской помощи в Турции по номеру: 112 (бесплатно)"
            ],
            en: [
                "Standard pharmacy operating hours: Mon-Sat 09:00–19:00 (Closed on Sundays)",
                "Outside hours, nights, and Sundays, designated on-duty pharmacies (`Nöbetçi Eczane`) operate 24/7",
                "Many common medications (painkillers, antihistamines, skin creams) are available over-the-counter",
                "Pharmacists in Fethiye, Marmaris, and Kaş resort centers speak proficient English",
                "Emergency medical ambulance number in Turkey across all regions: 112 (Free)"
            ],
            de: [
                "Reguläre Öffnungszeiten: Mo-Sa 09:00–19:00 Uhr (Sonntags geschlossen)",
                "Außerhalb der Geschäftszeiten und nachts sind Notdienstapotheken (Nöbetçi Eczane) 24/7 geöffnet",
                "Viele gängige Medikamente (Schmerzmittel, Antiallergika, Salben) sind rezeptfrei erhältlich",
                "Apotheker in Fethiye, Marmaris und Kaş sprechen meist gutes Englisch",
                "Notruf für Rettungsdienst und Notarzt in der Türkei: 112 (gebührenfrei)"
            ],
            tr: [
                "Standart çalışma saatleri: Pazar günleri hariç Pazartesi-Cumartesi 09:00–19:00",
                "Gece, pazar ve resmi tatillerde 7/24 hizmet veren Nöbetçi Eczane (`Nöbetçi Eczane`) sistemi geçerlidir",
                "Birçok temel sağlık ürünü ve güneş sonrası bakım kremleri kolayca temin edilebilir",
                "Turistik bölgelerdeki eczacılar yabancı misafirlere çok dilli danışmanlık sağlar",
                "Türkiye genelinde acil sağlık ve ambulans hattı: 112 (Ücretsiz)"
            ]
        },
        priceNote: {
            ru: "Официальный реестр дежурных аптек провинции Мугла (Даламан, Фетхие, Мармарис, Датча): обновляется ежедневно в 19:00.",
            en: "Official Muğla Province On-Duty Pharmacy Registry (Dalaman, Fethiye, Marmaris, Datça): updated daily at 19:00.",
            de: "Offizielles Verzeichnis der Notdienstapotheken in der Provinz Muğla (Dalaman, Fethiye, Marmaris): täglich um 19:00 Uhr aktualisiert.",
            tr: "Muğla Eczacı Odası Nöbetçi Eczane Resmi Listesi (Dalaman, Fethiye, Marmaris, Datça vb.): her gün saat 19:00'da güncellenir."
        },
        externalLink: {
            url: "https://www.muglaeo.org.tr/nobetci-eczaneler",
            label: {
                ru: "Открыть официальный список дежурных аптек (Muğla Eczacı Odası)",
                en: "Open Official On-Duty Pharmacy Roster (Muğla Pharmacists Association)",
                de: "Offizielle Liste der Notdienstapotheken öffnen (Apothekerkammer Muğla)",
                tr: "Resmi Nöbetçi Eczaneler Listesini Aç (Muğla Eczacı Odası)"
            }
        },
        guides: [
            { slug: "useful-contacts", label: { ru: "Экстренные телефоны, больницы и полезные контакты", en: "Emergency Numbers, Hospitals, and Useful Contacts", de: "Notrufnummern, Krankenhäuser und wichtige Kontakte", tr: "Acil Telefonlar, Hastaneler ve Faydalı İletişim Bilgileri" } },
            { slug: "climate-and-seasons", label: { ru: "Советы по защите от солнца и акклиматизации", en: "Sun Protection & Summer Weather Acclimatization Tips", de: "Sonnenschutz- und Akklimatisierungstipps", tr: "Güneş Koruma ve Yaz Sıcaklığı İpuçları" } }
        ],
        heroBg: "/dalaman1.jpg"
    },
    contacts: {
        title: {
            ru: "Контакты, Обратная Связь и Сотрудничество",
            en: "Contact Us, Editorial Feedback, and Partnership",
            de: "Kontakt, Feedback und Zusammenarbeit",
            tr: "İletişim, Geri Bildirim ve İşbirliği"
        },
        desc: {
            ru: "Редакция портала «Дача — Каш» (dalaman.info) всегда открыта для обратной связи от туристов, местных жителей и туристических агентств. Мы помогаем сделать ваш отдых на Бирюзовом побережье безупречным.",
            en: "The editorial team of the Turquoise Coast Guide (`dalaman.info`) is dedicated to supporting independent travelers, local businesses, and tour agencies. Connect with us for guide verifications, advertising, or regional feedback.",
            de: "Die Redaktion von `dalaman.info` steht Reisenden, Einheimischen und Partnern gerne zur Verfügung. Kontaktieren Sie uns für Feedback, Korrekturen oder Kooperationen an der Türkischen Riviera.",
            tr: "`dalaman.info` Turkuaz Kıyılar rehber editör ekibi, misafirlerin, yerel işletmelerin ve acentelerin geri bildirimlerine her zaman açıktır. Bölge bilgileri, reklam ve işbirliği için bizimle iletişime geçin."
        },
        features: {
            ru: [
                "Электронная почта редакции: info@dalaman.info",
                "Локальная координация и проверка данных: Даламан, Фетхие, Каш",
                "Сотрудничество с лицензированными трансферными компаниями и яхт-клубами",
                "Размещение проверенных объектов недвижимости и отелей в каталоге",
                "Открытая линия для сообщения об изменениях в расписании паромов и автобусов"
            ],
            en: [
                "Official editorial inquiry email: info@dalaman.info",
                "On-the-ground regional verification: Dalaman, Fethiye, Kaş, and Marmaris",
                "Partnership opportunities for licensed TURSAB agencies and yacht marinas",
                "Curated listing applications for high-end villas and boutique hotels",
                "Open community line for updating ferry schedules and bus timetable changes"
            ],
            de: [
                "Offizielle Redaktions-E-Mail: info@dalaman.info",
                "Lokale Datenüberprüfung vor Ort: Dalaman, Fethiye, Kaş und Marmaris",
                "Kooperationen für lizenzierte TURSAB-Agenturen und Yacht-Marinas",
                "Aufnahmeanträge für ausgewählte Ferienvillen und Boutique-Hotels",
                "Meldekanal für Fahrplanänderungen bei Fähren und Bussen"
            ],
            tr: [
                "Resmi editör ve iletişim e-posta adresi: info@dalaman.info",
                "Bölgesel saha doğrulaması: Dalaman, Fethiye, Kaş ve Marmaris merkezleri",
                "TÜRSAB lisanslı acenteler ve yat marinaları için işbirliği fırsatları",
                "Seçkin villa ve butik oteller için rehberde yer alma başvuruları",
                "Feribot ve otobüs saat değişikliklerini bildirim için açık iletişim kanalı"
            ]
        },
        priceNote: {
            ru: "Время ответа редакции: обычно в течение 24 часов в рабочие дни.",
            en: "Editorial response timeframe: typically within 24 business hours.",
            de: "Antwortzeit der Redaktion: in der Regel innerhalb von 24 Werktagsstunden.",
            tr: "Editör ekibi geri dönüş süresi: genellikle 24 iş saati içerisinde."
        },
        guides: [
            { slug: "useful-contacts", label: { ru: "Справочник экстренных телефонов и служб Турции", en: "National Emergency Directory & Public Services", de: "Verzeichnis der Notrufnummern und Behörden", tr: "Ulusal Acil Numaralar ve Kamu Hizmetleri Rehberi" } },
            { slug: "guides-and-travel-agencies", label: { ru: "Сотрудничество для гидов и туристических агентств", en: "Partnership Guide for Local Agencies & Tour Operators", de: "Partner-Leitfaden für Reiseleiter & Agenturen", tr: "Yerel Acenteler ve Rehberler İçin İşbirliği Bilgileri" } }
        ],
        heroBg: "/hero-bg.jpg"
    },
    "dalaman-guide": {
        title: {
            ru: "Главный Гид по Региону Даламан и Бирюзовому Побережью",
            en: "Master Guide to Dalaman Region & Turkey's Turquoise Coast",
            de: "Hauptleitfaden für die Region Dalaman & die Türkische Riviera",
            tr: "Dalaman Bölgesi ve Turkuaz Kıyılar Ana Rehberi"
        },
        desc: {
            ru: "Ваш путеводитель по самому красивому побережью Турции: от античных гробниц Ликии в Дальяне и бирюзовых лагун Олюдениза до богемного Каша и сосновых бухт Мармариса.",
            en: "Your definitive portal to Turkey's most breathtaking coastline: from ancient Lycian rock tombs in Dalyan and the blue lagoon of Oludeniz to bohemian Kaş and the pine-scented bays of Marmaris.",
            de: "Ihr ultimativer Wegweiser zur schönsten Küste der Türkei: von antiken Felsengräbern in Dalyan und der Blauen Lagune von Ölüdeniz bis ins böhmische Kaş und zu den Pinienbuchten von Marmaris.",
            tr: "Türkiye'nin en nefes kesici sahil şeridine açılan rehberiniz: Dalyan'daki antik Likya kaya mezarları ve Ölüdeniz lagününden bohem Kaş ve Marmaris'in çam kokulu koylarına kadar."
        },
        features: {
            ru: [
                "8 главных курортных центров: Даламан, Гёджек, Фетхие, Дальян, Кёйджегиз, Мармарис, Датча, Каш",
                "Более 80 проверенных статей с реальными фотографиями и GPS-координатами",
                "Многоязычная поддержка: все материалы на русском, английском, немецком и турецком",
                "Щит от инфляции: актуализация цен в лирах и ориентиры в твердой валюте на 2026 год",
                "Интерактивные карты пляжей, античных руин и маршрутов Ликийской тропы"
            ],
            en: [
                "8 major destination hubs: Dalaman, Göcek, Fethiye, Dalyan, Köyceğiz, Marmaris, Datça, and Kaş",
                "Over 80 rigorously researched articles complete with authentic local imagery and coordinates",
                "Full 4-language localization: Russian, English, German, and Turkish without machine shortcuts",
                "Inflation Shield: regularly reviewed pricing benchmarks and hard currency references for 2026",
                "Comprehensive coverage of beaches, historical ruins, and Lycian Way trekking itineraries"
            ],
            de: [
                "8 Hauptrheiseziele: Dalaman, Göcek, Fethiye, Dalyan, Köyceğiz, Marmaris, Datça und Kaş",
                "Über 80 recherchierte Artikel mit authentischen lokalen Fotos und Koordinaten",
                "Vollständige Viersprachigkeit: Deutsch, Englisch, Russisch und Türkisch auf Top-Niveau",
                "Inflationsschutz: regelmäßig überprüfte Preisrichtwerte und Euro-Referenzen für 2026",
                "Umfassende Übersicht über Strände, antike Ruinen und die Etappen des Lykischen Weges"
            ],
            tr: [
                "8 ana tatil merkezi: Dalaman, Göcek, Fethiye, Dalyan, Köyceğiz, Marmaris, Datça ve Kaş",
                "Otantik yerel fotoğraflar ve koordinatlarla donatılmış 80'den fazla detaylı rehber makalesi",
                "Tam 4 dilli yerelleştirme: Türkçe, İngilizce, Almanca ve Rusça dillerinde eksiksiz içerik",
                "Enflasyon Koruması: 2026 sezonu için güncel fiyat referansları ve bütçe planlama rehberi",
                "Plajlar, antik kentler ve Likya Yolu yürüyüş rotalarının kapsamlı haritalandırılması"
            ]
        },
        priceNote: {
            ru: "Вход на портал и доступ ко всей базе знаний абсолютно бесплатны для всех путешественников.",
            en: "Access to our complete knowledge base and digital guides is 100% free for all independent travelers.",
            de: "Der Zugang zur gesamten Wissensdatenbank und zu den Reiseführern ist für alle Reisenden zu 100% kostenlos.",
            tr: "Tüm bilgi bankamıza ve dijital rehberlerimize erişim, bağımsız gezginler için %100 ücretsizdir."
        },
        guides: [
            { slug: "climate-and-seasons", label: { ru: "Климат и погода по месяцам: когда лучше ехать", en: "Climate & Seasons: Best Time by Month", de: "Klima & Jahreszeiten: Beste Reisezeit", tr: "İklim ve Mevsimler: Aydan Aya En İyi Ziyaret Zamanı" } },
            { slug: "airport-dalaman", label: { ru: "Аэропорт Даламан (DLM): терминалы и трансферы", en: "Dalaman Airport (DLM): Terminals & Transport Hub", de: "Flughafen Dalaman (DLM): Terminals & Anreise", tr: "Dalaman Havalimanı (DLM): Terminal ve Ulaşım Rehberi" } }
        ],
        heroBg: "/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg"
    },
    "city-guide/small-towns": {
        title: {
            ru: "Малые Города и Уединенные Поселки Побережья",
            en: "Charming Small Towns and Hidden Coastal Villages",
            de: "Malerische Kleinstädte und verborgene Küstendörfer",
            tr: "Şirin Sahil Kasabaları ve Saklı Ege Köyleri"
        },
        desc: {
            ru: "Вдали от шумных отелей: откройте аутентичное очарование Акиaka, Селимиye, Турунча, Бозбуруна, Оваджика и тихих рыбацких деревень полуострова Датча.",
            en: "Step away from crowded resorts: discover the authentic Aegean charm of Akyaka, Selimiye, Turunç, Bozburun, Ovacık, and peaceful fishing hamlets across the Datça Peninsula.",
            de: "Abseits der großen Resorts: Entdecken Sie den authentischen Charme von Akyaka, Selimiye, Turunç, Bozburun, Ovacık und ruhigen Fischerdörfern auf der Halbinsel Datça.",
            tr: "Kalabalık tatil köylerinden uzakta: Akyaka, Selimiye, Turunç, Bozburun, Ovacık ve Datça Yarımadası'nın huzurlu balıkçı köylerinin otantik Ege cazibesini keşfedin."
        },
        features: {
            ru: [
                "Акьяка (Akyaka): столица кайт-серфинга с уникальной османской архитектурой и рекой Азмак",
                "Селимие и Бозбурун (Selimiye & Bozburun): уютные бухты, яхты и лучшие рыбные рестораны",
                "Турунч (Turunç): тихая бухта с Голубым флагом в окружении сосновых гор недалеко от Мармариса",
                "Оваджик и Хисароню (Ovacık & Hisarönü): горный свежий воздух над Олюденизом и старт Ликийской тропы",
                "Старая Датча (Eski Datça): каменные улочки, бугенвиллии и миндальные сады поэта Джана Yücel"
            ],
            en: [
                "Akyaka: famous kite-surfing capital known for traditional Ottoman woodwork architecture and Azmak River",
                "Selimiye & Bozburun: boutique harbors renowned for crystal coves, wooden gulet building, and seafood",
                "Turunç: peaceful Blue Flag beach cove framed by dramatic pine hills just south of Marmaris",
                "Ovacık & Hisarönü: mountain breeze retreats above Oludeniz serving as the official start of the Lycian Way",
                "Old Datça (`Eski Datça`): bougainvillea-draped stone lanes and almond orchards celebrated by poet Can Yücel"
            ],
            de: [
                "Akyaka: berühmtes Kitesurf-Zentrum mit traditioneller Holzarchitektur und dem glasklaren Azmak-Fluss",
                "Selimiye & Bozburun: malerische Buchten, traditioneller Gulet-Bau und erstklassige Fischrestaurants",
                "Turunç: ruhige Blaue-Flagge-Bucht umgeben von Pinienbergen südlich von Marmaris",
                "Ovacık & Hisarönü: kühle Bergluft über Ölüdeniz und offizieller Startpunkt des Lykischen Weges",
                "Alt-Datça (Eski Datça): steinerne Gassen, Bougainvilleen und Mandelhaine des Dichters Can Yücel"
            ],
            tr: [
                "Akyaka: kendine özgü ahşap mimarisi, Azmak Nehri ve dünya çapındaki uçurtma sörfü (kitesurf) plajı",
                "Selimiye ve Bozburun: butik koylar, geleneksel gulet yapımı ve Ege'nin en seçkin deniz ürünleri restoranları",
                "Turunç: Marmaris'in hemen güneyinde çam ormanlarıyla çevrili huzurlu Mavi Bayraklı sahil kasabası",
                "Ovacık ve Hisarönü: Ölüdeniz üzerindeki serin dağ havası ve tarihi Likya Yolu'nun resmi başlangıç noktası",
                "Eski Datça: begonvillerle süslü taş sokaklar, badem bahçeleri ve şair Can Yücel'in edebi mirası"
            ]
        },
        priceNote: {
            ru: "В малых поселках преобладают бутик-отели, пансионы и апартаменты. Рекомендуется бронировать заранее на июль и август.",
            en: "Boutique hotels, family pensions, and villas predominate in smaller hamlets. Early reservation is highly advised for July and August.",
            de: "In kleineren Orten überwiegen Boutique-Hotels, Pensionen und Ferienhäuser. Für Juli und August wird eine frühzeitige Buchung empfohlen.",
            tr: "Küçük kasabalarda butik oteller, aile pansiyonları ve müstakil villalar yaygındır. Temmuz ve ağustos ayları için erken rezervasyon tavsiye edilir."
        },
        guides: [
            { slug: "ovacik-hisaronu", label: { ru: "Гид по Оваджику и Хисароню (Олюдениз)", en: "Ovacık & Hisarönü Mountain Resort Guide", de: "Ovacık & Hisarönü Leitfaden", tr: "Ovacık ve Hisarönü Yayla Tatili Rehberi" } },
            { slug: "gocek-guide", label: { ru: "Гёджек: элитный поселок и марины", en: "Göcek: Exclusive Marinas & Island Gateway", de: "Göcek: Exklusive Marinas & Inseln", tr: "Göcek: Seçkin Marinalar ve Koylar" } }
        ],
        heroBg: "/api/images/locations/dacha/ruine/knidos/knidos.jpg"
    }
};

interface ServiceLandingPageProps {
    serviceKey: string;
    locale: string;
}

const ServiceLandingPage = ({ serviceKey, locale }: ServiceLandingPageProps) => {
    const activeLocale = locale || 'en';
    const s = servicesRegistry[serviceKey] || servicesRegistry['contacts'];

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${activeLocale}${cleanPath}`;
    };

    const title = s.title[activeLocale] || s.title['en'];
    const desc = s.desc[activeLocale] || s.desc['en'];
    const features = s.features[activeLocale] || s.features['en'];
    const priceNote = s.priceNote[activeLocale] || s.priceNote['en'];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header locale={activeLocale} />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[440px] overflow-hidden flex items-center justify-center text-center px-4">
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src={s.heroBg}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="brightness-60 transform scale-105 transition-transform duration-1000"
                        />
                    </div>
                    {(s.heroBg.includes('/dalaman') || s.heroBg.includes('/hero-bg')) && (
                        <div className="absolute top-20 right-6 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black px-2.5 py-1 rounded border border-white/20 z-20 tracking-wider uppercase">
                            AI Placeholder / Сгенерировано ИИ
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-50 z-10" />

                    <div className="relative z-20 max-w-4xl mx-auto space-y-6 pt-12">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-black text-[11px] uppercase tracking-[0.3em] backdrop-blur-md shadow-lg">
                            <FaStar className="text-amber-400" /> SERVICED BY DALAMAN GUIDE
                        </span>
                        <h1 className="text-3xl md:text-6xl font-black text-white tracking-tight uppercase italic leading-tight drop-shadow-2xl">
                            {title}
                        </h1>
                        <p className="text-base md:text-xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                            {desc}
                        </p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="container mx-auto px-4 -mt-14 relative z-20 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Features List */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white rounded-[3rem] p-8 md:p-14 premium-shadow border border-white space-y-8">
                                <div className="flex items-center space-x-3 border-b border-slate-100 pb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-600/30">
                                        <FaCheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase italic">
                                            {activeLocale === 'ru' ? 'Ключевые преимущества и стандарты сервиса' : activeLocale === 'de' ? 'Wichtigste Vorteile & Service-Standards' : activeLocale === 'tr' ? 'Temel Avantajlar ve Hizmet Standartları' : 'Key Service Highlights & Standards'}
                                        </h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {features.map((feat, i) => (
                                        <div key={i} className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <FaCheckCircle className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                                            <span className="text-xs md:text-sm font-bold text-slate-700 leading-snug">
                                                {feat}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* TRANSFERS & CAR RENTAL SMART HUB INTEGRATION */}
                                {serviceKey === "transfers" && (
                                    <TransfersSmartHub locale={activeLocale} />
                                )}
                                {serviceKey === "car-rental" && (
                                    <CarRentalSmartHub locale={activeLocale} />
                                )}
                                {(serviceKey === "real-estate" || serviceKey === "hotels") && (
                                    <GeoSmartHotelHub locale={activeLocale} />
                                )}
                                {serviceKey === "yacht-rental" && (
                                    <YachtRentalSmartHub locale={activeLocale} />
                                )}
                                {serviceKey === "flights" && (
                                    <FlightsSmartHub locale={activeLocale} />
                                )}
                                {serviceKey === "excursions-tours" && (
                                    <ExcursionsSmartHub locale={activeLocale} />
                                )}

                                {/* Inflation Shield & Price Note */}
                                <div className="bg-amber-50 rounded-3xl p-6 md:p-8 border border-amber-200/60 flex items-start space-x-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                                        <FaShieldAlt size={20} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
                                            {activeLocale === 'ru' ? '💡 Защита от инфляции и ориентиры цен (2026)' : activeLocale === 'de' ? '💡 Inflationsschutz & Preisorientierung (2026)' : activeLocale === 'tr' ? '💡 Enflasyon Koruması ve Fiyat Rehberi (2026)' : '💡 Inflation Shield & 2026 Pricing Benchmarks'}
                                        </h4>
                                        <p className="text-xs md:text-sm text-amber-950 font-medium leading-relaxed">
                                            {priceNote}
                                        </p>
                                    </div>
                                </div>

                                {s.externalLink && (
                                    <div className="pt-4">
                                        <a 
                                            href={s.externalLink.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-full shadow-xl hover:shadow-rose-500/30 transition-all"
                                        >
                                            <FaExternalLinkAlt />
                                            <span>{(s.externalLink.label[activeLocale] || s.externalLink.label['en'])}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Aside Knowledge Base Links */}
                        <div className="lg:col-span-4 space-y-8 sticky top-28">
                            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/10 space-y-6">
                                <div className="flex items-center space-x-3 border-b border-white/10 pb-5">
                                    <FaBookOpen className="text-cyan-400" size={22} />
                                    <h3 className="text-base font-black uppercase tracking-wider italic">
                                        {activeLocale === 'ru' ? 'База Знаний по Теме' : activeLocale === 'de' ? 'Wissensdatenbank' : activeLocale === 'tr' ? 'İlgili Rehberler' : 'Curated Guide Hub'}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {s.guides.map((g, idx) => (
                                        <Link
                                            key={idx}
                                            href={localize(`/articles/${g.slug}`)}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-cyan-600/30 border border-white/10 transition-all group"
                                        >
                                            <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                                                {(g.label[activeLocale] || g.label['en'])}
                                            </span>
                                            <FaChevronRight size={12} className="text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-2" />
                                        </Link>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <Link
                                        href={localize('/dalaman')}
                                        className="block w-full py-3.5 bg-cyan-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full text-center hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/40"
                                    >
                                        {activeLocale === 'ru' ? '← Все курорты региона' : activeLocale === 'de' ? '← Alle Urlaubsorte' : activeLocale === 'tr' ? '← Tüm Tatil Beldeleri' : '← Explore All Resorts'}
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer locale={activeLocale} />
        </div>
    );
};

export default ServiceLandingPage;
