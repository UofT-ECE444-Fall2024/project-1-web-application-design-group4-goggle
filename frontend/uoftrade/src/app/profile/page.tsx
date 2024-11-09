'use client'

import React from "react";
import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import SettingsContent from "@/components/Settings/SettingsContent";

const ProfilePage = () => {
    return <SettingsContent ContentComponent={ProfileEdit} highlightIndex={0} />;
};

export default ProfilePage;
