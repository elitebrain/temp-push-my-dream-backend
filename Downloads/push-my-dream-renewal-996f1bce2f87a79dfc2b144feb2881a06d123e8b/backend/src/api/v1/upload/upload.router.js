const express = require("express");
const api = require("./upload.ctrl.js");
const uploadRouter = express.Router();

uploadRouter.get("/video/category", api.getVideoCategory);
uploadRouter.post("/video", api.createVideo);
uploadRouter.put("/video", api.updateVideoOriginUrl);
uploadRouter.put("/video/status", api.updateVideoStatus);
uploadRouter.put("/video/transcoder", api.updateVideoTranscoder);
uploadRouter.post("/callback", api.transcoderCallback);

module.exports = uploadRouter;
