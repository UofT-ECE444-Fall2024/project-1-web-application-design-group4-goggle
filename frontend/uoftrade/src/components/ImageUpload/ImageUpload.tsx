"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import InlineErrorMessage from "../InlineErrorMessage/InlineErrorMessage";
import ViewImages from "../ViewImages/ViewImages";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  imagePreviews: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange, imagePreviews: initialPreviews }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialPreviews);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalImagesCount, setTotalImagesCount] = useState(initialPreviews.length);
  const MAX_IMAGES = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter(file =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setErrorMessage("Only .png, .jpg, and .jpeg files are allowed.");
      return;
    }

    if (totalImagesCount + validFiles.length > MAX_IMAGES) {
      setErrorMessage(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    setErrorMessage(null);

    const uniqueFiles = validFiles.filter(
      newFile => !imageFiles.some(file => file.name === newFile.name)
    );
    const newPreviews = uniqueFiles.map(file => URL.createObjectURL(file));

    setImageFiles(prevFiles => [...prevFiles, ...uniqueFiles]);
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    onImagesChange([...imageFiles, ...uniqueFiles]);
    setTotalImagesCount(totalImagesCount + uniqueFiles.length);

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    onImagesChange(updatedFiles);
    setTotalImagesCount(totalImagesCount - 1);
    setErrorMessage(null);
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
        <input
          ref={fileInputRef}
          type="file"
          accept=".png, .jpeg, .jpg"
          multiple
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      {errorMessage && <InlineErrorMessage message={errorMessage} />}

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
            <img
              className="object-cover w-full h-full"
              src={src}
              alt={`Preview ${index}`}
              onClick={() => openCarousel(index)}
            />
          </div>
        ))}
        {imagePreviews.length > 5 && (
          <div
            className="relative w-full aspect-square border-2 bg-light-grey border-outline-grey rounded-md flex items-center justify-center"
            onClick={() => openCarousel(5)}
          >
            <span className="text-xl font-bold text-heading-1 text-primary">
              +{imagePreviews.length - 5}
            </span>
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
