'use client'

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import SellerInfo from '@/components/ListingDetails/SellerInfo';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading/Loading'; // Reusing Loading component
import ViewProfile from '@/components/ViewProfile/ViewProfile';

const ViewProfilePage = () => {
  const { username } = useParams(); // Get the listing id from the URL
  const [sellerIsUser, setSellerIsUser] = useState<boolean>(false);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state for data fetching

  // Fetch user details
  const getUserDetails = async () => {
    const token = localStorage.getItem('token');
    setLoading(true); // Start loading before the request
    try {
      const userDetails = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/info/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSellerIsUser(getUser() === userDetails.data?.user_name);

      // Set the seller data once the API response is received
      setSeller({
        firstName: userDetails.data?.first_name,
        lastName: userDetails.data?.last_name,
        username: userDetails.data?.user_name,
        rating: userDetails.data?.rating,
        profilePic: '', // Add profilePic if available
      });

      console.log(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  // Get the current user from localStorage
  const getUser = () => {
    return localStorage.getItem('currentUser');
  };

  // Fetch user details once the component mounts
  useEffect(() => {
    getUserDetails();
  }, [username]);

  return (
    <>
      {/* Show the Loading component while loading is true */}
      <Loading loading={loading} /> 

      <div className="flex flex-col justify-between h-screen">
        <NavBar />

        {/** Main Content */}
        <div className="w-full h-full flex-grow flex gap-4 flex-row justify-between">
          <div className="flex-grow my-4 ml-4 w-4/5">
            <ViewProfile sellerIsUser={sellerIsUser} />
          </div>

          <div className="flex-grow my-4 mr-4 w-1/5">
            <SellerInfo
              sellerInfo={seller} // Will be null or populated once the data is fetched
              buttonLink={sellerIsUser ? `/profile` : `/messages/${username}`}
              buttonText={sellerIsUser ? 'Edit Profile' : 'Message User'}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ViewProfilePage;
