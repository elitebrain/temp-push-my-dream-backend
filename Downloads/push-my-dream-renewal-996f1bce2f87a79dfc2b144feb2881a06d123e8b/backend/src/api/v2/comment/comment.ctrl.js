const { Container } = require("typedi");
const createHttpError = require("http-errors");

const { sequelize } = require("config/sequelize.config");

const CommentQuery = require("queries/CommentQuery");
const FlagLogQuery = require("queries/FlagLogQuery");

const commentQuery = Container.get(CommentQuery);
const flagLogQuery = Container.get(FlagLogQuery);

exports.setComment = async (req, res, next) => {
  const { user_no: userNo } = req.user;
  const { videoNo, comment } = req.body;
  try {
    const result = await commentQuery.setComment({ videoNo, userNo, comment });

    res.status(200).send({ result, message: "insert success" });
  } catch (error) {
    next(error);
  }
};
exports.getComment = async (req, res, next) => {
  try {
    const { videoNo } = req.query;
    // const countComment = await commentQuery.getCountComment(videoNo);
    const commentList = await commentQuery.getComment(videoNo);

    res.status(200).send(commentList);
    // res.status(200).send({
    //   countComment,
    //   commentList
    // });
  } catch (error) {
    next(error);
  }
};
exports.removeComment = async (req, res, next) => {
  let transaction = null;
  try {
    transaction = await sequelize.transaction();
    const { user_no: userNo } = req.user;
    const { commentNo } = req.query;
    const exComment = await commentQuery.getCommentByCommentNoAndUser({
      userNo,
      commentNo,
    });

    if (!exComment) {
      throw createHttpError(400, "해당 댓글이 존재하지 않습니다.");
    }

    await commentQuery.removeComment({ commentNo }, { transaction });
    await flagLogQuery.setFlagByCommentNo(
      { commentNo, userNo, flag: 6 },
      { transaction }
    );

    await transaction.commit();

    res.status(200).send({ message: "delete success" });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
