/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: process.env.NEXT_CONFIG_SERVER_ACTIONS === 'true',
  },
};

module.exports = nextConfig;
