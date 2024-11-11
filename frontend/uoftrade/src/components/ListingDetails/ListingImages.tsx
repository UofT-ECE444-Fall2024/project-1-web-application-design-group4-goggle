'use client'

import React from 'react';
import Image from 'next/image';

interface ListingImagesProps {
  images: string[] | undefined;
  selectedImage: string | undefined;
  onSelectImage: (image: string) => void;
}

const ListingImages: React.FC<ListingImagesProps> = ({ images, selectedImage, onSelectImage }) => {
  return (
    <div className="flex flex-row items-center mt-4 justify-center w-3/5">
      {/* Thumbnail Images */}
      <div className="space-y-2 h-full flex bg-white-bg flex-col items-center">
        {images?.map((imageUrl, index) => (
          <div
            key={index}
            className={`cursor-pointer hover:scale-105 hover:shadow-lg w-16 h-16 rounded-lg overflow-hidden transition-transform duration-200 ${
              selectedImage === imageUrl ? 'border-2 border-primary' : 'border border solid border-outline-grey'
            }`}
            onClick={() => onSelectImage(imageUrl)}
          >
            <div className="w-full h-full flex justify-center items-center bg-grey-bg-opaque">
              <Image
                src={imageUrl}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                objectFit="contain" // Maintain aspect ratio while fitting inside the container
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Image View */}
      <div className="relative w-full h-full bg-grey-bg-opaque border border solid border-outline-grey rounded-lg overflow-hidden ml-8 mb-4">
        <Image 
          src={selectedImage || 'images/logo/UTrade_logo.svg'} 
          alt="Main Image" 
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  );
};

export default ListingImages;
