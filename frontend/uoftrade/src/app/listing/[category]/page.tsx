// /listing/[category]

'use client'

import { useParams, useRouter } from 'next/navigation';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = useParams(); // Get the dynamic category from the URL

  return (
    <div className="py-8 bg-primary text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Category: {category}</h2>
      {/* Render the products or content related to the category here */}
      <p>Displaying items for the {category} category.</p>
    </div>
  );
};

export default CategoryPage;
