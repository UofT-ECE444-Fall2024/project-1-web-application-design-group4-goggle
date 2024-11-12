'use client'

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import ListingPageContent from '@/components/ListingDetails/ListingPageContent';
import SellerInfo from '@/components/ListingDetails/SellerInfo';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Loading from '@/components/Loading/Loading';
import { Listing } from '@/types/listing';
import { Seller } from '@/types/seller';

const ViewListingPage = () => {
  const { id } = useParams(); // Get the listing id from the URL
  const [seller, setSeller] = useState<Seller>();
  const [sellerIsUser, setSellerIsUser] = useState<boolean>(false)
  const [product, setProduct] = useState<Listing>();
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state for data fetching
  const [images, setImages] = useState<string[]>([]);
  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short"
    });
  }
  useEffect(() => {
    /** This function gets the current users data and optionally gets their listings if the parameter is true 
     * then it sets the appropriate states
    */
    const getProductDetails = async () => {
      const currentUser = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');
      
      setLoading(true); // Start loading before the request
      try {

        const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        product?.data?.images?.forEach(( image: any) => {
          images.push(image?.image?.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12001$2"));
        });

        //get current user details
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
          }
        });

        // Set the seller data once the API response is received
        setSeller({
          firstName: userDetails.data?.first_name,
          lastName: userDetails.data?.last_name,
          username: userDetails.data?.user_name,
          rating: userDetails.data?.rating,
          profilePic: userImages.data[userImages.data.length - 1]?.image.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12000$2") || '', // Add profilePic if available
        });

        setSellerIsUser(userDetails.data?.user_name === currentUser);

        const sellerName = `${userDetails.data?.first_name} ${userDetails.data?.last_name}`

        const productDetails:Listing = {
            id: product?.data?.id,
            title: product?.data?.title,
            price: product?.data?.price,
            description: product?.data?.description,
            image: product?.data.images?.[0].image?.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12001$2") || '', // Assuming the product has an image
            location: product?.data?.location,
            seller: {
              name: sellerName || 'Unknown Seller', // Use the seller name from state
              username: userDetails.data?.user_name || '',
              image: userImages.data[userImages.data.length - 1]?.image.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12000$2") || '',
              rating: userDetails.data?.rating || 0, // Use the seller rating from state
            },
            tags: product?.data?.category ? [product.data?.category] : [], // Add category as a tag, if available
            publishDate: formatDate(product?.data?.date_posted),
        };

          //update the listings state
        setProduct(productDetails);

      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // Stop loading after the request is done
      }
    };


    getProductDetails();
  }, [])

  if (loading) { return <Loading loading={loading}/> }
  else {
    return (
      <>
        <div className="flex flex-col justify-between h-screen">
          <NavBar />
        
          {/**Main Content */}
          <div className="w-full h-full flex-grow flex gap-4 flex-row justify-between">
            <div className="flex-grow my-4 ml-4 w-4/5">
              <ListingPageContent listing={product} images={images} />
            </div>
  
            <div className="flex-grow my-4 mr-4 w-1/5">
              <SellerInfo 
                  sellerInfo={seller} 
                  buttonLink={(sellerIsUser) ? `/edit-listing/${id}` : `/messages/${seller?.username}`}
                  buttonText={(sellerIsUser) ? 'Edit Listing' : 'Message User'}
              />
            </div>
          </div>   
  
          <Footer />
        </div>
      </>
    );
  }
  
};

export default ViewListingPage;
