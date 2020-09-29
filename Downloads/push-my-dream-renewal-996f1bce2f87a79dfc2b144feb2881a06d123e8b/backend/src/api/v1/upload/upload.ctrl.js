const { Container } = require("typedi");

// upload query는 module 패턴이라 typedi 기능을 이용하지 않는다.
const UploadQuery = require("queries/UploadQuery");
const CommonQuery = require("queries/CommonQuery");
const videoFile = require("libs/videoFile");

const commonQuery = Container.get(CommonQuery);

// 비디오 아이디로 조회;
exports.getVideo = async (req, res, next) => {
  const { videoNo } = req.query;
  try {
    const videoData = await UploadQuery.selectVideoById(videoNo);

    res.status(200).send(videoData);
  } catch (error) {
    next(error);
  }
};

// 비디오 카테고리 조회
exports.getVideoCategory = async (req, res, next) => {
  const { category } = req.query;
  try {
    const result = await commonQuery.getCategory(category);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

// 업로드 후 비디오 정보 생성
exports.createVideo = async (req, res, next) => {
  const {
    description,
    title,
    category_level3_no,
    category_level2_no,
    category_level1_no,
    userNo,
  } = req.body;
  try {
    const videoNo = await UploadQuery.createVideo({
      description,
      title,
      category_level3_no,
      category_level2_no,
      category_level1_no,
      userNo,
    });

    res.status(200).json(videoNo);
  } catch (error) {
    next(error);
  }
};

// 업로드 후 비디오 경로 업데이터
exports.updateVideoOriginUrl = async (req, res, next) => {
  const { videoNo, location } = req.body;
  try {
    await UploadQuery.uploadVideo({ location, videoNo });

    res.status(200).send("success update video origin url");
  } catch (error) {
    next(error);
  }
};

// 비디오 상태 변경
exports.updateVideoStatus = async (req, res, next) => {
  const { videoNo, status } = req.body;
  try {
    await UploadQuery.updateStatusVideoById({
      videoNo,
      status,
    });

    res.status(200).send("success update video status");
  } catch (error) {
    next(error);
  }
};

//
exports.updateVideoTranscoder = async (req, res, next) => {
  const { videoNo, jobId, files, location } = req.body;
  try {
    await UploadQuery.addTranscoder({
      videoNo,
      jobId,
      files,
      location,
    });

    res.status(200).send("success update video transcoder");
  } catch (error) {
    next(error);
  }
};

// transcoder callback
// 참고 https://apidocs.ncloud.com/ko/media/vod_transcoder/job_create/#notification-url
exports.transcoderCallback = async (req, res, next) => {
  const { jobId, status } = req.body;
  let message = "";
  try {
    console.log("callback", status);
    if (status === "SUCCESS") {
      await UploadQuery.updateStatusAndFlagVideoByJobId({
        jobId,
        flag: 0,
        status: 6,
      });
      message = "인코딩에 성공하였습니다.";

      const video = await UploadQuery.selectVideoOriginByJobId(jobId);

      const { url_original } = video;
      const { NCLOUD_STORAGE_URL } = process.env;
      await videoFile.deleteFile({
        key: url_original.split(NCLOUD_STORAGE_URL)[1],
      });
    } else if (status === "FAILED") {
      await UploadQuery.updateStatusVideoByJobId({ jobId, status: 5 });
      message = "인코딩에 실패하였습니다.";

      const video = await UploadQuery.selectVideoOriginByJobId(jobId);

      const { url_original } = video;
      const { NCLOUD_STORAGE_URL } = process.env;
      await videoFile.deleteFile({
        key: url_original.split(NCLOUD_STORAGE_URL)[1],
      });
    }

    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};
