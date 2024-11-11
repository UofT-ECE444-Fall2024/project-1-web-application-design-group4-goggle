import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';  // Import necessary styles
import ListingCard from '../Listing/ListingCard'; // Assuming ListingCard is another component
import { Listing } from '@/types/listing'; // Ensure this is the correct import path

const ViewUserListingsCarousel: React.FC<{ listings: Listing[] }> = ({ listings }) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mt-6">
      {/* Header for the carousel */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Current Listings</h2>
      </div>

      {/* Carousel */}
      <Carousel responsive={responsive}>
        {listings.map((listing) => (
          <div key={listing.id} className="px-3">
            <ListingCard listing={listing} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ViewUserListingsCarousel;
