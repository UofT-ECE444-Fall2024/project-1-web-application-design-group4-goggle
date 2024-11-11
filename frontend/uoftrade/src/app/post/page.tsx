"use client";

import React, { useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar/NavBar";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";

const PostListingPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImagesChange = (newImages: File[]) => {
    setUploadedImages((prevImages) => {
      // Filter out duplicates based on 'name' and 'lastModified' properties
      const uniqueNewImages = newImages.filter(
        (newImage) =>
          !prevImages.some(
            (existingImage) =>
              existingImage.name === newImage.name &&
              existingImage.lastModified === newImage.lastModified
          )
      );

      // Append only the unique new images to existing images
      return [...prevImages, ...uniqueNewImages];
    });

    setImagePreviews((prevPreviews) => {
      // Generate previews only for unique new images
      const uniquePreviews = newImages
        .filter(
          (newImage) =>
            !uploadedImages.some(
              (existingImage) =>
                existingImage.name === newImage.name &&
                existingImage.lastModified === newImage.lastModified
            )
        )
        .map((file) => URL.createObjectURL(file));

      return [...prevPreviews, ...uniquePreviews];
    });
    console.log("Uplaoded Images",uploadedImages);
  };

  const handlePublish = async (textData: any) => {
    console.log(uploadedImages);
    uploadedImages.forEach((image, index) => console.log(`image${index}`, image));
    const imageFormData = new FormData();
    uploadedImages.forEach((image, index) => imageFormData.append(`${index}`, image));
    console.log(imageFormData);

    // Upload image text
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}product-images`, imageFormData);
      alert(response.data.message || "Image upload successful!");
    } catch (error) {
      console.error("Image upload failed:", error);
    }

    const textFormData = new FormData();
    textFormData.append("title", textData.title);
    textFormData.append("price", textData.price);
    textFormData.append("description", textData.description);
    textFormData.append("location", textData.location.replace(/\s+/g, ''));
    textFormData.append("category", textData.category);
    console.log(textFormData);

    // Upload form text
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}products`, textFormData);
      alert(response.data.message || "Text upload successful!");
    } catch (error) {
      console.error("Text upload failed:", error);
    }
  };

  return (
    <>
      <Loading/>
      <div className="flex flex-col min-h-screen w-full">
        <NavBar />
        <Header title="Create a Post!" />
        <div className="w-full flex flex-col items-center p-4 gap-8 flex-grow">
          <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
            <div className="xl:w-[40%] lg:w-[40%] w-full">
              <ImageUpload onImagesChange={handleImagesChange} imagePreviews={imagePreviews} />
            </div>
            <div className="xl:w-[60%] lg:w-[60%] w-full">
              <CreatePostTextBoxes onPublish={handlePublish} />
            </div>
          </div>
        </div>
        <Footer />
      </div> 
    </>
    
  );
};

export default PostListingPage;
