const express = require("express");
const api = require("./common.ctrl.js");
const commonRouter = express.Router();

const { isLoggedIn } = require("middlewares/login");

commonRouter.get("/category", api.getCategoryList);

// 현재까지의 총 푸쉬 조회
commonRouter.get("/push/all", api.getAllPush);

commonRouter.get("/", api.getCommonData);
commonRouter.get("/terms", api.getTermsList);
commonRouter.get("/category-by-lv2", api.getCategoryByLv2);
// 팝업 게시글 조회
commonRouter.get("/popup-notice", api.getPopupNotice);

commonRouter.post("/charging", api.handleCharging);
commonRouter.post("/charging/return", api.chargingReturn);
commonRouter.post("/charging/callback", api.chargingCallback);
commonRouter.get("/charging/cancel", api.chargingCancel);
commonRouter.post("/charging/refund", api.chargingRefund);
// PG_LOG 조회 by pgLogNo (충전내역)
commonRouter.get("/pg-log", api.getPgLog);
// PG_LOG 조회 by userNo (내 충전내역 전체)
commonRouter.get("/my-pg-log", isLoggedIn, api.getMyPgLog);
// 내 PUSH 내역 조회 by userNo
commonRouter.get("/my-push-log", isLoggedIn, api.getMyPushLog);
// PUSH 조회 (PC- /user/[user_no])
commonRouter.get("/my-push", isLoggedIn, api.getMyPush);

commonRouter.post("/test", api.test);
commonRouter.get("/m-test", api.modifyTest);

// 랭크 조회
// commonRouter.get("/ranks/:categoryNo", api.getRanks);

// 랭크 조회
commonRouter.get("/ranks/:category3No/user/:userNo", api.getRanksByUser);

// 랭크 조회
commonRouter.get("/ranks/:category3No/:userType/:type", api.getRanksByType);

// 카테고리가 푸쉬 가능한지 체크
commonRouter.get("/is-push/:category3No", api.getIsPushByCategory3No);

// 배너 조회
commonRouter.get("/banners", api.getBanners);

// 배너 조회
commonRouter.get("/banners/:type", api.getBannersByType);

// DeviceToken && DeviceTokenLog 등록
commonRouter.post("/token", api.setTokenLog);
// DeviceToken 조회
commonRouter.get("/token", api.getToken);

// FCM 메시지발송
commonRouter.post("/send-all", api.setFcmSendAll);

// 진행중인 경연(CATEGORY_LEVEL3) 목록
commonRouter.get("/running-category-lv3", api.getRunningCategoryLv3List);

module.exports = commonRouter;
