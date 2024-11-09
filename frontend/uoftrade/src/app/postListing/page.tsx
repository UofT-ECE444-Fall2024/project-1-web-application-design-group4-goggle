"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import NavBar from "@/components/NavBar/NavBar";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";
import { useRouter } from "next/navigation";
import useTokenCheck from "@/api/TokenCheck";

const PostListingPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); 
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useTokenCheck(setAuthenticated);
  useEffect(() => {
    // Check the authentication status and stop loading once it's checked
    if (authenticated !== null) {
      setLoading(false); // Once the authentication check is done, stop the loading state
      if (authenticated === false) {
        router.push("/signin");
      }
    }
  }, [authenticated, router]);

  

  const handleImagesChange = (newImages: File[]) => {
    // Update the uploaded images
    setUploadedImages((prevImages) => [...prevImages, ...newImages]); // Append new images to existing ones

    // Create new previews and append them to existing previews
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]); // Append new previews
  };

  const handlePublish = async (textData: any) => {
    const formData = new FormData();
    uploadedImages.forEach((image, index) => formData.append(`image${index}`, image));

    formData.append("title", textData.title);
    formData.append("price", textData.price);
    formData.append("description", textData.description);
    formData.append("pickup_location", textData.pickup_location);
    formData.append("category", textData.category);

    try {
      const response = await axios.post("api/upload", formData);
      alert(response.data.message || "Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  if (!loading) {
    return (
      <div>
        <Image src="/images/logo/UTrade_logo.svg" alt="logo" width={140} height={30} className="m-5" />
        <NavBar title="Create a Post!" />
        <section className="w-full flex flex-col items-center p-4 gap-8">
          <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
            <div className="xl:w-[40%] lg:w-[40%] w-full">
              <ImageUpload onImagesChange={handleImagesChange} imagePreviews={imagePreviews} />
            </div>
            <div className="xl:w-[60%] lg:w-[60%] w-full">
              <CreatePostTextBoxes onPublish={handlePublish} />
            </div>
          </div>
        </section>
      </div>
    );}
};

export default PostListingPage;
