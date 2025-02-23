import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "media2.dev.to",  // Add this domain to allow images from dev.to
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",  // Add this line for placeholder images
      },
    ],
  },
};
export default nextConfig;
