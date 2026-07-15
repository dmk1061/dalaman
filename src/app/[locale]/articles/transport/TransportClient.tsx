"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaBus, 
  FaTaxi, 
  FaCar, 
  FaShip, 
  FaMapMarkerAlt, 
  FaExternalLinkAlt, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaCalculator,
  FaCheckCircle,
  FaInfoCircle,
  FaGooglePlay,
  FaApple,
  FaMobileAlt,
  FaTicketAlt,
  FaExchangeAlt
} from 'react-icons/fa';
import { TAXI_DESTINATIONS, FERRY_ROUTES, UKOME_TAXI_RATES } from '@/lib/transport-data';

interface TransportClientProps {
  locale: string;
}

const clientTranslations: Record<string, any> = {
  en: {
    title: "TRANSPORTATION GUIDE",
    subtitle: "Complete information about local buses, taxis, car rentals, dolmuş minibuses, and ferries in the Muğla region.",
    tabs: {
      buses: "Buses & Shuttles",
      taxi: "Taxi & Fare Estimator",
      rentals: "Car & Scooter Hire",
      ferries: "Dolmuş & Ferries"
    },
    sections: {
      buses: {
        title: "Havaş & Muttaş Airport Shuttles",
        desc: "Comfortable and cheap municipal and private shuttles run 24/7 between Dalaman Airport and major resort hubs.",
        sync_title: "Flight Schedule Synchronization",
        sync_desc: "Important: Shuttles are synchronized with Turkish domestic flight arrivals (Pegasus, AJet, Turkish Airlines). If your flight is delayed, the buses will wait at the exit until all passengers clear baggage claim.",
        routes_title: "Key Routes & End Stations",
        routes_desc: "Shuttles depart from the lower level terminal exit:",
        fethiye_route: "Dalaman Airport → Göcek → Fethiye Otogar (Bus Station)",
        marmaris_route: "Dalaman Airport → Ortaca → Marmaris Otogar (Bus Station)",
        payment_title: "Fares & Payment",
        payment_desc: "Fares range between 120 ₺ and 200 ₺. Payment is accepted in cash (Turkish Lira) or by credit/debit card directly to the driver upon boarding.",
        apps_title: "Top-Up & Mobile Tracking (MuğlaApp)",
        apps_desc: "Download the official Muğla Büyükşehir Belediyesi transit application for live bus tracking, route planning, and card topping.",
        playstore: "Google Play Store",
        appstore: "App Store",
        moovit_title: "Moovit Web & Route Planner",
        moovit_desc: "If you prefer planning in your web browser without downloading apps, use the Moovit Muğla portal or MUTTAŞ official site for intercity route maps and timing details.",
        moovit_btn: "Open Moovit Muğla",
        muttas_btn: "Open MUTTAŞ Site",
        obilet_title: "Intercity Bus Tickets (Obilet)",
        obilet_desc: "For travel to other regions of Turkey (Antalya, Istanbul, Izmir, Bodrum), use the official obilet.com portal to book bus tickets.",
        obilet_btn: "Search Tickets on Obilet"
      },
      taxi: {
        title: "Taxis & Private Transfers",
        desc: "All official city taxis in Muğla are yellow and run on taximeters. Private VIP transfers are booked at fixed rates.",
        calc_title: "Smart Taxi Fare Estimator",
        calc_desc: "Calculate fares dynamically. We fetch live Turkish Lira exchange rates to provide accurate conversions. Compares UKOME taximeter fares with airport cooperative fixed prices.",
        destination_label: "Select Destination",
        currency_label: "Select Currency",
        vehicle_label: "Vehicle Type",
        vehicle_standard: "Standard Sedan (Yellow Taxi)",
        vehicle_vip: "VIP Vito Minivan / Private Transfer",
        calc_result_dist: "Approximate Distance:",
        calc_result_time: "Travel Time:",
        calc_result_meter: "UKOME Taximeter Estimate:",
        calc_result_fixed: "Cooperative Fixed Fare:",
        calc_result_best: "Recommended Option:",
        calc_notes_title: "Muğla UKOME Taxi Regulations (2026)",
        calc_notes_desc: "Boarding fee (açılış): 40 ₺. Rate per km: 30 ₺. Short distance minimum rate (indi-bindi): 100 ₺. Taxis at the airport exits are operated by cooperatives and often request a fixed rate in Euro or Pounds for long distances, which is usually equal to or slightly cheaper than the meter rate for groups.",
        ad_driver_title: "Recommended Local Driver",
        ad_driver_desc: "Official airport cooperative taxi driver. English/Russian speaking, clean non-smoking vehicles, Mercedes Vito VIP minivans.",
        ad_driver_name: "Ahmet Yilmaz (Airport Taxi)",
        ad_driver_whatsapp: "Message via WhatsApp",
        ad_driver_call: "Call Phone",
        ad_transfer_title: "Pre-Book VIP Transfer",
        ad_transfer_desc: "Private transfer with sign meetup at arrivals terminal. Flat rates, flight monitoring, child seats included.",
        ad_transfer_btn: "Book Transfer Online",
        taxi_board_title: "Official Airport Taxi Rates Board",
        taxi_board_desc: "Below are the standardized fixed-price rates displayed on the huge boards outside the Arrivals hall of Dalaman Airport:"
      },
      rentals: {
        title: "Car, Scooter & ATV Rentals",
        desc: "Renting a car at Dalaman Airport gives you the freedom to explore isolated beaches, ruins, and mountain villages at your own pace.",
        airport_rental_title: "Airport Car Rental Desks",
        airport_rental_desc: "Major international brands (Avis, Budget, Enterprise, Europcar, Hertz, Sixt) and local Turkish agencies have desks in the Arrivals terminal. We recommend booking in advance, especially during the summer peak season.",
        docs_title: "Rental Requirements",
        doc1: "Valid driver's license (held for at least 1-2 years).",
        doc2: "International Driving Permit (IDP) if your license is not in Latin script (e.g. Cyrillic).",
        doc3: "Credit card in the driver's name for the security deposit hold.",
        scooter_title: "Scooter & ATV Hire",
        scooter_desc: "For local trips in Göcek, Fethiye, Marmaris, or Kas, renting a 125cc scooter or an ATV is a fantastic way to bypass summer traffic jams. Helmets are mandatory by Turkish law."
      },
      ferries: {
        title: "Dolmuş & Ferry Routes",
        desc: "Use local dolmuş minibuses to explore nearby bays, or catch a ferry to the Greek islands or across the gulf.",
        dolmus_title: "Local Dolmuş Minibuses",
        dolmus_desc: "Dolmuş (meaning 'stuffed') is the Turkish version of a shared route minibus. They run every 10-20 minutes between city centers and nearby beaches or ruins.",
        dolmus_tips: "Dolmuş Tips for Travelers",
        tip1: "You can stop a dolmuş anywhere along its road by waving your hand.",
        tip2: "Hand cash forward through other passengers if you sit in the back. Driver will pass change back.",
        tip3: "To get off, stand up and say loudly: 'İnecek var!' (meaning 'someone wants to get off').",
        ferries_title: "Ferry Departures & Docks",
        ferries_desc: "Regular high-speed catamarans and car ferries connect the Lycian Coast with Greek islands and major gulf ports.",
        port_gps: "Port Location & GPS Navigation",
        gps_btn: "Open in Google Maps",
        ferry_schedule_btn: "Check Schedules & Tickets"
      }
    },
    common: {
      gps_label: "Otogar GPS Location",
      km: "km",
      mins: "mins",
      currency: "Currency",
      standard: "Standard",
      vip: "VIP Vito",
      meter_compare: "The metered rate is calculated using the official Muğla UKOME tariff. For longer distances, a fixed pre-booked VIP Vito is often cleaner and has fixed pricing.",
      exchange_info: "Live exchange rates fetched successfully. Conversion is updated."
    }
  },
  ru: {
    title: "ТРАНСПОРТНЫЙ ГИД",
    subtitle: "Полное руководство по автобусам, такси, аренде авто, долмушам и паромному сообщению в провинции Мугла.",
    tabs: {
      buses: "Автобусы и шаттлы",
      taxi: "Такси и калькулятор",
      rentals: "Прокат авто и скутеров",
      ferries: "Долмуши и паромы"
    },
    sections: {
      buses: {
        title: "Шаттлы Havaş и Muttaş",
        desc: "Комфортабельные и недорогие муниципальные и частные автобусы курсируют круглосуточно между аэропортом Даламан и основными городами побережья.",
        sync_title: "Синхронизация с расписанием рейсов",
        sync_desc: "Важно: Шаттлы подстроены под расписание внутренних рейсов (Pegasus, AJet, Turkish Airlines). Автобусы всегда ждут выхода пассажиров на площади перед терминалом, даже если рейс задержался.",
        routes_title: "Основные маршруты и автовокзалы",
        routes_desc: "Шаттлы отправляются с нижнего уровня выхода из терминала прилетов:",
        fethiye_route: "Аэропорт Даламан → Гёджек → Автовокзал Фетхие (Otogar)",
        marmaris_route: "Аэропорт Даламан → Ортаджа → Автовокзал Мармариса (Otogar)",
        payment_title: "Стоимость и оплата",
        payment_desc: "Билет стоит от 120 до 200 лир. Оплата принимается наличными (в лирах) или банковскими картами при входе в автобус у водителя.",
        apps_title: "Отслеживание и пополнение (MuğlaApp)",
        apps_desc: "Скачайте официальное приложение Muğla Büyükşehir Belediyesi для отслеживания движения автобусов на карте онлайн, планирования маршрутов и пополнения транспортных карт.",
        playstore: "Google Play Store",
        appstore: "App Store",
        moovit_title: "Moovit в вебе и MUTTAŞ",
        moovit_desc: "Если вы хотите планировать поездки в браузере без установки приложений, используйте веб-портал Moovit Muğla или сайт MUTTAŞ с расписанием.",
        moovit_btn: "Открыть Moovit Muğla",
        muttas_btn: "Сайт MUTTAŞ",
        obilet_title: "Билеты на междугородние автобусы (Obilet)",
        obilet_desc: "Для путешествий в другие города Турции (Анталья, Стамбул, Измир, Бодрум) используйте официальный сервис бронирования билетов obilet.com.",
        obilet_btn: "Поиск билетов на Obilet"
      },
      taxi: {
        title: "Такси и трансферы",
        desc: "Все городские такси в провинции Мугла — желтого цвета с обязательным расчетом по счетчику (таксометру). Для поездок на курорты часто выгоднее заказать VIP-трансфер.",
        calc_title: "Умный калькулятор стоимости такси",
        calc_desc: "Рассчитайте стоимость поездки. Мы автоматически загружаем актуальные курсы обмена лиры (TRY) для пересчета. Сравнивает тариф счетчика UKOME с фиксированной ценой аэропорта.",
        destination_label: "Направление",
        currency_label: "Валюта расчета",
        vehicle_label: "Класс автомобиля",
        vehicle_standard: "Стандарт (Желтое такси)",
        vehicle_vip: "VIP Минивэн / Трансфер (Vito)",
        calc_result_dist: "Расстояние:",
        calc_result_time: "Время в пути:",
        calc_result_meter: "Расчет по таксометру UKOME:",
        calc_result_fixed: "Фиксированный тариф кооператива:",
        calc_result_best: "Рекомендуемый вариант:",
        calc_notes_title: "Официальные тарифы UKOME Muğla (2026)",
        calc_notes_desc: "Посадка (açılış): 40 ₺. Тариф за км: 30 ₺. Минимальный тариф за короткую поездку (indi-bindi): 100 ₺. Таксисты на выходе из аэропорта часто просят фиксированную плату в евро/фунтах для дальних дистанций, что часто бывает близко к счетчику и более выгодно для групп.",
        ad_driver_title: "Рекомендуемый местный таксист",
        ad_driver_desc: "Официальный лицензированный водитель кооператива аэропорта. Говорит по-русски и по-английски, чистые некурящие автомобили, Mercedes Vito VIP.",
        ad_driver_name: "Ахмет Йылмаз (Аэропортовое такси)",
        ad_driver_whatsapp: "Написать в WhatsApp",
        ad_driver_call: "Позвонить водителю",
        ad_transfer_title: "VIP-трансфер по фиксированной цене",
        ad_transfer_desc: "Индивидуальный трансфер с встречей с табличкой в терминале. Фиксированная цена, отслеживание рейса, детские кресла.",
        ad_transfer_btn: "Забронировать онлайн",
        taxi_board_title: "Официальный стенд тарифов такси",
        taxi_board_desc: "Ниже приведена таблица тарифов, отображаемая на больших стендах при выходе из терминалов прилета аэропорта Даламан:"
      },
      rentals: {
        title: "Аренда автомобилей, скутеров и квадроциклов",
        desc: "Аренда авто в аэропорту Даламан — лучший способ увидеть секретные бухты, древние города и горные деревни без привязки к расписаниям.",
        airport_rental_title: "Прокат авто в аэропорту",
        airport_rental_desc: "Стойки международных брендов (Avis, Budget, Enterprise, Europcar, Hertz, Sixt) и турецких агентств находятся в зале прилетов. Летом в пик сезона крайне рекомендуется бронировать машину заранее.",
        docs_title: "Требования для аренды",
        doc1: "Водительские права (стаж вождения от 1-2 лет).",
        doc2: "Международное водительское удостоверение (МВУ), если ваши права не на латинице.",
        doc3: "Кредитная карта на имя водителя для блокировки депозита.",
        scooter_title: "Прокат скутеров и квадроциклов",
        scooter_desc: "Для локальных поездок по Гёджеку, Фетхие, Мармарису или Кашу аренда скутера 125сс или квадроцикла — прекрасный вариант объехать летние пробки. По закону шлем обязателен."
      },
      ferries: {
        title: "Маршрутки-долмуши и паромы",
        desc: "Местные долмуши отвезут вас на пляжи, а паромы доставят на греческие острова и через заливы.",
        dolmus_title: "Местные маршрутки (Долмуши)",
        dolmus_desc: "Долмуш (букв. 'заполненный') — турецкий вариант маршрутки. Ходят каждые 10-20 минут, соединяя центр городов с бухтами и античными руинами.",
        dolmus_tips: "Советы по использованию долмушей",
        tip1: "Остановить долмуш можно взмахом руки в любом месте на дороге.",
        tip2: "Если сели сзади, передавайте наличные вперед через пассажиров. Сдачу водитель передаст назад.",
        tip3: "Для выхода скажите водителю громко: 'Инеджек вар!' (inecek var — 'есть выходящий').",
        ferries_title: "Паромы и терминалы",
        ferries_desc: "Скоростные катамараны и автомобильные паромы связывают Ликийское побережье с островами Греции и портами залива.",
        port_gps: "Координаты порта для навигации",
        gps_btn: "Открыть в Google Картах",
        ferry_schedule_btn: "Проверить расписание и билеты"
      }
    },
    common: {
      gps_label: "GPS автовокзала (Otogar)",
      km: "км",
      mins: "мин",
      currency: "Валюта",
      standard: "Стандарт",
      vip: "VIP Vito",
      meter_compare: "Поездка по счетчику регулируется тарифом UKOME. Для дальних дистанций VIP-минивэн с фиксированной ценой удобнее и комфортнее для компании.",
      exchange_info: "Курсы валют обновлены в реальном времени с API."
    }
  },
  de: {
    title: "TRANSPORT-LEITFADEN",
    subtitle: "Vollständige Informationen über Busse, Taxis, Autovermietungen, Dolmuş-Minibusse und Fähren in der Region Muğla.",
    tabs: {
      buses: "Busse & Shuttles",
      taxi: "Taxi & Tarifrechner",
      rentals: "Mietwagen & Roller",
      ferries: "Dolmuş & Fähren"
    },
    sections: {
      buses: {
        title: "Havaş & Muttaş Shuttles",
        desc: "Komfortable und günstige Busse verkehren rund um die Uhr zwischen dem Flughafen Dalaman und den wichtigsten Ferienorten.",
        sync_title: "Flugplan-Synchronisation",
        sync_desc: "Wichtig: Die Shuttles sind auf Inlandsflüge (Pegasus, AJet, Turkish Airlines) abgestimmt und warten bei Verspätungen.",
        routes_title: "Wichtigste Routen & Busbahnhöfe",
        routes_desc: "Die Shuttles fahren am Ausgang der Ankunftshalle ab:",
        fethiye_route: "Flughafen Dalaman → Göcek → Busbahnhof Fethiye (Otogar)",
        marmaris_route: "Flughafen Dalaman → Ortaca → Busbahnhof Marmaris (Otogar)",
        payment_title: "Preise & Zahlung",
        payment_desc: "Fahrpreise liegen zwischen 120 ₺ und 200 ₺. Zahlung in bar (TL) oder per Karte beim Fahrer.",
        apps_title: "Mobile App (MuğlaApp)",
        apps_desc: "Laden Sie die offizielle MuğlaApp herunter, um Busse live zu verfolgen und Ticketkarten aufzuladen.",
        playstore: "Google Play Store",
        appstore: "App Store",
        moovit_title: "Moovit & MUTTAŞ im Web",
        moovit_desc: "Verwenden Sie Moovit Muğla im Browser für Routenkarten und den Fahrplan von MUTTAŞ.",
        moovit_btn: "Moovit Muğla öffnen",
        muttas_btn: "MUTTAŞ Website",
        obilet_title: "Fernbus-Tickets (Obilet)",
        obilet_desc: "Für Fahrten in andere Städte der Türkei nutzen Sie die Plattform obilet.com.",
        obilet_btn: "Tickets auf Obilet suchen"
      },
      taxi: {
        title: "Taxis & Private Transfers",
        desc: "Alle offiziellen Taxis sind gelb und fahren mit Taxameter. Private VIP-Transfers sind oft günstiger bei Festpreisen.",
        calc_title: "Intelligenter Taxi-Rechner",
        calc_desc: "Berechnen Sie Taxitarife basierend auf Live-Wechselkursen. Vergleicht UKOME-Taxameter mit Festpreisen.",
        destination_label: "Zielort",
        currency_label: "Währung",
        vehicle_label: "Fahrzeugklasse",
        vehicle_standard: "Standard-Limousine (Gelbes Taxi)",
        vehicle_vip: "VIP Vito Minivan / Privater Transfer",
        calc_result_dist: "Entfernung:",
        calc_result_time: "Fahrzeit:",
        calc_result_meter: "UKOME-Taxameter Schätzung:",
        calc_result_fixed: "Kooperativer Festpreis:",
        calc_result_best: "Empfehlung:",
        calc_notes_title: "Offizielle UKOME Muğla Tarife (2026)",
        calc_notes_desc: "Grundpreis: 40 ₺. Kilometerpreis: 30 ₺. Mindestpreis: 100 ₺. Taxis am Flughafen verlangen oft Festpreise in Euro.",
        ad_driver_title: "Empfohlener Fahrer",
        ad_driver_desc: "Offizieller Taxifahrer, spricht Englisch/Russisch, Mercedes Vito VIP Minivan.",
        ad_driver_name: "Ahmet Yilmaz (Flughafentaxi)",
        ad_driver_whatsapp: "Über WhatsApp schreiben",
        ad_driver_call: "Anrufen",
        ad_transfer_title: "VIP-Transfer buchen",
        ad_transfer_desc: "Privater Transfer mit Namensschild in der Ankunftshalle. Feste Preise.",
        ad_transfer_btn: "Online buchen",
        taxi_board_title: "Offizielle Taxipreise-Tafel",
        taxi_board_desc: "Preise, die auf den großen Tafeln am Ausgang des Flughafens Dalaman angezeigt werden:"
      },
      rentals: {
        title: "Mietwagen & Rollervermietung",
        desc: "Ein Mietwagen gibt Ihnen die Freiheit, einsame Buchten und antike Städte unabhängig zu erkunden.",
        airport_rental_title: "Mietwagenschalter am Flughafen",
        airport_rental_desc: "Große internationale Anbieter und lokale Agenturen haben Schalter in der Ankunftshalle.",
        docs_title: "Mietbedingungen",
        doc1: "Gültiger Führerschein (seit mindestens 1-2 Jahren).",
        doc2: "Internationaler Führerschein, falls nicht in lateinischer Schrift.",
        doc3: "Kreditkarte auf den Namen des Fahrers für die Kaution.",
        scooter_title: "Roller- und ATV-Verleih",
        scooter_desc: "Für Fahrten in den Küstenstädten ist ein Roller (125cc) ideal, um Staus zu umgehen. Helmpflicht!"
      },
      ferries: {
        title: "Dolmuş & Fährverbindungen",
        desc: "Nutzen Sie Dolmuş-Busse für lokale Strände oder Fähren zu den griechischen Inseln.",
        dolmus_title: "Dolmuş-Minibusse",
        dolmus_desc: "Dolmuşse fahren alle 10-20 Minuten vom Stadtzentrum zu Stränden und Ruinen.",
        dolmus_tips: "Dolmuş-Tipps für Reisende",
        tip1: "Geben Sie Handzeichen, um den Bus an der Straße anzuhalten.",
        tip2: "Reichen Sie das Fahrgeld nach vorne durch, wenn Sie hinten sitzen.",
        tip3: "Zum Aussteigen rufen Sie laut: 'İnecek var!' (Es gibt einen Aussteiger).",
        ferries_title: "Fährverbindungen & Anleger",
        ferries_desc: "Katamarane und Autofähren verbinden die Küste mit Rhodos, Kos und Bodrum.",
        port_gps: "Hafenkoordinaten für Navigation",
        gps_btn: "In Google Maps öffnen",
        ferry_schedule_btn: "Fahrpläne und Tickets"
      }
    },
    common: {
      gps_label: "Otogar GPS-Koordinaten",
      km: "km",
      mins: "Min.",
      currency: "Währung",
      standard: "Standard",
      vip: "VIP Vito",
      meter_compare: "Der Taxameterpreis wird nach dem UKOME-Tarif berechnet. Für lange Strecken ist ein VIP-Transfer komfortabler.",
      exchange_info: "Wechselkurse live aktualisiert."
    }
  },
  tr: {
    title: "ULAŞIM REHBERİ",
    subtitle: "Muğla bölgesindeki yerel otobüsler, taksiler, araç kiralama, dolmuşlar ve feribot seferleri hakkında güncel bilgiler.",
    tabs: {
      buses: "Otobüs & Servisler",
      taxi: "Taksi & Ücret Hesaplama",
      rentals: "Araç & Motor Kiralama",
      ferries: "Dolmuş & Feribotlar"
    },
    sections: {
      buses: {
        title: "Havaş & Muttaş Havalimanı Servisleri",
        desc: "Dalaman Havalimanı ile turistik merkezler arasında 24 saat hizmet veren konforlu servisler.",
        sync_title: "Uçuş Saatleri ile Uyum",
        sync_desc: "Önemli: Servisler iç hat uçuşlarına göre (Pegasus, AJet, Türk Hava Yolları) ayarlanır. Rötar durumlarında otobüsler yolcuları bekler.",
        routes_title: "Önemli Güzergahlar & Otogarlar",
        routes_desc: "Servisler gelen yolcu terminal çıkışından kalkar:",
        fethiye_route: "Dalaman Havalimanı → Göcek → Fethiye Otogarı",
        marmaris_route: "Dalaman Havalimanı → Ortaca → Marmaris Otogarı",
        payment_title: "Ücretler & Ödeme",
        payment_desc: "Ücretler 120 ₺ ile 200 ₺ arasındadır. Ödeme otobüse binerken nakit veya kredi kartı ile yapılabilir.",
        apps_title: "MuğlaApp Mobil Takip",
        apps_desc: "Otobüsleri haritada canlı izlemek ve kartınıza bakiye yüklemek için MuğlaApp uygulamasını indirin.",
        playstore: "Google Play Store",
        appstore: "App Store",
        moovit_title: "Moovit Web & MUTTAŞ Seferleri",
        moovit_desc: "Moovit Muğla web portalı veya MUTTAŞ resmi sitesini kullanarak bilgisayarınızdan güzergahları planlayabilirsiniz.",
        moovit_btn: "Moovit Muğla'yı Aç",
        muttas_btn: "MUTTAŞ Web Sitesi",
        obilet_title: "Şehirlerarası Otobüs Biletleri (Obilet)",
        obilet_desc: "Diğer şehirlere (Antalya, İstanbul, İzmir, Bodrum) otobüs biletleri için obilet.com sitesini kullanabilirsiniz.",
        obilet_btn: "Obilet'te Bilet Ara"
      },
      taxi: {
        title: "Taksi & Özel Transferler",
        desc: "Muğla'daki tüm resmi taksiler sarıdır ve taksimetre ile çalışır. Uzun mesafelerde VIP transferler de tercih edilmektedir.",
        calc_title: "Akıllı Taksi Ücreti Hesaplama",
        calc_desc: "Anlık döviz kurlarını çekerek taksimetre ile havalimanı kooperatif fiyatlarını karşılaştıran akıllı hesaplayıcı.",
        destination_label: "Gidilecek Yer",
        currency_label: "Para Birimi",
        vehicle_label: "Araç Sınıfı",
        vehicle_standard: "Standart Taksi (Sarı)",
        vehicle_vip: "VIP Vito / Özel Transfer",
        calc_result_dist: "Mesafe:",
        calc_result_time: "Yolculuk Süresi:",
        calc_result_meter: "UKOME Taksimetre Tahmini:",
        calc_result_fixed: "Kooperatif Sabit Fiyatı:",
        calc_result_best: "Önerilen Seçenek:",
        calc_notes_title: "Muğla UKOME Taksi Tarifesi (2026)",
        calc_notes_desc: "Taksimetre açılış: 40 ₺. Km ücreti: 30 ₺. İndi-bindi ücreti: 100 ₺. Havalimanı taksileri uzun mesafeler için genellikle Euro bazlı sabit fiyat tarifesi sunar.",
        ad_driver_title: "Önerilen Yerel Şoför",
        ad_driver_desc: "Havalimanı taksi kooperatifi üyesi, temiz araçlar, Rusça/İngilizce bilen şoför, VIP Vito.",
        ad_driver_name: "Ahmet Yılmaz (Havalimanı Taksi)",
        ad_driver_whatsapp: "WhatsApp'tan Yaz",
        ad_driver_call: "Şoförü Ara",
        ad_transfer_title: "Sabit Fiyatlı VIP Transfer Boku",
        ad_transfer_desc: "Gelen yolcu kapısında isimle karşılama, sabit fiyat, uçuş takip desteği.",
        ad_transfer_btn: "İnternetten Rezervasyon Yap",
        taxi_board_title: "Resmi Havalimanı Taksi Fiyat Tarifesi",
        taxi_board_desc: "Dalaman Havalimanı gelen yolcu çıkışındaki büyük fiyat tabelalarında ilan edilen standart kooperatif ücretleri:"
      },
      rentals: {
        title: "Araç, Motor ve ATV Kiralama",
        desc: "Dalaman Havalimanı'ndan araç kiralayarak gizli koyları ve antik kentleri özgürce keşfedin.",
        airport_rental_title: "Havalimanı Araç Kiralama Ofisleri",
        airport_rental_desc: "Uluslararası ve yerel kiralama firmalarının gelen yolcu salonunda ofisleri bulunmaktadır.",
        docs_title: "Kiralama Şartları",
        doc1: "En az 1-2 yıllık geçerli sürücü belgesi.",
        doc2: "Sürücü adına düzenlenmiş kredi kartı (depozito için).",
        doc3: "Latin alfabesi dışındaki ehliyetler için uluslararası sürücü belgesi.",
        scooter_title: "Motosiklet & ATV Kiralama",
        scooter_desc: "Bölgedeki trafikten kaçınmak için scooter (125cc) veya ATV kiralamak harika bir alternatiftir. Kask takmak zorunludur."
      },
      ferries: {
        title: "Dolmuş & Feribot Hatları",
        desc: "Çevre plajlara gitmek için dolmuşları, Yunan adalarına gitmek için feribotları kullanabilirsiniz.",
        dolmus_title: "Yerel Dolmuş Hatları",
        dolmus_desc: "Dolmuşlar şehir merkezlerinden plajlara ve antik kentlere her 10-20 dakikada bir kalkar.",
        dolmus_tips: "Dolmuş Kullanım İpuçları",
        tip1: "Yolda durdurmak için el sallamanız yeterlidir.",
        tip2: "Arkada oturuyorsanız ücreti öndeki yolcular vasıtasıyla şoföre iletebilirsiniz.",
        tip3: "İneceğiniz zaman şoföre yüksek sesle 'İnecek var!' demelisiniz.",
        ferries_title: "Feribot Seferleri & Limanlar",
        ferries_desc: "Hızlı katamaranlar ve arabalı feribotlar sahil şeridini Yunan adalarına ve karşı limanlara bağlar.",
        port_gps: "Liman GPS Konumu",
        gps_btn: "Google Haritalarda Aç",
        ferry_schedule_btn: "Seferleri Sorgula & Bilet Al"
      }
    },
    common: {
      gps_label: "Otogar GPS Konumu",
      km: "km",
      mins: "dk",
      currency: "Para Birimi",
      standard: "Standart",
      vip: "VIP Vito",
      meter_compare: "Taksimetre fiyatı UKOME tarifesine göre hesaplanır. Uzun mesafelerde VIP transferler sabit fiyat güvencesi sunar.",
      exchange_info: "Döviz kurları canlı olarak güncellendi."
    }
  }
};

