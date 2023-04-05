/** @type {import('next').NextConfig} */

const nextConfig ={
  images: {
    path: '/',
    loader: 'default',
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  fallback: true
};

module.exports = nextConfig;

