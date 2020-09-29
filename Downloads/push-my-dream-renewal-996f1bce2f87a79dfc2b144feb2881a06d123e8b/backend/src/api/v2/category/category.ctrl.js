const { Container } = require("typedi");
const moment = require("moment");
const createHttpError = require("http-errors");

const CommonQuery = require("queries/CommonQuery");
const UserQuery = require("queries/UserQuery");
const VideoQuery = require("queries/VideoQuery");
const RankQuery = require("queries/RankQuery");

const { sequelize } = require("config/sequelize.config");

const commonQuery = Container.get(CommonQuery);
const userQuery = Container.get(UserQuery);
const videoQuery = Container.get(VideoQuery);
const rankQuery = Container.get(RankQuery);

// 진행 중인 대회 목록 조회
exports.getOpenedParticipationSeason = async (req, res, next) => {
  try {
    /**
     * 로그인 시 창여 여부까지 조회
     */
    const openedParticipationSeasons = await commonQuery.getOpenedParticipationSeason(
      { me: req.user && req.user.user_no }
    );

    console.log(openedParticipationSeasons);

    return res.status(200).send({
      openedParticipationSeasons,
    });
  } catch (error) {
    next(error);
  }
};

// 대회의 정보 조회
exports.getSeason = async (req, res, next) => {
  try {
    const { category3No } = req.params;

    const season = await commonQuery.getSeasonBySeasonNo({
      me: req.user && req.user.user_no,
      category3No,
    });

    // const isParticipateSeason = await userQuery.getIsParticipateSeason({
    //   targetNo: req.user.user_no,
    // });

    return res.status(200).send({ season });
  } catch (error) {
    next(error);
  }
};

// 참가하려는 대회 정보 조회
exports.getApplyInfoByCategory = async (req, res, next) => {
  try {
    const { category3No } = req.params;

    const season = await commonQuery.getSeasonBySeasonNo({
      me: req.user && req.user.user_no,
      category3No,
    });

    // 오늘이 시작일보다 이전일때
    if (
      moment().valueOf() <
        moment(season.CATEGORY_LEVEL4.start_time).valueOf() ||
      moment(season.CATEGORY_LEVEL4.end_time).valueOf() < moment().valueOf()
    ) {
      throw createHttpError(400, "현재 참가할 수 없는 시즌입니다.");
    }

    // 이 시즌에 참가중일 시
    if (season.is_participation_this_season) {
      throw createHttpError(421, "이미 참가중입니다.");
    }

    // const isParticipate = await userQuery.getIsParticipateSeason({
    //   targetNo: req.user && req.user.user_no,
    // });

    // // 다른 시즌에 참가중일 시
    // if (isParticipate) {
    //   throw createHttpError(
    //     400,
    //     "참가중인 대회가 있습니다. 대회 참가중인 상태에서는 중복 참가 할 수 없습니다."
    //   );
    // }

    return res.status(200).send({ season });
  } catch (error) {
    next(error);
  }
};

