'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

import { Listing } from "@/types/listing";
import ListingCard from '../Listing/ListingCard';

const TrendingCarousel = () => {

  const listingData: Listing[] = [
    {
      id: 1,
      title: "Microwave",
      price: "$28",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
      image: "/images/misc/microwave.jpg",
      seller: {
        name: "Guy Dude",
        image: "/images/logo/UTrade_small.svg",
        rating: 4.5,
      },
      tags: ["Appliances"],
      publishDate: "Nov 2th, 2024",
    },
    {
      id: 2,
      title: "Textbook",
      price: "$25",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
      image: "/images/misc/textbook.jpg",
      seller: {
        name: "Guy Dude",
        image: "/images/logo/UTrade_small.svg",
        rating: 4.5,
      },
      tags: ["Textbooks"],
      publishDate: "Nov 3th, 2024",
    },
    {
      id: 3,
      title: "Chair",
      price: "$32",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
      image: "/images/misc/chair.jpg",
      seller: {
        name: "Guy Dude",
        image: "/images/logo/UTrade_small.svg",
        rating: 4.5,
      },
      tags: ["Furniture"],
      publishDate: "Nov 4th, 2024",
    },
  ];

  // Duplicate items to create a seamless loop effect
  const scrollingItems = [...listingData, ...listingData]; // Duplicate the items

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
          animationPlayState: animationPaused ? 'paused' : 'paused', // Control the animation state
        }}
      >
        {scrollingItems.map((listing) => (
            <div key={listing.id} className="mx-6 w-[25rem]">
                <ListingCard listing={listing} />
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
