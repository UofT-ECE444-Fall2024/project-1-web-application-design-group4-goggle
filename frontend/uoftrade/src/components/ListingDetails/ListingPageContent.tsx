'use client'

import React, { useState } from 'react';
import ListingImages from './ListingImages';
import ListingDetails from './ListingDetails';

// Define the Listing interface
interface Listing {
  title: string;
  price: number;
  description: string;
  pickupLocation: string;
  category: string;
  images: string[];
  datePublished: string;
}

// Use the Listing interface directly in the component
const ListingPageContent: React.FC<{ listing: Listing }> = ({ listing }) => {
  const [selectedImage, setSelectedImage] = useState(listing.images[0]);

  return (
    <div className="w-full h-full flex flex-row p-6 bg-white-bg shadow-lg rounded-lg">
      {/* Image Gallery on the Left */}
      <ListingImages 
        images={listing.images} 
        selectedImage={selectedImage} 
        onSelectImage={setSelectedImage} 
      />

      {/* Listing Details on the Right */}
      <div className="ml-6 flex-1">
        <ListingDetails
          title={listing.title}
          price={listing.price}
          description={listing.description}
          pickupLocation={listing.pickupLocation}
          category={listing.category}
          date={listing.datePublished}
        />
      </div>
    </div>
  );
};

export default ListingPageContent;
