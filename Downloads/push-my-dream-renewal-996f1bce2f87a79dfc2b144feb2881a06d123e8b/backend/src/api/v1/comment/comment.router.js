const express = require("express");
const { isLoggedIn } = require("middlewares/login");

const api = require("./comment.ctrl.js");

const commentRouter = express.Router();

commentRouter.post("/", isLoggedIn, api.setComment);
commentRouter.get("/", api.getComment);
commentRouter.delete("/", isLoggedIn, api.removeComment);

module.exports = commentRouter;
