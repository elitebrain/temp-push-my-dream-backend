const moment = require("moment");
const axios = require("axios");
const qs = require("querystring");
const uuidv4 = require("uuid/v4");
const { Container } = require("typedi");
const bcrypt = require("bcryptjs");
const createHttpError = require("http-errors");

const { sequelize } = require("config/sequelize.config");

const UserQuery = require("queries/UserQuery");
const ContestLogQuery = require("queries/ContestLogQuery");
const RankingQuery = require("queries/RankingQuery");
const PushLogQuery = require("queries/PushLogQuery");
const CommonQuery = require("queries/CommonQuery");
const PointQuery = require("queries/PointQuery");
const PointLogQuery = require("queries/PointLogQuery");

const token = require("shared/token");
const { profile } = require("middlewares/upload");

const userQuery = Container.get(UserQuery);
const contestLogQuery = Container.get(ContestLogQuery);
const rankingQuery = Container.get(RankingQuery);
const pushLogQuery = Container.get(PushLogQuery);
const commonQuery = Container.get(CommonQuery);
const pointQuery = Container.get(PointQuery);
const pointLogQuery = Container.get(PointLogQuery);

const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.SERVER_URL}:4000/api/v2/user`
    : process.env.NODE_ENV === "test"
    ? `${process.env.SERVER_URL_TEST}:4000/api/v2/user`
    : `${process.env.SERVER_URL_DEV}:14000/api/v2/user`;

const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? process.env.MOBILE_CALLBACK_URL
    : process.env.NODE_ENV === "test"
    ? `${process.env.MOBILE_CALLBACK_URL_TEST}`
    : process.env.MOBILE_CALLBACK_URL_DEV;

// 참조 https://developers.kakao.com/docs/restapi/user-management#%EB%A1%9C%EA%B7%B8%EC%9D%B8
// 소셜 로그인
exports.socialLogin = async (req, res, next) => {
  try {
    const { type, signup: _signup } = req.query;
    const signup = _signup === "true";

    if (signup) {
      if (req.session.signup) {
        req.session.signup.isSignup = true;
        req.session.signup.isLogin = false;
        req.session.signup.login = null;
      }
    } else {
      req.session.signup = null;
    }

    const { KAKAO_REST_API_KEY, NAVER_LOGIN_CLIENT_ID } = process.env;

    if (type === "kakao") {
      const callbackUrl = encodeURI(`${SERVER_URL}/mobile/kakao/callback`);

      return res.redirect(
        `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${callbackUrl}&response_type=code`
      );
    } else if (type === "naver") {
      const randomState = uuidv4();
      const callbackUrl = SERVER_URL + `/mobile/naver/callback`;

      return res.redirect(
        `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_LOGIN_CLIENT_ID}&redirect_uri=${encodeURI(
          callbackUrl
        )}&state=${randomState}`
      );
    }

    return res.status(400).send({
      message: "please social login",
    });
  } catch (error) {
    next(error);
  }
};

// 로컬 로그인
exports.localLogin = async (req, res, next) => {
  const { id, loginType, email, password } = req.body;

  try {
    let user = await userQuery.getLoaclLoginUser({ email, loginType });

    if (!user) {
      return res
        .status(400)
        .send({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
    }

    const passwordCheck = await bcrypt.compare(password, user.local_password);

    if (!passwordCheck) {
      return res
        .status(400)
        .send({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
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
            maxAge: 1000 * 60 * 60 * 365 * 14,
          }
        : {
            httpOnly: true,
            secure: true,
            domain: ".khanteum.com",
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

/** 로그인
 * e = 1 => 아이디 비밀번호 일치 x
 * e = 2 => 존재하지 않는 아이디
 * e = 3 => 네이버 오류
 */
exports.login = async (req, res, next) => {
  try {
    const { id, type } = req.loginData;

    const user = await userQuery.getLoginUser({ id, loginType: type });
    if (!user) {
      return res.redirect(`${CALLBACK_URL}/login?e=2`);
    }

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

    return res.redirect(CALLBACK_URL);
  } catch (error) {
    next(error);
  }
};

// 네이버 콜백
exports.naverCallback = async (req, res, next) => {
  try {
    const { code, state, error, error_description } = req.query;

    if (error) {
      return res.redirect(`${CALLBACK_URL}/login?e=3`);
    }

    const { NAVER_LOGIN_CLIENT_ID, NAVER_LOGIN_CLIENT_SECRET } = process.env;

    const {
      data: { access_token, refresh_token },
    } = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_LOGIN_CLIENT_ID}&client_secret=${NAVER_LOGIN_CLIENT_SECRET}&code=${code}&state=${state}`
    );

    const {
      data: {
        response: { id, email },
      },
    } = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // 회원가입일시
    if (req.session.signup && req.session.signup.isSignup) {
      const exUser = await userQuery.getLoginUser({ id, loginType: "naver" });

      // 존재시 에러메세지 출력
      /**
       * e = 1 => 이미 가입된 정보입니다.
       */
      if (exUser) {
        return res.redirect(`${CALLBACK_URL}/signup/login?e=1`);
      }

      req.session.signup.isLogin = true;
      req.session.signup.login = {
        id,
        email,
        type: "naver",
      };

      return res.redirect(`${CALLBACK_URL}/signup/identityCertificate`);
    }

    req.loginData = {
      id,
      email,
      type: "naver",
    };
    next();
  } catch (error) {
    next(error);
  }
};

