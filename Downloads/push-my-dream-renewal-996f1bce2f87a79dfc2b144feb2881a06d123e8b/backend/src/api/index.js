const express = require("express");

const V1Router = require("./v1");
const V2Router = require("./v2");

const ApiRouter = express.Router();

ApiRouter.use("/v1", V1Router);
ApiRouter.use("/v2", V2Router);

module.exports = ApiRouter;
