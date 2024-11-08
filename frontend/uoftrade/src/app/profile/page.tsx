import { Metadata } from "next";
import React from "react";
import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import SettingsContent from "@/components/Settings/SettingsContent";

export const metadata: Metadata = {
  title: "UofTrade Profile",
  description: "This is the Profile Page for UofTrade",
};

const ProfilePage = () => {
  return <SettingsContent ContentComponent={ProfileEdit} highlightIndex={0}/>
};

export default ProfilePage;