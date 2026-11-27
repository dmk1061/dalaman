import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaUserFriends, FaUtensils, FaCompass, FaChevronRight, FaMountain, FaCalendarAlt, FaFish, FaPaperPlane, FaWind, FaHotTub, FaShoppingBag, FaChild, FaCocktail, FaLandmark, FaTree } from 'react-icons/fa';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

const collectionsMetaByLocale: Record<string, { title: string; description: string }> = {
    ru: {
        title: 'Коллекции впечатлений и Идеи выходного дня | Дача — Каш',
        description: 'Авторские подборки маршрутов: романтические уикенды в Каше, семейный отдых в Дальяне, треккинговые тропы Ликии и гастрономические туры.',
    },
    en: {
        title: 'Curated Collections & Weekend Getaway Ideas | Dalaman Guide',
        description: 'Handpicked travel collections: romantic weekends in Kas, family retreats in Dalyan, Lycian Way trekking paths, and culinary road trips.',
    },
    de: {
        title: 'Kuratiere Kollektionen & Wochenend-Ideen | Dalaman Guide',
        description: 'Ausgewählte Reisesammlungen: romantische Wochenenden in Kaş, Familienurlaub in Dalyan, Wanderwege des Lykischen Weges und kulinarische Touren.',
    },
    tr: {
        title: 'Seçkin Koleksiyonlar ve Hafta Sonu Fikirleri | Dalaman Rehberi',
        description: 'Özenle hazırlanmış seyahat koleksiyonları: Kaş\'ta romantik hafta sonları, Dalyan\'da aile tatili, Likya Yolu yürüyüş rotaları ve gastronomi turları.',
    },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale || 'en';
    const meta = collectionsMetaByLocale[locale] || collectionsMetaByLocale['en'];
    return buildPageMetadata({
        locale,
        pathname: '/collections',
        title: meta.title,
        description: meta.description,
        image: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg',
    });
}

