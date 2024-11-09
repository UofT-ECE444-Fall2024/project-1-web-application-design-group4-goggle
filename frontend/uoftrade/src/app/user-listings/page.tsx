import { Metadata } from "next";
import React from "react";
import UserListings from "@/components/UserListings/UserListings";
import SettingsContent from "@/components/Settings/SettingsContent";

export const metadata: Metadata = {
  title: "UofTrade User Listings",
  description: "This is the User Listings Page for UofTrade",
};

const UserListingsPage = () => {
  return <SettingsContent ContentComponent={UserListings} highlightIndex={1}/>
};

export default UserListingsPage;
