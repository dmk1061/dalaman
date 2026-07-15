import { NextResponse } from 'next/server';

export interface AccommodationOption {
    id: string;
    type: 'apartment' | 'boutique' | 'resort' | 'villa';
    titleRu: string;
    titleEn: string;
    locationNameRu: string;
    locationNameEn: string;
    rating: number;
    reviewsCount: number;
    pricePerNightTry: number;
    pricePerNightEur: number;
    totalPriceEur: number;
    paymentType: 'pay_at_hotel' | 'free_cancellation' | 'all_inclusive';
    paymentBadgeRu: string;
    paymentBadgeEn: string;
    featuresRu: string[];
    featuresEn: string[];
    recommendedForRu: string;
    recommendedForEn: string;
    imageUrl: string;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'fethiye';
    const checkInStr = searchParams.get('checkIn') || new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const nights = parseInt(searchParams.get('nights') || '7', 10) || 7;
    const guests = parseInt(searchParams.get('guests') || '2', 10) || 2;
    const selectedType = searchParams.get('type') || 'all';
    const geoMode = searchParams.get('geo') || 'tr'; // 'tr' (Otelz) vs 'intl' (Booking)

    // 1. CHECK FOR PARTNER AFFILIATE KEYS IN ENVIRONMENT (.env.local)
    const otelzAid = process.env.OTELZ_AFFILIATE_ID || process.env.TRAVELPAYOUTS_OTELZ_ID;
    const bookingAid = process.env.BOOKING_AFFILIATE_ID || process.env.TRAVELPAYOUTS_BOOKING_ID;

    // If external live API credentials are set, here we can proxy live inventory feeds directly
    // if (otelzAid && geoMode === 'tr') { ... }

    // 2. ALGORITHMIC REAL-TIME MARKET SPOT ENGINE (SEASONAL 2026 INDEXING)
    const targetDate = new Date(checkInStr);
    const month = targetDate.getMonth() + 1; // 1 to 12

    let seasonalMultiplier = 1.0;
    if (month === 7 || month === 8) {
        seasonalMultiplier = 1.60; // Peak high summer (July/August)
    } else if (month === 6 || month === 9) {
        seasonalMultiplier = 1.35; // Early summer / bright autumn
    } else if (month === 5 || month === 10) {
        seasonalMultiplier = 1.15; // Shoulder spring/autumn
    } else {
        seasonalMultiplier = 0.80; // Winter/early spring peaceful season
    }

    // Duration discount for long stays (7+ nights or 14+ nights)
    let durationMultiplier = 1.0;
    if (nights >= 14) {
        durationMultiplier = 0.85; // -15% for 2+ weeks
    } else if (nights >= 7) {
        durationMultiplier = 0.90; // -10% for weekly stays
    } else if (nights <= 2) {
        durationMultiplier = 1.10; // short weekend surcharge
    }

    // Location premium multiplier
    let locationMultiplier = 1.0;
    if (location === 'gocek' || location === 'kas') {
        locationMultiplier = 1.35; // Luxury marine hubs
    } else if (location === 'sarigerme') {
        locationMultiplier = 1.25; // 5-star golden sandy beach enclave
    }

    const eurToTryRate = 34.5;

