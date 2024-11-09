'use client'
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import TrendingCarousel from "@/components/Carousel/TrendingCarousel";
import CategoriesSelection from "@/components/CategoriesSelection/CategoriesSelection";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import useTokenCheck from "@/api/TokenCheck";

const HomePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useTokenCheck(setAuthenticated);
  useEffect(() => {
    // Check the authentication status and stop loading once it's checked
    if (authenticated !== null) {
      setLoading(false); // Once the authentication check is done, stop the loading state
      if (authenticated === false) {
        router.push("/signin");
      }
    }
  }, [authenticated, router]);

  // Show loading state until token check is complete
  if (!loading) {
    return(
    <div className="flex flex-col min-h-screen w-full">
      {/* Header at the top */}
      <NavBar />

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
};

export default HomePage;
