/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['18.207.149.254'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
