const { getAll, getOne, set, modify, remove } = require("shared/Query");

const { escapeQuot } = require("shared/functions");

class CommentQuery {
  // 댓글 등록
  async setComment({ videoNo, userNo, comment, isSupport = 0 }, config) {
    const res = await set(
      `
      INSERT INTO COMMENT (video_no, user_no, comment, is_support) VALUES (${escapeQuot(
        videoNo
      )}, ${escapeQuot(userNo)}, ${escapeQuot(comment)}, ${isSupport})
    `,
      config
    );
    return res;
    // return "insert success";
  }
  // 댓글 조회
  async getComment(videoNo) {
    const commentList = await getAll(`
      SELECT COMMENT.comment_no, USER.user_no, USER.user_name, USER.nickname, USER.user_photo, IF(COMMENT.flag = 0, COMMENT.comment, 'ⓘ 삭제된 메시지입니다.') AS \`comment\`, COMMENT.is_support , COMMENT.flag, COMMENT.created_at
      FROM COMMENT
        INNER JOIN USER ON USER.user_no = COMMENT.user_no
      WHERE video_no = ${videoNo} AND COMMENT.flag <= 6
      ORDER BY COMMENT.created_at DESC
    `);
    return commentList;
  }

  // 댓글 조회
  async getCommentByCommentNoAndUser({ commentNo, userNo }) {
    return await getOne(`
        SELECT COMMENT.comment_no
        FROM COMMENT
        WHERE comment_no = ${commentNo} AND user_no = ${userNo} AND COMMENT.flag <= 6
      `);
  }
  // 댓글 개수 조회
  async getCountComment(videoNo) {
    const res = await getOne(`
      SELECT COUNT(comment_no) AS count
      FROM COMMENT
      WHERE video_no = ${videoNo} AND COMMENT.flag = 0
    `);
    const countComment = res.count;
    return countComment;
  }
  // 댓글 삭제
  async removeComment({ commentNo }, config) {
    await modify(
      `
      UPDATE COMMENT SET flag = 6 WHERE comment_no = ${commentNo}
    `,
      config
    );
    // await remove(`
    //   DELETE FROM COMMENT WHERE comment_no = ${commentNo}
    // `);
    return "delete success";
  }

  // 유저가 작성한 댓글 조회
  async getAllCommentByUserNo({ userNo }, config) {
    return getAll(
      `
        SELECT * FROM COMMENT WHERE user_no = ${userNo} AND flag <= 5;
    `,
      config
    );
  }

  // 비디오에 작성된 댓글 조회
  async getAllCommentByVideoNo({ videoNo }, config) {
    return getAll(
      `
        SELECT * FROM COMMENT WHERE video_no = ${videoNo} AND flag <= 5;
      `,
      config
    );
  }

  // 비디오 목록들의 댓글 조회
  async getAllCommentByVideoList({ videoList }, config) {
    return getAll(
      `
        SELECT * FROM COMMENT WHERE video_no IN (${videoList.toString()}) AND flag <= 5;
      `,
      config
    );
  }

  // 댓글삭제
  async deleteCommentList({ flag, commentList }, config) {
    return await remove(
      `
        UPDATE COMMENT SET flag=${flag}
        WHERE comment_no IN (${commentList.toString()}) AND flag <= 5
      `,
      config
    );
  }

  // 비디오의 댓글들 플래그 설정
  async setFlagCommnetByVideoNo({ flag, videoNo }, config) {
    return await modify(
      `
        UPDATE COMMENT SET flag = ${flag}
        WHERE video_no = ${escapeQuot(videoNo)}  AND flag <= 5
      `,
      config
    );
  }

  // 비디오 목록들의 댓글들 플래그 설정
  async setFlagCommnetByVideoList({ flag, videoList }, config) {
    return await modify(
      `
        UPDATE COMMENT SET flag = ${flag}
        WHERE video_no IN (${videoList.toString()}) AND flag <= 5
      `,
      config
    );
  }
}

module.exports = CommentQuery;
