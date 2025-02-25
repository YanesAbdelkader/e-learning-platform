import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["real-cute-louse.ngrok-free.app"], 
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
