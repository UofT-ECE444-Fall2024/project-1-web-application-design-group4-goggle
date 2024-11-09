'use client'

import React from "react";
import UserListings from "@/components/UserListings/UserListings";
import SettingsContent from "@/components/Settings/SettingsContent";

const UserListingsPage = () => {
    return <SettingsContent ContentComponent={UserListings} highlightIndex={1}/>
};

export default UserListingsPage;