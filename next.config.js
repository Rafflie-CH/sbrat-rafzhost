/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "brat.siputzx.my.id" }
    ]
  }
};
module.exports = nextConfig;