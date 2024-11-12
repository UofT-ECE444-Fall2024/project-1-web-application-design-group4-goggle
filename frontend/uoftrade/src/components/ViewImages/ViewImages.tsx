// components/ViewImages.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';

interface ViewImagesProps {
  images: string[]; // Array of image URLs to display
  initialIndex: number; // The initial index to start the carousel
  onClose: () => void; // Function to close the carousel
  onDeleteImage?: (index: number) => void; // Optional delete image function
}

const ViewImages: React.FC<ViewImagesProps> = ({ images, initialIndex, onClose, onDeleteImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  useEffect(() => {
    if (images.length === 0) {
      onClose(); // Close the carousel if no images are left
    }
  }, [images.length, onClose]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDeleteImage = () => {
    if (onDeleteImage) {
      const newIndex = currentImageIndex === images.length - 1 ? currentImageIndex - 1 : currentImageIndex;
      setCurrentImageIndex(newIndex);
      onDeleteImage(currentImageIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPreviousImage();
      } else if (event.key === "ArrowRight") {
        goToNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <button
        className="absolute top-4 right-4 p-2 bg-white rounded-full"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full"
        onClick={goToPreviousImage}
      >
        <ArrowForwardIosIcon className="rotate-180" />
      </button>
      <div className="relative w-3/4 h-3/4">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
          className={"object-contain"}
        />
      </div>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full"
        onClick={goToNextImage}
      >
        <ArrowForwardIosIcon />
      </button>
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((src, index) => (
          <div
            key={index}
            className={`w-[90px] h-[90px] border-2 rounded-md overflow-hidden cursor-pointer ${index === currentImageIndex ? "border-white" : "border-black"}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={src}
              alt={`Thumbnail ${index}`}
              className="object-cover w-full h-full"
              width={90}
              height={90}
            />
          </div>
        ))}
      </div>
      {onDeleteImage && (
        <span
          onClick={handleDeleteImage}
          className="absolute bottom-[125px] right-4 z-20 flex items-center justify-center p-1 bg-white rounded-full shadow-md transition-transform hover:scale-125 cursor-pointer"
        >
          <DeleteIcon className="text-primary" />
        </span>
      )}
    </div>
  );
};

export default ViewImages;
