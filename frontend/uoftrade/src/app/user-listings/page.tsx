'use client'
import { Metadata } from "next";
import React, {useEffect, useState} from "react";
import UserListings from "@/components/UserListings/UserListings";
import SettingsContent from "@/components/Settings/SettingsContent";
import { useRouter } from "next/navigation";
import axios from "axios";



const UserListingsPage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      // Optionally verify the JWT by making an API call to the backend
      axios.get("//localhost:12000/auth", { //this only works locally in this format, not sure why
        headers: { Authorization: `Bearer ${token}` },
      })

      
      .then((response) => {
        // If the token is valid, set authenticated to true
        console.log("Token verified", response.data);
        setAuthenticated(true);
      })
      .catch((error) => {
        // Handle invalid or expired token
        console.error("Token verification failed", error);
        setAuthenticated(false);
        router.push("/signin"); // Invalid token, redirect to signin
      });
    } else {
      console.log("Token invalid, redirecting to signin.1");
      setAuthenticated(false);
      router.push("/signin"); // Redirect if no token
    }
  }, [router]);


  if (!authenticated) return null;



  return <SettingsContent ContentComponent={UserListings} highlightIndex={1}/>
};

export default UserListingsPage;