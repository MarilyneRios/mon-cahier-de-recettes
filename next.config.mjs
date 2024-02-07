///** @type {import('next').NextConfig} */

/*
export default (phase, { defaultConfig }) => {
  
   @type {import('next').NextConfig}
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
  return nextConfig
}*/

// next.config.mjs
export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
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
  }
    return nextConfig
  }
