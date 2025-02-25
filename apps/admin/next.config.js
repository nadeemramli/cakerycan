/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: ['ui', 'database'],
  experimental: {
    // This prevents Next.js from resolving dependencies from other apps
    externalDir: true,
    // Ensure modules are resolved correctly in the monorepo
    outputFileTracingRoot: require('path').join(__dirname, '../../'),
  },
};

module.exports = nextConfig; 