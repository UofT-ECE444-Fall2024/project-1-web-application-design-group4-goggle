import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";

export const metadata: Metadata = {
    title: "UofTrade Notifications",
    description: "This is the Notifications Page for UofTrade",
    // other metadata
  };
  
  const NotificationsPage = () => {
  
      return (
        <>
           <SettingSidebar highlightIndex={2}/>
        </>
      );
  }
  
  export default NotificationsPage