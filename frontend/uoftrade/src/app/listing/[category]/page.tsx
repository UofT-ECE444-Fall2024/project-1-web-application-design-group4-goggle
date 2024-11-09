'use client'

import NavBar from '@/components/NavBar/NavBar';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import {useState, useEffect} from 'react';
import useTokenCheck from "@/api/TokenCheck";

const CategoryPage = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null); // Track authentication state
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const router = useRouter();
  const { category } = useParams(); // Get the dynamic category from the URL

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
  if (!loading) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <NavBar/>

        <div className="flex-grow mx-auto w-full text-2xl font-bold mb-4">
          <h2>Category: {category}</h2>
          {/* Render the products or content related to the category here */}
          <p>Displaying items for the {category} category.</p>
        </div>
        <Footer />
      </div>
  );}

};

export default CategoryPage;
