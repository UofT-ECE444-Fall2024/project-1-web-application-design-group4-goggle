'use client'
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import TrendingCarousel from "@/components/Carousel/TrendingCarousel";
import CategoriesSelection from "@/components/CategoriesSelection/CategoriesSelection";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

const HomePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      // Optionally verify the JWT by making an API call to the backend
      axios.get("//localhost:12000/auth", { //this only works locally in this format, not sure why
        headers: { Authorization: `Bearer ${token}` },
      })

      
      .then((response) => {
        // If the token is valid, set authenticated to true
        console.log("Token verified", response.data);
        setAuthenticated(true);
      })
      .catch((error) => {
        // Handle invalid or expired token
        console.error("Token verification failed", error);
        router.push("/signin"); // Invalid token, redirect to signin
      });
    } else {
      console.log("Token invalid, redirecting to signin.1");
      router.push("/signin"); // Redirect if no token
    }
  }, [router]);


  if (!authenticated) return null;

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header at the top */}
      <NavBar title="" />

      {/* Main content */}
      <div className="flex-grow w-full flex flex-col justify-between">
        {/* Trending Carousel */}
        <div className="flex-grow mx-auto w-full">
          <h1 className="text-2xl py-10 bg-primary font-bold px-10 text-left text-white-bg">
            Currently Trending on UofTrade...
          </h1>
          <TrendingCarousel />
        </div>

        {/* Categories Selection */}
        <div className="flex-grow mx-auto w-full ">
          <h1 className="text-2xl py-10 bg-primary font-bold px-10 text-left text-white-bg">
            Explore Categories...
          </h1>
          <CategoriesSelection />
        </div>
      </div>

      {/* Footer pinned to the bottom */}
      <Footer />
    </div>

  );
};

export default HomePage;
