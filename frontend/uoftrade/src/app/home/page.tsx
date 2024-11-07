import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import TrendingCarousel from "@/components/Carousel/TrendingCarousel";



const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header at the top */}
      <NavBar />

      {/* Content in the middle, taking up remaining space */}
      <div className="flex-grow w-full mx-auto">
        <h1 className="text-4xl font-bold text-left pl-10 mb-8 bg-primary text-white py-10">Currently Trending on UofTrade ... </h1>
        <TrendingCarousel />  
      </div>
      <div className="flex-grow w-full mx-auto">
        <h1 className="text-4xl font-bold text-left pl-10 mb-8 bg-primary text-white py-10">Browse Categories ... </h1>
        <TrendingCarousel />  
      </div>

      {/* Footer pinned to the bottom */}
      <Footer />
    </div>
  );
};

export default HomePage;
