export interface TaxiDestination {
  id: string;
  name: Record<string, string>;
  distanceKm: number;
  durationMin: number;
  fixedEur: number;
  otogarGps: string;
  otogarName: Record<string, string>;
}

export const UKOME_TAXI_RATES = {
  OPENING_TRY: 40,
  RATE_PER_KM_TRY: 30,
  MIN_FARE_TRY: 100,
};

export const TAXI_DESTINATIONS: TaxiDestination[] = [
  {
    id: 'dalaman',
    name: {
      ru: 'Даламан (город)',
      en: 'Dalaman (city)',
      de: 'Dalaman (Stadt)',
      tr: 'Dalaman (ilçe)'
    },
    distanceKm: 6,
    durationMin: 10,
    fixedEur: 15,
    otogarGps: '36.7646, 28.8028',
    otogarName: {
      ru: 'Автостанция Даламана',
      en: 'Dalaman Bus Stop',
      de: 'Dalaman Busbahnhof',
      tr: 'Dalaman Otogarı'
    }
  },
  {
    id: 'gocek',
    name: {
      ru: 'Гёджек',
      en: 'Göcek',
      de: 'Göcek',
      tr: 'Göcek'
    },
    distanceKm: 22,
    durationMin: 25,
    fixedEur: 25,
    otogarGps: '36.7538, 28.9405',
    otogarName: {
      ru: 'Остановка долмушей Гёджека',
      en: 'Göcek Dolmuş Station',
      de: 'Göcek Dolmuş-Haltestelle',
      tr: 'Göcek Dolmuş Durağı'
    }
  },
  {
    id: 'dalyan',
    name: {
      ru: 'Дальян',
      en: 'Dalyan',
      de: 'Dalyan',
      tr: 'Dalyan'
    },
    distanceKm: 30,
    durationMin: 35,
    fixedEur: 35,
    otogarGps: '36.8407, 28.6433',
    otogarName: {
      ru: 'Автостанция Дальяна',
      en: 'Dalyan Dolmuş Terminal',
      de: 'Dalyan Dolmuş Garajı',
      tr: 'Dalyan Dolmuş İstasyonu'
    }
  },
  {
    id: 'sarigerme',
    name: {
      ru: 'Сарыгерме',
      en: 'Sarıgerme',
      de: 'Sarıgerme',
      tr: 'Sarıgerme'
    },
    distanceKm: 16,
    durationMin: 20,
    fixedEur: 25,
    otogarGps: '36.7212, 28.7015',
    otogarName: {
      ru: 'Центр Сарыгерме (долмуши)',
      en: 'Sarıgerme Center (Dolmuş)',
      de: 'Sarıgerme Zentrum (Dolmuş)',
      tr: 'Sarıgerme Merkez (Dolmuş)'
    }
  },
  {
    id: 'fethiye',
    name: {
      ru: 'Фетхие',
      en: 'Fethiye',
      de: 'Fethiye',
      tr: 'Fethiye'
    },
    distanceKm: 49,
    durationMin: 45,
    fixedEur: 45,
    otogarGps: '36.6276, 29.1413',
    otogarName: {
      ru: 'Автовокзал Фетхие (Otogar)',
      en: 'Fethiye Bus Terminal (Otogar)',
      de: 'Fethiye Busbahnhof (Otogar)',
      tr: 'Fethiye Otogarı'
    }
  },
  {
    id: 'marmaris',
    name: {
      ru: 'Мармарис',
      en: 'Marmaris',
      de: 'Marmaris',
      tr: 'Marmaris'
    },
    distanceKm: 95,
    durationMin: 75,
    fixedEur: 55,
    otogarGps: '36.8624, 28.2573',
    otogarName: {
      ru: 'Автовокзал Мармариса (Otogar)',
      en: 'Marmaris Bus Terminal (Otogar)',
      de: 'Marmaris Busbahnhof (Otogar)',
      tr: 'Marmaris Otogarı'
    }
  },
  {
    id: 'kas',
    name: {
      ru: 'Каш',
      en: 'Kaş',
      de: 'Kaш',
      tr: 'Kaş'
    },
    distanceKm: 148,
    durationMin: 120,
    fixedEur: 95,
    otogarGps: '36.2025, 29.6389',
    otogarName: {
      ru: 'Автовокзал Каша (Otogar)',
      en: 'Kaş Bus Terminal (Otogar)',
      de: 'Kaş Busbahnhof (Otogar)',
      tr: 'Kaş Otogarı'
    }
  },
  {
    id: 'dacha',
    name: {
      ru: 'Датча',
      en: 'Datça',
      de: 'Datça',
      tr: 'Datça'
    },
    distanceKm: 162,
    durationMin: 140,
    fixedEur: 110,
    otogarGps: '36.7262, 27.6896',
    otogarName: {
      ru: 'Автовокзал Датчи (Otogar)',
      en: 'Datça Bus Terminal (Otogar)',
      de: 'Datça Busbahnhof (Otogar)',
      tr: 'Datça Otogarı'
    }
  },
  {
    id: 'koycegiz',
    name: {
      ru: 'Кёйджегиз',
      en: 'Köyceğiz',
      de: 'Köyceğiz',
      tr: 'Köyceğiz'
    },
    distanceKm: 35,
    durationMin: 35,
    fixedEur: 35,
    otogarGps: '36.9634, 28.6948',
    otogarName: {
      ru: 'Автостанция Кёйджегиза',
      en: 'Köyceğiz Bus Terminal',
      de: 'Köyceğiz Busbahnhof',
      tr: 'Köyceğiz Otogarı'
    }
  }
];

