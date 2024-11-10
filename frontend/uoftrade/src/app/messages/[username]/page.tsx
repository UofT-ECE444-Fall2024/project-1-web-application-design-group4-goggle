import { Metadata } from "next";
import React, { useState } from "react";

import NavBar from "@/components/NavBar/NavBar";
import MessagePageContent from "@/components/Messaging/MessagePageContent";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";

export const metadata: Metadata = {
  title: "UofTrade Messages",
  description: "This is the Messaging",
};

const MessagePage = () => {

  return (
    <>
        <Loading/>
        <div className="flex flex-col justify-between h-screen">
            <NavBar/>
              <div className="flex-grow">
                    <MessagePageContent/>
              </div>
            <Footer/>
        </div>
    </>
    
  );
};

export default MessagePage;