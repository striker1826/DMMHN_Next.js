/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '*',
        port: '',
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_REDIRECT_URI: process.env.REDIRECT_URI,
  },
};

export default nextConfig;
