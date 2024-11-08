
'use client'
import NavBar from '@/components/NavBar/NavBar';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/components/Footer/Footer';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = useParams(); // Get the dynamic category from the URL

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar title=""/>

      <div className="flex-grow mx-auto w-full text-2xl font-bold mb-4">
        <h2 >Category: {category}</h2>
        {/* Render the products or content related to the category here */}
        <p>Displaying items for the {category} category.</p>
      </div>
      

      
      <Footer />
    </div>
  );
};

export default CategoryPage;