const getCollections = (locale: string, dict: any) => [
    {
        title: locale === 'ru' ? 'Романтика & Богемный Каш' : (dict?.main_content?.collections?.romantic || 'Romantic Kaş'),
        count: locale === 'ru' ? '48 часов на двоих' : '48 Hours for Two',
        image: "/api/images/locations/kas/ruines/kastombs/kastombs.jpg",
        tag: locale === 'ru' ? 'Уикенд' : 'Weekend',
        icon: <FaHeart />,
        description: locale === 'ru' 
            ? 'Уединенные бутик-отели Чукурбага, закат с вином в античном амфитеатре Antiphellos и приватная лодка над затонувшим городом Кекова.'
            : 'Secluded Çukurbağ villas, sunset wine inside the Antiphellos amphitheater, and private boats above sunken Kekova.',
        color: "bg-pink-500",
        href: `/${locale}/routes/weekends`
    },
    {
        title: locale === 'ru' ? 'Треккинг & Ликийская тропа' : 'Trekking & Lycian Way',
        count: locale === 'ru' ? '12+ горных этапов' : '12+ Mountain Stages',
        image: "/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg",
        tag: locale === 'ru' ? 'Атлас троп' : 'Trail Atlas',
        icon: <FaMountain />,
        description: locale === 'ru'
            ? 'Исчерпывающий интерактивный атлас: от Оваджика и Кабака до ущелья Саклыкент и Карийского пути. Перепады высот и источники воды.'
            : 'The definitive interactive trail atlas: from Ovacik and Kabak to Saklikent gorge and the Carian Trail. Elevations & water sources.',
        color: "bg-emerald-600",
        href: `/${locale}/routes/trekking`
    },
    {
        title: locale === 'ru' ? 'Семейный Дальян & Черепахи' : (dict?.main_content?.collections?.family || 'Family Dalyan & Turtles'),
        count: locale === 'ru' ? '48 часов эко-релакса' : '48 Hours Eco-Relax',
        image: "/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg",
        tag: locale === 'ru' ? 'С детьми' : 'Family',
        icon: <FaUserFriends />,
        description: locale === 'ru'
            ? 'Прогулка на лодке по тростниковым лабиринтам к пляжу Изтузу, встреча с черепахами Caretta, термы Султание и качели над рекой Юварлакчай.'
            : 'Reed-maze boat trips to Iztuzu turtle beach, Sultaniye thermal mud pools, and over-water wooden swings in Yuvarlakçay.',
        color: "bg-blue-500",
        href: `/${locale}/routes/weekends`
    },
    {
        title: locale === 'ru' ? 'Маршруты однодневных поездок' : 'Day Trips & Road Trips',
        count: locale === 'ru' ? '8 лучших авто-маршрутов' : '8 Top Road Trips',
        image: "/api/images/locations/dacha/ruine/knidos/knidos.jpg",
        tag: locale === 'ru' ? 'Роуд-трип' : 'Road Trip',
        icon: <FaCompass />,
        description: locale === 'ru'
            ? 'Куда поехать на один день из Даламана, Фетхие или Мармариса: античный Книдос, ветряные мельницы Кызлан и секретные бухты.'
            : 'Where to drive for a perfect day from Dalaman, Fethiye or Marmaris: ancient Knidos, Kizlan windmills and hidden coves.',
        color: "bg-amber-500",
        href: `/${locale}/articles/34_turisticheskie_marshruty_i_odnodnevnye_poezdki`
    },
    {
        title: locale === 'ru' ? 'Дайвинг, снорклинг и рыбалка' : locale === 'de' ? 'Tauchen & Angeln' : locale === 'tr' ? 'Dalış ve Balıkçılık' : 'Diving & Coastal Fishing',
        count: locale === 'ru' ? '23 вида рыб · 16 спотов' : locale === 'de' ? '23 Arten · 16 Spots' : locale === 'tr' ? '23 Tür · 16 Nokta' : '23 Species · 16 Spots',
        image: "/api/images/locations/kas/beach/limangzi/limangzi.jpg",
        tag: locale === 'ru' ? 'Море' : locale === 'de' ? 'Meer' : locale === 'tr' ? 'Deniz' : 'Marine',
        icon: <FaFish />,
        description: locale === 'ru'
            ? 'Интерактивная карта дайв-сайтов и точек рыбалки от Датчи до Каша, энциклопедия рыб с лимитами Tebliğ 6/2, прокат снастей и магазины.'
            : locale === 'de'
            ? 'Interaktive Karte für Tauchen & Angeln von Datça bis Kaş, 23-Arten-Lexikon mit Tebliğ 6/2 Schonmaßen, Verleih & Angelläden.'
            : locale === 'tr'
            ? 'Datça’dan Kaş’a dalış ve balık avı haritası, 23 tür ansiklopedisi, 6/2 Tebliğ boy limitleri, kiralama fiyatları ve av bayileri.'
            : 'Interactive map of dive sites and angling spots from Datça to Kaş, 23-species marine encyclopedia with Tebliğ 6/2 limits, gear rentals, and tackle shops.',
        color: "bg-cyan-600",
        href: `/${locale}/diving-fishing`
    },
    {
        title: locale === 'ru' ? 'Параглайдинг с горы Бабадаг' : locale === 'de' ? 'Paragliding vom Babadağ' : locale === 'tr' ? 'Babadağ Yamaç Paraşütü' : 'Paragliding (Mount Babadağ)',
        count: locale === 'ru' ? '1200–1969 м · 3D-карта' : locale === 'de' ? '1200–1969 m · 3D-Karte' : locale === 'tr' ? '1200–1969 m · 3D Harita' : '1,200–1,969 m · 3D Map',
        image: "/api/images/locations/fethiye/todo/babadag/babadag.jpg",
        tag: locale === 'ru' ? 'Небо 3D' : locale === 'de' ? 'Flug 3D' : locale === 'tr' ? 'Uçuş 3D' : 'Flight 3D',
        icon: <FaPaperPlane />,
        description: locale === 'ru'
            ? '3D-карта рельефа Бабадага, Сакар-Тепе и Каша, схема стартов 1200–1969 м, Babadağ Teleferik, 5 слотов дня, цены с 360° видео и допуск SHGM.'
            : locale === 'de'
            ? '3D-Geländekarte von Babadağ, Sakartepe & Kaş, Startrampen 1200–1969 m, Babadağ Teleferik, 5 Flugzeiten, Preise & SHGM-Regeln.'
            : locale === 'tr'
            ? 'Babadağ, Sakartepe ve Kaş 3D arazi haritası, 1200–1969 m pist şeması, Teleferik ücretleri, 5 uçuş saati, uygunluk testi ve SHGM kuralları.'
            : 'Live 3D relief map of Babadağ, Sakartepe & Kaş, 1,200–1,969 m launch profile, Teleferik guide, 5 daily slots, readiness checker & SHGM rules.',
        color: "bg-sky-600",
        href: `/${locale}/paragliding`
    },
    {
        title: locale === 'ru' ? 'Кайт и виндсёрфинг (Акьяка, Датча)' : locale === 'de' ? 'Kite & Windsurfen (Akyaka, Datça)' : locale === 'tr' ? 'Kite & Rüzgar Sörfü (Akyaka, Datça)' : 'Kite & Windsurfing (Akyaka, Datça)',
        count: locale === 'ru' ? '4 спота · Термик 3D' : locale === 'de' ? '4 Spots · Thermik 3D' : locale === 'tr' ? '4 Nokta · Termik 3D' : '4 Spots · Thermal 3D',
        image: "/api/images/locations/marmaris/beach/Akyaka/Akyaka.jpg",
        tag: locale === 'ru' ? 'Ветер 3D' : locale === 'de' ? 'Wind 3D' : locale === 'tr' ? 'Rüzgar 3D' : 'Wind 3D',
        icon: <FaWind />,
        description: locale === 'ru'
            ? '3D-карта заливов Акьяки, Датчи, Сарыгерме и Чалыша, профиль термика 09:00–19:00, калькулятор кайта/паруса, IKO 1–3, цены школ и красные зоны.'
            : locale === 'de'
            ? '3D-Karte von Akyaka, Datça, Sarıgerme & Çalış, Thermik-Verlauf 09:00–19:00, Größenrechner, IKO 1–3, Preise 2026 & Kite-Verbotszonen.'
            : locale === 'tr'
            ? 'Akyaka, Datça, Sarıgerme ve Çalış 3D haritası, 09:00–19:00 termik eğrisi, ekipman boy hesaplayıcı, IKO 1–3 ve yasaklı bölgeler.'
            : 'Live 3D bay map of Akyaka, Datça, Sarıgerme & Çalış, hourly thermal curve, gear sizing calculator, IKO 1–3 roadmap & no-kite red zones.',
        color: "bg-teal-600",
        href: `/${locale}/kitesurfing`
    },
    {
        title: locale === 'ru' ? 'Горячие источники, грязи и хаммамы' : locale === 'de' ? 'Thermalquellen, Schlammbäder & Hamams' : locale === 'tr' ? 'Kaplıcalar, Çamur Banyoları & Hamam' : 'Hot Springs, Mud Baths & Hammams',
        count: locale === 'ru' ? '6 терм + Хаммамы 3D' : locale === 'de' ? '6 Thermen + Hamams 3D' : locale === 'tr' ? '6 Kaplıca + Hamam 3D' : '6 Springs + Hammams 3D',
        image: "/api/images/locations/koycegiz/todo/Sultanye/sultanye2.jpg",
        tag: locale === 'ru' ? 'Термы 40 °C' : locale === 'de' ? 'Thermen 40 °C' : locale === 'tr' ? 'Termal 40 °C' : 'Thermal 40 °C',
        icon: <FaHotTub />,
        description: locale === 'ru'
            ? '3D-карта терм Султание (+42 °C), бесплатных серных источников Даламана и Датчи, 5 этапов османского хаммама, цены 2026 и чекер противопоказаний.'
            : locale === 'de'
            ? '3D-Karte von Sultaniye (+42 °C), Gratis-Quellen in Dalaman/Datça, 5 Hamam-Schritte, Preise 2026 und Gesundheitscheck.'
            : locale === 'tr'
            ? 'Sultaniye (+42 °C), Dalaman/Datça ücretsiz kaynakları, 5 hamam aşaması, 2026 ücretleri ve sağlık uygunluk testli 3D rehber.'
            : 'Live 3D map of Sultaniye 42 °C springs, free Dalaman/Datça mineral pools, 5 hammam stages, 2026 pricing & medical readiness checker.',
        color: "bg-orange-600",
        href: `/${locale}/thermal-spa`
    },
    {
        title: locale === 'ru' ? 'Рынки, базары и ремёсла (Пн–Вс)' : locale === 'de' ? 'Wochenmärkte, Basare & Handwerk' : locale === 'tr' ? 'Halk Pazarları, Çarşılar ve El Sanatları' : 'Weekly Markets, Bazaars & Crafts',
        count: locale === 'ru' ? '15 точек · Пн–Вс 3D' : locale === 'de' ? '15 Orte · Mo–So 3D' : locale === 'tr' ? '15 Nokta · Pzt–Paz 3D' : '15 Spots · Mon–Sun 3D',
        image: "/images/markets-crafts/hero-spices.jpg",
        tag: locale === 'ru' ? 'Базары 3D' : locale === 'de' ? 'Märkte 3D' : locale === 'tr' ? 'Pazarlar 3D' : 'Bazaars 3D',
        icon: <FaShoppingBag />,
        description: locale === 'ru'
            ? 'Расписание рынков Пн–Вс, 3D-карта 15 базаров и деревень мастеров, проверка подлинности дастара, пештемалей и килимов, правила торга и Закон № 2863.'
            : locale === 'de'
            ? 'Mo–So Marktkalender, 3D-Karte mit 15 Orten, Echtheitschecks für Dastar-Leinen, Yörük-Kelims & Pinienhonig, Pazarlık-Tipps und Zoll-Check DLM.'
            : locale === 'tr'
            ? 'Pazartesi–Pazar pazar takvimi, 15 noktalı 3D harita, Yeşilüzümlü dastar ve kilim testi, akıllı pazarlık saatleri ve 2863 sayılı gümrük kuralları.'
            : 'Mon–Sun coastal Pazar schedule, 15-spot 3D map, genuine Yeşilüzümlü dastar, peştemal & Yörük kilim tests, haggle hours & Law No. 2863 customs check.',
        color: "bg-amber-600",
        href: `/${locale}/markets-crafts`
    },
    {
        title: locale === 'ru' ? 'Гастрономия и кухня Эгеиды' : locale === 'de' ? 'Gastronomie & Ägäis-Küche' : locale === 'tr' ? 'Gastronomi ve Yöresel Mutfak' : 'Gastronomy & Local Cuisine',
        count: locale === 'ru' ? '24 блюда · 16 локаций' : locale === 'de' ? '24 Gerichte · 16 Orte' : locale === 'tr' ? '24 Lezzet · 16 Durak' : '24 Dishes · 16 Dining Spots',
        image: "/images/gastronomy/hero-gastronomy.jpg",
        tag: locale === 'ru' ? 'Кухня и места' : locale === 'de' ? 'Küche & Genuss' : locale === 'tr' ? 'Lezzet Rehberi' : 'Cuisine & Spots',
        icon: <FaUtensils />,
        description: locale === 'ru'
            ? 'Энциклопедия 24 блюд Муглы и Ликийского берега с ценами в евро, диетическими фильтрами, сезонностью по месяцам, картой 16 мест, где их пробовать, и фразами для заказа.'
            : locale === 'de'
            ? 'Enzyklopädie mit 24 Gerichten der Region Muğla in EUR, Diätfiltern, 12-Monats-Saison, Karte mit 16 kulinarischen Vierteln, Küsten-Ritualen und 10 Kellner-Sätzen.'
            : locale === 'tr'
            ? 'Muğla ve Likya kıyısından 24 yöresel lezzet, EUR bütçe aralıkları, mevsim takvimi, 16 duraklı interaktif harita, meyhane kültürü ve 2026 hesap kuralları.'
            : 'Encyclopedia of 24 Muğla & Lycian coast dishes with EUR prices, dietary filters, 12-month seasonality, interactive map of 16 dining quarters & 2026 bill rules.',
        color: "bg-rose-600",
        href: `/${locale}/gastronomy`
    },
    {
        title: locale === 'ru' ? 'Семейный отдых с детьми (0–17 лет)' : locale === 'de' ? 'Familienurlaub mit Kindern (0–17 J.)' : locale === 'tr' ? 'Çocuklarla Aile Tatili (0–17 Yaş)' : 'Family Vacation with Kids (Ages 0–17)',
        count: locale === 'ru' ? '18 идей · 16 мест · Коляски' : locale === 'de' ? '18 Ideen · 16 Orte · Buggy-Index' : locale === 'tr' ? '18 Aktivite · 16 Durak · Puset' : '18 Activities · 16 Spots · Stroller Index',
        image: "/api/images/locations/dalaman/beach/Sarigerme/sarigerme.jpg",
        tag: locale === 'ru' ? 'С детьми' : locale === 'de' ? 'Familie' : locale === 'tr' ? 'Aile Tatili' : 'Family',
        icon: <FaChild />,
        description: locale === 'ru'
            ? 'Фильтр по возрасту 0–17 лет и индексу коляски, 16 мест на карте (Сарыгерме, Олюдениз, DEKAMER, Orka World, Бабадаг), матрица 7 курортов от DLM и шпаргалка от жары 2026.'
            : locale === 'de'
            ? 'Altersfilter 0–17 J. & Buggy-Index, 16-Orte-Karte (Sarıgerme, Blaue Lagune, DEKAMER, Orka World, Babadağ), 7-Orte-Vergleich & Hitze-Tipps 2026.'
            : locale === 'tr'
            ? '0–17 yaş ve puset uygunluğu filtresi, 16 noktalı harita (Sarıgerme, Mavi Lagün, DEKAMER, Orka World, Babadağ), 7 belde matrisi ve 2026 aile rehberi.'
            : 'Filter by child age (0–17) & Stroller Index, 16 coastal spots (Sarıgerme, Blue Lagoon, DEKAMER turtles, Orka World, Babadağ), 7-town DLM matrix & 2026 heat rules.',
        color: "bg-blue-600",
        href: `/${locale}/family`
    },
    {
        title: locale === 'ru' ? 'Вечерняя жизнь, бары и фестивали' : locale === 'de' ? 'Nachtleben, Bars & Festivals' : locale === 'tr' ? 'Gece Hayatı, Barlar ve Festivaller' : 'Nightlife, Bars & Festivals',
        count: locale === 'ru' ? '21 точка · Фестивали + 3D' : locale === 'de' ? '21 Orte · Festivals + 3D' : locale === 'tr' ? '21 Nokta · Festivaller + 3D' : '21 Pins · Festivals + 3D',
        image: "/images/nightlife/hero-cocktail.jpg",
        tag: locale === 'ru' ? 'Бары и фестивали' : locale === 'de' ? 'Nightlife & Fest' : locale === 'tr' ? 'Gece & Festival' : 'Nightlife & Fest',
        icon: <FaCocktail />,
        description: locale === 'ru'
            ? '3D-карта 21 локации от Bar Street Мармариса и руфтопов Каша до миндального фестиваля Датчи, Air Games и регат: ритм ночи до/после 00:00, праздники 2027 и такси UKOME.'
            : locale === 'de'
            ? '3D-Karte mit 21 Spots von Marmaris Bar Street & Kaş-Rooftops bis Mandelblütenfest, Air Games & Regatten: 00:00-Regeln, Feiertage 2027 & UKOME-Taxi.'
            : locale === 'tr'
            ? 'Marmaris Barlar Sokağı ve Kaş teraslarından Badem Çiçeği, Hava Oyunları ve regattalara 21 noktalı 3D harita: 00:00 kuralı, 2027 bayramları & UKOME taksi.'
            : '3D map of 21 spots from Marmaris Bar Street & Kaş rooftops to Datça Almond Blossom, Air Games & regattas: 00:00 curfews, 2027 Bayram surges & UKOME taxis.',
        color: "bg-rose-700",
        href: `/${locale}/nightlife`
    },
    {
        title: locale === 'ru' ? 'Античные города Ликии и Карии' : locale === 'de' ? 'Antike Städte (Lykien & Karien)' : locale === 'tr' ? 'Likya ve Karya Antik Kentleri' : 'Ancient Cities of Lycia & Caria',
        count: locale === 'ru' ? '15 городов · Билеты 2026 + 3D' : locale === 'de' ? '15 Städte · Ticketcheck + 3D' : locale === 'tr' ? '15 Kent · Bilet Hesabı + 3D' : '15 Cities · 2026 Pass Calc + 3D',
        image: "/api/images/locations/kas/ruines/theater/theaterkas3.jpg",
        tag: locale === 'ru' ? 'Античность 3D' : locale === 'de' ? 'Antike 3D' : locale === 'tr' ? 'Antik 3D' : 'Ancient 3D',
        icon: <FaLandmark />,
        description: locale === 'ru'
            ? '3D-карта 15 руин от Книдоса и Кауноса до Патары, Ксантоса и Миры: калькулятор MuseumPass Ege vs Akdeniz, 5 бесплатных полисов без касс и маршруты без жары.'
            : locale === 'de'
            ? '3D-Karte mit 15 Ruinen von Knidos & Kaunos bis Patara & Myra: MuseumPass-Ege/Akdeniz-Rechner, 5 kostenlose Bergruinen (0 €) & Anti-Hitze-Routen.'
            : locale === 'tr'
            ? 'Knidos ve Kaunos’tan Patara, Ksanthos ve Myra’ya 15 noktalı 3D harita: Ege vs Akdeniz pass hesaplayıcı, 5 ücretsiz kent ve serin gezi rotaları.'
            : '3D map of 15 ruins from Knidos & Kaunos to Patara, Xanthos & Myra: live MuseumPass Ege vs Akdeniz calculator, 5 €0 open sites & heat-smart loops.',
        color: "bg-amber-600",
        href: `/${locale}/ancient-cities`
    },
    {
        title: locale === 'ru' ? 'Природа, нацпарки и заповедники' : locale === 'de' ? 'Natur, Nationalparks & Schluchten' : locale === 'tr' ? 'Doğa, Millî Parklar ve Kanyonlar' : 'Nature, National Parks & Canyons',
        count: locale === 'ru' ? '15 объектов · +6 °C реки + 3D' : locale === 'de' ? '15 Ziele · +6 °C Flüsse + 3D' : locale === 'tr' ? '15 Alan · +6 °C Nehirler + 3D' : '15 Parks · +6 °C Rivers + 3D',
        image: "/api/images/locations/dalyan/beach/Istuzu/istuzu.jpg",
        tag: locale === 'ru' ? 'Природа 3D' : locale === 'de' ? 'Natur 3D' : locale === 'tr' ? 'Doğa 3D' : 'Nature 3D',
        icon: <FaTree />,
        description: locale === 'ru'
            ? '3D-карта 15 заповедников, нацпарков и каньонов: черепахи DEKAMER на Изтузу, ледяной Саклыкент, Юварлакчай, река Азмак, эндемики и правила 2026.'
            : locale === 'de'
            ? '3D-Karte von DEKAMER İztuzu, Saklıkent-Schlucht & Azmak-Fluss bis Ölüdeniz–Kıdrak: Wassertemperaturen (+6–40 °C), Anti-Hitze-Planer & Waldsperren 2026.'
            : locale === 'tr'
            ? 'İztuzu DEKAMER, Saklıkent Kanyonu ve Azmak’tan Ölüdeniz–Kıdrak’a 15 noktalı 3D harita: +6–40 °C su sıcaklık farkı, serin rota seçici & 2026 kuralları.'
            : '3D map of 15 reserves from İztuzu DEKAMER & glacial Saklıkent Gorge to Azmak River & Kıdrak: river temps (+6–40 °C), heat-escape picker & 2026 laws.',
        color: "bg-emerald-700",
        href: `/${locale}/nature-parks`
    }
];

