import Image from "next/image";
import { Metadata } from "next";
import React from "react";

import "../../types/inputs";
import Header from "@/components/Header/Header";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";

export const metadata: Metadata = {
  title: "UofTrade Post Listing",
  description: "This is Page to Create a Post on UofTrade",
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
      <section className="w-full flex flex-col items-center p-4 gap-8">
        <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
          <div className="xl:w-[40%] lg:w-[40%] w-full">
            <ImageUpload />
          </div>
          <div className="xl:w-[60%] lg:w-[60%] w-full">
            <CreatePostTextBoxes />
          </div>
        </div>
      </section>
    </>
  );
}

export default PostListingPage;
