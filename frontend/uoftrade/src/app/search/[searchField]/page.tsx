
'use client'
import NavBar from '@/components/NavBar/NavBar';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const CategoryPage = () => {
  const { searchField } = useParams(); // Get the dynamic category from the URL

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <Header title={`Search Results for \"${searchField}\"`} />
      <div className="flex-grow mx-auto w-full text-2xl font-bold mb-4">
        
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
