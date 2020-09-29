const { Container } = require("typedi");

const CommonQuery = require("queries/CommonQuery");
const RankQuery = require("queries/RankQuery");
const VideoQuery = require("queries/VideoQuery");

const rank = require("libs/rank");

const commonQuery = Container.get(CommonQuery);
const rankQuery = Container.get(RankQuery);
const videoQuery = Container.get(VideoQuery);

// 메인 페이지 비디오 조회
/**
 * 넘사벽과 시즌은 video 테이브를 향하고
 * 나머지는 video_cache 테이블을 향해야합니다.
 */

exports.getMainVideos = async (req, res, next) => {
  const { limit } = req.query;

  try {
    let videoNoList = [];
    let hotViewVideoList = [];
    let hotTalkVideoList = [];
    // let hotLikeVideoList = [];
    let newVideoList = [];
    let bestEmergenzaList = [];
    let bestAppleList = [];
    let rankingList = {};
    let topProducerList = [];
    let openCategoryList = [];

    const hotViewVideoIndex = await videoQuery.getHotViewVideoIndex({ limit });

    // 핫비디오 인덱스가 존재시
    if (hotViewVideoIndex.length) {
      videoNoList = hotViewVideoIndex.slice(0, 10);
      hotViewVideoList = await videoQuery.getVideoIntroList({
        option: "hotView",
        videoNoList,
        userNo: req.user && req.user.user_no,
      });
    }

    // 핫톡 주석
    // const hotTalkVideoIndex = await videoQuery.getHotTalkVideoIndex({ limit });

    // // 핫비디오 인덱스가 존재시
    // if (hotTalkVideoIndex.length) {
    //   videoNoList = hotTalkVideoIndex.slice(0, 10);
    //   hotTalkVideoList = await videoQuery.getVideoIntroList({
    //     option: "hotTalk",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // const hotLikeVideoIndex = await videoQuery.getHotLikeVideoIndex({ limit });

    // // 핫비디오 인덱스가 존재시
    // if (hotLikeVideoIndex.length) {
    //   videoNoList = hotLikeVideoIndex.slice(0, 10);
    //   hotLikeVideoList = await videoQuery.getVideoIntroList({
    //     option: "hotLike",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // 진행중인 경연 랭킹 목록 조회
    const runningCategoryLv3List = await commonQuery.getRunningCategoryLv3List({
      orderByCreatedAt: true,
    });

    openCategoryList = await Promise.all(
      runningCategoryLv3List.map(async (season) => {
        const videoList = await videoQuery.getSeasonVideoList({
          category3No: season.category_level3_no,
          userNo: req.user && req.user.user_no,
          limit: 100,
        });

        const videoIndex = await videoQuery.getSeasonVideoIndex({
          category3No: season.category_level3_no,
        });

        return {
          ...season,
          videoList,
          videoIndex: videoIndex.map((video) => video.video_no),
        };
      })
    );

    // 뉴업로드 주석
    // const newVideoIndex = await videoQuery.getNewVideoIndex({});

    // // 새비디오 인덱스가 존재시
    // if (newVideoIndex.length) {
    //   videoNoList = newVideoIndex.slice(0, 20);
    //   newVideoList = await videoQuery.getVideoIntroList({
    //     option: "new",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // bestEmergenzaList = await rank.getChachingRankListByType({
    //   category3No: 2,
    //   type: "week",
    //   limit: 100,
    // });

    for (let i = 0; i < runningCategoryLv3List.length; i++) {
      const ranking = await rank.getChachingRankListByType({
        category3No: runningCategoryLv3List[i].category_level3_no,
        userType: "dreamer",
        type: "season",
        limit: 100,
      });
      rankingList = Object.assign({}, rankingList, {
        [runningCategoryLv3List[i].category_level3_no]: ranking.map((user) => ({
          user_no: user.user_no,
          nickname: user.nickname,
          user_photo: user.user_photo,
          sum_push: user.sum_push,
          category_level3_no: user.category_level3_no,
        })),
      });
    }
    // 가장 최근의 비디오 가져오기
    bestList = await videoQuery.getLatestVideoThumbnailByUserList({
      userEmergenzaList: bestEmergenzaList,
      category3No: 2,
    });

    bestAppleList = await rank.getChachingRankListByType({
      category3No: 4,
      userType: "dreamer",
      type: "season",
      limit: 100,
    });

    topProducerList = await rankQuery.getProducerRankListInThisWeek({
      limit: 100,
    });

    // const emergenzaList = await emergenzaList;

    return res.status(200).send({
      message: "get main page data",
      hotViewVideoIndex,
      hotViewVideoList,
      // 핫톡 주석
      // hotTalkVideoIndex,
      // hotTalkVideoList,
      // hotLikeVideoIndex,
      // hotLikeVideoList,
      openCategoryList,
      // 뉴비디오 주석
      // newVideoIndex,
      // newVideoList,
      // bestEmergenzaList:
      //   bestEmergenzaList &&
      //   bestEmergenzaList.map((user) => ({
      //     ranking: user.ranking,
      //     user_no: user.user_no,
      //     nickname: user.nickname,
      //     category_level3_no: user.category_level3_no,
      //     VIDEO: user.VIDEO,
      //   })),

      // bestAppleList: [{ user_no: 1, nickname: "a", user_photo: ".png", sum_push: "10000", category_level3_no: 4 },...]
      // bestAppleList -> rankingList (진행중인 경연 마다 랭킹목록 조회)
      // rankingList: { category_level3_no: [ranking] }
      // rankingList: {
      //   4: [{ user_no: 1, nickname: "a", user_photo: ".png", sum_push: "10000", category_level3_no: 4 },...],
      //   5: [{ user_no: 1, nickname: "a", user_photo: ".png", sum_push: "10000", category_level3_no: 4 },...]
      // },
      rankingList,
      bestAppleList:
        bestAppleList &&
        bestAppleList.map((user) => ({
          user_no: user.user_no,
          nickname: user.nickname,
          user_photo: user.user_photo,
          sum_push: user.sum_push,
          category_level3_no: user.category_level3_no,
        })),
      topProducerList,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getMainData = async (req, res, next) => {
  const { category } = req.query;
  try {
    const toptenVideoList = await videoQuery.getToptenVideo({ category });
    const newVideoList = await videoQuery.getNewVideoMain({ category });
    const officialVideoList = await videoQuery.getOfficialVideoList({
      category2No: category,
    });
    // const emergenzaVideoList = await videoQuery.getEmergenzaVideoMain({
    //   category
    // });

    const hotViewVideoList = await videoQuery.getHotVideoMain({ category });
    res.status(200).send({
      toptenVideoList,
      newVideoList,
      officialVideoList,
      // emergenzaVideoList,
      hotViewVideoList,
    });
  } catch (error) {
    next(error);
  }
};
