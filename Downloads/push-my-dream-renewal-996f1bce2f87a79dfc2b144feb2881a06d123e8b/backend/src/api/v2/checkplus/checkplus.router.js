const express = require("express");
const api = require("./checkplus.ctrl");
const mobileCheckplusRouter = require("./mobile/mobileCheckplus.router");

const CheckplusRouter = express.Router();

CheckplusRouter.use("/mobile", mobileCheckplusRouter);

CheckplusRouter.get("/", api.getCheckPlus);

CheckplusRouter.post("/success", api.checkPlusSuccess);

CheckplusRouter.post("/fail", api.checkPlusFailure);

CheckplusRouter.get("/success", api.getCheckPlusSuccess);

CheckplusRouter.get("/fail", api.getCheckPlusFailure);

module.exports = CheckplusRouter;
