'use client'

import React from 'react';
import { Rating } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { useRouter } from 'next/navigation';
import { Seller } from '@/types/seller';

const SellerInfo: React.FC<{ sellerInfo: Seller | undefined, buttonLink: string, buttonText:string }> = ({ sellerInfo, buttonLink, buttonText }) => {

  const router = useRouter();

  return (
    <div className="h-full flex flex-col items-center p-4 bg-white-bg rounded-lg shadow-lg">
      {/* Profile Picture - Using Next.js Image component */}
      <div className="w-1/2 aspect-square rounded-full overflow-hidden border-2 border-primary shadow-lg">
        <img
          src={sellerInfo?.profilePic || '/images/logo/UTrade_small.svg'}
          alt="Profile Picture"
          width={160} // Equivalent to w-40
          height={160} // Equivalent to h-40
          className="w-full h-full object-cover"
        />
      </div>

      {/* Link to Seller's Profile */}
      <button className="mt-8 mb-2 hover:underline" onClick={() => {router.push(`/view-profile/${sellerInfo?.username}`)}}>
        {/* Seller's Name and Username */}
        <h2 className="text-3xl font-semibold text-heading-1 hover:text-primary text-center">
          {`${sellerInfo?.firstName} ${sellerInfo?.lastName}`}
        </h2>
        <p className="text-lg text-gray-500 text-center">@{sellerInfo?.username}</p>
      </button>

      {/* Rating */}
      <div className="mb-8">
        <Rating name="seller-rating" value={sellerInfo?.rating} precision={0.5} readOnly />
      </div>

      {/* Edit Listing or Message Seller Button */}
      <Link href={buttonLink}>
        <button className="bg-primary text-xl text-white-bg py-4 px-16 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {buttonText}
        </button>
      </Link> 
    </div>
  );
};

export default SellerInfo;
