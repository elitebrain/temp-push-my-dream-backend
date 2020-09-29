const { Container } = require("typedi");
const createHttpError = require("http-errors");

const { sequelize } = require("config/sequelize.config");

const ActiveLogQuery = require("queries/ActiveLogQuery");
const CommentQuery = require("queries/CommentQuery");
const FlagLogQuery = require("queries/FlagLogQuery");
const RankingQuery = require("queries/RankingQuery");
const VideoQuery = require("queries/VideoQuery");

const videoFile = require("libs/videoFile");

const activeLogQuery = Container.get(ActiveLogQuery);
const commentQuery = Container.get(CommentQuery);
const flagLogQuery = Container.get(FlagLogQuery);
const rankingQuery = Container.get(RankingQuery);
const videoQuery = Container.get(VideoQuery);

// 내가 등록한 영상 조회 (mypage)
exports.getMyVideoList = async (req, res, next) => {
  const user = req.user;

  try {
    const myVideoList = await videoQuery.getMyVideoList(user.user_no);

    res.status(200).send(myVideoList);
  } catch (error) {
    next(error);
  }
};

// 신규 영상 조회 전체 (/new-video)
exports.getNewVideo = async (req, res, next) => {
  try {
    const { offset = 0, limit = 12, category } = req.query;
    const videoList = await videoQuery.getNewVideo({ offset, limit, category });

    res.status(200).send(videoList);
  } catch (error) {
    next(error);
  }
};

// 핫톡 영상 조회 전체 (/hot-video)
exports.getHotVideo = async (req, res, next) => {
  try {
    const { offset = 0, limit = 12, category } = req.query;
    const videoList = await videoQuery.getHotVideo({ offset, limit, category });

    res.status(200).send(videoList);
  } catch (error) {
    next(error);
  }
};

// 공식 영상 조회 전체 (/official-video)
exports.getOfficialVideo = async (req, res, next) => {
  try {
    const { offset = 0, limit = 12, category } = req.query;
    const videoList = await videoQuery.getOfficialVideo({
      offset,
      limit,
      category,
    });

    res.status(200).send(videoList);
  } catch (error) {
    next(error);
  }
};

// 공개|비공개 수정
exports.modifyIsOpen = async (req, res, next) => {
  let transaction = null;

  try {
    transaction = await sequelize.transaction();
    const user = req.user;
    const { videoNo, flag } = req.body;

    const video = await videoQuery.getVideo({ videoNo }, { transaction });

    // 비디오 미존재시
    if (!video) {
      return res.status(400).send({ message: "비디오가 존재하지 않습니다." });
    }

    console.log(video);
    // 비디오 상태가 업로드 업로드 및 컨버팅 완료 상태가 아닐 시
    if (video.status_no !== 6) {
      return res.status(400).send({
        message: `업로드에 실패한 비디오는 상태를 전환할 수 없습니다.`,
      });
    }

    // 신고잠금인데 플래그 변경이 일어날시
    // 신고잠금 상태에서 플래그변경은 어드민만 가능하다.
    if (video.flag === 2) {
      return res.status(400).send({
        message: `신고로 인한 비디오 상태는 공개로 전환될 수 없습니다. 관리자에게 문의해주세요.`,
      });
    }

    await videoQuery.modifyIsOpen(
      {
        videoNo,
        flag,
        userNo: user.user_no,
      },
      { transaction }
    );

    await flagLogQuery.setFlagByVideoNo(
      {
        videoNo,
        userNo: user.user_no,
        flag,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(200).send({ message: "change open status by video" });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// 영상 삭제
exports.removeVideo = async (req, res, next) => {
  let transaction = null;
  try {
    transaction = await sequelize.transaction();
    const user = req.user;
    const { videoNo } = req.params;

    const userNo = user.user_no;

    const video = await videoQuery.getVideo({ videoNo });
    const { NCLOUD_STORAGE_URL } = process.env;

    // 비디오 목록의 링크들 null값처리 및 플래그 3 처리
    await videoQuery.deleteVideoFileByVideoNo(
      { videoNo, flag: 3 },
      { transaction }
    );

    // 비디오 목록 플래그 처리 기록 로깅
    await flagLogQuery.setFlagByVideoNo(
      {
        videoNo,
        // 공식영상일시 삭제를 지시한 관리자 아이디를 남김
        userNo: req.user.user_no,
        flag: 3,
      },
      { transaction }
    );

    // 플래그 설정할 댓글 조회
    const commentList = await commentQuery.getAllCommentByVideoNo({ videoNo });

    // 댓글 존재시
    if (commentList.length > 0) {
      // 비디오 목록의 댓글들의 플래그 4처리
      await commentQuery.setFlagCommnetByVideoNo(
        {
          flag: 7,
          videoNo: videoNo,
        },
        { transaction }
      );

      // 비디오 목록 플래그 처리 기록 로깅
      await flagLogQuery.setFlagByCommentList(
        {
          commentList: commentList.map((comment) => comment.comment_no),
          userNo: req.user.user_no,
          flag: 7,
        },
        { transaction }
      );
    }

    // 썸네일 삭제
    const thumbnailList = await videoQuery.getThumbnailListByVideoNo({
      videoNo,
    });

    await videoQuery.deleteThumbnailByVideoNo({ videoNo }, { transaction });

    await transaction.commit();

    // 파일 삭제
    // await을 주면 비동기로 실행한 프로세스들이 완료 할때 까지 대기해야해서 await을 제거
    Promise.all([
      videoFile.deleteFile({
        key: video.url_original.split(NCLOUD_STORAGE_URL)[1],
      }),
      videoFile.deleteFile({
        key: video.url_480p.split(NCLOUD_STORAGE_URL)[1],
      }),
      videoFile.deleteFile({
        key: video.url_720p.split(NCLOUD_STORAGE_URL)[1],
      }),
      videoFile.deleteFile({
        key: video.url_1080p.split(NCLOUD_STORAGE_URL)[1],
      }),
      videoFile.deleteFile({
        key: video.thumbnail.split(NCLOUD_STORAGE_URL)[1],
      }),
      ...thumbnailList.map((thumbnail) =>
        videoFile.deleteFile({
          key: thumbnail.thumbnail_url.split(NCLOUD_STORAGE_URL)[1],
        })
      ),
    ]);

    res.status(200).send({ message: "deleted video" });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// 작업 상태 조회
exports.getJobStatus = async (req, res, next) => {
  try {
    const { jobId } = req.query;
    console.log(jobId);
    const data = await videoQuery.getJobStatus(jobId);

    let result;

    // 비디오 컨버팅 에러
    if (data.STATUS.status_no === 5) {
      result = {
        code: 400,
        message: "영상 변환이 실패하였습니다.",
      };
    }
    // 비디오 컨버팅 성공
    else if (data.STATUS.status_no === 6) {
      result = {
        code: 200,
        message: "영상을 변환하였습니다.",
        video: data,
      };
    }
    // 컨버팅 중
    else {
      result = {
        code: 201,
        message: "영상 변환 중입니다.",
      };
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

// 영상 조회 최초
exports.getVideoList = async (req, res, next) => {
  try {
    const { videoNo, limit, listGubun, currentUserNo, category } = req.query;
    console.log("req.query", req.query);
    const result = await videoQuery.getVideoList({
      videoNo,
      userNo: (req.user && req.user.user_no) || null,
      limit,
      listGubun,
      currentUserNo,
      category,
      isAdmin: req.isAdmin,
    });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

// 영상 조회
exports.getVideo = async (req, res, next) => {
  console.log("req.query", req.query);
  try {
    const {
      videoNo,
      offset,
      limit,
      listGubun,
      currentUserNo,
      category,
    } = req.query;
    const result = await videoQuery.getNextVideoList({
      videoNo,
      userNo: (req.user && req.user.user_no) || null,
      offset,
      limit,
      listGubun,
      currentUserNo,
      category,
      isAdmin: req.isAdmin,
    });

    console.log(result);

    // const result = await videoQuery.getVideo(videoNo, userNo);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

// 조회수 증가
exports.modifyVideoView = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { videoNo, tempId } = req.body;

    // setupRanking(videoNo, "view");
    const result = await videoQuery.modifyVideoView(
      {
        videoNo,
        userNo: (req.user && req.user.user_no) || null,
        tempId,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).send(result);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
// 추천
exports.modifyVideoLike = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const userNo = req.user.user_no;

    const { videoNo } = req.body;
    // setupRanking(videoNo, "like");

    // 팔로우가 이미 진햇되었는지 확인
    const exLike = await activeLogQuery.existLike(
      { userNo: req.user.user_no, videoNo },
      { transaction }
    );

    if (exLike) {
      throw createHttpError(400, "exist like");
    }

    const result = await videoQuery.modifyVideoLike(
      { videoNo, userNo },
      {
        transaction,
      }
    );

    await transaction.commit();
    res.status(200).send(result);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
// 추천 취소
exports.removeVideoLike = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const userNo = req.user.user_no;
    const { videoNo } = req.query;

    // 팔로우가 이미 진햇되었는지 확인
    const exLike = await activeLogQuery.existLike(
      { userNo: req.user.user_no, videoNo },
      { transaction }
    );

    if (!exLike) {
      throw createHttpError(400, "not exist like");
    }

    // setupRanking(videoNo, "dislike");
    const result = await videoQuery.removeVideoLike(
      { videoNo, userNo },
      { transaction }
    );

    await transaction.commit();
    res.status(200).send(result);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// 내 영상 갯수 조회
exports.getMyVideoCount = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await videoQuery.getMyVideoCount(user.user_no);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.modifyViewVideoUserNo = async (req, res, next) => {
  try {
    const { tempId, userNo } = req.body;
    const result = await activeLogQuery.modifyViewVideoUserNo(tempId, userNo);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const setupRanking = async (videoNo, gubun) => {
  const addView = gubun === "view" ? 1 : 0;
  const addLike = gubun === "like" ? 1 : gubun === "dislike" ? -1 : 0;
  const addPush = gubun === "push" ? 1 : 0;
  const video = await videoQuery.getVideoByVideoNo(videoNo);
  const existRanking = await rankingQuery.checkExist(
    video.category_level3_no,
    video.user_no
  );
  if (existRanking) {
    rankingQuery.modifyRanking(
      existRanking.ranking_no,
      existRanking.ranking,
      existRanking.count_view + addView,
      existRanking.count_like + addLike,
      existRanking.count_push + addPush
    );
  } else {
    rankingQuery.setRanking(video.category_level3_no, video.user_no, 1);
  }
};

exports.getVideoByVideoNo = async (req, res, next) => {
  try {
    const { videoNo } = req.params;

    const video = await videoQuery.getVideoInfoByVideoNo({ videoNo });

    if (!video) {
      return res.status(400).send({ message: "failure get video" });
    }

    return res.status(200).send({ message: "success get video", video });
  } catch (error) {
    next(error);
  }
};

exports.getMoreVideo = async (req, res, next) => {
  try {
    const { option } = req.query;
    const { fetchList } = req.queryPolluted;

    console.log(fetchList);

    const result = await videoQuery.getVideoIntroList({
      option,
      videoNoList: fetchList,
      userNo: req.user && req.user.user_no,
    });

    return res
      .status(200)
      .send({ message: "success get more video", videoList: result });
  } catch (error) {
    next(error);
  }
};
