'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const TrendingCarousel = () => {
  const items = [
    { id: 1, name: 'ECE444 Textbook', price: '$100', img: '/images/logo/test.jpg' },
    { id: 2, name: 'Desk Chair', price: '$75', img: '/images/logo/test2.jpg' },
    { id: 3, name: 'Cultural Anthropology', price: '$80', img: '/images/logo/test.jpg' },
    // Additional items...
  ];

  // Duplicate items to create a seamless loop effect
  const scrollingItems = [...items, ...items]; // Duplicate the items

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeft(carouselRef.current!.scrollLeft);
    setAnimationPaused(true); // Pause auto-scrolling while dragging
  };

  const onMouseLeave = () => {
    if (!isDragging) {
      setAnimationPaused(false); // Allow auto-scrolling when mouse leaves, but not during dragging
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    setAnimationPaused(false); // Resume auto-scrolling after mouse is released
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 3; // Adjust the scroll speed (3 is a multiplier)
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollPosition = carouselRef.current.scrollLeft;
        const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;

        // If we've scrolled to the end, reset the scroll position to the start
        if (scrollPosition >= maxScrollLeft) {
          carouselRef.current.scrollLeft = 0; // Reset position to the beginning
        }
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll);
    }

    // Cleanup on component unmount
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // Ensure the scroll always stays at the start (without waiting for the loop to finish)
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div
      className="carousel-wrapper mt-10"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div
        ref={carouselRef}
        className="carousel"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          animationPlayState: animationPaused ? 'paused' : 'running', // Control the animation state
        }}
      >
        {scrollingItems.map((item, index) => (
          <div key={index} className="carousel-item">
            <div
              className="listing-item rounded-2xl bg-grey-bg text-black 
              shadow-lg flex flex-col justify-between border border-gray-400 overflow-hidden"
              style={{ height: '25rem', width: '30rem' }}
            >
              <div className="relative border-b border-gray-400" style={{ height: '80%' }}>
                <Image
                  src={item.img}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="bg-white"
                />
              </div>
              <div className="bg-gray-400 p-4 rounded-b-2xl text-center">
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-gray-700 text-sm">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .carousel-wrapper {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          background-color: white;
          padding: 2rem 0;
        }

        .carousel {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }

        .carousel-item {
          display: inline-block;
          margin-right: 1rem;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default TrendingCarousel;
