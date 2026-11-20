"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { FaGlobeEurope, FaUsers, FaChartLine, FaEye } from 'react-icons/fa';
import { SITE_CONFIG } from '@/lib/site-config';

export interface VisitorAnalyticsProps {
    variant?: "footer" | "sidebar" | "floating" | "compact";
    locale?: string;
    trackingId?: string;
    provider?: "ga4" | "yandex" | "umami" | "plausible";
    showCities?: boolean;
}

interface AnalyticsMetrics {
    onlineNow: number | null;
    views24h: number | null;
    visitors30d: number | null;
}

function getOrCreateVisitorId(): string {
    try {
        const key = 'dalaman_vid';
        let vid = window.localStorage.getItem(key);
        if (!vid || !/^[a-zA-Z0-9_-]{6,64}$/.test(vid)) {
            vid = `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
            window.localStorage.setItem(key, vid);
        }
        return vid;
    } catch {
        return `v_${Date.now().toString(36)}`;
    }
}

export default function VisitorAnalyticsWidget({
    variant = "footer",
    locale = "ru",
    showCities = true
}: VisitorAnalyticsProps) {
    const pathname = usePathname();
    const isRu = locale === 'ru';
    const isDe = locale === 'de';
    const isTr = locale === 'tr';

    const [metrics, setMetrics] = useState<AnalyticsMetrics>({
        onlineNow: null,
        views24h: null,
        visitors30d: null,
    });
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const visitorIdRef = useRef<string | null>(null);
    const lastTrackedPathRef = useRef<string | null>(null);

    useEffect(() => {
        if (!visitorIdRef.current) {
            visitorIdRef.current = getOrCreateVisitorId();
        }
        const sessionId = visitorIdRef.current;

        const currentPath = pathname || '/';
        const shouldCountView = lastTrackedPathRef.current !== currentPath;
        lastTrackedPathRef.current = currentPath;

        const sendBeat = async (registerView: boolean) => {
            try {
                const res = await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId, registerView, pathname: currentPath }),
                    cache: 'no-store',
                });
                if (res.ok) {
                    const data = await res.json();
                    setIsUpdating(true);
                    setMetrics({
                        onlineNow: typeof data.onlineNow === 'number' ? data.onlineNow : 1,
                        views24h: typeof data.views24h === 'number' ? data.views24h : 1,
                        visitors30d: typeof data.visitors30d === 'number' ? data.visitors30d : 1,
                    });
                    setTimeout(() => setIsUpdating(false), 500);
                }
            } catch {
                // Silent fail on network abort
            }
        };

        sendBeat(shouldCountView);

        const interval = setInterval(() => {
            sendBeat(false);
        }, 60000);

        return () => clearInterval(interval);
    }, [pathname]);

    const formatVal = (v: number | null) => (v === null ? '—' : v.toLocaleString());

    const t = {
        title: isRu
            ? "Статистика посещаемости Dalaman.info"
            : isDe
            ? "Dalaman.info Besucherstatistik"
            : isTr
            ? "Dalaman.info Ziyaretçi İstatistikleri"
            : "Dalaman.info Live Visitor Stats",
        liveNow: isRu ? "Сейчас на сайте:" : isDe ? "Aktuell online:" : isTr ? "Şu an sitede:" : "Online now:",
        readers: isRu ? "читателей" : isDe ? "Leser" : isTr ? "okuyucu" : "active readers",
        todayViews: isRu ? "Просмотров за 24ч:" : isDe ? "Aufrufe (24h):" : isTr ? "24s Görüntüleme:" : "24h Pageviews:",
        monthUnique: isRu ? "Гостей за 30 дней:" : isDe ? "Besucher (30T):" : isTr ? "30 Günlük Ziyaretçi:" : "30d Readers:",
        topRegionsTitle: isRu
            ? "🌍 Регион гида:"
            : isDe
            ? "🌍 Abgedeckte Region:"
            : isTr
            ? "🌍 Rehber Bölgesi:"
            : "🌍 Coverage Area:",
        regions: isRu
            ? "Датча • Мармарис • Кёйджегиз • Дальян • Даламан • Гёджек • Фетхие • Каш"
            : "Datça • Marmaris • Köyceğiz • Dalyan • Dalaman • Göcek • Fethiye • Kaş",
    };

    const ga4Id = SITE_CONFIG.analytics.ga4MeasurementId;
    const ymId = SITE_CONFIG.analytics.yandexMetrikaId;

    const externalScripts = (
        <>
            {ga4Id && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
                    <Script id="ga4-init" strategy="afterInteractive">
                        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${ga4Id}');`}
                    </Script>
                </>
            )}
            {ymId && (
                <Script id="ym-init" strategy="afterInteractive">
                    {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(${Number(ymId)}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });`}
                </Script>
            )}
        </>
    );

    if (variant === "compact") {
        return (
            <>
                {externalScripts}
                <div className="inline-flex items-center gap-2 bg-white/90 border border-cyan-200/80 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-bold text-slate-800">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>{formatVal(metrics.onlineNow)} {t.readers}</span>
                </div>
            </>
        );
    }

    if (variant === "sidebar") {
        return (
            <>
                {externalScripts}
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
                                {formatVal(metrics.onlineNow)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                                <FaEye className="text-amber-500" /> {t.todayViews}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                                {formatVal(metrics.views24h)}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (variant === "floating") {
        return (
            <>
                {externalScripts}
                <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-2.5 shadow-lg text-slate-800">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <div className="text-xs">
                        <span className="font-bold text-slate-900">{formatVal(metrics.onlineNow)}</span>{' '}
                        <span className="text-slate-600 font-medium">{t.readers}</span>
                    </div>
                </div>
            </>
        );
    }

    // DEFAULT: FOOTER VARIANT
    return (
        <>
            {externalScripts}
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
                                {formatVal(metrics.onlineNow)}
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium block">{t.readers}</span>
                        </div>

                        <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/70 text-center">
                            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 mb-0.5">
                                <FaEye className="text-cyan-600" size={12} />
                                <span className="hidden sm:inline">{t.todayViews}</span>
                            </div>
                            <div className="text-lg md:text-xl font-extrabold text-slate-900">
                                {formatVal(metrics.views24h)}
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium block">24h</span>
                        </div>

                        <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/70 text-center">
                            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 mb-0.5">
                                <FaChartLine className="text-indigo-500" size={12} />
                                <span className="hidden sm:inline">{t.monthUnique}</span>
                            </div>
                            <div className="text-lg md:text-xl font-extrabold text-slate-900">
                                {formatVal(metrics.visitors30d)}
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium block">30d</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
