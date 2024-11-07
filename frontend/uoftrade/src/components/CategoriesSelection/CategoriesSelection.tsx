import React from 'react';
import { Box, Typography } from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';
import BookIcon from '@mui/icons-material/MenuBook';
import LaptopIcon from '@mui/icons-material/Laptop';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import KitchenIcon from '@mui/icons-material/Kitchen';

// Define categories with icons and names
const categories = [
  { name: 'Textbooks', icon: <BookIcon fontSize="large" /> },
  { name: 'Furniture', icon: <ChairIcon fontSize="large" /> },
  { name: 'Electronics', icon: <LaptopIcon fontSize="large" /> },
  { name: 'Gaming', icon: <SportsEsportsIcon fontSize="large" /> },
  { name: 'Appliances', icon: <KitchenIcon fontSize="large" /> },
];

const CategorySelection = () => {
  return (
    <Box display="flex" justifyContent="center" gap={4} mt={2} p={2}>
      {categories.map((category, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => handleCategoryClick(category.name)}
          sx={{
            cursor: 'pointer',
            border: '1px solid gray',
            borderRadius: '50%',
            padding: '1rem',
            width: '80px',
            height: '80px',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              borderColor: '#000',
            },
          }}
        >
          {category.icon}
          <Typography variant="caption" mt={1}>{category.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

// Handler for category click
const handleCategoryClick = (categoryName) => {
  // Redirect to the listings page for the selected category
  window.location.href = `/listings/${categoryName.toLowerCase()}`;
};

export default CategorySelection;
