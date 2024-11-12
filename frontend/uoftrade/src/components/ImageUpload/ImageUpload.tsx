// components/ImageUpload.tsx

"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import InlineErrorMessage from '../InlineErrorMessage/InlineErrorMessage'; // Assuming this component is in the same directory
import ViewImages from '../ViewImages/ViewImages'; // Importing the new ViewImages component

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  imagePreviews: string[]; // This prop contains the initial image previews (URLs)
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange, imagePreviews: initialPreviews }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Holds the new files selected by the user
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialPreviews); // Holds the image preview URLs
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalImagesCount, setTotalImagesCount] = useState(initialPreviews.length);
  const MAX_IMAGES = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle "Change Picture" button click
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();  // Open file input dialog
    }
  };

  // Function to handle file selection
  // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
  //     try {
  //       postUserImage(file);
  //     } catch (error) {
  //       console.error('Error posting image', error);
  //     }
  //   }
  // };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Filter valid image types
    const validFiles = files.filter(file =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );

    // If any files are invalid, set an error message
    if (validFiles.length !== files.length) {
      setErrorMessage("Only .png, .jpg, and .jpeg files are allowed.");
      return;
    }

    // Check if maximum image count would be exceeded
    if (totalImagesCount + validFiles.length > MAX_IMAGES) {
      setErrorMessage(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    // Clear any previous error message if valid files are selected
    setErrorMessage(null);

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImageFiles(prevFiles => [...prevFiles, ...validFiles]);
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    onImagesChange([...imageFiles, ...validFiles]); // Update parent with new file array
    setTotalImagesCount(totalImagesCount + validFiles.length);

    // Reset the file input field
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };


  const handleDeleteImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    onImagesChange(updatedFiles); // Update parent with new file array
    setTotalImagesCount(totalImagesCount - 1); // Decrement image count
    setErrorMessage(null); // Remove error message if there is one
  };

  const openCarousel = (index: number) => {
    setCurrentImageIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  return (
    <div className="w-full">
      <div
        className="aspect-square bg-light-grey rounded-lg flex flex-col items-center justify-center cursor-pointer border-[3px] border-outline-grey hover:border-primary transition w-full"
        onClick={handleImageUpload}
      >
        <span className="text-4xl user-select-none font-bold text-heading-1">+</span>
        <span className="text-2xl user-select-none font-bold text-heading-1">Add photo</span>
        {/* <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        /> */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".png, .jpeg, .jpg"
          multiple
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

      {errorMessage && <InlineErrorMessage message={errorMessage} />} {/* Display error message if applicable */}

      <div className="grid grid-cols-3 gap-2 mt-4 w-full">
        {imagePreviews.slice(0, 5).map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-square border-2 bg-light-grey border-outline-grey rounded-md overflow-hidden"
          >
            <span
              onClick={() => handleDeleteImage(index)}
              className="absolute top-2 right-2 z-20 flex items-center justify-center p-1 bg-white rounded-full shadow-md transition-transform hover:scale-125 cursor-pointer"
            >
              <DeleteIcon className="text-primary" />
            </span>
            <Image className="object-cover w-full h-full" src={src} alt={`Preview ${index}`} fill onClick={() => openCarousel(index)} />
          </div>
        ))}
        {imagePreviews.length > 5 && (
          <div
            className="relative w-full aspect-square border-2 bg-light-grey border-outline-grey rounded-md flex items-center justify-center"
            onClick={() => openCarousel(5)} // Open the carousel from the 6th image onwards
          >
            <span className="text-xl font-bold text-heading-1 text-primary">+{imagePreviews.length - 5}</span>
          </div>
        )}
      </div>

      {isCarouselOpen && (
        <ViewImages
          images={imagePreviews}
          initialIndex={currentImageIndex}
          onClose={closeCarousel}
          onDeleteImage={handleDeleteImage}
        />
      )}
    </div>
  );
};

export default ImageUpload;
