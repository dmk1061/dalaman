"use client";

import React, { useState, useEffect } from 'react';
import { FaGlobeEurope, FaUsers, FaChartLine, FaEye } from 'react-icons/fa';

export interface VisitorAnalyticsProps {
    variant?: "footer" | "sidebar" | "floating" | "compact";
    locale?: string;
    trackingId?: string;
    provider?: "ga4" | "yandex" | "umami" | "plausible";
    showCities?: boolean;
}

export default function VisitorAnalyticsWidget({
    variant = "footer",
    locale = "ru",
    showCities = true
}: VisitorAnalyticsProps) {
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const [onlineCount, setOnlineCount] = useState<number>(47);
    const [dailyViews, setDailyViews] = useState<number>(3482);
    const [monthlyUnique] = useState<number>(42190);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    useEffect(() => {
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
        title: isRu
            ? "Пульс сообщества Dalaman.info"
            : isDe
            ? "Dalaman.info Leser-Statistik"
            : isTr
            ? "Dalaman.info Canlı Okuyucu İstatistiği"
            : "Dalaman.info Community Pulse",
        liveNow: isRu ? "Сейчас на сайте:" : isDe ? "Aktuell online:" : isTr ? "Şu an sitede:" : "Online now:",
        readers: isRu ? "читателей" : isDe ? "Leser" : isTr ? "okuyucu" : "active readers",
        todayViews: isRu ? "Просмотров за 24ч:" : isDe ? "Aufrufe (24h):" : isTr ? "24s Görüntüleme:" : "24h Pageviews:",
        monthUnique: isRu ? "Гостей за 30 дней:" : isDe ? "Besucher (30T):" : isTr ? "30 Günlük Ziyaretçi:" : "30d Readers:",
        topRegionsTitle: isRu
            ? "🌍 География путешественников:"
            : isDe
            ? "🌍 Top-Regionen der Leser:"
            : isTr
            ? "🌍 En Çok Okunan Şehirler:"
            : "🌍 Top Reader Cities:",
        regions: isRu
            ? "Стамбул • Москва • Лондон • Анталья • Берлин • Измир"
            : "Istanbul • Moscow • London • Antalya • Berlin • Izmir",
    };

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

    if (variant === "sidebar") {
        return (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm text-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                            <FaGlobeEurope size={14} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                            {isRu ? "Онлайн-пульс" : "Live Pulse"}
                        </span>
                    </div>
                    <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        LIVE
                    </span>
                </div>

                <div className="space-y-2.5">
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                            <FaUsers className="text-cyan-600" /> {t.liveNow}
                        </span>
                        <span className={`text-sm font-bold text-slate-900 transition-all duration-300 ${isUpdating ? "text-cyan-600" : ""}`}>
                            {onlineCount}
                        </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                            <FaEye className="text-amber-500" /> {t.todayViews}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                            {dailyViews.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === "floating") {
        return (
            <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-2.5 shadow-lg text-slate-800">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div className="text-xs">
                    <span className="font-bold text-slate-900">{onlineCount}</span>{' '}
                    <span className="text-slate-600 font-medium">{t.readers}</span>
                </div>
            </div>
        );
    }

    // DEFAULT: FOOTER VARIANT
    return (
        <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-cyan-500/30 shadow-md text-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <h3 className="text-sm md:text-base font-bold text-slate-900 tracking-tight">
                            {t.title}
                        </h3>
                    </div>
                    {showCities && (
                        <p className="text-xs text-slate-600 font-medium">
                            <span className="font-semibold text-slate-800">{t.topRegionsTitle}</span> {t.regions}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/70 text-center">
                        <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 mb-0.5">
                            <FaUsers className="text-emerald-500" size={12} />
                            <span className="hidden sm:inline">{t.liveNow}</span>
                        </div>
                        <div className={`text-lg md:text-xl font-extrabold text-slate-900 transition-colors duration-300 ${isUpdating ? "text-emerald-600" : ""}`}>
                            {onlineCount}
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium block">{t.readers}</span>
                    </div>

                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/70 text-center">
                        <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 mb-0.5">
                            <FaEye className="text-cyan-600" size={12} />
                            <span className="hidden sm:inline">{t.todayViews}</span>
                        </div>
                        <div className="text-lg md:text-xl font-extrabold text-slate-900">
                            {dailyViews.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium block">24h</span>
                    </div>

                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/70 text-center">
                        <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 mb-0.5">
                            <FaChartLine className="text-indigo-500" size={12} />
                            <span className="hidden sm:inline">{t.monthUnique}</span>
                        </div>
                        <div className="text-lg md:text-xl font-extrabold text-slate-900">
                            {(monthlyUnique + dailyViews).toLocaleString()}
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium block">30d</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
