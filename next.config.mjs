/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      fs: { browser: "./utils/empty.ts" },
    },
  },
};

export default nextConfig;
