"use client";

import React, { useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar/NavBar";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";
import { useParams } from "next/navigation";

const EditListingPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { id } = useParams();

  // make API call to get fields using id
  const listing = {
          id: 1,
          title: "Microwave",
          price: "$28",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
          image: "/images/misc/microwave.jpg",
          seller: {
            name: "Guy Dude",
            image: "/images/logo/UTrade_small.svg",
            rating: 4.5,
          },
          tags: ["Appliances"],
          publishDate: "Nov 2th, 2024",
        };

  const { title, price, image, description, seller, tags, publishDate } = listing;


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
    formData.append("campus", textData.campus);
    formData.append("category", textData.category);
    formData.append("pickup_location", textData.pickup_location);

    try {
      const response = await axios.post("/api/upload", formData);
      alert(response.data.message || "Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <NavBar />
        <Header title="Edit Listing" />
        <div className="w-full flex flex-col items-center p-4 gap-8 flex-grow">
          <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
            <div className="xl:w-[40%] lg:w-[40%] w-full">
              <ImageUpload onImagesChange={handleImagesChange} imagePreviews={imagePreviews} />
            </div>
            <div className="xl:w-[60%] lg:w-[60%] w-full">
              <CreatePostTextBoxes onPublish={handlePublish} isEdit={true}/>
            </div>
          </div>
        </div>
        <Footer />
      </div> 
    </>
    
  );
};

export default EditListingPage;
