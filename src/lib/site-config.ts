export const SITE_CONFIG = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://dalaman.info').replace(/\/+$/, ''),
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL && process.env.NEXT_PUBLIC_CONTACT_EMAIL !== 'info@dalaman.info'
      ? process.env.NEXT_PUBLIC_CONTACT_EMAIL
      : 'dmk1061@gmail.com',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905300000000',
  telegramBot: process.env.NEXT_PUBLIC_TELEGRAM_BOT || 'dalaman_concierge_bot',
  affiliates: {
    enabled: process.env.NEXT_PUBLIC_AFFILIATES_ENABLED !== 'false',
    travelpayoutsMarker: process.env.NEXT_PUBLIC_TP_MARKER || '809006',
    travelpayoutsTrs: process.env.NEXT_PUBLIC_TP_TRS || '604146',
    aviasalesMarker: process.env.NEXT_PUBLIC_AVIASALES_MARKER || '',
    localrentPartnerId: process.env.NEXT_PUBLIC_LOCALRENT_PARTNER_ID || '',
    bookingAid: process.env.NEXT_PUBLIC_BOOKING_AID || '',
    otelzPartnerId: process.env.NEXT_PUBLIC_OTELZ_PARTNER_ID || '',
    sputnik8PartnerId: process.env.NEXT_PUBLIC_SPUTNIK8_PARTNER_ID || '',
    tripsterPartnerId: process.env.NEXT_PUBLIC_TRIPSTER_PARTNER_ID || '',
    getyourguidePartnerId: process.env.NEXT_PUBLIC_GYG_PARTNER_ID || '',
    travelpayoutsDriveScript: process.env.NEXT_PUBLIC_TP_DRIVE_SCRIPT || 'https://emrldtp.com/NjA0MTQ2.js?t=604146',
  },
  analytics: {
    // SOURCE [21.11.2026]: Google Analytics 4 поток данных dalaman.info (Stream ID: 16387303225, Measurement ID: G-P5HJ4VQVLV, URL: https://analytics.google.com)
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_ID || 'G-P5HJ4VQVLV',
    yandexMetrikaId: process.env.NEXT_PUBLIC_YM_ID || '',
  },
};

export function getWhatsAppUrl(text: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function getTelegramUrl(text: string): string {
  return `https://t.me/${SITE_CONFIG.telegramBot}?start=${encodeURIComponent(text)}`;
}
