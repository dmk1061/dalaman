"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaBars, FaSearch } from 'react-icons/fa';

const StickyHeader = ({ onMenuToggle }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Показываем sticky header когда скролл больше 200px и скролим вниз
            if (currentScrollY > 200 && currentScrollY > lastScrollY) {
                setIsVisible(true);
            } 
            // Скрываем когда скролим вверх или в самом верху
            else if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 bg-cyan-600 text-white shadow-lg transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Menu Button */}
                    <button 
                        onClick={onMenuToggle}
                        className="flex items-center space-x-2 hover:bg-cyan-700 px-3 py-2 rounded transition-colors"
                    >
                        <FaBars size={18} />
                        <span className="font-semibold">МЕНЮ</span>
                    </button>

                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-cyan-600 font-bold text-sm">D</span>
                        </div>
                        <div className="text-sm font-bold">
                            <div>ДАЛАМАН</div>
                            <div className="text-xs opacity-90">БЕЛЕДИЕСИ</div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex items-center">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Поиск..." 
                                className="bg-white text-gray-800 px-4 py-2 pr-10 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyHeader; 