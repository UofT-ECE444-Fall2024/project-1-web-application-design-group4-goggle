"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Header from "@/components/Header/Header";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";

const PostListingPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleImagesChange = (images: File[]) => {
    setUploadedImages(images); // Update the state with selected images
  };

  const handlePublish = async (textData: any) => {
    const formData = new FormData();
    uploadedImages.forEach((image, index) => formData.append(`image${index}`, image));

    formData.append("title", textData.title);
    formData.append("price", textData.price);
    formData.append("description", textData.description);
    formData.append("pickup_location", textData.pickup_location);

    try {
      const response = await axios.post("/api/upload", formData);
      alert(response.data.message || "Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <Image src="/images/logo/UTrade_logo.svg" alt="logo" width={140} height={30} className="m-5" />
      <Header title="Create a Post!" />
      <section className="w-full flex flex-col items-center p-4 gap-8">
        <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
          <div className="xl:w-[40%] lg:w-[40%] w-full">
            <ImageUpload onImagesChange={handleImagesChange} />
          </div>
          <div className="xl:w-[60%] lg:w-[60%] w-full">
            <CreatePostTextBoxes onPublish={handlePublish} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostListingPage;