const TransportClient = ({ locale }: TransportClientProps) => {
  const t = clientTranslations[locale] || clientTranslations['en'];
  const [activeTab, setActiveTab] = useState<'buses' | 'taxi' | 'rentals' | 'ferries'>('buses');
  
  // Calculator state
  const [calcDest, setCalcDest] = useState(TAXI_DESTINATIONS[4].id); // Default to Fethiye
  const [calcCurrency, setCalcCurrency] = useState('EUR');
  const [calcVehicle, setCalcVehicle] = useState<'standard' | 'vip'>('standard');
  
  // Live exchange rates state
  const [rates, setRates] = useState<Record<string, number>>({
    TRY: 1,
    EUR: 0.028,
    USD: 0.031,
    GBP: 0.024
  });
  const [ratesLoaded, setRatesLoaded] = useState(false);

  // Fetch exchange rates from TRY base
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/TRY')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          // Verify we have EUR, USD, GBP, TRY
          const r = data.rates;
          setRates({
            TRY: 1,
            EUR: r.EUR || 0.028,
            USD: r.USD || 0.031,
            GBP: r.GBP || 0.024
          });
          setRatesLoaded(true);
        }
      })
      .catch(err => {
        console.error('Failed to fetch live exchange rates:', err);
      });
  }, []);

  // Calculate pricing based on UKOME formula
  const currentDest = TAXI_DESTINATIONS.find(d => d.id === calcDest) || TAXI_DESTINATIONS[4];
  
  // Calculate UKOME Meter TRY with realistic airport short-trip threshold (AIRPORT_MIN_REALITY_TRY)
  const meterPriceTry = Math.max(
    currentDest.distanceKm <= 12 ? (UKOME_TAXI_RATES.AIRPORT_MIN_REALITY_TRY || 480) : UKOME_TAXI_RATES.MIN_FARE_TRY,
    UKOME_TAXI_RATES.OPENING_TRY + (currentDest.distanceKm * UKOME_TAXI_RATES.RATE_PER_KM_TRY)
  );

  // Function to convert TRY to active currency
  const convertTryToSelected = (priceTry: number, currency: string) => {
    const rate = rates[currency] || 1;
    return priceTry * rate;
  };

  // Function to convert EUR fixed to active currency
  const convertEurToSelected = (priceEur: number, currency: string) => {
    // first convert EUR to TRY: priceEur / rates.EUR
    const priceTry = priceEur / rates.EUR;
    // then convert TRY to currency
    return convertTryToSelected(priceTry, currency);
  };

  // Set visual prices
  const selectedMeter = convertTryToSelected(meterPriceTry, calcCurrency);
  
  // VIP Vito flat rate is roughly 1.3x standard cooperative fixed rate
  const rawFixedEur = calcVehicle === 'standard' ? currentDest.fixedEur : Math.round(currentDest.fixedEur * 1.3);
  const selectedFixed = convertEurToSelected(rawFixedEur, calcCurrency);

  const formatCurrency = (val: number, curr: string) => {
    const symbolMap: Record<string, string> = {
      EUR: '€',
      USD: '$',
      GBP: '£',
      TRY: '₺'
    };
    const symbol = symbolMap[curr] || curr;
    return `${symbol}${val.toFixed(0)}`;
  };

  const getGpsLink = (coords: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${coords}`;
  };

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-br from-cyan-900 via-slate-900 to-blue-950 text-white py-16 overflow-hidden rounded-[2.5rem] mb-8 shadow-lg">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay opacity-30 brightness-[0.3]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] mb-4 inline-block">
            {locale === 'ru' ? 'Справочник путешественника' : 'TRAVELER REFERENCE'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Main Tabbed Layout Container */}
      <div className="w-full pb-20">
        
        {/* Navigation Pills */}
        <div className="bg-white rounded-[2rem] p-3 premium-shadow border border-slate-100 flex flex-wrap md:flex-nowrap gap-2 mb-10">
          <button
            onClick={() => setActiveTab('buses')}
            className={`flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
              activeTab === 'buses' 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FaBus size={18} />
            <span className="hidden sm:inline">{t.tabs.buses}</span>
          </button>
          <button
            onClick={() => setActiveTab('taxi')}
            className={`flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
              activeTab === 'taxi' 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FaTaxi size={18} />
            <span className="hidden sm:inline">{t.tabs.taxi}</span>
          </button>
          <button
            onClick={() => setActiveTab('rentals')}
            className={`flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
              activeTab === 'rentals' 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FaCar size={18} />
            <span className="hidden sm:inline">{t.tabs.rentals}</span>
          </button>
          <button
            onClick={() => setActiveTab('ferries')}
            className={`flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
              activeTab === 'ferries' 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FaShip size={18} />
            <span className="hidden sm:inline">{t.tabs.ferries}</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="space-y-12">
          
          {/* BUSES SECTION */}
          {activeTab === 'buses' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Shuttles Guide */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
                  <div className="flex items-center gap-4 text-cyan-600">
                    <FaBus size={32} />
                    <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-slate-800">
                      {t.sections.buses.title}
                    </h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.sections.buses.desc}
                  </p>

                  <div className="bg-amber-50/60 border border-amber-100 rounded-[1.5rem] p-6 space-y-2 flex gap-4">
                    <div className="text-amber-500 mt-1 flex-shrink-0">
                      <FaInfoCircle size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide">
                        {t.sections.buses.sync_title}
                      </h4>
                      <p className="text-amber-800/90 text-sm leading-relaxed">
                        {t.sections.buses.sync_desc}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-black text-sm uppercase tracking-widest text-slate-700 italic border-b border-slate-100 pb-2">
                      {t.sections.buses.routes_title}
                    </h3>
                    <p className="text-slate-500 text-xs">{t.sections.buses.routes_desc}</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xs font-bold mt-1 flex-shrink-0">1</div>
                        <p className="text-slate-700 text-sm font-semibold">{t.sections.buses.fethiye_route}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xs font-bold mt-1 flex-shrink-0">2</div>
                        <p className="text-slate-700 text-sm font-semibold">{t.sections.buses.marmaris_route}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-black text-sm uppercase tracking-widest text-slate-700 italic border-b border-slate-100 pb-2">
                      {t.sections.buses.payment_title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t.sections.buses.payment_desc}
                    </p>
                  </div>
                </div>

                {/* Terminals list with coordinates */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
                  <h3 className="font-black text-lg uppercase tracking-wide text-slate-800 italic">
                    {locale === 'ru' ? 'Автовокзалы региона (Otogar)' : 'Regional Bus Stations (Otogar)'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TAXI_DESTINATIONS.filter(d => d.otogarGps).map(dest => (
                      <div key={dest.id} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{dest.name[locale] || dest.name.en}</h4>
                          <p className="text-slate-400 text-[10px] mt-0.5">{dest.otogarName[locale] || dest.otogarName.en}</p>
                        </div>
                        <Link 
                          href={getGpsLink(dest.otogarGps)}
                          target="_blank"
                          className="px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-cyan-700 transition-colors"
                        >
                          <FaMapMarkerAlt size={10} />
                          <span>Map</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Apps & Online bookings */}
              <div className="space-y-8">
                {/* MuğlaApp Card */}
                <div className="bg-gradient-to-br from-slate-900 to-cyan-950 text-white rounded-[2.5rem] p-8 premium-shadow border border-slate-800 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <FaMobileAlt size={28} />
                    <h3 className="font-black text-lg uppercase tracking-wide italic">MuğlaApp</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t.sections.buses.apps_desc}
                  </p>
                  
                  <div className="space-y-3 pt-4">
                    <Link 
                      href="https://play.google.com/store/apps/details?id=kentkart.mobile.muglakentkart" 
                      target="_blank"
                      className="flex items-center justify-center gap-3 py-3 px-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl font-bold text-xs uppercase tracking-wide border border-slate-700"
                    >
                      <FaGooglePlay size={16} />
                      <span>{t.sections.buses.playstore}</span>
                    </Link>
                    <Link 
                      href="https://apps.apple.com/tr/app/mu%C4%9Fla-kart/id1220772502" 
                      target="_blank"
                      className="flex items-center justify-center gap-3 py-3 px-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl font-bold text-xs uppercase tracking-wide border border-slate-700"
                    >
                      <FaApple size={18} />
                      <span>{t.sections.buses.appstore}</span>
                    </Link>
                  </div>
                </div>

                {/* Moovit Web Portal Card */}
                <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-6">
                  <div className="flex items-center gap-3 text-orange-500">
                    <FaExchangeAlt size={24} />
                    <h3 className="font-black text-base uppercase tracking-wide text-slate-800 italic">Moovit & MUTTAŞ Web</h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {t.sections.buses.moovit_desc}
                  </p>
                  <div className="space-y-3">
                    <Link 
                      href="https://moovitapp.com/index/tr/toplu_ta%C5%9F%C4%B1ma-Mugla-5984" 
                      target="_blank"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-sm"
                    >
                      <span>{t.sections.buses.moovit_btn}</span>
                      <FaExternalLinkAlt size={10} />
                    </Link>
                    <Link 
                      href="https://muttas.com.tr" 
                      target="_blank"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                    >
                      <span>{t.sections.buses.muttas_btn}</span>
                      <FaExternalLinkAlt size={10} />
                    </Link>
                  </div>
                </div>

                {/* Intercity ticket reservation (Obilet) */}
                <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-600">
                    <FaTicketAlt size={22} />
                    <h3 className="font-black text-base uppercase tracking-wide text-slate-800 italic">Obilet Tickets</h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {t.sections.buses.obilet_desc}
                  </p>
                  <Link 
                    href="https://www.obilet.com" 
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-cyan-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-700 transition-colors shadow-sm w-full"
                  >
                    <span>{t.sections.buses.obilet_btn}</span>
                    <FaExternalLinkAlt size={10} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAXI SECTION */}
          {activeTab === 'taxi' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Estimator & Notes */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Dynamic Taxi Calculator */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
                  <div className="flex items-center gap-4 text-cyan-600">
                    <FaCalculator size={30} />
                    <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-slate-800">
                      {t.sections.taxi.calc_title}
                    </h2>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {t.sections.taxi.calc_desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {/* Destination Select */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wide text-slate-500">
                        {t.sections.taxi.destination_label}
                      </label>
                      <select 
                        value={calcDest}
                        onChange={(e) => setCalcDest(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      >
                        {TAXI_DESTINATIONS.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name[locale] || d.name.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Currency Select */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wide text-slate-500">
                        {t.sections.taxi.currency_label}
                      </label>
                      <select 
                        value={calcCurrency}
                        onChange={(e) => setCalcCurrency(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      >
                        <option value="TRY">TRY (₺)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>

                    {/* Vehicle Select */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wide text-slate-500">
                        {t.sections.taxi.vehicle_label}
                      </label>
                      <div className="flex bg-slate-50 border border-slate-100 rounded-xl p-1">
                        <button
                          onClick={() => setCalcVehicle('standard')}
                          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
                            calcVehicle === 'standard' 
                              ? 'bg-white text-slate-800 shadow-sm' 
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {t.common.standard}
                        </button>
                        <button
                          onClick={() => setCalcVehicle('vip')}
                          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
                            calcVehicle === 'vip' 
                              ? 'bg-white text-slate-800 shadow-sm' 
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {t.common.vip}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calculations Result Block */}
                  <div className="bg-slate-900 text-white rounded-[2rem] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
                    <div className="space-y-4 relative z-10">
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                          {t.sections.taxi.calc_result_dist}
                        </span>
                        <span className="text-2xl font-black italic">{currentDest.distanceKm} {t.common.km}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                          {t.sections.taxi.calc_result_time}
                        </span>
                        <span className="text-2xl font-black italic">~{currentDest.durationMin} {t.common.mins}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 relative z-10 border-t md:border-t-0 md:border-l border-slate-800 md:pl-6 pt-4 md:pt-0">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          {t.sections.taxi.calc_result_meter}
                        </span>
                        <span className="text-xl font-bold text-slate-300">
                          {formatCurrency(selectedMeter, calcCurrency)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                          <FaCheckCircle size={10} />
                          {t.sections.taxi.calc_result_fixed}
                        </span>
                        <span className="text-3xl font-black text-cyan-400">
                          {formatCurrency(selectedFixed, calcCurrency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {ratesLoaded && (
                    <p className="text-[10px] text-slate-400 italic text-center">
                      ✓ {t.common.exchange_info} (1 EUR = {(1/rates.EUR).toFixed(1)} ₺)
                    </p>
                  )}

                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    💡 *{t.common.meter_compare}*
                  </p>
                </div>

                {/* UKOME rules info block */}
                <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-4">
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-700 italic border-b border-slate-100 pb-2 flex items-center gap-2">
                    <FaInfoCircle className="text-cyan-500" />
                    {t.sections.taxi.calc_notes_title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.sections.taxi.calc_notes_desc}
                  </p>
                </div>

                {/* Cooperative prices table mockup */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
                  <div>
                    <h3 className="font-black text-lg uppercase tracking-wide text-slate-800 italic">
                      {t.sections.taxi.taxi_board_title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      {t.sections.taxi.taxi_board_desc}
                    </p>
                  </div>

                  {/* Pricing table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider border-b border-slate-100">
                          <th className="py-4 px-6">{locale === 'ru' ? 'Направление' : 'Destination'}</th>
                          <th className="py-4 px-6 text-center">{locale === 'ru' ? 'Расстояние' : 'Distance'}</th>
                          <th className="py-4 px-6 text-center">{locale === 'ru' ? 'Время' : 'Duration'}</th>
                          <th className="py-4 px-6 text-right">{locale === 'ru' ? 'Стандарт (Sedan)' : 'Standard'}</th>
                          <th className="py-4 px-6 text-right">{locale === 'ru' ? 'VIP Vito' : 'VIP Vito'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                        {TAXI_DESTINATIONS.map(d => (
                          <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 font-bold text-slate-900">{d.name[locale] || d.name.en}</td>
                            <td className="py-4 px-6 text-center text-slate-500">{d.distanceKm} {t.common.km}</td>
                            <td className="py-4 px-6 text-center text-slate-500">~{d.durationMin} {t.common.mins}</td>
                            <td className="py-4 px-6 text-right text-cyan-600 font-bold">€{d.fixedEur}</td>
                            <td className="py-4 px-6 text-right text-slate-900 font-bold">€{Math.round(d.fixedEur * 1.3)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Photo Taxi Board placeholder */}
                  <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center bg-slate-50/40">
                    <p className="text-slate-400 text-xs italic">
                      {locale === 'ru' 
                        ? '[Здесь будет реальное фото стенда с тарифами из аэропорта Даламан]' 
                        : '[Here will be the actual photo of the Dalaman Airport taxi stand board]'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Promo & Booking Advertisements */}
              <div className="space-y-8">
                
                {/* Taxi Driver Promotion Card */}
                <div className="bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950 text-white rounded-[2.5rem] p-8 premium-shadow border border-slate-800 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                  
                  <div className="flex items-center gap-3 text-cyan-400">
                    <FaTaxi size={24} />
                    <h3 className="font-black text-base uppercase tracking-wide italic">
                      {t.sections.taxi.ad_driver_title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {/* Driver Avatar placeholder */}
                      <div className="w-16 h-16 rounded-full bg-cyan-600/20 border border-cyan-500 flex items-center justify-center text-2xl font-black text-cyan-400">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-base">{t.sections.taxi.ad_driver_name}</h4>
                        <div className="flex text-amber-400 text-xs gap-0.5 mt-1">★ ★ ★ ★ ★ <span className="text-slate-400 ml-1">(4.9/5)</span></div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      {t.sections.taxi.ad_driver_desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link 
                      href="https://wa.me/905321234567" 
                      target="_blank"
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-xl font-bold text-xs uppercase tracking-widest"
                    >
                      <FaWhatsapp size={16} />
                      <span>{t.sections.taxi.ad_driver_whatsapp}</span>
                    </Link>
                    <Link 
                      href="tel:+905321234567" 
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-700"
                    >
                      <FaPhoneAlt size={12} />
                      <span>{t.sections.taxi.ad_driver_call}</span>
                    </Link>
                  </div>
                </div>

                {/* VIP Transfers Promotion Card */}
                <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-6">
                  <div className="flex items-center gap-3 text-cyan-600">
                    <FaCheckCircle size={22} />
                    <h3 className="font-black text-base uppercase tracking-wide text-slate-800 italic">
                      {t.sections.taxi.ad_transfer_title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {t.sections.taxi.ad_transfer_desc}
                  </p>
                  
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs text-slate-600 font-bold">
                    <div className="flex justify-between"><span>Dalaman → Fethiye:</span> <span className="text-cyan-600">€55</span></div>
                    <div className="flex justify-between"><span>Dalaman → Göcek:</span> <span className="text-cyan-600">€35</span></div>
                    <div className="flex justify-between"><span>Dalaman → Marmaris:</span> <span className="text-cyan-600">€70</span></div>
                  </div>

                  <Link 
                    href={`/${locale}/services/transfers`}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-cyan-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-700 transition-colors shadow-sm w-full"
                  >
                    <span>{t.sections.taxi.ad_transfer_btn}</span>
                  </Link>
                </div>

              </div>

            </div>
          )}

          {/* RENTALS SECTION */}
          {activeTab === 'rentals' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Guides */}
              <div className="lg:col-span-2 space-y-8">
                {/* Car rentals desk */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
                  <div className="flex items-center gap-4 text-cyan-600">
                    <FaCar size={32} />
                    <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-slate-800">
                      {t.sections.rentals.airport_rental_title}
                    </h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t.sections.rentals.airport_rental_desc}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    {['Avis', 'Enterprise', 'Europcar', 'Hertz', 'Sixt', 'Goldcar'].map(brand => (
                      <div key={brand} className="border border-slate-100 rounded-xl p-3 text-center text-sm font-black uppercase tracking-wide text-slate-500 bg-slate-50/50">
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scooter and ATV rentals */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
                  <h3 className="font-black text-xl text-slate-800 italic uppercase">
                    {t.sections.rentals.scooter_title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t.sections.rentals.scooter_desc}
                  </p>
                </div>
              </div>

              {/* Right Column: Requirements Checklist */}
              <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-6">
                <h3 className="font-black text-lg uppercase tracking-wide text-slate-800 italic">
                  {t.sections.rentals.docs_title}
                </h3>
                <div className="space-y-4">
                  {[t.sections.rentals.doc1, t.sections.rentals.doc2, t.sections.rentals.doc3].map((doc, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="text-cyan-600 mt-1 flex-shrink-0">
                        <FaCheckCircle size={16} />
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-semibold">{doc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FERRIES SECTION */}
          {activeTab === 'ferries' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Dolmuş & Ferries descriptions */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Local Dolmus minibuses */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
                  <div className="flex items-center gap-4 text-cyan-600">
                    <FaBus size={32} />
                    <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-slate-800">
                      {t.sections.ferries.dolmus_title}
                    </h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t.sections.ferries.dolmus_desc}
                  </p>

                  <div className="bg-slate-50 rounded-[1.5rem] p-6 space-y-4">
                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-700 italic border-b border-slate-200 pb-2">
                      {t.sections.ferries.dolmus_tips}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xs font-bold mt-0.5 flex-shrink-0">1</div>
                        <p className="text-slate-600 text-xs font-semibold leading-relaxed">{t.sections.ferries.tip1}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xs font-bold mt-0.5 flex-shrink-0">2</div>
                        <p className="text-slate-600 text-xs font-semibold leading-relaxed">{t.sections.ferries.tip2}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xs font-bold mt-0.5 flex-shrink-0">3</div>
                        <p className="text-slate-600 text-xs font-semibold leading-relaxed">{t.sections.ferries.tip3}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ferry Routes List */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-8">
                  <div>
                    <h3 className="font-black text-2xl text-slate-800 italic uppercase">
                      {t.sections.ferries.ferries_title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      {t.sections.ferries.ferries_desc}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {FERRY_ROUTES.map(route => (
                      <div key={route.id} className="border border-slate-100 rounded-[2rem] p-6 hover:border-slate-200 transition-colors space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="font-black text-lg text-slate-900">{route.from[locale] || route.from.en}</span>
                            <span className="text-slate-400">→</span>
                            <span className="font-black text-lg text-cyan-600">{route.to[locale] || route.to.en}</span>
                          </div>
                          <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest text-center self-start sm:self-center">
                            ⏱ {route.typicalDuration}
                          </span>
                        </div>

                        <p className="text-slate-400 text-xs font-bold flex items-center gap-2">
                          <FaMapMarkerAlt />
                          <span>{route.portName[locale] || route.portName.en}</span>
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Link 
                            href={getGpsLink(route.gps)}
                            target="_blank"
                            className="py-2 px-4 bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-cyan-700 transition-colors"
                          >
                            <FaMapMarkerAlt size={10} />
                            <span>{t.sections.ferries.port_gps}</span>
                          </Link>
                          <Link 
                            href={route.scheduleLink}
                            target="_blank"
                            className="py-2 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                          >
                            <span>{t.sections.ferries.ferry_schedule_btn}</span>
                            <FaExternalLinkAlt size={10} className="ml-1 inline" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Visual information */}
              <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-6">
                <h3 className="font-black text-lg uppercase tracking-wide text-slate-800 italic">
                  {locale === 'ru' ? 'Информация о паромах' : 'Ferry Information'}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {locale === 'ru' 
                    ? 'Международные паромы до греческих островов (Родос, Кос) курсируют в основном в сезон с мая по октябрь. Для поездки гражданам РФ требуется действующая шенгенская виза или временная островная виза (если доступна программа упрощенного въезда). Прибывайте в порты отправления минимум за 1 час до отплытия для прохождения таможенного контроля.'
                    : 'International ferries to Greek islands (Rhodes, Kos) run mostly during the high season from May to October. For this trip, non-EU passport holders usually require a Schengen visa. Please arrive at the ports at least 1 hour before departure for custom clearance procedures.'}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default TransportClient;
