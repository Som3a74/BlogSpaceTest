import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // globalNotFound: true,
    // turbopackFileSystemCacheForDev: true, // Enable filesystem caching for `next dev`
    // turbopackFileSystemCacheForBuild: true, // Enable filesystem caching for `next build`
  },
};

export default nextConfig;
