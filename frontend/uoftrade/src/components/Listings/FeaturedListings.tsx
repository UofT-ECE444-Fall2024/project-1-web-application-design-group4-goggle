'use client';

import { useState } from 'react';
import Image from 'next/image';

const FeaturedListings = () => {
  // Example product data, you can replace this with dynamic content
  const items = [
    { id: 1, name: 'ECE444 Textbook', price: '$100', img: '/images/item1.png' },
    { id: 2, name: 'Desk Chair', price: '$75', img: '/images/item2.png' },
    { id: 3, name: 'Cultural Anthropology', price: '$80', img: '/images/item3.png' },
    { id: 4, name: 'Linear Algebra Textbook', price: '$100', img: '/images/item4.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="py-8 bg-primary text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Currently Trending on UofTrade...</h2>
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Carousel */}
        <div className="flex justify-center items-center">
          <button onClick={prevSlide} className="absolute left-0 z-10 text-white p-2">
            &#9664; {/* Left arrow */}
          </button>
          <div className="flex space-x-4 overflow-hidden">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex-none w-56 p-4 rounded-lg bg-white text-black shadow-md transition-transform duration-300 ${
                  index === currentIndex ? 'block' : 'hidden'
                }`}
              >
                <Image src={item.img} alt={item.name} width={100} height={100} className="mx-auto mb-2" />
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-700">{item.price}</p>
              </div>
            ))}
          </div>
          <button onClick={nextSlide} className="absolute right-0 z-10 text-white p-2">
            &#9654; {/* Right arrow */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
