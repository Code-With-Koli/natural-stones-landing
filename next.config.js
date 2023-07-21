/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
