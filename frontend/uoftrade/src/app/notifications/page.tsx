'use client'
import React from "react";
import NotificationsSettings from "@/components/Notifications/NotificationsSettings";
import SettingsContent from "@/components/Settings/SettingsContent";


const NotificationsPage = () => {
    return <SettingsContent ContentComponent={NotificationsSettings} highlightIndex={2}/>
};

export default NotificationsPage;