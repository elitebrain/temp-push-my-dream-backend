const express = require("express");

const categoryRouter = require("./category/category.router");
const checkplusRouter = require("./checkplus/checkplus.router");
const commonRouter = require("./common/common.router");
const userRouter = require("./user/user.router");
const mainRouter = require("./main/main.router");
const videoRouter = require("./video/video.router");
const uploadRouter = require("./upload/upload.router");
const emergenzaRouter = require("./emergenza/emergenza.router");
const commentRouter = require("./comment/comment.router");
const noticeRouter = require("./notice/notice.router");
const voteRouter = require("./vote/vote.router");
const webviewRouter = require("./webview/webview.router");

const V2Router = express.Router();

V2Router.use("/checkplus", checkplusRouter);
V2Router.use("/category", categoryRouter);
V2Router.use("/comment", commentRouter);
V2Router.use("/common", commonRouter);
V2Router.use("/emergenza", emergenzaRouter);
V2Router.use("/main", mainRouter);
V2Router.use("/notice", noticeRouter);
V2Router.use("/user", userRouter);
V2Router.use("/upload", uploadRouter);
V2Router.use("/video", videoRouter);
V2Router.use("/vote", voteRouter);
V2Router.use("/webview", webviewRouter);

module.exports = V2Router;
