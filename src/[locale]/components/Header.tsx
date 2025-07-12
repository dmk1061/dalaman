'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <a href="tel:0000000000" className="flex items-center text-sm text-gray-600 hover:text-blue-500">
              <FaPhoneAlt className="mr-2" />
              <span>000 000 00 00</span>
            </a>
            <a href="mailto:info@dalaman.info" className="flex items-center text-sm text-gray-600 hover:text-blue-500">
              <FaEnvelope className="mr-2" />
              <span>info@dalaman.info</span>
            </a>
          </div>
          <div className="text-sm text-gray-600">
            <Link href="/contacts" className="hover:text-blue-500">Свяжитесь с нами</Link>
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header; 