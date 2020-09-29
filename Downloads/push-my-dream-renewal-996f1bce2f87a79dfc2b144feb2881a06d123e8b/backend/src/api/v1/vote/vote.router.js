const express = require("express");
const api = require("./vote.ctrl.js");
const voteRouter = express.Router();

const { isLoggedInOrIsAdmin, isAdmin } = require("middlewares/login");

// 투표 리스트 조회
voteRouter.get("/", api.getVoteList);

// 종료된 투표 리스트 조회
voteRouter.get("/end", api.getEndVoteList);

// 투표 결과 보기
voteRouter.get("/:voteNo/result", api.getVoteResult);
// 투표 정보 보기
voteRouter.get("/:voteNo/summary", isAdmin, api.getVoteSummary);
//투표 항목 보기
voteRouter.get("/:voteNo/item", isLoggedInOrIsAdmin, api.getVoteItem);
// 투표하기
voteRouter.post("/:voteNo", api.voteItem);

module.exports = voteRouter;
