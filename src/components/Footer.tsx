import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center">&copy; {new Date().getFullYear()} Dalaman Guide. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer; 