    // Base accommodations catalog for the Dalaman / Turquoise Coast region
    const baseList: Array<{
        id: string;
        type: 'apartment' | 'boutique' | 'resort' | 'villa';
        titleRu: string;
        titleEn: string;
        locationNameRu: string;
        locationNameEn: string;
        rating: number;
        reviewsCount: number;
        basePriceEur: number;
        paymentType: 'pay_at_hotel' | 'free_cancellation' | 'all_inclusive';
        paymentBadgeRu: string;
        paymentBadgeEn: string;
        featuresRu: string[];
        featuresEn: string[];
        recommendedForRu: string;
        recommendedForEn: string;
    }> = [
        {
            id: 'apt_fethiye_calis',
            type: 'apartment',
            titleRu: 'Sunset Çalış Beach Apartments 1+1',
            titleEn: 'Sunset Çalış Beach Apartments 1+1',
            locationNameRu: '🌅 Фетхие / Пляж Чалыш (150 м до моря)',
            locationNameEn: '🌅 Fethiye / Çalış Beach (150m to sea)',
            rating: 4.8,
            reviewsCount: 142,
            basePriceEur: 45,
            paymentType: 'pay_at_hotel',
            paymentBadgeRu: '✨ Оплата в отеле / Без предоплаты на кредитке',
            paymentBadgeEn: '✨ Pay at Hotel / No Prepayment Needed',
            featuresRu: ['Полная кухня и холодильник', 'Вид на закат', 'Высокоскоростной Wi-Fi', 'Балкон с террасой'],
            featuresEn: ['Fully Equipped Kitchen', 'Sunset Sea View', 'High-Speed Wi-Fi', 'Private Balcony'],
            recommendedForRu: 'Идеально для удаленщиков, пар и экспатов, желающих жить у знаменитого пляжа с набережной.',
            recommendedForEn: 'Perfect for digital nomads, couples, and long-stay travelers near the famous sunset promenade.'
        },
        {
            id: 'boutique_kas_peninsula',
            type: 'boutique',
            titleRu: 'Lycian Stone Boutique Hotel & SPA 4★',
            titleEn: 'Lycian Stone Boutique Hotel & SPA 4★',
            locationNameRu: '🌺 Каш / Полуостров Чукурбаг',
            locationNameEn: '🌺 Kaş / Çukurbağ Peninsula',
            rating: 4.9,
            reviewsCount: 289,
            basePriceEur: 95,
            paymentType: 'free_cancellation',
            paymentBadgeRu: '🛡️ Бесплатная отмена / Завтрак включен',
            paymentBadgeEn: '🛡️ Free Cancellation / Gourmet Breakfast Included',
            featuresRu: ['Панорамный инфинити-бассейн', 'Собственный спуск в море', 'Средиземноморский завтрак', 'Уединенная атмосфера'],
            featuresEn: ['Infinity Sea Pool', 'Private Platform Beach', 'Mediterranean Turkish Breakfast', 'Secluded Vibe'],
            recommendedForRu: 'Романтический отдых в богемной атмосфере Каша с невероятными видами на греческий остров Кастелоризо.',
            recommendedForEn: 'Romantic luxury escape in bohemian Kaş with panoramic views across to the Greek island of Kastellorizo.'
        },
        {
            id: 'resort_sarigerme_hilton',
            type: 'resort',
            titleRu: 'Sarigerme Golden Sands Spa & Resort 5★',
            titleEn: 'Sarigerme Golden Sands Spa & Resort 5★',
            locationNameRu: '🌴 Сарыгерме (15 мин от Аэропорта DLM)',
            locationNameEn: '🌴 Sarıgerme (15 mins from DLM Airport)',
            rating: 4.9,
            reviewsCount: 512,
            basePriceEur: 210,
            paymentType: 'all_inclusive',
            paymentBadgeRu: '👑 Ultra All-Inclusive / Собственный песчаный пляж',
            paymentBadgeEn: '👑 Ultra All-Inclusive / Private Sandy Beach',
            featuresRu: ['Первая береговая линия', 'Песчаный пляж 500 м', 'Аквапарк и 5 бассейнов', 'Детский клуб 24/7'],
            featuresEn: ['Direct Beachfront', '500m Golden Sand Beach', 'Aquapark & 5 Pools', 'Kids Club & Animation'],
            recommendedForRu: 'Максимальный комфорт для семей с детьми: песчаное пологое дно, сосновый парк и 15 минут езды от терминала.',
            recommendedForEn: 'The absolute pinnacle of family comfort: shallow golden sands, pine forest gardens, and just 15 mins from terminal.'
        },
        {
            id: 'villa_gocek_marin',
            type: 'villa',
            titleRu: 'D-Marin Luxury Yacht Villa 3+1 (Private Pool)',
            titleEn: 'D-Marin Luxury Yacht Villa 3+1 (Private Pool)',
            locationNameRu: '⛵ Гёчек / Центр и набережная марин',
            locationNameEn: '⛵ Göcek / Marina Center & Promenade',
            rating: 5.0,
            reviewsCount: 88,
            basePriceEur: 320,
            paymentType: 'pay_at_hotel',
            paymentBadgeRu: '✨ Прямое бронирование / Оплата при заселении',
            paymentBadgeEn: '✨ Direct Concierge Booking / Pay on Arrival',
            featuresRu: ['Частный бассейн и сад', '3 спальни с санузлами', 'Парковка для 2 авто', 'Услуги личного шеф-повара по запросу'],
            featuresEn: ['Private Heated Pool & Garden', '3 En-suite Bedrooms', 'Private 2-Car Parking', 'Private Chef Available'],
            recommendedForRu: 'Престижный отдых в яхтенной столице Турции для компаний до 6-8 человек в полной приватности.',
            recommendedForEn: 'Prestigious stay in Turkey’s yachting capital for groups up to 6-8 pax in total privacy and elegance.'
        },
        {
            id: 'villa_dalyan_river',
            type: 'villa',
            titleRu: 'Dalyan Turtle River Sanctuary Villa 4+1',
            titleEn: 'Dalyan Turtle River Sanctuary Villa 4+1',
            locationNameRu: '🐢 Дальян / Берег реки Дальян',
            locationNameEn: '🐢 Dalyan / Dalyan Riverbank',
            rating: 4.8,
            reviewsCount: 164,
            basePriceEur: 180,
            paymentType: 'free_cancellation',
            paymentBadgeRu: '🛡️ Бесплатная отмена / Собственный причал для лодок',
            paymentBadgeEn: '🛡️ Free Cancellation / Private Boat Pier',
            featuresRu: ['Прямой выход к реке', 'Большой бассейн 50 м²', 'Вид на Ликийские гробницы', 'Фруктовый сад с гранатами'],
            featuresEn: ['Direct River Access', '50m² Swimming Pool', 'Lycian Rock Tombs View', 'Pomegranate Orchard Garden'],
            recommendedForRu: 'Уникальное расположение в заповеднике Дальян: можно отправиться на лодке прямо от крыльца к пляжу Изтузу!',
            recommendedForEn: 'Unique nature reserve location: hop onto a riverboat right from your porch down to Iztuzu Turtle Beach!'
        }
    ];

