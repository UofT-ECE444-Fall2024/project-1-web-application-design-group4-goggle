'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function NotFound() {
  const router = useRouter(); // Initialize the router

  const goBack = () => {
    // Check if there's a previous page in the history stack
    if (window.history.length > 1) {
      router.back(); // Use Next.js router to go back
    } else {
      // If no history, go to the homepage or some fallback page
      router.push('/'); // Navigate to the homepage or a default route
    }
  };

  return (
    <div className="absolute w-full h-full flex items-center justify-center bg-primary z-50">
      <main className="flex flex-col items-center justify-center gap-8 text-center">
        <Image
          className="self-center"
          src="/images/logo/UofTrade_logo_white.svg"
          alt="logo"
          width={180}
          height={38}
        />
        <h1 className="text-white text-3xl">{'404: Page not Found'}</h1>

        {/* Subheading with link to go back */}
        <div className="text-white">
          <p className="text-lg">Sorry, the page you are looking for cannot be found.</p>
          <button
            onClick={goBack} // Trigger the goBack function
            className="mt-4 text-md text-white hover:underline"
          >
            &lt; Go back to the previous page
          </button>
        </div>
      </main>
    </div>
  );
}