// 카카오 콜백
exports.kakaoCallback = async (req, res, next) => {
  try {
    const { code } = req.query;

    const { KAKAO_REST_API_KEY } = process.env;

    const requestBody = {
      grant_type: "authorization_code",
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: `${SERVER_URL}/mobile/kakao/callback`,
      code,
    };

    const {
      data: { access_token, refresh_token },
    } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify(requestBody),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const {
      data: {
        id,
        kakao_account: { email },
      },
    } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // 회원가입일시
    if (req.session.signup && req.session.signup.isSignup) {
      const exUser = await userQuery.getLoginUser({
        id,
        loginType: "kakao",
      });

      // 존재시 에러메세지 출력
      /**
       * e = 1 => 이미 가입된 정보입니다.
       */
      if (exUser) {
        return res.redirect(`${CALLBACK_URL}/signup/login?e=1`);
      }
      req.session.signup.isLogin = true;
      req.session.signup.login = {
        id,
        email,
        type: "kakao",
      };

      return res.redirect(`${CALLBACK_URL}/signup/identityCertificate`);
    }

    req.loginData = {
      id,
      type: "kakao",
    };
    next();
  } catch (error) {
    next(error);
  }
};

// 가입된 로컬 아이디인지 체크
exports.localCheck = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const check = await userQuery.checkLocalLogin(email);

    if (check.isUniqueEmail) {
      return res.status(400).send({ message: "이미 가입된 이메일입니다." });
    }

    if (req.session.signup) {
      req.session.signup.isLogin = true;
      req.session.signup.login = {
        id: email,
        email,
        password,
        type: "local",
      };
    }

    return res.status(200).send({ message: "this email is available" });
  } catch (error) {
    next(error);
  }
};

