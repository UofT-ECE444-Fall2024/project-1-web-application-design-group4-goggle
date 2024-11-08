'use client'

import NavBar from '@/components/NavBar/NavBar';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryPage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null); // Track authentication state
  const router = useRouter();
  const { category } = useParams(); // Get the dynamic category from the URL

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

  if (!authenticated) {
    // If not authenticated, prevent rendering the content
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar title="" />

      <div className="flex-grow mx-auto w-full text-2xl font-bold mb-4">
        <h2>Category: {category}</h2>
        {/* Render the products or content related to the category here */}
        <p>Displaying items for the {category} category.</p>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
