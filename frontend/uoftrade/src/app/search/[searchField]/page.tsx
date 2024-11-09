'use client';

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React from "react";
import SearchSidebar from "@/components/SearchSidebar/SearchSidebar"
import useMediaQuery from "@mui/material/useMediaQuery";

interface SettingsContentProps {
  ContentComponent: React.ElementType; // Accept any React component
  highlightIndex: number;
}

const CategoryPage: React.FC<SettingsContentProps> = ({ ContentComponent, highlightIndex }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { searchField } = useParams(); // Get the dynamic category from the URL

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar/>
      <Header title={`Search Results for \"${searchField}\"`} />
      <div className="flex flex-col flex-grow md:flex-row">
        <SearchSidebar highlightIndex={highlightIndex} />
        {!isMobile && (
          <div className="flex-grow z-30 transition-all duration-300">
            {/* <ContentComponent /> */}
          </div>
        )}
        {isMobile && <ContentComponent />}
      </div>
      <Footer/>
    </div>
  );
};

export default CategoryPage;
