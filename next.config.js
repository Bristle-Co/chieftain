/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  env: {
    backendServerBaseURI: "http://localhost:8088/api/v1",
    globalPageSize: 2,
  },
};
