'use client'
import React, {useEffect} from "react";
import NotificationsSettings from "@/components/Notifications/NotificationsSettings";
import SettingsContent from "@/components/Settings/SettingsContent";
import useTokenCheck from "@/api/TokenCheck";
import {useRouter} from "next/navigation";

const NotificationsPage = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  useTokenCheck(setAuthenticated);useEffect(() => {
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
    return <SettingsContent ContentComponent={NotificationsSettings} highlightIndex={2}/>
  }
};

export default NotificationsPage;