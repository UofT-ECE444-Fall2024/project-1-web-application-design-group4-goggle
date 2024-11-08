import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";

export const metadata: Metadata = {
    title: "UofTrade Appearance",
    description: "This is the Appearance Page for UofTrade",
    // other metadata
  };
  
  const AppearancePage = () => {
  
      return (
        <>
            <SettingSidebar highlightIndex={3}/>
        </>
      );
  }
  
  export default AppearancePage