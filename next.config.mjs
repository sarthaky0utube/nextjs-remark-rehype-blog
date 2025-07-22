/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  }
};

export default nextConfig;
