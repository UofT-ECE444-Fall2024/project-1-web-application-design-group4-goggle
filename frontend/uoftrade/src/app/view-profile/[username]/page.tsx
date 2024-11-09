'use client'

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import SellerInfo from '@/components/ListingDetails/SellerInfo';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Loading from '@/components/Loading/Loading';
import ViewProfile from '@/components/ViewProfile/ViewProfile';

const ViewProfilePage = () => {

  const { username } = useParams(); // Get the listing id from the URL
  const [sellerIsUser, setSellerIsUser] = useState<boolean>(false);

  const getUserDetails = async () => {
    //const userDetails = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/user/${username}`);
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  const seller = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe123',
        rating: 4.5,
        profilePic: '/images/misc/microwave.jpg',
  };

  /** Check that the current logged in user is viewing their own listing
   * if so, then the message seller button changes to an edit listing button
   */
  const getUser = async () => {
    const currentUser = await axios.get('api/identity/user');
    setSellerIsUser(username === currentUser?.data?.username);
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
            <ViewProfile sellerIsUser={sellerIsUser}/>
          </div>

          <div className="flex-grow my-4 mr-4 w-1/5">
            <SellerInfo 
                sellerInfo={seller}
                buttonLink={(sellerIsUser) ? `/profile` : `/messages/${username}`}
                buttonText={(sellerIsUser) ? 'Edit Profile' : 'Message User'}
            />
          </div>
        </div>   

        <Footer />
      </div>
    </>
   
  );
};

export default ViewProfilePage;
