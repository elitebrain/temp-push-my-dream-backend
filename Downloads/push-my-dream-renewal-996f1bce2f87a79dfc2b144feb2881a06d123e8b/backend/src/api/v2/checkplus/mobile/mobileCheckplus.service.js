const { Container } = require("typedi");
const UserQuery = require("queries/UserQuery");
const userQuery = Container.get(UserQuery);

const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? process.env.MOBILE_CALLBACK_URL
    : process.env.NODE_ENV === "test"
    ? process.env.MOBILE_CALLBACK_URL_TEST
    : process.env.MOBILE_CALLBACK_URL_DEV;

exports.signup = (req, res, next) => {
  req.session.checkplus = { type: "signup" };

  next();
};
exports.findId = (req, res, next) => {
  req.session.checkplus = { type: "findId" };

  next();
};

exports.findPassword = (req, res, next) => {
  req.session.checkplus = { type: "findPassword" };
  req.session.findPassword = {
    localId: req.params.localId,
  };
  next();
};

exports.editPhone = (req, res, next) => {
  req.session.checkplus = {
    type: "editPhone",
  };

  req.session.editPhone = {
    userNo: req.params.userNo,
  };
  next();
};

exports.success = async (req, res, next) => {
  try {
    // 회원가입일 시

    if (req.session.checkplus && req.session.checkplus.type === "signup") {
      if (req.session.signup) {
        // 회원가입 세션에 저장 후 checkplus 세션은 user/mobile/checkIdentityCertificate에서 초기화
        req.session.signup.isCheckIdentityCertificate = true;
        req.session.signup.checkplus = req.session.checkplus.data;

        return res.redirect(`${CALLBACK_URL}/signup/identityCertificate`);
      }
    }

    // 아이디 찾기일 시
    else if (req.session.checkplus && req.session.checkplus.type === "findId") {
      req.session.findId = {
        isCheckIdentityCertificate: true,
        checkplus: req.session.checkplus.data,
      };

      return res.redirect(`${CALLBACK_URL}/find-id`);
    }

    // 비밀번호 찾기일 시
    else if (
      req.session.checkplus &&
      req.session.checkplus.type === "findPassword"
    ) {
      const { localId } = req.session.findPassword;

      const exUser = await userQuery.getLoginUser({
        id: localId,
        loginType: "local",
      });

      /**
       * e = 1 => 존재하지 않는 아이디입니다.
       * e = 2 => 정보가 일치하지 않습니다. ( 아이디와 휴대폰 인증한 아이디가 미일치 시 )
       *
       */
      // 유저가 존재하지 않을 시
      if (!exUser) {
        req.session.findPassword = {};
        return res.redirect(`${CALLBACK_URL}/find-password?e=1`);
      }

      const exUserByDi = await userQuery.getUserByDi(
        req.session.checkplus.data.dupinfo
      );

      /**
       * di 미존재시
       */
      if (!exUserByDi) {
        req.session.findPassword = {};
        return res.redirect(`${CALLBACK_URL}/find-password?e=2`);
      }

      // 정보 미일치 시
      if (exUser.email !== exUserByDi.email) {
        req.session.findPassword = {};
        return res.redirect(`${CALLBACK_URL}/find-password?e=2`);
      }

      req.session.findPassword = {
        ...req.session.findPassword,
        isCheckIdentityCertificate: true,
      };

      return res.redirect(`${CALLBACK_URL}/find-password`);
    }

    /**
     * e = 1 => 핸드폰의 소유자의 정보가 일치하지 않습니다.
     */
    // 핸드폰 번호 변경
    if (req.session.checkplus && req.session.checkplus.type === "editPhone") {
      const { userNo } = req.session.editPhone;
      const user = await userQuery.getUser({ userNo });

      if (user.di !== req.session.checkplus.data.dupinfo) {
        return res.redirect(`${CALLBACK_URL}/mypage/edit?e=1`);
      }

      req.session.editPhone = {
        ...req.session.editPhone,
        phone: req.session.checkplus.data.mobileno,
        isCheckIdentityCertificate: true,
      };

      return res.redirect(`${CALLBACK_URL}/mypage/edit`);
    }
  } catch (error) {
    next(error);
  }
};
