const { getAll, getOne, set, modify, remove } = require("shared/Query");
const moment = require("moment");

const { DEFAULT_USER_IMAGE } = require("shared/constants");

const { escapeQuot } = require("shared/functions");

class RankQuery {
  // 주별 월별 순위는 항상 큰시즌을 기준으로 한다.
  // 에머겐자 2020 3번째 시즌이 진행중이지만,
  // 에머겐자 2020 2번째 시즌, 1번 째 시즌의 순위도 나타나야한다.
  async getRankList({ startDate, endDate, category3No, limit }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    return await getAll(`      
      SELECT RANK() OVER (ORDER BY TEMP.score DESC) AS ranking,
        TEMP.user_no, TEMP.nickname, TEMP.user_photo, 
        IFNULL(CAST(TEMP.sum_like AS UNSIGNED),0) AS sum_like, 
        IFNULL(CAST(TEMP.sum_view AS UNSIGNED),0) AS sum_view, 
        IFNULL(CAST(TEMP.sum_push AS UNSIGNED),0) AS sum_push,
        IFNULL(CAST(TEMP.score AS UNSIGNED),0) AS score,
        TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
      FROM
      (
        SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(SUM(LIKE_COUNT.count), 0) AS sum_like, IFNULL(SUM(VIEW_COUNT.count) , 0) AS sum_view, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
          IFNULL(SUM(VIEW_COUNT.count) * CL3.view_score, 0) + IFNULL(SUM(LIKE_COUNT.count) * CL3.like_score, 0)  + IFNULL(PUSH_COUNT.sum_push * CL3.push_score, 0 ) AS score,
          UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no
        FROM UPLOAD_POSSIBLE_USER
          INNER JOIN USER ON USER.user_no = UPLOAD_POSSIBLE_USER.user_no
          INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW() 
          LEFT OUTER JOIN VIDEO ON VIDEO.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no AND VIDEO.user_no = UPLOAD_POSSIBLE_USER.user_no AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
            FROM ACTIVE_LOG
            WHERE gubun = 'like_video' AND created_at >= ${escapeQuot(
              startDate
            )} AND created_at < ${escapeQuot(endDate)}
            GROUP BY target_no
          ) AS LIKE_COUNT ON LIKE_COUNT.target_no = VIDEO.video_no
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
            FROM ACTIVE_LOG
            WHERE gubun = 'view_video' AND created_at >= ${escapeQuot(
              startDate
            )} AND created_at < ${escapeQuot(endDate)} 
            GROUP BY target_no
          ) AS VIEW_COUNT ON VIEW_COUNT.target_no = VIDEO.video_no
          LEFT OUTER JOIN (SELECT
                dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
                FROM PUSH_LOG
                WHERE PUSH_LOG.gubun = 'PUSH' AND category_level3_no = ${category3No} AND created_at >= ${escapeQuot(
      startDate
    )} AND created_at < ${escapeQuot(endDate)} 
                GROUP BY dreamer_no
            ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = UPLOAD_POSSIBLE_USER.user_no
        WHERE UPLOAD_POSSIBLE_USER.type = 'artist' AND UPLOAD_POSSIBLE_USER.is_push = 1 AND UPLOAD_POSSIBLE_USER.category_level3_no = ${category3No} AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
        GROUP BY UPLOAD_POSSIBLE_USER.user_no
        ORDER BY score DESC
        ) AS TEMP
      WHERE score > 0
      ORDER BY ranking ASC     
      ${limitCondition}
      `);
  }

