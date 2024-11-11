import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ListingDetailsProps {
  title: string | undefined;
  price: string | undefined;
  description: string | undefined;
  pickupLocation: string | undefined;
  category: string | undefined;
  date: string | undefined;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  title,
  price,
  description,
  pickupLocation,
  category,
  date,
}) => {
  return (
    <div className='flex flex-col bg-white-bg mt-4 w-full'>
      {/* Title and Price */}
      <div className="flex justify-between items-baseline">
        <h1 className="text-3xl font-semibold text-heading-1">{title}</h1>
        <p className="text-3xl font-bold text-heading1">${price}</p>
      </div>

      {/* Date */}
      <div className="mt-2 text-lg text-gray-500">
        <span>Posted on: {date}</span>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-medium text-gray-800">Description</h2>
        <p className="mt-4 text-lg text-gray-600">{description}</p>
      </div>

      {/* Pickup Location */}
      <div className="mt-8 flex text-xl items-center text-gray-700">
        <LocationOnIcon className="mr-2 text-primary text-3xl" />
        <span>{pickupLocation}</span>
      </div>

      {/* Category */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-500">Category</h3>
        <p className="text-2xl text-gray-800">{category}</p>
      </div>
    </div>
  );
};

export default ListingDetails;