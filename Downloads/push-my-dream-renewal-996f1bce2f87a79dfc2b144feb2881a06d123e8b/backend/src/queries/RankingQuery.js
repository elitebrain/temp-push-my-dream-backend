const { getAll, getOne, set, modify, remove } = require("shared/Query");
const {
  escapeQuotAllowNull,
  dashFormYYMD,
  setLog,
} = require("shared/functions");

class RankingQuery {
  async setRanking(categoryLevel3No, userNo, countView) {
    const result = await set(`
      INSERT INTO RANKING (category_level3_no, user_no, base_date, count_view) VALUES (${categoryLevel3No}, ${userNo}, '${dashFormYYMD(
      new Date()
    )}', ${countView})
    `);
    return result;
  }
  async setRankingByPush(categoryLevel3No, userNo, push) {
    const result = await set(`
      INSERT INTO RANKING (category_level3_no, user_no, base_date, count_push) VALUES (${categoryLevel3No}, ${userNo}, '${dashFormYYMD(
      new Date()
    )}', ${push})
    `);
    return result;
  }
  async checkExist(categoryLevel3No, userNo) {
    const result = await getOne(`
      SELECT RANKING.ranking_no, RANKING.ranking, RANKING.count_view, RANKING.count_like, RANKING.count_push
      FROM RANKING
      WHERE category_level3_no = ${categoryLevel3No} AND user_no = ${userNo} AND base_date = '${dashFormYYMD(
      new Date()
    )}'
    `);
    setLog("checkExist", {
      query: `
    SELECT RANKING.ranking_no, RANKING.ranking, RANKING.count_view, RANKING.count_like, RANKING.count_push
    FROM RANKING
    WHERE category_level3_no = ${categoryLevel3No} AND user_no = ${userNo} AND base_date = '${dashFormYYMD(
        new Date()
      )}'
  `,
    });
    return result;
  }
  async getRanking(categoryLevel3No) {
    const rankingList = await getAll(`
      SELECT RANKING.ranking_no, RANKING.category_level3_no, RANKING.user_no, RANKING.ranking, RANKING.count_view, RANKING.count_like, RANKING.count_push
      FROM RANKING
      WHERE category_level3_no = ${categoryLevel3No}
    `);
    return rankingList;
  }
  async getWeekRanking({ targetUserNo }) {
    const rankingList = await getAll(`
      SELECT RANKING.user_no, SUM(RANKING.count_push) AS total_push
      FROM RANKING
      WHERE base_date > DATE_ADD('${dashFormYYMD(new Date())}', INTERVAL -7 DAY)
      GROUP BY user_no
      ORDER BY count_push DESC
    `);
    const rank =
      rankingList.findIndex((v) => v.user_no === parseInt(targetUserNo, 10)) +
      1;
    setLog("getWeekRanking", {
      query: `
        SELECT RANKING.user_no, SUM(RANKING.count_push) AS total_push
        FROM RANKING
        WHERE base_date > DATE_ADD('${dashFormYYMD(
          new Date()
        )}', INTERVAL -7 DAY)
        GROUP BY user_no
        ORDER BY count_push DESC`,
      rank,
      targetUserNo,
    });
    return rank;
  }
  async getMonthRanking({ targetUserNo }) {
    const rankingList = await getAll(`
      SELECT RANKING.user_no, SUM(RANKING.count_push) AS total_push
      FROM RANKING
      WHERE base_date > DATE_ADD('${dashFormYYMD(
        new Date()
      )}', INTERVAL -30 DAY)
      GROUP BY user_no
      ORDER BY count_push DESC
    `);
    const rank =
      rankingList.findIndex((v) => v.user_no === parseInt(targetUserNo, 10)) +
      1;
    setLog("getMonthRanking", {
      query: `
        SELECT RANKING.user_no, SUM(RANKING.count_push) AS total_push
        FROM RANKING
        WHERE base_date > DATE_ADD('${dashFormYYMD(
          new Date()
        )}', INTERVAL -30 DAY)
        GROUP BY user_no
        ORDER BY count_push DESC`,
      rank,
      targetUserNo,
    });
    return rank;
  }
  async getSeasonRanking({ targetUserNo, categoryLevel3No }) {
    const rankingList = await getAll(`
      SELECT RANKING.user_no, SUM(RANKING.count_push) AS total_push
      FROM RANKING
      WHERE category_level3_no = ${categoryLevel3No}
      GROUP BY user_no
      ORDER BY count_push DESC
    `);
    const rank = rankingList.findIndex((v) => v.user_no === targetUserNo) + 1;
    return rank;
  }
  async modifyRanking(rankingNo, ranking, countView, countLike, countPush) {
    const result = await modify(`
      UPDATE RANKING SET ranking = ${escapeQuotAllowNull(
        ranking
      )}, count_view = ${escapeQuotAllowNull(
      countView
    )}, count_like = ${escapeQuotAllowNull(
      countLike
    )}, count_push = ${escapeQuotAllowNull(countPush)}
      WHERE ranking_no = ${rankingNo}
    `);
    return result;
  }
  async removeRanking(rankingNo) {
    const result = await remove(`
      DELETE FROM RANKING WHERE ranking_no = ${rankingNo}
    `);
    return result;
  }
}

module.exports = RankingQuery;