export interface FerryRoute {
  id: string;
  from: Record<string, string>;
  to: Record<string, string>;
  gps: string;
  portName: Record<string, string>;
  scheduleLink: string;
  typicalDuration: string;
}

export const FERRY_ROUTES: FerryRoute[] = [
  {
    id: 'marmaris-rhodes',
    from: { ru: 'Мармарис', en: 'Marmaris', de: 'Marmaris', tr: 'Marmaris' },
    to: { ru: 'о. Родос (Греция)', en: 'Rhodes Island (Greece)', de: 'Insel Rhodos (Griechenland)', tr: 'Rodos Adası (Yunanistan)' },
    gps: '36.8491, 28.2792',
    portName: { ru: 'Порт Marmaris Cruise Port', en: 'Marmaris Cruise Port Terminal', de: 'Marmaris Cruise Port', tr: 'Marmaris Kruvaziyer Limanı' },
    scheduleLink: 'https://www.marmarisferry.com',
    typicalDuration: '1h'
  },
  {
    id: 'fethiye-rhodes',
    from: { ru: 'Фетхие', en: 'Fethiye', de: 'Fethiye', tr: 'Fethiye' },
    to: { ru: 'о. Родос (Греция)', en: 'Rhodes Island (Greece)', de: 'Insel Rhodos (Griechenland)', tr: 'Rodos Adası (Yunanistan)' },
    gps: '36.6228, 29.1096',
    portName: { ru: 'Порт Fethiye Port', en: 'Fethiye Passenger Port', de: 'Fethiye Hafen', tr: 'Fethiye Limanı' },
    scheduleLink: 'https://www.tilostravel.com',
    typicalDuration: '1h 30m'
  },
  {
    id: 'datca-bodrum',
    from: { ru: 'Датча', en: 'Datça', de: 'Datça', tr: 'Datça' },
    to: { ru: 'Бодрум', en: 'Bodrum', de: 'Bodrum', tr: 'Bodrum' },
    gps: '36.7709, 27.6178',
    portName: { ru: 'Паромный причал Körmen', en: 'Körmen Ferry Pier (Datça)', de: 'Körmen Fähranleger (Datça)', tr: 'Körmen Feribot İskelesi' },
    scheduleLink: 'https://www.bodrumferibot.com',
    typicalDuration: '1h 45m'
  }
];
