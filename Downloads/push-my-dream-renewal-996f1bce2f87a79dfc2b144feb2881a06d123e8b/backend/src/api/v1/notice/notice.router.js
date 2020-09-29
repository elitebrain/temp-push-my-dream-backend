const express = require("express");
const api = require("./notice.ctrl");
const noticeRouter = express.Router();

noticeRouter.get("/", api.getNotice);

module.exports = noticeRouter;
