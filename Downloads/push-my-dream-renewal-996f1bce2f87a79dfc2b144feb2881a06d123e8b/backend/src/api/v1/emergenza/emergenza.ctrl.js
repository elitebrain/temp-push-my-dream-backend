const { Container } = require("typedi");

const EmergenzaQuery = require("queries/EmergenzaQuery");
const VideoQuery = require("queries/VideoQuery");

const emergenzaQuery = Container.get(EmergenzaQuery);

const videoQuery = Container.get(VideoQuery);

exports.setEmergenza = async (req, res, next) => {
  const userNo = req.user.user_no;
  try {
    const {
      teamName,
      memberCount,
      genre,
      genre_etc,
      phone1,
      phone2,
      introduce,
      releaseCount,
      career,
      averageAge,
      instrumentList,
      memberEmailList
    } = req.body;
    const result = await emergenzaQuery.setEmergenza(
      userNo,
      teamName,
      memberCount,
      genre,
      genre_etc,
      phone1,
      phone2,
      introduce,
      releaseCount,
      career,
      averageAge,
      instrumentList,
      memberEmailList
    );

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getEmergenza = async (req, res, next) => {
  const { selectCategory } = req.query;
  try {
    const userNo = req.user.user_no;
    const emergenza = await emergenzaQuery.getEmergenza(userNo);
    const video = await videoQuery.getEmergenzaVideo(userNo, selectCategory);

    const result = Object.assign({}, emergenza, {
      Video: video,
      isUploadVideo: video.length > 0
    });

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.modifyEmergenza = async (req, res, next) => {
  try {
    const {
      emergenzaTeamNo,
      teamName,
      memberCount,
      genre,
      genre_etc,
      phone1,
      phone2,
      introduce,
      releaseCount,
      career,
      averageAge,
      instrumentList,
      memberEmailList,
      videoNo,
      description
    } = req.body;
    if (videoNo) {
      await videoQuery.modifyDesc(videoNo, description);
    }
    const result = await emergenzaQuery.modifyEmergenza(
      emergenzaTeamNo,
      teamName,
      memberCount,
      genre,
      genre_etc,
      phone1,
      phone2,
      introduce,
      releaseCount,
      career,
      averageAge,
      instrumentList,
      memberEmailList
    );

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
