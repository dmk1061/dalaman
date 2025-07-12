"use client";

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/dalaman1.jpg",
  "/dalaman2.jpg",
];

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-[600px]">
            <Image
              src={src}
              alt={`Dalaman slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority={index === 0} // Prioritize loading the first image
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero; 