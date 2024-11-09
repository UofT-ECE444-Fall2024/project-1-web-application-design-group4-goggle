<<<<<<< HEAD
'use client';

import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";

interface SettingsContentProps {
  ContentComponent: React.ElementType; // Accept any React component
  highlightIndex: number;
}

/**
 * @param ContentComponent
 * Take in any react component as the content of the page and fit it with the settings sidebar  
 * @param highlightIndex
 * which menu item on the sidebar should be highlighted
 */
const SettingsContent: React.FC<SettingsContentProps> = ({ ContentComponent, highlightIndex }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex flex-col md:flex-row">
      <SettingSidebar highlightIndex={highlightIndex} />
      {!isMobile && (
        <div className="flex-grow transition-all duration-300">
          <ContentComponent />
        </div>
      )}
      {isMobile && <ContentComponent />}
    </div>
  );
};

export default SettingsContent;
=======
'use client';

import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
interface SettingsContentProps {
  ContentComponent: React.ElementType; // Accept any React component
  highlightIndex: number;
}

/**
 * @param ContentComponent
 * Take in any react component as the content of the page and fit it with the settings sidebar  
 * @param highlightIndex
 * which menu item on the sidebar should be highlighted
 */
const SettingsContent: React.FC<SettingsContentProps> = ({ ContentComponent, highlightIndex }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar/>
      <div className="flex flex-col flex-grow md:flex-row">
        <SettingSidebar highlightIndex={highlightIndex} />
        {!isMobile && (
          <div className="flex-grow z-30 transition-all duration-300">
            <ContentComponent />
          </div>
        )}
        {isMobile && <ContentComponent />}
      </div>
      <Footer/>
    </div>
  );
};

export default SettingsContent;
>>>>>>> d60b606a78210b54a47135163c49f052c70c03bd
