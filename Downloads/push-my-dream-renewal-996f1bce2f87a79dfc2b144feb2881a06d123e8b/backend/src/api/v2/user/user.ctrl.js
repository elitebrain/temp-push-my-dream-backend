const { Container } = require("typedi");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const createHttpError = require("http-errors");

const { sequelize } = require("config/sequelize.config");
const ActiveLogQuery = require("queries/ActiveLogQuery");
const ContestLogQuery = require("queries/ContestLogQuery");
const CommentQuery = require("queries/CommentQuery");
const FlagLogQuery = require("queries/FlagLogQuery");
const UserQuery = require("queries/UserQuery");
const VideoQuery = require("queries/VideoQuery");
const RankQuery = require("queries/RankQuery");
const CommonQuery = require("queries/CommonQuery");
const PushLogQuery = require("queries/PushLogQuery");
const PointQuery = require("queries/PointQuery");
const PointLogQuery = require("queries/PointLogQuery");

const token = require("shared/token");
const { deleteFile } = require("libs/videoFile");
const { profile } = require("middlewares/upload");
const rank = require("libs/rank");
const { getWeekOfMonth, numberWithCommas } = require("shared/functions");
const { adminCommonApi } = require("libs/api");
const pushCache = require("libs/cache/push");
const videoFile = require("libs/videoFile");

const activeLogQuery = Container.get(ActiveLogQuery);
const contestLogQuery = Container.get(ContestLogQuery);
const commentQuery = Container.get(CommentQuery);
const flagLogQuery = Container.get(FlagLogQuery);
const userQuery = Container.get(UserQuery);
const videoQuery = Container.get(VideoQuery);
const rankQuery = Container.get(RankQuery);
const commonQuery = Container.get(CommonQuery);
const pushLogQuery = Container.get(PushLogQuery);
const pointQuery = Container.get(PointQuery);
const pointLogQuery = Container.get(PointLogQuery);

// 유저 정보 불러오기
exports.loadUser = async (req, res, next) => {
  try {
    const user = req.user;

    const ContestLogs = await contestLogQuery.getContestLogByUserId(
      user.user_no
    );

    user.ContestLogs = ContestLogs;

    const activeLogList = await activeLogQuery.getList(user.user_no);
    user.likeVideoList = activeLogList.likeVideoList;
    user.likeUserList = activeLogList.likeUserList;
    user.followingList = activeLogList.followingList;

    const resultUser = Object.assign({}, user);

    delete resultUser.local_password;
    // delete resultUser.phone;
    delete resultUser.ci;
    delete resultUser.di;

    delete resultUser.have_push;
    delete resultUser.receive_push;

    return res
      .status(200)
      .send({ message: "success load user", user: resultUser });
  } catch (error) {
    next(error);
  }
};

// 로그아웃
exports.logout = (req, res, next) => {
  const { NODE_ENV: env } = process.env;

  const condition =
    env === "development"
      ? {
          httpOnly: true,
          maxAge: 0,
        }
      : {
          httpOnly: true,
          secure: true,
          domain: ".khanteum.com",
          maxAge: 0,
        };

  // accessToken 설정
  res.cookie("PAID", null, condition);

  // refreshToken 설정
  res.cookie("PRID", null, condition);

  try {
    return res.status(200).send({ message: "로그아웃하였습니다" });
  } catch (error) {
    next(error);
  }
};

