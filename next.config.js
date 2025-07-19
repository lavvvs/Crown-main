/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    experimental: {
      serverActions: {
        bodySizeLimit: "10mb", // if you're also uploading large images
      },
    },
  };
  
  module.exports = nextConfig;
  