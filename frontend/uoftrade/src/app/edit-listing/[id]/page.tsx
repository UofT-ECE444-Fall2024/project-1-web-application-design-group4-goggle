"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar/NavBar";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";
import { useParams } from "next/navigation";
import { Listing } from "@/types/listing";
import LabelledCheckbox from "@/components/Checkbox/LabelledCheckbox";

const EditListingPage = () => {
  const { id } = useParams();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [sold, setSold] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [listing, setListing] = useState<Listing>();

  // Fetch listing details when the component mounts
  useEffect(() => {
    const fetchListingData = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}marketplace/product-detail/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const product = response.data;
        setListing({
          id: product?.id,
          title: product?.title,
          price: product?.price,
          description: product?.description,
          image: product?.images?.[0].image.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12001$2") || '',
          location: product?.location,
          seller: {
            name: product.seller?.name || "Unknown Seller",
            username: product.seller?.username || "",
            image: product.seller?.image || "",
            rating: product.seller?.rating || 0,
          },
          tags: product?.category ? [product.category] : [],
          publishDate: product?.date_posted,
        });

        // Ensure unique image URLs and set them directly in imagePreviews with explicit typing
        const uniqueImageUrls = Array.from(
          new Set(
            product.images?.map((img: { image: string }) =>
              img.image.replace(/(http:\/\/[^/]+)(\/media)/, "$1:12001$2")
            ) || []
          )
        ) as string[];

        // Update the state with unique image previews
        uniqueImageUrls.forEach(img => {
          imagePreviews.push(img);
        });

        setSold(product.sold || false);

      } catch (error) {
        console.error("Error fetching listing details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, [id]); // Ensure `id` is in the dependency array



  console.log(listing);
  // const handleImagesChange = (newImages: File[]) => {
  //   setUploadedImages((prevImages) => {
  //     const uniqueNewImages = newImages.filter(
  //       (newImage) =>
  //         !prevImages.some(
  //           (existingImage) =>
  //             existingImage.name === newImage.name &&
  //             existingImage.lastModified === newImage.lastModified
  //         )
  //     );
  //     return [...prevImages, ...uniqueNewImages];
  //   });

  //   setImagePreviews((prevPreviews) => {
  //     const uniquePreviews = newImages
  //       .filter(
  //         (newImage) =>
  //           !uploadedImages.some(
  //             (existingImage) =>
  //               existingImage.name === newImage.name &&
  //               existingImage.lastModified === newImage.lastModified
  //           )
  //       )
  //       .map((file) => URL.createObjectURL(file));
  //     return [...prevPreviews, ...uniquePreviews];
  //   });
  // };
  const handleImagesChange = (newImages: File[]) => {
    const uniqueNewImages = newImages.filter(
      (newImage) =>
        !uploadedImages.some(
          (existingImage) =>
            existingImage.name === newImage.name &&
            existingImage.lastModified === newImage.lastModified
        )
    );

    setUploadedImages((prevImages) => [...prevImages, ...uniqueNewImages]);

    const newPreviews = uniqueNewImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const postUserImages = async (image: File, id: number) => {
    const token = localStorage.getItem('token');
    console.log("image:", image);
    const currentUser = localStorage.getItem('currentUser');
    console.log("current user", currentUser);
    const payload: Object = {
      image: image,
      product: id
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-images/`, payload, {
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
    const payload: Object = {
      title: textData.title,
      price: textData.price,
      description: textData.description,
      location: textData.location.replace(/\s+/g, ''),
      category: textData.category,
      ...(useImages ? { images: images } : {}), // Conditionally include images field
      user_name: currentUser
    };
    return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-detail/${id}`, payload, {
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
        await postUserImages(image, Number(id));
      }
    } catch (error) {
      console.error("Text upload failed:", error);
    }
  };
  console.log(listing?.tags[0]);
  console.log(listing?.location);

  return (
    <>
      <Loading loading={loading} />
      <div className="flex flex-col min-h-screen w-full">
        <NavBar />
        <Header title="Edit Listing" />
        <div className="w-full flex flex-col items-center p-4 gap-8 flex-grow">
          <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
            <div className="xl:w-[40%] lg:w-[40%] w-full">
              <ImageUpload onImagesChange={handleImagesChange} imagePreviews={imagePreviews} />
            </div>
            <div className="xl:w-[60%] lg:w-[60%] w-full">
              <LabelledCheckbox
                label="Mark as Sold"
                name="sold"
                checked={sold}
                onChange={(e) => setSold(e.target.checked)}
              />
              <CreatePostTextBoxes
                onPublish={handlePublish}
                isEdit={true}
                titleValue={listing?.title || ""}
                priceValue={listing?.price || ""}
                descriptionValue={listing?.description || ""}
                pickup_locationValue={listing?.location || ""}
                categoryValue={listing?.tags[0] || ""}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EditListingPage;
