const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot } = require("shared/functions");

class ContestLogQuery {
  // 경연 참가 신청
  async setContestLog(
    userNo,
    categoryDreamerNo,
    phone,
    status,
    callableStartTime,
    callableEndTime
  ) {
    const res = await set(`INSERT INTO CONTEST_LOG (user_no, category_level2_no, phone, status, callable_start_time, callable_end_time)
    VALUES (${escapeQuot(userNo)}, ${escapeQuot(
      categoryDreamerNo
    )}, ${escapeQuot(phone)}, ${escapeQuot(status)}, ${escapeQuot(
      callableStartTime
    )}, ${escapeQuot(callableEndTime)})`);
    return res[0];
  }

  async updateContestLogByUserId({
    userNo,
    categoryDreamerNo,
    callableStartTime,
    callableEndTime,
    callablePhone
  }) {
    const res = await modify(
      `UPDATE CONTEST_LOG
      SET category_level2_no = ${escapeQuot(categoryDreamerNo)},
        phone = ${escapeQuot(callablePhone)},
        callable_start_time = ${escapeQuot(callableStartTime)},
        callable_end_time = ${escapeQuot(callableEndTime)}
      WHERE user_no = ${userNo}`
    );

    return res;
  }

  // 콘테스트 로그 유저 아이디로 조회
  async getContestLogByUserId(userNo) {
    const res = await getAll(`
    SELECT contest_log_no, phone, status, callable_start_time, callable_end_time,
      \`CATEGORY_LEVEL2\`.\`category_level2_no\` AS \`CATEGORY_LEVEL2.category_level2_no\`,       \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY_LEVEL2.category_level2\`
    FROM CONTEST_LOG
      LEFT OUTER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = CONTEST_LOG.category_level2_no
    WHERE CONTEST_LOG.user_no = ${userNo}
    `);

    return res.map(v => ({
      ...v,
      callable_start_time: v.callable_start_time.substr(0, 5),
      callable_end_time: v.callable_end_time.substr(0, 5)
    }));
  }

  // 콘테스트 로그 유저 아이디로 조회
  async getContestLogByContestId(contestId) {
    const res = await getOne(`
    SELECT contest_log_no, phone, status, callable_start_time, callable_end_time,
      \`CATEGORY_LEVEL2\`.\`category_level2_no\` AS \`CATEGORY_LEVEL2.category_level2_no\`,       \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY_LEVEL2.category_level2\`
    FROM CONTEST_LOG
      LEFT OUTER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = CONTEST_LOG.category_level2_no
    WHERE CONTEST_LOG.contest_log_no = ${contestId}
    `);

    const result = Object.assign(
      {},
      {
        ...res,
        callable_start_time: res.callable_start_time.substr(0, 5),
        callable_end_time: res.callable_end_time.substr(0, 5)
      }
    );

    return result;
  }
}

module.exports = ContestLogQuery;
