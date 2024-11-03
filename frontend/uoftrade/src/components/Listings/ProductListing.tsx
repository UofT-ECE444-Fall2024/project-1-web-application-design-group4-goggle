'use client';

import Link from 'next/link';

import { categories } from '@/data/categories';

const ProductListing = () => {
 
  return (
    <div className="py-8 bg-primary text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Explore Categories...</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-5xl mx-auto">
        {categories.map((category, index) => (
          <Link key={index} href={category.link} passHref>
            <div className="bg-red text-blue rounded-lg shadow-md p-4 cursor-pointer hover:bg-black transition duration-300">
              <p className="font-bold">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;