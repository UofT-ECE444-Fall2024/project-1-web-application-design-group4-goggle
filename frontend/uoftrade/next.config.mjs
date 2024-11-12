/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['18.218.26.235'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
