'use client'

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import ListingPageContent from '@/components/ListingDetails/ListingPageContent';
import SellerInfo from '@/components/ListingDetails/SellerInfo';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Loading from '@/components/Loading/Loading';

const ViewListingPage = () => {
  const { id } = useParams(); // Get the listing id from the URL
  const [sellerIsUser, setSellerIsUser] = useState<boolean>(false);

  const getProductDetails = async () => {
    const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}product/${id}`);
  }

  useEffect(() => {
    getProductDetails();
  }, [])

  const tempListingData = {
    title: 'Brand New Sofa',
    price: 500,
    description: 'A comfortable and stylish sofa perfect for any living room.',
    pickupLocation: '123 Main St, Springfield, IL',
    category: 'Furniture',
    images: [
      '/images/misc/chair.jpg',
      '/images/misc/microwave.jpg',
      '/images/misc/textbook.jpg',
    ],
    datePublished: 'November 4th, 2024',
    seller: {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe123',
        rating: 4.5,
        profilePic: '/images/misc/microwave.jpg',
      },
  };

  /** Check that the current logged in user is viewing their own listing
   * if so, then the message seller button changes to an edit listing button
   */
  const getUser = async () => {
    const currentUser = await axios.get('api/identity/user');
    setSellerIsUser(tempListingData.seller.username === currentUser?.data?.username);
  }

  useEffect(() => {
    getUser();
  }, []); 

  return (
    <>
      <Loading/>
      <div className="flex flex-col justify-between h-screen">
        <NavBar />
      
        {/**Main Content */}
        <div className="w-full h-full flex-grow flex gap-4 flex-row justify-between">
          <div className="flex-grow my-4 ml-4 w-4/5">
            <ListingPageContent listing={tempListingData} />
          </div>

          <div className="flex-grow my-4 mr-4 w-1/5">
            <SellerInfo 
                sellerInfo={tempListingData.seller} 
                buttonLink={(sellerIsUser) ? `/edit-listing/${id}` : `/messages/${tempListingData.seller.username}`}
                buttonText={(sellerIsUser) ? 'Edit Listing' : 'Message User'}
            />
          </div>
        </div>   

        <Footer />
      </div>
    </>
   
  );
};

export default ViewListingPage;