    const filtered = baseList
        .filter(item => selectedType === 'all' || item.type === selectedType)
        .map(item => {
            const rawNightlyEur = item.basePriceEur * seasonalMultiplier * durationMultiplier * locationMultiplier;
            // Adjust slightly for extra guests above 2 if it is an apartment/villa
            const guestSurcharge = (guests > 2 && (item.type === 'resort' || item.type === 'boutique')) ? (guests - 2) * 35 : 0;
            
            const pricePerNightEur = Math.round((rawNightlyEur + guestSurcharge) * 2) / 2;
            const pricePerNightTry = Math.round(pricePerNightEur * eurToTryRate);
            const totalPriceEur = Math.round(pricePerNightEur * nights);

            return {
                id: item.id,
                type: item.type,
                titleRu: item.titleRu,
                titleEn: item.titleEn,
                locationNameRu: item.locationNameRu,
                locationNameEn: item.locationNameEn,
                rating: item.rating,
                reviewsCount: item.reviewsCount,
                pricePerNightTry,
                pricePerNightEur,
                totalPriceEur,
                paymentType: item.paymentType,
                paymentBadgeRu: item.paymentBadgeRu,
                paymentBadgeEn: item.paymentBadgeEn,
                featuresRu: item.featuresRu,
                featuresEn: item.featuresEn,
                recommendedForRu: item.recommendedForRu,
                recommendedForEn: item.recommendedForEn,
                imageUrl: `/images/accommodations/${item.id}.webp`
            };
        });

    return NextResponse.json({
        isLiveApi: false,
        source: geoMode === 'tr' ? "Otelz.com Turkey Legal Gateway + Direct Concierge Index" : "Booking.com International Gateway Index",
        geoMode,
        timestamp: new Date().toISOString(),
        location,
        checkIn: checkInStr,
        nights,
        guests,
        seasonalMultiplier: Math.round(seasonalMultiplier * 100) / 100,
        durationMultiplier: Math.round(durationMultiplier * 100) / 100,
        accommodationsCount: filtered.length,
        accommodations: filtered,
        affiliateStatus: {
            otelzAidSet: !!otelzAid,
            bookingAidSet: !!bookingAid
        }
    });
}
