const express = require("express");

const api = require("./user.ctrl");
const userMobileRouter = require("./mobile/userMobile.router");

const userRouter = express.Router();

const { isLoggedIn, isNotLoggedIn, isAdmin } = require("middlewares/login");
const { profile } = require("middlewares/upload");

// 모바일용 로그인
userRouter.use("/mobile", userMobileRouter);

// 로그인 된 유저 정보 불러오기
userRouter.get("/", isLoggedIn, api.loadUser);

// di를 이용한 유저 조회
userRouter.get("/di", api.getUserByDi);

// 로그아웃
userRouter.get("/logout", isLoggedIn, api.logout);
// 로컬 로그인
userRouter.post("/login", api.login);
// 가입된 아이디인지 체크
userRouter.post("/check", isNotLoggedIn, api.checkId);
// 가입된 닉네임인지 체크
userRouter.get("/check/nickname", api.checkNickname);
// 가입된 로컬 로그인 유저인지 체크
userRouter.get("/check/local/login", api.checkLocalLogin);

// 회원가입(sign up)
userRouter.post("/sign-up", isNotLoggedIn, api.signUp);

// USER 정보 조회 (/user) - 타인정보
userRouter.get("/info", isAdmin, api.getUserInfo);
// USER 정보 조회 (/mypage) - 본인정보
userRouter.get("/my-info", isLoggedIn, api.getMyInfo);
// USER 정보 조회 (/mypage/edit) - 본인정보 for 수정
userRouter.get("/edit-info", isLoggedIn, api.getEditInfo);
// USER 정보 수정 (/mypage/edit)
userRouter.put("/edit-info", isLoggedIn, profile.update, api.modifyInfo);
// 팔로우
userRouter.post("/follow", isLoggedIn, api.modifyFollow);
// 팔로우 취소
userRouter.delete("/follow", isLoggedIn, api.removeFollow);

userRouter.get("/naver/login/callback", api.naverLoginCallback);
//비밀번호 변경
userRouter.put("/password", api.changePassword);

// USER 회원 탈퇴
userRouter.delete("/", isLoggedIn, api.removeUser);

module.exports = userRouter;
