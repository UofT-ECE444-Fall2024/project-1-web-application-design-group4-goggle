'use client'
import React, {useState, useEffect} from "react";
import UserListings from "@/components/UserListings/UserListings";
import SettingsContent from "@/components/Settings/SettingsContent";
import { useRouter } from "next/navigation";
import useTokenCheck from "@/api/TokenCheck";


const UserListingsPage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  if (!loading) return <SettingsContent ContentComponent={UserListings} highlightIndex={1}/>
};

export default UserListingsPage;