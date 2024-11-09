import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type PostCardProps = {
  image: string;
  title: string;
  price: number;
  description: string;
};

const PostCard: React.FC<PostCardProps> = ({ image, title, price, description }) => {
  return (
    <Link href="" className="border border-outline-grey rounded-lg p-4 flex flex-col md:flex-row space-x-4 items-center shadow-sm bg-off-white hover:bg-light-grey">
      <div className="relative w-32 h-32 flex-shrink-0 ">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md border-outline-grey"
        />
      </div>
      <div className="flex flex-col space-y-0 md:space-y-2">
        <span className="text-xl font-bold text-primary mt-4 md:mt-0">${price.toFixed(2)}</span>
        <h2 className="text-lg font-semibold text-heading-1">{title}</h2>
        <p className="text-subheading text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
