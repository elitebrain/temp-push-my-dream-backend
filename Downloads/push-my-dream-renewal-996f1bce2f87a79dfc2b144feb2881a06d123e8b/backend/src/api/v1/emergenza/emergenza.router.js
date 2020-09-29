const express = require("express");
const api = require("./emergenza.ctrl");
const emergenzaRouter = express.Router();

const { isLoggedIn } = require("middlewares/login");

// EMERGENZA 참가 신청
emergenzaRouter.post("/", isLoggedIn, api.setEmergenza);
// EMERGENZA 참가 신청서 조회
emergenzaRouter.get("/", isLoggedIn, api.getEmergenza);
// EMERGENZA 참가 신청 수정
emergenzaRouter.put("/", isLoggedIn, api.modifyEmergenza);

module.exports = emergenzaRouter;
