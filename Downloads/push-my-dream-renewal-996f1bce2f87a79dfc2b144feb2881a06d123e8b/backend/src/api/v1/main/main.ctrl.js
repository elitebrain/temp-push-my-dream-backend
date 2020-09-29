const { Container } = require("typedi");
const { sequelize } = require("config/sequelize.config");

const VideoQuery = require("queries/VideoQuery");

const videoQuery = Container.get(VideoQuery);

exports.getMainVideos = async (req, res, next) => {
  let transaction = null;

  try {
    transaction = await sequelize.transaction();

    let videoNoList = [];
    let hotViewVideoList = [];
    let hotTalkVideoList = [];
    let newVideoList = [];

    // 나중에 카테고리 기간안에 비디오만 나오게 해달라고하면 여길 수정하면 intro 붙혀진 메소드만 수정하면 됩니다.
    const hotViewVideoIndex = await videoQuery.getHotViewVideoIndex({
      transaction,
    });

    // 핫비디오 인덱스가 존재시
    if (hotViewVideoIndex.length) {
      videoNoList = hotViewVideoIndex.slice(0, 10);
      hotViewVideoList = await videoQuery.getVideoIntroList(
        {
          option: "hotView",
          videoNoList,
          userNo: req.user && req.user.user_no,
        },
        { transaction }
      );
    }

    // 나중에 카테고리 기간안에 비디오만 나오게 해달라고하면 여길 수정하면 intro 붙혀진 메소드만 수정하면 됩니다.
    const hotTalkVideoIndex = await videoQuery.getHotTalkVideoIndex({
      transaction,
    });

    // 핫비디오 인덱스가 존재시
    if (hotTalkVideoIndex.length) {
      videoNoList = hotTalkVideoIndex.slice(0, 10);
      hotTalkVideoList = await videoQuery.getVideoIntroList(
        {
          option: "hotTalk",
          videoNoList,
          userNo: req.user && req.user.user_no,
        },
        { transaction }
      );
    }

    // 나중에 카테고리 기간안에 비디오만 나오게 해달라고하면 여길 수정하면 intro 붙혀진 메소드만 수정하면 됩니다.
    const newVideoIndex = await videoQuery.getNewVideoIndex({
      transaction,
    });

    // 새비디오 인덱스가 존재시
    if (newVideoIndex.length) {
      videoNoList = newVideoIndex.slice(0, 10);
      newVideoList = await videoQuery.getVideoIntroList(
        { option: "new", videoNoList, userNo: req.user && req.user.user_no },
        { transaction }
      );
    }

    // const emergenzaList = await emergenzaList;

    await transaction.commit();

    return res.status(200).send({
      message: "get main page data",
      hotViewVideoIndex,
      hotViewVideoList,
      hotTalkVideoIndex,
      hotTalkVideoList,
      newVideoIndex,
      newVideoList,
    });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
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

    const hotVideoList = await videoQuery.getHotVideoMain({ category });
    res.status(200).send({
      toptenVideoList,
      newVideoList,
      officialVideoList,
      // emergenzaVideoList,
      hotVideoList,
    });
  } catch (error) {
    next(error);
  }
};
