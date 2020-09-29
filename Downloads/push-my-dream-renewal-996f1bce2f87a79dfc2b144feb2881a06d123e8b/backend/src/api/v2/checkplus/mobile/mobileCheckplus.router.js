const express = require("express");

const api = require("./mobileCheckplus.ctrl");
const service = require("./mobileCheckplus.service");
const mobileCheckplusRouter = express.Router();

mobileCheckplusRouter.get("/signup", service.signup, api.getCheckPlus);

mobileCheckplusRouter.get("/find-id", service.findId, api.getCheckPlus);

mobileCheckplusRouter.get(
  "/:localId/find-password",
  service.findPassword,
  api.getCheckPlus
);

mobileCheckplusRouter.post(
  "/:userNo/phone",
  service.editPhone,
  api.getCheckPlus
);

mobileCheckplusRouter.post("/success", api.checkPlusSuccess, service.success);

mobileCheckplusRouter.post("/fail", api.checkPlusFailure);

mobileCheckplusRouter.get("/success", api.getCheckPlusSuccess, service.success);

mobileCheckplusRouter.get("/fail", api.getCheckPlusFailure);

module.exports = mobileCheckplusRouter;
