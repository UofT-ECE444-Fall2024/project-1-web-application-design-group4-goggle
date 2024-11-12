'use client';

import React, { useState, useEffect } from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import axios from "axios";
import { Seller } from "@/types/seller";
import { Listing } from "@/types/listing";

// Extend the props to include the new 'requiresData' prop
interface SettingsContentProps {
  ContentComponent: React.ElementType; // Accept any React component
  highlightIndex: number;
  requiresData?: boolean; // Optional prop to indicate if API data is required
  requiresListingData?: boolean; // Optional prop to indicate if Listing data is required
}

/**
 * @param ContentComponent
 * @param highlightIndex
 * @param requiresData
 * @description
 * Take in any React component as the content of the page and fit it with the settings sidebar.
 * Conditionally fetch user data based on the `requiresData` flag, and pass it to ContentComponent.
 */
const SettingsContent: React.FC<SettingsContentProps> = ({ ContentComponent, highlightIndex, requiresData = false, requiresListingData = false }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [seller, setSeller] = useState<Seller>();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state for data fetching

  // Fetch user details once the component mounts if requiredData is true
  useEffect(() => {
    /** This function gets the current users data and optionally gets their listings if the parameter is true 
   * then it sets the appropriate states
  */
    const getData = async () => {
      const currentUser = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');

      setLoading(true); // Start loading before the request
      try {
        //get current user details
        const userDetails = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/info/${currentUser}`, {
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
          profilePic: userImages.data[userImages.data.length -1]?.image.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12000$2") || '', // Add profilePic if available
        });

        if (requiresListingData) {
          const userListings = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              q: currentUser,
              priority: "user_name"
            },
          });

          userListings.data?.forEach((product: any) => {

            let sellerName = `${userDetails.data?.first_name} ${userDetails.data?.last_name}`

            listings.push ({
              id: product?.id,
              title: product?.title,
              price: product?.price,
              description: product?.description,
              image: product?.images?.[0].image?.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12001$2") || '', // Assuming the product has an image
              location: product?.location,
              seller: {
                name: sellerName || 'Unknown Seller', // Use the seller name from state
                username: userDetails.data?.user_name || '',
                image: userImages.data[userImages.data.length - 1]?.image.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12000$2") || '', // Use the seller image from state
                rating: userDetails.data?.rating || 0, // Use the seller rating from state
              },
              tags: product?.category ? [product.category] : [], // Add category as a tag, if available
              publishDate: product?.date_posted,
            });
          });
        }

      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // Stop loading after the request is done
      }
    };

    if (requiresData) {
      getData();
    } else {
      setLoading(false); // Skip loading if no data is required
    }
  }, [requiresData]);

  // Function to get the appropriate ContentComponent based on the data requirements
  const getContentComponentWithProps = () => {
    if (requiresListingData) {
      return <ContentComponent seller={seller} listingData={listings} />;
    }
    else if (requiresData) {
      return <ContentComponent seller={seller} />;
    }
    else {
      return <ContentComponent />;
    }
  };
  if (loading) { return <Loading loading={loading} /> }
  else {
    return (
      <>
        <div className="flex flex-col min-h-screen w-full">
          <NavBar/>
          <div className="flex flex-col flex-grow md:flex-row">
            <SettingSidebar highlightIndex={highlightIndex} />
            {!isMobile && (
              <div className="flex-grow z-30 transition-all duration-300">
                {getContentComponentWithProps()}
              </div>
            )}
            {isMobile && getContentComponentWithProps()}
          </div>
          <Footer/>
        </div>
      </>
      
    );
  };
}

export default SettingsContent;
