'use client'

import React from 'react';
import RateUser from './RateUser'; 
import ViewUserListingsCarousel from './ViewUserListingsCarousel';
import { Listing } from '@/types/listing';

const ViewProfile: React.FC<{ sellerIsUser:boolean, listings: Listing[] }> = ({ sellerIsUser, listings }) => {
  return (
    <div className="w-full h-full flex flex-col p-6 bg-white-bg shadow-lg rounded-lg">
      {/* User Rating Section */}
      <div className="flex flex-col items-start space-y-4">
        <RateUser sellerIsUser={sellerIsUser}/>
      </div>

      {/* User Listings Carousel */}
      <ViewUserListingsCarousel listings={listings}/>
    </div>
  );
};

export default ViewProfile;
