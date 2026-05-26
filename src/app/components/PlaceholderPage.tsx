import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FaToolbox, FaCompass } from 'react-icons/fa';
import Link from 'next/link';

type PlaceholderPageProps = {
    title: string;
    description: string;
    locale?: string;
    keyId?: string;
};

const placeholderTranslations: Record<string, { go_home: string; all_cities: string }> = {
  en: { go_home: "Go Home", all_cities: "All Cities" },
  ru: { go_home: "На главную", all_cities: "Все города" },
  de: { go_home: "Hauptseite", all_cities: "Alle Städte" },
  tr: { go_home: "Ana Sayfa", all_cities: "Tüm Şehirler" }
};

const keyTranslations: Record<string, Record<string, { title: string; description: string }>> = {
  'small-towns': {
    en: { title: "Small Towns & Villages", description: "This section is under development. Soon there will be travel guides for the charming small towns and villages of the Lycian coast." },
    ru: { title: "Малые города и деревни", description: "Этот раздел находится в разработке. Скоро здесь появятся путеводители по очаровательным малым городам и деревням Ликийского побережья." },
    de: { title: "Kleinstädte & Dörfer", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier Reiseführer für die charmanten Kleinstädte und Dörfer der lykischen Küste." },
    tr: { title: "Küçük Kasabalar ve Köyler", description: "Bu bölüm yapım aşamasındadır. Yakında Likya kıyısının büyüleyici küçük kasabaları ve köyleri için seyahat rehberleri burada yer alacaktır." }
  },
  'contacts': {
    en: { title: "Contacts", description: "This section is under development. Soon there will be a feedback form, our phone numbers, and address." },
    ru: { title: "Контакты", description: "Этот раздел находится в разработке. Скоро здесь появится форма обратной связи, наши телефоны и адрес." },
    de: { title: "Kontakte", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier ein Kontaktformular, unsere Telefonnummern und unsere Adresse." },
    tr: { title: "İletişim", description: "Bu bölüm yapım aşamasındadır. Yakında bir geri bildirim formu, telefon numaralarımız ve adresimiz burada yer alacaktır." }
  },
  'dalaman-guide': {
    en: { title: "Dalaman Guide", description: "This section is under development. Soon there will be a detailed guide to the city of Dalaman and its surroundings." },
    ru: { title: "Гид по Даламану", description: "Этот раздел находится в разработке. Скоро здесь появится подробный гид по городу Даламан и его окрестностям." },
    de: { title: "Dalaman Führer", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier einen detaillierten Führer durch die Stadt Dalaman und ihre Umgebung." },
    tr: { title: "Dalaman Rehberi", description: "Bu bölüm yapım aşamasındadır. Yakında Dalaman şehri ve çevresi için ayrıntılı bir rehber burada yer alacaktır." }
  },
  'pharmacies': {
    en: { title: "Duty Pharmacies", description: "This section is under development. Soon there will be an up-to-date list and addresses of duty pharmacies in the Dalaman region and surroundings." },
    ru: { title: "Дежурные аптеки", description: "Этот раздел находится в разработке. Скоро здесь появится актуальный список и адреса дежурных аптек в регионе Даламан и окрестностях." },
    de: { title: "Bereitschaftsapotheken", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier eine aktuelle Liste und Adressen der Bereitschaftsapotheken in der Region Dalaman und Umgebung." },
    tr: { title: "Nöbetçi Eczaneler", description: "Bu bölüm yapım aşamasındadır. Yakında Dalaman bölgesi ve çevresindeki nöbetçi eczanelerin güncel bir listesi ve adresleri burada yer alacaktır." }
  },
  'car-rental': {
    en: { title: "Car Rental", description: "This section is under development. Soon there will be information about our car rental services on the Lycian coast." },
    ru: { title: "Аренда авто", description: "Этот раздел находится в разработке. Скоро здесь появится информация о наших услугах по аренде автомобилей на Ликийском побережье." },
    de: { title: "Autovermietung", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier Informationen über unsere Autovermietung an der lykischen Küste." },
    tr: { title: "Araç Kiralama", description: "Bu bölüm yapım aşamasındadır. Yakında Likya kıyısındaki araç kiralama hizmetlerimiz hakkında bilgiler burada yer alacaktır." }
  },
  'diving': {
    en: { title: "Diving", description: "This section is under development. Soon there will be information about diving centers and the best dive spots." },
    ru: { title: "Дайвинг", description: "Этот раздел находится в разработке. Скоро здесь появится информация о дайвинг-центрах и лучших местах для погружений." },
    de: { title: "Tauchen", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier Informationen über Tauchzentren und die besten Tauchplätze." },
    tr: { title: "Dalış", description: "Bu bölüm yapım aşamasındadır. Yakında dalış merkezleri ve en iyi dalış noktaları hakkında bilgiler burada yer alacaktır." }
  },
  'excursions-tours': {
    en: { title: "Excursions & Tours", description: "This section is under development. Soon you will find the best excursions and tours along the Lycian coast." },
    ru: { title: "Экскурсии и туры", description: "Этот раздел находится в разработке. Скоро здесь вы найдете лучшие экскурсии и туры по Ликийскому побережью." },
    de: { title: "Ausflüge & Touren", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier die besten Ausflüge und Touren an der lykischen Küste." },
    tr: { title: "Geziler ve Turlar", description: "Bu bölüm yapım aşamasındadır. Yakında Likya kıyısı boyunca en iyi gezileri ve turları burada bulacaksınız." }
  },
  'real-estate': {
    en: { title: "Real Estate", description: "This section is under development. Soon there will be information about buying and renting real estate in the region." },
    ru: { title: "Недвижимость", description: "Этот раздел находится в разработке. Скоро здесь появится информация о покупке и аренде недвижимости в регионе." },
    de: { title: "Immobilien", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier Informationen über den Kauf und die Vermietung von Immobilien in der Region." },
    tr: { title: "Emlak", description: "Bu bölüm yapım aşamasındadır. Yakında bölgede emlak alımı ve kiralanması hakkında bilgiler burada yer alacaktır." }
  },
  'transfers': {
    en: { title: "Transfers", description: "This section is under development. Soon there will be information about our services for organizing transfers from Dalaman airport." },
    ru: { title: "Трансферы", description: "Этот раздел находится в разработке. Скоро здесь появится информация о наших услугах по организации трансферов из аэропорта Даламан." },
    de: { title: "Transfers", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier Informationen über unsere Dienstleistungen zur Organisation von Transfers vom Flughafen Dalaman." },
    tr: { title: "Transferler", description: "Bu bölüm yapım aşamasındadır. Yakında Dalaman Havalimanı'ndan transfer organize etme hizmetlerimiz hakkında bilgiler burada yer alacaktır." }
  },
  'tuna-fishing': {
    en: { title: "Spearfishing for Tuna", description: "This section is under development. Soon there will be information about organizing spearfishing tours." },
    ru: { title: "Подводная охота на тунца", description: "Этот раздел находится в разработке. Скоро здесь появится информация об организации туров по подводной охоте." },
    de: { title: "Speerfischen auf Thunfisch", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier Informationen über die Organisation von Speerfischtouren." },
    tr: { title: "Orkinos Zıpkın Avcılığı", description: "Bu bölüm yapım aşamasındadır. Yakında zıpkınla avcılık turlarının düzenlenmesi hakkında bilgiler burada yer alacaktır." }
  },
  'yacht-rental': {
    en: { title: "Yacht Rental", description: "This section is under development. Soon there will be information about yacht rentals and boat trips." },
    ru: { title: "Аренда яхт", description: "Этот раздел находится в разработке. Скоро здесь появится информация об аренде яхт и морских прогулках." },
    de: { title: "Yachtcharter", description: "Dieser Bereich befindet sich in der Entwicklung. In Kürze finden Sie hier Informationen über Yachtcharter und Bootsausflüge." },
    tr: { title: "Yat Kiralama", description: "Bu bölüm yapım aşamasındadır. Yakında yat kiralama ve tekne turları hakkında bilgiler burada yer alacaktır." }
  }
};

const PlaceholderPage = ({ title, description, locale = 'en', keyId }: PlaceholderPageProps) => {
    const activeLocale = locale || 'en';
    const t = placeholderTranslations[activeLocale] || placeholderTranslations['en'];
    
    const translation = keyId && keyTranslations[keyId] ? keyTranslations[keyId][activeLocale] || keyTranslations[keyId]['en'] : null;
    const activeTitle = translation ? translation.title : title;
    const activeDescription = translation ? translation.description : description;

    const localize = (path: string) => {
      if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/${activeLocale}${cleanPath}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            
            <Header locale={activeLocale} />
            <main className="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
                {/* Visual backdrops */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 text-center premium-shadow">
                    <div className="inline-flex items-center justify-center p-6 bg-cyan-50 text-cyan-600 rounded-3xl mb-8 transform -rotate-6 shadow-md">
                        <FaToolbox size={48} className="animate-pulse" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase italic tracking-tight">
                        {activeTitle}
                    </h1>
                    
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-10 max-w-lg mx-auto">
                        {activeDescription}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href={localize('/')} 
                            className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-cyan-600 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <FaCompass /> {t.go_home}
                        </Link>
                        <Link 
                            href={localize('/city-guide')} 
                            className="px-8 py-4 bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-100 transition-all shadow-md hover:scale-105 active:scale-95"
                        >
                            {t.all_cities}
                        </Link>
                    </div>
                </div>
            </main>
            
            <Footer locale={activeLocale} />
        </div>
    );
};

export default PlaceholderPage;