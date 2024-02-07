/** @type {import('next').NextConfig} */
/*const nextConfig = {
    images:{
        domains:["firebasestorage.googleapis.com"]
    } 
};

export default nextConfig;*/
// next.config.js


const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          pathname: '**',
        },
      ],
    },
  };
  export default nextConfig;
  module.exports = {
    async rewrites() {
      return [
        {
          source: '/page',
          destination: '/',
        },
      ]
    },
  }