'use client';

import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React, { useState, useEffect } from "react";
import SearchSidebar from "@/components/SearchSidebar/SearchSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import PostCard from '@/components/PostCard/PostCard';
import Loading from '@/components/Loading/Loading';
import axios from 'axios';

interface SortState {
  price: string;
  date: string;
}

const SearchPage = () => {
  const { searchField } = useParams(); // Get the dynamic category from the URL
  const decodedURI = Array.isArray(searchField) ? decodeURIComponent(searchField[0]) : decodeURIComponent(searchField || '');

  const [posts, setPosts] = useState<any[]>([]); // Store posts from the server
  const [loading, setLoading] = useState(true);

  // State for filters and sorting
  const [filters, setFilters] = useState({
    location: [] as string[],  // List of selected locations
    minPrice: null as number | null,
    maxPrice: null as number | null,
  });
  const [sort, setSort] = useState<SortState>({
    price: "Lowest to Highest",
    date: "Most Recent",
  });

  // Function to fetch posts based on filters and sorting
  const fetchPosts = async () => {
    const { minPrice, maxPrice } = filters;

    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: decodedURI,
          location: filters.location.join(','),
          min_price: minPrice ?? undefined,
          max_price: maxPrice ?? undefined,
          price_order: sort.price === "Lowest to Highest" ? "asc" : "desc",
        },
      });
      console.log("Request URL:", response.config.url); // Log the full request URL for inspection
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, [filters, sort]); // Re-fetch data when filters or sorting changes

  // Handle location checkbox change
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => {
      const newLocations = checked
        ? [...prevFilters.location, name]
        : prevFilters.location.filter((location) => location !== name);
      return { ...prevFilters, location: newLocations };
    });
  };

  // Handle price input changes
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'minPrice' | 'maxPrice') => {
    const value = event.target.value ? parseInt(event.target.value) : null;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col min-h-screen w-full">
        <NavBar />
        <Header title={`Search Results for "${decodedURI}"`} />
        <div className="flex flex-row flex-grow">
          <SearchSidebar
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
            onLocationChange={handleLocationChange}  // Pass the location change handler
            onPriceChange={handlePriceChange}  // Pass the price change handler
          />
          <div className="flex-grow z-30 transition-all duration-300 flex justify-center">
            <div className="flex flex-col m-[2rem] gap-[1rem] max-w-[80%]">
              {posts.length === 0 ? (
                <div>No results found</div>
              ) : (
                posts.map((post: any) => (
                  <PostCard
                    id={post.id}
                    key={post.id}
                    image={`/product-images/${post.image}`}
                    title={post.title}
                    price={post.price}
                    description={post.description}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
