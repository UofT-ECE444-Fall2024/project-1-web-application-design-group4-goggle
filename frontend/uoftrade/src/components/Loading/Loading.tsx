'use client'

import React, { useState, useEffect } from 'react';
import useTokenCheck from '@/api/TokenCheck'; // Assuming this checks token status
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';

type LoadingProps = {
  loading?: boolean;  // Allow external loading state (e.g., data fetching)
};

const Loading = ({ loading = false }: LoadingProps) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);  // Track the authentication loading state
  const router = useRouter();

  // Check authentication status on mount
  useTokenCheck(setAuthenticated);

  useEffect(() => {
    // Once the authentication status is known, stop the loading state
    if (authenticated !== null) {
      setAuthLoading(false);  // Stop loading after authentication check is complete
      if (authenticated === false) {
        router.push("/signin");  // Redirect to sign-in if not authenticated
      }
    }
  }, [authenticated, router]);

  // Show loading screen if either auth check or external loading state is true
  if (authLoading || loading) {
    return (
      <div className="absolute w-screen h-screen flex items-center justify-center bg-primary z-50">
        <main className="flex flex-col gap-8 items-center">
          <Image
            className="self-center"
            src="/images/logo/UofTrade_logo_white.svg"
            alt="logo"
            width={180}
            height={38}
          />
          {/* CircularProgress with white color */}
          <CircularProgress sx={{ color: 'white' }} />
        </main>
      </div>
    );
  }

  return null;  // Return null if not loading
};

export default Loading;
