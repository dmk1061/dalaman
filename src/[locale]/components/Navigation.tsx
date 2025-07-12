'use client';

import React from 'react';
import Link from 'next/link';

const navItems = [
    { name: 'Информация', href: '/info' },
    { name: 'Локации', href: '/locations' },
    { name: 'Чем заняться', href: '/activities' },
    { name: 'Переезд', href: '/relocation' },
    { name: 'Сувениры', href: '/souvenirs' },
];

const Navigation = () => {
    return (
        <nav className="bg-white py-4">
            <div className="container mx-auto flex justify-center items-center">
                <ul className="flex space-x-8">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} className="text-gray-700 hover:text-blue-500 font-semibold pb-2 border-b-2 border-transparent hover:border-blue-500 transition-colors">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation; 