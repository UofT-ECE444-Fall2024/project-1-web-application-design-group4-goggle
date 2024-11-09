'use client'

import React, { useState, useEffect } from 'react';
import useTokenCheck from '@/api/TokenCheck';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';

const Loading = () => {

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useTokenCheck(setAuthenticated);
  useEffect(() => {
    // Check the authentication status and stop loading once it's checked
    if (authenticated !== null) {
      setLoading(false); // Once the authentication check is done, stop the loading state
      if (authenticated === false) {
        router.push("/signin");
      }
    }
  }, [authenticated, router]);

  return (
    (loading) ? 
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
        </div> :
        <></>
  );
};

export default Loading;