// 로그인
exports.login = async (req, res, next) => {
  const { id, loginType, email, password } = req.body;

  try {
    let user;

    if (loginType === "local") {
      user = await userQuery.getLoaclLoginUser({ email, loginType });
    } else {
      user = await userQuery.getLoginUser({ id, loginType });
    }

    if (!user) {
      if (loginType === "local") {
        return res
          .status(400)
          .send({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
      } else {
        return res.status(400).send({ message: "등록되지 않는 계정입니다." });
      }
    }
    if (loginType === "local") {
      const passwordCheck = await bcrypt.compare(password, user.local_password);

      if (!passwordCheck) {
        return res
          .status(400)
          .send({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
      }
    }

    // 마지막 로그인 시간 업데이트
    let dateTime = new Date();
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");

    await userQuery.updateLastLoggedTime(user.user_no, dateTime);

    const accessToken = await token.setAccessToken(user.user_no);
    const refreshToken = await token.setRefreshToken(user.user_no);

    const ContestLogs = await contestLogQuery.getContestLogByUserId(
      user.user_no
    );

    user.ContestLogs = ContestLogs;

    const resultUser = Object.assign(user);

    // delete resultUser.user_no;
    delete resultUser.local_password;
    delete resultUser.phone;
    delete resultUser.ci;
    delete resultUser.di;

    const { NODE_ENV: env } = process.env;

    const accessCondition =
      env === "development"
        ? {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
          }
        : {
            httpOnly: true,
            secure: true,
            domain: ".khanteum.com",
            maxAge: 1000 * 60 * 60 * 2,
          };

    const refreshCondition =
      env === "development"
        ? {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
          }
        : {
            httpOnly: true,
            secure: true,
            domain: ".khanteum.com",
            maxAge: 1000 * 60 * 60 * 24 * 365,
          };

    // accessToken 설정
    res.cookie("PAID", accessToken, accessCondition);
    // refreshToken 설정
    res.cookie("PRID", refreshToken, refreshCondition);

    return res.status(200).send({
      message: "success login",
      user: resultUser,
    });
  } catch (error) {
    next(error);
  }
};

// 가입된 아이디인지 체크
exports.checkId = async (req, res, next) => {
  const { id, loginType } = req.body;

  try {
    const user = await userQuery.getLoginUser({ id, loginType });

    if (user) {
      return res.status(409).send({
        message: "이미 가입된 아이디입니다.",
      });
    } else {
      return res.status(200).send({
        message: "user not signUp",
      });
    }
  } catch (error) {
    next(error);
  }
};

// 로컬 로그인 체크
exports.checkLocalLogin = async (req, res, next) => {
  const { email } = req.query;
  try {
    const check = await userQuery.checkLocalLogin(email);

    if (!check.isUniqueEmail) {
      return res.status(200).send({ message: "this email is available" });
    } else {
      return res.status(400).send({ message: "이미 가입된 이메일입니다." });
    }
  } catch (error) {
    next(error);
  }
};

// di를 이용해 유저찾기
exports.getUserByDi = async (req, res, next) => {
  const { di } = req.query;
  try {
    const check = await userQuery.getUserByDi(di);

    return res.status(200).send({
      user: check,
      isExist: check ? true : false,
    });
  } catch (error) {
    next(error);
  }
};

// USER 정보 조회 (/user) - 타인정보
exports.getUserInfo = async (req, res, next) => {
  const { userNo } = req.query;

  try {
    const userInfo = await userQuery.getUserInfo({
      userNo,
      isAdmin: req.isAdmin,
      me: req.user && req.user.user_no,
    });

    return res.status(200).send({ user: userInfo });
  } catch (error) {
    next(error);
  }
};

// // USER 정보 조회 (/mypage) - 본인정보
exports.getMyInfo = async (req, res, next) => {
  try {
    const user = req.user;
    const { user_no } = user;
    // const { user_no } = req.query;
    const userInfo = await userQuery.getMyInfo(user_no);

    return res.status(200).send(userInfo);
  } catch (error) {
    next(error);
  }
};

// USER 정보 조회 (/mypage/edit) - 본인정보 for 수정
exports.getEditInfo = async (req, res, next) => {
  try {
    const { user_no } = req.user;
    const userInfo = await userQuery.getEditInfo(user_no);

    return res.status(200).send(userInfo);
  } catch (error) {
    next(error);
  }
};

// USER 정보 수정 (/mypage/edit)
exports.modifyInfo = async (req, res, next) => {
  try {
    const {
      userNo,
      userPhoto,
      phone,
      introduce,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      blogUrl,
      twitterUrl,
      password,
      isDeleteProfileImage,
      nickname,
    } = req.body;
    if (nickname) {
      const check = await userQuery.getNickname(nickname);

      if (check) {
        return res
          .status(400)
          .send({ message: "이미 가입된 닉네임입니다.", e: 1 });
      }

      const isEmptyLogInFifteenDays = await userQuery.checkChangeNicknameLog({
        userNo: req.user.user_no,
      });

      // 15일 이내 변경된 로그 존재시
      if (!isEmptyLogInFifteenDays) {
        return res.status(400).send({
          message:
            "15일 이내에 닉네임을 변경한 이력이 있어 변경이 불가능합니다.",
          e: 2,
        });
      }
    }

    let hash;
    if (password) {
      hash = await bcrypt.hash(password, 12);
    }

    if (req.file) {
      const user_photo = req.file.location;

      const result = await userQuery.modifyInfo({
        userNo,
        userPhoto: user_photo,
        phone,
        introduce,
        facebookUrl,
        instagramUrl,
        youtubeUrl,
        blogUrl,
        twitterUrl,
        hash,
        nickname,
      });

      if (nickname) {
        await userQuery.setChangeNicknameLog({
          user: req.user,
          nickname,
        });
      }

      return res.status(200).send(result);
    } else {
      if (isDeleteProfileImage) {
        const { NCLOUD_STORAGE_URL, DEFAULT_IMAGE_URL } = process.env;

        if (req.user.user_photo !== DEFAULT_IMAGE_URL) {
          await videoFile.deleteFile({
            key: req.user.user_photo.split(NCLOUD_STORAGE_URL)[1],
          });
        }
      }

      const result = await userQuery.modifyInfo({
        userNo,
        userPhoto,
        phone,
        introduce,
        facebookUrl,
        instagramUrl,
        youtubeUrl,
        blogUrl,
        twitterUrl,
        hash,
        isDeleteProfileImage,
        nickname,
      });

      if (nickname) {
        await userQuery.setChangeNicknameLog({
          user: req.user,
          nickname,
        });
      }

      return res.status(200).send(result);
    }
  } catch (error) {
    next(error);
  }
};

// 가입한 닉네임인지 체크
exports.checkNickname = async (req, res, next) => {
  const { nickname } = req.query;

  try {
    const check = await userQuery.getNickname(nickname);

    if (check) {
      return res
        .status(400)
        .send({ message: "이미 가입된 닉네임입니다.", e: 1 });
    }

    return res.status(200).send({ message: "this nickname is available" });
  } catch (error) {
    next(error);
  }
};

// 회원가입F
exports.signUp = async (req, res, next) => {
  try {
    profile.signUp(req, res, async function (err) {
      if (err) {
        return res.status(err.code || 500).send({ message: err.message });
      }
      let result = null;
      let file = req.file || null;

      const {
        userName,
        di,
        email,
        gender,
        country,
        birthdate,
        phone,
        password,
        nickname,
        termsApplyTime,
        loginType,
        id,
      } = req.body;

      // 파일이 존재하면 이미 회원정보는 입력되었기 때문에 몇가지 사항만 수정한다.
      if (file) {
        const { nickname } = req.body;

        await userQuery.modifyUser(
          req.user_no,
          phone,
          nickname,
          req.file.location
        );

        return res.status(200).send({ message: "signup Success" });
      } else {
        const check = await userQuery.checkUnique({
          di,
          email,
          phone,
          nickname,
          loginType,
          id,
        });

        // 중복된 값이 존재시
        if (check) {
          if (check.di === di) {
            return res.status(400).send({ message: "이미 등록된 정보입니다." });
          }

          if (check.email === email) {
            return res
              .status(400)
              .send({ message: "이미 등록된 이메일입니다." });
          }

          if (check.nickname === nickname) {
            return res
              .status(400)
              .send({ message: "이미 등록된 닉네임입니다." });
          }
          if (
            check.kakao_id === id ||
            check.google_id === id ||
            check.naver_id === id ||
            check.local_id === email
          ) {
            return res.status(400).send({ message: "이미 등록된 정보입니다." });
          }
        }
        if (loginType === "local") {
          const hash = await bcrypt.hash(password, 12);

          result = await userQuery.setLocalUser({
            userName,
            di,
            email,
            gender,
            country,
            birthdate,
            phone,
            nickname,
            termsApplyTime,
            hash,
            file,
          });
        } else {
          result = await userQuery.setUser({
            userName,
            di,
            email,
            gender,
            country,
            birthdate,
            phone,
            nickname,
            termsApplyTime,
            loginType,
            id,
            file,
          });
        }
        return res.status(200).send({ result, message: "signup Success" });
      }
    });
  } catch (error) {
    next(error);
  }
};
// 팔로우
exports.modifyFollow = async (req, res, next) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const { targetNo } = req.body;

    // 팔로우가 이미 진햇되었는지 확인
    const exFollow = await activeLogQuery.existFollow(
      { userNo: req.user.user_no, targetNo },
      { transaction }
    );

    if (exFollow) {
      throw createHttpError(400, "exist follow");
    }

    const result = await userQuery.modifyFollow(
      {
        targetNo,
        userNo: req.user.user_no,
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
// 팔로우 취소
exports.removeFollow = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { targetNo } = req.query;

    // 팔로우가 이미 진햇되었는지 확인
    const exFollow = await activeLogQuery.existFollow(
      { userNo: req.user.user_no, targetNo },
      { transaction }
    );

    if (!exFollow) {
      throw createHttpError(400, "not exist follow");
    }

    const result = await userQuery.removeFollow(
      {
        targetNo,
        userNo: req.user.user_no,
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

// 네이버 로그안 콜백
exports.naverLoginCallback = async (req, res, next) => {
  const code = req.query.code;
  const state = req.query.state;

  const {
    NAVER_LOGIN_CLIENT_ID: client_id,
    NAVER_LOGIN_CLIENT_SECRET: client_secret,
    NAVER_LOGIN_REDIRECT_URL: redirectURI,
  } = process.env;
  const api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&redirect_uri=" +
    redirectURI +
    "&code=" +
    code +
    "&state=" +
    state;

  const request = require("request");
  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
    }
  });
};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    if (password.length < 8) {
      return res.status(400).send({
        message: "비밀번호는 8자 이상으로 입력해주세요.",
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).send({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    // 비밀번호 암호화
    const hash = await bcrypt.hash(password, 12);

    const result = await userQuery.changePassword({
      email,
      hash,
    });

    // 비밀번호 변경 실패
    if (!result[1]) {
      return res
        .status(200)
        .send({ message: "비밀번호를 변경을 실패하였습니다." });
    }

    res.status(200).send({ message: "비밀번호를 변경하였습니다." });
  } catch (error) {
    next(error);
  }
};

// 회원 탈퇴
exports.removeUser = async (req, res, next) => {
  let transaction = null;
  let videoList = [];
  let thumbnailList = [];

  try {
    transaction = await sequelize.transaction();

    const userNo = Number(req.user.user_no);

    const user = await userQuery.getUser({ userNo }, { transaction });

    const userFormat = Object.assign({}, user, {
      user_created_at: user.created_at,
    });
    delete userFormat.created_at;
    delete userFormat.updated_at;

    const { NCLOUD_STORAGE_URL, NODE_ENV: env } = process.env;

    const checkRemoveAvatar =
      String(user.user_photo).toLowerCase().indexOf("avatar") !== -1;

    // 기존의 이미지가 디폴트 이미지가 아니면 프로필 사진 삭제
    if (checkRemoveAvatar) {
      await deleteFile({ key: user.user_photo.split(NCLOUD_STORAGE_URL)[1] });
    }

    // 작성한 유저의 댓글 조회
    const commentList = await commentQuery.getAllCommentByUserNo(
      { userNo },
      { transaction }
    );

    if (commentList.length > 0) {
      const commentNoList = commentList.map((comment) => comment.comment_no);
      await commentQuery.deleteCommentList(
        {
          flag: 8,
          commentList: commentNoList,
        },
        {
          transaction,
        }
      );

      await flagLogQuery.setFlagByCommentList(
        {
          commentList: commentNoList,
          userNo: req.user.user_no,
          flag: 8,
        },
        { transaction }
      );
    }

    videoList = await videoQuery.getVideoByUserNo({ userNo }, { transaction });
    // 비디오 영상삭제
    if (videoList.length > 0) {
      const videoNoList = videoList.map((video) => video.video_no);

      // 비디오 목록의 링크들 null값처리 및 플래그 4 처리
      await videoQuery.deleteVideoFileByVideoList(
        {
          flag: 4,
          videoList: videoNoList,
        },
        { transaction }
      );

      // 비디오 목록 플래그 처리 기록 로깅
      await flagLogQuery.setFlagByVideoList(
        {
          videoList: videoNoList,
          userNo: req.user.user_no,
          flag: 4,
        },
        { transaction }
      );

      // 유저가 업로드한 비디오의 댓글 조회
      // 위 로직에서 유저가 작성한 댓글을 제거했기 때문에 유저가 업로한 비디오의 다른유저들의 댓글들만 가져온다.
      const commentListByVideoList = await commentQuery.getAllCommentByVideoList(
        { videoList: videoNoList },
        { transaction }
      );

      // 등록한 댓글 존재시 삭제 로직 실행
      if (commentListByVideoList.length > 0) {
        const commentNoList = commentListByVideoList.map(
          (comment) => comment.comment_no
        );
        await commentQuery.deleteCommentList(
          {
            flag: 7,
            commentList: commentNoList,
          },
          {
            transaction,
          }
        );

        await flagLogQuery.setFlagByCommentList(
          {
            commentList: commentNoList,
            userNo: req.user.user_no,
            flag: 7,
          },
          { transaction }
        );

        await commentQuery.setFlagCommnetByVideoList(
          {
            flag: 7,
            videoList: videoNoList,
          },
          { transaction }
        );
      }

      // 썸네일 삭제
      thumbnailList = await videoQuery.getThumbnailListByVideoList(
        {
          videoList: videoNoList,
        },
        { transaction }
      );

      await videoQuery.deleteThumbnailByVideoList(
        { videoList: videoNoList },
        { transaction }
      );
    }

    await userQuery.createLeaveUser({ user: userFormat }, { transaction });

    await userQuery.removeUser({ userNo }, { transaction });

    await transaction.commit();

    if (videoList.length > 0) {
      Promise.all([
        ...videoList.map((video) => [
          deleteFile({ key: video.url_480p.split(NCLOUD_STORAGE_URL)[1] }),
          deleteFile({ key: video.url_720p.split(NCLOUD_STORAGE_URL)[1] }),
          deleteFile({ key: video.url_1080p.split(NCLOUD_STORAGE_URL)[1] }),
        ]),
        ...thumbnailList.map((thumbnail) =>
          deleteFile({
            key: thumbnail.thumbnail_url.split(NCLOUD_STORAGE_URL)[1],
          })
        ),
      ]);
    }

    // 쿠키 초기화
    const condition =
      env === "development"
        ? {
            httpOnly: true,

            maxAge: 0,
          }
        : {
            httpOnly: true,
            secure: true,
            domain: ".khanteum.com",
            maxAge: 0,
          };

    // accessToken 설정
    res.cookie("PAID", null, condition);

    // refreshToken 설정
    res.cookie("PRID", null, condition);

    return res.status(200).send(userFormat);
  } catch (error) {
    await transaction.rollback();

    next(error);
  }
};

exports.getVideoByUser = async (req, res, next) => {
  try {
    const { userNo } = req.params;
    const { limit, category3No } = req.query;

    console.log("category3Nocategory3Nocategory3No", category3No);

    const newVideoListByUser = await videoQuery.getVideoByUser({
      userNo,
      limit,
      me: req.user && req.user.user_no,
      category3No,
    });

    return res.status(200).send({
      message: "success get new video list",
      list: newVideoListByUser,
    });
  } catch (error) {
    next(error);
  }
};

// 유저가 푸쉬 가능한지 체크
exports.getIsPushByUserNo = async (req, res, next) => {
  try {
    const { userNo } = req.params;

    const result = await userQuery.getIsPush({
      targetNo: userNo,
    });

    const isParticipateSeason = await userQuery.getIsParticipateSeason({
      targetNo: userNo,
    });

    const resultObject = result
      ? Object.assign({}, result, { isPush: Boolean(result.is_push) })
      : {};

    delete resultObject.is_push;

    return res.status(200).send({
      isParticipateSeason: Boolean(isParticipateSeason),
      ...resultObject,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 해당 라운드에 해당 유저가 푸쉬 가능한지 체크
exports.getIsPushByUserNoInCategory4No = async (req, res, next) => {
  const { userNo, category4No } = req.params;
  try {
    const result = await userQuery.getIsPushByCategory4No({
      targetNo: userNo,
      category4No,
    });

    const isParticipateSeason = await userQuery.getIsParticipateCategory4No({
      targetNo: userNo,
      category4No,
    });

    const resultObject = result
      ? Object.assign({}, result, { isPush: Boolean(result.is_push) })
      : {};

    delete resultObject.is_push;

    return res.status(200).send({
      isParticipateSeason: Boolean(isParticipateSeason),
      ...resultObject,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저가 참여한 경연 정보 조회
exports.getParticipateByUser = async (req, res, next) => {
  const { userNo } = req.params;

  try {
    const participations = await userQuery.getParticipateByUser({ userNo });

    return res.status(200).send(participations);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저에 대한 카테고리의 랭크 조회
exports.getRanksByUser = async (req, res, next) => {
  try {
    const { userNo, category4No } = req.params;

    const categoryInfo = await commonQuery.getCategory4(category4No);

    const startDayInWeek = moment()
      .startOf("week")
      .format("YYYY-MM-DD 00:00:00");

    const startDayInMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD 00:00:00");

    const startDayInSeason = moment(categoryInfo.start_time).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const now = moment().format("YYYY-MM-DD HH:mm:ss");

    const rankList = await rank.getChachingRankList({
      category3No: categoryInfo.category_level3_no,
      userType: "dreamer",
    });

    const {
      dreamer_weekOfRankList: prevWeekOfRankList,
      dreamer_monthOfRankList: prevMonthOfRankList,
      dreamer_seasonOfRankList: prevSeasonOfRankList,
    } = rankList;

    const weekOfRankList = await rankQuery.getRankList({
      startDate: startDayInWeek,
      endDate: now,
      category3No: categoryInfo.category_level3_no,
    });

    const monthOfRankList = await rankQuery.getRankList({
      startDate: startDayInMonth,
      endDate: now,
      category3No: categoryInfo.category_level3_no,
    });

    const seasonOfRankList = await rankQuery.getRoundRankList({
      startDate: startDayInSeason,
      endDate: now,
      category4No,
    });

    const Rank = {
      weekRank: rank
        .getFluctutaionInList({
          previousList: prevWeekOfRankList,
          list: weekOfRankList,
          userType: "dreamer",
        })
        .find((rank) => rank.user_no === Number(userNo)),
      monthRank: rank
        .getFluctutaionInList({
          previousList: prevMonthOfRankList,
          list: monthOfRankList,
          userType: "dreamer",
        })
        .find((rank) => rank.user_no === Number(userNo)),
      seasonRank: rank
        .getFluctutaionInList({
          previousList: prevSeasonOfRankList,
          list: seasonOfRankList,
          userType: "dreamer",
        })
        .find((rank) => rank.user_no === Number(userNo)),
    };

    return res.status(200).send({ rank: Rank });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getProducerRanksByUser = async (req, res, next) => {
  try {
    const { userNo, category4No } = req.params;
    const { limit } = req.query;
    // 해당 시즌에서 드리머가 푸쉬를 한번이라도 받았는지 체크
    const exPush = await pushLogQuery.existPushInSeasonByDreamer({
      category4No,
      dreamerNo: userNo,
    });

    // 푸쉬가 존재하지 않으면 리턴
    if (!exPush) {
      return res.status(200).send({ exPush, producerRankList: [] });
    }

    /**
     * 카테고리 정보 조회
     */
    const category = await commonQuery.getCategory4(category4No);

    // 존재하면 프로듀서 랭킹을 수집한다.
    // 로그인 시 다른 드리머의 정보를 보는 것이라면 내 정보까지 가져온다.
    const producerRankList = await rankQuery.getProducerRankListInSeasonByDreamer(
      {
        me:
          req.user && req.user.user_no !== Number(userNo)
            ? req.user.user_no
            : null,
        dreamerNo: userNo,
        category4No,
        limit,
      }
    );

    // 로그인 시 드리머에 대한 나의 랭킹도 구한다.
    let myRank = null;

    if (req.user && req.user.user_no !== Number(userNo)) {
      myRank = producerRankList.find(
        (rank) => rank.USER.user_no === req.user.user_no
      );
    }

    /**
     * 라운드에서 드리머의 순위를 가져온다.
     */
    const dreamerRankInRound = await rankQuery.getRoundRankByDreamer({
      startDate: moment(category.start_time).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(category.end_time).format("YYYY-MM-DD HH:mm:ss"),
      category4No,
      userNo,
    });

    return res.status(200).send({
      exPush,
      total_push: dreamerRankInRound.sum_push || 0,
      producerRankList: producerRankList
        .map((rank) => {
          const result = Object.assign({}, rank);
          delete result.total_push;

          return result;
        })
        .slice(0, limit),
      myRank,
      dreamerRankInRound,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 푸쉬 대상 유저 정보 조회
exports.getTargetUser = async (req, res, next) => {
  try {
    const { targetUserNo, category4No } = req.params;
    const { user_no: userNo } = req.user;

    if (!req.user) {
      throw createHttpError(400, "로그인 후 이용가능합니다.");
    }

    const targetUser = await userQuery.getTargetUser({
      category4No,
      targetUserNo,
      me: userNo,
    });

    // {
    //   user_no: 2,
    //   nickname: '헤롯',
    //   user_photo: 'http://khancomes-bucket001.kr.object.ncloudstorage.com/39e55aad7c0791e390191cd0e24e9fda',
    //   totalPush: 8645000,
    //   myPush: '8400000'
    // }

    return res.status(200).send({ targetUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// 푸쉬 보내기
exports.sendPush = async (req, res, next) => {
  console.log("\n\n 푸쉬 시작 \n\n");
  console.time("push start");
  const { targetUserNo } = req.params;
  let transaction = null;
  try {
    transaction = await sequelize.transaction();
    const { user_no: userNo } = req.user;

    const { push, videoNo, category4No } = req.body;

    // 푸쉬 받는 대상이 푸쉬를 받을 수 있는 상태인지 확인
    const isPush = await userQuery.getIsPushByCategory4No(
      {
        targetNo: targetUserNo,
        category4No,
      },
      { transaction }
    );

    console.log("isPush", isPush);

    // 푸쉬를 받을 수 없는 상태면 리턴
    if (!Boolean(isPush.is_push_user)) {
      throw createHttpError(400, "현재 푸쉬가 불가능한 유저입니다.");
    }

    if (!Boolean(isPush.is_push)) {
      throw createHttpError(400, "현재 푸쉬가 불가능한 경연입니다.");
    }

    if (!Boolean(Math.floor(Number(push) / 1000))) {
      throw createHttpError(400, "후원 가능한 최소 푸시는 1000 이상입니다.");
    }

    if (Number(push) % 1000) {
      throw createHttpError(400, "푸시는 1000 단위로 입력해주세요.");
    }

    // 푸시테이블에 해당 값이 있는지 체크
    const exMyPush = await userQuery.existMyPush(
      {
        category1No: isPush.category_level1_no,
        category2No: isPush.category_level2_no,
        category3No: isPush.category_level3_no,
        me: req.user.user_no,
      },
      { transaction }
    );
    // 존재하지 않으면 생성
    if (!exMyPush) {
      exMyPush;
      await userQuery.createMyPush(
        {
          category1No: isPush.category_level1_no,
          category2No: isPush.category_level2_no,
          category3No: isPush.category_level3_no,
          me: req.user.user_no,
        },
        { transaction }
      );
    }

    // 현재 유저가 가지고 있는 푸쉬량 확인
    const myPush = await userQuery.getMyPush(
      {
        category3No: isPush.category_level3_no,
        me: req.user.user_no,
      },
      { transaction }
    );

    // 보유 PUSH 보다 많은 금액을 PUSH 하면 안돼! - 에러 처리
    if (Number(myPush.have_push + myPush.residual_push) < push) {
      throw createHttpError(
        400,
        "보유 PUSH가 부족합니다. 충전 후 이용해주세요."
      );
    }

    // 한도 푸쉬보다 많은 금액을 푸쉬 할때
    const myPushLimitInToday = await userQuery.getLimitPushInToday(
      { me: req.user.user_no },
      { transaction }
    );

    if (myPushLimitInToday < push) {
      throw createHttpError(400, "당일 푸쉬 한도를 초과하였습니다.");
    }

    const pushLogNo = await pushLogQuery.sendPush(
      {
        targetUserNo,
        me: userNo,
        push,
        myPush,
        categoryLevel1No: isPush.category_level1_no,
        categoryLevel2No: isPush.category_level2_no,
        categoryLevel3No: isPush.category_level3_no,
        categoryLevel4No: isPush.category_level4_no,
        videoNo,
      },
      { transaction }
    );

    // 존재하는 포인트 고유키가 있는지 조회
    let pointNo = await pointQuery.existPointNo(
      {
        producerNo: userNo,
        dreamerNo: targetUserNo,
        categoryLevel1No: isPush.category_level1_no,
        categoryLevel2No: isPush.category_level2_no,
        categoryLevel3No: isPush.category_level3_no,
        categoryLevel4No: isPush.category_level4_no,
      },
      { transaction }
    );

    // 포인트번호가 미존재시 포인트 번호를 생성한다.
    if (!pointNo) {
      pointNo = await pointQuery.createPointNo(
        {
          producerNo: userNo,
          dreamerNo: targetUserNo,
          categoryLevel1No: isPush.category_level1_no,
          categoryLevel2No: isPush.category_level2_no,
          categoryLevel3No: isPush.category_level3_no,
          categoryLevel4No: isPush.category_level4_no,
        },
        { transaction }
      );
    }

    // 포인트 추가
    await pointQuery.addPoint(
      {
        pointNo,
        push,
      },
      { transaction }
    );

    // 로깅
    await pointLogQuery.setLogByPush(
      {
        pointNo,
        fkNo: pushLogNo,
        push,
      },
      { transaction }
    );

    const addPoint = await pointQuery.getAddPoint(
      {
        push,
      },
      { transaction }
    );

    await transaction.commit();

    /**
     * 사용한 푸쉬가 존재하면 총 사용푸쉬 캐시에 추가한다.
     */
    const used_push = push - myPush.residual_push;

    if (used_push > 0) {
      await pushCache.push(used_push);
      adminCommonApi.get("/pushEvent");
    }

    console.timeEnd("push start");
    return res.status(200).send({ addPoint });
  } catch (error) {
    console.timeEnd("push start");
    console.error(error);
    await transaction.rollback();
    next(error);
  }
};

// 후원하기
exports.supportPush = async (req, res, next) => {
  let transaction = null;
  const { targetUserNo } = req.params;
  try {
    transaction = await sequelize.transaction();
    const { user_no: userNo } = req.user;

    const { push, videoNo } = req.body;

    // 푸쉬 받는 대상이 푸쉬를 받을 수 있는 상태인지 확인
    const isPush = await userQuery.getIsPush(
      {
        targetNo: targetUserNo,
      },
      { transaction }
    );

    // 푸쉬를 받을 수 없는 상태면 리턴
    if (!isPush) {
      throw createHttpError(400, "현재 푸쉬가 불가능한 유저입니다.");
    }

    if (!Boolean(Math.floor(push / 1000))) {
      throw createHttpError(400, "후원 가능한 최소 푸시는 1000 이상입니다.");
    }

    if (push % 1000) {
      throw createHttpError(400, "푸시는 1000 단위로 입력해주세요.");
    }

    // 현재 유저가 가지고 있는 푸쉬량 확인
    const myPush = await userQuery.getMyPush(
      {
        category3No: isPush.category_level3_no,
        me: req.user.user_no,
      },
      { transaction }
    );

    // 보유 PUSH 보다 많은 금액을 PUSH 하면 안돼! - 에러 처리
    if (Number(myPush.have_push) < push) {
      throw createHttpError(
        400,
        "보유 PUSH가 부족합니다. 충전 후 이용해주세요."
      );
    }

    // 한도 푸쉬보다 많은 금액을 푸쉬 할때
    const myPushLimitInToday = await userQuery.getLimitPushInToday(
      { me: req.user.user_no },
      { transaction }
    );

    if (myPushLimitInToday < push) {
      throw createHttpError(400, "당일 푸쉬 한도를 초과하였습니다.");
    }

    await pushLogQuery.supportUser(
      { me: userNo, targetUserNo, push, isPush, videoNo },
      {
        transaction,
      }
    );

    await commentQuery.setComment(
      {
        videoNo,
        userNo,
        comment: `${numberWithCommas(push)} PUSH를 후원하였습니다.`,
        isSupport: true,
      },
      { transaction }
    );

    await transaction.commit();

    // /**
    //  * 사용한 푸쉬가 존재하면 총 사용푸쉬 캐시에 추가한다.
    //  */

    // await pushCache.push(push);
    // adminCommonApi.get("/pushEvent");

    return res.status(200).send({ message: "후원에 성공하였습니다." });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// 시즌에 해당하는 나의 푸시 정보 조회
exports.getMyPushInfo = async (req, res, next) => {
  try {
    const { category4No } = req.params;

    const categoryInfo = await commonQuery.getCategory4(category4No);

    // 오늘의 푸시 한도 조회
    const myPushLimitInToday = await userQuery.getLimitPushInToday({
      me: req.user.user_no,
    });

    // 소유한 푸쉬 조회
    const myPush = await userQuery.getMyPush({
      category3No: categoryInfo.category_level3_no,
      me: req.user.user_no,
    });

    return res.status(200).send({
      myPushLimitInToday,
      myPush,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// PUSH 결과 조회
exports.getPushResult = async (req, res, next) => {
  try {
    const { targetUserNo } = req.params;
    const { categoryLevel4No } = req.query;

    console.log("getPushResult");

    const categoryInfo = await commonQuery.getCategory4(categoryLevel4No);

    // 드리머에 대한 내정보 가져오기
    const myProducerInfoByDreamer = await userQuery.getMyProducerInfoByDreamer({
      me: req.user.user_no,
      category4No: categoryInfo.category_level4_no,
      dreamerNo: targetUserNo,
    });

    console.log("getPushResult", categoryInfo, myProducerInfoByDreamer);

    return res.status(200).send({ myProducerInfoByDreamer });
  } catch (error) {
    next(error);
  }
};

// 내 PUSH 요약 정보 조회
exports.getMyPushSummary = async (req, res, next) => {
  try {
    // 잔여 푸시 리스트 조회
    const residualPushList = await userQuery.getResidualPushList({
      userNo: req.user.user_no,
    });

    return res.status(200).send({
      have_push: req.user.have_push || 0,
      residualPushList,
    });
  } catch (error) {
    next(error);
  }
};

// 내 비디오 리스트 조회
exports.getMyVideoList = async (req, res, next) => {
  try {
    const { limit, category3No } = req.query;

    const list = await videoQuery.getMyVideoList({
      me: req.user.user_no,
      category3No,
      limit,
    });

    return res.status(200).send({
      list,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyPush = async (req, res, next) => {
  try {
    // 오늘의 푸시 한도 조회
    const myPushLimitInToday = await userQuery.getLimitPushInToday({
      me: req.user && req.user.user_no,
    });

    return res.status(200).send({
      myPushLimitInToday,
      have_push: req.user && req.user.have_push,
    });
  } catch (error) {
    next(error);
  }
};

// 오픈 중인 나의 모든 푸쉬 조회
exports.getMyPushByOpenCategory = async (req, res, next) => {
  try {
    const myDreamers = await commonQuery.getDreamersByProducerNo({
      producerNo: req.user.user_no,
    });

    // 카테고리별 정리
    let myPushs = await Promise.all(
      /**
       * 카테고리 4의 중복값을 제거한 값을 가져온다.
       * ex) [{..., category_level4_no : 1, ...},
       *      {..., category_level4_no : 2, ...} ,
       *      {..., category_level4_no : 1, ...},
       *      {..., category_level4_no : 3, ...} ,
       *      {..., category_level4_no : 2, ...} ,]
       * return => [1, 2, 3]
       */
      Array.from(
        new Set(myDreamers.map((dreamer) => dreamer.category_level4_no))
      ).map(
        /**
         * 카테고리 값에 다시 원래의 정보를 넣어준다.
         * 단, dreamer_no는 제거한다.
         * ex) [1, 2, 3]
         * return => [{..., category_level4_no : 1, ...},
         *            {..., category_level4_no : 2, ...},
         *            {..., category_level4_no : 3, ...}]
         */
        async (category4No) => {
          const category = Object.assign(
            {},
            myDreamers.find(
              (dreamer) => dreamer.category_level4_no === category4No
            )
          );

          delete category.dreamer_no;

          /**
           * 드리머에 대한 랭킹 정보를 가져온다.
           */
          const dreamers = myDreamers
            .filter(
              (dreamer) =>
                dreamer.category_level4_no === category.category_level4_no
            )
            .map((v) => v.dreamer_no);
          category.dreamers = await rankQuery.getRoundRankListByDreamerList({
            startDate: moment(category.CATEGORY_LEVEL4.start_time).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            endDate: moment(category.CATEGORY_LEVEL4.end_time).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            dreamers,
            category4No: category.category_level4_no,
          });

          /**
           * 드리머에 대한 나의 푸시 정보를 가져온다.
           */
          category.dreamers = await Promise.all(
            category.dreamers.map(async (dreamer) => ({
              ...dreamer,
              myPushInfo: await rankQuery.getMyProducerRankInSeasonByDreamer({
                me: req.user.user_no,
                dreamerNo: dreamer.user_no,
                category4No: category.category_level4_no,
              }),
            }))
          );

          return category;
        }
      )
    );

    return res.status(200).send({
      myPushs,
    });
  } catch (error) {
    next(error);
  }
};

// 카테고리별 내가 받은 푸쉬 조회
exports.getMyReceivePushByCategory3No = async (req, res, next) => {
  try {
    const { category3No, userNo } = req.params;

    /**
     * 시즌에 해당하는 현재까지 진행된 모든 라운드 조회
     */
    const rounds = await commonQuery.getRoundByCategory3No(category3No);

    /**
     * 현재 오픈된 시즌의 라운드 정보 조회
     */
    const round = await commonQuery.getOpenRound({ category3No });

    const pushInfoThisRound = await userQuery.getMyReceivePushInRoundByAllCondition(
      {
        category4No: round.category_level4_no,
        startTodayTime: moment().format("YYYY-MM-DD 00:00:00"),
        startWeekTime: moment().startOf("week").format("YYYY-MM-DD 00:00:00"),
        startMonthTime: moment().startOf("month").format("YYYY-MM-DD 00:00:00"),
        startSeasonTime: moment(round.start_time).format("YYYY-MM-DD 00:00:00"),
        userNo,
      }
    );

    console.log("pushInfoThisRound", pushInfoThisRound);

    /**
     * 해당 시즌의 받은 푸쉬 내역 조회
     */
    const receivePushList = await Promise.all(
      rounds.map(async (round) => {
        let weeks = [];

        /**
         * 각 라운드별 모든 주차 구하기
         */

        for (
          let startMillisecond = moment(round.start_time)
              .startOf("week")
              .valueOf(),
            endMillisecond = Math.min(
              moment(round.end_time).startOf("week").valueOf(),
              moment().startOf("week").valueOf()
            );
          startMillisecond <= endMillisecond; // 일주일의 밀리세컨드 추가
          startMillisecond = moment(startMillisecond)
            .add(1, "week")
            .startOf("week")
            .valueOf()
        ) {
          const { year, month, weekNo } = getWeekOfMonth(
            new Date(moment(startMillisecond).format("YYYY-MM-DD HH:mm:ss"))
          );

          // weekNo : 해당 월의 주차, week : 해당 년의 주차
          weeks.push({
            year,
            month,
            weekNo,
            week: moment(startMillisecond).week(),
          });
        }

        /**
         * 각 라운드별 각 주차의 정보를 조회
         */
        weeks = await Promise.all(
          weeks.map(async (date) => {
            const startTime = moment()
              .year(date.year)
              .week(date.week)
              .startOf("week")
              .format("YYYY-MM-DD 00:00:00");
            const sum_push = await userQuery.getMyReceivePushInRound({
              category4No: round.category_level4_no,
              userNo,
              startTime,
              endTime: moment()
                .year(date.year)
                .week(date.week)
                .endOf("week")
                .add("day", 1)
                .format("YYYY-MM-DD 00:00:00"),
            });

            return { ...date, ...sum_push };
          })
        );

        return {
          ordinalNumber: round.ordinalNumber,
          category_level1_no: round.category_level1_no,
          category_level2_no: round.category_level2_no,
          category_level3_no: round.category_level3_no,
          category_level4_no: round.category_level4_no,
          start_time: round.start_time,
          end_time: round.end_time,

          /**
           * 각 라운드별 각 주차의 정보를 월별로 조합
           */
          receivePushListInRound: weeks
            .reduce((prev, data) => {
              const index = prev.findIndex(
                (v) => v.year === data.year && v.month === data.month
              );

              if (index === -1) {
                prev.push({
                  start_time: moment()
                    .year(data.year)
                    .week(data.week)
                    .startOf("week")
                    .format("YYYY-MM-DD HH:mm:ss"),
                  end_time: moment()
                    .year(data.year)
                    .week(data.week)
                    .endOf("week")
                    .add("day", 1)
                    .format("YYYY-MM-DD HH:mm:ss"),
                  year: data.year,
                  month: data.month,
                  totalPush: data.sum_push,
                  weeks: [data],
                });
                return prev;
              }

              prev[index].totalPush += data.sum_push;
              prev[index].weeks = prev[index].weeks
                .concat(data)
                .sort(
                  (a, b) => +new Date(b.start_time) - +new Date(a.start_time)
                );

              return prev;
            }, [])
            .sort((a, b) => +new Date(b.start_time) - +new Date(a.start_time)),
        };
      })
    );

    return res.status(200).send({
      pushInfoThisRound,
      receivePushList: receivePushList.sort(
        (a, b) => b.ordinalNumber - a.ordinalNumber
      ),
    });
  } catch (error) {
    next(error);
  }
};

// 유저의 수상 내역 조회
exports.getUserAwards = async (req, res, next) => {
  const { userNo } = req.params;
  try {
    /**
     * 유저가 참여한 카테고리 조회
     */
    const participateCategories = await userQuery.getParticipateCategory({
      userNo,
    });

    /**
     * 주간 월간 랭킹 조회
     */
    const awardList = await Promise.all(
      participateCategories.map(async (category) => {
        let weeks = [];
        let months = [];
        let result = [];

        weeks = await getRankList({ dateGubun: "week", list: weeks, category });
        months = await getRankList({
          dateGubun: "month",
          list: months,
          category,
        });

        /**
         * 정렬 알고리즘
         * 시간순으로 표시한다.
         * date gubun이 month일때가 우선순위가 높게 표시한다.
         */
        result = result.concat(weeks, months).sort((a, b) => {
          if (moment(b.rank.date).valueOf() > moment(a.rank.date).valueOf()) {
            return 1;
          }
          if (moment(b.rank.date).valueOf() < moment(a.rank.date).valueOf()) {
            return -1;
          }
          if (moment(b.rank.date).valueOf() === moment(a.rank.date).valueOf()) {
            if (b.rank.gubun === "month" && a.rank.gubun === "week") {
              return 1;
            }
            if (b.rank.gubun === "week" && a.rank.gubun === "month") {
              return -1;
            }
            return 0;
          }
        });

        return {
          ...category,
          awardList: result,
        };
      })
    );

    return res.status(200).send({
      awardList: awardList.filter(
        (item) => item.awardList && item.awardList.length
      ),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }

  /**
   * 호이스팅
   */

  async function getRankList({ dateGubun, list, category }) {
    for (
      let startMillisecond = moment(category.CATEGORY_LEVEL3.start_time)
          .endOf(dateGubun)
          .valueOf(),
        endMillisecond = Math.min(
          moment(category.CATEGORY_LEVEL3.end_time).endOf(dateGubun).valueOf(),
          moment().endOf(dateGubun).valueOf()
        );
      // 종료일 제외
      startMillisecond < endMillisecond;
      startMillisecond = moment(startMillisecond)
        .add(1, dateGubun)
        .endOf(dateGubun)
        .valueOf() // dateGubun 만큼의 밀리 세컨드 추가
    ) {
      pushList({ time: startMillisecond, list, dateGubun });
    }

    // 이 카테고리가 이미 지났으면 종료일도 추가시켜주기!
    if (
      moment(category.CATEGORY_LEVEL3.end_time).valueOf() <= moment().valueOf()
    ) {
      pushList({ time: category.CATEGORY_LEVEL3.end_time, list, dateGubun });
    }

    // 주별 랭킹 조회
    const dateGubunRanks = await rankQuery.getUserRankBycategory3NoAndCondition(
      {
        gubun: dateGubun,
        category3No: category.category_level3_no,
        userNo,
        dates: list.map((item) => item.date),
      }
    );

    /**
     * 주간 랭킹 데이터를 주차에 넣어준다.
     * 그 후 주간 랭킹이 없는 주차들은 필터링을 거쳐준다.
     */
    return list
      .map((item) => {
        const rank = dateGubunRanks.find(
          (rank) => moment(rank.date).valueOf() === moment(item.date).valueOf()
        );

        const result = Object.assign({}, item, rank ? { rank } : {});

        return result;
      })
      .filter((item) => item.rank);
  }

  // 배열에 추가하는 함수
  function pushList({ time, list, dateGubun }) {
    let year, month, weekNo;

    if (dateGubun === "week") {
      const date = getWeekOfMonth(
        new Date(moment(time).format("YYYY-MM-DD HH:mm:ss"))
      );

      year = date.year;
      month = date.month;
      weekNo = date.weekNo;
    } else {
      year = moment(time).year();
      month = moment(time).month() + 1;
      weekNo = moment(time).week();
    }

    // weekNo : 해당 월의 주차, week : 해당 년의 주차
    list.push({
      year,
      month,
      weekNo,
      week: moment(time).week(),
      date: moment(time).format("YYYY-MM-DD 00:00:00"),
    });
  }
};

/**
 * 나의 포인트 조회
 */
exports.getMyPoint = async (req, res, next) => {
  try {
    const pointList = await userQuery.getMyPoint({
      me: req.user && req.user.user_no,
    });

    // 포인트리스트가 존재하지 않으면 종료
    if (!pointList.length) {
      return res.status(200).send({ seasonList: [] });
    }

    /**
     * 캐싱된 랭크를 조회하기 위해서 중복을 제거한 시즌값을 가져온다.
     */
    let seasonList = Array.from(
      new Set(pointList.map((category) => category.category_level3_no))
    );

    /**랭킹 조회 */
    const rankList = await Promise.all(
      seasonList.map((season) =>
        rank.getChachingRankListByType({
          category3No: season,
          userType: "dreamer",
          type: "season",
        })
      )
    );

    /**
     * 시즌 리스트 가공
     */
    seasonList = seasonList.map((season, index) => {
      // 시즌 정보 조회
      const seasonInfo = pointList.find(
        (item) => item.category_level3_no === season
      );

      // 내가 푸쉬한 해당 시즌의 드리머 리스트
      const tempDreamerList = pointList.filter(
        (item) => item.category_level3_no === season
      );

      return {
        category_level1_no: seasonInfo.category_level1_no,
        category_level3_no: seasonInfo.category_level3_no,
        category_level3_no: seasonInfo.category_level3_no,
        category_level4_no: seasonInfo.category_level4_no,
        producer_no: seasonInfo.producer_no,
        CATEGORY_LEVEL2: seasonInfo.CATEGORY_LEVEL2,
        CATEGORY_LEVEL3: seasonInfo.CATEGORY_LEVEL3,
        CATEGORY_LEVEL4: seasonInfo.CATEGORY_LEVEL4,
        dreamerList: tempDreamerList.map((item) => ({
          ...item.DREAMER,
          point: item.point,
          rank: rankList[index].find(
            (rank) => rank.user_no === item.DREAMER.user_no
          ),
        })),
      };
    });

    return res.status(200).send({ seasonList });
  } catch (error) {
    next(error);
  }
};

/**
 * 나의 후원 정보 조회
 */
exports.getMySupport = async (req, res, next) => {
  try {
    let support = {};

    // 받은 후원
    support.receive_push = req.user.receive_push;

    // 후원 받은 현황
    const supportList = await userQuery.getMySupport({
      me: req.user && req.user.user_no,
    });

    support.supportList = supportList;

    return res.status(200).send(support);
  } catch (error) {
    next(error);
  }
};

/**
 * 내가 현재 참여하는 시즌 정보 조회
 */
exports.getMyParticipateSeason = async (req, res, next) => {
  try {
    const existMyParticipateSeason = await userQuery.getMyParticipateSeason({
      me: req.user && req.user.user_no,
    });

    console.log(existMyParticipateSeason);

    // if (
    //   !existMyParticipateSeason ||
    //   (existMyParticipateSeason && !existMyParticipateSeason.length)
    // ) {
    //   throw createHttpError(400, "참여한 경연이 없습니다.");
    // }

    return res
      .status(200)
      .send({ myParticipateSeason: existMyParticipateSeason });
  } catch (error) {
    next(error);
  }
};

exports.getMyParticipateSeasonByCategory4No = async (req, res, next) => {
  const { category4No } = req.params;

  try {
    const existMyParticipateSeason = await userQuery.getMyParticipateSeasonByCategory4No(
      {
        me: req.user && req.user.user_no,
        category4No,
      }
    );

    console.log(existMyParticipateSeason);

    if (!existMyParticipateSeason) {
      throw createHttpError(400, "참여한 시즌이 없습니다.");
    }

    return res
      .status(200)
      .send({ myParticipateSeason: existMyParticipateSeason });
  } catch (error) {
    next(error);
  }
};

/**
 * 닉네임 로그 체크
 */

exports.checkChangeNicknameLog = async (req, res, next) => {
  try {
    const isEmptyLogInFifteenDays = await userQuery.checkChangeNicknameLog({
      userNo: req.user.user_no,
    });

    // 15일 이내 변경된 로그 존재시
    if (!isEmptyLogInFifteenDays) {
      return res.status(400).send({
        message: "15일 이내에 닉네임을 변경한 이력이 있어 변경이 불가능합니다.",
        e: 2,
      });
    }

    return res.status(200).send({
      isEmptyLogInFifteenDays,
    });
  } catch (error) {
    next(error);
  }
};

// 유저의 개별차트 정보 조회
exports.getChartTypeByUserNo = async (req, res, next) => {
  const { userNo, type } = req.params;
  const { period, category3No, category4No } = req.query;

  try {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    // 오늘 + 29일간의 데이터를 리턴한다. -> 총 30일
    const startDate = moment()
      .subtract(29, "day")
      .format("YYYY-MM-DD 00:00:00");

    let data = null;

    if (type === "score") {
      data = await userQuery.getScoreChartData({
        userNo,
        category3No,
        startDate,
        now,
      });
    } else if (type === "rank") {
      data = await userQuery.getRankChartData({
        userNo,
        period,
        startDate,
        now,
        category3No,
        category4No,
      });
    } else if (type === "push") {
      data = await userQuery.getPushChartData({
        userNo,
        startDate,
        now,
        category3No,
      });
    } else if (type === "fan") {
      data = await userQuery.getFanChartData({ userNo });
    } else if (type === "videoView") {
      data = await userQuery.getVideoViewChartData({
        userNo,
        startDate,
        now,
        category3No,
      });
    } else if (type === "videoLike") {
      data = await userQuery.getVideoLikeChartData({
        userNo,
        startDate,
        now,
        category3No,
      });
    } else if (type === "videoFollow") {
      data = await userQuery.getUserFollowData({
        userNo,
        startDate,
        now,
        category3No,
      });
    }

    return res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};
