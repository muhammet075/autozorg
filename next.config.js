/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});


module.exports = withPWA({
  reactStrictMode: true,
});

// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig





