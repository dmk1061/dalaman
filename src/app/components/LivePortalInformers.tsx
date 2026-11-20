"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaSun, FaCloudSun, FaCloudRain, FaWater, FaExchangeAlt } from 'react-icons/fa';

type LivePortalInformersProps = {
  locale?: string;
  variant?: 'topbar' | 'drawer';
};

interface WeatherState {
  tempC: number;
  seaTempC: number;
  weatherCode: number;
}

interface RatesState {
  eurTry: number;
  usdTry: number;
  tryRub: number;
}

// SOURCE [20.11.2026]: Метеоданные Даламана (36.7667°N, 28.8000°E) — Open-Meteo Forecast API (URL: https://api.open-meteo.com/v1/forecast?latitude=36.7667&longitude=28.8000&current_weather=true), температура поверхности моря в акватории Даламан/Сарыгерме (36.68°N, 28.78°E) — Open-Meteo Marine API (URL: https://marine-api.open-meteo.com/v1/marine?latitude=36.68&longitude=28.78&current=sea_surface_temperature) и MGM Dalaman (URL: https://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx?il=Mugla&ilce=Dalaman).
const DEFAULT_WEATHER: WeatherState = {
  tempC: 24,
  seaTempC: 22,
  weatherCode: 0,
};

// SOURCE [20.11.2026]: Курсы валют EUR/TRY, USD/TRY и TRY/RUB — Open Exchange Rates API (URL: https://open.er-api.com/v6/latest/TRY), ЦБ Турции TCMB (URL: https://www.tcmb.gov.tr/kurlar/today.xml) и ЦБ РФ (URL: https://www.cbr.ru/currency_base/daily/).
const DEFAULT_RATES: RatesState = {
  eurTry: 38.4,
  usdTry: 35.8,
  tryRub: 2.8,
};

