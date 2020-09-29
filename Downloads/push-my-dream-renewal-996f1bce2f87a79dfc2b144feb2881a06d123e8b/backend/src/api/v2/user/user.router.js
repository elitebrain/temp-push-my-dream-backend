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
userRouter.get("/logout", api.logout);
// 로컬 로그인
userRouter.post("/login", api.login);
// 가입된 아이디인지 체크
userRouter.post("/check", isNotLoggedIn, api.checkId);
// 가입된 닉네임인지 체크
userRouter.get("/check/nickname", api.checkNickname);
// 닉네임 로그 체크
userRouter.get("/check/nickname/log", isLoggedIn, api.checkChangeNicknameLog);

// 가입된 로컬 로그인 유저인지 체크
userRouter.get("/check/local/login", api.checkLocalLogin);

// 회원가입(sign up)
userRouter.post("/sign-up", isNotLoggedIn, api.signUp);

// USER 정보 조회 (/user) - 타인정보
userRouter.get("/info", api.getUserInfo);
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

// 유저의 비디오 조회
userRouter.get("/video/:userNo", api.getVideoByUser);

// USER 회원 탈퇴
userRouter.delete("/", isLoggedIn, api.removeUser);

// 유저의 비디오 조회
userRouter.get("/my-video", isLoggedIn, api.getMyVideoList);

// 유저의 차트 정보 조회
userRouter.get("/:userNo/chart/:type", api.getChartTypeByUserNo);

// 랭크 조회
userRouter.get("/:userNo/ranks/category/:category4No", api.getRanksByUser);

// 시진의 랭크 조회
userRouter.get(
  "/:userNo/ranks/season/:category4No/producer",

  api.getProducerRanksByUser
);

// 나의 푸시 정보 조회
userRouter.get("/me/push", isLoggedIn, api.getMyPush);

// 오픈 중인 모든 라운드에서 나의 푸쉬 조회
userRouter.get("/me/push/open", isLoggedIn, api.getMyPushByOpenCategory);

// 나의 푸시 요약 정보 조회
userRouter.get("/me/push/summary", isLoggedIn, api.getMyPushSummary);

// 시즌에 해당하는 나의 푸시 정보 조회
userRouter.get("/me/push/:category4No", isLoggedIn, api.getMyPushInfo);

// 나의 포인트  정보 조회
userRouter.get("/me/point", isLoggedIn, api.getMyPoint);

// 나의 후원  정보 조회
userRouter.get("/me/support", isLoggedIn, api.getMySupport);

// 나의 참여 시즌 정보 조회
userRouter.get("/me/participate", isLoggedIn, api.getMyParticipateSeason);

// 내가 해당 경연에 참가했는 지 정보 조회
userRouter.get(
  "/me/participate/:category4No",
  isLoggedIn,
  api.getMyParticipateSeasonByCategory4No
);

// 해당 유저에게 푸쉬 가능한지 체크
userRouter.get("/:userNo/is-push", api.getIsPushByUserNo);

// 해당 라운드의 해당 유저에게 푸쉬 가능한지 체크
userRouter.get(
  "/:userNo/is-push/:category4No",
  api.getIsPushByUserNoInCategory4No
);

// 해당 라운드의 해당 유저에게 푸쉬 가능한지 체크
userRouter.get("/:userNo/participate", api.getParticipateByUser);

// 해당 유저의 수상 내역 조회
userRouter.get("/:userNo/awards", api.getUserAwards);

// 카테고리별 유저가 받은 푸쉬 조회
userRouter.get(
  "/:userNo/push/:category3No/receive",
  api.getMyReceivePushByCategory3No
);

// 푸쉬 결과 조회
userRouter.get("/:targetUserNo/push/result", isLoggedIn, api.getPushResult);

// 푸쉬 대상 유저 정보 조회
userRouter.get(
  "/:targetUserNo/push/:category4No",
  isLoggedIn,
  api.getTargetUser
);

// 푸쉬 보내기
userRouter.post("/:targetUserNo/push", isLoggedIn, api.sendPush);

// 후원 하기
userRouter.post("/:targetUserNo/support", isLoggedIn, api.supportPush);

// // PUSH 결과 조회
// commonRouter.get("/push-result", isLoggedIn, api.getPushResult);

module.exports = userRouter;
