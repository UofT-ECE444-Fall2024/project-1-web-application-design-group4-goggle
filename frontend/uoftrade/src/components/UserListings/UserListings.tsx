'use client'

import React from 'react';
import { Listing } from '@/types/listing';
import ListingCard from '../Listing/ListingCard';


const UserListings:React.FC<{ listingData: Listing[] }> = ({ listingData }) => {

    return (
        <div className="container flex flex-col justify-around">
            <h3 className="my-12 text-3xl font-bold text-heading-1 dark:text-white-bg sm:text-xl" style={{fontSize: '2.5rem', lineHeight: '1'}}>
                Your Listings
            </h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                {listingData.map((listing: Listing) => (
                    <div key={listing.id} className="w-full">
                        <ListingCard listing={listing} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserListings;