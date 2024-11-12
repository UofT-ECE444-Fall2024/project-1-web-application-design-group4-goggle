/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['54.205.122.75'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
