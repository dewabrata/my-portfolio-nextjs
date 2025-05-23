import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['react-bootstrap', 'firebase'],
  images: {
    domains: ['cloud.jpnn.com', 'firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
