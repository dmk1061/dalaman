"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

import ru from '@/dictionaries/ru.json';
import en from '@/dictionaries/en.json';
import de from '@/dictionaries/de.json';
import tr from '@/dictionaries/tr.json';

const dicts: Record<string, any> = { ru, en, de, tr };

type SideMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
    const params = useParams();
    const locale = (params?.locale as string) || 'en';
    const dict = dicts[locale] || dicts['en'];
    const sm = dict.side_menu || dicts['en'].side_menu;

    const localize = (path: string) => {
        if (!path || path === '#' || path.startsWith('http') || path.startsWith('tel:')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${locale}${cleanPath}`;
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}
            
            {/* Side Menu */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Header */}
                <div className="bg-gray-100 px-4 py-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">{sm.menu_title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="py-4">
                    <MenuItem title={sm.home} href={localize("/")} onClose={onClose} />
                    <MenuItem title={sm.cities} href={localize("/city-guide")} onClose={onClose} />
                    <MenuItem title={dict.header?.nav?.best_beaches || "Beaches"} href={localize("/beaches")} onClose={onClose} />
                    <MenuItem title={sm.articles} href={localize("/articles/geography")} onClose={onClose} />
                    <MenuItem title={sm.services} href={localize("/services")} onClose={onClose} />
                    <MenuItem title={sm.contacts} href={localize("/contacts")} onClose={onClose} />
                </div>
            </div>
        </>
    );
};

const MenuItem = ({ title, href, onClose }: { title: string, href?: string, onClose?: () => void }) => {
    const content = (
        <div className="px-6 py-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors duration-200">
            <span className="text-gray-700 font-medium">{title}</span>
        </div>
    );

    if (href) {
        return <Link href={href} onClick={onClose}>{content}</Link>;
    }

    return content;
};

export default SideMenu;