const CollectionsPage = async ({ params }: { params: { locale: string } }) => {
    const locale = params.locale || 'ru';
    const dict = await getDictionary(locale as Locale);
    const list = getCollections(locale, dict);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
            <Header locale={locale} />
            
            <main className="flex-grow portal-container py-16 md:py-20 pb-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4 border border-emerald-200/60 shadow-sm">
                        <FaCompass className="text-emerald-600" /> {locale === 'ru' ? 'АВТОРСКИЕ ГАЙДЫ И ПОДБОРКИ' : 'CURATED GUIDES & HUB'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase italic tracking-tight">
                        {locale === 'ru' ? 'Коллекции Впечатлений & Идеи Выходного Дня' : 'Curated Collections & Weekend Ideas'}
                    </h1>
                    <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
                        {locale === 'ru'
                            ? 'Мы собрали для вас готовые капсульные путешествия: от интерактивного атласа горных троп и 48-часовых уикендов с расчетом бюджета до гастрономических маршрутов и секретных пляжей без туристических толп.'
                            : 'We compiled turnkey capsule adventures: from our interactive mountain trail atlas and 48-hour weekend plans with inflation-shielded budgets to culinary road trips and hidden beaches.'}
                    </p>
                </div>

                {/* Quick Action Hub Banners */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    <Link
                        href={`/${locale}/routes/weekends`}
                        className="group relative rounded-[2.5rem] p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl overflow-hidden border border-slate-700 hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                        <div className="flex items-center gap-3 text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">
                            <FaCalendarAlt size={16} /> {locale === 'ru' ? 'Готовые 48-часовые планы' : 'Turnkey 48-Hour Plans'}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight mb-2">
                            {locale === 'ru' ? 'Идеи Выходного Дня' : 'Weekend Getaway Ideas'}
                        </h3>
                        <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed mb-6">
                            {locale === 'ru' ? '4 проработанных таймлайна (Пятница вечер – Воскресенье) с бюджетом в евро и лирах на двоих, чек-листами и точными часами.' : '4 curated weekend timelines (Friday-Sunday) with 2-person budget breakdowns, checklists, and hour-by-hour schedules.'}
                        </p>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-colors">
                            {locale === 'ru' ? 'Открыть уикенды →' : 'Explore Weekends →'}
                        </span>
                    </Link>

                    <Link
                        href={`/${locale}/routes/trekking`}
                        className="group relative rounded-[2.5rem] p-8 bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-2xl overflow-hidden border border-emerald-700/50 hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
                        <div className="flex items-center gap-3 text-emerald-300 text-xs font-black uppercase tracking-widest mb-3">
                            <FaMountain size={16} /> {locale === 'ru' ? 'Ликийская и Карийская тропы' : 'Lycian & Carian Trails'}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight mb-2">
                            {locale === 'ru' ? 'Атлас Треккинга' : 'Trekking & Trails Atlas'}
                        </h3>
                        <p className="text-emerald-100/90 text-xs md:text-sm font-medium leading-relaxed mb-6">
                            {locale === 'ru' ? '12+ этапов по часам и километрам с набором высот, фильтрами сложности и источниками питьевой воды (`Çeşme`).' : '12+ stages with exact distances, elevation gain/loss profiles, difficulty filters, and natural water fountain locations.'}
                        </p>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 group-hover:bg-emerald-100 font-black text-xs uppercase tracking-wider shadow-lg transition-colors">
                            {locale === 'ru' ? 'Открыть атлас троп →' : 'Explore Trail Atlas →'}
                        </span>
                    </Link>
                </div>

                {/* Collections Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {list.map((item, idx) => (
                        <div key={idx} className="group bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-6 right-6">
                                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-white border border-white/20">
                                        {item.tag}
                                    </span>
                                </div>
                                <div className="absolute bottom-6 left-8 flex items-center space-x-4">
                                    <div className={`p-3.5 rounded-2xl ${item.color} text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div className="text-white">
                                        <h3 className="font-black text-xl leading-tight uppercase italic">{item.title}</h3>
                                        <p className="text-emerald-300 text-[10px] font-black uppercase tracking-widest mt-0.5">{item.count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {item.description}
                                </p>
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:text-emerald-700 transition-colors"
                                >
                                    <span>{locale === 'ru' ? 'Перейти в подборку' : 'Explore Collection'}</span>
                                    <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <FaChevronRight size={10} />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            
            <Footer locale={locale} />
        </div>
    );
};

export default CollectionsPage;