// 약관 체크
exports.checkTerms = async (req, res, next) => {
  try {
    req.session.signup = {
      isSignup: true,
    };
    return res.status(200).send({ message: "signup session init" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 약관 세션 체크
exports.sessionTerms = async (req, res, next) => {
  try {
    if (req.session.signup && req.session.signup.isSignup) {
      req.session.signup.isTerms = true;
    }
    return res.status(200).send({ message: "signup add session terms" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 로그인 세션 체크
exports.checkLogin = async (req, res, next) => {
  try {
    if (!req.session.signup || !req.session.signup.isTerms) {
      return res
        .status(400)
        .send({ message: "don't exist session", redirectPage: "terms" });
    }

    req.session.signup.isLogin = false;
    req.session.signup.login = null;

    return res.status(200).send({ message: "signup session login init" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 나이스 세션 체크
exports.checkIdentityCertificate = async (req, res, next) => {
  try {
    if (!req.session.signup || !req.session.signup.isTerms) {
      return res
        .status(400)
        .send({ message: "don't exist session", redirectPage: "terms" });
    }

    if (!req.session.signup.isLogin) {
      return res
        .status(400)
        .send({ message: "don't exist session", redirectPage: "login" });
    }

    // 인증을 하고 리다이렉트 했을 시
    if (
      req.session.checkplus &&
      req.session.checkplus.data &&
      req.session.checkplus.data.status === "success"
    ) {
      const {
        dupinfo,
        name,
        gender,
        nationalinfo,
        birthdate,
        mobileno,
      } = req.session.signup.checkplus;

      const check = await userQuery.getUserByDi(dupinfo);

      if (check) {
        req.session.signup.checkplus = null;
        req.session.signup.isCheckIdentityCertificate = false;
        req.session.checkplus = null;
        return res.status(400).send({
          isExist: true,
        });
      }

      // checkplus 데이터 초기화
      req.session.checkplus = null;

      return res.status(200).send({
        message: "get session checkIdentity certificate data",
        checkplus: {
          name,
          gender,
          country: nationalinfo,
          birthdate,
          phoneFirst: mobileno.slice(0, 3),
          phoneSecond: mobileno.slice(3),
        },
      });
    }
    // 처음 접속시
    else {
      req.session.signup.isCheckIdentityCertificate = false;
      req.session.signup.checkplus = {};
    }

    return res
      .status(200)
      .send({ message: "signup session checkIdentity certificate init" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.checkProfile = async (req, res, next) => {
  try {
    if (!req.session.signup || !req.session.signup.isTerms) {
      return res
        .status(400)
        .send({ message: "don't exist session", redirectPage: "terms" });
    }

    if (!req.session.signup.isLogin) {
      return res
        .status(400)
        .send({ message: "don't exist session", redirectPage: "login" });
    }

    if (!req.session.signup.isCheckIdentityCertificate) {
      return res.status(400).send({
        message: "don't exist session",
        redirectPage: "identityCertificate",
      });
    }

    return res
      .status(200)
      .send({ message: "signup session checkIdentity certificate init" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 회원가입
exports.signUp = async (req, res, next) => {
  try {
    profile.signUpMobile(req, res, async function (err) {
      if (err) {
        return res.status(err.code || 500).send({
          sessionError: err.sessionError,
          message: err.message,
        });
      }
      let result = null;
      let file = req.file || null;

      // 파일이 존재하면 이미 회원정보는 입력되었기 때문에 몇가지 사항만 수정한다.
      if (file) {
        const { mobileno } = req.session.signup.checkplus;

        const { nickname } = req.body;

        await userQuery.modifyUser(
          req.user_no,
          `${mobileno.slice(0, 3)}-${mobileno
            .slice(3)
            .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
          nickname,
          req.file.location
        );

        const user = await userQuery.getUser({ userNo: req.user_no });
        req.session.signup.isProfile = true;
        req.session.signup.profile = user;

        return res.status(200).send({ result, message: "signup Success" });
      } else {
        const {
          isSignup,
          isTerms,
          isLogin,
          isCheckIdentityCertificate,
        } = req.session.signup;

        if (!isSignup || !isTerms || !isLogin || !isCheckIdentityCertificate) {
          return res
            .status(400)
            .send({ sessionError: true, message: "세션이 만료되었습니다." });
        }

        const { email, id, type, password } = req.session.signup.login;
        const {
          dupinfo,
          mobileno,
          birthdate,
          name,
          gender,
          nationalinfo: country,
        } = req.session.signup.checkplus;

        const { nickname } = req.body;

        const check = await userQuery.checkUnique({
          di: dupinfo,
          email,
          phone: `${mobileno.slice(0, 3)}-${mobileno
            .slice(3)
            .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
          nickname,
          loginType: type,
          id,
        });

        // 중복된 값이 존재시
        if (check) {
          if (check.di === dupinfo) {
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

        if (type === "local") {
          const hash = await bcrypt.hash(password, 12);

          result = await userQuery.setLocalUser({
            userName: name,
            di: dupinfo,
            email,
            gender,
            country,
            birthdate,
            phone: `${mobileno.slice(0, 3)}-${mobileno
              .slice(3)
              .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
            nickname,
            termsApplyTime: new Date(),
            hash,
            file,
          });
        } else {
          result = await userQuery.setUser({
            userName: name,
            di: dupinfo,
            email,
            gender,
            country,
            birthdate,
            phone: `${mobileno.slice(0, 3)}-${mobileno
              .slice(3)
              .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
            nickname,
            termsApplyTime: new Date(),
            loginType: type,
            id,
            file,
          });
        }

        const user = await userQuery.getUser({ userNo: result[0] });
        req.session.signup.isProfile = true;
        req.session.signup.profile = user;
        return res.status(200).send({ result, message: "signup Success" });
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.checkSignUp = (req, res, next) => {
  try {
    if (!req.session.signup || !req.session.signup.isTerms) {
      return res
        .status(400)
        .send({ message: "don't exist session", redirectPage: "terms" });
    }

    if (!req.session.signup.isLogin) {
      return res
        .status(400)
        .send({ message: "don't exist session", redirectPage: "login" });
    }

    if (!req.session.signup.isCheckIdentityCertificate) {
      return res.status(400).send({
        message: "don't exist session",
        redirectPage: "identityCertificate",
      });
    }

    if (!req.session.signup.isProfile) {
      return res.status(400).send({
        message: "don't exist session",
        redirectPage: "profile",
      });
    }

    const {
      user_name: name,
      nickname,
      phone,
      user_photo: avatar,
    } = req.session.signup.profile;
    req.session.signup = null;

    return res.status(200).send({
      user: { avatar, name, nickname, phone },
      message: "signup session checkIdentity certificate init",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//
exports.checkFindId = async (req, res) => {
  try {
    if (
      req.session.checkplus &&
      req.session.checkplus.type === "findId" &&
      req.session.findId &&
      req.session.findId.isCheckIdentityCertificate &&
      req.session.findId.checkplus &&
      req.session.findId.checkplus.status === "success"
    ) {
      const exUser = await userQuery.getUserByDi(
        req.session.findId.checkplus.dupinfo
      );

      // 사용한 세션 초기화
      req.session.checkplus = {};
      req.session.findId = {};

      // 유저 미존재시
      if (!exUser) {
        return res.status(200).send({
          message: "find-id session checkIdentity certificate init",
          isCheckPlusSuccess: true,
          isExistUser: false,
        });
      }

      const { email, kakao_id, google_id, naver_id, local_id } = exUser;

      return res.status(200).send({
        message: "find-id session checkIdentity certificate init",
        isCheckPlusSuccess: true,
        isExistUser: true,
        email,
        loginType: kakao_id
          ? "kakao"
          : google_id
          ? "google"
          : naver_id
          ? "naver"
          : local_id
          ? "local"
          : null,
      });
    }
    // console.log(req.session);

    // 사용한 세션 초기화
    req.session.checkplus = {};
    req.session.findId = {};

    return res.status(200).send({
      message: "find-id session checkIdentity certificate init",
      isCheckPlusSuccess: false,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.checkFindPassword = (req, res, next) => {
  try {
    if (
      req.session.checkplus &&
      req.session.checkplus.type === "findPassword" &&
      req.session.findPassword &&
      req.session.findPassword.isCheckIdentityCertificate
    ) {
      const { localId } = req.session.findPassword;

      // 사용한 세션 초기화
      req.session.checkplus = {};
      req.session.findPassword = {};

      return res.status(200).send({
        message: "find-password session checkIdentity certificate init",
        isCheckPlusSuccess: true,
        localId,
      });
    }

    return res.status(200).send({
      message: "find-password session checkIdentity certificate init",
      isCheckPlusSuccess: false,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.checkEditPhone = (req, res, next) => {
  try {
    if (
      req.session.checkplus &&
      req.session.checkplus.type === "editPhone" &&
      req.session.editPhone &&
      req.session.editPhone.isCheckIdentityCertificate
    ) {
      const { phone } = req.session.editPhone;

      // 사용한 세션 초기화
      req.session.checkplus = {};
      req.session.editPhone = {};

      return res.status(200).send({
        message: "edit-phone session checkIdentity certificate init",
        editPhone: phone,
      });
    }

    return res.status(200).send({
      message: "edit-phone session checkIdentity certificate init",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// 푸쉬 대상 유저 정보 조회
exports.getTargetUser = async (req, res, next) => {
  try {
    const { user_no: userNo } = req.user;
    const { targetUserNo } = req.query;
    const targetUser = await userQuery.getTargetUser({ targetUserNo, userNo });
    return res.status(200).send(targetUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// 푸쉬 보내기
exports.sendPush = async (req, res, next) => {
  let transaction = null;
  try {
    transaction = await sequelize.transaction();
    const { user_no: userNo, have_push } = req.user;

    const {
      targetUserNo,
      push,
      categoryLevel1No,
      categoryLevel2No,
      categoryLevel3No,
      categoryLevel4No,
    } = req.body;

    // 보유 PUSH 보다 많은 금액을 PUSH 하면 안돼! - 에러 처리
    if (have_push < push) {
      throw createHttpError(
        400,
        "보유 PUSH가 부족합니다. 충전 후 이용해주세요."
      );
    }

    // 한도 푸쉬보다 많은 금액을 푸쉬 할때
    const myPushLimitToday = await userQuery.getLimitPushInToday(
      { userNo },
      { transaction }
    );

    if (myPushLimitToday < push) {
      throw createHttpError(400, "당일 푸쉬 한도를 초과하였습니다.");
    }

    // 현재 디비에 저장된 포인트 퍼센트 조회
    const pointPercent = await commonQuery.getPointPercent({ transaction });

    const pushLogNo = await pushLogQuery.sendPush(
      {
        targetUserNo,
        userNo,
        push,
        have_push,
        categoryLevel1No,
        categoryLevel2No,
        categoryLevel3No,
        categoryLevel4No,
        pointPercent,
      },
      { transaction }
    );

    // 존재하는 포인트 고유키가 있는지 조회
    let pointNo = await pointQuery.existPointNo(
      {
        producerNo: userNo,
        dreamerNo: targetUserNo,
        categoryLevel1No,
        categoryLevel2No,
        categoryLevel3No,
        categoryLevel4No,
      },
      { transaction }
    );

    // 포인트번호가 미존재시 포인트 번호를 생성한다.
    if (!pointNo) {
      pointNo = await pointQuery.createPointNo(
        {
          producerNo: userNo,
          dreamerNo: targetUserNo,
          categoryLevel1No,
          categoryLevel2No,
          categoryLevel3No,
          categoryLevel4No,
        },
        { transaction }
      );
    }

    const point = push * pointPercent;

    // 포인트 추가
    await pointQuery.addPoint(
      {
        pointNo,
        point,
      },
      { transaction }
    );

    // 로깅
    await pointLogQuery.setLogByPush(
      {
        pointNo,
        fkNo: pushLogNo,
        point,
      },
      { transaction }
    );

    // 남은 푸쉬
    const remaining_have_push = have_push - push;

    await transaction.commit();
    return res.status(200).send({ remaining_have_push, point });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    next(error);
  }
};
