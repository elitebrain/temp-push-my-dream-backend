const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot, escapeQuotAllowNull } = require("shared/functions");

class FlagLogQuery {
  // 비디오 개별 플래그 설정
  async setFlagByVideoNo({ videoNo, userNo, flag }, config) {
    return set(
      `
        INSERT INTO FLAG_LOG( fk_no, fk_type, user_no, flag_status)
        VALUES (${videoNo}, ${escapeQuot("VIDEO")}, ${userNo}, ${flag})  
    `,
      config
    );
  }

  // 비디오 리스트 플래그 설정
  async setFlagByVideoList({ videoList, userNo, flag }, config) {
    const conditions = videoList
      .map(videoNo => `( ${videoNo}, "VIDEO", ${userNo}, ${flag})`)
      .join(",")
      .toString();

    return set(
      `
        INSERT INTO FLAG_LOG( fk_no, fk_type, user_no, flag_status)
        VALUES ${conditions}
    `,
      config
    );
  }

  // 댓글 개별 플래그 설정
  async setFlagByCommentNo({ commentNo, userNo, flag }, config) {
    return set(
      `
        INSERT INTO FLAG_LOG( fk_no, fk_type, user_no, flag_status)
        VALUES (${commentNo}, "COMMENT", ${userNo}, ${flag})  
      `,
      config
    );
  }

  // 댓글 리스트 플래그 설정
  async setFlagByCommentList({ commentList, userNo, flag }, config) {
    const conditions = commentList
      .map(comment => `( ${comment}, "COMMENT", ${userNo}, ${flag})`)
      .join(",")
      .toString();

    return set(
      `
      INSERT INTO FLAG_LOG( fk_no, fk_type, user_no, flag_status)
      VALUES ${conditions}
  `,
      config
    );
  }
}

module.exports = FlagLogQuery;
