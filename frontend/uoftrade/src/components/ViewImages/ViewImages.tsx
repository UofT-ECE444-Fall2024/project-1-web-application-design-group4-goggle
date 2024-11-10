// components/ViewImages.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
      // If the deleted image is the one currently being viewed, adjust the index
      const newIndex = currentImageIndex === images.length - 1 ? currentImageIndex - 1 : currentImageIndex;
      setCurrentImageIndex(newIndex);
      onDeleteImage(currentImageIndex);
    }
  };

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
        <ArrowBackIosIcon />
      </button>
      <div className="relative w-3/4 h-3/4">
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
          layout="fill"
          objectFit="contain"
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
            className={`w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer ${index === currentImageIndex ? "border-primary" : "border-gray-400"}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image src={src} alt={`Thumbnail ${index}`} width={64} height={64} objectFit="cover" />
          </div>
        ))}
      </div>
      {onDeleteImage && (
        <span
          onClick={handleDeleteImage}
          className="absolute bottom-4 right-4 z-20 flex items-center justify-center p-1 bg-white rounded-full shadow-md transition-transform hover:scale-125 cursor-pointer"
        >
          <DeleteIcon className="text-primary" />
        </span>
      )}
    </div>
  );
};

export default ViewImages;
