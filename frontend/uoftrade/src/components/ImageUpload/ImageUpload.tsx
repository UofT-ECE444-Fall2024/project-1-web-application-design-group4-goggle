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
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert(data.message || 'Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <section className="w-full max-h-[40vh] bg-gray-100 flex flex-col items-center p-4">
      <div className="container mx-auto px-4 sm:px-8 md:w-full">
        {/* Styled container for file input */}
        <div
          className="mb-4 xl:w-[40%] lg:w-[40%] md:max-w-full aspect-square bg-light-grey rounded-lg flex flex-col items-center justify-center cursor-pointer border-[3px] border-outline-grey hover:border-primary transition"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <span className="text-4xl font-bold text-heading-1">+</span>
          <span className="text-2xl font-bold text-heading-1">Add photo</span>
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
        <div className="grid grid-cols-3 gap-2 xl:w-[40%] lg:w-[40%] md:max-w-full">
          {imagePreviews.map((src, index) => (
            <div
              key={index}
              className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden"
            >
              <img
                src={src}
                alt={`Preview ${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-primary text-white-bg px-4 py-2 rounded hover:bg-primary transition duration-200"
        >
          Upload Images
        </button>
      </div>
    </section>
  );
};

export default ImageUpload;
