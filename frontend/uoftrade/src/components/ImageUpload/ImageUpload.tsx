"use client";

import * as React from "react";
import { ChangeEvent, useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InlineErrorMessage from '../InlineErrorMessage/InlineErrorMessage'; // Assuming this component is in the same directory

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
  const [totalImagesCount, settotalImagesCount] = useState(initialPreviews.length);
  const MAX_IMAGES = 10;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (totalImagesCount >= MAX_IMAGES) {
      setErrorMessage(`You can only upload a maximum of ${MAX_IMAGES} images.`);
    } else {
      setErrorMessage(null); // Clear error message if valid
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImageFiles(prevFiles => [...prevFiles, ...files]);
      setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
      onImagesChange([...imageFiles, ...files]); // Send updated files to parent
      settotalImagesCount(totalImagesCount + files.length);
    }

    // Reset the file input so users can upload the same image again
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";  // Reset the file input field
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    onImagesChange(updatedFiles); // Update parent with new file array

    // Check if we deleted the last image
    if (updatedPreviews.length === 0) {
      // If no images are left, close the carousel
      setIsCarouselOpen(false);
    } else if (index === currentImageIndex && updatedPreviews.length > 0) {
      // If we deleted the current image, set the index to the previous image
      setCurrentImageIndex(prevIndex => (prevIndex === 0 ? updatedPreviews.length - 1 : prevIndex - 1));
    } else if (index < currentImageIndex) {
      // If we deleted an image before the current index, shift the index back by 1
      setCurrentImageIndex(currentImageIndex - 1);
    }

    settotalImagesCount(totalImagesCount - 1); // Decrement image count
    setErrorMessage(null); // Remove error message if there is one
  };

  const openCarousel = (index: number) => {
    setCurrentImageIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="w-full">
      <div
        className="aspect-square bg-light-grey rounded-lg flex flex-col items-center justify-center cursor-pointer border-[3px] border-outline-grey hover:border-primary transition w-full"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <span className="text-4xl user-select-none font-bold text-heading-1">+</span>
        <span className="text-2xl user-select-none font-bold text-heading-1">Add photo</span>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
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
          <div className="w-full aspect-square bg-light-grey border-outline-grey rounded-md flex items-center justify-center cursor-pointer" onClick={() => openCarousel(0)}>
            <span className="text-heading-1 font-bold">View More</span>
          </div>
        )}
      </div>

      {/* Fullscreen Carousel Modal */}
      {isCarouselOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <button
            className="absolute top-4 right-4 p-2 bg-white rounded-full"
            onClick={closeCarousel}
          >
            <CloseIcon />
          </button>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full"
            onClick={goToPreviousImage}
          >
            <ArrowBackIosIcon />
          </button>
          <div className="relative w-3/4 h-3/4">
            <Image
              src={imagePreviews[currentImageIndex]}
              alt={`Image ${currentImageIndex}`}
              layout="fill"
              objectFit="contain"
            />
            {/* Delete icon inside the carousel */}
            <span
              onClick={() => handleDeleteImage(currentImageIndex)}
              className="absolute bottom-2 right-2 z-20 flex items-center justify-center p-1 bg-white rounded-full shadow-md transition-transform hover:scale-125 cursor-pointer"
            >
              <DeleteIcon className="text-primary" />
            </span>
          </div>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full"
            onClick={goToNextImage}
          >
            <ArrowForwardIosIcon />
          </button>
          <div className="absolute bottom-4 flex space-x-2">
            {imagePreviews.map((src, index) => (
              <div
                key={index}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer ${index === currentImageIndex ? "border-primary" : "border-gray-400"}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image src={src} alt={`Thumbnail ${index}`} width={64} height={64} objectFit="cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
