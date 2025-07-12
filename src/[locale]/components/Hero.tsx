'use client';

import React from 'react';

const Hero = () => {
  return (
    <div 
      className="relative bg-cover bg-center text-white" 
      style={{ backgroundImage: 'url(/dalaman1.jpg)', height: '60vh' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-extrabold mb-4">Ваш гид по побережью Даламана</h1>
        <p className="text-xl max-w-2xl">Откройте для себя скрытые жемчужины, древние руины и бирюзовые пляжи одного из самых красивых регионов Турции.</p>
      </div>
    </div>
  );
};

export default Hero; 