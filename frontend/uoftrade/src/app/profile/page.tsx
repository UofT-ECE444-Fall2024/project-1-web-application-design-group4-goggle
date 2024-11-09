'use client'
import React, { useState, useEffect } from "react";
import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import SettingsContent from "@/components/Settings/SettingsContent";
import { useRouter } from "next/navigation";
import useTokenCheck from "@/api/TokenCheck";

const ProfilePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null); // Track authentication state
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const router = useRouter();

  useTokenCheck(setAuthenticated);
  useEffect(() => {
    // Check the authentication status and stop loading once it's checked
    if (authenticated !== null) {
      setLoading(false); // Once the authentication check is done, stop the loading state
      if (authenticated === false) {
        router.push("/signin");
      }
    }
  }, [authenticated, router]);

  // Show loading state until token check is complete
  if (!loading) {
    // Once authenticated, render the content
    return <SettingsContent ContentComponent={ProfileEdit} highlightIndex={0} />;
  }

  
};

export default ProfilePage;