  // 유저의 랭크 리스트 조회
  async getRankListByUserNo({ startDate, endDate, category3No, userNo }) {
    return await getAll(`
    SELECT 
      ranking, 
      user_no, 
      nickname, 
      user_photo, 
      sum_like, 
      sum_view, 
      sum_push, 
      score, 
      category_level1_no,
      category_level2_no,
      category_level3_no,
      category_level4_no
    FROM (
      SELECT RANK() OVER (ORDER BY TEMP.score DESC) AS ranking,
        TEMP.user_no, TEMP.nickname, TEMP.user_photo, 
        IFNULL(CAST(TEMP.sum_like AS UNSIGNED),0) AS sum_like, 
        IFNULL(CAST(TEMP.sum_view AS UNSIGNED),0) AS sum_view, 
        IFNULL(CAST(TEMP.sum_push AS UNSIGNED),0) AS sum_push,
        IFNULL(CAST(TEMP.score AS UNSIGNED),0) AS score,
        TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
      FROM
      (
        SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(SUM(LIKE_COUNT.count), 0) AS sum_like, IFNULL(SUM(VIEW_COUNT.count) , 0) AS sum_view, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
          IFNULL(SUM(VIEW_COUNT.count) * CL3.view_score, 0) + IFNULL(SUM(LIKE_COUNT.count) * CL3.like_score, 0)  + IFNULL(PUSH_COUNT.sum_push * CL3.push_score, 0 ) AS score,
          UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no
        FROM UPLOAD_POSSIBLE_USER
          INNER JOIN USER ON USER.user_no = UPLOAD_POSSIBLE_USER.user_no
          INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW() 
          LEFT OUTER JOIN VIDEO ON VIDEO.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no AND VIDEO.user_no = UPLOAD_POSSIBLE_USER.user_no AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
            FROM ACTIVE_LOG
            WHERE gubun = 'like_video' 
              AND created_at >= ${escapeQuot(startDate)} 
              AND created_at < ${escapeQuot(endDate)}
            GROUP BY target_no
          ) AS LIKE_COUNT ON LIKE_COUNT.target_no = VIDEO.video_no
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
            FROM ACTIVE_LOG
            WHERE gubun = 'view_video' 
              AND created_at >= ${escapeQuot(startDate)} 
              AND created_at < ${escapeQuot(endDate)} 
            GROUP BY target_no
          ) AS VIEW_COUNT ON VIEW_COUNT.target_no = VIDEO.video_no
          LEFT OUTER JOIN (
            SELECT dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
            FROM PUSH_LOG
            WHERE PUSH_LOG.gubun = 'PUSH' 
              AND category_level3_no = ${category3No} 
              AND created_at >= ${escapeQuot(startDate)} 
              AND created_at < ${escapeQuot(endDate)} 
                GROUP BY dreamer_no
            ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = UPLOAD_POSSIBLE_USER.user_no
        WHERE UPLOAD_POSSIBLE_USER.type = 'artist' AND UPLOAD_POSSIBLE_USER.is_push = 1 AND UPLOAD_POSSIBLE_USER.category_level3_no = ${category3No} AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
        GROUP BY UPLOAD_POSSIBLE_USER.user_no
        ORDER BY score DESC
        ) AS TEMP
      WHERE score > 0
      ORDER BY ranking ASC
    ) AS TEMP_RANK
    WHERE user_no = ${userNo}
  `);
  }

  //
  async getRankListByCategory4No({ startDate, endDate, category4No, limit }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    return await getAll(`      
      SELECT RANK() OVER (ORDER BY TEMP.score DESC) AS ranking,
        TEMP.user_no, TEMP.nickname, TEMP.user_photo, 
        IFNULL(CAST(TEMP.sum_like AS UNSIGNED),0) AS sum_like, 
        IFNULL(CAST(TEMP.sum_view AS UNSIGNED),0) AS sum_view, 
        IFNULL(CAST(TEMP.sum_push AS UNSIGNED),0) AS sum_push,
        IFNULL(CAST(TEMP.score AS UNSIGNED),0) AS score,
        TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
      FROM
      (
        SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(SUM(LIKE_COUNT.count), 0) AS sum_like, IFNULL(SUM(VIEW_COUNT.count) , 0) AS sum_view, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
          IFNULL(SUM(VIEW_COUNT.count) * CL3.view_score, 0) + IFNULL(SUM(LIKE_COUNT.count) * CL3.like_score, 0)  + IFNULL(PUSH_COUNT.sum_push * CL3.push_score, 0 ) AS score,
          VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.category_level4_no
        FROM VIDEO
          INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL3.category_level3_no = VIDEO.category_level4_no AND CL4.is_open = 1 AND CL4.start_time <= NOW() 
          INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = CL4.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW() 
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
            FROM ACTIVE_LOG
            WHERE gubun = 'like_video' AND created_at >= ${escapeQuot(
              startDate
            )} AND created_at < ${escapeQuot(endDate)}
            GROUP BY target_no
          ) AS LIKE_COUNT ON LIKE_COUNT.target_no = VIDEO.video_no
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
            FROM ACTIVE_LOG
            WHERE gubun = 'view_video' AND created_at >= ${escapeQuot(
              startDate
            )} AND created_at < ${escapeQuot(endDate)} 
            GROUP BY target_no
          ) AS VIEW_COUNT ON VIEW_COUNT.target_no = VIDEO.video_no
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          LEFT OUTER JOIN (SELECT
                dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
                FROM PUSH_LOG
                WHERE PUSH_LOG.gubun = 'PUSH' AND category_level4_no = ${category4No} AND created_at >= ${escapeQuot(
      startDate
    )} AND created_at < ${escapeQuot(endDate)} 
                GROUP BY dreamer_no
            ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = VIDEO.user_no
        WHERE VIDEO.category_level4_no = ${category4No} AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
        GROUP BY	VIDEO.user_no
        ORDER BY score DESC
        ) AS TEMP
      WHERE score > 0
      ORDER BY ranking ASC        
      ${limitCondition}
      `);
  }

