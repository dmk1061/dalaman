"use client";

import React from 'react';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

type SideMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
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
                    <h2 className="text-lg font-semibold text-gray-800">Меню</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="py-4">
                    <MenuItem title="ГЛАВНАЯ" href="/" />
                    <MenuItem title="КУРУМСАЛ" />
                    <MenuItem title="ДАЛАМАН" />
                    <MenuItem title="ГЮНДЖЕЛ" />
                    <MenuItem title="ПРОЕКТЫ" />
                    <MenuItem title="ГОРОДСКОЙ ПУТЕВОДИТЕЛЬ" href="/city-guide" />
                    <MenuItem title="НАШИ УСЛУГИ" />
                    <MenuItem title="СВЯЗЬ" />
                    <MenuItem title="ЭЛЕКТРОННАЯ МЭРИЯ" />
                </div>
            </div>
        </>
    );
};

const MenuItem = ({ title, href }: { title: string, href?: string }) => {
    const content = (
        <div className="px-6 py-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors duration-200">
            <span className="text-gray-700 font-medium">{title}</span>
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
};

export default SideMenu; 