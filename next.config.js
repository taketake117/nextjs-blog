/** @type {import('next').NextConfig} */

module.nextConfig = {
  reactStrictMode: true,
  swcMinify: false // it should be false by default
};

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    return config;
  }
};


