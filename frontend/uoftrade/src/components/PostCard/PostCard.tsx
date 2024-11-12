import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';

type PostCardProps = {
  image: string;
  title: string;
  price: number;
  description: string;
  id: number;
};

const PostCard: React.FC<PostCardProps> = ({ image, title, price, description, id }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const maxDescLimit = isMobile ? 110 : 160;
    const truncatedDescription = description.length > maxDescLimit ? description.slice(0, maxDescLimit) + '...' : description;
    const router = useRouter();
    return (
    <button onClick={() => {router.push(`/view-listing/${id}`)}} className="border border-outline-grey rounded-lg p-4 flex flex-col md:flex-row space-x-4 items-center md:items-start shadow-sm bg-off-white hover:bg-light-grey">
      <div className="relative w-32 h-32 flex-shrink-0 ">
        <img
          src={image}
          alt={title}
          className="rounded-md border-outline-grey"
        />
      </div>
      <div className="flex flex-col space-y-0 md:space-y-0 space-y-2">
        <span className="text-xl font-bold text-primary mt-4 md:mt-0">${price}</span>
        <h2 className="text-lg font-semibold text-heading-1">{title}</h2>
        <p className="text-subheading text-sm">{truncatedDescription}</p>
      </div>
    </button>
  );
};

export default PostCard;
