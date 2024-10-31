import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";

export const metadata: Metadata = {
    title: "UofTrade User Listings",
    description: "This is the User Listings Page for UofTrade",
    // other metadata
  };
  
  const UserListingsPage = () => {
  
      return (
        <>
           <SettingSidebar highlightIndex={1}/>
        </>
      );
  }
  
  export default UserListingsPage