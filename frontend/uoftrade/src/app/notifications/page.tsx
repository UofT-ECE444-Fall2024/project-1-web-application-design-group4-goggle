import { Metadata } from "next";
import React from "react";
import NotificationsSettings from "@/components/Notifications/NotificationsSettings";
import SettingsContent from "@/components/Settings/SettingsContent";

export const metadata: Metadata = {
  title: "UofTrade User Listings",
  description: "This is the User Listings Page for UofTrade",
};

const NotificationsPage = () => {
  return <SettingsContent ContentComponent={NotificationsSettings} highlightIndex={2}/>
};

export default NotificationsPage;