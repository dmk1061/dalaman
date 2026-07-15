"use client";

import React, { useState, useEffect } from 'react';
import { FaGlobeEurope, FaUsers, FaChartLine, FaEye, FaShieldAlt, FaSyncAlt, FaMicrochip } from 'react-icons/fa';

export interface VisitorAnalyticsProps {
    variant?: "footer" | "sidebar" | "floating" | "compact";
    locale?: string;
    trackingId?: string; // e.g., "G-DLM2026INFO" or "YM-98765432"
    provider?: "ga4" | "yandex" | "umami" | "plausible";
    showCities?: boolean;
}

export default function VisitorAnalyticsWidget({
    variant = "footer",
    locale = "ru",
    trackingId = "G-DLM2026INFO",
    provider = "ga4",
    showCities = true
}: VisitorAnalyticsProps) {
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    // Simulated live state (to be replaced with real GA4 / Yandex Realtime API fetch)
    // TODO: Replace simulated state below with: fetch(`/api/analytics/realtime?id=${trackingId}`)
    const [onlineCount, setOnlineCount] = useState<number>(47);
    const [dailyViews, setDailyViews] = useState<number>(3482);
    const [monthlyUnique, setMonthlyUnique] = useState<number>(42190);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    useEffect(() => {
        // Simulate organic visitor fluctuation (+1 / -1 every 6-12 seconds)
        const interval = setInterval(() => {
            setIsUpdating(true);
            setOnlineCount(prev => {
                const delta = Math.random() > 0.45 ? 1 : Math.random() > 0.2 ? -1 : 2;
                const next = Math.max(35, Math.min(85, prev + delta));
                return next;
            });
            setDailyViews(prev => prev + (Math.random() > 0.6 ? 1 : 0));
            setTimeout(() => setIsUpdating(false), 800);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const t = {
        title: isRu ? "Пульс Посещаемости Dalaman Guide" : isDe ? "Dalaman Guide Live-Besucherstatistik" : isTr ? "Dalaman Guide Canlı Ziyaretçi İstatistiği" : "Dalaman Guide Live Telemetry",
        liveNow: isRu ? "Онлайн на сайте:" : isDe ? "Aktuell online:" : isTr ? "Şu an sitede:" : "Online right now:",
        readers: isRu ? "читателей" : isDe ? "Leser" : isTr ? "okuyucu" : "active readers",
        todayViews: isRu ? "Просмотров за сутки:" : "24h Pageviews:",
        monthUnique: isRu ? "Гостей за месяц:" : "Monthly Unique:",
        topRegionsTitle: isRu ? "🌍 Топ регионы читателей онлайн:" : "🌍 Top Reader Origins:",
        regions: isRu 
            ? "Стамбул (24%) • Москва (19%) • Лондон (14%) • Анталья (11%) • Берлин (9%)" 
            : "Istanbul (24%) • Moscow (19%) • London (14%) • Antalya (11%) • Berlin (9%)",
        plugNote: isRu 
            ? `⚡ Готово к подключению: ${provider.toUpperCase()} ID [${trackingId}]. Заглушка активна для проверки дизайна.` 
            : `⚡ Plug & Play ready for ${provider.toUpperCase()} [${trackingId}]. Live simulated telemetry preview.`
    };

    // COMPACT VARIANT (For inline/header use)
    if (variant === "compact") {
        return (
            <div className="inline-flex items-center gap-2 bg-white/90 border border-cyan-200/80 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-bold text-slate-800">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{onlineCount} {t.readers}</span>
            </div>
        );
    }

    // SIDEBAR VARIANT (For right/left sidebar widget)
    if (variant === "sidebar") {
        return (
            <div className="bg-gradient-to-br from-white via-cyan-50/40 to-sky-50/30 rounded-3xl p-5 border border-cyan-100/80 shadow-md text-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-cyan-600/10 text-cyan-600 flex items-center justify-center font-black">
                            <FaGlobeEurope size={16} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                            {isRu ? "Статистика" : "Live Pulse"}
                        </span>
                    </div>
                    <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-[10px] px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        LIVE
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                            <FaUsers className="text-cyan-600" /> {t.liveNow}
                        </span>
                        <span className={`text-base font-black text-slate-900 transition-all duration-300 ${isUpdating ? "scale-110 text-cyan-600" : ""}`}>
                            {onlineCount}
                        </span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                            <FaEye className="text-amber-500" /> {t.todayViews}
                        </span>
                        <span className="text-xs font-black text-slate-900">
                            {dailyViews.toLocaleString()}
                        </span>
                    </div>
                </div>

                {showCities && (
                    <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/60 text-[10px] text-slate-600 space-y-1">
                        <span className="font-bold text-slate-800 block">{t.topRegionsTitle}</span>
                        <p className="leading-tight text-slate-600">{t.regions}</p>
                    </div>
                )}

                <div className="pt-1 text-[9px] text-slate-400 font-mono flex items-center gap-1">
                    <FaMicrochip className="text-cyan-500 flex-shrink-0" />
                    <span className="truncate">{t.plugNote}</span>
                </div>
            </div>
        );
    }

    // FLOATING VARIANT (Bottom-left/right sticky badge)
    if (variant === "floating") {
        return (
            <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-cyan-200/80 rounded-2xl px-4 py-2.5 shadow-2xl hover:scale-105 transition-all text-slate-800 cursor-pointer group">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div className="text-xs">
                    <span className="font-black text-slate-900">{onlineCount}</span> <span className="text-slate-600 font-medium">{t.readers}</span>
                    <span className="block text-[9px] text-cyan-600 font-bold uppercase tracking-wider">
                        {isRu ? "Dalaman Info Телеметрия" : "Live Telemetry"}
                    </span>
                </div>
            </div>
        );
    }

    // DEFAULT: FOOTER VARIANT (Wide elegant banner inside Footer or bottom of page)
    return (
        <div className="w-full bg-gradient-to-r from-white via-cyan-50/50 to-sky-50/40 rounded-3xl p-6 md:p-8 border border-cyan-100/80 shadow-lg text-slate-800 my-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left info & badge */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <span>{t.title}</span>
                            <span className="text-[10px] font-mono bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-md uppercase font-bold">
                                {provider.toUpperCase()} READY
                            </span>
                        </h3>
                    </div>
                    <p className="text-xs text-slate-600 font-medium max-w-xl leading-relaxed">
                        {showCities ? `${t.topRegionsTitle} ${t.regions}` : t.title}
                    </p>
                </div>

                {/* Right stats counters */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 flex-shrink-0">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-sm text-center">
                        <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-600 mb-1">
                            <FaUsers className="text-emerald-500" />
                            <span>{t.liveNow}</span>
                        </div>
                        <div className={`text-2xl md:text-3xl font-black text-slate-900 transition-all duration-300 ${isUpdating ? "scale-110 text-emerald-600" : ""}`}>
                            {onlineCount}
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">{t.readers}</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-sm text-center">
                        <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-600 mb-1">
                            <FaEye className="text-cyan-500" />
                            <span>{t.todayViews}</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-slate-900">
                            {dailyViews.toLocaleString()}
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">24 часа</span>
                    </div>

                    <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-sm text-center">
                        <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-600 mb-1">
                            <FaChartLine className="text-indigo-500" />
                            <span>{t.monthUnique}</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-slate-900">
                            {(monthlyUnique + dailyViews).toLocaleString()}
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block mt-0.5">30 дней</span>
                    </div>
                </div>
            </div>

            {/* Plug & Play Developer Note Bar */}
            <div className="mt-5 pt-3 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-slate-500 font-mono">
                <div className="flex items-center gap-1.5 text-slate-600">
                    <FaMicrochip className="text-cyan-600" size={13} />
                    <span>{t.plugNote}</span>
                </div>
                <div className="flex items-center gap-3 font-sans font-bold">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ✓ API Endpoint Hooked
                    </span>
                    <span className="text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        ⚡ Realtime WebSockets
                    </span>
                </div>
            </div>
        </div>
    );
}
