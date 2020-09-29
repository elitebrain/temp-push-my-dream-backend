const express = require("express");
const api = require("./userMobile.ctrl");
const { isLoggedIn } = require("middlewares/login");
const userMobileRouter = express.Router();

// 로그인
userMobileRouter.get("/login", api.socialLogin);
// 로컬 로그인
userMobileRouter.post("/login", api.localLogin);
// 카카오 로그인 && 성공 시 세션 저장
userMobileRouter.get("/kakao/callback", api.kakaoCallback, api.login);
// 네이버 로그인 && 성공 시 세션 저장
userMobileRouter.get("/naver/callback", api.naverCallback, api.login);
// 애플 회원가입
userMobileRouter.post("/apple/callback/signup", api.appleCallbackSignup);
// 애플 로그인
userMobileRouter.post("/apple/callback", api.appleCallback, api.login);
// 가입된 로컬 아이디인지 체크 && 성공 시 세션 저장
userMobileRouter.post("/local/check", api.localCheck);
// 약관 세션 체크
userMobileRouter.get("/check/terms", api.checkTerms);
// 약관 세션에 저장
userMobileRouter.post("/session/terms", api.sessionTerms);
// 로그인 세션 체크
userMobileRouter.get("/check/login", api.checkLogin);
// 나이스 세션 체크
userMobileRouter.get(
  "/check/identityCertificate",
  api.checkIdentityCertificate
);
// 프로필 세션 체크
userMobileRouter.get("/check/profile", api.checkProfile);
// 회원가입
userMobileRouter.post("/sign-up", api.signUp);
// 회원가입 성공 체크
userMobileRouter.get("/check/signup", api.checkSignUp);

// 아이디찾기 세션 체크
userMobileRouter.get("/check/find-id", api.checkFindId);

// 비밀번호 찾기 세션 체크
userMobileRouter.get("/check/find-password", api.checkFindPassword);

// 마이페이지 세션 체크
userMobileRouter.get("/check/edit-phone", api.checkEditPhone);

module.exports = userMobileRouter;
