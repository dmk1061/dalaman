"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MdSearch, MdClose } from 'react-icons/md';
import { FaMapMarkerAlt, FaUmbrellaBeach, FaBookOpen, FaConciergeBell, FaChevronRight } from 'react-icons/fa';

interface SearchEntry {
  title: Record<string, string>;
  category: 'city' | 'beach' | 'service' | 'article';
  href: string;
  keywords: string;
}

const SEARCH_INDEX: SearchEntry[] = [
  // Курорты
  { title: { ru: 'Даламан (Dalaman)', en: 'Dalaman', de: 'Dalaman', tr: 'Dalaman' }, category: 'city', href: '/dalaman', keywords: 'даламан dalaman dlm аэропорт река термы' },
  { title: { ru: 'Фетхие (Fethiye)', en: 'Fethiye', de: 'Fethiye', tr: 'Fethiye' }, category: 'city', href: '/fethiye', keywords: 'фетхие fethiye олюдениз oludeniz чалыш каякёй' },
  { title: { ru: 'Мармарис (Marmaris)', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' }, category: 'city', href: '/marmaris', keywords: 'мармарис marmaris ичмелер турунч замок марина' },
  { title: { ru: 'Каш (Kaş)', en: 'Kaş', de: 'Kaş', tr: 'Kaş' }, category: 'city', href: '/kas', keywords: 'каш kas капуташ кекова дайвинг патара' },
  { title: { ru: 'Гёджек (Göcek)', en: 'Göcek', de: 'Göcek', tr: 'Göcek' }, category: 'city', href: '/gocek', keywords: 'гёджек гечек gocek яхты 12 островов марины' },
  { title: { ru: 'Дальян (Dalyan)', en: 'Dalyan', de: 'Dalyan', tr: 'Dalyan' }, category: 'city', href: '/dalyan', keywords: 'дальян dalyan изтузу черепахи гробницы каунос грязи' },
  { title: { ru: 'Датча (Datça)', en: 'Datça', de: 'Datça', tr: 'Datça' }, category: 'city', href: '/dacha', keywords: 'датча дача datca книдос палламутбюкю миндаль' },
  { title: { ru: 'Кёйджегиз (Köyceğiz)', en: 'Köyceğiz', de: 'Köyceğiz', tr: 'Köyceğiz' }, category: 'city', href: '/koycegiz', keywords: 'кёйджегиз koycegiz озеро султание экинджик' },

  // Пляжи и знаковые места
  { title: { ru: 'Пляж Сарыгерме (Sarıgerme)', en: 'Sarıgerme Beach', de: 'Sarıgerme Strand', tr: 'Sarıgerme Plajı' }, category: 'beach', href: '/dalaman/beach/Sarigerme', keywords: 'сарыгерме sarigerme пляж песок даламан' },
  { title: { ru: 'Бухта Сарсала (Sarsala Koyu)', en: 'Sarsala Bay', de: 'Sarsala Bucht', tr: 'Sarsala Koyu' }, category: 'beach', href: '/dalaman/beach/Sarsala', keywords: 'сарсала sarsala бухта пляж даламан' },
  { title: { ru: 'Голубая лагуна Олюдениз (Ölüdeniz)', en: 'Ölüdeniz Blue Lagoon', de: 'Ölüdeniz Blaue Lagune', tr: 'Ölüdeniz Mavi Lagün' }, category: 'beach', href: '/fethiye/beach/bluelagoon', keywords: 'олюдениз oludeniz лагуна пляж параглайдинг' },
  { title: { ru: 'Пляж Капуташ (Kaputaş)', en: 'Kaputaş Beach', de: 'Kaputaş Strand', tr: 'Kaputaş Plajı' }, category: 'beach', href: '/kas/beach/kaputas', keywords: 'капуташ kaputas пляж каш бирюзовый' },
  { title: { ru: 'Черепаший пляж Изтузу (İztuzu)', en: 'İztuzu Turtle Beach', de: 'İztuzu Schildkrötenstrand', tr: 'İztuzu Plajı' }, category: 'beach', href: '/dalyan/beach/Istuzu', keywords: 'изтузу истузу iztuzu черепахи дальян пляж' },
  { title: { ru: 'Долина Бабочек (Kelebekler Vadisi)', en: 'Butterfly Valley', de: 'Schmetterlingstal', tr: 'Kelebekler Vadisi' }, category: 'beach', href: '/fethiye/beach/kelebekler', keywords: 'долина бабочек kelebekler butterfly фетхие' },
  { title: { ru: 'Пляж Патара (Patara)', en: 'Patara Beach & Ruins', de: 'Patara Strand', tr: 'Patara Plajı' }, category: 'beach', href: '/kas/beach/patara', keywords: 'патара patara дюны песок руины' },
  { title: { ru: 'Античный Книдос (Knidos)', en: 'Ancient Knidos', de: 'Antikes Knidos', tr: 'Knidos Antik Kenti' }, category: 'beach', href: '/dacha/sight/knidos', keywords: 'книдос knidos руины амфитеатр датча' },
  { title: { ru: 'Затонувший город Кекова (Kekova)', en: 'Kekova Sunken City', de: 'Kekova Versunkene Stadt', tr: 'Kekova Batık Şehir' }, category: 'beach', href: '/kas/sight/kekova', keywords: 'кекова kekova затонувший город каш яхты' },

  // Услуги и сервисы
  { title: { ru: 'Трансферы из аэропорта Даламан (DLM)', en: 'DLM Airport Transfers', de: 'DLM Flughafentransfers', tr: 'DLM Havalimanı Transfer' }, category: 'service', href: '/services/transfers', keywords: 'трансфер такси аэропорт даламан transfer taxi dlm' },
  { title: { ru: 'Аренда авто без депозита', en: 'Car Rental', de: 'Mietwagen', tr: 'Araç Kiralama' }, category: 'service', href: '/services/car-rental', keywords: 'аренда авто прокат машин car rental скутер' },
  { title: { ru: 'Аренда яхт и гулет', en: 'Yacht & Gulet Charter', de: 'Yachtcharter', tr: 'Yat ve Tekne Kiralama' }, category: 'service', href: '/services/yacht-rental', keywords: 'аренда яхт лодок гулет катамаран yacht boat' },
  { title: { ru: 'Авиабилеты и чартеры в Даламан', en: 'Flights to Dalaman', de: 'Flüge nach Dalaman', tr: 'Dalaman Uçak Bileti' }, category: 'service', href: '/services/flights', keywords: 'авиабилеты перелет рейсы чартер flights aviasales' },
  { title: { ru: 'Отели, виллы и апартаменты', en: 'Hotels & Villas', de: 'Hotels & Villen', tr: 'Oteller ve Villalar' }, category: 'service', href: '/services/hotels', keywords: 'отели жилье виллы апартаменты бронирование hotels' },
  { title: { ru: 'Экскурсии и активные туры', en: 'Excursions & Tours', de: 'Ausflüge & Touren', tr: 'Turlar ve Geziler' }, category: 'service', href: '/services/excursions-tours', keywords: 'экскурсии туры рафтинг параплан сафари' },

  // Полезные статьи и хабы
  { title: { ru: 'Гид по аэропорту Даламан (DLM)', en: 'Dalaman Airport Guide', de: 'Flughafen Dalaman Guide', tr: 'Dalaman Havalimanı Rehberi' }, category: 'article', href: '/articles/airport-dalaman', keywords: 'аэропорт даламан dlm терминал автобусы хаваш мутташ' },
  { title: { ru: 'Транспорт: автобусы Havaş, Muttaş и долмуши', en: 'Public Transport & Buses', de: 'Öffentlicher Verkehr & Busse', tr: 'Toplu Taşıma ve Otobüsler' }, category: 'article', href: '/articles/transport', keywords: 'транспорт автобусы расписание хаваш мутташ долмуш паром' },
  { title: { ru: 'Интерактивный Атлас Ликийской тропы', en: 'Lycian Way Trekking Atlas', de: 'Lykischer Weg Wanderatlas', tr: 'Likya Yolu Trekking Atlası' }, category: 'article', href: '/routes/trekking', keywords: 'треккинг ликийская карийская тропа поход горы маршрут' },
  { title: { ru: 'Идеи выходного дня (48 часов)', en: '48-Hour Weekend Ideas', de: '48h Wochenend-Pläne', tr: '48 Saatlik Hafta Sonu Rotaları' }, category: 'article', href: '/routes/weekends', keywords: 'уикенд выходные маршрут 2 дня 48 часов' },
  { title: { ru: 'Дежурные аптеки (Nöbetçi Eczane) и экстренные телефоны', en: '24/7 Pharmacies & Useful Contacts', de: 'Notdienstapotheken & Kontakte', tr: 'Nöbetçi Eczaneler ve İletişim' }, category: 'article', href: '/articles/useful-contacts', keywords: 'аптека дежурная медицина больница полиция телефон eczane' },
];

const categoryLabels: Record<string, Record<string, string>> = {
  ru: { city: 'Курорты', beach: 'Пляжи и места', service: 'Сервисы', article: 'Путеводитель', empty: 'Ничего не найдено', all_articles: 'Все статьи путеводителя' },
  en: { city: 'Resorts', beach: 'Beaches & Sights', service: 'Services', article: 'Guides', empty: 'No matches found', all_articles: 'All guide articles' },
  de: { city: 'Städte', beach: 'Strände & Orte', service: 'Services', article: 'Reiseführer', empty: 'Keine Ergebnisse', all_articles: 'Alle Artikel ansehen' },
  tr: { city: 'Bölgeler', beach: 'Plajlar ve Yerler', service: 'Hizmetler', article: 'Rehber', empty: 'Sonuç bulunamadı', all_articles: 'Tüm rehber yazıları' },
};

export default function GlobalSearch({ locale = 'ru', placeholder = 'Поиск...' }: { locale?: string; placeholder?: string }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const labels = categoryLabels[locale] || categoryLabels['en'];

  const localize = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredResults = normalizedQuery
    ? SEARCH_INDEX.filter((item) => {
        const titleText = (item.title[locale] || item.title['en']).toLowerCase();
        return titleText.includes(normalizedQuery) || item.keywords.toLowerCase().includes(normalizedQuery);
      }).slice(0, 8)
    : SEARCH_INDEX.slice(0, 6);

  const getIcon = (cat: SearchEntry['category']) => {
    switch (cat) {
      case 'city': return <FaMapMarkerAlt className="text-cyan-600" size={13} />;
      case 'beach': return <FaUmbrellaBeach className="text-amber-500" size={13} />;
      case 'service': return <FaConciergeBell className="text-emerald-600" size={13} />;
      case 'article': return <FaBookOpen className="text-indigo-500" size={13} />;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        <MdSearch className="absolute left-3.5 text-slate-400 pointer-events-none" size={18} />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-800 placeholder-slate-400 rounded-full py-2 pl-9 pr-8 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 border border-slate-200/80 transition-all w-40 sm:w-52 lg:w-60"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Clear search"
          >
            <MdClose size={14} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, idx) => (
                <Link
                  key={idx}
                  href={localize(item.href)}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-cyan-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      {getIcon(item.category)}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 truncate">
                        {item.title[locale] || item.title['en']}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {labels[item.category]}
                      </div>
                    </div>
                  </div>
                  <FaChevronRight size={10} className="text-slate-300 group-hover:text-cyan-600 flex-shrink-0 ml-2" />
                </Link>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-xs text-slate-400 font-medium">
                {labels.empty}
              </div>
            )}
          </div>
          <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex justify-between items-center">
            <Link
              href={localize('/articles')}
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
            >
              <span>{labels.all_articles}</span>
              <FaChevronRight size={9} />
            </Link>
            <span className="text-[10px] text-slate-400 font-mono">ESC</span>
          </div>
        </div>
      )}
    </div>
  );
}
