"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaSun, FaCloudSun, FaCloudRain, FaExchangeAlt } from 'react-icons/fa';

type LivePortalInformersProps = {
  locale?: string;
  variant?: 'topbar' | 'drawer';
};

interface WeatherState {
  tempC: number;
  weatherCode: number;
}

interface RatesState {
  eurTry: number;
  usdTry: number;
}

// SOURCE [20.11.2026]: Метеоданные Даламана (координаты 36.7667°N, 28.8000°E) — Open-Meteo Forecast API (URL: https://api.open-meteo.com/v1/forecast?latitude=36.7667&longitude=28.8000&current_weather=true) и Турецкая государственная метеослужба MGM Dalaman (URL: https://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx?il=Mugla&ilce=Dalaman).
const DEFAULT_WEATHER: WeatherState = {
  tempC: 24,
  weatherCode: 0,
};

// SOURCE [20.11.2026]: Курсы валют ЦБ Турции (TCMB, URL: https://www.tcmb.gov.tr/kurlar/today.xml) и Европейского ЦБ через Frankfurter API (URL: https://api.frankfurter.app/latest?from=EUR&to=TRY,USD). Используются как начальный ориентир до загрузки live-ответа API в браузере.
const DEFAULT_RATES: RatesState = {
  eurTry: 38.4,
  usdTry: 35.8,
};

export default function LivePortalInformers({
  locale = 'ru',
  variant = 'topbar',
}: LivePortalInformersProps) {
  const [weather, setWeather] = useState<WeatherState>(DEFAULT_WEATHER);
  const [rates, setRates] = useState<RatesState>(DEFAULT_RATES);

  useEffect(() => {
    let isMounted = true;

    // 1. Live Weather in Dalaman (Open-Meteo public API, no key required)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=36.7667&longitude=28.8000&current_weather=true')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.current_weather && typeof data.current_weather.temperature === 'number') {
          setWeather({
            tempC: Math.round(data.current_weather.temperature),
            weatherCode: Number(data.current_weather.weathercode || 0),
          });
        }
      })
      .catch(() => {});

    // 2. Live TRY Exchange Rates (Frankfurter ECB public API, no key required)
    fetch('https://api.frankfurter.app/latest?from=EUR&to=TRY,USD')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.rates?.TRY && data?.rates?.USD) {
          const eurTry = Number(data.rates.TRY);
          const eurUsd = Number(data.rates.USD);
          const usdTry = eurUsd > 0 ? eurTry / eurUsd : DEFAULT_RATES.usdTry;
          setRates({
            eurTry: Math.round(eurTry * 10) / 10,
            usdTry: Math.round(usdTry * 10) / 10,
          });
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const localize = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  const renderWeatherIcon = () => {
    if (weather.weatherCode >= 51) {
      return <FaCloudRain className="text-sky-300" size={12} />;
    }
    if (weather.weatherCode >= 2) {
      return <FaCloudSun className="text-amber-300" size={12} />;
    }
    return <FaSun className="text-amber-300" size={12} />;
  };

  const dalamanLabel =
    locale === 'ru'
      ? 'Даламан'
      : locale === 'de'
      ? 'Dalaman'
      : locale === 'tr'
      ? 'Dalaman'
      : 'Dalaman';

  const weatherTooltip =
    locale === 'ru'
      ? 'Погода в Даламане сейчас — открыть гид по климату и сезонам'
      : locale === 'de'
      ? 'Aktuelles Wetter in Dalaman — Klima & Reisezeit öffnen'
      : locale === 'tr'
      ? 'Dalaman güncel hava durumu — İklim ve sezon rehberi'
      : 'Current weather in Dalaman — open climate & seasons guide';

  const ratesTooltip =
    locale === 'ru'
      ? 'Курс турецкой лиры (TRY) — как выгодно менять деньги и платить картами'
      : locale === 'de'
      ? 'Türkische Lira (TRY) Wechselkurs — Geldwechsel & Karten-Tipps'
      : locale === 'tr'
      ? 'Güncel Döviz Kuru (EUR/USD) — Döviz ve ödeme rehberi'
      : 'Turkish Lira (TRY) exchange rate — money & payment guide';

  const sign = weather.tempC > 0 ? `+${weather.tempC}°C` : `${weather.tempC}°C`;

  if (variant === 'drawer') {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Link
          href={localize('/articles/climate-and-seasons')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-50/70 border border-cyan-200/70 text-slate-800 hover:bg-cyan-100/70 transition-colors"
        >
          <span className="text-amber-500 flex-shrink-0">
            <FaSun size={14} />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">{dalamanLabel}</div>
            <div className="text-xs font-extrabold text-slate-900">{sign}</div>
          </div>
        </Link>
        <Link
          href={localize('/articles/currency-exchange-and-payments')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-slate-800 hover:bg-emerald-100/70 transition-colors"
        >
          <span className="text-emerald-600 flex-shrink-0">
            <FaExchangeAlt size={13} />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">EUR / USD</div>
            <div className="text-xs font-extrabold text-slate-900">
              €{rates.eurTry}₺ • ${rates.usdTry}₺
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-2 lg:gap-2.5">
      <Link
        href={localize('/articles/climate-and-seasons')}
        title={weatherTooltip}
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-800/70 hover:bg-cyan-800 text-cyan-50 border border-cyan-500/40 transition-colors text-[11px]"
      >
        {renderWeatherIcon()}
        <span>{dalamanLabel}:</span>
        <span className="font-extrabold text-white">{sign}</span>
      </Link>

      <Link
        href={localize('/articles/currency-exchange-and-payments')}
        title={ratesTooltip}
        className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-800/70 hover:bg-cyan-800 text-cyan-50 border border-cyan-500/40 transition-colors text-[11px]"
      >
        <FaExchangeAlt className="text-emerald-300" size={10} />
        <span className="font-bold text-white">1€ ≈ {rates.eurTry} ₺</span>
        <span className="text-cyan-300/70">•</span>
        <span className="font-bold text-white">1$ ≈ {rates.usdTry} ₺</span>
      </Link>
    </div>
  );
}
