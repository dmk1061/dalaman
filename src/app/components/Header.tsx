import React from 'react';
import { FaChevronRight, FaCompass, FaPlaneArrival, FaMapMarkedAlt } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';
import LanguageSwitcher from './LanguageSwitcher';
import GlobalSearch from './GlobalSearch';
import SideMenu from './SideMenu';
import LivePortalInformers from './LivePortalInformers';

type HeaderProps = {
  locale?: string;
};

const cityNamesMap: Record<string, Record<string, { name: string; hint: string }>> = {
  ru: {
    dacha: { name: 'Датча', hint: 'Книдос, Паламутбюкю, Старая Датча' },
    marmaris: { name: 'Мармарис', hint: 'Ичмелер, Турунч, бухта Амос, Акьяка' },
    koycegiz: { name: 'Кёйджегиз', hint: 'Озеро, термы Султание, бухта Экинчик' },
    dalyan: { name: 'Дальян', hint: 'Черепаший пляж Изтузу, Каунос, ликийские гробницы' },
    dalaman: { name: 'Даламан', hint: 'Главные ворота (DLM), пляж Сарыгерме, бухта Сарсала, термы' },
    gocek: { name: 'Гёджек', hint: 'Яхтенные марины, 12 островов, бухта Бедри Рахми' },
    fethiye: { name: 'Фетхие', hint: 'Голубая лагуна Олюдениз, Бабадаг, Долина Бабочек, Каякёй' },
    kas: { name: 'Каш', hint: 'Калкан, пляж Капуташ, Патара, затонувший город Кекова' },
  },
  en: {
    dacha: { name: 'Datça', hint: 'Knidos, Palamutbükü, Old Datça' },
    marmaris: { name: 'Marmaris', hint: 'İçmeler, Turunç, Amos Bay, Akyaka' },
    koycegiz: { name: 'Köyceğiz', hint: 'Lake Köyceğiz, Sultaniye Hot Springs, Ekincik' },
    dalyan: { name: 'Dalyan', hint: 'İztuzu Turtle Beach, Kaunos, Lycian Rock Tombs' },
    dalaman: { name: 'Dalaman', hint: 'Main Gateway (DLM), Sarıgerme Beach, Sarsala Bay' },
    gocek: { name: 'Göcek', hint: '6 Yacht Marinas, 12 Islands, Bedri Rahmi Bay' },
    fethiye: { name: 'Fethiye', hint: 'Ölüdeniz Blue Lagoon, Babadağ, Butterfly Valley' },
    kas: { name: 'Kaş', hint: 'Kalkan, Kaputaş Beach, Patara, Kekova Sunken City' },
  },
  de: {
    dacha: { name: 'Datça', hint: 'Knidos, Palamutbükü, Alt-Datça' },
    marmaris: { name: 'Marmaris', hint: 'İçmeler, Turunç, Amos-Bucht, Akyaka' },
    koycegiz: { name: 'Köyceğiz', hint: 'Köyceğiz-See, Sultaniye-Thermen, Ekincik' },
    dalyan: { name: 'Dalyan', hint: 'İztuzu-Strand, Kaunos, Lykische Felsengräber' },
    dalaman: { name: 'Dalaman', hint: 'Haupttor (DLM), Sarıgerme-Strand, Sarsala-Bucht' },
    gocek: { name: 'Göcek', hint: 'Yachthäfen, 12 Inseln, Bedri-Rahmi-Bucht' },
    fethiye: { name: 'Fethiye', hint: 'Ölüdeniz Blaue Lagune, Babadağ, Schmetterlingstal' },
    kas: { name: 'Kaş', hint: 'Kalkan, Kaputaş-Strand, Patara, Kekova' },
  },
  tr: {
    dacha: { name: 'Datça', hint: 'Knidos, Palamutbükü, Eski Datça' },
    marmaris: { name: 'Marmaris', hint: 'İçmeler, Turunç, Amos Koyu, Akyaka' },
    koycegiz: { name: 'Köyceğiz', hint: 'Köyceğiz Gölü, Sultaniye Kaplıcaları, Ekincik' },
    dalyan: { name: 'Dalyan', hint: 'İztuzu Plajı, Kaunos, Kral Mezarları' },
    dalaman: { name: 'Dalaman', hint: 'Bölgenin Ana Kapısı (DLM), Sarıgerme, Sarsala Koyu' },
    gocek: { name: 'Göcek', hint: 'Marinalar, 12 Adalar, Bedri Rahmi Koyu' },
    fethiye: { name: 'Fethiye', hint: 'Ölüdeniz, Babadağ, Kelebekler Vadisi, Kayaköy' },
    kas: { name: 'Kaş', hint: 'Kalkan, Kaputaş Plajı, Patara, Kekova' },
  },
};

