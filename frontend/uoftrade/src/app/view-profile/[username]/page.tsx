'use client'

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import SellerInfo from '@/components/ListingDetails/SellerInfo';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading/Loading'; // Reusing Loading component
import ViewProfile from '@/components/ViewProfile/ViewProfile';
import { Seller } from '@/types/seller';
import { Listing } from '@/types/listing';

const ViewProfilePage = () => {
  const { username } = useParams(); // Get the listing id from the URL
  const [sellerIsUser, setSellerIsUser] = useState<boolean>(false);
  const [seller, setSeller] = useState<Seller>();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state for data fetching
  const [sellerEmail, setSellerEmail] = useState<string>('')
  /** This function gets the current users data and optionally gets their listings if the parameter is true 
   * then it sets the appropriate states
  */
  const getData = async () => {
    const currentUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');
    
    setLoading(true); // Start loading before the request
    try {
      //get current user details
      const userDetails = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/info/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userImages = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/UserImages/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_name: currentUser,
        }
      });

       // Set the seller data once the API response is received
       setSeller({
        firstName: userDetails.data?.first_name,
        lastName: userDetails.data?.last_name,
        username: userDetails.data?.user_name,
        rating: userDetails.data?.rating,
        profilePic: userImages.data[0]?.image || '', // Add profilePic if available
      });

      setSellerEmail(userDetails?.data?.email)
      setSellerIsUser(seller?.username === currentUser);

      const userListings = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marketplace/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_name: userDetails.data?.user_name,
        }
      });

      const listingsArr:Listing[] = userListings.data?.map((product: any) => {

        let sellerName = `${seller?.firstName} ${seller?.lastName}`

        return {
          id: product?.id,
          title: product?.title,
          price: product?.price,
          description: product?.description,
          images: product?.images || '', // Assuming the product has an image
          seller: {
            name: sellerName || 'Unknown Seller', // Use the seller name from state
            username: seller?.username || '',
            image: seller?.profilePic || '', // Use the seller image from state
            rating: seller?.rating || 0, // Use the seller rating from state
          },
          tags: product?.category ? [product.category] : [], // Add category as a tag, if available
          publishDate: product?.date_posted,
        };
      });

      //update the listings state
      setListings(listingsArr);

    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  // Fetch user details once the component mounts
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Show the Loading component while loading is true */}
      <Loading loading={loading} /> 

      <div className="flex flex-col justify-between h-screen">
        <NavBar />

        {/** Main Content */}
        <div className="w-full h-full flex-grow flex gap-4 flex-row justify-between">
          <div className="flex-grow my-4 ml-4 w-4/5">
            <ViewProfile sellerIsUser={sellerIsUser} listings={listings} sellerEmail={sellerEmail}/>
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
