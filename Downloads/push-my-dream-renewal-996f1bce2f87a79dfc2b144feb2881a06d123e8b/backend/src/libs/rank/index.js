const { Container } = require("typedi");
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

const CommonQuery = require("queries/CommonQuery");

const commonQuery = Container.get(CommonQuery);

module.exports = (function () {
  let settings;

  let categoryList;
  let category2List;

  let category3List;

  let likePoint;
  let viewPoint;
  let pushPoint;

  let typeList = ["week", "month", "season", "producer"];

  String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  };

  /**
   * 시간 및 캐싱에 필요한 세팅 초기화
   */

  async function initDate() {
    if (!settings) {
      settings = await commonQuery.getSettings();
    }
    if (!categoryList) {
      categoryList = await commonQuery.getCategoryList();
    }

    if (!category2List) {
      category2List = categoryList
        .reduce(
          (data, category) => data.concat(...category.CATEGORY_LEVEL2),
          []
        )
        .filter((category) => category.category_level2_no)
        .sort((a, b) => a.category_level2_no - b.category_level2_no);
    }

    if (!category3List) {
      category3List = category2List
        .reduce(
          (data, category) => data.concat(...category.CATEGORY_LEVEL3),
          []
        )
        .filter((category) => category.category_level3_no)
        .sort((a, b) => a.category_level3_no - b.category_level3_no);
    }

    if (!likePoint) {
      likePoint = Number(
        settings.find((setting) => setting.type === "likePoint").value
      );
    }
    if (!viewPoint) {
      viewPoint = Number(
        settings.find((setting) => setting.type === "viewPoint").value
      );
    }
    if (!pushPoint) {
      pushPoint = Number(
        settings.find((setting) => setting.type === "pushPoint").value
      );
    }
  }

  /**
   *
   * 캐싱 데이터 조회
   * @param {emergenza} name
   * @param {week, month, season, producer} type

   */
  async function _getRankCache({ category3No, userType, type }) {
    const cacheData = await mongoCache.get(`category_${category3No}_cache`);

    if (type) {
      return cacheData
        ? cacheData[`${userType.toLowerCase()}_${type.toLowerCase()}OfRankList`]
        : [];
    }

    return cacheData ? cacheData : [];
  }

  return {
    async getChachingRankList({ category3No, userType }) {
      return await _getRankCache({ category3No, userType });
    },
    /**
     * 에머겐자 랭킹 조회
     * @param {string} ( emergenza )  name
     * @param {string} ( week | month | season | producer )  type
     * @param {number} limit
     */
    async getChachingRankListByType({ category3No, userType, type, limit }) {
      if (typeList.indexOf(type) === -1) {
        console.error(
          `${type}이 존재하지 않습니다. 올바른 값인지 확인해주시고, typeList에 선언이 되어있는지 확인해주세요.`
        );
        return;
      }

      const list = await _getRankCache({ category3No, userType, type });
      return (list || []).slice(0, limit);
    },

    /**
     *
     * @param {weekOfRankList | monthOfRankList | seasonOfRankList | producerOfRankList} name
     */
    getFluctutaionInList({ previousList, list, userType }) {
      return previousList && previousList.length
        ? list.map((item) => {
            const previousRank = previousList.find(
              (v) => v.user_no === item.user_no
            );

            const comparsionValue =
              userType === "producer"
                ? Number(item.sum_push)
                : Number(item.score);

            return {
              ...item,
              fluctuation:
                comparsionValue > 0
                  ? previousRank
                    ? previousRank.ranking - item.ranking
                    : "new"
                  : "-",
            };
          })
        : list.map((item) => ({
            ...item,
            fluctuation: "new",
          }));
    },
  };
})();
