import React, { useState } from 'react';
import { Rating } from '@mui/material';

const RateUser: React.FC<{ sellerIsUser: boolean }> = ({ sellerIsUser }) => {
  // Track the rating the user gives
  const [rating, setRating] = useState<number | null>(2.5); // Default rating is 2.5

  const handleChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if (!sellerIsUser) { // Allow rating changes only if the seller is not the current user
      setRating(newValue);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="text-3xl font-semibold text-heading-1">Rate this User</div>
      <Rating
        name="user-rating"
        value={rating}
        onChange={handleChange}
        precision={0.5}
        size="large"
        readOnly={sellerIsUser} // Make the rating read-only if sellerIsUser is true
      />
      <span className="text-lg text-subheading">Your rating: {rating?.toFixed(1)}</span>
    </div>
  );
};

export default RateUser;