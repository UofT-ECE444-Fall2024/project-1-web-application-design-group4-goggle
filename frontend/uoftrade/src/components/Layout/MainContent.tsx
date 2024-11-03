
//layout
'use client';
//import MainContent from "@/components/Layout/MainContent";
import FeaturedListings from "@/components/Listings/FeaturedListings";
import ProductListing from "@/components/Listings/ProductListing";

const MainContent = () => {
  return (
    <main className="bg-gray-100 py-8">
      {/* Trending Listings Section */}
      <section className="mb-12">
        <FeaturedListings />
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <ProductListing />
      </section>

      {/* Additional Content (Optional) */}
      <section className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">Why UTrade?</h2>
        <p className="text-lg max-w-4xl mx-auto text-gray-700">
          UTrade is a student-focused marketplace built specifically for the University of Toronto community.
          Whether you’re buying or selling textbooks, furniture, electronics, or more, UTrade ensures that
          transactions are safe, secure, and catered to the needs of UofT students.
        </p>
      </section>
    </main>
  );
};

export default MainContent;
