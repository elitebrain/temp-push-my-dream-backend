const express = require("express");

const api = require("./main.ctrl.js");

const mainRouter = express.Router();

mainRouter.get("/", api.getMainData);

mainRouter.get("/videos", api.getMainVideos);

module.exports = mainRouter;
