/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["i.imgur.com", "powen-canchu-api.octave.vip"],
  },
  async redirects() {
    return [
      {
        source: "/",
        missing: [{ type: "cookie", key: "accessToken" }],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/post/demo",
        missing: [{ type: "cookie", key: "accessToken" }],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/login",
        has: [{ type: "cookie", key: "accessToken" }],
        destination: "/",
        permanent: false,
      },
    ];
  },
};
