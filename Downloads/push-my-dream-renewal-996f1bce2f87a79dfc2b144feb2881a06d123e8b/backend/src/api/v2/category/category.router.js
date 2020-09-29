const express = require("express");
const api = require("./category.ctrl");

const { isLoggedIn } = require("middlewares/login");

const categoryRouter = express.Router();

// 진행 중인 대회 목록 조회
categoryRouter.get(
  "/open/seasons",

  api.getOpenedParticipationSeason
);

// 대회의 정보 조회
categoryRouter.get(
  "/seasons/:category3No",

  api.getSeason
);

// 참가하려는 대회 정보 조회
categoryRouter.get(
  "/seasons/:category3No/apply",
  isLoggedIn,
  api.getApplyInfoByCategory
);

// 대회 참가하기
categoryRouter.post("/seasons/:category3No", isLoggedIn, api.applySeason);

categoryRouter.get(
  "/:category3No/videos",

  api.getCategoryVideos
);

categoryRouter.get("/:category3No/users", api.getUserByCategory);

categoryRouter.get("/:category3No/banner", api.getBannerByCategory);

module.exports = categoryRouter;
