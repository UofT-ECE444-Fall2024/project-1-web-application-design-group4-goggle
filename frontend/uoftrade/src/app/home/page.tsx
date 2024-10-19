import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Content from "@/components/Layout/MainContent"; // Ensure you import the correct path

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header at the top */}
      <Header />

      {/* Content in the middle, taking up remaining space */}
      <div className="flex-grow container mx-auto py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to UofTrade</h1>
        <Content />  {/* This is where your listings and layout will go */}
      </div>

      {/* Footer pinned to the bottom */}
      <Footer />
    </div>
  );
};

export default HomePage;
