"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPlane, 
  FaPlaneArrival, 
  FaPlaneDeparture, 
  FaSearch, 
  FaExternalLinkAlt, 
  FaInfoCircle, 
  FaLuggageCart,
  FaMapMarkerAlt,
  FaArrowRight,
  FaVideo,
  FaRegBuilding,
  FaSuitcase
} from 'react-icons/fa';

interface AirportClientProps {
  locale: string;
}

// Mock flight data that updates statuses or displays realistic details
interface FlightInfo {
  id: string;
  flightNo: string;
  airline: string;
  destination: string;
  time: string;
  status: 'Landed' | 'On Time' | 'Delayed' | 'Departed' | 'Boarding';
  statusRu: 'Приземлился' | 'По расписанию' | 'Задерживается' | 'Вылетел' | 'Посадка';
}

const ARRIVALS: FlightInfo[] = [
  { id: '1', flightNo: 'TK 2510', airline: 'Turkish Airlines', destination: 'Istanbul (IST)', time: '09:40', status: 'Landed', statusRu: 'Приземлился' },
  { id: '2', flightNo: 'PC 2280', airline: 'Pegasus Airlines', destination: 'Istanbul (SAW)', time: '10:15', status: 'Landed', statusRu: 'Приземлился' },
  { id: '3', flightNo: 'VF 3114', airline: 'AJet', destination: 'Ankara (ESB)', time: '11:05', status: 'On Time', statusRu: 'По расписанию' },
  { id: '4', flightNo: 'XQ 822', airline: 'SunExpress', destination: 'Munich (MUC)', time: '12:30', status: 'On Time', statusRu: 'По расписанию' },
  { id: '5', flightNo: 'EZY 8541', airline: 'EasyJet', destination: 'London (LGW)', time: '13:10', status: 'Delayed', statusRu: 'Задерживается' },
  { id: '6', flightNo: 'LS 1243', airline: 'Jet2', destination: 'Manchester (MAN)', time: '14:25', status: 'On Time', statusRu: 'По расписанию' },
  { id: '7', flightNo: 'BY 562', airline: 'TUI Airways', destination: 'Birmingham (BHX)', time: '15:00', status: 'On Time', statusRu: 'По расписанию' },
  { id: '8', flightNo: 'SU 2132', airline: 'Aeroflot', destination: 'Moscow (SVO)', time: '15:45', status: 'On Time', statusRu: 'По расписанию' }
];

const DEPARTURES: FlightInfo[] = [
  { id: '1', flightNo: 'TK 2511', airline: 'Turkish Airlines', destination: 'Istanbul (IST)', time: '10:30', status: 'Departed', statusRu: 'Вылетел' },
  { id: '2', flightNo: 'PC 2281', airline: 'Pegasus Airlines', destination: 'Istanbul (SAW)', time: '11:00', status: 'Departed', statusRu: 'Вылетел' },
  { id: '3', flightNo: 'VF 3115', airline: 'AJet', destination: 'Ankara (ESB)', time: '11:50', status: 'Boarding', statusRu: 'Посадка' },
  { id: '4', flightNo: 'XQ 823', airline: 'SunExpress', destination: 'Munich (MUC)', time: '13:20', status: 'On Time', statusRu: 'По расписанию' },
  { id: '5', flightNo: 'EZY 8542', airline: 'EasyJet', destination: 'London (LGW)', time: '14:00', status: 'On Time', statusRu: 'По расписанию' },
  { id: '6', flightNo: 'LS 1244', airline: 'Jet2', destination: 'Manchester (MAN)', time: '15:15', status: 'On Time', statusRu: 'По расписанию' },
  { id: '7', flightNo: 'BY 563', airline: 'TUI Airways', destination: 'Birmingham (BHX)', time: '16:00', status: 'On Time', statusRu: 'По расписанию' },
  { id: '8', flightNo: 'SU 2133', airline: 'Aeroflot', destination: 'Moscow (SVO)', time: '16:50', status: 'On Time', statusRu: 'По расписанию' }
];

