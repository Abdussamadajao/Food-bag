/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // unset client side js that only works server-side
    config.resolve.fallback = { fs: false, module: false };

    // setup svgr for use
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    domains: ["cdn.sanity.io", "unsplash.com"],
  },
};

module.exports = nextConfig;
