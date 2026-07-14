"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    FaMountain, 
    FaCompass, 
    FaMapMarkerAlt, 
    FaClock, 
    FaExclamationTriangle, 
    FaTint, 
    FaWalking, 
    FaInfoCircle, 
    FaChevronRight, 
    FaFilter,
    FaRoute,
    FaStar
} from 'react-icons/fa';

export interface TrailStage {
    id: string;
    region: 'lycian' | 'carian' | 'dayhike' | 'canyon';
    difficulty: 1 | 2 | 3 | 4 | 5; // 1-easy, 5-extreme
    distanceKm: number;
    elevationGainM: number;
    elevationLossM: number;
    durationHours: string;
    title: Record<string, string>;
    subtitle: Record<string, string>;
    description: Record<string, string>;
    startPoint: Record<string, string>;
    endPoint: Record<string, string>;
    waterSources: Record<string, string>;
    highlights: Record<string, string[]>;
    gearAdvice: Record<string, string>;
    mapsQuery: string;
    image: string;
}

const trailStages: TrailStage[] = [
    {
        id: 'ovacik-faralya',
        region: 'lycian',
        difficulty: 3,
        distanceKm: 14,
        elevationGainM: 550,
        elevationLossM: 400,
        durationHours: '4.5 - 5.5 ч.',
        title: {
            ru: 'Оваджик ➔ Фаралья (Начальный этап Ликийской тропы)',
            en: 'Ovacık ➔ Faralya (Official Lycian Way Start)',
            de: 'Ovacık ➔ Faralya (Offizieller Start des Lykischen Weges)',
            tr: 'Ovacık ➔ Faralya (Resmi Likya Yolu Başlangıcı)'
        },
        subtitle: {
            ru: 'Панорама Голубой лагуны Олюдениза и сосновые склоны горы Бабадаг',
            en: 'Panoramic views over Oludeniz Blue Lagoon & Babadağ pine slopes',
            de: 'Panoramablick auf die Blaue Lagune von Ölüdeniz & Babadağ-Kiefern',
            tr: 'Ölüdeniz Mavi Lagün panaromik manzarası ve Babadağ çam yamaçları'
        },
        description: {
            ru: 'Официальный старт легендарной Ликийской тропы (отмечен каменными воротами в Оваджике). Тропа плавно траверсирует западный склон горы Бабадаг на высоте 600-800 метров над морем. С первой же половины пути открываются захватывающие дух виды на бирюзовую Голубую лагуну Олюдениза и остров Святого Николая. Завершается этап в горной деревне Фаралья прямо над скалистой пропастью Долины Бабочек.',
            en: 'The official starting point of the legendary Lycian Way (marked by stone archways in Ovacık). The trail smoothly traverses the western slopes of Mount Babadağ at 600-800 meters elevation. The first half offers breathtaking vistas of Oludeniz Blue Lagoon and St. Nicholas Island. The stage concludes in the alpine village of Faralya perched right above the dramatic cliffs of Butterfly Valley.',
            de: 'Der offizielle Startpunkt des legendären Lykischen Weges in Ovacık. Der Pfad durchquert sanft die Westhänge des Babadağ in 600-800 Metern Höhe. Die erste Hälfte bietet atemberaubende Ausblicke auf die Blaue Lagune von Ölüdeniz. Die Etappe endet im Bergdorf Faralya direkt über den Klippen des Schmetterlingstales.',
            tr: 'Efsanevi Likya Yolu\'nun Ovacık\'taki tak ile başlayan resmi ilk etabı. Patika, Babadağ\'ın batı yamaçlarından denizden 600-800 metre yükseklikte ilerler. İlk yarıda Ölüdeniz Mavi Lagünü\'nün nefes kesici manzaraları eşlik eder. Etap, Kelebekler Vadisi uçurumlarının başındaki Faralya köyünde son bulur.'
        },
        startPoint: {
            ru: 'Оваджик, ворота Ликийской тропы (координаты 36.5786, 29.1419)',
            en: 'Ovacık Lycian Way Gate (36.5786, 29.1419)',
            de: 'Ovacık Lykischer Weg Tor (36.5786, 29.1419)',
            tr: 'Ovacık Likya Yolu Giriş Takı (36.5786, 29.1419)'
        },
        endPoint: {
            ru: 'Деревня Фаралья (Узаnyurt), смотровая площадка над Долиной Бабочек',
            en: 'Faralya Village (Uzanyurt), Butterfly Valley overlook',
            de: 'Dorf Faralya (Uzanyurt), Aussichtspunkt Schmetterlingstal',
            tr: 'Faralya Köyü (Uzanyurt), Kelebekler Vadisi seyir noktası'
        },
        waterSources: {
            ru: 'Есть 2 источника (çeşme) на первых 5 км, далее воды нет до деревни Коzağaç (10-й км). Рекомендуется запас от 2 литров на человека.',
            en: '2 drinking fountains (`çeşme`) in the first 5 km, then no water until Kozağaç village (km 10). Carry at least 2L per person.',
            de: '2 Trinkbrunnen (Çeşme) auf den ersten 5 km, dann kein Wasser bis Kozağaç (km 10). Mindestens 2L pro Person mitnehmen.',
            tr: 'İlk 5 km\'de 2 çeşme bulunur, ardından Kozağaç köyüne (10. km) kadar su yoktur. Kişi başı en az 2 litre su taşınmalıdır.'
        },
        highlights: {
            ru: [
                'Каменные стартовые ворота Ликийской тропы в Оваджике',
                'Каноническая фототочка с панорамой Голубой лагуны Олюдениза',
                'Горное селение Козагач с традиционными каменными цистернами',
                'Обрыв над Долиной Бабочек на закате'
            ],
            en: [
                'Iconic stone Lycian Way starting gate in Ovacık',
                'Postcard-perfect viewpoint overlooking Oludeniz Blue Lagoon',
                'Historic Kozağaç hamlet with traditional stone water cisterns',
                'Dramatic Butterfly Valley cliff edge at sunset'
            ],
            de: [
                'Steinerner Startbogen des Lykischen Weges in Ovacık',
                'Bilderbuch-Aussichtspunkt auf die Blaue Lagune von Ölüdeniz',
                'Bergweiler Kozağaç mit traditionellen Zisternen',
                'Klippenkante des Schmetterlingstales zum Sonnenuntergang'
            ],
            tr: [
                'Ovacık\'taki sembolik Likya Yolu başlangıç takı',
                'Ölüdeniz Mavi Lagün panaromik seyir noktası',
                'Geleneksel sarnıçlarıyla Kozağaç dağ yerleşimi',
                'Kelebekler Vadisi uçurumunda gün batımı'
            ]
        },
        gearAdvice: {
            ru: 'Обязательно треккинговые ботинки с жесткой подошвой (на каменистых участках можно подвернут ногу), головной убор и треккинговые палки.',
            en: 'Sturdy hiking boots with ankle support (very rocky terrain), sun hat, and trekking poles strongly recommended.',
            de: 'Feste Wanderschuhe mit Knöchelschutz (sehr steinig), Sonnenhut und Trekkingstöcke dringend empfohlen.',
            tr: 'Bilekli ve sert tabanlı trekking botları (taşlık zemin burkulma riski taşır), şapka ve baton zorunludur.'
        },
        mapsQuery: 'Lycian Way Start Gate Ovacik to Faralya',
        image: '/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg'
    },
    {
        id: 'faralya-kabak',
        region: 'lycian',
        difficulty: 2,
        distanceKm: 8,
        elevationGainM: 300,
        elevationLossM: 450,
        durationHours: '2.5 - 3.5 ч.',
        title: {
            ru: 'Фаралья ➔ Бухта Кабак (Лесная тропа в богемный рай)',
            en: 'Faralya ➔ Kabak Bay (Pine Forest Trail to Bohemian Haven)',
            de: 'Faralya ➔ Kabak-Bucht (Waldpfad ins Bohemien-Paradies)',
            tr: 'Faralya ➔ Kabak Koyu (Bohem Cennete Çam Ormanı Patikası)'
        },
        subtitle: {
            ru: 'Спуски через реликтовые сосны, водопады и уединенная бухта для кемпинга',
            en: 'Descents through relict pine forests, hidden waterfalls, and secluded camping coves',
            de: 'Abstiege durch alte Kiefernwälder, versteckte Wasserfälle und ruhige Buchten',
            tr: 'Kızılçam ormanları arasından inişler, şelaleler ve kampçılar koyu Kabak'
        },
        description: {
            ru: 'Живописный и сравнительно легкий отрезок Ликийской тропы, соединяющий верхнюю Фаралью с культовой бухтой Кабак. Тропа идет сквозь тенистый сосновый лес, огибая ущелья с небольшими сезонными водопадами. В конце пути вас ждет крутой спуск к пляжу Кабак, где расположены десятки уютных эко-кемпингов, бунгало и кафе на берегу моря.',
            en: 'A scenic and relatively moderate section of the Lycian Way connecting high Faralya with the cult-favorite Kabak Bay. The path winds through shaded pine groves around ravines featuring small seasonal waterfalls. The stage concludes with a steep zigzag descent right onto Kabak beach, home to relaxed eco-camps and seaside bungalows.',
            de: 'Ein malerischer und relativ mittelschwerer Abschnitt des Lykischen Weges. Der Pfad schlängelt sich durch schattige Kiefernwälder um Schluchten mit kleinen saisonalen Wasserfällen und endet am Strand von Kabak.',
            tr: 'Faralya\'yı ikonik Kabak Koyu\'na bağlayan keyifli ve orta zorlukta bir Likya Yolu etabı. Patika gölgeli kızılçam ormanları ve küçük şelaleli vadilerden geçerek Kabak sahilindeki ekolojik kamp alanlarına iner.'
        },
        startPoint: {
            ru: 'Фаралья, центр деревни у мечети',
            en: 'Faralya Village center near the mosque',
            de: 'Dorfzentrum Faralya bei der Moschee',
            tr: 'Faralya köy merkezi camii yanı'
        },
        endPoint: {
            ru: 'Пляж Кабак (Kabak Sahili)',
            en: 'Kabak Beach (`Kabak Sahili`)',
            de: 'Strand von Kabak (Kabak Sahili)',
            tr: 'Kabak Sahili (Kabak Koyu plajı)'
        },
        waterSources: {
            ru: 'Источник в середине пути (у оливковых садов Акташ) плюс множество кафе по прибытии в Кабак.',
            en: 'Fountain midway near Aktaş olive groves, plus numerous cafes upon arrival in Kabak.',
            de: 'Brunnen auf halber Strecke bei den Aktaş-Olivenhainen, viele Cafés am Ziel in Kabak.',
            tr: 'Yarı yolda Aktaş zeytinlikleri yanında çeşme ve Kabak\'ta çok sayıda kafe mola noktası.'
        },
        highlights: {
            ru: [
                'Мыс Акташ с бирюзовой дикой бухтой',
                'Хвойный лес с ароматом средиземноморских смол',
                'Панорамный вид сверху на амфитеатр бухты Кабак',
                'Вечерняя атмосфера у костра в кемпингах Кабака'
            ],
            en: [
                'Aktaş point overlooking pristine turquoise coves',
                'Resin-scented Mediterranean pine forest stretches',
                'Panoramic amphitheater overview of Kabak valley',
                'Campfire bohemian vibe at Kabak beach bungalows'
            ],
            de: [
                'Aktaş-Kap mit Blick auf unberührte türkisfarbene Buchten',
                'Duftender mediterraner Kiefernwald',
                'Panoramablick auf das Amphitheater des Kabak-Tals',
                'Lagerfeuer-Atmosphäre in den Bungalow-Camps von Kabak'
            ],
            tr: [
                'Turkuaz koylardan geçen Aktaş Burnu patikası',
                'Çam kokulu Akdeniz orman geçişleri',
                'Kabak Vadisi\'nin amfi tiyatro benzeri panaromik görünümü',
                'Kabak sahilindeki kamp alanlarının samimi akşam atmosferi'
            ]
        },
        gearAdvice: {
            ru: 'Обувь с хорошим протектором (спуск в Кабак по сыпучему грунту довольно крутой). Купальник в рюкзаке обязателен.',
            en: 'Trail shoes with solid grip (the final descent into Kabak has loose gravel). Pack swimwear.',
            de: 'Schuhe mit gutem Profil (der letzte Abstieg nach Kabak ist rutschig). Badesachen einpacken.',
            tr: 'Kaymaz tabanlı ayakkabı (Kabak\'a son iniş çarşak ve diktir). Sırt çantasında mayo bulundurunuz.'
        },
        mapsQuery: 'Faralya to Kabak Koyu',
        image: '/api/images/locations/fethiye/beach/belcekiz/belcekiz2.jpg'
    },
    {
        id: 'kabak-alinca-gey',
        region: 'lycian',
        difficulty: 5,
        distanceKm: 15,
        elevationGainM: 850,
        elevationLossM: 200,
        durationHours: '6.0 - 7.5 ч.',
        title: {
            ru: 'Кабак ➔ Алинджа ➔ Гей (Экстремальный вертикальный этап Ликии)',
            en: 'Kabak ➔ Alınca ➔ Gey (Extreme Vertical Lycian Stage)',
            de: 'Kabak ➔ Alınca ➔ Gey (Extremes vertikales Lykisches Abenteuer)',
            tr: 'Kabak ➔ Alınca ➔ Gey (Likya\'nın Zorlu ve Dik Tırmanış Etabı)'
        },
        subtitle: {
            ru: 'Головокружительный подъем по отвесной скале на высоту 750 метров над Эгейским морем',
            en: 'Vertiginous cliffside ascent to 750 meters above the open Aegean Sea',
            de: 'Schwindelerregender Klippenaufstieg auf 750 Meter über dem Ägäischen Meer',
            tr: 'Ege Denizi\'nin 750 metre üzerinde sarp falezlerden nefes kesici tırmanış'
        },
        description: {
            ru: 'Один из самых зрелищных, сложных и физически изматывающих этапов всей Ликийской тропы. Тропа из бухты Кабак резко уходит вертикально вверх по скалистой стене к высокогорной деревне Алинджа (Alınca), висящей на краю пропасти как орлиное гнездо. Отсюда открывается легендарный панорамный вид на «Семь мысов» (Yedi Burunlar) — бесконечную череду скалистых заливов, уходящих за горизонт. Далее тропа траверсирует горные склоны к аутентичной деревне Гей (Gey).',
            en: 'One of the most spectacular, demanding, and physically taxing stages of the entire Lycian Way. From Kabak beach, the trail climbs straight up a sheer cliff face to the alpine hamlet of Alınca, hanging over the abyss like an eagle\'s nest. From here you witness the legendary panorama of "Seven Capes" (`Yedi Burunlar`) — an endless sequence of rocky headlands fading into the sea horizon.',
            de: 'Eine der spektakulärsten und anstrengendsten Etappen des Lykischen Weges. Vom Strand in Kabak klettert der Pfad senkrecht an einer Felswand zum Bergweiler Alınca empor, der wie ein Adlerhorst über dem Abgrund hängt. Von hier aus haben Sie den legendären Blick auf die "Sieben Kaps" (Yedi Burunlar).',
            tr: 'Tüm Likya Yolu\'nun en görkemli, en zorlu ve fiziksel olarak en efor gerektiren etaplarından biri. Kabak Koyu\'ndan sarp kayalık duvara dik tırmanan patika, uçurumun kenarına kartal yuvası gibi konmuş Alınca köyüne ulaşır. Buradan ufka uzanan Yedi Burunlar\'ın efsanevi manzarası izlenir.'
        },
        startPoint: {
            ru: 'Бухта Кабак (нижний пляж или развилка наверху)',
            en: 'Kabak Bay (beach level or top junction)',
            de: 'Kabak-Bucht (Strandniveau oder obere Abzweigung)',
            tr: 'Kabak Koyu (plaj seviyesi veya üst yol ayrımı)'
        },
        endPoint: {
            ru: 'Деревня Гей (Yediburunlar Köyü)',
            en: 'Gey Village (`Yediburunlar Köyü`)',
            de: 'Dorf Gey (Yediburunlar Köyü)',
            tr: 'Gey Köyü (Yediburunlar Köyü)'
        },
        waterSources: {
            ru: 'Воды на подъеме от Кабака до Алинджи (первые 3.5 часа) НЕТ ВООБЩЕ. Нести минимум 3-4 литра на человека в жару.',
            en: 'ZERO water during the 3.5-hour vertical climb from Kabak to Alınca. Must carry at least 3-4L per person.',
            de: 'KEIN Wasser auf dem 3,5-stündigen Aufstieg von Kabak nach Alınca. Mindestens 3-4L pro Person mitführen.',
            tr: 'Kabak\'tan Alınca\'ya olan 3.5 saatlik dik tırmanışta HİÇ SU YOKTUR. Kişi başı en az 3-4 litre su taşınması hayati önem taşır.'
        },
        highlights: {
            ru: [
                'Смотровая площадка в Алиндже с видом на «Семь мысов» (Yedi Burunlar)',
                'Горные террасы с древними оливковыми садами',
                'Каменные дома в деревне Гей с домашним сыром и айраном от местных жителей',
                'Ощущение полета над бескрайним морем'
            ],
            en: [
                'Alınca viewpoint facing the dramatic "Seven Capes" (`Yedi Burunlar`)',
                'Steep mountain terraces carved with ancient olive trees',
                'Authentic stone houses in Gey offering fresh homemade ayran and goat cheese',
                'Surreal sense of walking along the clouds above the Aegean'
            ],
            de: [
                'Aussichtspunkt Alınca mit Blick auf die spektakulären "Sieben Kaps" (Yedi Burunlar)',
                'Steile Bergterrassen mit uralten Olivenbäumen',
                'Steinbauernhäuser in Gey mit hausgemachtem Ziegenkäse und Ayran',
                'Gefühl, über den Wolken hoch über der Ägäis zu wandern'
            ],
            tr: [
                'Yedi Burunlar\'ın büyüleyici manzarasına hakim Alınca seyir terası',
                'Asırlık zeytin ağaçlarının çevrelediği dik dağ terasları',
                'Gey köyündeki taş evlerde yerel halktan taze ayran ve keçi peyniri ikramı',
                'Bulutların üzerinde Ege Denizi\'ne yukarıdan bakma hissi'
            ]
        },
        gearAdvice: {
            ru: 'ЭКСТРЕМАЛЬНАЯ СЛОЖНОСТЬ. Категорически не рекомендуется в летний зной (июль-август). Обязательны треккинговые палки, аптечка и запас углеводов.',
            en: 'EXTREME DIFFICULTY. Do not attempt in summer peak heat (July-August). Trekking poles, first aid kit, and electrolyte snacks required.',
            de: 'EXTREME SCHWIERIGKEIT. Im Hochsommer (Juli-August) nicht empfohlen. Trekkingstöcke, Erste-Hilfe-Set und Elektrolyte zwingend erforderlich.',
            tr: 'ZORLU ETAP. Temmuz ve Ağustos yaz sıcaklarında kesinlikle önerilmez. Baton, ilk yardım seti ve elektrolit takviyesi zorunludur.'
        },
        mapsQuery: 'Kabak Koyu to Alinca to Gey Village',
        image: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg'
    },
    {
        id: 'kayakoy-oludeniz',
        region: 'dayhike',
        difficulty: 2,
        distanceKm: 6.5,
        elevationGainM: 250,
        elevationLossM: 400,
        durationHours: '2.0 - 2.5 ч.',
        title: {
            ru: 'Каякёй ➔ Олюдениз (Исторический перевал к Голубой лагуне)',
            en: 'Kayaköy ➔ Ölüdeniz (Historic Mountain Pass to Blue Lagoon)',
            de: 'Kayaköy ➔ Ölüdeniz (Historischer Bergpass zur Blauen Lagune)',
            tr: 'Kayaköy ➔ Ölüdeniz (Mavi Lagüne Tarihi Dağ Geçidi)'
        },
        subtitle: {
            ru: 'Идеальный однодневный хайк из заброшенного города на лучший пляж Турции',
            en: 'The perfect 2-hour day hike connecting a ghost town with Turkey\'s top beach',
            de: 'Die perfekte Tageswanderung vom Geisterdorf zum besten Strand der Türkei',
            tr: 'Hayalet şehirden Türkiye\'nin en ünlü plajına uzanan kusursuz günlük yürüyüş'
        },
        description: {
            ru: 'Самый популярный и красивый короткий маршрут в окрестностях Фетхие. Вы стартуете прямо среди атмосферных каменных развалин греческого города-призрака Каякёй, поднимаетесь мимо старинной верхней часовни на лесной перевал (высота ~300м). С вершины перевала через сосновые ветви открывается знаменитый вид на песчаную косу Олюдениза, после чего тропа спускается по серпантину прямо на пляж Белчекиз, где можно сразу окунуться в море.',
            en: 'The most beloved and rewarding short hike in the Fethiye region. Starting inside the haunting ruins of the Greek ghost town Kayaköy, you ascend past the hilltop chapel to a pine pass (~300m elevation). From the ridge, through the pine boughs, you catch the world-famous panorama of Oludeniz sandspit before zigzagging down to Belcekiz beach for a refreshing swim.',
            de: 'Die beliebteste Kurzwanderung in der Region Fethiye. Sie starten zwischen den antiken Ruinen des Geisterdorfs Kayaköy, steigen an der Kapelle vorbei auf einen Bergpass (~300m). Von oben öffnet sich der berühmte Blick auf die Sandzunge von Ölüdeniz, bevor Sie zum Strand hinabsteigen.',
            tr: 'Fethiye bölgesinin en sevilen ve en manzaralı kısa yürüyüş rotası. Kayaköy Rum hayalet şehrinin taş sokaklarından başlayıp tepe şapeline yükselirsiniz. Çam geçidinden Ölüdeniz lagününün kartpostallık manzarası belirir ve ardından Belcekiz plajına inerek denize girilir.'
        },
        startPoint: {
            ru: 'Каякёй, верхняя часовня (Taş Kilise)',
            en: 'Kayaköy Upper Church (`Taş Kilise`)',
            de: 'Kayaköy Obere Kirche (Taş Kilise)',
            tr: 'Kayaköy Üst Kilise (Taş Kilise)'
        },
        endPoint: {
            ru: 'Пляж Белчекиз, Олюдениз',
            en: 'Belcekiz Beach, Ölüdeniz',
            de: 'Strand Belcekiz, Ölüdeniz',
            tr: 'Belcekiz Plajı, Ölüdeniz'
        },
        waterSources: {
            ru: 'Купить воду перед входом в руины Каякёй. На самой тропе источников нет до спуска в Олюдениз.',
            en: 'Buy water at shops near Kayaköy entrance. No water along the 2-hour forest pass.',
            de: 'Wasser vor dem Eingang zu den Ruinen von Kayaköy kaufen. Auf dem Pass gibt es kein Wasser.',
            tr: 'Su ihtiyacınızı Kayaköy girişindeki bakkallardan karşılayın. Orman geçidinde çeşme yoktur.'
        },
        highlights: {
            ru: [
                'Мистические развалины 3,000 каменных домов Каякёя',
                'Верхняя часовня с остатками фресок и видом на долину',
                'Идеальная точка для фото с высоты на косу Олюдениз',
                'Финиш прямо в бирюзовом море на пляже'
            ],
            en: [
                'Mystical ruins of 3,000 abandoned Greek stone houses in Kayaköy',
                'Hilltop chapel featuring faded Byzantine-era frescoes',
                'Iconic elevated viewpoint over Oludeniz blue lagoon spit',
                'Finishing directly on the pebble beach for a rewarding dip'
            ],
            de: [
                'Mystische Ruinen von 3.000 verlassenen Steinhäusern in Kayaköy',
                'Bergkapelle mit verblassten Fresken und Talblick',
                'Bilderbuch-Aussichtspunkt auf die Sandzunge von Ölüdeniz',
                'Ziel direkt am Strand für eine erfrischende Abkühlung'
            ],
            tr: [
                '3.000 terk edilmiş taş evin mistik atmosferi',
                'Vadinin tepesindeki tarihi şapel ve kalıntıları',
                'Ölüdeniz kumsalını tepeden gören ikonik fotoğraf noktası',
                'Yürüyüşün sonunda doğrudan turkuaz denize serinletici atlayış'
            ]
        },
        gearAdvice: {
            ru: 'Подходит для всей семьи и новичков. Кроссовки с хорошей подошвой (камни отполированы ногами тысяч туристов и могут скользить).',
            en: 'Suitable for beginners and active families. Wear sturdy sneakers (limestone rocks on the descent can be slippery when polished).',
            de: 'Für Anfänger und Familien geeignet. Turnschuhe mit guter Sohle tragen (die Kalksteine im Abstieg können rutschig sein).',
            tr: 'Yeni başlayanlar ve aktif aileler için uygundur. Kaymaz spor ayakkabı giyilmelidir (inilen patikadaki kireçtaşları cilalanmış gibi kayabilir).'
        },
        mapsQuery: 'Kayakoy Ghost Town to Oludeniz Beach trail',
        image: '/api/images/locations/fethiye/beach/belcekiz/belcekiz.jpg'
    },
    {
        id: 'kayakoy-soguksu',
        region: 'dayhike',
        difficulty: 1,
        distanceKm: 4.5,
        elevationGainM: 150,
        elevationLossM: 300,
        durationHours: '1.5 - 2.0 ч.',
        title: {
            ru: 'Каякёй ➔ Бухта Холодной Воды (Тайная тропа к источникам)',
            en: 'Kayaköy ➔ Soğuk Su Bay (Hidden Trail to Cold Springs)',
            de: 'Kayaköy ➔ Soğuk Su Bucht (Geheimpfad zu den kalten Quellen)',
            tr: 'Kayaköy ➔ Soğuk Su Koyu (Soğuk Kaynaklara Saklı Patika)'
        },
        subtitle: {
            ru: 'Лёгкая прогулка через хвойный лес к бухте, где пресные родники бьют прямо в море',
            en: 'Easy pine hike down to a secluded bay where icy freshwater springs mix with the sea',
            de: 'Leichte Kiefernwanderung zu einer einsamen Bucht mit eiskalten Süßwasserquellen im Meer',
            tr: 'Buz gibi tatlı su kaynaklarının denize karıştığı saklı koya keyifli orman yürüyüşü'
        },
        description: {
            ru: 'Прекрасная альтернатива маршруту в Олюдениз для тех, кто ищет уединения и тишины. Тропа начинается на южной окраине Каякёя и ведет через пологий сосновый лес с ароматом чаbreца к скрытой бухте Soğuk Su (Холодная Вода). Свое название бухта получила из-за подводных ледяных источников, которые снижают температуру воды у берега и делают купание невероятно бодрящим даже в августе. На берегу работает аутентичный семейный ресторанчик, куда можно добраться только пешком или на яхте.',
            en: 'A fantastic alternative day hike from Kayaköy for those seeking quiet seclusion away from Oludeniz crowds. The path leaves the southern edge of the ghost village, descending gently through thyme-scented pine groves directly into Soğuk Su Bay (`Cold Water Cove`). Named after underwater icy freshwater springs that erupt into the Mediterranean, making the swim incredibly invigorating even in August. A rustic family-run restaurant sits on the shore accessible only by foot or boat.',
            de: 'Eine fantastische Alternative nach Ölüdeniz für alle, die Ruhe suchen. Der Pfad führt durch duftende Kiefernwälder in die Bucht Soğuk Su, wo eiskalte Süßwasserquellen im Meer sprudeln.',
            tr: 'Ölüdeniz kalabalığından uzakta huzur arayanlar için Kayaköy çıkışlı harika bir alternatif yürüyüş. Kekik kokulu çam ormanları arasından inen patika, dipten kaynayan buz gibi tatlı sularıyla ünlü Soğuk Su Koyu\'na ulaşır. Karayolu bağlantısı olmayan koyda sadece yürüyerek veya tekneyle ulaşılan küçük bir aile lokantası bulunur.'
        },
        startPoint: {
            ru: 'Южная окраина Каякёй (указатель Soğuk Su)',
            en: 'Southern edge of Kayaköy (`Soğuk Su` signpost)',
            de: 'Südrand von Kayaköy (Schild Soğuk Su)',
            tr: 'Kayaköy güney çıkışı (Soğuk Su tabelası)'
        },
        endPoint: {
            ru: 'Бухта Soğuk Su Koyu',
            en: 'Soğuk Su Bay',
            de: 'Bucht Soğuk Su Koyu',
            tr: 'Soğuk Su Koyu'
        },
        waterSources: {
            ru: 'В конце маршрута в ресторане у бухты или из чистейших родников на берегу.',
            en: 'Cold mountain spring right at the beach, plus beverages at the shore restaurant.',
            de: 'Kühle Bergquelle am Strand, Getränke im Restaurant am Ufer.',
            tr: 'Sahildeki buz gibi doğal kaynak suyu ve koydaki küçük lokanta.'
        },
        highlights: {
            ru: [
                'Пологий спуск в тени многовековых средиземноморских сосен',
                'Бодрящее купание в бухте, где смешиваются ледяная и теплая вода',
                'Аутентичный обед в ресторанчике Робинзона на берегу',
                'Возможность уплыть обратно в Фетхие или Олюдениз на попутной лодке'
            ],
            en: [
                'Gentle shaded downhill walk under ancient Mediterranean pines',
                'Invigorating swimming sensation where icy springs blend with warm seawater',
                'Rustic lunch at the remote "Robinson Crusoe" style beach cafe',
                'Option to catch a passing excursion boat back to Oludeniz'
            ],
            de: [
                'Sanfter schattiger Abstieg unter alten mediterranen Kiefern',
                'Erfrischendes Schwimmen, wo eiskaltes Quellwasser auf warmes Meerwasser trifft',
                'Essen im einsamen Strandrestaurant im Robinson-Crusoe-Stil',
                'Möglichkeit, mit einem Ausflugsboot nach Ölüdeniz zurückzufahren'
            ],
            tr: [
                'Asırlık kızılçamların gölgesinde yormayan tatlı iniş',
                'Soğuk tatlı su ile sıcak deniz suyunun birbirine karıştığı canlandırıcı yüzme keyfi',
                'Sahildeki izole kır lokantasında taze balık ve ev yemekleri',
                'Koydan geçen tur tekneleriyle Ölüdeniz\'e dönme olanağı'
            ]
        },
        gearAdvice: {
            ru: 'Лёгкий трек для всех возрастов. Обязательно возьмите маску для снорклинга — подводный мир в бухте кристально чист.',
            en: 'Easy beginner hike suitable for all ages. Pack a snorkel — visibility in the spring-fed bay is crystal clear.',
            de: 'Leichte Anfängerwanderung für alle Altersgruppen. Schnorchelausrüstung einpacken.',
            tr: 'Her yaş grubuna uygun kolay rota. Şnorkel maskenizi mutlaka yanınıza alın, kaynak suyu nedeniyle görüş mesafesi muhteşemdir.'
        },
        mapsQuery: 'Kayakoy to Soguk Su Koyu',
        image: '/api/images/locations/fethiye/beach/belcekiz/belcekiz2.jpg'
    },
    {
        id: 'saklikent-canyon',
        region: 'canyon',
        difficulty: 3,
        distanceKm: 3.5,
        elevationGainM: 50,
        elevationLossM: 50,
        durationHours: '2.0 - 3.0 ч.',
        title: {
            ru: 'Ущелье Саклыкент (Водный каньонинговый треккинг)',
            en: 'Saklıkent Gorge (Ice-Water Canyoning Adventure)',
            de: 'Saklıkent-Schlucht (Eiswasser-Canyoning-Abenteuer)',
            tr: 'Saklıkent Kanyonu (Buz Sularında Kanyon Yürüyüşü)'
        },
        subtitle: {
            ru: 'Поход вброд по ледяной горной реке на дне 300-метрового каменного каньона',
            en: 'Wading through freezing glacial river rapids at the bottom of a 300m vertical gorge',
            de: 'Waten durch eiskalte Gletscherflüsse am Grund einer 300m tiefen Schlucht',
            tr: '300 metre yüksekliğindeki kanyon tabanında buz gibi dağ sularında yürüyüş'
        },
        description: {
            ru: 'Саклыкент — второе по длине ущелье в Европе (18 км в длину и до 300 метров в глубину). Туристическая тропа представляет собой уникальный водный поход вброд по руслу горной реки Карачай. После прохода по деревянным подвесным мосткам над бурным потоком туристы выходят к порогу, где нужно пересечь ледяную реку (вода +8°C круглый год!). Далее начинается суровый и величественный каменный мешок, где скалы смыкаются над головой, оставляя лишь узкую полоску неба.',
            en: 'Saklıkent is the second-longest gorge in Europe (18 km long and 300m deep). The hiking trail is a unique river-wading canyoning expedition along the icy Karaçay riverbed. After walking suspended wooden walkways along rushing rapids, hikers cross the freezing river ford (+8°C year-round!). Beyond the crossing lies a surreal limestone cathedral where towering rock walls narrow to just meters apart, leaving only a sliver of sky above.',
            de: 'Saklıkent ist die zweitlängste Schlucht Europas. Die Wanderung ist eine einzigartige Canyoning-Expedition durch das eiskalte Flussbett des Karaçay (+8°C ganzjährig!). Die senkrechten Felswände ragen 300 Meter in die Höhe.',
            tr: 'Avrupa\'nın en uzun ikinci kanyonu olan Saklıkent (18 km uzunluk, 300m derinlik), Karaçay nehir yatağında buz gibi sularda yapılan eşsiz bir kanyon yürüyüşüdür. Asma ahşap köprülerin ardından kış-yaz +8°C olan buzul nehir geçilir ve devasa kayaların gökyüzünü kapattığı mistik kanyon tabanında ilerlenir.'
        },
        startPoint: {
            ru: 'Вход в Национальный парк Саклыкент (кассы)',
            en: 'Saklıkent National Park Entrance Gate',
            de: 'Eingang zum Nationalpark Saklıkent',
            tr: 'Saklıkent Milli Parkı Giriş Gişeleri'
        },
        endPoint: {
            ru: 'Большой водопад внутри каньона (точка разворота)',
            en: 'Inner Gorge Waterfall (turnaround waypoint)',
            de: 'Innerer Wasserfall (Wendepunkt)',
            tr: 'Kanyon içi büyük şelale (geri dönüş noktası)'
        },
        waterSources: {
            ru: 'Вы идете прямо по чистейшей горной реке. На выходе из каньона — десятки ресторанов на помостах над водой.',
            en: 'You are wading inside a pristine mountain stream. Dozens of riverside restaurants await at the exit.',
            de: 'Sie waten im Fluss. Am Ausgang warten zahlreiche Restaurants auf Holzstegen über dem Wasser.',
            tr: 'Doğrudan tertemiz dağ nehrinde yürüyorsunuz. Çıkışta su üzerinde kurulu ahşap platformlu restoranlar bulunur.'
        },
        highlights: {
            ru: [
                'Первый шокирующий переход вброд через ледяной поток (+8°C)',
                'Грандиозные 300-метровые каменные стены, смыкающиеся над головой',
                'Залежи лечебной серой глины, которой туристы мажут лицо и тело',
                'Обед свежевыловленной форелью в беседках прямо над бурлящей рекой'
            ],
            en: [
                'The exhilarating shock of crossing the +8°C glacial river rapids',
                'Towering 300-meter vertical limestone cliffs closing in overhead',
                'Natural mineral grey clay deposits along the canyon walls used for skin masks',
                'Feasting on fresh grilled trout in cushioned cabanas suspended above the rapids'
            ],
            de: [
                'Das erfrischende Waten durch das +8°C kalte Gletscherwasser',
                'Senkrechte 300-Meter-Felswände, die sich über dem Kopf schließen',
                'Natürliche Heilerde an den Klippen für wohltuende Hautmasken',
                'Frische Forelle in gemütlichen Holzpavillons direkt über dem reißenden Fluss'
            ],
            tr: [
                '+8°C buzul suyunu geçerken yaşanan unutulmaz heyecan ve serinlik',
                'Gökyüzünü daraltan 300 metreli sarp kanyon duvarlarının görkemi',
                'Kanyon duvarlarında cilde iyi gelen doğal gri killi çamur maskeleri',
                'Yürüyüş sonrası gürül gürül akan su üzerindeki köşklerde kiremitte alabalık ziyafeti'
            ]
        },
        gearAdvice: {
            ru: 'КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО идти босиком или в сланцах. Только резиновые аквашузы (можно арендовать на входе за ~50-80 TL) и гермомешок для телефона.',
            en: 'STRICTLY FORBIDDEN to hike barefoot or in flip-flops. Rubber aqua shoes (`deniz ayakkabısı`) required (rentable at gate for ~50-80 TL). Waterproof phone bag essential.',
            de: 'Barfuß oder in Flip-Flops STRENG VERBOTEN. Gummierte Aquaschuhe erforderlich (vor Ort für ~50-80 TL ausleihbar). Wasserdichte Hülle fürs Handy mitnehmen.',
            tr: 'Çıplak ayak veya terlikle girmek KESİNLİKLE YASAKTIR. Kaymaz lastik deniz ayakkabısı (girişte ~50-80 TL\'ye kiralanabilir) ve telefon için su geçirmez kılıf şarttır.'
        },
        mapsQuery: 'Saklikent National Park Canyon entrance',
        image: '/api/images/locations/kas/ruines/patara/patara.jpg'
    },
    {
        id: 'xanthos-patara',
        region: 'lycian',
        difficulty: 2,
        distanceKm: 16,
        elevationGainM: 150,
        elevationLossM: 200,
        durationHours: '4.0 - 5.0 ч.',
        title: {
            ru: 'Ксантос ➔ Патара (Античный путь через римский акведук к дюнам)',
            en: 'Xanthos ➔ Patara (Ancient Aqueduct Trail to Sand Dunes)',
            de: 'Xanthos ➔ Patara (Antiker Aquädukt-Pfad zu den Sanddünen)',
            tr: 'Ksantos ➔ Patara (Roma Su Kemeri ve Kum Tepelerine Antik Rota)'
        },
        subtitle: {
            ru: 'Путь от древней столицы Ликийского союза до 18-километрового пляжа',
            en: 'Walking from the ancient Lycian capital down to an 18-kilometer golden beach',
            de: 'Wanderung von der antiken lykischen Hauptstadt zum 18 km langen goldenen Strand',
            tr: 'Likya Başkenti\'nden 18 kilometrelik altın kumlu Patara plajına uzanan tarih yolu'
        },
        description: {
            ru: 'Идеальный маршрут для любителей истории и археологии. Вы стартуете в Ксантосе (бывшей столице Ликии, объект ЮНЕСКО), где сохранились знаменитые гробницы-столпы, амфитеатр и византийские мозаики. Тропа идет вдоль древнего римского акведука, который 2,000 лет назад снабжал водой порт Патары, проходит через оливковые сады деревни Чавдыр и выводит прямо к величественной Триумфальной арке Меттия Модеста в античной Патаре, а затем на песчаные дюны пляжа.',
            en: 'A dream trek for history enthusiasts. You start in Xanthos (ancient Lycian capital and UNESCO World Heritage site), marveling at the Harpy Tomb, amphitheater, and mosaics. The path follows the magnificent Roman aqueduct that supplied water to the port of Patara 2,000 years ago, crossing olive groves in Çavdır village before revealing the grand Triumphal Arch of Mettius Modestus in ancient Patara and its massive sand dunes.',
            de: 'Eine Traumwanderung für Geschichtsliebhaber. Start in der UNESCO-Welterbestätte Xanthos. Der Pfad folgt dem antiken römischen Aquädukt durch Olivenhaine bis zum Triumphbogen in Patara und den Sanddünen am Meer.',
            tr: 'Tarih ve doğa tutkunları için ideal bir rota. UNESCO Dünya Mirası olan antik Likya başkenti Ksantos\'tan başlayan yürüyüş, 2.000 yıl önce Patara limanına su taşıyan devasa Roma su kemerlerini takip eder. Çavdır köyü zeytinliklerinden geçerek Patara Antik Kenti\'nin görkemli Zafer Takı\'na ve kumsallarına varır.'
        },
        startPoint: {
            ru: 'Руины Ксантоса (Каш/Кыnık)',
            en: 'Xanthos Archaeological Site (`Kınık`)',
            de: 'Ruinen von Xanthos (Kınık)',
            tr: 'Ksantos Antik Kenti (Kınık)'
        },
        endPoint: {
            ru: 'Песчаные дюны пляжа Патара',
            en: 'Patara Beach Sand Dunes',
            de: 'Sanddünen von Patara Strand',
            tr: 'Patara Plajı Kum Tepeleri'
        },
        waterSources: {
            ru: 'Источник в деревне Чавдыр (на 7-м км пути), кафе у входа в руины Патары.',
            en: 'Fountain in Çavdır village (km 7), plus cafes at Patara archaeological entrance.',
            de: 'Brunnen im Dorf Çavdır (km 7), Cafés am Eingang zu den Ruinen von Patara.',
            tr: 'Çavdır köy meydanında çeşme (7. km) ve Patara antik kenti girişindeki kafeteryalar.'
        },
        highlights: {
            ru: [
                'Уникальный памятник ЮНЕСКО — руины Ксантоса с ликийскими обелисками',
                'Грандиозный римский акведук Деликкемер с каменными сифонными блоками',
                'Триумфальная арка и здание древнего парламента (Булевтерий) в Патаре',
                'Встреча заката на «турецкой Сахаре» — золотых песчаных дюнах Патары'
            ],
            en: [
                'UNESCO World Heritage Xanthos ruins featuring Lycian monolithic obelisks',
                'Delikkemer Roman inverted siphon aqueduct — a masterclass of ancient engineering',
                'The Triumphal Arch and restored ancient Lycian Parliament building (`Bouleuterion`)',
                'Watching the sunset across the Sahara-like golden sand dunes of Patara beach'
            ],
            de: [
                'UNESCO-Welterbe Xanthos mit einzigartigen lykischen Pfeilergräbern',
                'Römisches Aquädukt Delikkemer – ein Meisterwerk antiker Ingenieurskunst',
                'Der Triumphbogen und das restaurierte lykische Parlamentsgebäude (Bouleuterion)',
                'Sonnenuntergang über den Sahara-ähnlichen Sanddünen des Strandes von Patara'
            ],
            tr: [
                'UNESCO Dünya Mirası Ksantos\'un dikili anıt mezarları ve tiyatrosu',
                'Antik mühendislik harikası Delikkemer ters sifonlu Roma su kemerleri',
                'Patara Antik Kenti Zafer Takı ve restore edilen dünyanın ilk meclis binası',
                'Türkiye\'nin Sahra Çölü sayılan altın sarısı Patara kum tepelerinde gün batımı'
            ]
        },
        gearAdvice: {
            ru: 'Тропа открытая, практически без тени. Обязательны солнцезащитный крем SPF 50+, головной убор и 2 литра воды.',
            en: 'Very exposed route with minimal shade. High SPF sunscreen, wide-brimmed hat, and 2L of drinking water mandatory.',
            de: 'Sehr offene Strecke mit wenig Schatten. Sonnencreme SPF 50+, Kopfbedeckung und 2L Wasser zwingend erforderlich.',
            tr: 'Açık arazide ve gölgesiz bir etaptır. Yüksek korumalı güneş kremi, geniş şapka ve kişi başı 2 litre su şarttır.'
        },
        mapsQuery: 'Xanthos Ancient City to Patara Beach',
        image: '/api/images/locations/kas/ruines/patara/patara.jpg'
    },
    {
        id: 'kalkan-sarybelen',
        region: 'lycian',
        difficulty: 4,
        distanceKm: 13,
        elevationGainM: 700,
        elevationLossM: 150,
        durationHours: '4.5 - 6.0 ч.',
        title: {
            ru: 'Калкан ➔ Сарыбелен (Горное пастбище и гробницы Беzirgân)',
            en: 'Kalkan ➔ Sarıbelen (Alpine Plateau & Bezirgân Tombs)',
            de: 'Kalkan ➔ Sarıbelen (Almhochebene & Bezirgân-Gräber)',
            tr: 'Kalkan ➔ Sarıbelen (Yayla Yaylaları ve Bezirgân Mezarları)'
        },
        subtitle: {
            ru: 'Подъем от белоснежных вилл Калкана на прохладную альпийскую высоту',
            en: 'Steep climb from Kalkan\'s white luxury villas to cool highland meadows',
            de: 'Steiler Aufstieg von Kalkans weißen Villen in die kühlen Almwiesen',
            tr: 'Kalkan\'ın lüks villalarından serin dağ yaylalarına dik ve manzaralı tırmanış'
        },
        description: {
            ru: 'Серьезный горный этап, позволяющий за несколько часов сменить жаркий климат побережья на свежий воздух ликийского высокогорья. Тропа берет начало за последними виллами Калкана и поднимается по древней караванной тропе («козьей лестнице») через ущелье на плато Безирган (Bezirgân) на высоте 700 метров. Здесь сохранились уникальные старинные зернохранилища (амбары из кедра без единого гвоздя). Этап заканчивается в пасторальной деревне Сарыбелен.',
            en: 'A challenging alpine stage that transports you from the sun-drenched coastal heat up into the refreshing Lycian highlands. Starting behind Kalkan\'s top villas, the trail climbs an ancient pack-mule trail (`Goat Stairs`) through a dramatic canyon to the Bezirgân plateau (700m). Here you discover 300-year-old wooden granary barns constructed from cedar without a single iron nail. The route concludes in the peaceful pastoral village of Sarıbelen.',
            de: 'Eine anspruchsvolle Bergetappe, die Sie vom warmen Küstenklima ins frische lykische Hochland führt. Der Pfad klettert über alte Karawanenwege auf das Bezirgân-Plateau (700m) zu antiken Getreidespeichern aus Zedernholz.',
            tr: 'Kıyı sıcağından birkaç saat içinde Likya yaylalarının serin havasına ulaştıran zorlu bir dağ etabı. Kalkan villalarının arkasından başlayan katır yolu patikası, kanyon boyunca 700 metre rakımlı Bezirgân yaylasına tırmanır. Burada tek bir çivi bile kullanılmadan sedir ağacından yapılan 300 yıllık tarihi tahıl ambarları görülür ve Sarıbelen köyünde son bulur.'
        },
        startPoint: {
            ru: 'Верхняя окраина Калкана (трасса D400)',
            en: 'Upper edge of Kalkan along D400 highway',
            de: 'Oberer Rand von Kalkan an der D400',
            tr: 'Kalkan üst sınırı D400 karayolu kıyısı'
        },
        endPoint: {
            ru: 'Деревня Сарыбелен (Sarıbelen Köyü)',
            en: 'Sarıbelen Village (`Sarıbelen Köyü`)',
            de: 'Dorf Sarıbelen (Sarıbelen Köyü)',
            tr: 'Sarıbelen Köyü'
        },
        waterSources: {
            ru: 'На затяжном подъеме (первые 4 часа) воды нет. В деревне Безирган и Сарыбелен есть горные родники и магазины.',
            en: 'No water during the grueling 4-hour uphill climb. Springs and local grocers available once in Bezirgân and Sarıbelen.',
            de: 'Kein Wasser auf dem 4-stündigen Aufstieg. Brunnen und Dorfläden erst auf dem Plateau in Bezirgân und Sarıbelen.',
            tr: '4 saat süren dik tırmanış boyunca çeşme yoktur. Bezirgân ve Sarıbelen köylerinde bol miktarda dağ suyu ve bakkal bulunur.'
        },
        highlights: {
            ru: [
                'Вид с высоты птичьего полета на белые крыши Калкана и бухту',
                'Ущелье с отвесными скалами и гнездовьями хищных птиц',
                'Аутентичные деревянные амбары-зернохранилища в Безиргане (XVIII век)',
                'Гостеприимство жителей горных деревень и домашний чай'
            ],
            en: [
                'Bird\'s-eye panorama over Kalkan\'s whitewashed roofs and turquoise harbor',
                'Dramatic limestone gorge hosting nesting eagles and falcons',
                'Authentic 18th-century interlocking cedar granary structures in Bezirgân',
                'Genuine mountain hospitality and complimentary çay from local herders'
            ],
            de: [
                'Vogelperspektive auf Kalkans weiße Dächer und den türkisfarbenen Hafen',
                'Dramatische Kalksteinschlucht mit nistenden Adlern und Finken',
                'Authentische Getreidespeicher aus Zedernholz in Bezirgân (18. Jh.)',
                'Herzliche Gastfreundschaft und traditioneller Tee in den Bergdörfern'
            ],
            tr: [
                'Kalkan koyuna ve beyaz villalara kuş bakışı muhteşem panaroma',
                'Yırtıcı kuşların yuva yaptığı sarp kayalık kanyon tırmanışı',
                'Bezirgân yaylasında çivisiz kenetleme usulüyle yapılan tarihi ahşap ambarlar',
                'Yayla köylülerinin samimi misafirperverliği ve taze dağ çayı ikramı'
            ]
        },
        gearAdvice: {
            ru: 'Требуется отличная физическая форма для непрерывного подъема на +700м. Треккинговые палки и запас воды 3 литра.',
            en: 'Requires good physical stamina for the relentless +700m continuous climb. Trekking poles and 3L of water essential.',
            de: 'Gute Kondition für den kontinuierlichen Aufstieg von +700m erforderlich. Trekkingstöcke und 3L Wasser einpacken.',
            tr: '+700 metrelik kesintisiz tırmanış için iyi bir kondisyon gerektirir. Baton ve kişi başı 3 litre su hayati önem taşır.'
        },
        mapsQuery: 'Kalkan to Bezirgan to Saribelen Lycian Way',
        image: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg'
    },
    {
        id: 'kas-liman-agzi-ufakdere',
        region: 'lycian',
        difficulty: 3,
        distanceKm: 11,
        elevationGainM: 350,
        elevationLossM: 350,
        durationHours: '3.5 - 4.5 ч.',
        title: {
            ru: 'Каш ➔ Лиман Агзы ➔ Уфакдере (Скальный трек вдоль лазурного моря)',
            en: 'Kaş ➔ Liman Ağzı ➔ Ufakdere (Coastal Cliff Trek along Azure Bays)',
            de: 'Kaş ➔ Liman Ağzı ➔ Ufakdere (Klippenwanderung entlang türkiser Buchten)',
            tr: 'Kaş ➔ Liman Ağzı ➔ Ufakdere (Turkuaz Koylar Boyunca Falez Yürüyüşü)'
        },
        subtitle: {
            ru: 'Ликийские гробницы в скалах, веревочные спуски к пляжным клубам и дикий мыс',
            en: 'Lycian rock-cut sarcophagi, rope-assisted ladders, and exclusive beach clubs',
            de: 'Lykische Felsengräber, klettersteigartige Passagen und exklusive Strandklubs',
            tr: 'Kaya mezarları, halatlı inişler, seçkin plaj kulüpleri ve bakir koylar'
        },
        description: {
            ru: 'Идеальный однодневный маршрут из столицы дайвинга — Каша. Вы выходите от кемпинга на востоке города, обходите по скалам залив Лиман Агзы (Liman Ağzı), где на берегу расположены знаменитые пляжные клубы с кристально прозрачной водой (здесь живут морские черепахи). На спуске в бухту установлены металлические лестницы и веревки для подстраховки. Далее тропа уводит мимо высеченных в скалах ликийских гробниц Себеда к совершенно уединенному каменистому заливу Уфакдере.',
            en: 'The ultimate coastal day trek from Kaş. Departing from the eastern campgrounds, the path skirts limestone cliffs over Liman Ağzı bay — famous for its crystal-clear water beach clubs and resident Caretta sea turtles. Descending into the cove involves secure metal ladders and safety ropes fixed to the rock. The trail then leads past the monumental Lycian rock-cut tombs of Sebeda into the wild, secluded pebble haven of Ufakdere.',
            de: 'Die ultimative Küstenwanderung ab Kaş. Der Pfad führt an Kalksteinklippen über die Bucht Liman Ağzı zu kristallklaren Strandklubs und lykischen Felsengräbern nach Ufakdere.',
            tr: 'Kaş merkezden başlayıp turkuaz sular boyunca ilerleyen kusursuz bir sahil etabı. Büyük Çakıl mevkiinden falezlere tırmanan patika, Caretta kaplumbağalarının yaşadığı kristal sulu Liman Ağzı koyuna iner (inişte kayalara sabitlenmiş demir merdiven ve halatlar bulunur). Ardından Sebeda antik kenti kaya mezarlarını geçerek tamamen bakir Ufakdere koyuna ulaşır.'
        },
        startPoint: {
            ru: 'Каш, пляж Большой Галечный (Büyük Çakıl)',
            en: 'Kaş Big Pebble Beach (`Büyük Çakıl`)',
            de: 'Kaş Großer Kieselstrand (Büyük Çakıl)',
            tr: 'Kaş Büyük Çakıl Plajı sonu'
        },
        endPoint: {
            ru: 'Залив Уфакдере (или возврат на лодке из Лиман Агзы в Каш)',
            en: 'Ufakdere Bay (or return water taxi from Liman Ağzı to Kaş)',
            de: 'Bucht Ufakdere (oder Bootstaxi zurück ab Liman Ağzı)',
            tr: 'Ufakdere Koyu (veya Liman Ağzı\'ndan tekneyle Kaş\'a dönüş)'
        },
        waterSources: {
            ru: 'Пляжные клубы в Ликийской бухте Лиман Агзы (на 3-м км). В Уфакдере есть только дикий родник.',
            en: 'Beach clubs at Liman Ağzı (km 3). Only a wild natural spring is available at remote Ufakdere.',
            de: 'Strandklubs in Liman Ağzı (km 3). In Ufakdere gibt es nur eine natürliche Quelle.',
            tr: 'Liman Ağzı\'ndaki plaj kulüplerinde su ve yemek mevcuttur (3. km). Ufakdere\'de ise sadece doğal su kaynayan kuyu bulunur.'
        },
        highlights: {
            ru: [
                'Акустическая панорама скалистого побережья Каша',
                'Высеченные прямо в отвесной скале монументальные гробницы Себеда',
                'Спуск по скальной лестнице с веревками к бирюзовой лагуне Лиман Агзы',
                'Возможность вернуться в порт Каша на водном такси (пиратской лодочке)'
            ],
            en: [
                'Sweeping acoustics and ocean panoramas along Kaş\'s dramatic coastline',
                'Sebeda\'s monumental Lycian tomb facades carved straight into vertical cliffs',
                'Thrilling rope-and-ladder rock descent down to Liman Ağzı\'s turquoise lagoon',
                'Convenient option to catch a charming local water taxi back to Kaş harbor'
            ],
            de: [
                'Atemberaubende Panoramen entlang der felsigen Küste von Kaş',
                'In senkrechte Felswände gehauene lykische Gräber von Sebeda',
                'Spannender Abstieg über Leitern in die türkisfarbene Lagune von Liman Ağzı',
                'Bequeme Rückkehr nach Kaş mit dem Bootstaxi möglich'
            ],
            tr: [
                'Kaş falezlerinin büyüleyici deniz ve ada manzaraları',
                'Sarp kayalara oyulmuş görkemli Sebeda Likya kaya mezarları',
                'Liman Ağzı lagününe halat ve demir merdivenle inilen heyecanlı etap',
                'Yürüyüş bitiminde Liman Ağzı\'ndan Kaş limanına ahşap dolmuş teknelerle keyifli dönüş'
            ]
        },
        gearAdvice: {
            ru: 'Острая вулканическая порода и карстовые камни — обувь только с толстой подошвой! Возьмите купальники и 100-150 TL на лодку-такси обратно.',
            en: 'Sharp limestone and volcanic karst rock — thick-soled trail shoes mandatory! Pack swimwear and ~100-150 TL cash for the water taxi return.',
            de: 'Scharfer Kalkstein – feste Schuhe mit dicker Sohle zwingend erforderlich! Badesachen und ~100-150 TL für das Bootstaxi mitnehmen.',
            tr: 'Keskin karstik kayalar ve çakıllar nedeniyle kalın tabanlı trekking ayakkabısı şarttır! Mayo ve dönüş teknesi için ~100-150 TL nakit bulundurunuz.'
        },
        mapsQuery: 'Kas Buyuk Cakil to Liman Agzi to Ufakdere',
        image: '/api/images/locations/kas/ruines/kastombs/kastombs.jpg'
    },
    {
        id: 'carian-datca-kargi',
        region: 'carian',
        difficulty: 2,
        distanceKm: 12,
        elevationGainM: 200,
        elevationLossM: 200,
        durationHours: '3.0 - 4.0 ч.',
        title: {
            ru: 'Карийская тропа: Датча ➔ Бухта Карги ➔ Домалин (Эгейская идиллия)',
            en: 'Carian Trail: Datça ➔ Kargı Bay ➔ Domalin (Aegean Coastal Idyll)',
            de: 'Karischer Weg: Datça ➔ Kargı-Bucht ➔ Domalin (Ägäische Küstenidylle)',
            tr: 'Karia Yolu: Datça ➔ Kargı Koyu ➔ Domalin (Ege Kıyı İdili)'
        },
        subtitle: {
            ru: 'Миндальные рощи, каменные башни и дикие бухты полуострова Датча',
            en: 'Almond groves, stone wind towers, and pristine coves across the Datça Peninsula',
            de: 'Mandelhaine, steinerne Windtürme und unberührte Buchten der Halbinsel Datça',
            tr: 'Datça Yarımadası\'nın badem bahçeleri, taş yel değirmenleri ve bakir koyları'
        },
        description: {
            ru: 'Карийская тропа (800 км) — менее людная и более дикая сестра Ликийского пути. На полуострове Датча она проходит сквозь благоухающие миндальные и оливковые сады, огибая уютные бухты. От Старой Датчи (Eski Datça) с ее каменными домиками поэтов путь спускается к галечной бухте Карги (Kargı Koyu), а далее по скалистому мысу уходит к совершенно уединенному пляжу Домалин (Domalin). Здесь нет отелей — только шепот волн Эгейского моря и аромат трав.',
            en: 'The Carian Trail (800 km) is the wilder, less-travelled sister to the Lycian Way. On the Datça Peninsula, it winds through fragrant almond and olive orchards around pristine coves. Departing from Old Datça (`Eski Datça`) with its bougainvillea-draped stone cottages, the path descends to the smooth pebbles of Kargı Bay before traversing a rocky headland to the completely untouched beach of Domalin. No resort towers — just the whisper of Aegean waves and wild herbs.',
            de: 'Der Karische Weg (800 km) ist die wildere Schwester des Lykischen Weges. Auf der Halbinsel Datça führt er durch Mandelhaine und einsame Buchten von Alt-Datça bis zum unberührten Strand Domalin.',
            tr: 'Likya Yolu\'nun daha sakin, daha bakir ve daha vahşi kardeşi olan 800 kilometrelik Karia Yolu. Datça Yarımadası etabı, mis kokulu badem ve zeytin bahçeleri arasından geçerek muhteşem koylarda dolanır. Begonvilli taş evleriyle ünlü Eski Datça\'dan başlayan rota, sakin Kargı Koyu\'na iner ve falezler üzerinden karayolu bağlantısı olmayan bakir Domalin koyuna ulaşır.'
        },
        startPoint: {
            ru: 'Старая Датча (Eski Datça, дом поэта Джана Юджеля)',
            en: 'Old Datça (`Eski Datça`, Can Yücel house)',
            de: 'Alt-Datça (Eski Datça, Haus des Dichters Can Yücel)',
            tr: 'Eski Datça (Can Yücel sokağı)'
        },
        endPoint: {
            ru: 'Дикая бухта Домалин (Domalin Koyu)',
            en: 'Domalin Bay (`Domalin Koyu`)',
            de: 'Wilde Bucht Domalin (Domalin Koyu)',
            tr: 'Domalin Koyu (veya Akvaryum Koyu)'
        },
        waterSources: {
            ru: 'В бухте Карги (на 3-м км) есть рестораны и душ. В Домалине воды нет — берите запас с собой.',
            en: 'Restaurants and showers at Kargı Bay (km 3). No facilities or water at remote Domalin Bay.',
            de: 'Restaurants und Duschen in der Kargı-Bucht (km 3). In Domalin gibt es kein Wasser.',
            tr: 'Kargı Koyu\'nda (3. km) restoranlar ve duş mevcuttur. Domalin Koyu tamamen bakirdir, suyunuzu yanınızda taşıyınız.'
        },
        highlights: {
            ru: [
                'Атмосферные каменные улочки Старой Датчи, утопающие в цветах',
                'Плавный трек среди знаменитых датчинских миндальных садов',
                'Купание в тихой бухте Карги в окружении горных холмов',
                'Дикий мыс Домалин с изумрудной водой, где не бывает туристических толп'
            ],
            en: [
                'Atmospheric cobblestone alleys of Old Datça smothered in colorful blossoms',
                'Scenic walking through Datça\'s world-renowned sweet almond orchards',
                'Relaxing swim in the sheltered, pine-rimmed pebble waters of Kargı Bay',
                'Untamed emerald waters of Domalin cape where crowds never reach'
            ],
            de: [
                'Blumenumrankte Steingassen von Alt-Datça',
                'Wanderung durch die berühmten Mandelgärten von Datça',
                'Badestopp in der geschützten Kargı-Bucht',
                'Smaragdfarbenes Wasser am unberührten Kap Domalin'
            ],
            tr: [
                'Begonvillerle süslü taş evleri ve sanat atölyeleriyle büyüleyen Eski Datça sokakları',
                'Datça\'nın meşhur nurlu badem ağaçları ve zeytinlikleri arasında keyifli yürüyüş',
                'Dağların kollarında korunan sakin Kargı Koyu\'nda yüzme molası',
                'Turist kalabalıklarının asla ulaşamadığı zümrüt sularıyla bakir Domalin Koyu'
            ]
        },
        gearAdvice: {
            ru: 'Отличный выбор для весны и осени (в феврале-марте здесь цветет миндаль!). Легкие треккинговые кроссовки и купальники.',
            en: 'Prime choice for spring and autumn (in February/March the whole peninsula erupts in white almond blossoms!). Light hiking sneakers.',
            de: 'Top-Auswahl für Frühling und Herbst (im Februar/März blühen die Mandelbäume!). Leichte Wanderschuhe und Badesachen.',
            tr: 'İlkbahar ve sonbahar için harika bir rotadır (Şubat-Mart aylarında tüm yarımada badem çiçekleriyle beyaza bürünür!). Hafif yürüyüş ayakkabısı ve mayo.'
        },
        mapsQuery: 'Eski Datca to Kargi Koyu Carian Trail',
        image: '/api/images/locations/dacha/ruine/knidos/knidos.jpg'
    },
    {
        id: 'carian-bozburun-sogut',
        region: 'carian',
        difficulty: 4,
        distanceKm: 14,
        elevationGainM: 450,
        elevationLossM: 300,
        durationHours: '4.5 - 5.5 ч.',
        title: {
            ru: 'Карийская тропа: Бозбурун ➔ Сёгют ➔ Ташлыджа (Древние пирамиды и дикий Эгей)',
            en: 'Carian Trail: Bozburun ➔ Söğüt ➔ Taşlıca (Ancient Pyramids & Wild Aegean)',
            de: 'Karischer Weg: Bozburun ➔ Söğüt ➔ Taşlıca (Antike Pyramiden & wilde Ägäis)',
            tr: 'Karia Yolu: Bozburun ➔ Söğüt ➔ Taşlıca (Antik Piramitler ve Bakir Ege)'
        },
        subtitle: {
            ru: 'Первозданный каменный полуостров Бозбурун, где делают деревянные гулеты',
            en: 'The rugged stone peninsula of Bozburun where traditional wooden gulets are born',
            de: 'Die raue Steinhalbinsel Bozburun, Heimat der traditionellen Holzgulets',
            tr: 'Ahşap guletlerin ana vatanı olan sarp ve bakir Bozburun Yarımadası'
        },
        description: {
            ru: 'Полуостров Бозбурун к югу от Мармариса — одно из самых уединенных и аутентичных мест всей Турции. Карийская тропа здесь вьется по каменным террасам мимо древних карийских гробниц в форме ступенчатых пирамид (в районе руин Феникс/Phoenix). Из рыбацкой гавани Бозбуруна тропа поднимается на холмы, откуда виден греческий остров Сими, и спускается в гастрономическую деревню Сёгют (Söğüt), славящуюся лучшими ресторанами морепродуктов на побережье, а затем уходит в каменную деревню Ташлыджа.',
            en: 'The Bozburun Peninsula south of Marmaris is one of the most untouched and authentic sanctuaries in Turkey. The Carian Trail winds across stone terraces past enigmatic Carian step-pyramid tombs near ancient Phoenix (`Feniket`). Rising from Bozburun\'s shipyards, the path crests ridges overlooking the Greek island of Symi before dropping into the culinary paradise of Söğüt — famed for coastal seafood dining — and onward to the stone hamlet of Taşlıca.',
            de: 'Die Halbinsel Bozburun südlich von Marmaris ist eines der unberührtesten Gebiete der Türkei. Der Karische Weg führt über Steinterrassen zu antiken Pyramiden-Gräbern bei Phoenix mit Blick auf die griechische Insel Symi.',
            tr: 'Marmaris\'in güneyindeki Bozburun Yarımadası, Türkiye\'nin en bakir ve en özel coğrafyalarından biridir. Karia Yolu burada taş teraslar arasından ilerleyerek antik Phoenix (Feniket) kentinin basamaklı piramit anıt mezarlarına ulaşır. Bozburun tersanelerinden yükselen rota, Yunanistan\'ın Sömbeki (Symi) adasını gören tepelerden geçerek deniz mahsülleriyle ünlü Söğüt köyüne ve taş yapılarıyla büyüleyen Taşlıca\'ya varır.'
        },
        startPoint: {
            ru: 'Гавань Бозбуруна (набережная)',
            en: 'Bozburun Harbor boardwalk',
            de: 'Hafenpromenade von Bozburun',
            tr: 'Bozburun Liman kordonu'
        },
        endPoint: {
            ru: 'Деревня Ташлыджа (Taşlıca Köyü)',
            en: 'Taşlıca Village (`Taşlıca Köyü`)',
            de: 'Dorf Taşlıca (Taşlıca Köyü)',
            tr: 'Taşlıca Köyü'
        },
        waterSources: {
            ru: 'В Бозбуруне и Сёгюте множество ресторанов и магазинов. На горных перешейках воды нет.',
            en: 'Plentiful cafes and grocers in Bozburun and Söğüt. No water along the arid rocky mountain passes.',
            de: 'Zahlreiche Cafés und Läden in Bozburun und Söğüt. Kein Wasser auf den trockenen Bergpässen.',
            tr: 'Bozburun ve Söğüt merkezlerinde bolca restoran ve bakkal bulunur. Dağ geçitlerinde ve Taşlıca yolunda su yoktur.'
        },
        highlights: {
            ru: [
                'Аутентичные верфи в Бозбуруне, где вручную строят деревянные яхты-гулеты',
                'Загадочные ступенчатые пирамиды-гробницы античного города Феникс',
                'Вид на Эгейское море с близкими очертаниями греческого острова Сими',
                'Легендарный ужин с осьминогом на закате в рыбном ресторане Сёгюта'
            ],
            en: [
                'Historic shipyards in Bozburun where master craftsmen build wooden gulet yachts by hand',
                'Enigmatic stepped pyramid tombs of the ancient Carian city of Phoenix (`Feniket`)',
                'Sweeping Aegean vistas facing the jagged coastline of the Greek island of Symi',
                'Celebrating the hike with grilled octopus at sunset in a waterfront Söğüt restaurant'
            ],
            de: [
                'Historische Werften in Bozburun, wo Holz-Gulets von Hand gebaut werden',
                'Rätselhafte Stufenpyramiden-Gräber der antiken karischen Stadt Phoenix',
                'Blick über die Ägäis bis zur nahen griechischen Insel Symi',
                'Gegrillter Oktopus zum Sonnenuntergang in den berühmten Restaurants von Söğüt'
            ],
            tr: [
                'Usta marangozların geleneksel ahşap guletler ürettiği Bozburun tersaneleri',
                'Antik Phoenix kentinin esrarengiz basamaklı piramit anıt mezarları',
                'Yunanistan\'ın Sömbeki (Symi) adasıyla burun buruna eşsiz Ege panaroması',
                'Yürüyüş sonrası Söğüt sahilindeki ünlü balıkçılarda gün batımında ahtapot ızgara keyfi'
            ]
        },
        gearAdvice: {
            ru: 'Суровый каменистый ландшафт с острыми камнями. Прочная обувь, запас воды и офлайн-карта (связь на перевалах может пропадать).',
            en: 'Rugged rocky terrain with sharp stones. Durable hiking footwear, extra drinking water, and offline maps essential (cellular signal can drop).',
            de: 'Raues Gelände mit spitzen Steinen. Feste Wanderschuhe, ausreichend Wasser und Offline-Karten erforderlich.',
            tr: 'Keskin taşlı ve sarp bir coğrafyadır. Kaliteli botlar, su yedeği ve çevrimdışı GPS haritası zorunludur (bazı tepelerde hat çekmez).'
        },
        mapsQuery: 'Bozburun to Sogut to Taslica Carian Trail',
        image: '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg'
    },
    {
        id: 'koycegiz-yuvarlakcay',
        region: 'dayhike',
        difficulty: 1,
        distanceKm: 8,
        elevationGainM: 200,
        elevationLossM: 100,
        durationHours: '2.5 - 3.0 ч.',
        title: {
            ru: 'Кёйджегиз ➔ Водопады Юварлакчай (Семейный лесной эко-треккинг)',
            en: 'Köyceğiz ➔ Yuvarlakçay Waterfalls (Family Forest Eco-Trek)',
            de: 'Köyceğiz ➔ Yuvarlakçay-Wasserfälle (Familien-Öko-Wanderung)',
            tr: 'Köyceğiz ➔ Yuvarlakçay Şelaleleri (Aile Boyu Orman ve Su Doğa Yürüyüşü)'
        },
        subtitle: {
            ru: 'Прохладная прогулка вдоль горной реки с качелями над ледяным потоком',
            en: 'Refreshing shaded walk along a rushing mountain canyon to wooden river swings',
            de: 'Erfrischende schattige Wanderung entlang eines Bergflusses zu Holzschaukeln',
            tr: 'Buz gibi dağ nehrinin kıyısında, su üstündeki salıncaklara uzanan serinletici yürüyüş'
        },
        description: {
            ru: 'Идеальный маршрут для летнего периода, когда на побережье жарко, и для семей с детьми. Тропа начинается от деревни Топарлар или Пынаркёй неподалеку от озера Кёйджегиз и идет вверх по течению горной реки Юварлакчай (Yuvarlakçay) под густой сенью платанов и сосен. Река питается талыми снегами гор Торос, поэтому вода здесь ледяная даже в плюс сорок. В конце маршрута вас ждут живописные каскады водопадов и знаменитые деревянные рестораны с качелями, свисающими прямо над бурлящей бирюзовой водой.',
            en: 'The ultimate sanctuary during summer peak heat and an ideal outing for active families with children. Starting near Toparlar or Pınarköy near Köyceğiz Lake, the trail ascends gently along the rushing Yuvarlakçay river canyon under dense canopies of sycamore and oriental sweetgum trees. Fed by Taurus snowmelt, the water remains freezing cold year-round. The destination features sparkling waterfalls and wooden over-water restaurants where iconic wooden swings let you soar right over the rushing turquoise rapids.',
            de: 'Das ultimative Zufluchtsort im Hochsommer und perfekt für Familien. Der Pfad führt unter dichten Platanen am Fluss Yuvarlakçay entlang zu Wasserfällen und Holzschaukeln über dem eiskalten Wasser.',
            tr: 'Yaz kavurucu sıcaklarında sahilin bunaltıcı havasından kaçmak için ideal aile boyu doğa rotası. Köyceğiz Gölü yakınlarındaki Toparlar veya Pınarköy\'den başlayan patika, ulu çınar ve sığla ağaçlarının gölgesinde Yuvarlakçay kanyonu boyunca ilerler. Kar sularıyla beslenen nehir kış yaz buz gibidir. Yürüyüşün sonunda muhteşem şelaleler ve gürül gürül akan turkuaz suyun üzerine kurulmuş ikonik ahşap salıncaklı restoranlar yer alır.'
        },
        startPoint: {
            ru: 'Деревня Топарлар / Пынаркёй (Köyceğiz Toparlar Şelalesi)',
            en: 'Toparlar / Pınarköy Trailhead (`Toparlar Şelalesi`)',
            de: 'Startpunkt Toparlar / Pınarköy (Toparlar Şelalesi)',
            tr: 'Toparlar / Pınarköy Başlangıç Noktası (Toparlar Şelalesi mevkii)'
        },
        endPoint: {
            ru: 'Исток реки Юварлакчай (Бешпынар / Yuvarlakçay Kaynak)',
            en: 'Yuvarlakçay River Springs (`Beşpınar / Kaynak`)',
            de: 'Yuvarlakçay Flussquelle (Beşpınar / Kaynak)',
            tr: 'Yuvarlakçay Su Çıkan / Kaynak mevkii (Beşpınar)'
        },
        waterSources: {
            ru: 'Горная река чистейшая, плюс вдоль всего русла работает более 15 традиционных ресторанов на воде.',
            en: 'Pristine mountain stream water, plus over 15 rustic over-water restaurants along the canyon.',
            de: 'Kristallklares Bergwasser und über 15 traditionelle Holzrestaurants am Fluss.',
            tr: 'Tertemiz dağ suyu ve vadi boyunca su üzerinde kurulu 15\'ten fazla geleneksel kır lokantası.'
        },
        highlights: {
            ru: [
                'Густой тенистый лес из платанов и редких амбровых (сыгловых) деревьев',
                'Каскады водопадов Топарлар с природными чашами для купания',
                'Иконные деревянные качели над бурлящей ледяной водой Юварлакчай',
                'Запеченная ягнятина (Tandır) или форель на углях под шум горного потока'
            ],
            en: [
                'Dense, cooling forest canopy of sycamore and endemic liquidambar trees',
                'Toparlar waterfall cascades pooling into natural swimming basins',
                'Iconic wooden swings soaring over Yuvarlakçay\'s rushing turquoise water',
                'Feasting on traditional slow-roasted lamb (`Tandır`) beside roaring rapids'
            ],
            de: [
                'Dichtes Blätterdach aus Platanen und endemischen Amberbäumen',
                'Toparlar-Wasserfälle mit natürlichen Badebecken',
                'Ikonische Holzschaukeln über dem reißenden türkisfarbenen Wasser',
                'Traditionelles Lamm aus dem Ofen (Tandır) beim Rauschen des Flusses'
            ],
            tr: [
                'Ulu çınarlar ve dünyada ender görülen sığla (günlük) ağaçlarından oluşan yemyeşil tünel',
                'Yüzülebilen doğal havuzlarıyla serinletici Toparlar Kanyonu şelaleleri',
                'Yuvarlakçay\'ın gürül gürül akan turkuaz sularının üzerinde sallanan ikonik ahşap salıncaklar',
                'Su sesleri eşliğinde odun ateşinde fırınlanmış meşhur kuzu tandır veya kiremitte alabalık ziyafeti'
            ]
        },
        gearAdvice: {
            ru: 'Маршрут доступен детям от 6-7 лет. Обязательно возьмите легкую куртку (у воды прохладно) и полотенца после качелей.',
            en: 'Accessible for active children aged 6+. Bring a light jacket (river mist can feel cool) and towels.',
            de: 'Für Kinder ab 6 Jahren geeignet. Leichte Jacke mitnehmen (am Wasser ist es kühl).',
            tr: '6-7 yaş ve üzeri çocuklar için uygundur. Su kenarı serin olduğundan hafif bir hırka ve salıncak sonrası havlu alınız.'
        },
        mapsQuery: 'Koycegiz Toparlar to Yuvarlakcay',
        image: '/api/images/locations/koycegiz/beach/Ekincik/ekincik.jpg'
    }
];

