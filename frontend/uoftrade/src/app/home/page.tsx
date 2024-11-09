'use client'
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import TrendingCarousel from "@/components/Carousel/TrendingCarousel";
import CategoriesSelection from "@/components/CategoriesSelection/CategoriesSelection";
import Loading from "@/components/Loading/Loading";

const HomePage = () => {

    return(
    <>
      <Loading/>
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
    </>
    );
};

export default HomePage;
