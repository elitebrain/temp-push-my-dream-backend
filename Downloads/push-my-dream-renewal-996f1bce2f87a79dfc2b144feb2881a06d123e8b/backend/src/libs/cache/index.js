const cacheManager = require("cache-manager");
const mongoStore = require("cache-manager-mongodb");
const Promise = require("es6-promise").Promise;

// console.log(rankCache);

const { MONGO_URI } = process.env;

const mongoCache = cacheManager.caching({
  store: mongoStore,
  uri: MONGO_URI,
  options: {
    collection: "rankCache",
    compression: false,
    poolSize: 5,
    autoReconnect: true,
  },

  ttl: 60 * 60 * 24 * 30, // 30일
  promiseDependency: Promise,
});

module.exports = mongoCache;
