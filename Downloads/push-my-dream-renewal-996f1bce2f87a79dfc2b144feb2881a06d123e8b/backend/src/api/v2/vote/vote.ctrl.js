const { Container } = require("typedi");
const moment = require("moment");
const createError = require("http-errors");

const VoteQuery = require("queries/VoteQuery");

const voteQuery = Container.get(VoteQuery);

// 투표 정보 조회
exports.getVoteSummary = async (req, res, next) => {
  try {
    const { isAdmin } = req;
    const { voteNo } = req.params;

    const vote = await voteQuery.getVoteInfo({ voteNo, isAdmin });

    let isFinished, isOpened, isProceeded, result;
    if (vote) {
      // 종료된 상태
      isFinished = moment(new Date()) > moment(vote.vote_end_date);
      // 공개된 상태
      isOpened = moment(vote.vote_open_scheduled_date) <= moment(new Date());
      // 진행 상태
      isProceeded =
        moment(vote.vote_start_date) <= moment(new Date()) &&
        moment(new Date()) <= moment(vote.vote_end_date);

      result = Object.assign({}, vote, {
        STATUS: {
          isFinished,
          isOpened,
          isProceeded
        }
      });

      delete result.vote_open_scheduled_date;
      delete result.vote_start_date;
      delete result.vote_end_date;
    }

    // // 노출
    // const
    // console.log(vote);

    // const vote1 = await voteQuery.getVoteSummary({ voteNo, isAdmin });
    return res.status(200).send({ message: "success get vote", vote: result });
  } catch (error) {
    next(error);
  }
};

// 투표 리스트 조회
exports.getVoteItem = async (req, res, next) => {
  try {
    const { isAdmin } = req;
    const { voteNo } = req.params;

    // 관리자 모드가 아닐 시 유저 튜표 검색 조회
    // if (isAdmin) {
    //   return res.status(200).send({ message: "admin login", isVoted: true });
    // }

    const checkVote = await voteQuery.getVoteInfo({ voteNo, isAdmin });

    console.log(checkVote);
    let isFinished;
    if (checkVote) {
      // 종료된 상태
      isFinished = moment(new Date()) > moment(checkVote.vote_end_date);

      // 유저가 이미 진행한 투표면 결과창으로 바로 보여주게끔 데이터를 조회하는 쿼리
      const checkVoteByUser = await voteQuery.checkVoteByUser({
        userNo: req.user.user_no,
        voteNo
      });

      // 투표를 이미 진행했으면 투표를 더 이상 못하게 막음
      if (!!checkVoteByUser) {
        return res
          .status(200)
          .send({ message: "already vote by user", isVoted: true, isFinished });
      }
    }

    const vote = await voteQuery.getVoteItem({ voteNo, isAdmin });

    return res
      .status(200)
      .send({ message: "success get vote", vote, isVoted: false, isFinished });
  } catch (error) {
    next(error);
  }
};

// 투표 결과 조회
exports.getVoteResult = async (req, res, next) => {
  try {
    const { voteNo } = req.params;

    const vote = await voteQuery.getVoteDate({ voteNo });

    let checkVoteByUser, voteEndCheck;
    if (vote) {
      voteEndCheck =
        moment(vote.vote_end_date).format("YYYY-MM-DD HH:mm:ss") <
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

      // 진행중인 투표에 대해서는 유저가 투표롤 진행했는지 체크한다.
      if (!voteEndCheck) {
        const vote = await voteQuery.getVoteInfo({
          voteNo
        });

        // 미로그인 시
        if (!req.user) {
          return res
            .status(200)
            .send({ message: "don't vote by user", isVoted: false, vote });
        }

        // 유저가 이미 진행한 투표면 결과창으로 바로 보여주게끔 데이터를 조회하는 쿼리
        checkVoteByUser = await voteQuery.checkVoteByUser({
          userNo: req.user.user_no,
          voteNo
        });

        // 투표를 진행하지 않았으면 결과페이지를 못보게함
        if (!checkVoteByUser) {
          return res.status(200).send({
            message: "don't vote by user",
            isVoted: !!checkVoteByUser,
            vote
          });
        }
      }
    }

    const result = await voteQuery.getVoteResult({
      voteNo
    });

    return res.status(200).send({
      message: "success get vote result",
      vote: result,
      isVoted: voteEndCheck ? true : !!checkVoteByUser
    });
  } catch (error) {
    next(error);
  }
};

// 투표하기
exports.voteItem = async (req, res, next) => {
  try {
    const { voteList, voteNo } = req.body;

    const result = await voteQuery.voteItem({
      voteList,
      voteNo,
      userNo: req.user.user_no
    });

    // 투표 실패 (투표 결과 row 가 0일시)
    if (!result[1]) {
      return createError(400, "failure vote item");
    } else {
      res.status(200).send({ message: "success vote item" });
    }
  } catch (error) {
    next(error);
  }
};

// 투표 리스트 조회
exports.getVoteList = async (req, res, next) => {
  try {
    const result = await voteQuery.getVoteList();

    return res
      .status(200)
      .send({ message: "success get vote list ", voteList: result });
  } catch (error) {
    next(error);
  }
};

// 종료된 투표 리스트 조회
exports.getEndVoteList = async (req, res, next) => {
  try {
    const limit = 15;
    const { search, lastVoteId } = req.query;
    // 6개씩 조회하면서 5개만 주는 이유는 5씩 조회하고 5개씩 주면 마지막인지 체크가 안되기 때문에
    // 마지막을 체크하기 위해서 6개를 조회하고 5개를 준다.
    const result = await voteQuery.getEndVote({ search, lastVoteId, limit });

    return res.status(200).send({
      message: "success get vote end list",
      voteEndList: result.slice(0, limit),
      isLast: result.length !== limit + 1
    });
  } catch (error) {
    next(error);
  }
};
