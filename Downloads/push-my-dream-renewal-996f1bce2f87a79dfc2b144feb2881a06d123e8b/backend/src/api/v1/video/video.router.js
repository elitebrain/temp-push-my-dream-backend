const express = require("express");

const api = require("./video.ctrl.js");
const videoRouter = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("middlewares/login");

videoRouter.get("/job/status", api.getJobStatus);

videoRouter.get("/my-video", isLoggedIn, api.getMyVideoList);

videoRouter.get("/new", api.getNewVideo);
videoRouter.get("/hot", api.getHotVideo);
videoRouter.get("/official", api.getOfficialVideo);
// 공개|비공개 수정
videoRouter.put("/is-open", isLoggedIn, api.modifyIsOpen);
// 영상 삭제
videoRouter.delete("/", isLoggedIn, api.removeVideo);
// 영상 조회 최초
videoRouter.get("/list", api.getVideoList);
// 영상 조회
videoRouter.get("/", api.getVideo);
// 조회수
videoRouter.post("/view", api.modifyVideoView);
// 좋아요
videoRouter.post("/like", isLoggedIn, api.modifyVideoLike);
// 좋아요 취소
videoRouter.delete("/like", isLoggedIn, api.removeVideoLike);
videoRouter.post("/dislike", isLoggedIn, api.removeVideoLike);
// 내 영상 갯수조회
videoRouter.get("/my/video/count", isLoggedIn, api.getMyVideoCount);

videoRouter.put("/view/user-no", api.modifyViewVideoUserNo);

videoRouter.get("/:videoNo/info", api.getVideoByVideoNo);

// 영상 더 불러오기
videoRouter.get("/more", api.getMoreVideo);
// 영상 삭제
videoRouter.delete("/:videoNo", isLoggedIn, api.removeVideo);

module.exports = videoRouter;
