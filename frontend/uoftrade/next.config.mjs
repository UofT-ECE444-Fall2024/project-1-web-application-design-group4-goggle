/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['3.95.187.136'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