  // 업로드 가능한 유저(첫 시즌은 업로드를 한 유저 , 두번 째 시즌부터는 일정 순위를 달성한 유저)
  // 에머겐자 2020 3번째 시즌이 진행중이면 3번째 시즌의 순위만 나타나야한다.
  async getRoundRankList({ startDate, endDate, category4No, limit }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    return await getAll(`
      SELECT RANK() OVER (ORDER BY TEMP.score DESC) AS ranking,
        TEMP.user_no, TEMP.nickname, TEMP.user_photo,
        IFNULL(CAST(TEMP.sum_like AS UNSIGNED),0) AS sum_like,
        IFNULL(CAST(TEMP.sum_view AS UNSIGNED),0) AS sum_view,
        IFNULL(CAST(TEMP.sum_push AS UNSIGNED),0) AS sum_push,
        IFNULL(CAST(TEMP.score AS UNSIGNED),0) AS score,
        TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
      FROM (
        SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(SUM(LIKE_COUNT.count), 0) AS sum_like, IFNULL(SUM(VIEW_COUNT.count) , 0) AS sum_view, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
          IFNULL(SUM(VIEW_COUNT.count) * CL3.view_score, 0) + IFNULL(SUM(LIKE_COUNT.count) * CL3.like_score, 0)  + IFNULL(PUSH_COUNT.sum_push * CL3.push_score, 0 ) AS score,
          UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no
        FROM UPLOAD_POSSIBLE_USER
          INNER JOIN USER ON USER.user_no = UPLOAD_POSSIBLE_USER.user_no
          INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND CL4.is_open = 1
            AND CL4.start_time <= NOW()
          INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = CL4.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW()
          LEFT OUTER JOIN VIDEO ON VIDEO.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND VIDEO.user_no = UPLOAD_POSSIBLE_USER.user_no AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
              FROM ACTIVE_LOG
              WHERE gubun = 'like_video' AND created_at >= ${escapeQuot(
                startDate
              )} AND created_at < ${escapeQuot(endDate)}
              GROUP BY target_no
          ) AS LIKE_COUNT ON LIKE_COUNT.target_no = VIDEO.video_no
          LEFT OUTER JOIN (
            SELECT target_no, COUNT(active_log_no) AS count
              FROM ACTIVE_LOG
              WHERE gubun = 'view_video' AND created_at >= ${escapeQuot(
                startDate
              )} AND created_at < ${escapeQuot(endDate)}
              GROUP BY target_no
            ) AS VIEW_COUNT ON VIEW_COUNT.target_no = VIDEO.video_no
            LEFT OUTER JOIN (
            SELECT dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
            FROM PUSH_LOG
            WHERE PUSH_LOG.gubun = 'PUSH' AND category_level4_no = ${category4No} AND created_at >= ${escapeQuot(
      startDate
    )} AND created_at < ${escapeQuot(endDate)}
            GROUP BY dreamer_no
          ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = UPLOAD_POSSIBLE_USER.user_no
        WHERE UPLOAD_POSSIBLE_USER.type = 'artist' AND UPLOAD_POSSIBLE_USER.is_push = 1 AND UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
        GROUP BY UPLOAD_POSSIBLE_USER.user_no
        ORDER BY score DESC
      ) AS TEMP
      WHERE score > 0
      ORDER BY ranking ASC
      ${limitCondition}
    `);
  }

  async getRoundRankListByUserNo({ startDate, endDate, category4No, userNo }) {
    return await getAll(`
      SELECT 
        ranking, 
        user_no, 
        nickname, 
        user_photo, 
        sum_like, 
        sum_view, 
        sum_push, 
        score, 
        category_level1_no,
        category_level2_no,
        category_level3_no,
        category_level4_no
      FROM (
        SELECT RANK() OVER (ORDER BY TEMP.score DESC) AS ranking,
          TEMP.user_no, TEMP.nickname, TEMP.user_photo,
          IFNULL(CAST(TEMP.sum_like AS UNSIGNED),0) AS sum_like,
          IFNULL(CAST(TEMP.sum_view AS UNSIGNED),0) AS sum_view,
          IFNULL(CAST(TEMP.sum_push AS UNSIGNED),0) AS sum_push,
          IFNULL(CAST(TEMP.score AS UNSIGNED),0) AS score,
          TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
        FROM (
          SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(SUM(LIKE_COUNT.count), 0) AS sum_like, IFNULL(SUM(VIEW_COUNT.count) , 0) AS sum_view, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
            IFNULL(SUM(VIEW_COUNT.count) * CL3.view_score, 0) + IFNULL(SUM(LIKE_COUNT.count) * CL3.like_score, 0)  + IFNULL(PUSH_COUNT.sum_push * CL3.push_score, 0 ) AS score,
            UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no
          FROM UPLOAD_POSSIBLE_USER
            INNER JOIN USER ON USER.user_no = UPLOAD_POSSIBLE_USER.user_no
            INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND CL4.is_open = 1
              AND CL4.start_time <= NOW()
            INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = CL4.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW()
            LEFT OUTER JOIN VIDEO ON VIDEO.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND VIDEO.user_no = UPLOAD_POSSIBLE_USER.user_no AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
            LEFT OUTER JOIN (
              SELECT target_no, COUNT(active_log_no) AS count
                FROM ACTIVE_LOG
                WHERE gubun = 'like_video' 
                  AND created_at >= ${
                    startDate
                      ? escapeQuot(startDate)
                      : `(
                          SELECT start_time
                          FROM CATEGORY_LEVEL4
                          WHERE category_level4_no = ${category4No}
                        )`
                  } 
                  AND created_at < ${escapeQuot(endDate)}
                GROUP BY target_no
            ) AS LIKE_COUNT ON LIKE_COUNT.target_no = VIDEO.video_no
            LEFT OUTER JOIN (
              SELECT target_no, COUNT(active_log_no) AS count
                FROM ACTIVE_LOG
                WHERE gubun = 'view_video' 
                  AND created_at >= ${
                    startDate
                      ? escapeQuot(startDate)
                      : `(
                          SELECT start_time
                          FROM CATEGORY_LEVEL4
                          WHERE category_level4_no = ${category4No}
                        )`
                  } 
                  AND created_at < ${escapeQuot(endDate)}
                GROUP BY target_no
              ) AS VIEW_COUNT ON VIEW_COUNT.target_no = VIDEO.video_no
              LEFT OUTER JOIN (
              SELECT dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
              FROM PUSH_LOG
              WHERE PUSH_LOG.gubun = 'PUSH' 
                AND category_level4_no = ${category4No} 
                AND created_at >= ${
                  startDate
                    ? escapeQuot(startDate)
                    : `(
                        SELECT start_time
                        FROM CATEGORY_LEVEL4
                        WHERE category_level4_no = ${category4No}
                      )`
                } 
                AND created_at < ${escapeQuot(endDate)}
              GROUP BY dreamer_no
            ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = UPLOAD_POSSIBLE_USER.user_no
          WHERE UPLOAD_POSSIBLE_USER.type = 'artist' 
            AND UPLOAD_POSSIBLE_USER.is_push = 1 
            AND UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
          GROUP BY UPLOAD_POSSIBLE_USER.user_no
          ORDER BY score DESC
        ) AS TEMP
        WHERE score > 0
        ORDER BY ranking ASC
      )  AS TEMP_RANK
      WHERE user_no = ${userNo}
    `);
  }

  // 푸쉬점수로만 라운드 랭크 조회
  async getRoundRankListByPush({ startDate, endDate, category4No, limit }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    return await getAll(`
      SELECT RANK() OVER (ORDER BY TEMP.sum_push DESC) AS ranking,
        TEMP.user_no, TEMP.nickname, TEMP.user_photo,
        IFNULL(CAST(TEMP.sum_push AS UNSIGNED),0) AS sum_push,
        TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
      FROM (
        SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
          UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no
        FROM UPLOAD_POSSIBLE_USER
          INNER JOIN USER ON USER.user_no = UPLOAD_POSSIBLE_USER.user_no
          LEFT OUTER JOIN (
            SELECT dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
            FROM PUSH_LOG
            WHERE PUSH_LOG.gubun = 'PUSH' AND category_level4_no = ${category4No} AND created_at >= ${escapeQuot(
      startDate
    )} AND created_at < ${escapeQuot(endDate)}
            GROUP BY dreamer_no
          ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = UPLOAD_POSSIBLE_USER.user_no
        WHERE UPLOAD_POSSIBLE_USER.type = 'artist' AND UPLOAD_POSSIBLE_USER.is_push = 1 AND UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
        GROUP BY UPLOAD_POSSIBLE_USER.user_no
        ORDER BY sum_push DESC
      ) AS TEMP
      WHERE TEMP.sum_push > 0
      ORDER BY ranking ASC
      ${limitCondition}
    `);
  }

  // 해당 시즌의 드리머들의 랭크 조회
  async getRoundRankListByDreamerList({
    startDate,
    endDate,
    dreamers,
    category4No,
    limit,
  }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    return await getAll(`
      SELECT TEMP_RANK.*
      FROM (
        SELECT RANK() OVER (ORDER BY TEMP.score DESC) AS ranking,
          TEMP.user_no, TEMP.nickname, TEMP.user_photo,
          CAST(IFNULL(TEMP.sum_like ,0) AS UNSIGNED) AS sum_like,
          CAST(IFNULL(TEMP.sum_view ,0) AS UNSIGNED) AS sum_view,
          CAST(IFNULL(TEMP.sum_push ,0) AS UNSIGNED) AS sum_push,
          CAST(IFNULL(TEMP.score ,0) AS UNSIGNED) AS score,
          TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
        FROM (
          SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(SUM(LIKE_COUNT.count), 0) AS sum_like, IFNULL(SUM(VIEW_COUNT.count) , 0) AS sum_view, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
            IFNULL(SUM(VIEW_COUNT.count) * CL3.view_score, 0) + IFNULL(SUM(LIKE_COUNT.count) * CL3.like_score, 0)  + IFNULL(PUSH_COUNT.sum_push * CL3.push_score, 0 ) AS score,
            UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no
          FROM UPLOAD_POSSIBLE_USER
            INNER JOIN USER ON USER.user_no = UPLOAD_POSSIBLE_USER.user_no
            INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND CL4.is_open = 1
              AND CL4.start_time <= NOW()
            INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = CL4.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW()
            LEFT OUTER JOIN VIDEO ON VIDEO.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND VIDEO.user_no = UPLOAD_POSSIBLE_USER.user_no AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
            LEFT OUTER JOIN (
              SELECT target_no, COUNT(active_log_no) AS count
                FROM ACTIVE_LOG
                WHERE gubun = 'like_video' AND created_at >= ${escapeQuot(
                  startDate
                )} AND created_at < ${escapeQuot(endDate)}
                GROUP BY target_no
            ) AS LIKE_COUNT ON LIKE_COUNT.target_no = VIDEO.video_no
            LEFT OUTER JOIN (
              SELECT target_no, COUNT(active_log_no) AS count
                FROM ACTIVE_LOG
                WHERE gubun = 'view_video' AND created_at >= ${escapeQuot(
                  startDate
                )} AND created_at < ${escapeQuot(endDate)}
                GROUP BY target_no
              ) AS VIEW_COUNT ON VIEW_COUNT.target_no = VIDEO.video_no
              LEFT OUTER JOIN (
              SELECT dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
              FROM PUSH_LOG
              WHERE PUSH_LOG.gubun = 'PUSH' AND category_level4_no = ${category4No} AND created_at >= ${escapeQuot(
      startDate
    )} AND created_at < ${escapeQuot(endDate)}
              GROUP BY dreamer_no
            ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = UPLOAD_POSSIBLE_USER.user_no
          WHERE UPLOAD_POSSIBLE_USER.type = 'artist' AND UPLOAD_POSSIBLE_USER.is_push = 1 AND UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
          GROUP BY UPLOAD_POSSIBLE_USER.user_no
          ORDER BY score DESC
        ) AS TEMP
        WHERE score > 0
        ORDER BY ranking ASC
        ${limitCondition}
      ) AS TEMP_RANK
      WHERE TEMP_RANK.user_no IN (${dreamers.toString()})
    `);
  }

  // 누적 push를 가장 많이 한 프로듀서
  async getProducerRankListInThisWeek({ limit }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    return await getAll(`
    SELECT RANK() OVER (ORDER BY TEMP.sum_push DESC) AS \`ranking\`, TEMP.user_no, TEMP.nickname, TEMP.user_photo, TEMP.sum_push, 
      TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no
    FROM (
      SELECT USER.user_no, USER.nickname, USER.user_photo, CAST(IFNULL(SUM(PUSH_LOG.used_have_push), 0) AS UNSIGNED) AS sum_push, 
        PUSH_LOG.category_level1_no, PUSH_LOG.category_level2_no, PUSH_LOG.category_level3_no
      FROM PUSH_LOG
        INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW()
        INNER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
      WHERE PUSH_LOG.gubun = 'PUSH' AND ${escapeQuot(
        moment().startOf("week").format("YYYY-MM-DD 00:00:00")
      )} <= PUSH_LOG.created_at AND PUSH_LOG.created_at < ${escapeQuot(
      moment().format("YYYY-MM-DD HH:mm:ss")
    )}
      GROUP BY PUSH_LOG.producer_no
      HAVING sum_push > 0
      ORDER BY sum_push DESC
    ) AS TEMP

      ${limitCondition}
    `);
  }

  // 시즌 누적 push를 가장 많이 한 프로듀서
  async getProducerRankListByCategroy3No({ limit, category3No }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    return await getAll(`
      SELECT RANK() OVER (ORDER BY TEMP.sum_push DESC) AS \`ranking\`, TEMP.user_no, TEMP.nickname, TEMP.user_photo, TEMP.sum_push, TEMP.category_level3_no
      FROM (
        SELECT USER.user_no, USER.nickname, USER.user_photo, PUSH.total_push AS sum_push, PUSH.category_level3_no
        FROM PUSH
          INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = PUSH.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW()
          INNER JOIN USER ON USER.user_no = PUSH.user_no
        WHERE PUSH.category_level3_no = ${category3No}
        ORDER BY sum_push DESC
      ) AS TEMP
      WHERE TEMP.sum_push > 0
      ${limitCondition}
    `);
  }

  // // 해당 날짜 안에 push를 가장 많이 한 프로듀서
  // async getRankerProducerByCategoryAndDate({ limit, categoryNo }) {
  //   const limitCondition = limit ? `LIMIT ${limit}` : "";

  //   return await getAll(`
  //     SELECT USER.user_no, USER.nickname, USER.user_photo, CAST(sum(PUSH_LOG.push) as UNSIGNED) AS sum_push
  //     FROM PUSH_LOG
  //       INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no  AND CL3.is_open = 1 AND CL3.open_time <= NOW() AND CL3.start_time <= NOW() AND NOW() < CL3.end_time
  //       INNER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
  //     WHERE PUSH_LOG.category_level3_no = ${categoryNo} AND CL3.start_time <= PUSH_LOG.created_at AND PUSH_LOG.created_at < CL3.end_time
  //     GROUP BY PUSH_LOG.producer_no
  //     HAVING sum_push > 0
  //     ORDER BY sum_push DESC
  //     ${limitCondition}
  //     `);
  // }

  // 해당 시즌에 드리머에 대한 프로듀서의 랭킹
  async getProducerRankListInSeasonByDreamer({
    me,
    dreamerNo,
    category4No,
    limit,
  }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const withMe = me
      ? `
      , MY_RANK AS (
        SELECT *
        FROM DREAMER_RANK
        WHERE \`USER.user_no\` = ${me}
      )
    `
      : "";

    const unionMe = me
      ? `UNION 
      SELECT *
      FROM MY_RANK`
      : "";

    return await getAll(`
      WITH DREAMER_RANK AS (
        SELECT TEMP_RANK.ranking, TEMP_RANK.sum_push, TEMP_RANK.total_push, CAST(TEMP_RANK.sum_push / TEMP_RANK.total_push * 100 AS DECIMAL(4,1)) AS ratio,        
          TEMP_RANK.user_no AS \`USER.user_no\`, TEMP_RANK.nickname AS \`USER.nickname\`, TEMP_RANK.user_photo AS \`USER.user_photo\`
        FROM (
          SELECT RANK() OVER (ORDER BY TEMP.sum_push DESC) AS \`ranking\`, TEMP.sum_push,
          (
            SELECT SUM(PUSH)
            FROM PUSH_LOG
              LEFT OUTER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
            WHERE PUSH_LOG.gubun = 'PUSH' AND PUSH_LOG.dreamer_no = ${dreamerNo} AND PUSH_LOG.category_level4_no = ${category4No}
          ) AS total_push,
          TEMP.user_no, TEMP.nickname, TEMP.user_photo
          FROM (
            SELECT PUSH_LOG.producer_no AS user_no, IFNULL(USER.nickname, '( 탈퇴한 회원입니다. )') AS nickname, IFNULL(USER.user_photo, ${escapeQuot(
              DEFAULT_USER_IMAGE
            )}) AS user_photo, SUM(PUSH) AS sum_push
            FROM PUSH_LOG
              LEFT OUTER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
            WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${dreamerNo} AND category_level4_no = ${category4No}
            GROUP BY producer_no
            ) AS TEMP
        ) AS TEMP_RANK
      )
      ${withMe}
      SELECT *
      FROM ( 
        SELECT *
        FROM DREAMER_RANK
        ${limitCondition}
      ) AS TEMP_DREAMER_RANK
      ${unionMe}
    `);

    // return await getAll(`
    //   SELECT TEMP_RANK.ranking, TEMP_RANK.sum_push, TEMP_RANK.total_push, CAST(TEMP_RANK.sum_push / TEMP_RANK.total_push * 100 AS DECIMAL(4,1)) AS ratio,
    //     TEMP_RANK.user_no AS \`USER.user_no\`, TEMP_RANK.nickname AS \`USER.nickname\`, TEMP_RANK.user_photo AS \`USER.user_photo\`
    //   FROM (
    //     SELECT RANK() OVER (ORDER BY TEMP.sum_push DESC) AS \`ranking\`, TEMP.sum_push,
    //     (
    //       SELECT SUM(PUSH)
    //       FROM PUSH_LOG
    //         INNER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
    //       WHERE PUSH_LOG.dreamer_no = ${dreamerNo} AND PUSH_LOG.category_level4_no = ${category4No}
    //     ) AS total_push,
    //     TEMP.user_no, TEMP.nickname, TEMP.user_photo
    //     FROM (
    //       SELECT USER.user_no, USER.nickname, USER.user_photo, SUM(PUSH) AS sum_push
    //       FROM PUSH_LOG
    //         INNER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
    //       WHERE dreamer_no = ${dreamerNo} AND category_level4_no = ${category4No}
    //       GROUP BY producer_no
    //     ) AS TEMP
    //   ) AS TEMP_RANK
    //   ${limitCondition}
    // `);
  }

  // 해당 시즌에 드리머에 대한 나의 랭킹
  async getMyProducerRankInSeasonByDreamer({ me, dreamerNo, category4No }) {
    return await getOne(`
      SELECT TEMP_RANK.*
      FROM (
        SELECT RANK() OVER (ORDER BY TEMP.sum_push DESC) AS \`ranking\`, 
        CAST(IFNULL(TEMP.sum_push, 0) AS UNSIGNED) AS sum_push, 
        CAST(IFNULL(TEMP.total_push, 0) AS UNSIGNED) AS total_push, 
        CAST(TEMP.sum_push / TEMP.total_push * 100 AS DECIMAL(4,1)) AS ratio,
        TEMP.user_no AS \`USER.user_no\`, TEMP.nickname AS \`USER.nickname\`, TEMP.user_photo AS \`USER.user_photo\` 
        FROM (
          SELECT USER.user_no, USER.nickname, USER.user_photo, SUM(PUSH) AS sum_push, 
          (
            SELECT SUM(PUSH)
            FROM PUSH_LOG
               INNER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
            WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${dreamerNo} AND category_level4_no = ${category4No}
         ) AS total_push
          FROM PUSH_LOG
            INNER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
          WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${dreamerNo} AND category_level4_no = ${category4No}
          GROUP BY producer_no
        ) AS TEMP
      ) AS TEMP_RANK
      WHERE TEMP_RANK.\`USER.user_no\` = ${me}
    `);
  }

  /*
   * 다양한 조건을 통해 유저의 랭크 조회
   *  다양한 조건이란,
   *  gubun - 일별 주별 월별 라운드별
   *  category
   *  userNo
   *  date
   *
   */

  async getUserRankBycategory3NoAndCondition({
    gubun,
    category3No,
    userNo,
    dates,
  }) {
    if (!dates || (dates && !dates.length)) {
      console.log("dates를 넣어주세요");
      return [];
    }

    return await getAll(`
      SELECT ranking, user_no, gubun, date
      FROM RANK_LOG
      WHERE gubun = ${escapeQuot(
        gubun
      )} AND user_no = ${userNo} AND category_level3_no = ${category3No}
        AND date IN ('${dates.join("', '")}') AND ranking <= 3
    
    `);
  }

