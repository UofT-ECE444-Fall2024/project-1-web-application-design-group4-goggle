"use client";

import React, { useEffect, useState } from "react";
import api from "@/api/axiosInstance";
import NavBar from "@/components/NavBar/NavBar";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";

const PostListingPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [product_id, setProduct_id] = useState<string>("");

  useEffect(() => {
    console.log(uploadedImages)
  }, [uploadedImages])

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

  // const postUserImages = async (images: File[]) => {
  //   const token = localStorage.getItem('token');
  //   const currentUser = localStorage.getItem('currentUser');
  //   console.log("current user", currentUser);

  //   const response = await api.post(`marketplace/product-images/`, images, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log("response data:", response.data);
  // }

  const postUserImages = async (image: File, id: number) => {
    const token = localStorage.getItem('token');
    console.log("image:",image);
    const currentUser = localStorage.getItem('currentUser');
    console.log("current user", currentUser);
    const payload = {
      image: image,
      product: id
    };
    const response = await api.post(`marketplace/product-images/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response data:", response.data);
  }

  const postTextData = async (textData: any, images: File[], useImages: boolean) => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    const payload = {
      title: textData.title,
      price: textData.price,
      description: textData.description,
      location: textData.location.replace(/\s+/g, ''),
      category: textData.category,
      ...(useImages ? { images: images } : {}), // Conditionally include images field
      user_name: currentUser
    };
    return await api.post(`marketplace/products/`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // alert(response.data.message || "Text upload successful!");
  }

  const handlePublish = async (textData: any) => {
    console.log(uploadedImages);
    uploadedImages.forEach((image, index) => console.log(`image${index}`, image));
    const imageFormData = new FormData();
    uploadedImages.forEach((image, index) => imageFormData.append(`${index}`, image));
    console.log(imageFormData);

    try {
      const response = await postTextData(textData, uploadedImages, false);

      for (const image of uploadedImages) {
        await postUserImages(image, response?.data?.id);
      }
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
