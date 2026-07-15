"use client";

import React, { useState } from "react";
import { 
    FaCarSide, FaBus, FaTaxi, FaWhatsapp, FaTelegramPlane, 
    FaClock, FaMapMarkerAlt, FaCheckCircle, FaShieldAlt, 
    FaInfoCircle, FaUsers, FaSuitcaseRolling, FaBabyCarriage 
} from "react-icons/fa";

interface TransferRoute {
    id: string;
    destination: {
        ru: string;
        en: string;
        de: string;
        tr: string;
    };
    distanceKm: number;
    travelTimeMinutes: number;
    // SOURCE [15.07.2026]: Официальные автобусные линии Muğla Büyükşehir Belediyesi (Muttaş / Havaş) из DLM (URL: https://www.muttas.com.tr/seferler/dalaman-havalimani)
    shuttlePriceTry: string;
    shuttlePriceEur: string;
    // SOURCE [15.07.2026]: Утвержденная таксомоторная сетка Dalaman Havalimanı Taksiciler Kooperatifi (URL: https://www.dalaman-airport.com/taksi.html) + UKOME Muğla (URL: https://www.mugla.bel.tr/ukome)
    taxiPriceEur: string;
    // SOURCE [15.07.2026]: Бенчмарк тарифов лицензированного трансфера TÜRSAB D2 Mercedes Vito (до 6 чел) по агрегаторам GetTransfer / Intui.travel (URL: https://gettransfer.com/ru/transfers/dalaman-airport/fethiye)
    vipMinivanEur: string;
    description: {
        ru: string;
        en: string;
        de: string;
        tr: string;
    };
}

