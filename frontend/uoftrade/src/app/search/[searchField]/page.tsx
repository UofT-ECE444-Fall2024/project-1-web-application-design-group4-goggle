'use client';

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React from "react";
import SearchSidebar from "@/components/SearchSidebar/SearchSidebar"
import useMediaQuery from "@mui/material/useMediaQuery";
import PostCard from '@/components/PostCard/PostCard';

// interface SearchContentProps {
//   ContentComponent: React.ElementType; // Accept any React component
// }

// const SearchPage: React.FC<SearchContentProps> = ({ ContentComponent }) => {
const SearchPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { searchField } = useParams(); // Get the dynamic category from the URL

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar/>
      <Header title={`Search Results for \"${searchField}\"`} />
      <div className="flex flex-row flex-grow">
        <SearchSidebar />
        {/* {!isMobile && ( */}
        <div className="flex-grow z-30 transition-all duration-300 flex justify-center ">
          <div className='flex flex-col m-[2rem] gap-[1rem] max-w-[80%]'>
            <PostCard
              image="/images/misc/textbook.jpg"
              title="Real Property Law Textbook"
              price={150.00}
              description="This is my description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus curabitur accumsan semper accumsan primis lorem tortor rhoncus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus curabitur accumsan semper accumsan primis lorem tortor rhoncus."
            />
            <PostCard
              image="/images/misc/textbook.jpg"
              title="Real Property Law Textbook"
              price={150.00}
              description="This is my description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus curabitur accumsan semper accumsan primis lorem tortor rhoncus."
            />
            <PostCard
              image="/images/misc/textbook.jpg"
              title="Real Property Law Textbook"
              price={150.00}
              description="This is my description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus curabitur accumsan semper accumsan primis lorem tortor rhoncus."
            />
          </div>  
        </div>
        {/* )} */}
        {/* {isMobile && <ContentComponent />} */}
      </div>
      <Footer/>
    </div>
  );
};

export default SearchPage;
