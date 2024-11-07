import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { categories as categoryData, Category } from '@/data/categories';

const CategorySelection = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      gap={12} 
      mt={2} 
      p={1} 
      flexWrap="wrap"
    >
      {categoryData.map((category: Category, index) => (
        <Link href={category.link} passHref key={index}>
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover .circle': {
                backgroundColor: '#e0e0e0',
                borderColor: '#000',
              },
            }}
          >
            <Box
              className="circle"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                border: '2px solid black', 
                borderRadius: '50%',
                padding: '1rem',
                width: '7rem', 
                height: '7rem', 
                transition: 'transform 0.3s ease', // Smooth transition for scaling effect
                '&:hover .icon': {
                  transform: 'scale(1.5)', // Scale up on hover
                },
              }}
            >
              <Box 
                className="icon"
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                sx={{ 
                  width: '5rem', 
                  height: '5rem', 
                  color: '#333',
                  transition: 'transform 0.3s ease', // Smooth transition for scaling effect
                }}
              >
                {category.icon}
              </Box>
            </Box>
            {/* Text outside the circle */}
            <Typography 
              variant="body1" // Larger font size
              sx={{ mt: 1, fontWeight: 'bold', color: '#333' }}
            >
              {category.name}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default CategorySelection;
