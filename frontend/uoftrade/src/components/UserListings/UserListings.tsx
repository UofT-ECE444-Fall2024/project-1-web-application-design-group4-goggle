'use client'

import React from 'react';

import { Listing } from '@/types/listing';
import ListingCard from '../Listing/ListingCard';

const UserListings = () => {

    /** need to make this dynamic
     * so like listingData: Listing[] = await axios.get(url, payload);
     * the payload would be the user id you need the listings for, in this case its whoever is logged in
     *  */ 
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


    return (
        <div className="container flex flex-col justify-around">
            <h3 className="my-12 text-3xl font-bold text-heading-1 dark:text-white-bg sm:text-xl" style={{fontSize: '2.5rem', lineHeight: '1'}}>
                Your Listings
            </h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                {listingData.map((listing) => (
                    <div key={listing.id} className="w-full">
                        <ListingCard listing={listing} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserListings;