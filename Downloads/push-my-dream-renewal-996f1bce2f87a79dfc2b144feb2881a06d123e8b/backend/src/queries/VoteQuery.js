const moment = require("moment");

const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot } = require("shared/functions");

class VoteQuery {
  // 투표 상세정보 조회
  async getVoteSummary({ voteNo, isAdmin }) {
    return await getOne(`
        SELECT VOTE.vote_no, VOTE.category_level2_no, VOTE.category_level3_no, VOTE.vote_title, VOTE.vote_cover_image, VOTE.vote_cover_image_mobile, VOTE.vote_notice,
            \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY.title\`,
            \`CATEGORY_LEVEL3\`.\`title\` AS \`SUBCATEGORY.title\`
        FROM VOTE
            INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = VOTE.category_level2_no
            INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = VOTE.category_level3_no
        ${
          isAdmin
            ? `WHERE vote_no = ${escapeQuot(voteNo)}`
            : `WHERE ${escapeQuot(
                moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
              )} >= VOTE.vote_open_scheduled_date AND ${escapeQuot(
                moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
              )} >= VOTE.vote_start_date AND ${escapeQuot(
                moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
              )} <= VOTE.vote_end_date AND VOTE.vote_is_open = 1 AND VOTE.vote_no = ${escapeQuot(
                voteNo
              )}`
        }
      `);
  }

  // 투표 항목 조회
  async getVoteItem({ voteNo, isAdmin }) {
    const vote = await getOne(`
      SELECT VOTE.vote_no, VOTE.category_level2_no, VOTE.category_level3_no, VOTE.vote_title, VOTE.vote_cover_image, VOTE.vote_cover_image_mobile, VOTE.vote_notice, VOTE.vote_participation_notice, VOTE.vote_min_count, VOTE.vote_max_count, VOTE.vote_link_type,
          \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY.title\`,
          \`CATEGORY_LEVEL3\`.\`title\` AS \`SUBCATEGORY.title\`
      FROM VOTE
          INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = VOTE.category_level2_no
          INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = VOTE.category_level3_no
      ${
        isAdmin
          ? `WHERE vote_no = ${escapeQuot(voteNo)}`
          : `WHERE VOTE.vote_open_scheduled_date <= ${escapeQuot(
              moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            )} AND VOTE.vote_start_date <= ${escapeQuot(
              moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            )} AND VOTE.vote_end_date >= ${escapeQuot(
              moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            )} AND VOTE.vote_is_open = 1 AND VOTE.vote_no = ${escapeQuot(
              voteNo
            )}`
      }
    `);

    const voteItemList = await getAll(`
      SELECT vote_item_no, vote_item_thumbnail, vote_item_title, vote_item_description, vote_item_url
      FROM VOTE_ITEM
      WHERE vote_no = ${voteNo}
    `);

    if (vote) {
      vote.VOTE_ITEM_LIST = voteItemList;
    }

    return vote;
  }

  // 유저가 투표를 했는지 체크
  async checkVoteByUser({ userNo, voteNo }) {
    const res = await getOne(`
        SELECT IFNULL(COUNT(vote_item_user_no), 0) AS isVoted
        FROM VOTE_ITEM_USER
        WHERE vote_no = ${voteNo} AND user_no = ${userNo}
      `);

    return res.isVoted;
  }

  // 투표하기
  async voteItem({ userNo, voteNo, voteList }) {
    const conditions = voteList
      .map(
        voteItem =>
          `(${escapeQuot(voteNo)}, ${escapeQuot(voteItem)}, ${userNo})`
      )
      .join(",")
      .toString();

    return await set(`
      INSERT INTO VOTE_ITEM_USER(vote_no, vote_item_no, user_no)
      VALUES ${conditions}`);
  }

  // 투표 정보 조회
  async getVoteInfo({ voteNo, isAdmin }) {
    return await getOne(`
    SELECT VOTE.vote_no, VOTE.category_level2_no, VOTE.category_level3_no, VOTE.vote_title, VOTE.vote_cover_image, VOTE.vote_cover_image_mobile, VOTE.vote_notice, VOTE.vote_open_scheduled_date, VOTE.vote_start_date, VOTE.vote_end_date,
      \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY.title\`,
      \`CATEGORY_LEVEL3\`.\`title\` AS \`SUBCATEGORY.title\`
    FROM VOTE
      INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = VOTE.category_level2_no
      INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = VOTE.category_level3_no
    ${
      isAdmin
        ? `WHERE VOTE.vote_no = ${escapeQuot(voteNo)}`
        : `WHERE VOTE.vote_no = ${escapeQuot(voteNo)} AND vote_is_open = 1`
    }
    `);
  }

  // 투표 결과 조회
  async getVoteResult({ voteNo }) {
    const res = await getOne(`
        SELECT VOTE.vote_no, VOTE.category_level2_no, VOTE.category_level3_no, VOTE.vote_title, VOTE.vote_cover_image, VOTE.vote_cover_image_mobile, VOTE.vote_notice,
          IFNULL(VIU.all_vote_count,0) AS \`all_vote_count\`,
          \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY.title\`,
          \`CATEGORY_LEVEL3\`.\`title\` AS \`SUBCATEGORY.title\`
        FROM VOTE
          LEFT OUTER JOIN (SELECT vote_no, COUNT(vote_no) AS all_vote_count FROM VOTE_ITEM_USER WHERE vote_no = ${escapeQuot(
            voteNo
          )}) AS VIU ON VIU.vote_no = VOTE.vote_no
          INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = VOTE.category_level2_no
          INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = VOTE.category_level3_no
        WHERE VOTE.vote_no = ${escapeQuot(voteNo)}
    `);

    const voteItemList = await getAll(`
        SELECT VOTE_ITEM.vote_item_no, VOTE_ITEM.vote_item_thumbnail, VOTE_ITEM.vote_item_title, VOTE_ITEM.vote_item_description, VOTE_ITEM.vote_item_url,
          IFNULL(VIU.count_user, 0) AS \`DATA.count_user\`,
          CONCAT(ROUND(IFNULL(VIU.count_user / ${
            res.all_vote_count
          } * 100, 0), 1), "%") AS \`DATA.percent\`
        FROM VOTE_ITEM
          LEFT OUTER JOIN (SELECT vote_item_no, COUNT(vote_item_no) AS count_user FROM VOTE_ITEM_USER GROUP BY vote_item_no) AS VIU ON VIU.vote_item_no = VOTE_ITEM.vote_item_no
        WHERE VOTE_ITEM.vote_no = ${escapeQuot(voteNo)}
        ORDER BY \`DATA.count_user\` DESC
    `);
    res.VOTE_ITEM_LIST = voteItemList;

    return res;
  }

  // 투표 리스트 조회
  async getVoteList() {
    return await getAll(`
      SELECT VOTE.vote_no, VOTE.vote_title, VOTE.vote_start_date, VOTE.vote_end_date, VOTE.vote_cover_image, VOTE.vote_cover_image_mobile, VOTE.vote_notice,
        \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY.title\`, \`CATEGORY_LEVEL2\`.\`category_level2_no\` AS \`CATEGORY.category_level2_no\`,
        \`CATEGORY_LEVEL3\`.\`title\` AS \`SUBCATEGORY.title\`, \`CATEGORY_LEVEL3\`.\`category_level3_no\` AS \`SUBCATEGORY.category_level3_no\`,
        IFNULL(\`VIU\`.\`count\`, 0) AS \`all_vote_count\`
      FROM VOTE
        INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = VOTE.category_level2_no
        INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = VOTE.category_level3_no
        LEFT OUTER JOIN (SELECT vote_no, COUNT(vote_item_user_no) AS count FROM VOTE_ITEM_USER GROUP BY vote_no) AS VIU ON VIU.vote_no = VOTE.vote_no
      WHERE VOTE.vote_is_open = true AND VOTE.vote_open_scheduled_date <= ${escapeQuot(
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      )}  AND VOTE.vote_end_date >= ${escapeQuot(
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    )}`);
  }

  // 종료된 투표 리스트 조회
  async getEndVote({ search = "", lastVoteId = 0, limit = 5 }) {
    let conditions = `WHERE VOTE.vote_is_open = true AND VOTE.vote_end_date < ${escapeQuot(
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    )}`;

    if (!!Number(lastVoteId)) {
      conditions += ` AND VOTE.vote_no < ${lastVoteId}`;
    }
    if (!!search) {
      conditions += ` AND VOTE.title LIKE '%${search}%'`;
    }

    return await getAll(`
      SELECT VOTE.vote_no, VOTE.vote_title, VOTE.vote_start_date, VOTE.vote_end_date, VOTE.created_at,
        \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY.title\`, \`CATEGORY_LEVEL2\`.\`category_level2_no\` AS \`CATEGORY.category_level2_no\`,
        \`CATEGORY_LEVEL3\`.\`title\` AS \`SUBCATEGORY.title\`, \`CATEGORY_LEVEL3\`.\`category_level3_no\` AS \`SUBCATEGORY.category_level3_no\`,
        IFNULL(\`VIU\`.\`count\`, 0) AS \`all_vote_count\`
      FROM VOTE
        INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = VOTE.category_level2_no
        INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = VOTE.category_level3_no
        LEFT OUTER JOIN (SELECT vote_no, COUNT(vote_item_user_no) AS count FROM VOTE_ITEM_USER GROUP BY vote_no) AS VIU ON VIU.vote_no = VOTE.vote_no
      ${conditions}
      ORDER BY VOTE.created_at DESC, VOTE.vote_no DESC
      LIMIT ${limit + 1}
     `);
  }

  // 투표의 날짜들만 가져오기
  async getVoteDate({ voteNo }) {
    return await getOne(`
      SELECT vote_no, vote_open_scheduled_date, vote_start_date, vote_end_date, vote_is_open
      FROM VOTE
      WHERE vote_is_open = 1 AND vote_no = ${voteNo}
    `);
  }
}

module.exports = VoteQuery;
