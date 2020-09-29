require("dotenv").config();

const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

// ie 대응 next config
const nextConfig = {
  webpack: function(cfg) {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("client/polyfills.js")
      ) {
        entries["main.js"].unshift("client/polyfills.js");
      }

      return entries;
    };

    return cfg;
  },
  env: {
    env: process.env.NODE_ENV
  }
};

const withImages = require("next-images");
module.exports = withPlugins([[withBundleAnalyzer], [withImages]], nextConfig);

// require("dotenv").config();
// module.exports = {
//   env: {
//     // Reference a variable that was defined in the .env file and make it available at Build Time
//     NCLOUD_ACCESS_KEY: process.env.NCLOUD_ACCESS_KEY,
//     NCLOUD_SECRET_KEY: process.env.NCLOUD_SECRET_KEY
//   }
// };
