/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['52.1.68.74'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