  /**
   * 라운드에서 드리머의 순위를 가져온다.
   */
  async getRoundRankByDreamer({ startDate, endDate, category4No, userNo }) {
    return await getOne(`
      WITH TEMP_RANK AS (
        SELECT RANK() OVER (ORDER BY TEMP.score DESC) AS ranking,
          TEMP.user_no, TEMP.nickname, TEMP.user_photo,
          CAST(IFNULL(TEMP.sum_like ,0) AS UNSIGNED) AS sum_like,
          CAST(IFNULL(TEMP.sum_view ,0) AS UNSIGNED) AS sum_view,
          CAST(IFNULL(TEMP.sum_push ,0) AS UNSIGNED) AS sum_push,
          CAST(IFNULL(TEMP.score ,0) AS UNSIGNED) AS score,
          TEMP.category_level1_no, TEMP.category_level2_no, TEMP.category_level3_no, TEMP.category_level4_no
        FROM (
          SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(SUM(LIKE_COUNT.count), 0) AS sum_like, IFNULL(SUM(VIEW_COUNT.count) , 0) AS sum_view, IFNULL(PUSH_COUNT.sum_push, 0 ) AS sum_push,
            IFNULL(SUM(VIEW_COUNT.count) * CL3.view_score, 0) + IFNULL(SUM(LIKE_COUNT.count) * CL3.like_score, 0)  + IFNULL(PUSH_COUNT.sum_push * CL3.push_score, 0 ) AS score,
            UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no
          FROM UPLOAD_POSSIBLE_USER
            INNER JOIN USER ON USER.user_no = UPLOAD_POSSIBLE_USER.user_no
            INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND CL4.is_open = 1
              AND CL4.start_time <= NOW()
            INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = CL4.category_level3_no AND CL3.is_open = 1 AND CL3.start_time <= NOW()
            LEFT OUTER JOIN VIDEO ON VIDEO.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND VIDEO.user_no = UPLOAD_POSSIBLE_USER.user_no AND VIDEO.status_no = 6 AND VIDEO.flag <> 4
            LEFT OUTER JOIN (
              SELECT target_no, COUNT(active_log_no) AS count
                FROM ACTIVE_LOG
                WHERE gubun = 'like_video' AND created_at >= ${escapeQuot(
                  startDate
                )} AND created_at < ${escapeQuot(endDate)}
                GROUP BY target_no
            ) AS LIKE_COUNT ON LIKE_COUNT.target_no = VIDEO.video_no
            LEFT OUTER JOIN (
              SELECT target_no, COUNT(active_log_no) AS count
                FROM ACTIVE_LOG
                WHERE gubun = 'view_video' AND created_at >= ${escapeQuot(
                  startDate
                )} AND created_at < ${escapeQuot(endDate)}
                GROUP BY target_no
              ) AS VIEW_COUNT ON VIEW_COUNT.target_no = VIDEO.video_no
              LEFT OUTER JOIN (
              SELECT dreamer_no, CAST(SUM(push) AS UNSIGNED) AS sum_push
              FROM PUSH_LOG
              WHERE PUSH_LOG.gubun = 'PUSH' AND category_level4_no = ${category4No} AND created_at >= ${escapeQuot(
      startDate
    )} AND created_at < ${escapeQuot(endDate)}
              GROUP BY dreamer_no
            ) AS PUSH_COUNT ON PUSH_COUNT.dreamer_no = UPLOAD_POSSIBLE_USER.user_no
          WHERE UPLOAD_POSSIBLE_USER.type = 'artist' AND UPLOAD_POSSIBLE_USER.is_push = 1 AND UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
          GROUP BY UPLOAD_POSSIBLE_USER.user_no
          ORDER BY score DESC
        ) AS TEMP
        WHERE score > 0
        ORDER BY ranking ASC
      ), MY_RANK AS (
        SELECT *
        FROM TEMP_RANK
        WHERE user_no = ${userNo}
      )
      SELECT MY_RANK.*,
        (
          SELECT MAX(TEMP_RANK.ranking)
          FROM TEMP_RANK
          WHERE TEMP_RANK.ranking < MY_RANK.ranking
        ) AS \`PREV.prev_rank\`,
          (
          SELECT MAX(TEMP_RANK.sum_push)
          FROM TEMP_RANK
          WHERE TEMP_RANK.ranking < MY_RANK.ranking
        ) AS \`PREV.prev_sum_push\`,	(
          SELECT MIN(TEMP_RANK.ranking)
          FROM TEMP_RANK
          WHERE TEMP_RANK.ranking > MY_RANK.ranking
        ) AS \`NEXT.next_rank\`,	(
          SELECT MIN(TEMP_RANK.sum_push)
          FROM TEMP_RANK
          WHERE TEMP_RANK.ranking > MY_RANK.ranking
        ) AS \`NEXT.next_sum_push\`
      FROM TEMP_RANK, MY_RANK
      GROUP BY MY_RANK.user_no
    `);
  }
}

module.exports = RankQuery;
