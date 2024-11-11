'use client'

import React, { useState } from 'react';
import ListingImages from './ListingImages';
import ListingDetails from './ListingDetails';
import { Listing } from '@/types/listing';

// Use the Listing interface directly in the component
const ListingPageContent: React.FC<{ listing: Listing | undefined }> = ({ listing }) => {

  const images: string[] | undefined = listing?.images?.map(item => item.image);

  // When using useState, safely access images[0] with optional chaining
  const [selectedImage, setSelectedImage] = useState<string | undefined>(images?.[0]);

  return (
    <div className="w-full h-full flex flex-row p-6 bg-white-bg shadow-lg rounded-lg">
      {/* Image Gallery on the Left */}
      <ListingImages 
        images={images} 
        selectedImage={selectedImage} 
        onSelectImage={setSelectedImage} 
      />

      {/* Listing Details on the Right */}
      <div className="ml-6 flex-1">
        <ListingDetails
          title={listing?.title}
          price={listing?.price}
          description={listing?.description}
          pickupLocation={listing?.location}
          category={listing?.tags?.[0]}
          date={listing?.publishDate}
        />
      </div>
    </div>
  );
};

export default ListingPageContent;
