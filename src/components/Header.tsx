import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dalaman</h1>
          <p className="text-gray-600">Ваш путеводитель по побережью Турции</p>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header; 