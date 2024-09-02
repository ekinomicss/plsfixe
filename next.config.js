/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true, // This enables the new SWC-based minifier in Next.js for faster builds
    images: {
      domains: ['example.com'], // Add your image domains here if you're loading images from external sources
    },
    // You can add additional configurations here as needed
  };
  
  module.exports = nextConfig;
  