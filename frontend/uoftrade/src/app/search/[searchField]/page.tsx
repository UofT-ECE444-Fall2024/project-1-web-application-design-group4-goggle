'use client';

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React from "react";
import SearchSidebar from "@/components/SearchSidebar/SearchSidebar"
import useMediaQuery from "@mui/material/useMediaQuery";
import PostCard from '@/components/PostCard/PostCard';
import Loading from '@/components/Loading/Loading';

const SearchPage = () => {
  const { searchField } = useParams(); // Get the dynamic category from the URL
  const decodedURI = Array.isArray(searchField) ? decodeURIComponent(searchField[0]) : decodeURIComponent(searchField || '');

  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen w-full">
      <NavBar/>
      <Header title={`Search Results for "${decodedURI}"`} />
      <div className="flex flex-row flex-grow">
        <SearchSidebar />
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
      </div>
      <Footer/>
    </div>
    </>
    
  );
};

export default SearchPage;