const clientTranslations: Record<string, any> = {
  en: {
    title: "DALAMAN AIRPORT (DLM)",
    subtitle: "Complete passenger guide to Dalaman International Airport: flight status, terminal maps, services, and transfers.",
    tabs: {
      arrivals: "Arrivals",
      departures: "Departures"
    },
    search_placeholder: "Filter flights by number, destination, or airline...",
    official_board_btn: "Official YDA Flight Board",
    webcams_title: "Live Webcams & Weather Monitoring",
    webcams_desc: "Due to national aviation safety regulations, Dalaman Airport does not share live public cameras of runways or terminal interiors. However, you can monitor live weather and crowds in nearby resorts or check live flight paths:",
    webcams_flightradar: "Track Flights Live on Flightradar24",
    webcams_fethiye: "Live Webcam: Fethiye Marina",
    webcams_oludeniz: "Live Webcam: Ölüdeniz Beach",
    webcams_marmaris: "Live Webcam: Marmaris Port",
    terminals_title: "Terminals & Navigation",
    terminals_desc: "Dalaman Airport consists of two passenger terminals located adjacent to each other:",
    terminal_2_title: "Terminal 2 (International)",
    terminal_2_desc: "Opened in 2018, this state-of-the-art terminal handles all international flights. It features four levels, spacious security zones, extensive duty-free halls, VIP lounges, and multiple cafes.",
    terminal_1_title: "Terminal 1 (Domestic)",
    terminal_1_desc: "This terminal handles all domestic routes within Turkey (mostly flights to Istanbul and Ankara). It is smaller and easy to navigate. Shuttles to Fethiye/Marmaris depart from right outside.",
    airlines_title: "Major Airlines & Flight Connections",
    airlines_desc: "Dalaman links over 120 destinations worldwide, particularly serving European and Russian holidaymakers. Low-cost carriers dominate international charter operations:",
    lowcost_label: "Low-Cost Carriers at DLM:",
    lowcost_list: "Pegasus Airlines, AJet, SunExpress, EasyJet, Jet2, TUI Airways, Wizz Air, Ryanair.",
    services_title: "Services & Comfort",
    luggage_title: "Baggage & Storage",
    luggage_desc: "Luggage wrapping and lost and found counters are located in the Departures hall. Left luggage services are available 24/7.",
    lounge_title: "CIP & VIP Lounges",
    lounge_desc: "Relax before your flight in the Premium CIP Lounge (International T2). Offers free Wi-Fi, open buffet, drinks, and children's playroom.",
    transfer_title: "Need to Get to Your Resort?",
    transfer_desc: "Muttaş and Havaş shuttles depart from the domestic terminal exit after flight arrivals. You can also pre-book an individual VIP transfer.",
    transfer_btn: "View Shuttles & Estimator"
  },
  ru: {
    title: "АЭРОПОРТ ДАЛАМАН (DLM)",
    subtitle: "Полный путеводитель по международному аэропорту Даламан: онлайн-табло рейсов, терминалы, услуги и трансферы.",
    tabs: {
      arrivals: "Прибытие",
      departures: "Отправление"
    },
    search_placeholder: "Поиск рейса по номеру, городу или авиакомпании...",
    official_board_btn: "Официальное табло YDA",
    webcams_title: "Веб-камеры и мониторинг погоды",
    webcams_desc: "По соображениям авиационной безопасности в аэропорту Даламан отсутствуют публичные камеры терминалов и полосы. Вы можете оценить погоду и обстановку в регионе по камерам соседних курортов или отслеживать самолеты онлайн:",
    webcams_flightradar: "Самолеты в реальном времени на Flightradar24",
    webcams_fethiye: "Камера: Марина Фетхие",
    webcams_oludeniz: "Камера: Пляж Олюдениз",
    webcams_marmaris: "Камера: Порт Мармариса",
    terminals_title: "Терминалы и навигация",
    terminals_desc: "Аэропорт Даламан состоит из двух пассажирских терминалов, расположенных рядом друг с другом:",
    terminal_2_title: "Терминал 2 (Международный)",
    terminal_2_desc: "Современный терминал, открытый в 2018 году, обслуживает все международные рейсы. Четыре уровня, просторные зоны досмотра, большие залы дьюти-фри, бизнес-лаунжи и фудкорты.",
    terminal_1_title: "Терминал 1 (Внутренний)",
    terminal_1_desc: "Обслуживает все внутренние рейсы по Турции (в основном Стамбул и Анкару). Меньше по размеру и очень прост в навигации. Шаттлы Havaş/Muttaş отправляются прямо от выхода.",
    airlines_title: "Авиасообщение и направления",
    airlines_desc: "Даламан связывает побережье с более чем 120 городами мира. В сезон сюда летает огромное количество чартеров из Европы и СНГ. Лоукостеры играют ключевую роль:",
    lowcost_label: "Бюджетные авиакомпании (Лоукостеры):",
    lowcost_list: "Pegasus Airlines, AJet, SunExpress, EasyJet, Jet2, TUI Airways, Wizz Air, Ryanair.",
    services_title: "Услуги и комфорт",
    luggage_title: "Багаж и хранение",
    luggage_desc: "Услуги упаковки багажа и стойки находок (Lost & Found) расположены в зале вылета. Камера хранения работает круглосуточно.",
    lounge_title: "CIP и VIP-залы",
    lounge_desc: "Проведите время перед вылетом в CIP-зале Premium (международный Терминал 2). Доступен шведский стол, напитки, детский уголок и безлимитный Wi-Fi.",
    transfer_title: "Как добраться до вашего отеля?",
    transfer_desc: "Автобусы Havaş и Muttaş отправляются прямо от выхода из терминала по прибытии внутренних рейсов. Также доступен заказ VIP-трансферов.",
    transfer_btn: "Перейти к трансферам и ценам"
  },
  de: {
    title: "FLUGHAFEN DALAMAN (DLM)",
    subtitle: "Vollständiger Passagierleitfaden zum internationalen Flughafen Dalaman: Flugstatus, Terminals, Dienstleistungen und Transfers.",
    tabs: {
      arrivals: "Ankünfte",
      departures: "Abflüge"
    },
    search_placeholder: "Flüge filtern nach Nummer, Zielort oder Airline...",
    official_board_btn: "Offizielle YDA Flugtafel",
    webcams_title: "Live-Webcams & Wetterbeobachtung",
    webcams_desc: "Aus Sicherheitsgründen gibt es am Flughafen Dalaman keine öffentlichen Live-Kameras. Sie können das Wetter in nahegelegenen Ferienorten live beobachten:",
    webcams_flightradar: "Flüge live verfolgen auf Flightradar24",
    webcams_fethiye: "Webcam: Fethiye Marina",
    webcams_oludeniz: "Webcam: Strand Ölüdeniz",
    webcams_marmaris: "Webcam: Hafen Marmaris",
    terminals_title: "Terminals & Navigation",
    terminals_desc: "Der Flughafen Dalaman besteht aus zwei nebeneinander liegenden Passagierterminals:",
    terminal_2_title: "Terminal 2 (International)",
    terminal_2_desc: "Das 2018 eröffnete, hochmoderne Terminal wickelt alle internationalen Flüge ab. Es verfügt über Duty-Free-Bereiche, VIP-Lounges und zahlreiche Cafés.",
    terminal_1_title: "Terminal 1 (Inland)",
    terminal_1_desc: "Dieses Terminal bedient Inlandsflüge innerhalb der Türkei (Istanbul und Ankara). Die Havaş/Muttaş Shuttles fahren direkt vor dem Ausgang ab.",
    airlines_title: "Flugverbindungen & Airlines",
    airlines_desc: "Dalaman verbindet über 120 Destinationen weltweit, insbesondere für europäische Urlauber. Low-Cost-Airlines dominieren den Verkehr:",
    lowcost_label: "Low-Cost-Airlines am DLM:",
    lowcost_list: "Pegasus Airlines, AJet, SunExpress, EasyJet, Jet2, TUI Airways, Wizz Air, Ryanair.",
    services_title: "Dienstleistungen & Komfort",
    luggage_title: "Gepäck & Aufbewahrung",
    luggage_desc: "Gepäckverpackung und Fundbüro befinden sich in der Abflughalle. Die Gepäckaufbewahrung ist rund um die Uhr geöffnet.",
    lounge_title: "CIP & VIP Lounges",
    lounge_desc: "Entspannen Sie in der Premium CIP Lounge (Internationales T2) mit Buffet, Getränken und kostenlosem WLAN.",
    transfer_title: "Brauchen Sie einen Transfer?",
    transfer_desc: "Die Muttaş- und Havaş-Shuttles fahren direkt nach der Landung am Inlands-Ausgang ab. VIP-Transfers sind ebenfalls verfügbar.",
    transfer_btn: "Shuttles & Preise anzeigen"
  },
  tr: {
    title: "DALAMAN HAVALİMANI (DLM)",
    subtitle: "Dalaman Uluslararası Havalimanı yolcu rehberi: uçuş bilgileri, terminal haritaları, hizmetler ve ulaşım seçenekleri.",
    tabs: {
      arrivals: "Gelen Yolcu",
      departures: "Giden Yolcu"
    },
    search_placeholder: "Uçuş numarası, şehir veya havayoluna göre filtrele...",
    official_board_btn: "Resmi YDA Uçuş Tablosu",
    webcams_title: "Canlı Kameralar & Hava Durumu Takibi",
    webcams_desc: "Havacılık güvenliği nedeniyle havalimanı içinden canlı kamera yayını yapılmamaktadır. Hava durumunu çevre turistik merkezlerin kameralarından izleyebilirsiniz:",
    webcams_flightradar: "Flightradar24 Canlı Uçuş Takibi",
    webcams_fethiye: "Kamera: Fethiye Yat Limanı",
    webcams_oludeniz: "Kamera: Ölüdeniz Plajı",
    webcams_marmaris: "Kamera: Marmaris Limanı",
    terminals_title: "Terminaller & Yönlendirme",
    terminals_desc: "Dalaman Havalimanı yan yana konumlanmış iki farklı yolcu terminalinden oluşur:",
    terminal_2_title: "Terminal 2 (Dış Hatlar)",
    terminal_2_desc: "2018 yılında açılan modern terminal, tüm dış hat uçuşlarına hizmet vermektedir. Geniş güvenlik alanları, duty-free mağazaları ve CIP salonları mevcuttur.",
    terminal_1_title: "Terminal 1 (İç Hatlar)",
    terminal_1_desc: "Türkiye içi uçuşlara (ağırlıklı İstanbul ve Ankara) hizmet verir. Havaş ve Muttaş servisleri bu terminalin çıkışından kalkar.",
    airlines_title: "Uçuş Ağları & Havayolları",
    airlines_desc: "Dalaman dünya genelinde 120'den fazla destinasyona bağlanmaktadır. Sezonda charter firmaları ve loulostlar öne çıkar:",
    lowcost_label: "Dalaman'a Uçan Düşük Maliyetli Firmalar (Low-Cost):",
    lowcost_list: "Pegasus Airlines, AJet, SunExpress, EasyJet, Jet2, TUI Airways, Wizz Air, Ryanair.",
    services_title: "Hizmetler & Konfor",
    luggage_title: "Bagaj İşlemleri",
    luggage_desc: "Bagaj sarma ve kayıp eşya ofisleri Giden Yolcu salonunda yer almaktadır. Emanet ofisi 7/24 hizmet verir.",
    lounge_title: "CIP & VIP Salonları",
    lounge_desc: "Dış Hatlar T2 terminalindeki Premium CIP salonunda zengin ikramlar, internet ve çocuk oyun alanı eşliğinde dinlenebilirsiniz.",
    transfer_title: "Ulaşım Desteği mi Gerekiyor?",
    transfer_desc: "Muttaş ve Havaş servisleri uçuş iniş saatlerine göre terminal önünden hareket eder. Özel VIP transfer de kiralayabilirsiniz.",
    transfer_btn: "Servis Saatleri ve Fiyatlar"
  }
};

