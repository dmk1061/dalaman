import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-96 rounded-lg bg-cover bg-center text-white flex items-center justify-center my-8" style={{ backgroundImage: "url('/dalaman1.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
      
      <div className="relative z-10 text-center">
        <h2 className="text-5xl font-extrabold">Откройте для себя Даламан</h2>
        <p className="mt-4 text-xl">Найдите лучшие места, пляжи и развлечения</p>
        
        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
            <input 
              type="text" 
              placeholder="Что вы ищете?" 
              className="w-full max-w-lg px-4 py-3 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-md font-semibold">
              Поиск
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 