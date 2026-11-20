export const SITE_CONFIG = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://dalaman.info').replace(/\/+$/, ''),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@dalaman.info',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905300000000',
  telegramBot: process.env.NEXT_PUBLIC_TELEGRAM_BOT || 'dalaman_concierge_bot',
  affiliates: {
    enabled: process.env.NEXT_PUBLIC_AFFILIATES_ENABLED === 'true',
    aviasalesMarker: process.env.NEXT_PUBLIC_AVIASALES_MARKER || '',
    localrentPartnerId: process.env.NEXT_PUBLIC_LOCALRENT_PARTNER_ID || '',
    bookingAid: process.env.NEXT_PUBLIC_BOOKING_AID || '',
    otelzPartnerId: process.env.NEXT_PUBLIC_OTELZ_PARTNER_ID || '',
    sputnik8PartnerId: process.env.NEXT_PUBLIC_SPUTNIK8_PARTNER_ID || '',
    tripsterPartnerId: process.env.NEXT_PUBLIC_TRIPSTER_PARTNER_ID || '',
    getyourguidePartnerId: process.env.NEXT_PUBLIC_GYG_PARTNER_ID || '',
    travelpayoutsDriveScript: process.env.NEXT_PUBLIC_TP_DRIVE_SCRIPT || 'https://emrldtp.com/NjA0MTM1.js?t=604135',
  },
  analytics: {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_ID || '',
    yandexMetrikaId: process.env.NEXT_PUBLIC_YM_ID || '',
  },
};

export function getWhatsAppUrl(text: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function getTelegramUrl(text: string): string {
  return `https://t.me/${SITE_CONFIG.telegramBot}?start=${encodeURIComponent(text)}`;
}
