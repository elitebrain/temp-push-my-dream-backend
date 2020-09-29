const { getAll, getOne, set, modify, remove } = require("shared/Query");

class ActiveLogQuery {
  async getList(userNo) {
    const res = await getAll(`
      SELECT gubun, target_no
      FROM ACTIVE_LOG
      WHERE user_no = ${userNo} AND gubun != 'view_video'
      GROUP BY gubun, target_no
    `);
    const likeVideoList = [];
    const likeUserList = [];
    const followingList = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].gubun === "like_video") {
        likeVideoList.push(res[i].target_no);
      }
      if (res[i].gubun === "like_user") {
        likeUserList.push(res[i].target_no);
      }
      if (res[i].gubun === "follow_user") {
        followingList.push(res[i].target_no);
      }
    }
    return { likeVideoList, likeUserList, followingList };
  }

  async modifyViewVideoUserNo(tempId, userNo) {
    const res = await modify(`
      UPDATE ACTIVE_LOG SET user_no = ${userNo} WHERE temp_id = ${tempId}
    `);
    return res;
  }

  async existFollow({ userNo, targetNo }, config) {
    const result = await getOne(
      `
      SELECT COUNT(active_log_no) AS is_exist 
      FROM ACTIVE_LOG
      WHERE target_no = ${targetNo} AND user_no = ${userNo} AND gubun = 'follow_user'
    `,
      config
    );

    return Boolean(result.is_exist);
  }

  async existLike({ userNo, videoNo }, config) {
    const result = await getOne(
      `
      SELECT COUNT(active_log_no) AS is_like
      FROM ACTIVE_LOG
      WHERE target_no = ${videoNo} AND user_no = ${userNo} AND gubun = 'like_video'
    `,
      config
    );

    return Boolean(result.is_like);
  }
}

module.exports = ActiveLogQuery;
