const express = require("express");
const moment = require("moment");
const { Container } = require("typedi");

const UserQuery = require("queries/UserQuery");

const userQuery = Container.get(UserQuery);

const webViewRouter = express.Router();

webViewRouter.get("/:userNo/chart", async (req, res, next) => {
  const { userNo } = req.params;
  const { category3No, category4No } = req.query;

  try {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    // 오늘 + 29일간의 데이터를 리턴한다. -> 총 30일
    const startDate = moment()
      .subtract(29, "day")
      .format("YYYY-MM-DD 00:00:00");

    const scoreData = await userQuery.getScoreChartData({
      userNo,
      category3No,
      startDate,
      now,
    });

    const pushData = await userQuery.getPushChartData({
      userNo,
      startDate,
      now,
      category3No,
    });

    res.render("chart.ejs", {
      scoreData: scoreData.map((data) => ({
        ...data,
        date: moment(data.date).format("MM-DD"),
      })),

      pushData: pushData.map((data) => ({
        ...data,
        date: moment(data.date).format("MM-DD"),
      })),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = webViewRouter;
