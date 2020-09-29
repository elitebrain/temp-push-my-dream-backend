const jwt = require("jsonwebtoken");

module.exports = (function () {
  const { USER_ACCESS_KEY, USER_REFRESH_KEY } = process.env;

  //  access 토근 발급
  // todo: issuer 설정 // 서비스 페이지 적으면 됌
  async function setAccessToken(userNo) {
    return await jwt.sign({ userNo }, USER_ACCESS_KEY, {
      expiresIn: "2h",
      //   issuer:""
    });
  }

  // todo: issuer 설정 // 서비스 페이지 적으면 됌
  async function setRefreshToken(userNo) {
    return await jwt.sign({ userNo, type: "refresh" }, USER_REFRESH_KEY, {
      expiresIn: "365d",
      //   issuer:""
    });
  }

  //token 검증
  async function validAccessToken(token) {
    try {
      return await jwt.verify(token, USER_ACCESS_KEY);
    } catch (error) {
      return error;
    }
  } //token 검증
  async function validRefreshToken(token) {
    try {
      return await jwt.verify(token, USER_REFRESH_KEY);
    } catch (error) {
      return error;
    }
  }

  return {
    setAccessToken,
    setRefreshToken,
    validAccessToken,
    validRefreshToken,
  };
})();
