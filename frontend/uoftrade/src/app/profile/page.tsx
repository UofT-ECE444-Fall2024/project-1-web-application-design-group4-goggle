import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";

export const metadata: Metadata = {
    title: "UofTrade Profile",
    description: "This is the Profile Page for UofTrade",
    // other metadata
  };
  
  const ProfilePage = () => {
  
      return (
        <>
           <SettingSidebar highlightIndex={0}/>
        </>
      );
  }
  
  export default ProfilePage