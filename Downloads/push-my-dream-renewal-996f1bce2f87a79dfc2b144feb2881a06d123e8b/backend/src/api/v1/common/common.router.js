const express = require("express");
const api = require("./common.ctrl.js");
const commonRouter = express.Router();

commonRouter.get("/category", api.getCategoryList);
commonRouter.get("/", api.getCommonData);
commonRouter.get("/terms", api.getTermsList);
commonRouter.get("/category-by-lv2", api.getCategoryByLv2);
// 팝업 게시글 조회
commonRouter.get("/popup-notice", api.getPopupNotice);

commonRouter.post("/charging", api.handleCharging);
commonRouter.post("/charging/return", api.chargingReturn);
commonRouter.post("/charging/callback", api.chargingCallback);
commonRouter.get("/charging/cancel", api.chargingCancel);
commonRouter.get("/pglog", api.getPgLog);

commonRouter.post("/test", api.test);

module.exports = commonRouter;