export default function TrekkingAtlas({ locale = 'ru' }: { locale?: string }) {
    const [selectedRegion, setSelectedRegion] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'all'>('all');

    const filteredStages = trailStages.filter(stage => {
        if (selectedRegion !== 'all' && stage.region !== selectedRegion) return false;
        if (selectedDifficulty !== 'all' && stage.difficulty !== selectedDifficulty) return false;
        return true;
    });

    const getDifficultyLabel = (diff: number) => {
        switch(diff) {
            case 1: return { ru: '⭐ Лёгкая прогулка', en: '⭐ Easy Walk', de: '⭐ Leichte Wanderung', tr: '⭐ Kolay Yürüyüş' }[locale] || '⭐ Easy';
            case 2: return { ru: '⭐⭐ Умеренная (Лайт)', en: '⭐⭐ Moderate (Light)', de: '⭐⭐ Mittelschwer (Leicht)', tr: '⭐⭐ Orta / Hafif' }[locale] || '⭐⭐ Moderate';
            case 3: return { ru: '⭐⭐⭐ Средний уровень', en: '⭐⭐⭐ Intermediate', de: '⭐⭐⭐ Mittelschwer', tr: '⭐⭐⭐ Orta Zorlukta' }[locale] || '⭐⭐⭐ Intermediate';
            case 4: return { ru: '⭐⭐⭐⭐ Сложный горный трек', en: '⭐⭐⭐⭐ Advanced Mountain Trek', de: '⭐⭐⭐⭐ Anspruchsvolle Bergetappe', tr: '⭐⭐⭐⭐ Zorlu Dağ Etabı' }[locale] || '⭐⭐⭐⭐ Advanced';
            case 5: return { ru: '⭐⭐⭐⭐⭐ Экстремальная / Альпийская', en: '⭐⭐⭐⭐⭐ Extreme / Alpine Grade', de: '⭐⭐⭐⭐⭐ Extrem / Alpine Stufe', tr: '⭐⭐⭐⭐⭐ Ekstrem / Alp Seviyesi' }[locale] || '⭐⭐⭐⭐⭐ Extreme';
            default: return '';
        }
    };

    const getDifficultyBadgeColor = (diff: number) => {
        switch(diff) {
            case 1: return 'bg-emerald-500 text-white border-emerald-600';
            case 2: return 'bg-teal-600 text-white border-teal-700';
            case 3: return 'bg-amber-500 text-white border-amber-600';
            case 4: return 'bg-orange-600 text-white border-orange-700';
            case 5: return 'bg-rose-600 text-white border-rose-700';
            default: return 'bg-slate-500 text-white';
        }
    };

    const t = {
        ru: {
            badge: "ИНТЕРАКТИВНЫЙ АТЛАС ТРОП",
            title: "Треккинг и Хайкинг на Ликийском и Карийском побережье",
            subtitle: "Исчерпывающий каталог этапов Ликийской тропы, Карийского пути, лесных каньонов и однодневных походов с перепадами высот, точками источников и GPS-навигацией.",
            filterAllRegions: "🗺️ Все маршруты (12+)",
            filterLycian: "🏔️ Ликийская тропа (Lycian Way)",
            filterCarian: "🌿 Карийская тропа (Carian Trail)",
            filterDayhike: "🥾 Однодневные хайки из курортов",
            filterCanyon: "🌊 Водные каньоны и ущелья",
            filterAllDiff: "🎯 Любая сложность",
            diff1: "⭐ Лёгкие (Семейные)",
            diff2: "⭐⭐ Умеренные",
            diff3: "⭐⭐⭐ Средние",
            diff4: "⭐⭐⭐⭐ Сложные",
            diff5: "⭐⭐⭐⭐⭐ Экстрим",
            statsDist: "Протяженность:",
            statsGain: "Набор высоты:",
            statsLoss: "Спуск:",
            statsDur: "Время в пути:",
            startLabel: "🚀 Точка старта:",
            endLabel: "🏁 Точка финиша:",
            waterLabel: "💧 Источники воды (Çeşme):",
            highlightsLabel: "✨ Главные впечатления этапа:",
            gearLabel: "🎒 Экипировка и безопасность:",
            openMapBtn: "Открыть трек на карте (Google Maps)",
            inflationShieldTitle: "🛡️ Щит от инфляции и сборы в парках 2026",
            inflationShieldDesc: "Вход на большинство открытых участков Ликийской и Карийской троп абсолютно бесплатен. Платный вход в 2026 году требуется только на охраняемые археологические и заповедные объекты: Музей Каякёй (~150-200 TL), Национальный парк Саклыкент (~60-80 TL + аренда аквашузов ~60 TL), античный Ксантос и Патара (~250-350 TL с доступом на пляж). Запас наличных лир обязателен для сельских магазинов в горах.",
            noResults: "Маршрутов с выбранными фильтрами не найдено. Попробуйте сбросить фильтр сложности или региона."
        },
        en: {
            badge: "INTERACTIVE TRAIL ATLAS",
            title: "Trekking & Hiking on the Lycian & Carian Coast",
            subtitle: "The definitive catalog of Lycian Way stages, Carian Trail coastal paths, forest canyons, and day hikes complete with elevation profiles, drinking fountains (`çeşme`), and GPS waypoints.",
            filterAllRegions: "🗺️ All Trails (12+)",
            filterLycian: "🏔️ Lycian Way (Likya Yolu)",
            filterCarian: "🌿 Carian Trail (Karia Yolu)",
            filterDayhike: "🥾 Day Hikes from Resorts",
            filterCanyon: "🌊 River Canyons & Gorges",
            filterAllDiff: "🎯 Any Difficulty",
            diff1: "⭐ Easy (Family)",
            diff2: "⭐⭐ Moderate",
            diff3: "⭐⭐⭐ Intermediate",
            diff4: "⭐⭐⭐⭐ Advanced",
            diff5: "⭐⭐⭐⭐⭐ Extreme",
            statsDist: "Distance:",
            statsGain: "Elevation Gain:",
            statsLoss: "Descent:",
            statsDur: "Est. Time:",
            startLabel: "🚀 Start Point:",
            endLabel: "🏁 End Point:",
            waterLabel: "💧 Water Fountains (`Çeşme`):",
            highlightsLabel: "✨ Stage Highlights:",
            gearLabel: "🎒 Gear & Safety Advice:",
            openMapBtn: "Open Trail on Google Maps",
            inflationShieldTitle: "🛡️ 2026 Inflation Shield & Park Fees",
            inflationShieldDesc: "Access to almost all open stretches of the Lycian Way and Carian Trail is 100% free. Entrance fees in 2026 apply strictly when crossing protected national parks or archaeological ruins: Kayaköy Ghost Town (~150-200 TL), Saklıkent Gorge (~60-80 TL plus rubber shoe rental ~60 TL), and ancient Xanthos/Patara (~250-350 TL which includes beach access). Always carry Turkish Lira cash for remote mountain village grocers.",
            noResults: "No trails match the selected filter criteria. Try resetting the difficulty or region filter."
        },
        de: {
            badge: "INTERAKTIVER WANDERATLAS",
            title: "Trekking & Wandern an der Lykischen & Karischen Küste",
            subtitle: "Der umfassende Katalog der Etappen des Lykischen und Karischen Weges, Flussschluchten und Tageswanderungen mit Höhenmetern, Trinkbrunnen (Çeşme) und GPS-Navigation.",
            filterAllRegions: "🗺️ Alle Routen (12+)",
            filterLycian: "🏔️ Lykischer Weg (Likya Yolu)",
            filterCarian: "🌿 Karischer Weg (Karia Yolu)",
            filterDayhike: "🥾 Tageswanderungen ab Resorts",
            filterCanyon: "🌊 Flussschluchten & Kanyons",
            filterAllDiff: "🎯 Jede Schwierigkeit",
            diff1: "⭐ Leicht (Familie)",
            diff2: "⭐⭐ Moderat",
            diff3: "⭐⭐⭐ Mittelschwer",
            diff4: "⭐⭐⭐⭐ Anspruchsvoll",
            diff5: "⭐⭐⭐⭐⭐ Extrem",
            statsDist: "Distanz:",
            statsGain: "Aufstieg:",
            statsLoss: "Abstieg:",
            statsDur: "Dauer:",
            startLabel: "🚀 Startpunkt:",
            endLabel: "🏁 Zielpunkt:",
            waterLabel: "💧 Trinkbrunnen (Çeşme):",
            highlightsLabel: "✨ Höhepunkte der Etappe:",
            gearLabel: "🎒 Ausrüstung & Sicherheit:",
            openMapBtn: "Route auf Google Maps öffnen",
            inflationShieldTitle: "🛡️ Inflationsschutz & Parkgebühren 2026",
            inflationShieldDesc: "Der Zugang zu fast allen offenen Strecken des Lykischen und Karischen Weges ist zu 100% kostenlos. Eintrittsgebühren fallen im Jahr 2026 nur beim Betreten geschützter Nationalparks oder Ruinen an: Geisterdorf Kayaköy (~150-200 TL), Saklıkent-Schlucht (~60-80 TL zzgl. Aquaschuhe ~60 TL) und antikes Xanthos/Patara (~250-350 TL inkl. Strandzugang). Nehmen Sie für kleine Dorfläden in den Bergen immer Bargeld in Türkischen Lira mit.",
            noResults: "Keine Wanderrouten gefunden. Bitte setzen Sie den Filter zurück."
        },
        tr: {
            badge: "İNTERAKTİF PATİKA ATLASI",
            title: "Likya ve Karia Kıyılarında Trekking ve Doğa Yürüyüşleri",
            subtitle: "Likya Yolu etapları, Karia Yolu sahil patikaları, kanyonlar ve günübirlik doğa yürüyüşlerinin yükseklik profili, su çeşmeleri ve GPS koordinatlarıyla donatılmış en kapsamlı rehberi.",
            filterAllRegions: "🗺️ Tüm Rotalar (12+)",
            filterLycian: "🏔️ Likya Yolu Etapları",
            filterCarian: "🌿 Karia Yolu Patikaları",
            filterDayhike: "🥾 Tatil Beldelerinden Günübirlik Rotalar",
            filterCanyon: "🌊 Kanyon ve Nehir Yürüyüşleri",
            filterAllDiff: "🎯 Her Zorluk Seviyesi",
            diff1: "⭐ Kolay (Aile)",
            diff2: "⭐⭐ Orta / Hafif",
            diff3: "⭐⭐⭐ Orta Zorlukta",
            diff4: "⭐⭐⭐⭐ Zorlu Dağ Etabı",
            diff5: "⭐⭐⭐⭐⭐ Ekstrem / Alp",
            statsDist: "Mesafe:",
            statsGain: "Yükseklik Kazanımı:",
            statsLoss: "İniş:",
            statsDur: "Tahmini Süre:",
            startLabel: "🚀 Başlangıç Noktası:",
            endLabel: "🏁 Bitiş Noktası:",
            waterLabel: "💧 Su Çeşmeleri ve Kaynaklar:",
            highlightsLabel: "✨ Etabın Öne Çıkan Güzellikleri:",
            gearLabel: "🎒 Ekipman ve Güvenlik Tavsiyesi:",
            openMapBtn: "Rotayı Haritada Aç (Google Maps)",
            inflationShieldTitle: "🛡️ 2026 Enflasyon Koruması ve Milli Park Ücretleri",
            inflationShieldDesc: "Likya Yolu ve Karia Yolu'nun açık arazi patikalarının neredeyse tamamına giriş %100 ücretsizdir. 2026 sezonunda yalnızca koruma altındaki ören yerlerinden veya milli parklardan geçerken giriş ücreti ödenir: Kayaköy Hayalet Şehri (~150-200 TL), Saklıkent Kanyonu (~60-80 TL + lastik ayakkabı kirası ~60 TL) ve Ksantos/Patara Antik Kenti (~250-350 TL - plaj girişi dahildir). Dağ köylerindeki bakkallar ve gözlemeciler için yanınızda mutlaka Türk Lirası nakit bulundurunuz.",
            noResults: "Seçilen filtrelere uygun rota bulunamadı. Lütfen zorluk veya bölge filtresini sıfırlayın."
        }
    }[locale as 'ru' | 'en' | 'de' | 'tr'] || {
        badge: "ИНТЕРАКТИВНЫЙ АТЛАС ТРОП",
        title: "Треккинг и Хайкинг на Ликийском и Карийском побережье",
        subtitle: "Исчерпывающий каталог этапов Ликийской тропы, Карийского пути, лесных каньонов и однодневных походов с перепадами высот, точками источников и GPS-навигацией.",
        filterAllRegions: "🗺️ Все маршруты (12+)",
        filterLycian: "🏔️ Ликийская тропа",
        filterCarian: "🌿 Карийская тропа",
        filterDayhike: "🥾 Однодневные хайки",
        filterCanyon: "🌊 Водные каньоны",
        filterAllDiff: "🎯 Любая сложность",
        diff1: "⭐ Лёгкие",
        diff2: "⭐⭐ Умеренные",
        diff3: "⭐⭐⭐ Средние",
        diff4: "⭐⭐⭐⭐ Сложные",
        diff5: "⭐⭐⭐⭐⭐ Экстрим",
        statsDist: "Протяженность:",
        statsGain: "Набор высоты:",
        statsLoss: "Спуск:",
        statsDur: "Время в пути:",
        startLabel: "🚀 Точка старта:",
        endLabel: "🏁 Точка финиша:",
        waterLabel: "💧 Источники воды:",
        highlightsLabel: "✨ Главные впечатления этапа:",
        gearLabel: "🎒 Экипировка и безопасность:",
        openMapBtn: "Открыть трек на карте (Google Maps)",
        inflationShieldTitle: "🛡️ Щит от инфляции и сборы в парках 2026",
        inflationShieldDesc: "Вход на большинство участков Ликийской и Карийской троп бесплатен. Платный вход только на охраняемые археологические объекты: Музей Каякёй (~150-200 TL), Саклыкент (~60-80 TL), Ксантос/Патара (~250-350 TL).",
        noResults: "Маршрутов не найдено."
    };

    return (
        <div className="w-full">
            {/* Header / Intro inside the atlas */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4 border border-emerald-200/60 shadow-sm">
                    <FaMountain className="text-emerald-600" /> {t.badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase italic tracking-tight">
                    {t.title}
                </h2>
                <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
                    {t.subtitle}
                </p>
            </div>

            {/* Inflation Shield & Park Fees Notice */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-[2.5rem] p-6 md:p-8 text-white mb-12 shadow-xl border border-emerald-500/30">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 text-3xl flex-shrink-0">
                        <FaInfoCircle />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-black text-lg md:text-xl uppercase italic tracking-wide text-emerald-300">
                            {t.inflationShieldTitle}
                        </h3>
                        <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed font-medium">
                            {t.inflationShieldDesc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Interactive Filters Bar */}
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 mb-12 space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                    <FaFilter className="text-emerald-600" /> Фильтры маршрутов по региону и подготовке:
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                        { id: 'all', label: t.filterAllRegions },
                        { id: 'lycian', label: t.filterLycian },
                        { id: 'carian', label: t.filterCarian },
                        { id: 'dayhike', label: t.filterDayhike },
                        { id: 'canyon', label: t.filterCanyon }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedRegion(tab.id)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                                selectedRegion === tab.id
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    <button
                        onClick={() => setSelectedDifficulty('all')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase transition-all ${
                            selectedDifficulty === 'all'
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        {t.filterAllDiff}
                    </button>
                    {[1, 2, 3, 4, 5].map(diff => (
                        <button
                            key={diff}
                            onClick={() => setSelectedDifficulty(diff)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase transition-all ${
                                selectedDifficulty === diff
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                            }`}
                        >
                            {diff === 1 ? t.diff1 : diff === 2 ? t.diff2 : diff === 3 ? t.diff3 : diff === 4 ? t.diff4 : t.diff5}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stages Grid */}
            {filteredStages.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-12 text-center text-slate-500 border border-slate-200">
                    <FaMountain className="mx-auto text-4xl text-slate-300 mb-4" />
                    <p className="font-bold">{t.noResults}</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {filteredStages.map((stage, index) => {
                        const stageTitle = stage.title[locale] || stage.title['ru'] || stage.title['en'];
                        const stageSubtitle = stage.subtitle[locale] || stage.subtitle['ru'] || stage.subtitle['en'];
                        const stageDesc = stage.description[locale] || stage.description['ru'] || stage.description['en'];
                        const startPt = stage.startPoint[locale] || stage.startPoint['ru'] || stage.startPoint['en'];
                        const endPt = stage.endPoint[locale] || stage.endPoint['ru'] || stage.endPoint['en'];
                        const waterInfo = stage.waterSources[locale] || stage.waterSources['ru'] || stage.waterSources['en'];
                        const highlights = stage.highlights[locale] || stage.highlights['ru'] || stage.highlights['en'];
                        const gear = stage.gearAdvice[locale] || stage.gearAdvice['ru'] || stage.gearAdvice['en'];

                        return (
                            <div 
                                key={stage.id} 
                                className="group bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row"
                            >
                                {/* Left/Top Image & Quick Badge */}
                                <div className="relative lg:w-2/5 h-64 lg:h-auto min-h-[300px] overflow-hidden flex-shrink-0">
                                    <img
                                        src={stage.image}
                                        alt={stageTitle}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/60" />
                                    
                                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg border ${getDifficultyBadgeColor(stage.difficulty)}`}>
                                            {getDifficultyLabel(stage.difficulty)}
                                        </span>
                                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                            {stage.region === 'lycian' ? '🏔️ Ликийская тропа' : stage.region === 'carian' ? '🌿 Карийская тропа' : stage.region === 'dayhike' ? '🥾 Однодневный хайк' : '🌊 Каньон'}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6 text-white lg:hidden">
                                        <h3 className="text-xl font-black uppercase italic leading-tight">{stageTitle}</h3>
                                        <p className="text-xs text-emerald-300 font-bold mt-1">{stageSubtitle}</p>
                                    </div>
                                </div>

                                {/* Right/Bottom Detailed Content */}
                                <div className="p-6 md:p-10 flex-grow flex flex-col justify-between space-y-6">
                                    <div>
                                        <div className="hidden lg:block mb-4">
                                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic leading-tight">
                                                {stageTitle}
                                            </h3>
                                            <p className="text-sm font-bold text-emerald-600 mt-1 uppercase tracking-wide">
                                                {stageSubtitle}
                                            </p>
                                        </div>

                                        {/* Quantitative Metric Bar */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 px-5 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-xs">
                                            <div>
                                                <span className="text-slate-400 font-bold block">{t.statsDist}</span>
                                                <span className="font-black text-slate-800 text-sm">{stage.distanceKm} км</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 font-bold block">{t.statsGain}</span>
                                                <span className="font-black text-emerald-600 text-sm">+{stage.elevationGainM} м</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 font-bold block">{t.statsLoss}</span>
                                                <span className="font-black text-rose-600 text-sm">-{stage.elevationLossM} м</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 font-bold block">{t.statsDur}</span>
                                                <span className="font-black text-slate-800 text-sm flex items-center gap-1">
                                                    <FaClock className="text-emerald-500" /> {stage.durationHours}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Main Description */}
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                                            {stageDesc}
                                        </p>

                                        {/* Waypoints & Water Info Block */}
                                        <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/60 text-xs mb-6">
                                            <div className="flex items-start gap-2 text-slate-700 font-medium">
                                                <FaMapMarkerAlt className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <strong className="text-slate-900 font-bold">{t.startLabel}</strong> {startPt}
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 text-slate-700 font-medium">
                                                <FaMapMarkerAlt className="text-rose-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <strong className="text-slate-900 font-bold">{t.endLabel}</strong> {endPt}
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 text-slate-700 font-medium pt-2 border-t border-emerald-200/50">
                                                <FaTint className="text-cyan-600 flex-shrink-0 mt-0.5 text-sm" />
                                                <div>
                                                    <strong className="text-slate-900 font-bold">{t.waterLabel}</strong> {waterInfo}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Highlights list */}
                                        <div className="mb-6">
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                <FaStar className="text-amber-500" /> {t.highlightsLabel}
                                            </h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                                                {highlights.map((item, hIdx) => (
                                                    <li key={hIdx} className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Gear & Safety Advice */}
                                        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3 text-xs text-amber-900 font-medium mb-6">
                                            <FaExclamationTriangle className="text-amber-600 flex-shrink-0 text-sm mt-0.5" />
                                            <div>
                                                <strong className="font-bold block uppercase tracking-wide text-amber-800">{t.gearLabel}</strong>
                                                {gear}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
                                        <Link
                                            href={`/${locale}/articles/81_trekking_routes`}
                                            className="text-xs font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                                        >
                                            Читать полный гайд по тропе <FaChevronRight size={10} />
                                        </Link>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stage.mapsQuery)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-100 flex items-center justify-center gap-2"
                                        >
                                            <FaRoute /> {t.openMapBtn}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
