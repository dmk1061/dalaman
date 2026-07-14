"use client";

import React, { useState } from "react";
import { FaShareAlt, FaPrint, FaCheck } from "react-icons/fa";

export default function ArticleActions({ locale, title }: { locale: string; title: string }) {
    const [copied, setCopied] = useState(false);

    const labels: Record<string, { share: string; print: string; copied: string }> = {
        ru: { share: "Поделиться", print: "Распечатать", copied: "Ссылка скопирована" },
        en: { share: "Share Guide", print: "Print Guide", copied: "Link Copied!" },
        de: { share: "Teilen", print: "Drucken", copied: "Link kopiert!" },
        tr: { share: "Paylaş", print: "Yazdır", copied: "Bağlantı Kopyalandı" }
    };
    const l = labels[locale] || labels['en'];

    const handleShare = () => {
        if (typeof window !== "undefined" && navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            });
        } else if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-700 text-xs font-bold transition-all shadow-sm"
                title={l.share}
            >
                {copied ? <FaCheck className="text-emerald-500" /> : <FaShareAlt size={11} />}
                <span>{copied ? l.copied : l.share}</span>
            </button>
            <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-700 text-xs font-bold transition-all shadow-sm"
                title={l.print}
            >
                <FaPrint size={11} />
                <span>{l.print}</span>
            </button>
        </div>
    );
}