const AirportClient = ({ locale }: AirportClientProps) => {
  const t = clientTranslations[locale] || clientTranslations['en'];
  const [flightType, setFlightType] = useState<'arrivals' | 'departures'>('arrivals');
  const [searchQuery, setSearchQuery] = useState('');

  const activeFlights = flightType === 'arrivals' ? ARRIVALS : DEPARTURES;

  const filteredFlights = activeFlights.filter(f => {
    return f.flightNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.airline.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Landed':
      case 'Departed':
        return 'bg-emerald-100 text-emerald-800';
      case 'On Time':
        return 'bg-cyan-100 text-cyan-800';
      case 'Delayed':
        return 'bg-amber-100 text-amber-800';
      case 'Boarding':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-900 text-white py-16 overflow-hidden rounded-[2.5rem] mb-8 shadow-lg">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay opacity-35 brightness-[0.25]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] mb-4 inline-block">
            {locale === 'ru' ? 'ТРАНСПОРТНЫЙ ХАБ' : 'TRANSPORTATION HUB'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full pb-20 space-y-12">
        
        {/* Dynamic Flight Board Section */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 premium-shadow border border-slate-50 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            {/* Arrivals/Departures Switcher */}
            <div className="flex bg-slate-50 border border-slate-100 rounded-2xl p-1 flex-shrink-0 self-start md:self-center">
              <button
                onClick={() => setFlightType('arrivals')}
                className={`py-3 px-6 text-sm font-black uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all ${
                  flightType === 'arrivals' 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FaPlaneArrival />
                <span>{t.tabs.arrivals}</span>
              </button>
              <button
                onClick={() => setFlightType('departures')}
                className={`py-3 px-6 text-sm font-black uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all ${
                  flightType === 'departures' 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FaPlaneDeparture />
                <span>{t.tabs.departures}</span>
              </button>
            </div>

            {/* Flight Search */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl py-3 px-4 pl-12 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all border border-slate-100 font-semibold"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Link to official tracker */}
            <Link
              href="https://dalamanairport.aero"
              target="_blank"
              className="py-3 px-6 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>{t.official_board_btn}</span>
              <FaExternalLinkAlt size={10} />
            </Link>
          </div>

          {/* Flights Board Grid */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">{locale === 'ru' ? 'Время' : 'Time'}</th>
                  <th className="py-4 px-6">{locale === 'ru' ? 'Рейс' : 'Flight'}</th>
                  <th className="py-4 px-6">{locale === 'ru' ? 'Авиакомпания' : 'Airline'}</th>
                  <th className="py-4 px-6">{locale === 'ru' ? 'Направление' : 'Destination'}</th>
                  <th className="py-4 px-6 text-right">{locale === 'ru' ? 'Статус' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                {filteredFlights.length > 0 ? (
                  filteredFlights.map(flight => (
                    <tr key={flight.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{flight.time}</td>
                      <td className="py-4 px-6 text-cyan-600 font-bold">{flight.flightNo}</td>
                      <td className="py-4 px-6 text-slate-800">{flight.airline}</td>
                      <td className="py-4 px-6 font-bold text-slate-900">{flight.destination}</td>
                      <td className="py-4 px-6 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(flight.status)}`}>
                          {locale === 'ru' ? flight.statusRu : flight.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                      {locale === 'ru' ? 'Рейсы не найдены' : 'No flights found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Webcams and Live weather section */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-cyan-600">
              <FaVideo size={24} />
              <h3 className="font-black text-xl text-slate-800 italic uppercase">
                {t.webcams_title}
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.webcams_desc}
            </p>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <Link
              href="https://www.flightradar24.com/airport/dlm"
              target="_blank"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <FaPlane />
              <span>{t.webcams_flightradar}</span>
            </Link>
            <Link
              href="https://worldcam.eu/webcams/turkey/fethiye/yat-limani"
              target="_blank"
              className="w-full py-2.5 px-4 border border-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <FaVideo size={10} />
              <span>{t.webcams_fethiye}</span>
            </Link>
            <Link
              href="https://canlimobeseizle.com/mugla-canli-izle/"
              target="_blank"
              className="w-full py-2.5 px-4 border border-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <FaVideo size={10} />
              <span>{t.webcams_oludeniz}</span>
            </Link>
          </div>
        </div>

        {/* Terminals Guide */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
          <div className="flex items-center gap-4 text-cyan-600">
            <FaRegBuilding size={30} />
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-slate-800">
              {t.terminals_title}
            </h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t.terminals_desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="border border-slate-100 rounded-[2rem] p-6 hover:border-slate-200 transition-colors space-y-3">
              <h3 className="font-black text-lg text-cyan-600 italic uppercase">
                {t.terminal_2_title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                {t.terminal_2_desc}
              </p>
            </div>
            <div className="border border-slate-100 rounded-[2rem] p-6 hover:border-slate-200 transition-colors space-y-3">
              <h3 className="font-black text-lg text-slate-800 italic uppercase">
                {t.terminal_1_title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                {t.terminal_1_desc}
              </p>
            </div>
          </div>
        </div>

        {/* Airlines list & Low cost focus */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-50 space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-slate-800">
            {t.airlines_title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t.airlines_desc}
          </p>

          <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 space-y-2">
            <h4 className="font-black text-xs uppercase tracking-widest text-cyan-800">
              {t.lowcost_label}
            </h4>
            <p className="text-cyan-900 text-sm font-semibold leading-relaxed">
              {t.lowcost_list}
            </p>
          </div>
        </div>

        {/* Services & Baggage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Baggage rules */}
          <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-4">
            <div className="flex items-center gap-3 text-cyan-600">
              <FaSuitcase size={24} />
              <h3 className="font-black text-lg text-slate-800 italic uppercase">
                {t.luggage_title}
              </h3>
            </div>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">
              {t.luggage_desc}
            </p>
          </div>

          {/* Lounge */}
          <div className="bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-50 space-y-4">
            <div className="flex items-center gap-3 text-cyan-600">
              <FaLuggageCart size={24} />
              <h3 className="font-black text-lg text-slate-800 italic uppercase">
                {t.lounge_title}
              </h3>
            </div>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">
              {t.lounge_desc}
            </p>
          </div>
        </div>

        {/* Transfers CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-cyan-950 text-white rounded-[2.5rem] p-8 md:p-10 premium-shadow border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-black text-xl italic uppercase tracking-wide">
              {t.transfer_title}
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              {t.transfer_desc}
            </p>
          </div>
          <Link
            href={`/${locale}/articles/transport`}
            className="py-4 px-8 bg-cyan-600 hover:bg-cyan-700 transition-all font-black text-xs uppercase tracking-widest rounded-full flex items-center gap-2 shadow-lg shadow-cyan-600/25 flex-shrink-0"
          >
            <span>{t.transfer_btn}</span>
            <FaArrowRight size={10} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AirportClient;