// SOURCE [15.07.2026]: Сводная таблица тарифов 2026 года проверена по официальным реестрам UKOME Muğla (URL: https://www.mugla.bel.tr/ukome), сайту Dalaman Airport Taxi (URL: https://www.dalaman-airport.com/taksi.html) и сервису GetTransfer (URL: https://gettransfer.com).
const TRANSFERS_DATA_2026: TransferRoute[] = [
    {
        id: "fethiye",
        destination: {
            ru: "Фетхие / Чалыш / Олюдениз",
            en: "Fethiye / Çalış / Ölüdeniz",
            de: "Fethiye / Çalış / Ölüdeniz",
            tr: "Fethiye / Çalış / Ölüdeniz"
        },
        distanceKm: 45,
        travelTimeMinutes: 50,
        // SOURCE [15.07.2026]: Тариф Muttaş DLM -> Fethiye Otogar (URL: https://www.muttas.com.tr/seferler/dalaman-havalimani)
        shuttlePriceTry: "180 - 250 TRY",
        shuttlePriceEur: "~€5 - €7",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi Tariff DLM -> Fethiye (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "40 - 50 EUR",
        // SOURCE [15.07.2026]: VIP Minivan Mercedes Vito 6 pax via GetTransfer / local TÜRSAB fleets (URL: https://gettransfer.com)
        vipMinivanEur: "50 - 65 EUR",
        description: {
            ru: "Самое популярное направление. Автобусы Muttaş ходят под каждый прилетающий рейс до автовокзала Фетхие. Для Олюдениза или отелей с чемоданами VIP-минивэн экономит до 1.5 часов времени.",
            en: "Most requested route. Official Muttaş shuttle buses sync with every domestic flight to Fethiye Otogar. For Ölüdeniz resorts or heavy luggage, a private VIP minivan saves over 1.5 hours of transit.",
            de: "Beliebteste Strecke. Offizielle Muttaş-Busse fahren passend zu jedem Flug zum Busbahnhof Fethiye. Für Ölüdeniz oder mit viel Gepäck spart ein VIP-Minivan bis zu 1,5 Stunden.",
            tr: "En popüler güzergah. Resmi Muttaş servisleri iç hat uçuşlarına entegre olarak Fethiye Otogarına gider. Ölüdeniz otelleri ve valizli aileler için özel VIP transfer 1.5 saat zaman kazandırır."
        }
    },
    {
        id: "marmaris",
        destination: {
            ru: "Мармарис / Ичмелер / Турунч",
            en: "Marmaris / İçmeler / Turunç",
            de: "Marmaris / İçmeler / Turunç",
            tr: "Marmaris / İçmeler / Turunç"
        },
        distanceKm: 95,
        travelTimeMinutes: 80,
        // SOURCE [15.07.2026]: Тариф Havaş/Muttaş DLM -> Marmaris Otogar (URL: https://www.muttas.com.tr/seferler/dalaman-havalimani)
        shuttlePriceTry: "250 - 320 TRY",
        shuttlePriceEur: "~€7 - €9",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi DLM -> Marmaris (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "65 - 75 EUR",
        // SOURCE [15.07.2026]: GetTransfer VIP Minivan DLM -> Marmaris / İçmeler (URL: https://gettransfer.com)
        vipMinivanEur: "75 - 90 EUR",
        description: {
            ru: "Живописный маршрут через перевал Сакарgeçidi и эвкалиптовые аллеи. Автобус идет до автовокзала Мармариса, откуда до Ичмелера или Турунча требуется пересадка на долмуш или местное такси.",
            en: "Scenic drive crossing the Sakargeçidi pass and eucalyptus avenues. Shuttle bus terminates at Marmaris Otogar, requiring a secondary dolmuş or taxi transfer to reach İçmeler or Turunç.",
            de: "Malerische Fahrt über den Sakargeçidi-Pass und Eukalyptusalleen. Der Bus endet am Busbahnhof Marmaris, von wo aus ein Dolmuş oder Taxi nach İçmeler/Turunç nötig ist.",
            tr: "Sakar Geçidi ve okaliptüs yolları üzerinden panoramik yolculuk. Servis otobüsü Marmaris Otogarında biter; İçmeler veya Turunç için dolmuş veya yerel taksi aktarması gerekir."
        }
    },
    {
        id: "gocek",
        destination: {
            ru: "Гёчек / D-Marin / Яхтенные Марины",
            en: "Göcek / D-Marin / Yacht Marinas",
            de: "Göcek / D-Marin / Jachthäfen",
            tr: "Göcek / D-Marin / Yat Marinaları"
        },
        distanceKm: 22,
        travelTimeMinutes: 25,
        // SOURCE [15.07.2026]: Прямых автобусов Muttaş в Гёчек нет, только проходящие трассовые автобусы DLM -> Fethiye (URL: https://www.muttas.com.tr)
        shuttlePriceTry: "100 - 150 TRY",
        shuttlePriceEur: "~€3 - €4 (высадка на трассе)",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi DLM -> Göcek (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "25 - 30 EUR",
        // SOURCE [15.07.2026]: VIP Mercedes Vito DLM -> Göcek Marinas (URL: https://gettransfer.com)
        vipMinivanEur: "35 - 45 EUR",
        description: {
            ru: "Ближайшая яхтенная столица. Автобус Muttaş высаживает пассажиров только на верхней трассе D400 (Göcek Yol Ayrımı), откуда до марины с тяжелыми сумками идти неудобно. Индивидуальный трансфер подвозит прямо к пирсу.",
            en: "Closest yachting capital. Muttaş airport shuttle only drops off on the main D400 highway junction (Göcek Yol Ayrımı), making a private transfer essential when carrying sailing gear straight to the marina pier.",
            de: "Nächstgelegene Yachthafen-Hauptstadt. Der Muttaş-Bus hält nur an der D400-Hauptstraße. Ein Privat-Transfer bringt Sie und Ihr Gepäck direkt zum Steg der Marina.",
            tr: "En yakın yatçılık başkenti. Muttaş servisleri sadece D400 ana yol kavşağında (Göcek Yol Ayrımı) yolcu indirir; yelken eşyaları ve valizlerle marina iskelesine özel transfer şarttır."
        }
    },
    {
        id: "kas",
        destination: {
            ru: "Каш / Калкан / Патара",
            en: "Kaş / Kalkan / Patara",
            de: "Kaş / Kalkan / Patara",
            tr: "Kaş / Kalkan / Patara"
        },
        distanceKm: 140,
        travelTimeMinutes: 135,
        // SOURCE [15.07.2026]: Прямого шаттла из DLM в Каш нет, нужна пересадка в Фетхие (URL: https://www.muttas.com.tr + Bati Antalya bus)
        shuttlePriceTry: "350 - 450 TRY (2 пересадки)",
        shuttlePriceEur: "~€10 - €13",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi DLM -> Kaş (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "90 - 110 EUR",
        // SOURCE [15.07.2026]: VIP Mercedes Vito DLM -> Kaş / Kalkan (URL: https://gettransfer.com)
        vipMinivanEur: "110 - 135 EUR",
        description: {
            ru: "Удаленный богемный курорт с захватывающими прибрежными серпантинами. На общественном транспорте путь занимает 4+ часа с пересадкой на автовокзале Фетхие. Прямой VIP-трансфер — самый комфортный и безопасный выбор.",
            en: "Remote bohemian haven reached via breathtaking coastal serpentines. Public transit requires a 4+ hour journey with a layover at Fethiye Otogar. Direct VIP transfer guarantees smooth and safe arrival.",
            de: "Entfernter Bohème-Ort mit atemberaubenden Küsten-Serpentinen. Mit öffentlichen Bussen dauert die Fahrt über 4 Stunden (mit Umstieg in Fethiye). Ein VIP-Transfer ist die sicherste und bequemste Wahl.",
            tr: "Nefes kesen kıyı virajlarıyla ulaşılan bohem cennet. Toplu taşıma ile Fethiye Otogar aktarmalı yolculuk 4+ saat sürer. Doğrudan VIP transfer en konforlu ve güvenli seçenektir."
        }
    },
    {
        id: "datca",
        destination: {
            ru: "Датча / Эски Датча / Паламутбюкю",
            en: "Datça / Eski Datça / Palamutbükü",
            de: "Datça / Eski Datça / Palamutbükü",
            tr: "Datça / Eski Datça / Palamutbükü"
        },
        distanceKm: 160,
        travelTimeMinutes: 150,
        // SOURCE [15.07.2026]: Прямого шаттла из DLM в Датчу нет, пересадка в Мармарисе (URL: https://www.muttas.com.tr)
        shuttlePriceTry: "400 - 500 TRY (через Мармарис)",
        shuttlePriceEur: "~€12 - €15",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi DLM -> Datça (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "110 - 130 EUR",
        // SOURCE [15.07.2026]: VIP Mercedes Vito DLM -> Datça Peninsula (URL: https://gettransfer.com)
        vipMinivanEur: "130 - 150 EUR",
        description: {
            ru: "Заповедный полуостров миндальных рощ. Путь ведет через горный хребет за Мармарисом. Общественным транспортом ехать с 2 пересадками около 4.5 часов, поэтому прямой трансфер для семей является стандартом.",
            en: "Pristine peninsula of almond groves and turquoise coves beyond Marmaris. Public buses take ~4.5 hours across two transfers. Private door-to-door transfer is the gold standard for travelers.",
            de: "Unberührte Halbinsel der Mandelhaine hinter Marmaris. Mit öffentlichen Bussen (2 Umstiege) ca. 4,5 Stunden Fahrt. Privater Direktransfer ist der empfohlene Standard für Familien.",
            tr: "Badem bükleri ve bakir koylar yarımadası. Toplu taşıma ile Marmaris aktarmalı yaklaşık 4.5 saat sürer. Aileler ve konfor arayanlar için kapıdan kapıya özel transfer vazgeçilmezdir."
        }
    },
    {
        id: "dalyan",
        destination: {
            ru: "Дальян / Пляж Изтузу / Черепашьи Бухты",
            en: "Dalyan / İztuzu Beach / Turtle Sanctuary",
            de: "Dalyan / İztuzu-Strand / Schildkröten-Bucht",
            tr: "Dalyan / İztuzu Plajı / Caretta Bölgesi"
        },
        distanceKm: 30,
        travelTimeMinutes: 35,
        // SOURCE [15.07.2026]: Прямого шаттла из DLM в Дальян нет, автобус Muttaş до Ортаджа + долмуш (URL: https://www.muttas.com.tr)
        shuttlePriceTry: "120 - 170 TRY (через Ортаджа)",
        shuttlePriceEur: "~€3.5 - €5",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi DLM -> Dalyan (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "30 - 35 EUR",
        // SOURCE [15.07.2026]: VIP Mercedes Vito DLM -> Dalyan (URL: https://gettransfer.com)
        vipMinivanEur: "40 - 50 EUR",
        description: {
            ru: "Уютный городок на реке среди ликийских гробниц. Автобусом придется ехать до города Ортаджа, затем пересаживаться на местный долмуш. Прямое такси или минивэн довозят за 35 минут прямо до виллы или причала лодок.",
            en: "Charming riverside town amid Lycian rock tombs. Public bus requires transferring at Ortaca town hub. Direct taxi or VIP van drops you in just 35 minutes right at your riverfront villa or boat pier.",
            de: "Bezaubernde Flussstadt bei den lykischen Felsengräbern. Mit dem Bus muss in Ortaca umgestiegen werden. Ein direkter Transfer bringt Sie in nur 35 Minuten zur Villa oder zum Bootssteg.",
            tr: "Likya kaya mezarları gölgesindeki nehir kasabası. Toplu taşıma ile Ortaca otogarında aktarma gerekir. Doğrudan taksi veya VIP araç 35 dakikada doğrudan otel kapısına veya tekne iskelesine ulaştırır."
        }
    },
    {
        id: "sarigerme",
        destination: {
            ru: "Сарыгерме / Ортаджа / Отели 5★",
            en: "Sarıgerme / Ortaca / 5★ Resorts",
            de: "Sarıgerme / Ortaca / 5★ Resorts",
            tr: "Sarıgerme / Ortaca / 5★ Oteller"
        },
        distanceKm: 16,
        travelTimeMinutes: 20,
        // SOURCE [15.07.2026]: Прямой долмуш DLM -> Sarıgerme отсутствует, такси является стандартом (URL: https://www.dalaman-airport.com/taksi.html)
        shuttlePriceTry: "100 - 130 TRY",
        shuttlePriceEur: "~€3 - €4",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi DLM -> Sarıgerme (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "20 - 25 EUR",
        // SOURCE [15.07.2026]: VIP Mercedes Vito DLM -> Sarıgerme Resorts (URL: https://gettransfer.com)
        vipMinivanEur: "30 - 40 EUR",
        description: {
            ru: "Ближайшая к аэропорту курортная зона с широким песчаным пляжем и крупными клубными отелями (TUI Blue, Hilton). Короткий 20-минутный трансфер идеально подходит для путешествующих с маленькими детьми.",
            en: "Closest beach resort zone to the airport, renowned for expansive golden sands and premier club resorts (TUI Blue, Hilton). Quick 20-minute transfer makes it the ultimate stress-free choice with infants.",
            de: "Nächstgelegene Strandzone mit breitem Sandstrand und großen Clubhotels (TUI Blue, Hilton). Der kurze 20-minütige Transfer ist ideal für Familien mit kleinen Kindern.",
            tr: "Havalimanına en yakın geniş kum plajlı ve büyük kulüp otelli (TUI Blue, Hilton) tatil bölgesi. Kısa 20 dakikalık transfer mesafesi özellikle küçük çocuklu aileler için stres-siz bir başlangıçtır."
        }
    },
    {
        id: "akyaka",
        destination: {
            ru: "Акьяка / Залив Гёкова / Кайтсерфинг",
            en: "Akyaka / Gökova Bay / Kitesurf Hub",
            de: "Akyaka / Gökova Bucht / Kitesurf Hub",
            tr: "Akyaka / Gökova Körfezi / Uçurtma Sörfü"
        },
        distanceKm: 70,
        travelTimeMinutes: 60,
        // SOURCE [15.07.2026]: Высадка на перекрестке Gökova Yol Ayrımı из автобуса Muttaş DLM -> Marmaris (URL: https://www.muttas.com.tr)
        shuttlePriceTry: "200 - 260 TRY (на трассе)",
        shuttlePriceEur: "~€6 - €8",
        // SOURCE [15.07.2026]: Dalaman Airport Taxi DLM -> Akyaka (URL: https://www.dalaman-airport.com/taksi.html)
        taxiPriceEur: "50 - 60 EUR",
        // SOURCE [15.07.2026]: VIP Mercedes Vito DLM -> Akyaka Kitesurf Beach (URL: https://gettransfer.com)
        vipMinivanEur: "60 - 75 EUR",
        description: {
            ru: "Аутентичный городок с деревянной архитектурой и мировая столица кайтсерфинга. Автобус на Мармарис высаживает на перекрестке в 3 км от города. С досками и снаряжением индивидуальный минивэн — единственное разумное решение.",
            en: "Authentic wooden-architecture gem and global kitesurfing capital. Marmaris-bound airport buses only stop at the crossroads 3 km above town. Carrying kitesurf bags makes a private minivan essential.",
            de: "Authentisches Holzarchitektur-Juwel und Welthauptstadt des Kitesurfens. Der Marmaris-Bus hält an der Kreuzung 3 km oberhalb. Mit Kitesurf-Gepäck ist ein VIP-Minivan unentbehrlich.",
            tr: "Ahşap mimarisi ve azmak nehriyle ünlü dünya uçurtma sörfü başkenti. Marmaris otobüsleri kasabanın 3 km üstündeki kavşakta indirir. Sörf tahtaları ve ekipmanla özel minivan tek pratik çözümdür."
        }
    },
    {
        id: "dalaman_city",
        destination: {
            ru: "Даламан (город / центр / ваш дом)",
            en: "Dalaman (City / Center / Residence)",
            de: "Dalaman (Stadt / Zentrum / Ferienhaus)",
            tr: "Dalaman (İlçe Merkezi / Konut)"
        },
        distanceKm: 6,
        travelTimeMinutes: 10,
        // SOURCE [15.07.2026]: Реальный местный минимальный тариф такси из аэропорта/в аэропорт DLM (URL: https://www.dalaman-airport.com/taksi.html)
        shuttlePriceTry: "100 TRY (долмуш)",
        shuttlePriceEur: "~€2",
        // SOURCE [15.07.2026]: Такси по реальному счетчику с учетом аэропортового сбора и посадки (~500 ₺)
        taxiPriceEur: "15 EUR (~500 TRY)",
        vipMinivanEur: "25 EUR",
        description: {
            ru: "Короткая поездка между аэропортом и жилыми районами или центром Даламана. В реальности местное такси берет фиксированную минималку (~500 ₺ / €15) с учетом въезда в аэропорт и ожидания.",
            en: "Short hop between DLM Airport and Dalaman downtown/residential villas. Local metered taxis apply an airport minimum threshold (~500 ₺ / €15) due to terminal parking and queue wait times.",
            de: "Kurze Fahrt zwischen Flughafen und Wohngebieten in Dalaman. Lokale Taxis berechnen aufgrund von Parkgebühren und Wartezeiten einen Mindesttarif (~500 ₺ / €15).",
            tr: "Havalimanı ile Dalaman ilçe merkezi veya konutlar arası kısa yolculuk. Yerel taksiler havalimanı giriş ve bekleme maliyetleri nedeniyle minimum tarifeyi (~500 ₺ / €15) uygular."
        }
    },
    {
        id: "sarsala",
        destination: {
            ru: "Пляж Сарсала / Бухта Клеопатры (Sarsala)",
            en: "Sarsala Cove / Cleopatra Beach",
            de: "Sarsala Bucht / Kleopatra Strand",
            tr: "Sarsala Koyu / Kleopatra Plajı"
        },
        distanceKm: 14,
        travelTimeMinutes: 25,
        // SOURCE [15.07.2026]: Тарификация поездок в горные живописные бухты Сарсала (URL: https://www.mugla.bel.tr/ukome)
        shuttlePriceTry: "Только такси/авто",
        shuttlePriceEur: "-",
        // SOURCE [15.07.2026]: Реальный тариф счетчика из Даламана по серпантину на пляж Сарсала (~600 ₺)
        taxiPriceEur: "20 EUR (~600 TRY)",
        vipMinivanEur: "35 EUR",
        description: {
            ru: "Легендарная бухта с сосновыми склонами и исторической купальней Клеопатры. Путь идет по извилистому горному серпантину из Даламана. Общественного транспорта сюда нет, поездка на такси из города/аэропорта обходится в ~600 лир.",
            en: "Iconic pine-forested bay featuring historical Cleopatra baths. Reached via a winding mountain road from Dalaman. No public transit available; metered taxis from town/airport average ~600 TRY.",
            de: "Legendäre Bucht mit Kiefernwäldern und den historischen Kleopatra-Bädern. Über eine kurvige Bergstraße erreichbar. Kein öffentlicher Nahverkehr, Taxis kosten ca. 600 TRY.",
            tr: "Çam ormanlarıyla kaplı efsanevi koy ve tarihi Kleopatra hamamları. Dalaman'dan virajlı dağ yolu ile ulaşılır. Toplu taşıma yoktur, ilçe merkezinden veya havalimanından taksi ortalama ~600 ₺ tutar."
        }
    }
];

const LOCATIONS_LIST = [
    { id: "dlm", ru: "✈️ Аэропорт Даламан (DLM)", en: "✈️ Dalaman Airport (DLM)", de: "✈️ Flughafen Dalaman (DLM)", tr: "✈️ Dalaman Havalimanı (DLM)" },
    { id: "dalaman_city", ru: "🏡 Даламан (город / ваш дом / отели)", en: "🏡 Dalaman (City / Residence)", de: "🏡 Dalaman (Stadt / Zentrum)", tr: "🏡 Dalaman (İlçe Merkezi / Eviniz)" },
    { id: "sarsala", ru: "🏖️ Пляж Сарсала / Бухта Клеопатры", en: "🏖️ Sarsala Cove / Cleopatra Beach", de: "🏖️ Sarsala Bucht / Kleopatra Strand", tr: "🏖️ Sarsala Koyu / Kleopatra Plajı" },
    { id: "fethiye", ru: "🌅 Фетхие / Чалыш / Олюдениз", en: "🌅 Fethiye / Çalış / Ölüdeniz", de: "🌅 Fethiye / Çalış / Ölüdeniz", tr: "🌅 Fethiye / Çalış / Ölüdeniz" },
    { id: "gocek", ru: "⛵ Гёчек / D-Marin / Яхтенные марины", en: "⛵ Göcek / D-Marin / Marinas", de: "⛵ Göcek / D-Marin / Jachthäfen", tr: "⛵ Göcek / D-Marin / Marinalar" },
    { id: "sarigerme", ru: "🌴 Сарыгерме / Отели 5★", en: "🌴 Sarıgerme / 5★ Resorts", de: "🌴 Sarıgerme / 5★ Resorts", tr: "🌴 Sarıgerme / 5★ Oteller" },
    { id: "dalyan", ru: "🐢 Дальян / Пляж Изтузу", en: "🐢 Dalyan / İztuzu Beach", de: "🐢 Dalyan / İztuzu-Strand", tr: "🐢 Dalyan / İztuzu Plajı" },
    { id: "marmaris", ru: "🏰 Мармарис / Ичмелер / Турунч", en: "🏰 Marmaris / İçmeler / Turunç", de: "🏰 Marmaris / İçmeler / Turunç", tr: "🏰 Marmaris / İçmeler / Turunç" },
    { id: "akyaka", ru: "🏄 Акьяка / Залив Гёкова", en: "🏄 Akyaka / Gökova Bay / Kitesurf", de: "🏄 Akyaka / Gökova Bucht", tr: "🏄 Akyaka / Gökova Körfezi" },
    { id: "kas", ru: "🌺 Каш / Калкан / Патара", en: "🌺 Kaş / Kalkan / Patara", de: "🌺 Kaş / Kalkan / Patara", tr: "🌺 Kaş / Kalkan / Patara" },
    { id: "datca", ru: "🫒 Датча / Паламутбюкю", en: "🫒 Datça / Palamutbükü", de: "🫒 Datça / Palamutbükü", tr: "🫒 Datça / Palamutbükü" }
];

export default function TransfersSmartHub({ locale = "ru" }: { locale?: string }) {
    const [pickupId, setPickupId] = useState<string>("dlm");
    const [dropoffId, setDropoffId] = useState<string>("fethiye");
    const [selectedTier, setSelectedTier] = useState<"shuttle" | "taxi" | "vip">("vip");
    const [passengerName, setPassengerName] = useState<string>("");
    const [flightNumber, setFlightNumber] = useState<string>("");
    const [arrivalDate, setArrivalDate] = useState<string>("");
    const [passengersCount, setPassengersCount] = useState<string>("2");

    const resolveCurrentRoute = () => {
        if (pickupId === "dlm" && dropoffId !== "dlm") {
            const route = TRANSFERS_DATA_2026.find(r => r.id === dropoffId);
            if (route) return route;
        }
        if (dropoffId === "dlm" && pickupId !== "dlm") {
            const route = TRANSFERS_DATA_2026.find(r => r.id === pickupId);
            if (route) {
                return {
                    ...route,
                    description: {
                        ru: `Обратный маршрут из пункта "${route.destination.ru}" в Аэропорт Даламан (DLM). Время в пути составляет около ${route.travelTimeMinutes} мин. Рекомендуется закладывать +30 мин запаса в высокий сезон.`,
                        en: `Return route from "${route.destination.en}" to Dalaman Airport (DLM). Travel duration is ~${route.travelTimeMinutes} mins. Recommended to add +30 mins buffer during peak season.`,
                        de: `Rückfahrt von "${route.destination.de}" zum Flughafen Dalaman (DLM). Fahrzeit ca. ${route.travelTimeMinutes} Min.`,
                        tr: `"${route.destination.tr}" noktasından Dalaman Havalimanı (DLM) dönüş güzergahı. Yolculuk süresi yaklaşık ${route.travelTimeMinutes} dk.`
                    }
                };
            }
        }
        if ((pickupId === "dalaman_city" && dropoffId === "sarsala") || (pickupId === "sarsala" && dropoffId === "dalaman_city")) {
            return {
                id: "sarsala_local",
                destination: {
                    ru: "Пляж Сарсала / Бухта Клеопатры (Sarsala Koyu)",
                    en: "Sarsala Cove / Cleopatra Beach",
                    de: "Sarsala Bucht / Kleopatra Strand",
                    tr: "Sarsala Koyu / Kleopatra Plajı"
                },
                distanceKm: 14,
                travelTimeMinutes: 25,
                shuttlePriceTry: "Только такси/авто",
                shuttlePriceEur: "-",
                taxiPriceEur: "20 EUR (~600 TRY)",
                vipMinivanEur: "35 EUR (~1050 TRY)",
                description: {
                    ru: "Прямая поездка по извилистому горному серпантину между Даламаном и легендарной бухтой Сарсала. Местное такси берет по счетчику с учетом подъема/спуска ~600 лир.",
                    en: "Direct ride across winding mountain roads between Dalaman downtown and iconic Sarsala Cove. Local taxis average ~600 TRY on the meter.",
                    de: "Direkte Fahrt über kurvige Bergstraßen zwischen Dalaman Stadt und der Sarsala-Bucht. Taxis kosten ca. 600 TRY.",
                    tr: "Dalaman ilçe merkezi ile efsanevi Sarsala Koyu arası virajlı dağ yolu yolculuğu. Yerel taksiler ortalama ~600 ₺ tutar."
                }
            };
        }
        if (pickupId === dropoffId) {
            return {
                id: "same",
                destination: {
                    ru: "Поездка внутри одного района / Локальное такси",
                    en: "Local Intra-District Trip / City Taxi",
                    de: "Lokale Fahrt innerhalb der Zone",
                    tr: "Bölge İçi Kısa Mesafe Yolculuk / Şehir Taksi"
                },
                distanceKm: 4,
                travelTimeMinutes: 10,
                shuttlePriceTry: "40 - 60 TRY (долмуш)",
                shuttlePriceEur: "~€1 - €2",
                taxiPriceEur: "10 - 15 EUR (~350 - 500 TRY)",
                vipMinivanEur: "25 EUR",
                description: {
                    ru: "Короткий переезд внутри одной курортной зоны или города. По местным правилам действует минимальная фиксированная ставка посадки и ожидания.",
                    en: "Short local trip inside the same resort zone. Minimum opening/waiting rates apply under local municipal taxi standards.",
                    de: "Kurze lokale Fahrt innerhalb derselben Zone. Es gelten die örtlichen Mindesttarife.",
                    tr: "Aynı tatil bölgesi içindeki kısa mesafe yolculuk. Yerel açılış ve indi-bindi minimum tarifeleri uygulanır."
                }
            };
        }
        return {
            id: "custom",
            destination: {
                ru: "Индивидуальный межгородской маршрут",
                en: "Custom Inter-Resort Route",
                de: "Individuelle Inter-Resort-Route",
                tr: "Özel Beldeler Arası Transfer Güzergahı"
            },
            distanceKm: 38,
            travelTimeMinutes: 45,
            shuttlePriceTry: "120 - 200 TRY (автобусы по трассе)",
            shuttlePriceEur: "~€3 - €6",
            taxiPriceEur: "35 EUR (~1100 TRY)",
            vipMinivanEur: "45 EUR (~1400 TRY)",
            description: {
                ru: "Прямой переезд между выбранными курортами Муглы без заезда в аэропорт. Для точной фиксации цены и перевозки багажа рекомендуется индивидуальный VIP-минивэн.",
                en: "Direct inter-resort journey connecting selected Muğla destinations without airport stopovers. Pre-booked private VIP minivan ensures a locked-in rate.",
                de: "Verbindung zwischen ausgewählten Urlaubsorten in Muğla. Ein vorgebuchter VIP-Minivan garantiert einen Festpreis.",
                tr: "Havalimanına uğramadan seçilen Muğla tatil beldeleri arası doğrudan yolculuk. Önceden rezervasyonlu VIP minivan sabit fiyat garantisi sunar."
            }
        };
    };

    const currentRoute = resolveCurrentRoute();
    const pickupLoc = LOCATIONS_LIST.find(l => l.id === pickupId) || LOCATIONS_LIST[0];
    const dropoffLoc = LOCATIONS_LIST.find(l => l.id === dropoffId) || LOCATIONS_LIST[3];

    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const t = {
        badge: isRu ? "Двусторонний Калькулятор Маршрутов & Бронирование 2026" : isDe ? "Bidirektionaler Tarifrechner & Buchung 2026" : isTr ? "Çift Yönlü Rota Hesaplayıcı ve Rezervasyon 2026" : "Bidirectional Route Calculator & Booking 2026",
        selectRouteTitle: isRu ? "1. Выберите точки отправления и назначения (Откуда ⇄ Куда):" : isDe ? "1. Wählen Sie Abfahrts- und Zielort (Von ⇄ Nach):" : isTr ? "1. Kalkış ve Varış Noktalarını Seçiniz (Nereden ⇄ Nereye):" : "1. Select Pickup & Drop-off Points (From ⇄ To):",
        selectTier: isRu ? "2. Выберите класс транспорта и комфорта:" : isDe ? "2. Wählen Sie Ihre Transportklasse:" : isTr ? "2. Araç ve Konfor Sınıfını Seçiniz:" : "2. Select vehicle class & comfort level:",
        shuttleTitle: isRu ? "Шаттл / Долмуш (Muttaş)" : isDe ? "Shuttle-Bus (Muttaş)" : isTr ? "Servis Otobüsü / Dolmuş" : "Shuttle / Public Bus",
        shuttleDesc: isRu ? "Общественный автобус или долмуш по расписанию" : isDe ? "Öffentlicher Linienbus nach Fahrplan" : isTr ? "Tarifeli resmi otobüs veya dolmuş hattı" : "Official scheduled bus or local dolmuş line",
        taxiTitle: isRu ? "Официальное Такси" : isDe ? "Offizielles Taxi" : isTr ? "Resmi Taksi" : "Official Metered Taxi",
        taxiDesc: isRu ? "Такси по счетчику или фиксированному тарифу кооператива" : isDe ? "Taxi nach Taximeter oder Kooperativ-Festpreis" : isTr ? "Taksimetre veya kooperatif sabit tarifesi" : "Local taxi by meter or cooperative fixed rate",
        vipTitle: isRu ? "VIP Минивэн (Mercedes Vito)" : isDe ? "VIP Minivan (Mercedes Vito)" : isTr ? "VIP Minivan (Mercedes Vito)" : "VIP Private Minivan (Mercedes Vito)",
        vipDesc: isRu ? "Встреча от двери до двери, фикс. цена, до 6-8 чел + детские кресла" : isDe ? "Tür-zu-Tür-Empfang, Festpreis, bis 6-8 Personen + Kindersitze" : isTr ? "Kapıdan kapıya özel transfer, sabit fiyat, 6-8 kişi + çocuk koltuğu" : "Door-to-door meet & greet, fixed rate, up to 6-8 pax + child boosters",
        calcResultTitle: isRu ? "Расчет стоимости и параметров маршрута:" : isDe ? "Berechnung von Preis & Reisedetails:" : isTr ? "Yolculuk Fiyatı ve Rota Detayları:" : "Estimated Route Cost & Parameters:",
        distanceLabel: isRu ? "Расстояние маршрута:" : isDe ? "Streckenentfernung:" : isTr ? "Rota Mesafesi:" : "Route Distance:",
        timeLabel: isRu ? "Ориентировочное время:" : isDe ? "Geschätzte Fahrzeit:" : isTr ? "Tahmini Yolculuk Süresi:" : "Est. Travel Time:",
        priceRangeLabel: isRu ? "Рыночный ориентир (2026):" : isDe ? "Richtpreis (2026):" : isTr ? "Tahmini Piyasa Fiyatı (2026):" : "2026 Market Benchmark:",
        perVehicle: isRu ? "за всю машину в одну сторону" : isDe ? "pro Fahrzeug pro Strecke" : isTr ? "tek yön araç başı fiyat" : "per vehicle one-way total",
        perPerson: isRu ? "за 1 билет / человека" : isDe ? "pro Person / Ticket" : isTr ? "kişi başı bilet" : "per person / ticket",
        bookFormTitle: isRu ? "Прямой онлайн-заказ трансфера без посредников" : isDe ? "Direkte Transferanfrage ohne Vermittler" : isTr ? "Aracısız Doğrudan Transfer Rezervasyon Talebi" : "Direct Instant Transfer Inquiry & Pre-Booking",
        bookFormDesc: isRu ? "Заполните данные поездки, чтобы отправить готовую заявку диспетчеру лицензированного парка (TÜRSAB A-Class) в WhatsApp или Telegram по фиксированной цене без доплат за пробки." : isDe ? "Geben Sie Ihre Reisedaten ein, um eine fertige Anfrage an die Disposition des lizenzierten TÜRSAB-Fuhrparks via WhatsApp oder Telegram zu senden." : isTr ? "Yolculuk bilgilerinizi girerek lisanslı TÜRSAB A-Sınıfı transfer dispetçerine WhatsApp veya Telegram üzerinden sabit fiyat garantisiyle talep gönderin." : "Enter trip details to dispatch a pre-filled direct booking request to verified local TÜRSAB licensed dispatchers via WhatsApp or Telegram.",
        namePlaceholder: isRu ? "Ваше имя (например, Дмитрий)" : isDe ? "Ihr Name (z.B. Thomas)" : isTr ? "Adınız Soyadınız" : "Your Name (e.g. Alex)",
        flightPlaceholder: isRu ? "Номер рейса или адрес подачи" : isDe ? "Flugnummer oder Abholadresse" : isTr ? "Uçuş No veya Alış Adresi" : "Flight Number or Pickup Address",
        datePlaceholder: isRu ? "Дата и время подачи" : isDe ? "Datum und Uhrzeit" : isTr ? "Tarih ve Saat" : "Pickup Date & Time",
        paxLabel: isRu ? "Количество пассажиров:" : isDe ? "Anzahl der Passagiere:" : isTr ? "Yolcu Sayısı:" : "Number of Passengers:",
        sendWhatsApp: isRu ? "Отправить заявку в WhatsApp" : isDe ? "Anfrage via WhatsApp senden" : isTr ? "WhatsApp ile Talep Gönder" : "Send Inquiry via WhatsApp",
        sendTelegram: isRu ? "Отправить в Telegram" : isDe ? "Anfrage via Telegram senden" : isTr ? "Telegram ile Talep Gönder" : "Send Inquiry via Telegram",
        compareTableTitle: isRu ? "Сравнительная матрица способов передвижения по региону Даламан" : isDe ? "Vergleichsmatrix: Verkehrsmittel im Raum Dalaman" : isTr ? "Dalaman Bölgesi Ulaşım Seçenekleri Karşılaştırma Matrisi" : "Regional Transport Comparison Matrix",
        colMode: isRu ? "Способ / Класс" : isDe ? "Verkehrsmittel" : isTr ? "Ulaşım Türü" : "Transport Mode",
        colConvenience: isRu ? "Удобство и багаж" : isDe ? "Komfort & Gepäck" : isTr ? "Konfor ve Bagaj" : "Comfort & Luggage",
        colSchedule: isRu ? "Режим работы" : isDe ? "Betriebszeiten" : isTr ? "Çalışma Saatleri" : "Schedule / Availability",
        colRateTip: isRu ? "Кому идеально подойдет" : isDe ? "Empfohlen für" : isTr ? "Kimler İçin İdeal" : "Best Suited For",
        tipsTitle: isRu ? "💡 Важные советы от Управляющего сайтом по трансферам из DLM" : isDe ? "💡 Wichtige Insider-Tipps für Transfers ab DLM" : isTr ? "💡 DLM Transferleri İçin Site Yöneticisinden Önemli İpuçları" : "💡 Essential Insider Tips for Dalaman Airport Transfers"
    };

    const getPriceDisplay = () => {
        if (selectedTier === "shuttle") {
            return `${currentRoute.shuttlePriceTry} (${currentRoute.shuttlePriceEur})`;
        }
        if (selectedTier === "taxi") {
            return currentRoute.taxiPriceEur;
        }
        return currentRoute.vipMinivanEur;
    };

    const getPriceSuffix = () => {
        return selectedTier === "shuttle" ? t.perPerson : t.perVehicle;
    };

    const buildInquiryText = () => {
        const pickupName = pickupLoc[locale as keyof typeof pickupLoc] || pickupLoc.en;
        const dropoffName = dropoffLoc[locale as keyof typeof dropoffLoc] || dropoffLoc.en;
        const tierName = selectedTier === "vip" ? "VIP Minivan Mercedes Vito" : selectedTier === "taxi" ? "Standard Metered/Fixed Taxi" : "Shuttle / Dolmuş Inquiry";
        const priceEst = getPriceDisplay();

        return `Hello from Dalaman Guide (dalaman.info)!\nI would like to request a transfer booking confirmation:\n- Route: ${pickupName} ➔ ${dropoffName}\n- Vehicle Class: ${tierName}\n- Estimated Benchmark Rate: ${priceEst}\n- Passenger Name: ${passengerName || "Not specified"}\n- Flight/Address Details: ${flightNumber || "Not specified"}\n- Pickup Date & Time: ${arrivalDate || "Not specified"}\n- Passengers Count: ${passengersCount}\n\nPlease confirm availability and locked-in price!`;
    };

    const handleWhatsAppClick = () => {
        const text = encodeURIComponent(buildInquiryText());
        window.open(`https://wa.me/905300000000?text=${text}`, "_blank");
    };

    const handleTelegramClick = () => {
        const text = encodeURIComponent(buildInquiryText());
        window.open(`https://t.me/dalaman_concierge_bot?start=${text}`, "_blank");
    };

    const handleSwap = () => {
        const temp = pickupId;
        setPickupId(dropoffId);
        setDropoffId(temp);
    };

    return (
        <section className="w-full space-y-12 my-8">
            {/* Calculator Main Box */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/40">
                        <FaCarSide size={20} />
                    </div>
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 block">
                            {t.badge}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                            {isRu ? "Калькулятор тарифов и бронирование трансферов" : isDe ? "Transfer-Tarifrechner & Direktbuchung" : isTr ? "Transfer Fiyat Hesaplayıcı ve Rezervasyon" : "Transfer Fare Calculator & Direct Booking"}
                        </h2>
                    </div>
                </div>

                {/* STEP 1: BIDIRECTIONAL ROUTE SELECTOR */}
                <div className="space-y-4 mb-8">
                    <label className="text-sm font-black text-slate-300 uppercase tracking-wider flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span>{t.selectRouteTitle}</span>
                        <span className="text-[11px] font-bold text-cyan-400 normal-case flex items-center gap-1">
                            ⚡ {isRu ? "Любое направление по региону" : "Any regional route combination"}
                        </span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center bg-white/5 p-4 md:p-6 rounded-3xl border border-white/10 shadow-inner">
                        {/* PICKUP POINT */}
                        <div className="md:col-span-5 space-y-1.5">
                            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-cyan-400" /> {isRu ? "📍 Откуда забрать (Pickup):" : isDe ? "📍 Abfahrtsort:" : isTr ? "📍 Nereden Alınacak:" : "📍 Pickup Location:"}
                            </span>
                            <select
                                value={pickupId}
                                onChange={(e) => setPickupId(e.target.value)}
                                className="w-full bg-slate-900 border border-cyan-500/50 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-cyan-400 shadow-md transition-all cursor-pointer"
                            >
                                {LOCATIONS_LIST.map(loc => (
                                    <option key={loc.id} value={loc.id} className="bg-slate-900 text-white font-semibold py-1">
                                        {loc[locale as keyof typeof loc] || loc.en}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* SWAP BUTTON */}
                        <div className="md:col-span-1 flex justify-center py-1 md:py-0">
                            <button
                                onClick={handleSwap}
                                title={isRu ? "Поменять местами Откуда и Куда" : "Swap Pickup and Drop-off"}
                                className="w-12 h-12 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all group"
                            >
                                <span className="text-xl font-black group-hover:rotate-180 transition-transform duration-300">⇄</span>
                            </button>
                        </div>

                        {/* DROP-OFF POINT */}
                        <div className="md:col-span-5 space-y-1.5">
                            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-amber-400" /> {isRu ? "🎯 Куда отвезти (Drop-off):" : isDe ? "🎯 Zielort:" : isTr ? "🎯 Nereye Gidilecek:" : "🎯 Drop-off Destination:"}
                            </span>
                            <select
                                value={dropoffId}
                                onChange={(e) => setDropoffId(e.target.value)}
                                className="w-full bg-slate-900 border border-amber-500/50 rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-amber-400 shadow-md transition-all cursor-pointer"
                            >
                                {LOCATIONS_LIST.map(loc => (
                                    <option key={loc.id} value={loc.id} className="bg-slate-900 text-white font-semibold py-1">
                                        {loc[locale as keyof typeof loc] || loc.en}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Quick Route Shortcuts */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mr-1">
                            {isRu ? "⚡ Быстрый выбор:" : isDe ? "⚡ Schnellwahl:" : isTr ? "⚡ Hızlı Seçim:" : "⚡ Quick Routes:"}
                        </span>
                        {[
                            { from: "dlm", to: "fethiye", label: isRu ? "DLM ➔ Фетхие" : "DLM ➔ Fethiye" },
                            { from: "dlm", to: "dalaman_city", label: isRu ? "DLM ➔ Даламан (город)" : "DLM ➔ Dalaman City" },
                            { from: "dalaman_city", to: "sarsala", label: isRu ? "Даламан (город) ➔ Пляж Клеопатры" : "Dalaman City ➔ Cleopatra Beach" },
                            { from: "dlm", to: "gocek", label: isRu ? "DLM ➔ Гёчек" : "DLM ➔ Göcek" },
                            { from: "dlm", to: "marmaris", label: isRu ? "DLM ➔ Мармарис" : "DLM ➔ Marmaris" },
                            { from: "fethiye", to: "dlm", label: isRu ? "Фетхие ➔ Аэропорт DLM" : "Fethiye ➔ DLM Airport" }
                        ].map((btn, idx) => {
                            const active = pickupId === btn.from && dropoffId === btn.to;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setPickupId(btn.from);
                                        setDropoffId(btn.to);
                                    }}
                                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                                        active
                                            ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30 scale-105"
                                            : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {btn.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* STEP 2: Select Tier */}
                <div className="space-y-4 mb-10">
                    <label className="text-sm font-black text-slate-300 uppercase tracking-wider block">
                        {t.selectTier}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Shuttle Tier */}
                        <div 
                            onClick={() => setSelectedTier("shuttle")}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                                selectedTier === "shuttle"
                                    ? "bg-gradient-to-br from-cyan-600/30 to-slate-800 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 font-black text-sm">
                                        <FaBus />
                                    </span>
                                    {selectedTier === "shuttle" && <FaCheckCircle className="text-cyan-400" size={18} />}
                                </div>
                                <h4 className="font-black text-base text-white">{t.shuttleTitle}</h4>
                                <p className="text-xs text-slate-300 mt-1 leading-snug">{t.shuttleDesc}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
                                <span className="text-lg font-black text-amber-400">{currentRoute.shuttlePriceTry}</span>
                                <span className="text-[11px] text-slate-400 uppercase font-bold">{t.perPerson}</span>
                            </div>
                        </div>

                        {/* Standard Taxi Tier */}
                        <div 
                            onClick={() => setSelectedTier("taxi")}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                                selectedTier === "taxi"
                                    ? "bg-gradient-to-br from-cyan-600/30 to-slate-800 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400 font-black text-sm">
                                        <FaTaxi />
                                    </span>
                                    {selectedTier === "taxi" && <FaCheckCircle className="text-cyan-400" size={18} />}
                                </div>
                                <h4 className="font-black text-base text-white">{t.taxiTitle}</h4>
                                <p className="text-xs text-slate-300 mt-1 leading-snug">{t.taxiDesc}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
                                <span className="text-lg font-black text-yellow-400">{currentRoute.taxiPriceEur}</span>
                                <span className="text-[11px] text-slate-400 uppercase font-bold">{t.perVehicle}</span>
                            </div>
                        </div>

                        {/* VIP Minivan Tier (RECOMMENDED) */}
                        <div 
                            onClick={() => setSelectedTier("vip")}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                                selectedTier === "vip"
                                    ? "bg-gradient-to-br from-cyan-500/40 via-cyan-900/40 to-slate-800 border-cyan-400 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-400"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                        >
                            <div className="absolute top-0 right-0 bg-cyan-400 text-slate-950 font-black text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-widest shadow-md">
                                ★ RECOMMENDED
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="p-2.5 rounded-xl bg-cyan-400/20 text-cyan-300 font-black text-sm">
                                        <FaCarSide />
                                    </span>
                                    {selectedTier === "vip" && <FaCheckCircle className="text-cyan-400" size={18} />}
                                </div>
                                <h4 className="font-black text-base text-white">{t.vipTitle}</h4>
                                <p className="text-xs text-slate-200 mt-1 leading-snug">{t.vipDesc}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
                                <span className="text-xl font-black text-cyan-300">{currentRoute.vipMinivanEur}</span>
                                <span className="text-[11px] text-slate-300 uppercase font-bold">{t.perVehicle}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESULT CARD & INQUIRY FORM */}
                <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/15 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center border-b border-white/10 pb-6">
                        <div className="lg:col-span-2 space-y-2">
                            <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                                {t.calcResultTitle}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-white flex flex-wrap items-center gap-2">
                                <span className="text-cyan-300">{pickupLoc[locale as keyof typeof pickupLoc] || pickupLoc.en}</span>
                                <span className="text-amber-400">➔</span>
                                <span>{dropoffLoc[locale as keyof typeof dropoffLoc] || dropoffLoc.en}</span>
                            </h3>
                            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
                                {(currentRoute.description[locale as keyof typeof currentRoute.description] || currentRoute.description.en)}
                            </p>
                        </div>

                        <div className="bg-slate-900/80 rounded-2xl p-5 border border-white/10 space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400 font-bold flex items-center gap-1.5">
                                    <FaMapMarkerAlt className="text-cyan-400" /> {t.distanceLabel}
                                </span>
                                <span className="font-black text-white">{currentRoute.distanceKm} км</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400 font-bold flex items-center gap-1.5">
                                    <FaClock className="text-amber-400" /> {t.timeLabel}
                                </span>
                                <span className="font-black text-white">~{currentRoute.travelTimeMinutes} мин</span>
                            </div>
                            <div className="pt-3 border-t border-white/10">
                                <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
                                    {t.priceRangeLabel}
                                </span>
                                <div className="text-2xl font-black text-cyan-300">
                                    {getPriceDisplay()}
                                </div>
                                <span className="text-[10px] text-slate-400 block mt-0.5">
                                    {getPriceSuffix()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* DIRECT BOOKING FORM */}
                    <div className="space-y-6 pt-2">
                        <div>
                            <h4 className="text-base md:text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <FaCheckCircle className="text-cyan-400" />
                                <span>{t.bookFormTitle}</span>
                            </h4>
                            <p className="text-xs text-slate-300 mt-1">
                                {t.bookFormDesc}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="text-[11px] font-black uppercase text-slate-400 block mb-1.5">
                                    {isRu ? "Имя пассажира" : isDe ? "Name" : isTr ? "Yolcu Adı" : "Passenger Name"}
                                </label>
                                <input 
                                    type="text" 
                                    value={passengerName}
                                    onChange={(e) => setPassengerName(e.target.value)}
                                    placeholder={t.namePlaceholder}
                                    className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase text-slate-400 block mb-1.5">
                                    {isRu ? "Номер авиарейса" : isDe ? "Flugnummer" : isTr ? "Uçuş Numarası" : "Flight Number"}
                                </label>
                                <input 
                                    type="text" 
                                    value={flightNumber}
                                    onChange={(e) => setFlightNumber(e.target.value)}
                                    placeholder={t.flightPlaceholder}
                                    className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors uppercase"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase text-slate-400 block mb-1.5">
                                    {isRu ? "Дата и время" : isDe ? "Ankunft" : isTr ? "Tarih & Saat" : "Arrival Date/Time"}
                                </label>
                                <input 
                                    type="text" 
                                    value={arrivalDate}
                                    onChange={(e) => setArrivalDate(e.target.value)}
                                    placeholder="e.g. 25.07.2026, 14:30"
                                    className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black uppercase text-slate-400 block mb-1.5">
                                    {t.paxLabel}
                                </label>
                                <select 
                                    value={passengersCount}
                                    onChange={(e) => setPassengersCount(e.target.value)}
                                    className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                                >
                                    <option value="1">1 чел / 1 Pax</option>
                                    <option value="2">2 чел / 2 Pax</option>
                                    <option value="3">3 чел / 3 Pax</option>
                                    <option value="4">4 чел / 4 Pax</option>
                                    <option value="5">5 чел / 5 Pax</option>
                                    <option value="6">6 чел / 6 Pax (Minivan max)</option>
                                    <option value="7">7+ чел / Group Bus</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button
                                onClick={handleWhatsAppClick}
                                className="flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs md:text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center space-x-2.5"
                            >
                                <FaWhatsapp size={20} />
                                <span>{t.sendWhatsApp}</span>
                            </button>
                            <button
                                onClick={handleTelegramClick}
                                className="flex-1 py-4 px-6 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs md:text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-sky-500/30 transition-all flex items-center justify-center space-x-2.5"
                            >
                                <FaTelegramPlane size={20} />
                                <span>{t.sendTelegram}</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1">
                            <FaShieldAlt className="text-amber-400 flex-shrink-0" />
                            <span>
                                {isRu 
                                    ? "🔒 Гарантия честной цены: Вы связываетесь с диспетчером напрямую без скрытых комиссий и наценок за пробки." 
                                    : "🔒 Honest Price Guarantee: Direct connection with dispatchers with zero hidden fees or traffic delays surcharges."}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPARISON MATRIX TABLE */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-md">
                        <FaUsers size={18} />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase">
                            {t.compareTableTitle}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-500">
                            {isRu ? "Сравните 3 основных способа доехать до вашего курорта из терминала прилета DLM" : "Compare the 3 primary transportation methods from DLM arrival terminal to your resort"}
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-200 text-slate-700 text-xs font-black uppercase">
                                <th className="py-4 px-4">{t.colMode}</th>
                                <th className="py-4 px-4">{t.colConvenience}</th>
                                <th className="py-4 px-4">{t.colSchedule}</th>
                                <th className="py-4 px-4">{t.colRateTip}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-4 font-black text-slate-900 flex items-center gap-2">
                                    <FaBus className="text-amber-600 flex-shrink-0" />
                                    <span>Muttaş / Havaş</span>
                                </td>
                                <td className="py-4 px-4 text-slate-600">
                                    {isRu ? "Базовый комфорт, багаж в нижнем отсеке. Высадка только на автовокзале (Otogar)." : "Basic bus comfort, luggage storage below. Drops off strictly at central Otogar."}
                                </td>
                                <td className="py-4 px-4 font-bold text-slate-700">
                                    {isRu ? "Привязан к прилетам внутренних рейсов (24/7)" : "Synced with domestic flight arrivals (24/7)"}
                                </td>
                                <td className="py-4 px-4 font-medium text-emerald-700 bg-emerald-50/50 rounded-lg">
                                    {isRu ? "Соло-путешественники, рюкзачники, эконом-туристы" : "Solo travelers, backpackers, budget-conscious tourists"}
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-4 font-black text-slate-900 flex items-center gap-2">
                                    <FaTaxi className="text-yellow-600 flex-shrink-0" />
                                    <span>{isRu ? "Официальное Такси DLM" : "Official DLM Taxi"}</span>
                                </td>
                                <td className="py-4 px-4 text-slate-600">
                                    {isRu ? "Седан (Fiat Egea / Renault) на 1-3 человек с 2-3 чемоданами. Отправление от бордюра." : "Sedans (Fiat Egea/Renault) for 1-3 pax with 2-3 suitcases. Immediate curb departure."}
                                </td>
                                <td className="py-4 px-4 font-bold text-slate-700">
                                    {isRu ? "Круглосуточно по очереди у выхода" : "24/7 taxi rank queue right outside arrivals"}
                                </td>
                                <td className="py-4 px-4 font-medium text-amber-800 bg-amber-50/50 rounded-lg">
                                    {isRu ? "Пáры без бронирования, срочные поездки в пределах 40 км (Дальян, Гёчек)" : "Couples without pre-booking, quick trips within 40 km (Dalyan, Göcek)"}
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors bg-cyan-50/30">
                                <td className="py-4 px-4 font-black text-cyan-950 flex items-center gap-2">
                                    <FaCarSide className="text-cyan-600 flex-shrink-0" />
                                    <span>VIP Minivan Mercedes Vito</span>
                                </td>
                                <td className="py-4 px-4 text-slate-700 font-bold">
                                    {isRu ? "Премиум кожаный салон, A/C, Wi-Fi, до 6-8 огромных чемоданов, детские кресла бесплатно. Доверительная доставка до дверей виллы." : "Premium leather salon, A/C, Wi-Fi, up to 6-8 large suitcases, free infant car seats. Door-to-door villa service."}
                                </td>
                                <td className="py-4 px-4 font-bold text-cyan-800">
                                    {isRu ? "Предварительный заказ, водитель ждет с табличкой" : "Pre-booked, dedicated driver waiting with name sign"}
                                </td>
                                <td className="py-4 px-4 font-black text-cyan-900 bg-cyan-100/50 rounded-lg">
                                    {isRu ? "Семьи с детьми, компании 4-8 чел, поездки в Каш, Олюдениз, Датчу" : "Families with kids, groups 4-8 pax, long drives to Kaş, Ölüdeniz, Datça"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* INSIDER TIPS BLOCK */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-6 md:p-8 border border-amber-200 shadow-md space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-sm">
                        <FaInfoCircle size={20} />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-amber-950 uppercase tracking-tight">
                        {t.tipsTitle}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs md:text-sm text-amber-950 font-medium leading-relaxed">
                    <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-amber-200/60 shadow-sm">
                        <h4 className="font-black text-slate-900 uppercase flex items-center gap-2">
                            <FaCheckCircle className="text-amber-600" />
                            <span>{isRu ? "Почему важно фиксировать цену заранее?" : "Why lock your transfer price upfront?"}</span>
                        </h4>
                        <p>
                            {isRu 
                                ? "В высокий сезон таксисты у бордюра могут включать таксометр в пробках или требовать оплату обратной дороги в удаленные поселки (например, в Каш или Датчу). Предварительное бронирование VIP-трансфера фиксирует тариф в EUR/USD, защищая вас от любых скачков курса и пробок."
                                : "During peak summer, curb taxis may run meters during heavy traffic or request return-fare surcharges to remote destinations like Kaş or Datça. Pre-booking a private transfer locks a guaranteed EUR/USD rate regardless of delays."}
                        </p>
                    </div>

                    <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-amber-200/60 shadow-sm">
                        <h4 className="font-black text-slate-900 uppercase flex items-center gap-2">
                            <FaShieldAlt className="text-amber-600" />
                            <span>{isRu ? "Проверяйте лицензию TÜRSAB D2" : "Verify TÜRSAB D2 Tourist License"}</span>
                        </h4>
                        <p>
                            {isRu
                                ? "В Турции перевозка туристов на частных автомобилях без государственной лицензии D2 / TÜRSAB A-Class строго запрещена транспортной полицией. Все рекомендуемые нами перевозчики имеют официальные стикеры на лобовом стекле и страховку на каждого пассажира."
                                : "In Turkey, tourist transfers in private vehicles without a state-issued D2 / TÜRSAB A-Class license are strictly prohibited and fined at checkpoints. All recommended dispatch partners carry official windshield permits and full passenger insurance."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
