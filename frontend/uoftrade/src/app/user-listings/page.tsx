import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ListingInfo from "@/components/ListingInfo/ListingInfo";

export const metadata: Metadata = {
    title: "UofTrade User Listings",
    description: "This is the User Listings Page for UofTrade",
    // other metadata
  };
  
  const UserListingsPage = () => {
  
      return (
        <>
          <NavBar title=""/>
          <SettingSidebar highlightIndex={1}/>
          <ListingInfo />
          <Footer />
        </>
      );
  }
  
  export default UserListingsPage