'use client'

import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import TrendingCarousel from "@/components/Carousel/TrendingCarousel";
import CategoriesSelection from "@/components/CategoriesSelection/CategoriesSelection";
import Loading from "@/components/Loading/Loading";

import { Listing } from "@/types/listing";
import axios from "axios";

const HomePage = () => {
  const [listings, setListings] = useState<Listing[] | Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state for data fetching

  useEffect(() => {
    const getProductDetails = async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
    
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marketplace/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        // Fallback to an empty array if productsData is undefined
        const productsData: Array<any> = response?.data?.slice(0, 5) || [];
        console.log(productsData);
    
        // Create an array of promises using .map() inside Promise.all
        await Promise.all(
          productsData.map(async (product: any) => {
            // Fetch user details and images asynchronously
            const userDetails = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/info/${product?.data?.user_name}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            const userImages = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/UserImages/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                user_name: product?.data?.user_name,
              },
            });
    
            const sellerName = `${userDetails?.data?.firstName} ${userDetails?.data?.lastName}`;
    
            listings.push({
              id: product?.id,
              title: product?.title,
              price: product?.price,
              description: product?.description,
              images: product?.images || '',
              location: product?.location,
              seller: {
                name: sellerName || 'Unknown Seller',
                username: userImages?.data?.username || '',
                image: userImages?.data?.images?.[0].image || '',
                rating: userDetails?.data?.rating || 0,
              },
              tags: product?.category ? [product.category] : [],
              publishDate: product?.date_posted,
            });
          })
        );
        
        console.log(listings);
        setListings(listings)

      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [])

  if (loading){
    return <Loading loading={loading}/>
  }
  else{
    return(
    <>
      <div className="flex flex-col min-h-screen w-full">
        {/* Header at the top */}
        <NavBar />

        {/* Main content */}
        <div className="flex-grow w-full flex flex-col justify-between">
          {/* Trending Carousel */}
          <div className="flex-grow mx-auto w-full">
            <h1 className="text-2xl py-10 bg-primary font-bold px-10 text-left text-white-bg">
              Currently Trending on UofTrade...
            </h1>
            <TrendingCarousel listingData={listings}/>
          </div>

          {/* Categories Selection */}
          <div className="flex-grow mx-auto w-full ">
            <h1 className="text-2xl py-10 bg-primary font-bold px-10 text-left text-white-bg">
              Explore Categories...
            </h1>
            <CategoriesSelection />
          </div>
        </div>

        {/* Footer pinned to the bottom */}
        <Footer />
      </div>
    </>
    );
  }
};

export default HomePage;
