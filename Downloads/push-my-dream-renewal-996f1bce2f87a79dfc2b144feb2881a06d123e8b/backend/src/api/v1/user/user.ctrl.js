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

const token = require("shared/token");
const { deleteFile } = require("libs/videoFile");

const { profile } = require("middlewares/upload");

const activeLogQuery = Container.get(ActiveLogQuery);
const contestLogQuery = Container.get(ContestLogQuery);
const commentQuery = Container.get(CommentQuery);
const flagLogQuery = Container.get(FlagLogQuery);
const userQuery = Container.get(UserQuery);
const videoQuery = Container.get(VideoQuery);

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
    env === "production"
      ? {
          httpOnly: true,
          secure: true,
          domain: ".khanteum.com",
          maxAge: 0,
        }
      : {
          httpOnly: true,
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
      env === "production"
        ? {
            httpOnly: true,
            secure: true,
            domain: ".khanteum.com",
            maxAge: 1000 * 60 * 60 * 2,
          }
        : {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
          };

    const refreshCondition =
      env === "production"
        ? {
            httpOnly: true,
            secure: true,
            domain: ".khanteum.com",
            maxAge: 1000 * 60 * 60 * 365 * 14,
          }
        : {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 365 * 14,
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
    });

    return res.status(200).send(userInfo);
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
    } = req.body;
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
      });
      return res.status(200).send(result);
    } else {
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
      });
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
      return res.status(400).send({ message: "이미 가입된 닉네임입니다." });
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
      // 파일 미존재시
      // if (!req.file) {
      // }

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
      { targetNo, userNo: req.user.user_no },
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
      { targetNo, userNo: req.user.user_no },
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

      // 유저가 업로드한 비디오의 댓글 조회
      // 위 로직에서 유저가 작성한 댓글을 제거했기 때문에 유저가 업로한 비디오의 다른유저들의 댓글들만 가져온다.
      const commentListByVideoList = await commentQuery.getAllCommentByVideoList(
        { videoList: videoNoList },
        { transaction }
      );

      console.log(commentList, commentListByVideoList);

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
      env === "production"
        ? {
            httpOnly: true,
            secure: true,
            domain: ".khanteum.com",
            maxAge: 0,
          }
        : {
            httpOnly: true,

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
