"use client";

import * as React from "react";
import { ChangeEvent, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Image from "next/image";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  imagePreviews: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange, imagePreviews: initialPreviews }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialPreviews);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImageFiles(prevFiles => [...prevFiles, ...files]);
      setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
      onImagesChange([...imageFiles, ...files]); // Send updated files to parent
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    onImagesChange(updatedFiles); // Update parent with new file array
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
            className="relative w-full aspect-square border-2 bg-light-grey border-outline-grey rounded-md overflow-hidden"
          >
            <span
              onClick={() => handleDeleteImage(index)}
              className="absolute top-2 right-2 z-20 flex items-center justify-center p-1 bg-white rounded-full shadow-md transition-transform hover:scale-125 cursor-pointer"
            >
              <DeleteIcon className="text-primary" />
            </span>
            <Image className="object-cover w-full h-full" src={src} alt={`Preview ${index}`} fill />
          </div>
        ))}
        {imagePreviews.length > 5 && (
          <div className="w-full aspect-square bg-light-grey border-outline-grey rounded-md flex items-center justify-center">
            <span className="text-heading-1 font-bold">View More</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
