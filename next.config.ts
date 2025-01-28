import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https', // or http
            hostname: 'api.dicebear.com', // if your website has no www, drop it
         },
      ],
   },
};

export default nextConfig;
