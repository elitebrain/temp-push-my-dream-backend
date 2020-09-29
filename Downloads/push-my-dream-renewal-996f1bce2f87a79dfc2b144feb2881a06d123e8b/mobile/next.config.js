require("dotenv").config();

const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// ie 대응 next config
const nextConfig = {
  webpack: function (cfg, { defaultLoaders }) {
    const originalEntry = cfg.entry;

    // cfg.module.rules[0].exclude = [/node_modules[\/\\](?!(swiper|dom7)[\/\\])/];

    // console.log(cfg.module.rules[0]);

    // cfg.module.rules.push({
    //   exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
    //   test: /\.js(x)?$/,
    //   use: [defaultLoaders.babel],
    // });

    // console.log(cfg.module.rules);

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
    env: process.env.NODE_ENV,
  },
};

const withImages = require("next-images");
module.exports = withPlugins([[withBundleAnalyzer], [withImages]], nextConfig);
