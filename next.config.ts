import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["striking-squirrel-supposedly.ngrok-free.app"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
