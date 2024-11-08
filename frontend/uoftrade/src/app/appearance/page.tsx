import { Metadata } from "next";
import React from "react";
import AppearanceEdit from "@/components/Appearance/AppearanceEdit";
import SettingsContent from "@/components/Settings/SettingsContent";

export const metadata: Metadata = {
  title: "UofTrade User Listings",
  description: "This is the User Listings Page for UofTrade",
};

const AppearancePage = () => {
  return <SettingsContent ContentComponent={AppearanceEdit} highlightIndex={3}/>
};

export default AppearancePage;