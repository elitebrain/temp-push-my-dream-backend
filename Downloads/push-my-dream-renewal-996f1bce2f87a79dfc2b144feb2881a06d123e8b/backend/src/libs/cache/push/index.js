const cacheManager = require("cache-manager");
const mongoStore = require("cache-manager-mongodb");
const Promise = require("es6-promise").Promise;

// console.log(rankCache);

const { MONGO_URI } = process.env;

const mongoCache = cacheManager.caching({
  store: mongoStore,
  uri: MONGO_URI,
  options: {
    collection: "pushCache",
    compression: false,
    poolSize: 5,
    autoReconnect: true,
  },
  promiseDependency: Promise,
});

/**
 * 참고 : https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app
 */
module.exports = (function () {
  /**
   * 푸쉬 조회
   */
  async function get() {
    let exPush = await mongoCache.get("push");

    if (!exPush) {
      exPush = {
        lastUpdatedAt: new Date(),
        push: 0,
      };
      await mongoCache.set("push", exPush, {
        ttl: 60 * 60 * 24 * 365, // 30일
      });
    }

    return exPush;
  }

  /**
   * 푸쉬
   */
  async function push(used_push) {
    let { push } = await get();

    await mongoCache.set(
      "push",
      {
        lastUpdatedAt: new Date(),
        push: push + used_push,
      },
      {
        ttl: 60 * 60 * 24 * 365, // 30일
      }
    );
    /**
     * 참고 
     * Event Stream Format
        소스에서 이벤트 스트림을 보내는 것은 SSE 형식인 
        text/event-stream Content-Type을 사용하여 일반 텍스트 응답을 작성하면서 
        수행되며 기본 형식에서 응답에는 "data:" 행 다음에 메시지가 오고 
        스트림 뒤에는 두 개의 "\n"문자가 있어야 스트림을 끝낼 수 있습니다.
        출처: https://hamait.tistory.com/792 [HAMA 블로그]
    */
  }

  return {
    push,
    get,
  };
})();
