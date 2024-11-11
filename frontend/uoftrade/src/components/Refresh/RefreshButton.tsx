import React from 'react';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const RefreshButton: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <IconButton onClick={handleRefresh} color="primary">
      <RefreshIcon />
    </IconButton>
  );
};

export default RefreshButton;