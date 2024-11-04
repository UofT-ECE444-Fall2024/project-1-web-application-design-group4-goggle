"use client";

import * as React from "react";
import { ChangeEvent } from "react";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  imagePreviews: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange, imagePreviews }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onImagesChange(files); // Send updated files to parent
    }
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

      <div className="grid grid-cols-3 gap-2 mt-4 w-full">
        {imagePreviews.slice(0, 5).map((src, index) => (
          <div
            key={index}
            className="w-full aspect-square border-2 bg-light-grey border-outline-grey rounded-md overflow-hidden"
          >
            <img src={src} alt={`Preview ${index}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
