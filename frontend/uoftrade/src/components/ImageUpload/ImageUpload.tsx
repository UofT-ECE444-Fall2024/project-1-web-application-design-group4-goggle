"use client";

import * as React from "react";
import { useState, ChangeEvent } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    images.forEach((image, index) => formData.append(`image${index}`, image));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message || "Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Styled container for file input */}
      <div
        className="aspect-square bg-light-grey rounded-lg flex flex-col items-center justify-center cursor-pointer border-[3px] border-outline-grey hover:border-primary transition w-full"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <span className="text-4xl user-select-none font-bold text-heading-1">
          +
        </span>
        <span className="text-2xl user-select-none font-bold text-heading-1">
          Add photo
        </span>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Image Previews */}
      <div className="grid grid-cols-3 gap-2 mt-4 w-full">
        {imagePreviews.slice(0, 5).map((src, index) => (
          <div
            key={index}
            className="w-full aspect-square border-2 bg-light-grey border-outline-grey rounded-md overflow-hidden"
          >
            <img
              src={src}
              alt={`Preview ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        {imagePreviews.length > 5 && (
          <div className="w-full aspect-square border-2 bg-light-grey border-outline-grey hover:border-primary rounded-md flex items-center justify-center">
            <span className="text-heading-1 user-select-none font-bold">
              View More
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-primary text-white-bg px-4 py-2 rounded w-full hover:bg-light-grey hover:text-heading-1 transition duration-200"
      >
        Upload Images
      </button>
    </div>
  );
};

export default ImageUpload;
