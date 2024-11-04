'use client';

import React from "react";
import SettingSidebar from "@/components/SettingSidebar/SettingSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";

interface SettingsContentProps {
  ContentComponent: React.ElementType; // Accept any React component
}

/**
 * @param ContentComponent
 * Take in any react component as the content of the page and fit it with the settings sidebar  
 */
const SettingsContent: React.FC<SettingsContentProps> = ({ ContentComponent }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex flex-col md:flex-row">
      <SettingSidebar highlightIndex={0} />
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
