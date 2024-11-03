import Image from "next/image";
import { Metadata } from "next";
import React from "react";

import "../../types/inputs"

// import TextBox from "@/components/TextBox/TextBox";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "UofTrade Post Listing",
  description: "This is Page to Create a Post on UofTrade",
  // other metadata
};

const PostListingPage = () => {

    return (
        <>
            <Image
                src="/images/logo/UTrade_logo.svg" 
                alt="logo"
                width={140}
                height={30}
                className="m-5"
            />
            <Header title="Create a Post!" />
        </>
    );
}

export default PostListingPage