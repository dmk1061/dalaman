import React from 'react';
import Link from 'next/link';
import { FaCompass, FaMapMarkedAlt, FaBookOpen } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/80 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <FaCompass size={32} />
        </div>
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-600 mb-2">
          404 • PAGE NOT FOUND
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
          Страница не найдена / Page Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          Возможно, ссылка устарела или страница была перенесена. Воспользуйтесь навигацией ниже, чтобы вернуться в путеводитель по побережью от Датчи до Каша.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/ru"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <FaCompass size={13} /> На главную (RU)
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <FaMapMarkedAlt size={13} /> English Home
          </Link>
          <Link
            href="/ru/articles"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <FaBookOpen size={13} /> Все статьи
          </Link>
        </div>
      </div>
    </div>
  );
}
