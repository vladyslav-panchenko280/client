/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  server: {
    port: process.env.PORT, // replace 3000 with the desired port number
  },
};

module.exports = nextConfig;
