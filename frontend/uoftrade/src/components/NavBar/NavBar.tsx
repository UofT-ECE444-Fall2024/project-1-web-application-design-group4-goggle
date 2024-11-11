'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories"; 
import CategoryDropdown from "@/components/Dropdown_Nav/DropDown";
import { useRouter } from "next/navigation";
import { Chat } from "@mui/icons-material";
import axios from "axios";
import { Seller } from "@/types/seller";


const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [inputWidth, setInputWidth] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const buttonWidth = 80; // Approximate width of the search button in pixels
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state for data fetching
  const [seller, setSeller] = useState<Seller>();

  // Function to calculate the character limit based on current input width
  const calculateCharacterLimit = (width: number) => {
    const adjustedWidth = width - buttonWidth; // 20 for padding/margin
    return Math.floor(adjustedWidth / 8); // Average character width (adjust as needed)
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      // Navigate to the search page with the user input
      router.push(`/search/${encodeURIComponent(searchInput)}`);
    }
  };

  const getData = async () => {
    const currentUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');

    setLoading(true); // Start loading before the request
    try {
      //get current user details
      const userDetails = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/info/${currentUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userImages = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/UserImages/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_name: currentUser,
        }
      });
      console.log("User image: ", userImages.data);

      // Set the seller data once the API response is received
      setSeller({
        firstName: userDetails.data?.first_name,
        lastName: userDetails.data?.last_name,
        username: userDetails.data?.user_name,
        rating: userDetails.data?.rating,
        profilePic: userImages.data[0]?.image || '', // Add profilePic if available
      });

    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  // Fetch user details once the component mounts if requiredData is true
  useEffect(() => {
      getData();
  }, []);

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
    <header className="flex items-center justify-between p-4 bg-white shadow-md relative"> 
      {/* Left Section: Logo */}
      <div className="flex items-center mr-10" style={{color: "white"}}>
        <Link href="/home">
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search Listings"
            className="p-2 pl-5 border border-gray-300 rounded-full py-3 w-9/12" // Adjust width as needed
          />
          <button onClick={handleSearch} className="bg-primary border border-primary text-white px-10 py-3 rounded-full -ml-12" style={{color: "white"}}>
            Search
          </button>
        </div>

        <div className="relative inline-block"> 
          <CategoryDropdown />
        </div>
      </div>

      {/* Right Section: Profile Image and Post Ad Button */}
      <div className="flex items-center">
        {/* Post Button */}
        <Link href="/post">
          <button className="bg-primary text-white px-6 py-3 rounded-md mr-4"  style={{color: "white"}}>
            Post
          </button>
        </Link>
        {/* Post Button */}
        <Link href="/messages" className="">
          <button className="bg-primary text-white px-6 py-2 rounded-md mr-4"  style={{color: "white"}}>
            <Chat fontSize="large"/>
          </button>
        </Link>
        {/* User Profile Image */}
        <div className="w-16 h-16 border-2 border-black rounded-full overflow-hidden flex items-center justify-center">
          <Link href="/profile">
            <Image
              // src="/images/logo/UTrade_logo.svg" // Replace with profile image
              src={seller?.profilePic || '/images/logo/UTrade_small.svg'}
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

export default NavBar;
