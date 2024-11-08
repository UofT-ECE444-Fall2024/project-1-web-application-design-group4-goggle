'use client'

import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import SettingsContent from "@/components/Settings/SettingsContent";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProfilePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null); // Track authentication state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve JWT from localStorage
    console.log("Token:", token);
    if (token) {
      // Verify the JWT by calling the authentication endpoint
      axios
        .get("http://localhost:12000/auth", { // Replace with your correct API endpoint
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // If the token is valid, set authenticated to true
          console.log("Token verified:", response.data);
          setAuthenticated(true);
        })
        .catch((error) => {
          // If there's an error, handle it (token might be expired or invalid)
          console.error("Token verification failed", error);
          setAuthenticated(false);
          router.push("/signin"); // Redirect to login page if token is invalid
        });
    } else {
      // If no token exists, redirect to the login page
      console.log("No token found, redirecting to signin");
      router.push("/signin");
    }
  }, [router]);

  if (!authenticated) return null;

  // Once authenticated, render the content
  return <SettingsContent ContentComponent={ProfileEdit} highlightIndex={0} />;
};

export default ProfilePage;
