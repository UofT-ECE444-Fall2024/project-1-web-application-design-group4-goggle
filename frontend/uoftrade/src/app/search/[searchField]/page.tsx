"use client";
import React, { useState, useEffect } from "react";
import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SearchSidebar from "@/components/SearchSidebar/SearchSidebar";
import PostCard from '@/components/PostCard/PostCard';
import Loading from '@/components/Loading/Loading';
import axios from 'axios';

interface SortState {
  price: string;
  date: string;
}

const SearchPage = () => {
  const { searchField } = useParams();
  const decodedURI = Array.isArray(searchField) ? decodeURIComponent(searchField[0]) : decodeURIComponent(searchField || '');

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: [] as string[],
    minPrice: null as number | null,
    maxPrice: null as number | null,
  });
  const [sort, setSort] = useState<SortState>({
    price: "Lowest to Highest",
    date: "Most Recent",
  });

  const fetchPosts = async () => {
    const { minPrice, maxPrice } = filters;
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-list`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          q: decodedURI,
          location: filters.location.join(','),
          min_price: minPrice ?? undefined,
          max_price: maxPrice ?? undefined,
          price_order: sort.price === "Lowest to Highest" ? "asc" : "desc",
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filters, sort]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => {
      const newLocations = checked
        ? [...prevFilters.location, name]
        : prevFilters.location.filter((location) => location !== name);
      return { ...prevFilters, location: newLocations };
    });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'minPrice' | 'maxPrice') => {
    const value = event.target.value ? parseInt(event.target.value) : null;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  if (loading) {
    return <Loading loading={loading} />;
  } else {
    return (
      <>
        <div className="flex flex-col min-h-screen w-full">
          <NavBar />
          <Header title={`Search Results for "${decodedURI}"`} />
          <div className="flex flex-row flex-grow">
            <SearchSidebar
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
              onLocationChange={handleLocationChange}
              onPriceChange={handlePriceChange}
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
                      image={post?.images?.[0]?.image}
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
  }
};

export default SearchPage;