// 대회 참가
exports.applySeason = async (req, res, next) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const { category3No } = req.params;
    const { type } = req.body;

    const season = await commonQuery.getSeasonBySeasonNo(
      {
        me: req.user && req.user.user_no,
        category3No,
      },
      { transaction }
    );

    // 오늘이 시작일보다 이전일때
    if (
      moment().valueOf() <
        moment(season.CATEGORY_LEVEL4.start_time).valueOf() ||
      moment(season.CATEGORY_LEVEL4.end_time).valueOf() < moment().valueOf()
    ) {
      throw createHttpError(400, "현재 참가할 수 없는 시즌입니다.");
    }

    // 이 시즌에 참가중일 시
    if (season.is_participation_this_season) {
      throw createHttpError(421, "이미 참가중입니다.");
    }

    // const isParticipate = await userQuery.getIsParticipateSeason({
    //   targetNo: req.user && req.user.user_no,
    // });

    // // 다른 시즌에 참가중일 시
    // if (isParticipate) {
    //   throw createHttpError(
    //     400,
    //     "참가중인 대회가 있습니다. 대회 참가중인 상태에서는 중복 참가 할 수 없습니다."
    //   );
    // }

    await userQuery.applySeason(
      {
        category3No: season.category_level3_no,
        category4No: season.CATEGORY_LEVEL4.category_level4_no,
        type,
        me: req.user.user_no,
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(200).send({
      message: "대회에 참가 신청하였습니다.",
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/**
 * 넘사벽과 시즌은 video 테이브를 향하고
 * 나머지는 video_cache 테이블을 향해야합니다.
 */
exports.getCategoryVideos = async (req, res, next) => {
  const { category3No } = req.params;
  const { limit } = req.query;

  try {
    let officialVideoList = [];
    let videoNoList = [];
    let realtimeSurgePushVideoList = [];
    let hotPushVideoList = [];
    let seasonPushVideoList = [];
    // let realtimeSurgeLikeVideoList = [];
    // let realtimeSurgeTalkVideoList = [];
    // let hotLikeVideoList = [];
    // let hotViewVideoList = [];
    // let hotTalkVideoList = [];
    // let seasonLikeVideoList = [];
    // let seasonViewVideoList = [];
    let newVideoList = [];

    const officialVideoIndex = await videoQuery.getOfficialVideoIndex({
      category3No,
    });

    // 공식 영상 인덱스가 존재시
    if (officialVideoIndex.length) {
      videoNoList = officialVideoIndex;
      officialVideoList = await videoQuery.getVideoOfficialList({
        videoNoList,
        userNo: req.user && req.user.user_no,
      });
    }

    // const realtimeSurgeLikeVideoIndex = await videoQuery.getRealtimeSurgeLikeVideoIndex(
    //   {
    //     limit,
    //     category3No,
    //   }
    // );

    // // 실시간 급상승 LIKE 인덱스가 존재시
    // if (realtimeSurgeLikeVideoIndex.length) {
    //   videoNoList = realtimeSurgeLikeVideoIndex.slice(0, 10);
    //   realtimeSurgeLikeVideoList = await videoQuery.getVideoIntroList({
    //     option: "realtimeSurgeLike",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // const realtimeSurgeTalkVideoIndex = await videoQuery.getRealtimeSurgeTalkVideoIndex(
    //   {
    //     limit,
    //     category3No,
    //   }
    // );

    // // 실시간 급상승 TALK 인덱스가 존재시
    // if (realtimeSurgeTalkVideoIndex.length) {
    //   videoNoList = realtimeSurgeTalkVideoIndex.slice(0, 10);
    //   realtimeSurgeTalkVideoList = await videoQuery.getVideoIntroList({
    //     option: "realtimeSurgeTalk",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // const hotLikeVideoIndex = await videoQuery.getHotLikeVideoIndex({
    //   limit,
    //   category3No,
    // });

    // // 핫비디오 인덱스가 존재시
    // if (hotLikeVideoIndex.length) {
    //   videoNoList = hotLikeVideoIndex.slice(0, 10);
    //   hotLikeVideoList = await videoQuery.getVideoIntroList({
    //     option: "hotLike",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // const hotViewVideoIndex = await videoQuery.getHotViewVideoIndex({
    //   limit,
    //   category3No,
    // });

    // // 핫비디오 인덱스가 존재시
    // if (hotViewVideoIndex.length) {
    //   videoNoList = hotViewVideoIndex.slice(0, 10);
    //   hotViewVideoList = await videoQuery.getVideoIntroList({
    //     option: "hotView",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // const hotTalkVideoIndex = await videoQuery.getHotTalkVideoIndex({
    //   limit,
    //   category3No,
    // });

    // 핫비디오 인덱스가 존재시
    // if (hotTalkVideoIndex.length) {
    //   videoNoList = hotTalkVideoIndex.slice(0, 10);
    //   hotTalkVideoList = await videoQuery.getVideoIntroList({
    //     option: "hotTalk",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // const seasonLikeVideoIndex = await videoQuery.getSeasonLikeVideoIndex({
    //   limit,
    //   category3No,
    // });

    // // 넘사벽 like 인덱스가 존재시
    // if (seasonLikeVideoIndex.length) {
    //   videoNoList = seasonLikeVideoIndex.slice(0, 10);
    //   seasonLikeVideoList = await videoQuery.getVideoIntroList({
    //     option: "seasonLike",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    // const seasonViewVideoIndex = await videoQuery.getSeasonViewVideoIndex({
    //   limit,
    //   category3No,
    // });

    // // 넘사벽 view 인덱스가 존재시
    // if (seasonViewVideoIndex.length) {
    //   videoNoList = seasonViewVideoIndex.slice(0, 10);
    //   seasonViewVideoList = await videoQuery.getVideoIntroList({
    //     option: "seasonView",
    //     videoNoList,
    //     userNo: req.user && req.user.user_no,
    //   });
    // }

    const realtimeSurgePushVideoIndex = await videoQuery.getRealtimeSurgePushVideoIndex(
      {
        category3No,
      }
    );

    console.log(realtimeSurgePushVideoIndex);

    // 실시간 푸쉬 인덱스가 존재시
    if (realtimeSurgePushVideoIndex.length) {
      videoNoList = realtimeSurgePushVideoIndex.slice(0, 20);
      realtimeSurgePushVideoList = await videoQuery.getVideoIntroList({
        option: "realtimeSurgePush",
        videoNoList,
        userNo: req.user && req.user.user_no,
      });
    }

    const hotPushVideoIndex = await videoQuery.getHotPushVideoIndex({
      category3No,
    });

    // 핫 푸쉬 인덱스가 존재시
    if (hotPushVideoIndex.length) {
      videoNoList = hotPushVideoIndex.slice(0, 20);
      hotPushVideoList = await videoQuery.getVideoIntroList({
        option: "hotPush",
        videoNoList,
        userNo: req.user && req.user.user_no,
      });
    }

    const seasonPushVideoIndex = await videoQuery.getSeasonPushVideoIndex({
      category3No,
    });

    // 넘사벽 푸쉬 인덱스가 존재시
    if (seasonPushVideoIndex.length) {
      videoNoList = seasonPushVideoIndex.slice(0, 20);
      seasonPushVideoList = await videoQuery.getVideoIntroList({
        option: "seasonPush",
        videoNoList,
        userNo: req.user && req.user.user_no,
      });
    }

    const newVideoIndex = await videoQuery.getNewVideoIndex({
      category3No,
    });

    // 새비디오 인덱스가 존재시
    if (newVideoIndex.length) {
      videoNoList = newVideoIndex.slice(0, 20);
      newVideoList = await videoQuery.getVideoIntroList({
        option: "new",
        videoNoList,
        userNo: req.user && req.user.user_no,
      });
    }

    // const emergenzaList = await emergenzaList;

    return res.status(200).send({
      message: "get main page data",
      officialVideoIndex,
      officialVideoList,
      // realtimeSurgeLikeVideoIndex,
      // realtimeSurgeLikeVideoList,
      // realtimeSurgeTalkVideoIndex,
      // realtimeSurgeTalkVideoList,
      // hotLikeVideoIndex,
      // hotLikeVideoList,
      // hotViewVideoIndex,
      // hotViewVideoList,
      // hotTalkVideoIndex,
      // hotTalkVideoList,
      // seasonLikeVideoIndex,
      // seasonLikeVideoList,
      // seasonViewVideoIndex,
      // seasonViewVideoList,
      realtimeSurgePushVideoIndex,
      realtimeSurgePushVideoList,
      hotPushVideoIndex,
      hotPushVideoList,
      seasonPushVideoIndex,
      seasonPushVideoList,
      newVideoIndex,
      newVideoList,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUserByCategory = async (req, res, next) => {
  try {
    const { category3No } = req.params;

    const todayStartTime = moment().format("YYYY-MM-DD 00:00:00");

    const sixDaysAgo = moment()
      .subtract(6, "days")
      .format("YYYY-MM-DD 00:00:00");

    const now = moment().format("YYYY-MM-DD HH:mm:ss");

    const season = await commonQuery.getOpenRound({ category3No });

    console.log(season);

    const isPush = await commonQuery.getIsPushByCategory3No({
      category3No,
    });

    // 카테고리3 기준 오늘 하루 point를 가장 많이 받은 사람
    let bestUsersInToday = [];

    bestUsersInToday = await rankQuery.getRoundRankListByPush({
      startDate: todayStartTime,
      endDate: now,
      limit: 10,
      category4No: season.category_level4_no,
    });

    //  카테고리3 기준  기준최근 3일 이내 push를 가장 많이 받은 사람

    let rookiesInSevenDays = [];
    if (season) {
      rookiesInSevenDays = await userQuery.getRookiesInCategory({
        startTime: sixDaysAgo,
        limit: 100,
        category3No,
        category4No: season.category_level4_no,
      });
    }

    //  카테고리3 기준  뉴비 리스트
    let newbiesInSevenDays = [];
    newbiesInSevenDays = await userQuery.getNewbiesInCategory({
      startTime: sixDaysAgo,
      limit: 100,
      category3No,
    });

    // 카테고리3 누적 push를 가장 많이한 프로듀서
    let bestProducersInSeason = [];
    // 프로듀서는 투자한 푸쉬를 가지고 순위를 메기기 때문에 funding이 아니면 미실행한다.
    if (isPush) {
      bestProducersInSeason = await rankQuery.getProducerRankListByCategroy3No({
        limit: 10,
        category3No,
      });
    }

    return res.status(200).send({
      message: "get user rank by category",
      bestUsersInToday: bestUsersInToday.map((user) =>
        isPush
          ? {
              user_no: user.user_no,
              nickname: user.nickname,
              user_photo: user.user_photo,
              sum_push: user.sum_push,
            }
          : {
              user_no: user.user_no,
              nickname: user.nickname,
              user_photo: user.user_photo,
              sum_like: user.sum_like,
            }
      ),

      rookiesInSevenDays: rookiesInSevenDays.map((user) =>
        isPush
          ? {
              user_no: user.user_no,
              nickname: user.nickname,
              user_photo: user.user_photo,
              sum_push: user.sum_push,
            }
          : {
              user_no: user.user_no,
              nickname: user.nickname,
              user_photo: user.user_photo,
            }
      ),
      newbiesInSevenDays,
      bestProducersInSeason,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBannerByCategory = async (req, res, next) => {
  try {
    const { category3No } = req.params;

    const banner = await commonQuery.getBannerByCategory({ category3No });

    return res.status(200).send({
      message: "get banner by cateogry",
      banner,
    });
  } catch (error) {
    next(error);
  }
};
