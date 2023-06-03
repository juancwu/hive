/** @type {import('next').NextConfig} */
const nextConfig = {
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/inventory',
  //       permanent: false,
  //     },
  //   ];
  // },
  experimental: {
    serverActions: process.env.NEXT_CONFIG_SERVER_ACTIONS === 'true',
  },
};

module.exports = nextConfig;
