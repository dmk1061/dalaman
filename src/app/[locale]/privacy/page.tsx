import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/site-config';
import { FaShieldAlt, FaHandshake, FaCookieBite, FaEnvelope } from 'react-icons/fa';

interface PrivacySection {
  title: string;
  paragraphs: string[];
}

interface PrivacyLocaleContent {
  badge: string;
  title: string;
  subtitle: string;
  updatedLabel: string;
  sections: {
    privacy: PrivacySection;
    affiliate: PrivacySection;
    cookies: PrivacySection;
    contacts: {
      title: string;
      text: string;
      contactBtn: string;
    };
  };
}

const privacyTranslations: Record<string, PrivacyLocaleContent> = {
  ru: {
    badge: 'ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ',
    title: 'Политика конфиденциальности и раскрытие партнёрских ссылок',
    subtitle:
      'Прозрачные правила обработки данных, использования cookies и работы партнёрских программ на портале Dalaman Guide (dalaman.info).',
    updatedLabel: 'Актуально на: ноябрь 2026',
    sections: {
      privacy: {
        title: '1. Политика конфиденциальности (Privacy Policy)',
        paragraphs: [
          'Информационный туристический портал Dalaman Guide (dalaman.info) не требует обязательной регистрации, не собирает и не хранит данные банковских карт, паспортные данные или платёжную информацию пользователей.',
          'При посещении сайта сервер автоматически обрабатывает только базовые технические сведения (IP-адрес в обезличенном виде, тип браузера, язык интерфейса и просмотренные страницы) для обеспечения стабильной работы, безопасности и анонимной статистики посещаемости.',
          'Бронирование авиабилетов, отелей, трансферов, аренды транспорта или туристических услуг происходит непосредственно на сайтах наших партнёров либо по вашему добровольному обращению через мессенджеры и электронную почту.',
        ],
      },
      affiliate: {
        title: '2. Раскрытие партнёрских ссылок (Affiliate Disclosure)',
        paragraphs: [
          'Портал dalaman.info участвует в партнёрских программах (включая международную сеть Travelpayouts) и содержит партнёрские ссылки на туристические сервисы: Aviasales, Localrent, BikesBooking, Kiwitaxi, GetTransfer, Airalo, Compensair, а также отельные и экскурсионные агрегаторы (Booking.com, Otelz.com, Trip.com, Ostrovok, GetYourGuide, Sputnik8, Tripster, Click&Boat, Viravira).',
          'При переходе по партнёрской ссылке и оформлении заказа или бронирования портал dalaman.info может получать небольшое вознаграждение (комиссию) от сервиса-партнёра. Для вас цена билета, отеля, авто, трансфера или eSIM остаётся абсолютно такой же — без каких-либо наценок и скрытых доплат.',
          'Полученные партнёрские комиссии позволяют нам поддерживать сайт, актуализировать расписания транспорта и цены в регионе «От Датчи до Каша» и развивать бесплатные интерактивные сервисы для путешественников.',
        ],
      },
      cookies: {
        title: '3. Файлы Cookies и сторонние сервисы',
        paragraphs: [
          'На сайте могут использоваться технические cookies и аналитические скрипты (в том числе скрипт учёта переходов Travelpayouts Drive), которые фиксируют факт перехода по партнёрской ссылке для корректного начисления комиссии партнёром.',
          'Когда вы переходите на сайт внешнего сервиса бронирования, действуют политика конфиденциальности и правила использования cookies соответствующей платформы.',
          'Вы в любой момент можете ограничить или полностью отключить сохранение файлов cookies в настройках вашего браузера.',
        ],
      },
      contacts: {
        title: '4. Контакты редакции',
        text: 'По любым вопросам, касающимся конфиденциальности, обработки данных или партнёрского сотрудничества, свяжитесь с нами по электронной почте:',
        contactBtn: 'Открыть страницу контактов →',
      },
    },
  },
  en: {
    badge: 'LEGAL & TRANSPARENCY',
    title: 'Privacy Policy & Affiliate Disclosure',
    subtitle:
      'Clear explanation of how Dalaman Guide (dalaman.info) handles visitor privacy, cookies, and affiliate partnerships across Turkey’s Turquoise Coast.',
    updatedLabel: 'Last updated: November 2026',
    sections: {
      privacy: {
        title: '1. Privacy Policy',
        paragraphs: [
          'Dalaman Guide (dalaman.info) is an independent regional travel guide. We do not require user accounts and do not collect, process, or store credit card numbers, passport details, or financial credentials on our servers.',
          'When you browse the website, standard technical logs (such as anonymized IP metrics, browser type, preferred language, and requested pages) may be processed solely for site security, performance, and aggregate traffic analytics.',
          'All bookings for flights, hotels, car rentals, airport transfers, eSIMs, and tours are completed directly on third-party partner platforms or via voluntary direct inquiries initiated by you.',
        ],
      },
      affiliate: {
        title: '2. Affiliate Disclosure',
        paragraphs: [
          'dalaman.info participates in affiliate marketing programs, including the Travelpayouts partnership network, and contains affiliate links to trusted travel providers such as Aviasales, Localrent, BikesBooking, Kiwitaxi, GetTransfer, Airalo, Compensair, as well as accommodation and activity aggregators (Booking.com, Otelz.com, Trip.com, Ostrovok, GetYourGuide, Sputnik8, Tripster, Click&Boat, Viravira).',
          'When you click an affiliate link on our portal and make a qualifying booking or purchase, we may earn a referral commission from the partner provider at strictly no extra cost to you.',
          'Affiliate revenue helps fund independent editorial research, verified regional transport schedules, and free interactive tools covering Datça, Marmaris, Dalaman, Göcek, Fethiye, and Kaş.',
        ],
      },
      cookies: {
        title: '3. Cookies & Third-Party Scripts',
        paragraphs: [
          'Our website may use essential technical cookies and affiliate attribution scripts (including Travelpayouts Drive) so partner platforms can recognize referrals coming from dalaman.info.',
          'Once you leave dalaman.info for an external booking website, your interaction is governed by that provider’s own privacy policy and cookie practices.',
          'You can block or delete cookies at any time through your browser settings.',
        ],
      },
      contacts: {
        title: '4. Contact Information',
        text: 'If you have any questions about this Privacy Policy, affiliate disclosures, or data protection, please reach out to our editorial team:',
        contactBtn: 'Go to Contact Page →',
      },
    },
  },
  de: {
    badge: 'RECHTLICHES & TRANSPARENZ',
    title: 'Datenschutzerklärung & Affiliate-Hinweis',
    subtitle:
      'Transparente Informationen zum Datenschutz, zu Cookies und zur Verwendung von Partnerlinks auf Dalaman Guide (dalaman.info).',
    updatedLabel: 'Stand: November 2026',
    sections: {
      privacy: {
        title: '1. Datenschutz (Privacy Policy)',
        paragraphs: [
          'Dalaman Guide (dalaman.info) ist ein unabhängiger Reiseführer. Für die Nutzung unseres Portals ist keine Registrierung erforderlich; wir erheben und speichern keine Kreditkarten-, Pass- oder Zahlungsdaten.',
          'Beim Besuch unserer Seiten werden lediglich technisch notwendige Serverdaten (z. B. Browsertyp, gewählte Sprache und aufgerufene URLs) zur Gewährleistung von Sicherheit, Stabilität und anonymer Reichweitenmessung verarbeitet.',
          'Buchungen von Flügen, Hotels, Mietwagen, Transfers, eSIMs oder Ausflügen erfolgen direkt über die Webseiten der jeweiligen Anbieter oder über von Ihnen freiwillig gesendete Anfragen.',
        ],
      },
      affiliate: {
        title: '2. Affiliate-Hinweis (Affiliate Disclosure)',
        paragraphs: [
          'dalaman.info nimmt an Partnerprogrammen (u. a. über das Netzwerk Travelpayouts) teil und enthält Affiliate-Links zu Anbietern wie Aviasales, Localrent, BikesBooking, Kiwitaxi, GetTransfer, Airalo, Compensair sowie Hotel- und Tourenplattformen (Booking.com, Otelz.com, Trip.com, Ostrovok, GetYourGuide, Sputnik8, Tripster, Click&Boat, Viravira).',
          'Wenn Sie über einen Partnerlink auf dalaman.info buchen, erhalten wir unter Umständen eine Vermittlungsprovision. Für Sie entstehen dadurch keinerlei Mehrkosten – die Preise bleiben identisch.',
          'Diese Einnahmen ermöglichen es uns, den Reiseführer für die Region von Datça bis Kaş kostenlos, aktuell und unabhängig zu betreiben.',
        ],
      },
      cookies: {
        title: '3. Cookies & Drittanbieter-Skripte',
        paragraphs: [
          'Unsere Website kann funktionale Cookies sowie Affiliate-Zuordnungsskripte (z. B. Travelpayouts Drive) einsetzen, damit Partnerplattformen Buchungen korrekt zuordnen können.',
          'Sobald Sie über einen Link zu einem externen Buchungsportal wechseln, gelten die Datenschutz- und Cookie-Bestimmungen des jeweiligen Anbieters.',
          'Sie können Cookies jederzeit in den Einstellungen Ihres Browsers deaktivieren oder löschen.',
        ],
      },
      contacts: {
        title: '4. Kontakt',
        text: 'Bei Fragen zum Datenschutz oder zu unseren Partnerschaften erreichen Sie uns jederzeit per E-Mail:',
        contactBtn: 'Zur Kontaktseite →',
      },
    },
  },
  tr: {
    badge: 'YASAL BİLGİLENDİRME VE ŞEFFAFLIK',
    title: 'Gizlilik Politikası ve İş Ortaklığı (Affiliate) Bildirimi',
    subtitle:
      'Dalaman Guide (dalaman.info) portalında gizlilik ilkeleri, çerez kullanımı ve satış ortaklığı bağlantıları hakkında şeffaf bilgilendirme.',
    updatedLabel: 'Güncelleme: Kasım 2026',
    sections: {
      privacy: {
        title: '1. Gizlilik Politikası',
        paragraphs: [
          'Dalaman Guide (dalaman.info) bağımsız bir bölge gezi rehberidir. Sitemizi kullanmak için üyelik gerekmez; sunucularımızda kredi kartı, pasaport veya ödeme bilgisi toplanmaz ve saklanmaz.',
          'Siteyi ziyaret ettiğinizde yalnızca güvenlik, performans ve anonim ziyaret istatistikleri amacıyla temel teknik erişim kayıtları (tarayıcı türü, tercih edilen dil ve görüntülenen sayfalar) işlenebilir.',
          'Uçak bileti, konaklama, araç kiralama, havalimanı transferi, eSIM ve tur rezervasyonları doğrudan ilgili iş ortağı platformları üzerinden veya kendi isteğinizle başlattığınız iletişim kanallarından gerçekleştirilir.',
        ],
      },
      affiliate: {
        title: '2. İş Ortaklığı (Affiliate) Bildirimi',
        paragraphs: [
          'dalaman.info, Travelpayouts ağı dahil olmak üzere çeşitli seyahat iş ortaklığı programlarına katılmaktadır ve Aviasales, Localrent, BikesBooking, Kiwitaxi, GetTransfer, Airalo, Compensair ile konaklama/tur platformlarına (Booking.com, Otelz.com, Trip.com, Ostrovok, GetYourGuide, Sputnik8, Tripster, Click&Boat, Viravira) yönlendiren iş ortaklığı bağlantıları içerir.',
          'Sitemizdeki bir iş ortaklığı bağlantısı üzerinden rezervasyon veya satın alma yaptığınızda, size hiçbir ek maliyet yansıtılmadan ilgili platformdan yönlendirme komisyonu kazanabiliriz.',
          'Bu gelirler, Datça’dan Kaş’a uzanan bölge rehberimizi, güncel ulaşım bilgilerini ve ücretsiz planlama araçlarını sürdürmemize katkı sağlar.',
        ],
      },
      cookies: {
        title: '3. Çerezler ve Üçüncü Taraf Hizmetleri',
        paragraphs: [
          'Sitemizde teknik çerezler ve yönlendirme takibi sağlayan iş ortaklığı betikleri (örneğin Travelpayouts Drive) kullanılabilir.',
          'Harici bir rezervasyon sitesine geçiş yaptığınızda, ilgili platformun kendi gizlilik politikası ve çerez kuralları geçerli olur.',
          'Tarayıcı ayarlarınız üzerinden çerez kullanımını dilediğiniz zaman kısıtlayabilir veya devre dışı bırakabilirsiniz.',
        ],
      },
      contacts: {
        title: '4. İletişim',
        text: 'Gizlilik politikası, veri güvenliği veya iş birlikleri ile ilgili her türlü sorunuz için bizimle iletişime geçebilirsiniz:',
        contactBtn: 'İletişim Sayfasına Git →',
      },
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const activeLocale = params?.locale || 'en';
  const t = privacyTranslations[activeLocale] || privacyTranslations.en;

  return buildPageMetadata({
    locale: activeLocale,
    pathname: '/privacy',
    title: t.title,
    description: t.subtitle,
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'de' }, { locale: 'tr' }];
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const activeLocale = params?.locale || 'en';
  const t = privacyTranslations[activeLocale] || privacyTranslations.en;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header locale={activeLocale} />

      <main className="flex-grow container mx-auto px-4 py-12 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-14 premium-shadow border border-slate-100 space-y-10">
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-50 text-cyan-700 font-black text-[11px] uppercase tracking-widest border border-cyan-100">
              {t.badge}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {t.subtitle}
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.updatedLabel}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <FaShieldAlt className="text-cyan-600 flex-shrink-0" />
              <span>{t.sections.privacy.title}</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              {t.sections.privacy.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>

          <section className="space-y-4 bg-cyan-50/50 rounded-3xl p-6 md:p-8 border border-cyan-100">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <FaHandshake className="text-cyan-600 flex-shrink-0" />
              <span>{t.sections.affiliate.title}</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              {t.sections.affiliate.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <FaCookieBite className="text-amber-500 flex-shrink-0" />
              <span>{t.sections.cookies.title}</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              {t.sections.cookies.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <FaEnvelope className="text-cyan-600 flex-shrink-0" />
              <span>{t.sections.contacts.title}</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{t.sections.contacts.text}</p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="text-sm font-black text-cyan-700 hover:text-cyan-600 underline underline-offset-4"
              >
                {SITE_CONFIG.contactEmail}
              </a>
              <Link
                href={`/${activeLocale}/contacts`}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-colors"
              >
                {t.sections.contacts.contactBtn}
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer locale={activeLocale} />
    </div>
  );
}
