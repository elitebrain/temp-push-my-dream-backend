const { Container } = require("typedi");
const token = require("shared/token");

const UserQuery = require("queries/UserQuery");

const userQuery = Container.get(UserQuery);

// jwt 로그인
exports.jwtLogin = () => {
  return async (req, res, next) => {
    const accessToken = req.cookies["PAID"];
    const refreshToken = req.cookies["PRID"];
    const isAdmin = !!req.cookies["PADMIN"];

    try {
      req.isAuthenticated = false;
      req.isAdmin = isAdmin;

      if (accessToken) {
        const { userNo } = await token.validAccessToken(accessToken);

        const user = await userQuery.getUserById(userNo);
        const resultUser = Object.assign({}, user);

        req.user = resultUser;
        req.isAuthenticated = true;
      } else {
        if (refreshToken) {
          const { userNo, type } = await token.validRefreshToken(refreshToken);

          if (type === "refresh") {
            const accessToken = await token.setAccessToken(userNo);
            const refreshToken = await token.setRefreshToken(userNo);

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

            const user = await userQuery.getUserById(userNo);

            const resultUser = Object.assign({}, user);

            req.user = resultUser;
            req.isAuthenticated = true;
          }
        }
      }
    } catch (error) {
      console.error(error);
      return next(error);
    }

    next();
  };
};

// 로그인 체크
exports.isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated) {
    next();
  } else {
    return res.status(401).send({ message: "로그인 후 이용가능합니다." });
  }
};

// 관리자 모드인지 확인
exports.isAdmin = async (req, res, next) => {
  if (req.isAdmin) {
    next();
  }
};

// 유저 로그인 상태이거나 어드민 상태일 때
exports.isLoggedInOrIsAdmin = async (req, res, next) => {
  if (req.isAdmin || req.isAuthenticated) {
    next();
  } else {
    return res.status(401).send({ message: "로그인 후 이용가능합니다." });
  }
};

// 미로그인 상태
exports.isNotLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated) {
    next();
  } else {
    return res.status(401).send({ message: "로그아웃 후 이용해주세요." });
  }
};
