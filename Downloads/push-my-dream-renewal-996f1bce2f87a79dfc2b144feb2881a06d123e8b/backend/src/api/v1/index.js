const express = require("express");
const CheckplusRouter = require("./checkplus/checkplus.router");
const commonRouter = require("./common/common.router");
const userRouter = require("./user/user.router");
const mainRouter = require("./main/main.router");
const videoRouter = require("./video/video.router");
const uploadRouter = require("./upload/upload.router");
const emergenzaRouter = require("./emergenza/emergenza.router");
const commentRouter = require("./comment/comment.router");
const noticeRouter = require("./notice/notice.router");
const voteRouter = require("./vote/vote.router");

const V1Router = express.Router();

V1Router.use("/checkplus", CheckplusRouter);
V1Router.use("/comment", commentRouter);
V1Router.use("/common", commonRouter);
V1Router.use("/emergenza", emergenzaRouter);
V1Router.use("/main", mainRouter);
V1Router.use("/notice", noticeRouter);
V1Router.use("/user", userRouter);
V1Router.use("/upload", uploadRouter);
V1Router.use("/video", videoRouter);
V1Router.use("/vote", voteRouter);

module.exports = V1Router;