export default function LivePortalInformers({
  locale = 'ru',
  variant = 'topbar',
}: LivePortalInformersProps) {
  const [weather, setWeather] = useState<WeatherState>(DEFAULT_WEATHER);
  const [rates, setRates] = useState<RatesState>(DEFAULT_RATES);

  useEffect(() => {
    let isMounted = true;

    // 1. Live Air Weather in Dalaman (Open-Meteo Forecast API)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=36.7667&longitude=28.8000&current_weather=true')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.current_weather && typeof data.current_weather.temperature === 'number') {
          setWeather((prev) => ({
            ...prev,
            tempC: Math.round(data.current_weather.temperature),
            weatherCode: Number(data.current_weather.weathercode || 0),
          }));
        }
      })
      .catch(() => {});

    // 2. Live Sea Surface Temperature off Dalaman / Sarıgerme coast (Open-Meteo Marine API)
    fetch('https://marine-api.open-meteo.com/v1/marine?latitude=36.68&longitude=28.78&current=sea_surface_temperature')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && typeof data?.current?.sea_surface_temperature === 'number') {
          setWeather((prev) => ({
            ...prev,
            seaTempC: Math.round(data.current.sea_surface_temperature),
          }));
        }
      })
      .catch(() => {});

    // 3. Live TRY Exchange Rates including EUR, USD, and RUB (Open Exchange Rates Public Endpoint)
    fetch('https://open.er-api.com/v6/latest/TRY')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.rates) {
          const eurRate = Number(data.rates.EUR);
          const usdRate = Number(data.rates.USD);
          const rubRate = Number(data.rates.RUB);
          setRates({
            eurTry: eurRate > 0 ? Math.round((1 / eurRate) * 10) / 10 : DEFAULT_RATES.eurTry,
            usdTry: usdRate > 0 ? Math.round((1 / usdRate) * 10) / 10 : DEFAULT_RATES.usdTry,
            tryRub: rubRate > 0 ? Math.round(rubRate * 100) / 100 : DEFAULT_RATES.tryRub,
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

  const dalamanLabel = locale === 'ru' ? 'Даламан' : 'Dalaman';
  const seaLabel =
    locale === 'ru'
      ? 'Море'
      : locale === 'de'
      ? 'Meer'
      : locale === 'tr'
      ? 'Deniz'
      : 'Sea';

  const weatherTooltip =
    locale === 'ru'
      ? 'Погода в Даламане и температура воды — открыть гид по климату и сезонам'
      : locale === 'de'
      ? 'Wetter & Wassertemperatur in Dalaman — Klima & Reisezeit'
      : locale === 'tr'
      ? 'Dalaman hava ve deniz suyu sıcaklığı — İklim rehberi'
      : 'Dalaman air & sea temperature — open climate & seasons guide';

  const ratesTooltip =
    locale === 'ru'
      ? 'Курс турецкой лиры (EUR / USD / RUB) — как выгодно менять деньги и платить в Даламане'
      : locale === 'de'
      ? 'Türkische Lira (TRY) Wechselkurs — Geldwechsel & Karten-Tipps'
      : locale === 'tr'
      ? 'Güncel Döviz Kuru (EUR / USD / RUB) — Döviz ve ödeme rehberi'
      : 'Turkish Lira (TRY) exchange rate — money & payment guide';

  const airSign = weather.tempC > 0 ? `+${weather.tempC}°C` : `${weather.tempC}°C`;
  const seaSign = weather.seaTempC > 0 ? `+${weather.seaTempC}°C` : `${weather.seaTempC}°C`;

  if (variant === 'drawer') {
    return (
      <div className="space-y-2">
        <Link
          href={localize('/articles/climate-and-seasons')}
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-50/70 border border-cyan-200/70 text-slate-800 hover:bg-cyan-100/70 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaSun className="text-amber-500 flex-shrink-0" size={14} />
            <span className="text-xs font-bold text-slate-700">
              {dalamanLabel}: <strong className="text-slate-900">{airSign}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaWater className="text-cyan-600 flex-shrink-0" size={12} />
            <span className="text-xs font-bold text-slate-700">
              {seaLabel}: <strong className="text-cyan-700">{seaSign}</strong>
            </span>
          </div>
        </Link>

        <Link
          href={localize('/articles/currency-exchange-and-payments')}
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-slate-800 hover:bg-emerald-100/70 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaExchangeAlt className="text-emerald-600 flex-shrink-0" size={12} />
            <span className="text-[11px] font-extrabold text-slate-900">
              1€ ≈ {rates.eurTry}₺ • 1$ ≈ {rates.usdTry}₺ • 1₺ ≈ {rates.tryRub}₽
            </span>
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
        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-800/75 hover:bg-cyan-800 text-cyan-50 border border-cyan-500/40 transition-colors text-[11px]"
      >
        {renderWeatherIcon()}
        <span>{dalamanLabel}:</span>
        <span className="font-extrabold text-white">{airSign}</span>
        <span className="text-cyan-300/70">•</span>
        <FaWater className="text-cyan-300" size={11} />
        <span>{seaLabel}:</span>
        <span className="font-extrabold text-white">{seaSign}</span>
      </Link>

      <Link
        href={localize('/articles/currency-exchange-and-payments')}
        title={ratesTooltip}
        className="hidden md:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-800/75 hover:bg-cyan-800 text-cyan-50 border border-cyan-500/40 transition-colors text-[11px]"
      >
        <FaExchangeAlt className="text-emerald-300" size={10} />
        <span className="font-bold text-white">1€ ≈ {rates.eurTry} ₺</span>
        <span className="text-cyan-300/70">•</span>
        <span className="font-bold text-white">1$ ≈ {rates.usdTry} ₺</span>
        <span className="text-cyan-300/70">•</span>
        <span className="font-bold text-white">1₺ ≈ {rates.tryRub} ₽</span>
      </Link>
    </div>
  );
}
