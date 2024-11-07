'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const TrendingCarousel = () => {
  const items = [
    { id: 1, name: 'ECE444 Textbook', price: '$100', img: '/images/logo/test.jpg' },
    { id: 2, name: 'Desk Chair', price: '$75', img: '/images/logo/test2.jpg' },
    { id: 3, name: 'Cultural Anthropology', price: '$80', img: '/images/logo/test.jpg' },
    // Additional items...
  ];

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute z-20 p-2 bg-primary text-white rounded-full"
      style={{ top: '50%', transform: 'translateY(-50%)', left: '1rem' }}
    >
      &#9664;
    </button>
  );

  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute z-20 p-2 bg-primary text-white rounded-full"
      style={{ top: '50%', transform: 'translateY(-50%)', right: '1rem' }}
    >
      &#9654;
    </button>
  );


  return (
    <div className="py-5 text-black text-center ">
      <div className="relative w-full mx-auto px-4 ">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          containerClass="w-full"
          itemClass="px-10"
          showDots={true}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
         
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="listing-item rounded-2xl text-black overflow-hidden 
              shadow-lg flex flex-col justify-between border border-dark-grey mb-10"
              style={{ height: '30rem', width: '18rem' }}
            >
              <div className="relative " style={{ height: '80%' }}>
                <Image
                  src={item.img}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="border-b border-dark-grey "
                />
              </div>
              <div className="text-center bg-dark-grey py-6">
                <p className="font-bold text-lg ">{item.name}</p>
                <p className="text-gray-700 text-sm">{item.price}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TrendingCarousel;