const Header = async ({ locale = 'ru' }: HeaderProps) => {
  const dict = await getDictionary(locale as Locale);
  const cities = cityNamesMap[locale] || cityNamesMap['en'];

  const localize = (path: string) => {
    if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:') || path.startsWith('mailto:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const cityNavLinks: { name: string; hint: string; href: string; isGateway?: boolean }[] = [
    { ...cities.dacha, href: '/dacha' },
    { ...cities.marmaris, href: '/marmaris' },
    { ...cities.koycegiz, href: '/koycegiz' },
    { ...cities.dalyan, href: '/dalyan' },
    { ...cities.dalaman, href: '/dalaman', isGateway: true },
    { ...cities.gocek, href: '/gocek' },
    { ...cities.fethiye, href: '/fethiye' },
    { ...cities.kas, href: '/kas' },
  ];

  const navItems = [
    {
      name:
        locale === 'ru'
          ? 'Курорты и места'
          : locale === 'de'
          ? 'Orte & Strände'
          : locale === 'tr'
          ? 'Bölgeler & Plajlar'
          : 'Places & Beaches',
      href: localize('/city-guide'),
      dropdown: [
        {
          name: locale === 'ru' ? 'Все курорты региона (обзор)' : locale === 'de' ? 'Alle Küstenorte (Übersicht)' : locale === 'tr' ? 'Tüm Bölgeler (Genel Bakış)' : 'All Resorts Overview',
          href: '/city-guide',
        },
        {
          name: dict.header.nav.best_beaches,
          href: '/beaches',
        },
        {
          name: locale === 'ru' ? 'Острова, бухты и заливы' : locale === 'de' ? 'Inseln, Buchten & Golf' : locale === 'tr' ? 'Adalar, Koylar ve Körfezler' : 'Islands, Bays & Coves',
          href: '/articles/islands-bays',
        },
        {
          name: locale === 'ru' ? 'Каньоны, реки и озёра (Саклыкент)' : locale === 'de' ? 'Schluchten, Flüsse & Seen (Saklıkent)' : locale === 'tr' ? 'Kanyonlar, Nehirler ve Göller' : 'Canyons, Rivers & Lakes (Saklıkent)',
          href: '/articles/natural-attractions-canyons-rivers-lakes',
        },
        {
          name: dict.header.nav.ancient_cities,
          href: '/articles/ancient-cities',
        },
        {
          name: dict.header.nav.nature_parks,
          href: '/articles/national-parks-and-nature-reserves',
        },
      ],
    },
    {
      name:
        locale === 'ru'
          ? 'Чем заняться'
          : locale === 'de'
          ? 'Aktivitäten'
          : locale === 'tr'
          ? 'Ne Yapılır'
          : 'Things to Do',
      href: localize('/collections'),
      dropdown: [
        { name: dict.header.nav.yachting, href: '/articles/yachting' },
        { name: dict.header.nav.paragliding, href: '/articles/paragliding' },
        { name: dict.header.nav.diving, href: '/articles/diving' },
        { name: dict.header.nav.kitesurfing, href: '/articles/kitesurfing' },
        {
          name: locale === 'ru' ? 'Гастрономия и местная кухня' : locale === 'de' ? 'Gastronomie & Lokale Küche' : locale === 'tr' ? 'Gastronomi ve Yöresel Mutfak' : 'Gastronomy & Local Cuisine',
          href: '/articles/gastronomy',
        },
        {
          name: locale === 'ru' ? 'Хаммамы, СПА и термальные источники' : locale === 'de' ? 'Hamam, Spa & Thermalquellen' : locale === 'tr' ? 'Hamam, Spa ve Kaplıcalar' : 'Hammams, Spas & Thermal Springs',
          href: '/articles/turkish-bath-hammam-and-spa',
        },
        {
          name: locale === 'ru' ? 'Рынки, базары и ремёсла' : locale === 'de' ? 'Wochenmärkte, Basare & Handwerk' : locale === 'tr' ? 'Pazarlar, Alışveriş ve El Sanatları' : 'Weekly Markets, Bazaars & Crafts',
          href: '/articles/markets-shopping',
        },
        {
          name: locale === 'ru' ? 'Семейный отдых с детьми' : locale === 'de' ? 'Familienurlaub mit Kindern' : locale === 'tr' ? 'Çocuklarla Aile Tatili' : 'Family Vacation with Kids',
          href: '/articles/family-vacation-kids-entertainment',
        },
        {
          name: locale === 'ru' ? 'Вечерняя жизнь и фестивали' : locale === 'de' ? 'Nachtleben & Festivals' : locale === 'tr' ? 'Gece Hayatı ve Festivaller' : 'Nightlife & Festivals',
          href: '/articles/nightlife-clubs-and-bars',
        },
      ],
    },
    {
      name:
        locale === 'ru'
          ? 'Маршруты'
          : locale === 'de'
          ? 'Routen'
          : locale === 'tr'
          ? 'Rotalar'
          : 'Routes',
      href: localize('/routes'),
      dropdown: [
        {
          name: locale === 'ru' ? 'Интерактивная карта побережья' : locale === 'de' ? 'Interaktive Küstenkarte' : locale === 'tr' ? 'İnteraktif Sahil Haritası' : 'Interactive Coast Map',
          href: '/map',
        },
        {
          name: locale === 'ru' ? 'Интерактивный Атлас троп (Ликийская тропа)' : locale === 'de' ? 'Interaktiver Wanderatlas (Lykischer Weg)' : locale === 'tr' ? 'İnteraktif Likya & Karya Yolu Atlası' : 'Interactive Trail Atlas (Lycian Way)',
          href: '/routes/trekking',
        },
        {
          name: locale === 'ru' ? 'Уикенды на 48 часов (4 сценария)' : locale === 'de' ? '48-Stunden-Wochenendpläne' : locale === 'tr' ? '48 Saatlik Hafta Sonu Rotaları' : '48-Hour Weekend Itineraries',
          href: '/routes/weekends',
        },
        {
          name: locale === 'ru' ? 'Автомаршруты и выезды на 1 день' : locale === 'de' ? 'Roadtrips & Tagesausflüge' : locale === 'tr' ? 'Araç Rotaları ve Günübirlik Geziler' : 'Road Trips & Day Itineraries',
          href: '/routes',
        },
        {
          name: locale === 'ru' ? 'Фотогид: лучшие панорамы для съёмок' : locale === 'de' ? 'Fotoguide: Die besten Aussichtspunkte' : locale === 'tr' ? 'Fotoğraf Rehberi: En İyi Manzara Noktaları' : 'Photo Guide: Best Scenic Viewpoints',
          href: '/articles/photo-guide-best-instagram-spots',
        },
        {
          name: locale === 'ru' ? 'Кураторские подборки отдыха' : locale === 'de' ? 'Kuratierte Urlaubsideen' : locale === 'tr' ? 'Özel Tatil Koleksiyonları' : 'Curated Travel Collections',
          href: '/collections',
        },
        {
          name: dict.header.nav.blogs,
          href: '/blogs',
        },
      ],
    },
    {
      name:
        locale === 'ru'
          ? 'Планирование'
          : locale === 'de'
          ? 'Reiseplanung'
          : locale === 'tr'
          ? 'Seyahat Planı'
          : 'Planning',
      href: localize('/articles'),
      dropdown: [
        { name: dict.header.nav.airport_dalaman, href: '/articles/airport-dalaman' },
        { name: dict.header.nav.transport, href: '/articles/transport' },
        {
          name: locale === 'ru' ? 'Бюджет поездки и цены 2026' : locale === 'de' ? 'Reisebudget & Preise 2026' : locale === 'tr' ? 'Tatil Bütçesi ve Fiyatlar 2026' : 'Travel Budget & Prices 2026',
          href: '/articles/travel-budget-and-money-saving-tips',
        },
        {
          name: locale === 'ru' ? 'Валюта, обмен денег и карты' : locale === 'de' ? 'Währung, Geldwechsel & Karten' : locale === 'tr' ? 'Döviz, Ödeme ve Kart Kullanımı' : 'Currency Exchange & Cards',
          href: '/articles/currency-exchange-and-payments',
        },
        {
          name: locale === 'ru' ? 'Связь, интернет и правила eSIM' : locale === 'de' ? 'Mobilfunk, Internet & eSIM-Regeln' : locale === 'tr' ? 'İnternet, SIM Kart ve eSIM Kuralları' : 'SIM Cards, Internet & eSIM Rules',
          href: '/articles/mobile-connection-and-internet-sim-cards',
        },
        { name: dict.header.nav.climate_and_seasons, href: '/articles/climate-and-seasons' },
        { name: dict.header.nav.residency, href: '/articles/residency-permit' },
        { name: dict.header.nav.useful_contacts, href: '/articles/useful-contacts' },
        {
          name: locale === 'ru' ? 'Все статьи путеводителя (80+)' : locale === 'de' ? 'Alle Reiseführer-Artikel (80+)' : locale === 'tr' ? 'Tüm Rehber Yazıları (80+)' : 'All Guide Articles (80+)',
          href: '/articles',
        },
      ],
    },
    {
      name:
        locale === 'ru'
          ? 'Услуги'
          : locale === 'de'
          ? 'Services'
          : locale === 'tr'
          ? 'Hizmetler'
          : 'Services',
      href: localize('/services'),
      dropdown: [
        {
          name: locale === 'ru' ? 'Трансфер и такси из аэропорта DLM' : locale === 'de' ? 'Flughafentransfer & Taxi (DLM)' : locale === 'tr' ? 'Dalaman Havalimanı (DLM) Transfer' : 'DLM Airport Transfers & Taxi',
          href: '/services/transfers',
        },
        {
          name: locale === 'ru' ? 'Аренда авто без депозита' : locale === 'de' ? 'Mietwagen ohne Kaution' : locale === 'tr' ? 'Depozitosuz Araç Kiralama' : 'Car Rental (No Deposit)',
          href: '/services/car-rental',
        },
        {
          name: locale === 'ru' ? 'Аренда яхт и гулет' : locale === 'de' ? 'Yacht- & Gulet-Charter' : locale === 'tr' ? 'Yat ve Gulet Kiralama' : 'Yacht & Gulet Charter',
          href: '/services/yacht-rental',
        },
        {
          name: locale === 'ru' ? 'Авиабилеты и чартеры в Даламан' : locale === 'de' ? 'Flüge & Direktcharter nach DLM' : locale === 'tr' ? 'Dalaman Uçak Bileti & Çarter' : 'Flights & Direct Charters to DLM',
          href: '/services/flights',
        },
        {
          name: dict.header.nav.accommodation,
          href: '/services/hotels',
        },
        {
          name: locale === 'ru' ? 'Экскурсии и активные туры' : locale === 'de' ? 'Ausflüge & Erlebnistouren' : locale === 'tr' ? 'Günübirlik Turlar ve Geziler' : 'Excursions & Guided Tours',
          href: '/services/excursions-tours',
        },
        {
          name: locale === 'ru' ? 'Морская рыбалка на тунца и дайвинг' : locale === 'de' ? 'Hochseeangeln & Tauchtouren' : locale === 'tr' ? 'Balık Avı ve Dalış Turları' : 'Deep-Sea Tuna Fishing & Diving',
          href: '/services/tuna-fishing',
        },
        {
          name: locale === 'ru' ? 'Недвижимость: покупка и аренда' : locale === 'de' ? 'Immobilien: Kauf & Miete' : locale === 'tr' ? 'Emlak: Satılık ve Kiralık' : 'Real Estate: Buy & Rent',
          href: '/services/real-estate',
        },
      ],
    },
  ];

  const topArrivalText =
    locale === 'ru'
      ? 'Прилёт в Даламан (DLM)'
      : locale === 'de'
      ? 'Ankunft Flughafen Dalaman (DLM)'
      : locale === 'tr'
      ? 'Dalaman Havalimanı (DLM) Rehberi'
      : 'Arriving at Dalaman (DLM)';

  const topMapText =
    locale === 'ru'
      ? 'Интерактивная карта'
      : locale === 'de'
      ? 'Interaktive Karte'
      : locale === 'tr'
      ? 'İnteraktif Harita'
      : 'Interactive Map';

  const topCarText =
    locale === 'ru'
      ? 'Аренда авто'
      : locale === 'de'
      ? 'Mietwagen'
      : locale === 'tr'
      ? 'Araç Kiralama'
      : 'Car Rental';

  return (
    <header className="glass-header">
      {/* Level 1: Tourist Gateway Bar & Live Informers (No Pharmacies/Admin clutter) */}
      <div className="bg-cyan-700 text-white text-[11px] font-semibold">
        <div className="portal-container py-1.5 flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href={localize('/articles/airport-dalaman')}
              className="flex items-center gap-1.5 text-white hover:text-cyan-200 transition-colors"
            >
              <FaPlaneArrival className="text-cyan-200" size={12} />
              <span>{topArrivalText}</span>
            </Link>

            <Link
              href={localize('/map')}
              className="flex items-center gap-1.5 text-cyan-100 hover:text-white transition-colors"
            >
              <FaMapMarkedAlt className="text-cyan-200" size={12} />
              <span>{topMapText}</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <LivePortalInformers locale={locale} variant="topbar" />
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>

      {/* Level 2: Brand, Main Dropdowns & Global Search */}
      <div className="portal-container py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={localize('/')} className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <FaCompass size={20} />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-cyan-700 transition-colors block leading-none">
              DALAMAN<span className="text-cyan-600">.INFO</span>
            </span>
            <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
              {dict.header.logo_title}
            </span>
          </div>
        </Link>

        {/* Main Desktop Navigation (5 Balanced Pillars with Hover-Gap Bridge) */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-cyan-700 hover:bg-slate-100/80 transition-colors"
                >
                  <span>{item.name}</span>
                  {item.dropdown && item.dropdown.length > 0 && (
                    <FiChevronDown
                      className="text-slate-400 group-hover:text-cyan-600 transition-transform duration-200 group-hover:rotate-180"
                      size={14}
                    />
                  )}
                </Link>
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="absolute left-0 top-full pt-2 w-72 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible z-40 before:absolute before:inset-x-0 before:-top-3 before:h-3 before:bg-transparent">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={localize(subItem.href)}
                          className="flex justify-between items-center w-full px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-cyan-50/70 hover:text-cyan-700 transition-colors group/sub"
                        >
                          <span className="pr-2">{subItem.name}</span>
                          <FaChevronRight
                            size={9}
                            className="opacity-0 group-hover/sub:opacity-70 text-cyan-600 flex-shrink-0 transition-opacity"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions: Global Search & Mobile Drawer Trigger */}
        <div className="flex items-center gap-2.5">
          <GlobalSearch locale={locale} placeholder={dict.header.search_placeholder} />
          <SideMenu locale={locale} />
        </div>
      </div>

      {/* Level 3: Horizontal Resort Ribbon (West -> Dalaman Gateway -> East) */}
      <div className="border-t border-slate-100 bg-slate-50/80">
        <div className="portal-container py-1.5 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pr-1 flex-shrink-0 hidden sm:inline">
            {locale === 'ru' ? 'Курорты:' : locale === 'de' ? 'Küste:' : locale === 'tr' ? 'Bölgeler:' : 'Resorts:'}
          </span>
          <ul className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-start">
            {cityNavLinks.map((item) => (
              <li key={item.name} className="flex-shrink-0">
                <Link
                  href={localize(item.href)}
                  title={item.hint}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    item.isGateway
                      ? 'bg-cyan-600 text-white shadow-xs hover:bg-cyan-700'
                      : 'text-slate-700 bg-white/80 border border-slate-200/70 hover:text-cyan-700 hover:border-cyan-300 hover:bg-white'
                  }`}
                >
                  {item.isGateway && <span className="text-[11px]">✈️</span>}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
