import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src"]
  },
  allowedDevOrigins: ["192.168.10.57"]
};

export default nextConfig;
