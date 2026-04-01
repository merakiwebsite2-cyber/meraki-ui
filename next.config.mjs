/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["139.84.140.129"], // ✅ add your server IP
  },
};

export default nextConfig;
