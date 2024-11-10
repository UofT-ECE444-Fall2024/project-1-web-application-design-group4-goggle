'use client';

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/categories"; // Ensure this path is correct

const CategoryDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        className="bg-primary border border-black w-full px-4 py-3 rounded-md text-white flex justify-between items-center"
        onClick={toggleDropdown}
        style={{ color: "white" }}
      >
        Browse Category
        <span className="ml-2">&#9660;</span> {/* Dropdown arrow */}
      </button>
      {dropdownVisible && (
        <div
          className="absolute left-0 z-50 mt-2 bg-white-bg border border-gray-300 rounded-md shadow-lg min-w-full"
        >
          {categories?.map((category) => (
            <Link key={category.name} href={category.link} onClick={closeDropdown}>
              <div className="px-4 py-3 hover:bg-dark-grey cursor-pointer transition-colors duration-200 ease-in-out">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
