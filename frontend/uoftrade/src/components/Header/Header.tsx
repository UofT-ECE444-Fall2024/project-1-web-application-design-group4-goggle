'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories"; // Ensure this path is correct

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [inputWidth, setInputWidth] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const buttonWidth = 80; // Approximate width of the search button in pixels

  // Function to calculate the character limit based on current input width
  const calculateCharacterLimit = (width: number) => {
    const adjustedWidth = width - buttonWidth - 20; // 20 for padding/margin
    return Math.floor(adjustedWidth / 8); // Average character width (adjust as needed)
  };

  // Effect to update the input width and trim input on resize
  useEffect(() => {
    const handleResize = () => {
      const inputElement = document.getElementById("search-input");
      if (inputElement) {
        const newWidth = inputElement.clientWidth;
        setInputWidth(newWidth);

        const newLimit = calculateCharacterLimit(newWidth);
        // Trim the search input if it exceeds the new character limit
        if (searchInput.length > newLimit) {
          setSearchInput(searchInput.substring(0, newLimit));
        }
      }
    };

    // Set initial width
    handleResize();
    window.addEventListener("resize", handleResize); // Update width on resize

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [searchInput]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md relative"> {/* Added relative positioning for dropdown */}
      {/* Left Section: Logo */}
      <div className="flex items-center mr-10">
        <Link href="/">
          <Image src="/images/logo/UTrade_logo.svg" alt="UTrade Logo" width={100} height={50} />
        </Link>
      </div>

      {/* Center Section: Search Bar and Browse Category Button */}
      <div className="flex items-center flex-grow justify-center mx-4">
        <div className="flex items-center flex-grow">
          <input
            id="search-input"
            type="text"
            value={searchInput}
            onChange={(e) => {
              const newValue = e.target.value;
              const newLimit = calculateCharacterLimit(e.target.clientWidth);
              // Update state only if within character limit
              if (newValue.length <= newLimit) {
                setSearchInput(newValue);
              }
            }}
            placeholder="Search Listings"
            className="p-2 pl-5 border border-gray-300 rounded-full py-3 w-9/12" // Adjust width as needed
          />
          <button className="bg-primary border border-primary text-white px-10 py-3 rounded-full -ml-12">
            Search
          </button>
        </div>
        <div className="relative inline-block"> {/* Make this div relative to position the dropdown correctly */}
          <button 
            className="bg-primary border border-black px-4 py-3 rounded-md text-white flex items-center ml-4" 
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            Browse Category
            <span className="ml-2">&#9660;</span> {/* Dropdown arrow */}
          </button>
          {dropdownVisible && (
            <div className="absolute left-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {categories.map((category) => (
                <Link key={category.name} href={category.link} onClick={closeDropdown}>
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Profile Image and Post Ad Button */}
      <div className="flex items-center">
        {/* Post Button */}
        <Link href="/post">
          <button className="bg-primary text-white px-6 py-3 rounded-md mr-4">
            Post
          </button>
        </Link>
        {/* User Profile Image */}
        <div className="w-16 h-16 border-2 border-black rounded-full overflow-hidden flex items-center justify-center">
          <Link href="/profile">
            <Image
              src="/images/logo/UTrade_logo.svg" // Replace with profile image
              alt="User Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover" // Ensure the image fills the container
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
