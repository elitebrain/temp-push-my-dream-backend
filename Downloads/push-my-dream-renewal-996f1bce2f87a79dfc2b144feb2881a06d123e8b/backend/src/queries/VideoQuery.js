const moment = require("moment");

const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot } = require("shared/functions");
const { REAL_TIME_HOURS, HOT_DAYS } = require("shared/constants");

class VideoQuery {
  // 비디오 아이디값으로 비디오 조회
  async getVideoInfoByVideoNo({ videoNo }) {
    return await getOne(`
        SELECT * FROM VIDEO
        WHERE video_no = ${videoNo}
      `);
  }
  // // 내가 등록한 영상 조회 (mypage)
  // async getMyVideoList(userNo) {
  //   console.log("gasdadsadadg");
  //   const res = await getAll(`
  //     SELECT VIDEO.video_no, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.count_like, VIDEO.count_view, VIDEO.video_no, VIDEO.type, VIDEO.url_original, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.thumbnail,
  //       \`STATUS\`.\`status_no\` AS  \`STATUS.status_no\`, \`STATUS\`.\`status_description\` AS  \`STATUS.status_description\`
  //     FROM VIDEO
  //       LEFT OUTER JOIN STATUS ON STATUS.status_no = VIDEO.status_no
  //     WHERE user_no = ${userNo} and flag <= 2
  //     ORDER BY VIDEO.created_at DESC
  //   `);

  //   return res;
  // }
  // 신규 영상 조회 (/main)
  async getNewVideoMain({ category }) {
    const newVideoList = await getAll(`
      SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, EMERGENZA_TEAM.team_name, USER.nickname, USER.user_no
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
      WHERE VIDEO.flag = 0 and status_no = 6 ${
        !!category ? `and category_level2_no = ${category}` : ""
      }
      ORDER BY VIDEO.created_at DESC
      LIMIT 12
    `);
    return newVideoList;
  }
  // 에머겐자 영상 조회 (/main)
  async getEmergenzaVideoMain() {
    const newVideoList = await getAll(`
      SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, EMERGENZA_TEAM.team_name, USER.nickname, USER.user_no
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
      WHERE VIDEO.flag = 0 and status_no = 6 AND VIDEO.category_level1_no = 3
      ORDER BY VIDEO.created_at DESC
      LIMIT 12
    `);
    return newVideoList;
  }
  // 핫톡 영상 조회 (/main)
  async getHotVideoMain({ category }) {
    const res = await getAll(`
      SELECT VIDEO.video_no, VIDEO.thumbnail, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no,
        COUNT(COMMENT.comment_no) AS count, USER.user_no
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
      WHERE VIDEO.flag = 0 and status_no = 6 ${
        !!category ? `and category_level2_no = ${category}` : ""
      }
      GROUP BY VIDEO.video_no, COMMENT.video_no
      ORDER BY count DESC, VIDEO.created_at DESC
      LIMIT 10
    `);
    return res.filter((v) => v.count > 0);
  }
  // 신규 영상 조회 전체 (/new-video)
  async getNewVideo({ offset, limit, category }) {
    const total = await getOne(`
      SELECT COUNT(DISTINCT video_no) AS count
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
      WHERE flag = 0 and status_no = 6 ${
        !!category ? `and category_level2_no = ${category}` : ""
      }
    `);
    const newVideoList = await getAll(`
      SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like, VIDEO.count_view, EMERGENZA_TEAM.team_name, USER.nickname, USER.user_no
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
      WHERE flag = 0 and status_no = 6 ${
        !!category ? `and category_level2_no = ${category}` : ""
      }
      ORDER BY VIDEO.created_at DESC
      LIMIT ${offset}, ${limit}
    `);

    if (
      (!Number(offset) && newVideoList.length === parseInt(limit)) ||
      (!!Number(offset) && offset >= parseInt(limit))
    ) {
      return {
        count: total.count,
        offset: parseInt(offset, 10) + parseInt(newVideoList.length, 10),
        newVideoList,
      };
      // if (newVideoList.length === parseInt(limit)) {
      //   return {
      //     count: total.count,
      //     offset: parseInt(offset, 10) + parseInt(limit, 10),
      //     newVideoList
      //   };
    } else {
      return { count: total.count, offset: total.count, newVideoList };
    }
  }
  // 핫톡 영상 조회 전체 (/hot-video)
  async getHotVideo({ offset, limit, category }) {
    const total = await getOne(`
      SELECT COUNT(DISTINCT VIDEO.video_no) AS count
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        INNER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
      WHERE VIDEO.flag = 0 and VIDEO.status_no = 6 ${
        !!category ? `and category_level2_no = ${category}` : ""
      }
    `);
    const hotVideoList = await getAll(`
      SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like, VIDEO.count_view, EMERGENZA_TEAM.team_name, USER.nickname, USER.user_no
      FROM VIDEO
        INNER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
      WHERE VIDEO.flag = 0 and status_no = 6 ${
        !!category ? `and category_level2_no = ${category}` : ""
      }
      GROUP BY VIDEO.video_no, COMMENT.video_no
      ORDER BY COUNT(COMMENT.comment_no) DESC, VIDEO.created_at DESC
      LIMIT ${offset}, ${limit}
    `);
    if (hotVideoList.length === parseInt(limit)) {
      return {
        count: total.count,
        offset: parseInt(offset, 10) + parseInt(limit, 10),
        hotVideoList,
      };
    } else {
      return {
        count: total.count,
        offset: total.count,
        hotVideoList,
      };
    }
  }

  async getOfficialVideo({ offset, limit, category }) {
    const total = await getOne(`
      SELECT COUNT(DISTINCT VIDEO.video_no) AS count
      FROM VIDEO
        INNER JOIN (SELECT video_official_info_no, video_no, admin_no, open_scheduled_time, created_at FROM VIDEO_OFFICIAL_INFO) AS VOI ON VOI.video_no = VIDEO.video_no
        INNER JOIN (SELECT video_official_category_no, video_official_info_no, category_level2_no FROM VIDEO_OFFICIAL_CATEGORY ${
          !!category ? `WHERE category_level2_no = ${category}` : ""
        }) AS VOC ON VOC.video_official_info_no = VOI.video_official_info_no
      WHERE VIDEO.flag = 0 and VIDEO.status_no = 6 and VIDEO.category_level1_no = 4 and VIDEO.category_level2_no = 7 and VIDEO.category_level3_no = 5
    `);
    const officialVideoList = await getAll(`
      SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like, VIDEO.count_view
      FROM VIDEO
        LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
        INNER JOIN (SELECT video_official_info_no, video_no, admin_no, open_scheduled_time, created_at FROM VIDEO_OFFICIAL_INFO) AS VOI ON VOI.video_no = VIDEO.video_no
        INNER JOIN (SELECT video_official_category_no, video_official_info_no, category_level2_no FROM VIDEO_OFFICIAL_CATEGORY ${
          !!category ? `WHERE category_level2_no = ${category}` : ""
        }) AS VOC ON VOC.video_official_info_no = VOI.video_official_info_no
      
      WHERE VIDEO.flag = 0 and status_no = 6 and VIDEO.category_level1_no = 4 and VIDEO.category_level2_no = 7 and VIDEO.category_level3_no = 5 
      GROUP BY VIDEO.video_no, COMMENT.video_no
      ORDER BY COUNT(COMMENT.comment_no) DESC, VIDEO.created_at DESC
      LIMIT ${offset}, ${limit}
    `);

    // console.log(!);
    if (
      (!Number(offset) && officialVideoList.length === parseInt(limit)) ||
      (!!Number(offset) && offset >= parseInt(limit))
    ) {
      return {
        count: total.count,
        offset: parseInt(offset, 10) + parseInt(officialVideoList.length, 10),
        officialVideoList,
      };
    } else {
      return {
        count: total.count,
        offset: total.count,
        officialVideoList,
      };
    }
  }
  // TOP 10 영상 조회 (/main)
  async getToptenVideo({ category }) {
    const toptenVideoList = await getAll(`
      SELECT VIDEO.video_no, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like, USER.user_name, USER.nickname, EMERGENZA_TEAM.team_name,
        SUBSTR(VOTE_ITEM.vote_item_url, 29), VOTE_ITEM.vote_item_no, COUNT(VOTE_ITEM_USER.vote_item_user_no) AS countVote
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
        LEFT OUTER JOIN VOTE_ITEM ON SUBSTR(VOTE_ITEM.vote_item_url, 29) = VIDEO.video_no
        INNER JOIN VOTE_ITEM_USER ON VOTE_ITEM_USER.vote_item_no = VOTE_ITEM.vote_item_no
      WHERE flag = 0 and status_no = 6 AND SUBSTR(VOTE_ITEM.vote_item_url, 29) IS NOT NULL ${
        !!category ? `and category_level2_no = ${category}` : ""
      }
      GROUP BY VOTE_ITEM.vote_item_no
      ORDER BY countVote DESC
      LIMIT 10
      `);
    //   SELECT video_no, VIDEO.category_level1_no, category_level2_no, category_level3_no, title, thumbnail, VIDEO.count_like, user_name, nickname, EMERGENZA_TEAM.team_name
    //   FROM VIDEO
    //     INNER JOIN USER ON USER.user_no = VIDEO.user_no
    //     LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
    //   WHERE flag = 0 and status_no = 6 ${
    //     !!category ? `and category_level2_no = ${category}` : ""
    //   }
    //   ORDER BY VIDEO.count_like DESC
    //   LIMIT 10
    return toptenVideoList;
  }

  // 영상 공개|비공개 수정 (/mypage)
  async modifyIsOpen({ videoNo, flag, userNo }, config) {
    const res = await modify(
      `
      UPDATE VIDEO SET flag = ${flag} WHERE video_no = ${videoNo} AND user_no = ${userNo}
    `,
      config
    );

    return res;
  }

  // 영상 삭제 (/mypage)
  async removeVideo({ videoNo, userNo }, config) {
    await remove(
      `
      DELETE FROM VIDEO WHERE video_no = ${videoNo} AND user_no = ${userNo}
    `,
      config
    );
    return "delete success";
  }

  // 작업 상태 조회
  async getJobStatus(jobId) {
    const res = await getOne(`
      SELECT VIDEO.video_no, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.count_like, VIDEO.count_view, VIDEO.video_no, VIDEO.type, VIDEO.url_original, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.thumbnail, 
        \`STATUS\`.\`status_no\` AS  \`STATUS.status_no\`, \`STATUS\`.\`status_description\` AS  \`STATUS.status_description\`
      FROM VIDEO
        LEFT OUTER JOIN STATUS ON STATUS.status_no = VIDEO.status_no
      WHERE job_id = ${escapeQuot(jobId)}

    `);
    return res;
  }

  // 비디오 조회
  async getVideo({ videoNo, userNo }, config) {
    const res = await getOne(
      `
    SELECT VIDEO.video_no, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.count_like, VIDEO.count_view, VIDEO.url_original, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.thumbnail, VIDEO.status_no, VIDEO.created_at,
      USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.user_photo AS \`USER.user_photo\`, USER.nickname AS \`USER.nickname\`, active_log_no
    FROM VIDEO
      INNER JOIN USER ON USER.user_no = VIDEO.user_no
      LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
        userNo || null
      } AND ACTIVE_LOG.target_no = ${videoNo} AND gubun = 'like_video'
   WHERE video_no = ${videoNo}
    `,
      config
    );
    // WHERE video_no = ${videoNo} AND status_no = 6 AND is_open = 1
    // `);
    return res;
  }

  // 유저 아이디별 비디오 목록 조회
  async getVideoByUserNo({ userNo }, config) {
    return await getAll(
      `
        SELECT * 
        FROM VIDEO
        WHERE user_no = ${userNo} AND flag <= 2
      `,
      config
    );
  }

  // 비디오 목록의 링크 삭제
  async deleteVideoFileByVideoList({ flag, videoList }, config) {
    return await remove(
      `
      UPDATE VIDEO SET flag=${flag}, original_file_name = null, url_original = null, url_480p = null, url_720p = null, url_1080p = null, duration = 0, thumbnail = null, job_id = null
      WHERE video_no IN (${videoList.toString()})
  `,
      config
    );
  }

  // 조회수 증가
  async modifyVideoView({ videoNo, userNo, tempId }, config) {
    // ACTIVE_LOG 테이블에 로그 남기기
    await set(
      `
      INSERT INTO ACTIVE_LOG (target_no, user_no, temp_id, gubun) VALUES (${videoNo}, ${
        userNo || null
      }, ${tempId || null}, 'view_video')
    `,
      config
    );
    // VIDEO 테이블에 조회수 업데이트
    const res = await modify(
      `
      UPDATE VIDEO SET count_view = count_view + 1 WHERE video_no = ${videoNo}
    `,
      config
    );
    return res;
  }

  // 에머겐자 비디오 조회
  async getEmergenzaVideo(userNo, selectCategory) {
    return await getAll(`
      SELECT VIDEO.video_no, VIDEO.description, VIDEO.original_file_name, VIDEO.url_1080p, VIDEO.url_720p, VIDEO.url_480p, VIDEO.duration
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
      WHERE VIDEO.user_no = ${userNo} AND category_level3_no =${selectCategory} AND status_no IN (4, 6)
    `);
  }

  // 추천
  async modifyVideoLike({ videoNo, userNo }, config) {
    // ACTIVE_LOG 테이블에 로그 남기기
    await set(
      `
      INSERT INTO ACTIVE_LOG (target_no, user_no, gubun) VALUES (${videoNo}, ${userNo}, 'like_video')
    `,
      config
    );
    // VIDEO 테이블에 좋아요 업데이트 (+1)
    const res = await modify(
      `
      UPDATE VIDEO SET count_like = count_like + 1 WHERE video_no = ${videoNo}
    `,
      config
    );
    return res;
  }
  // 추천 취소
  async removeVideoLike({ videoNo, userNo }, config) {
    // ACTIVE_LOG 테이블에 로그 지우기
    await remove(
      `
      DELETE FROM ACTIVE_LOG WHERE target_no = ${videoNo} AND user_no = ${userNo}
    `,
      config
    );
    // VIDEO 테이블에 좋아요 업데이트 (-1)
    const res = await modify(
      `
      UPDATE VIDEO SET count_like = count_like - 1 WHERE video_no = ${videoNo}
      `,
      config
    );
    return res;
  }

  // 영상 갯수 조회
  async getMyVideoCount(userNo) {
    const res = await getOne(`
      SELECT COUNT(VIDEO.video_no)  as count
      FROM VIDEO
      WHERE user_no = ${userNo} AND status_no = 6
    `);
    return res;
  }

  // 영상 설명 수정
  async modifyDesc(videoNo, description) {
    const res = await modify(`
      UPDATE VIDEO SET description = ${escapeQuot(
        description
      )} WHERE video_no = ${videoNo}
    `);
    return res;
  }

  // 영상 목록 조회 (최초 viewVideo접속 시)
  async getVideoList({ userNo, fetchList = [], isOfficial, type, isAdmin }) {
    const condition = !isAdmin
      ? `${
          type === "my" ? "VIDEO.flag < 3" : "VIDEO.flag = 0"
        }${" AND VIDEO.status_no = 6 AND"}`
      : "";
    // const categoryCondition = category
    //   ? `VIDEO.category_level2_no = ${category} AND `
    //   : "";

    let videoList = [];

    // fetchList가 존재시에만 쿼리가 동작한다.
    if (Boolean(fetchList.length)) {
      if (!isOfficial) {
        videoList = await getAll(`
          SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.category_level4_no, VIDEO.category_level4_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at, EMERGENZA_TEAM.team_name,
            T.thumbnail_url AS start_thumbnail_url,
            USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.user_photo AS \`USER.user_photo\`, USER.nickname AS \`USER.nickname\`, active_log_no, COUNT(COMMENT.comment_no) AS countComment
          FROM VIDEO
            INNER JOIN USER ON USER.user_no = VIDEO.user_no
            LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
              userNo || null
            } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
            LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
            LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
            LEFT OUTER JOIN (
              SELECT video_no, thumbnail_url
              FROM THUMBNAIL
              GROUP BY video_no
            ) AS T ON T.video_no = VIDEO.video_no
          WHERE ${condition} VIDEO.video_no IN (${fetchList.toString()})
          GROUP BY VIDEO.video_no
          LIMIT ${fetchList.length}
        `);
      } else {
        videoList = await getAll(`
          SELECT VIDEO.video_no, VIDEO.flag, VIDEO.caegory_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.category_level4_no, VIDEO.category_level4_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at ,
          T.thumbnail_url AS start_thumbnail_url
          FROM VIDEO
            LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
              userNo || null
            } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
            LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
            LEFT OUTER JOIN (
              SELECT video_no, thumbnail_url
              FROM THUMBNAIL
              GROUP BY video_no
            ) AS T ON T.video_no = VIDEO.video_no
          WHERE ${adminCondition} VIDEO.video_no IN (${fetchList.toString()})
          GROUP BY VIDEO.video_no
          LIMIT ${fetchList.length}
        `);
      }

      // 데이터베이스에 들어온 값들은 순서대로 나타나기 때문에 fetchList순서대로 정렬해준다.
      videoList = fetchList.map((v) => {
        const index = videoList.findIndex(
          (video) => Number(v) === video.video_no
        );

        return index === -1
          ? null
          : videoList.splice(
              videoList.findIndex((video) => Number(v) === video.video_no),
              1
            )[0];
      });
    }

    return videoList;
  }

  // 다음 영상 목록 조회 (/video?videoNo=0&listGubun=new)
  async getNextVideoList({
    videoNo,
    userNo,
    offset,
    limit,
    listGubun,
    currentUserNo,
    category,
    isAdmin,
  }) {
    if (listGubun === "new") {
      const videoList = await getAll(`
        SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at, EMERGENZA_TEAM.team_name,
          USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.user_photo AS \`USER.user_photo\`, USER.nickname AS \`USER.nickname\`, active_log_no, IFNULL(CM.COUNT, 0) AS countComment
        FROM VIDEO
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
            userNo || null
          } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
          LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
          LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS COUNT FROM COMMENT GROUP BY video_no) AS CM ON CM.video_no = VIDEO.video_no
        WHERE ${
          !isAdmin ? "VIDEO.flag = 0 and status_no = 6 AND" : ""
        } category_level2_no = ${category || ""}
        GROUP BY VIDEO.video_no
        ORDER BY VIDEO.created_at DESC
        LIMIT ${offset}, ${limit}
      `);
      if (videoList.length === parseInt(limit, 10)) {
        return {
          offset: parseInt(offset, 10) + parseInt(limit, 10),
          videoList,
        };
      } else {
        return { offset: null, videoList };
      }
    } else if (listGubun === "hot") {
      const videoList = await getAll(`
        SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, category_level2_no, category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at, EMERGENZA_TEAM.team_name,
          USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.user_photo AS \`USER.user_photo\`, USER.nickname AS \`USER.nickname\`, active_log_no,
          IFNULL(CM.COUNT, 0) AS countComment
        FROM VIDEO
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
            userNo || null
          } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
          LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
          LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
        WHERE ${
          !isAdmin ? "VIDEO.flag = 0 and status_no = 6 AND" : ""
        } category_level2_no = ${category || ""}
        GROUP BY VIDEO.video_no
        ORDER BY countComment DESC, VIDEO.created_at DESC
        LIMIT ${offset}, ${limit}
      `);
      if (videoList.length === parseInt(limit, 10)) {
        return {
          offset: parseInt(offset, 10) + parseInt(limit, 10),
          videoList,
        };
      } else {
        return { offset: null, videoList };
      }
    } else if (listGubun === "official") {
      const videoList = await getAll(`
        SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, category_level2_no, category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at,
          active_log_no, IFNULL(CM.COUNT, 0) AS countComment
        FROM VIDEO
          INNER JOIN (SELECT video_official_info_no, video_no FROM VIDEO_OFFICIAL_INFO WHERE NOW() >= open_scheduled_time ) AS VOI ON VOI.video_no = VIDEO.video_no
          INNER JOIN (SELECT video_official_info_no FROM VIDEO_OFFICIAL_CATEGORY WHERE category_level2_no = ${category}) AS VOC ON VOC.video_official_info_no = VOI.video_official_info_no
          LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
            userNo || null
          } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
            LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS COUNT FROM COMMENT GROUP BY video_no) AS CM ON CM.video_no = VIDEO.video_no
        WHERE ${
          !isAdmin ? "VIDEO.flag = 0 and status_no = 6 AND" : ""
        } category_level1_no= 4 AND category_level2_no = 7 AND category_level3_no = 5
        GROUP BY VIDEO.video_no
        ORDER BY VIDEO.created_at DESC
        LIMIT ${offset}, ${limit}
      `);
      if (videoList.length === parseInt(limit, 10)) {
        return {
          offset: parseInt(offset, 10) + parseInt(limit, 10),
          videoList,
          isOfficial: true,
        };
      } else {
        return { offset: null, videoList, isOfficial: true };
      }
    } else if (listGubun === "user") {
      const videoList = await getAll(`
        SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at, EMERGENZA_TEAM.team_name,
          USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.user_photo AS \`USER.user_photo\`, USER.nickname AS \`USER.nickname\`, active_log_no, IFNULL(CM.COUNT, 0) AS countComment
        FROM VIDEO
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
            userNo || null
          } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
            LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
          LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS COUNT FROM COMMENT GROUP BY video_no) AS CM ON CM.video_no = VIDEO.video_no
        WHERE ${
          !isAdmin ? "VIDEO.flag = 0 AND status_no = 6 AND" : ""
        } VIDEO.user_no = ${currentUserNo}  
        GROUP BY VIDEO.video_no
      `);
      return { offset: null, videoList };
    } else if (listGubun === "topten") {
      // LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${userNo ||
      //   null} AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
      // LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
      const videoList = await getAll(`
          SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at, 
            USER.user_no AS 'USER.user_no', USER.user_name AS 'USER.user_name', USER.nickname AS 'USER.nickname', USER.user_photo AS 'USER.user_photo',
            EMERGENZA_TEAM.team_name,
            SUBSTR(VOTE_ITEM.vote_item_url, 29), VOTE_ITEM.vote_item_no, COUNT(DISTINCT VOTE_ITEM_USER.vote_item_user_no) AS countVote, 
            IFNULL(CM.COUNT, 0) AS countComment
          FROM VIDEO
            INNER JOIN USER ON USER.user_no = VIDEO.user_no
            LEFT OUTER JOIN VOTE_ITEM ON SUBSTR(VOTE_ITEM.vote_item_url, 29) = VIDEO.video_no
            INNER JOIN VOTE_ITEM_USER ON VOTE_ITEM_USER.vote_item_no = VOTE_ITEM.vote_item_no
            LEFT OUTER JOIN (SELECT video_no, COUNT(DISTINCT comment_no) AS COUNT FROM COMMENT GROUP BY video_no) AS CM ON CM.video_no = VIDEO.video_no
          WHERE VIDEO.flag = 0 and status_no = 6 AND SUBSTR(VOTE_ITEM.vote_item_url, 29) IS NOT NULL ${
            !!category ? `and category_level2_no = ${category}` : ""
          }
          GROUP BY VOTE_ITEM.vote_item_no
          ORDER BY countVote DESC
          LIMIT ${offset}, ${limit}
        `);
      if (videoList.length === parseInt(limit, 10)) {
        return {
          offset: parseInt(offset, 10) + parseInt(limit, 10),
          videoList,
        };
      } else {
        return { offset: null, videoList };
      }
    } else {
      const video = await getOne(`
        SELECT VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no 
        FROM VIDEO 
        WHERE VIDEO.video_no = ${videoNo}
      `);
      // 비디오가 존재 하지 않을 시
      if (!video) {
        return { offset: null, videoList: [], isOfficial: false };
      }

      let videoList;
      let isOfficial;
      // 오피셜 영상
      if (
        video.category_level1_no === 4 &&
        video.category_level2_no === 7 &&
        video.category_level3_no === 5
      ) {
        videoList = await getAll(`
          SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no,  VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at, active_log_no
          FROM VIDEO   
          LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
            userNo || null
          } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
          WHERE ${
            !isAdmin ? "VIDEO.flag = 0 AND status_no = 6 AND" : ""
          } VIDEO.video_no = ${videoNo}
      `);

        isOfficial = true;
      }

      // 일반 영상
      else {
        videoList = await getAll(`
        SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no,  VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at, EMERGENZA_TEAM.team_name,
          USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.user_photo AS \`USER.user_photo\`, USER.nickname AS \`USER.nickname\`, active_log_no, COUNT(COMMENT.comment_no) AS countComment
        FROM VIDEO
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          LEFT OUTER JOIN ACTIVE_LOG ON ACTIVE_LOG.user_no = ${
            userNo || null
          } AND ACTIVE_LOG.target_no = VIDEO.video_no AND gubun = 'like_video'
          LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
          LEFT OUTER JOIN EMERGENZA_TEAM ON EMERGENZA_TEAM.user_no = USER.user_no
        WHERE ${
          !isAdmin
            ? userNo
              ? "VIDEO.flag <= 2 AND status_no = 6 AND"
              : "VIDEO.flag = 0 AND status_no = 6 AND "
            : ""
        } VIDEO.video_no = ${videoNo}
        GROUP BY VIDEO.video_no
      `);

        isOfficial = false;
      }
      return { offset: null, videoList, isOfficial };
    }
  }

  async getOfficialVideoList({ category2No }) {
    return await getAll(
      `
      SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no,  VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo, VIDEO.url_480p, VIDEO.url_720p, VIDEO.url_1080p, VIDEO.created_at
      FROM VIDEO
        INNER JOIN (SELECT video_official_info_no, video_no FROM VIDEO_OFFICIAL_INFO WHERE NOW() >= open_scheduled_time ) AS VOI ON VOI.video_no = VIDEO.video_no
        INNER JOIN (SELECT video_official_info_no FROM VIDEO_OFFICIAL_CATEGORY WHERE category_level2_no = ${category2No}) AS VOC ON VOC.video_official_info_no = VOI.video_official_info_no
      WHERE VIDEO.category_level1_no = 4 AND VIDEO.category_level2_no = 7 AND VIDEO.category_level3_no = 5 AND VIDEO.flag = 0
      ORDER BY VIDEO.created_at DESC
      `
    );
  }

  async getVideoByVideoNo(videoNo) {
    const result = await getOne(`
      SELECT category_level3_no, user_no FROM VIDEO WHERE video_no = ${videoNo}
    `);
    return result;
  }

  // 비디오 목록의 링크 삭제
  async deleteVideoFileByVideoNo({ flag, videoNo }, config) {
    return await remove(
      `
        UPDATE VIDEO SET flag=${flag}, original_file_name = null, url_original = null, url_480p = null, url_720p = null, url_1080p = null, duration = 0, thumbnail = null, job_id = null
        WHERE video_no = ${escapeQuot(videoNo)}
      `,
      config
    );
  }

  // 비디오 목록들의 썸네일 삭제
  async deleteThumbnailByVideoList({ videoList }, config) {
    return await remove(
      `
      DELETE FROM THUMBNAIL
      WHERE video_no IN (${videoList.toString()})
    `,
      config
    );
  }

  // 해당 비디오 아이디값을 가진 썸네일 삭제
  async deleteThumbnailByVideoNo({ videoNo }, config) {
    return await remove(
      `
          DELETE FROM THUMBNAIL
          WHERE video_no = ${videoNo}
        `,
      config
    );
  }

  // 비디오 목록의 썸네일 조회
  async getThumbnailListByVideoNo({ videoNo }, config) {
    return await getAll(
      `
      SELECT *
      FROM THUMBNAIL
      WHERE video_no = ${videoNo}
    `,
      config
    );
  }

  // 비디오 목록들의 썸네일 조회
  async getThumbnailListByVideoList({ videoList }, config) {
    return await getAll(
      `
      SELECT *
      FROM THUMBNAIL
      WHERE video_no IN (${videoList.toString()})
    `,
      config
    );
  }

  // 신시간 급상승 Like 인덱스 조회
  async getRealtimeSurgeLikeVideoIndex(
    { category3No, limit, videoPage },
    config
  ) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const result = await getAll(
      `
        SELECT VIDEO_CACHE.video_no, AL.sum_like
        FROM VIDEO_CACHE
          INNER JOIN VIDEO ON VIDEO.video_no = VIDEO_CACHE.video_no
          INNER JOIN (
            SELECT target_no, COUNT(active_log_no) AS sum_like
            FROM ACTIVE_LOG
            WHERE gubun = 'like_video' AND created_at >= ${escapeQuot(
              moment()
                .subtract(REAL_TIME_HOURS, "hours")
                .format("YYYY-MM-DD 00:00:00")
            )} 
            GROUP BY target_no
          ) AS AL ON AL.target_no = VIDEO_CACHE.video_no
          ${categoryJoin}
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
        WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1 
        ORDER BY AL.sum_like DESC
        ${limitCondition}
      `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 실시간 급상승 Talk 인덱스 조회
  async getRealtimeSurgeTalkVideoIndex(
    { category3No, limit, videoPage },
    config
  ) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const result = await getAll(
      `
        SELECT VIDEO_CACHE.video_no, IFNULL(COM.sum_comment, 0) AS \`COUNT.count_comment\`
        FROM VIDEO_CACHE
          INNER JOIN VIDEO ON VIDEO.video_no = VIDEO_CACHE.video_no
        ${categoryJoin}
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          INNER JOIN (
            SELECT video_no, COUNT(comment_no) AS sum_comment 
            FROM COMMENT 
            WHERE flag <= 6 AND created_at >= ${escapeQuot(
              moment()
                .subtract(REAL_TIME_HOURS, "hours")
                .format("YYYY-MM-DD HH:mm:ss")
            )}
            GROUP BY video_no
            HAVING sum_comment > 0
          ) AS COM ON COM.video_no = VIDEO_CACHE.video_no
        WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
        ORDER BY \`COUNT.count_comment\` DESC
        ${limitCondition}
      `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 핫 라이크 비디오 인덱스 조회
  async getHotLikeVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const result = await getAll(
      `
        SELECT VIDEO_CACHE.video_no, AL.sum_like
        FROM VIDEO_CACHE
          INNER JOIN VIDEO ON VIDEO.video_no = VIDEO_CACHE.video_no
          INNER JOIN (
            SELECT target_no, COUNT(active_log_no) AS sum_like
            FROM ACTIVE_LOG
            WHERE gubun = 'like_video' AND created_at >= ${escapeQuot(
              moment().subtract(HOT_DAYS, "days").format("YYYY-MM-DD 00:00:00")
            )} 
            GROUP BY target_no
            HAVING sum_like > 0
          ) AS AL ON AL.target_no = VIDEO_CACHE.video_no
          ${categoryJoin}
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
        WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1     
        ORDER BY AL.sum_like DESC
        ${limitCondition}
      `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 핫 비디오 인덱스 조회
  async getHotViewVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const result = await getAll(
      `
        SELECT VIDEO_CACHE.video_no, AL.sum_view
        FROM VIDEO_CACHE
          INNER JOIN VIDEO ON VIDEO.video_no = VIDEO_CACHE.video_no
          INNER JOIN (
            SELECT target_no, COUNT(active_log_no) AS sum_view 
            FROM ACTIVE_LOG
            WHERE gubun = 'view_video' AND created_at >= ${escapeQuot(
              moment().subtract(HOT_DAYS, "days").format("YYYY-MM-DD 00:00:00")
            )} 
            GROUP BY target_no
            HAVING sum_view > 0
          ) AS AL ON AL.target_no = VIDEO_CACHE.video_no
          ${categoryJoin}
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
        WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
        ORDER BY AL.sum_view DESC
        ${limitCondition}
      `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 핫 톡 인덱스 조회
  async getHotTalkVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const result = await getAll(
      `
          SELECT VIDEO_CACHE.video_no, IFNULL(COM.sum_comment, 0) AS \`COUNT.count_comment\`
          FROM VIDEO_CACHE
            INNER JOIN VIDEO ON VIDEO.video_no = VIDEO_CACHE.video_no  
           ${categoryJoin}
            INNER JOIN USER ON USER.user_no = VIDEO.user_no
            INNER JOIN (
              SELECT video_no, COUNT(comment_no) AS sum_comment 
              FROM COMMENT 
              WHERE flag = 0 AND created_at >= ${escapeQuot(
                moment()
                  .subtract(HOT_DAYS, "days")
                  .format("YYYY-MM-DD HH:mm:ss")
              )}
              GROUP BY video_no
              HAVING sum_comment > 0
            ) AS COM ON COM.video_no = VIDEO_CACHE.video_no
          WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1 
          ORDER BY \`COUNT.count_comment\` DESC
          ${limitCondition}
        `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 넘사벽 Like
  async getSeasonLikeVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
    NOW() >= open_time AND 
    NOW() >= start_time 
  ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const result = await getAll(
      `
        SELECT VIDEO.video_no
        FROM VIDEO
          ${categoryJoin}
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
        WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1 AND VIDEO.count_like > 0
        ORDER BY VIDEO.count_like DESC
        ${limitCondition}
      `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 넘사벽 View
  async getSeasonViewVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
    NOW() >= open_time AND 
    NOW() >= start_time 
  ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const result = await getAll(
      `
        SELECT VIDEO.video_no
        FROM VIDEO
          ${categoryJoin}
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
        WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1 AND VIDEO.count_view > 0
        ORDER BY VIDEO.count_view DESC
        ${limitCondition}
      `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 실시간 급상승 푸쉬 조회 (하루 단위)
  async getRealtimeSurgePushVideoIndex(
    { category3No, limit, videoPage },
    config
  ) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN CATEGORY_LEVEL3 ON 
            CATEGORY_LEVEL3.category_level3_no = VIDEO.category_level3_no AND
            CATEGORY_LEVEL3.is_open = 1 AND
            NOW() >= CATEGORY_LEVEL3.open_time AND 
            NOW() >= CATEGORY_LEVEL3.start_time 
      `;

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const result = await getAll(
      `
      SELECT VIDEO_CACHE.video_no, IFNULL(TEMP_PUSH.sum_push, 0) AS sum_push
      FROM VIDEO_CACHE
        INNER JOIN VIDEO ON VIDEO.video_no = VIDEO_CACHE.video_no
      ${categoryJoin}
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        INNER JOIN (
          SELECT video_no, SUM(push) AS sum_push 
          FROM PUSH_LOG 
          WHERE 
            video_no IS NOT NULL AND
            category_level3_no = ${category3No} AND 
            is_cancel = 0 AND
            gubun = 'PUSH' AND
            push_time >= ${escapeQuot(
              moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")
            )}
          GROUP BY video_no
          HAVING sum_push > 0
        ) AS TEMP_PUSH ON TEMP_PUSH.video_no = VIDEO_CACHE.video_no
      WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
      ORDER BY sum_push DESC
      ${limitCondition}
    `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 핫 푸쉬 조회 (일주일 단위)
  async getHotPushVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN CATEGORY_LEVEL3 ON 
            CATEGORY_LEVEL3.category_level3_no = VIDEO.category_level3_no AND
            CATEGORY_LEVEL3.is_open = 1 AND
            NOW() >= CATEGORY_LEVEL3.open_time AND 
            NOW() >= CATEGORY_LEVEL3.start_time 
      `;

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const result = await getAll(
      `
      SELECT VIDEO_CACHE.video_no, IFNULL(TEMP_PUSH.sum_push, 0) AS sum_push
      FROM VIDEO_CACHE
        INNER JOIN VIDEO ON VIDEO.video_no = VIDEO_CACHE.video_no
      ${categoryJoin}
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        INNER JOIN (
          SELECT video_no, SUM(push) AS sum_push 
          FROM PUSH_LOG 
          WHERE 
            video_no IS NOT NULL AND
            category_level3_no = ${category3No} AND 
            is_cancel = 0 AND
            gubun = 'PUSH' AND
            push_time >= ${escapeQuot(
              moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss")
            )}
          GROUP BY video_no
          HAVING sum_push > 0
        ) AS TEMP_PUSH ON TEMP_PUSH.video_no = VIDEO_CACHE.video_no
      WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
      ORDER BY sum_push DESC
      ${limitCondition}
    `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 넘사벽 푸쉬 조회 (경연 단위)
  async getSeasonPushVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN CATEGORY_LEVEL3 ON 
            CATEGORY_LEVEL3.category_level3_no = VIDEO.category_level3_no AND
            CATEGORY_LEVEL3.is_open = 1 AND
            NOW() >= CATEGORY_LEVEL3.open_time AND 
            NOW() >= CATEGORY_LEVEL3.start_time 
      `;

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    const result = await getAll(
      `
      SELECT VIDEO.video_no, IFNULL(TEMP_PUSH.sum_push, 0) AS sum_push
      FROM VIDEO
      ${categoryJoin}
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        INNER JOIN (
          SELECT video_no, SUM(push) AS sum_push 
          FROM PUSH_LOG 
          WHERE 
            video_no IS NOT NULL AND
            category_level3_no = ${category3No} AND 
            is_cancel = 0 AND
            gubun = 'PUSH' 
          GROUP BY video_no
          HAVING sum_push > 0
        ) AS TEMP_PUSH ON TEMP_PUSH.video_no = VIDEO.video_no
      WHERE ${categoryCondition} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
      ORDER BY sum_push DESC
      ${limitCondition}
    `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 새 비디오 인덱스 조회
  async getNewVideoIndex({ category3No, limit, videoPage }, config) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    const limitCondition = limit ? `LIMIT ${limit}` : "";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const result = await getAll(
      `
        SELECT VIDEO.video_no
        FROM VIDEO
          ${categoryJoin}
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          WHERE ${categoryCondition} AND VIDEO.flag =  0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
        ORDER BY VIDEO.created_at DESC 
        ${limitCondition}
      `,
      config
    );

    return result.map((video) => video.video_no);
  }

  // 유저의 비디오 인덱스 조회
  async getUserVideoIndex({ user, category3No, limit, videoPage }) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const LimitCondition = limit ? `LIMIT ${limit}` : "";

    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const result = await getAll(`
      SELECT VIDEO.video_no
      FROM VIDEO
        ${categoryJoin}
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
      WHERE ${categoryCondition} AND VIDEO.user_no = ${user} AND VIDEO.flag = 0 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
      ORDER BY VIDEO.created_at DESC
      ${LimitCondition}
    `);

    return result.map((video) => video.video_no);
  }

  // 나의 비디오 인덱스 조회
  async getMyVideoIndex({ me, category3No, limit, videoPage }) {
    const categoryCondition = category3No
      ? `VIDEO.category_level3_no = ${category3No} AND VIDEO.category_level1_no NOT IN (4)`
      : "VIDEO.category_level1_no NOT IN (4)";

    /**
     * 비디오 페이지에선 오픈일자 상관 없이 카테고리별 비디오리스트를 보여줘야한다.
     * 메인 또는 카테고리 페이지에선 카테고리가 오픈되어 있어야만 비디오리스트를 보여줘야한다.
     */
    const LimitCondition = limit ? `LIMIT ${limit}` : "";

    const categoryJoin = videoPage
      ? ""
      : ` INNER JOIN (SELECT category_level3_no FROM CATEGORY_LEVEL3 WHERE 
        is_open = 1 AND
      NOW() >= open_time AND 
      NOW() >= start_time 
    ) AS CL3 ON CL3.category_level3_no = VIDEO.category_level3_no`;

    const result = await getAll(`
      SELECT VIDEO.video_no
      FROM VIDEO
        ${categoryJoin}
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
      WHERE ${categoryCondition} AND VIDEO.user_no = ${me} AND VIDEO.flag < 3 AND VIDEO.status_no = 6 AND VIDEO.category_level1_no = 1
      ORDER BY VIDEO.created_at DESC
      ${LimitCondition}
    `);

    return result.map((video) => video.video_no);
  }

  async getOfficialVideoIndex({ category3No }) {
    const result = await getAll(`
      SELECT VIDEO.video_no
      FROM VIDEO
        INNER JOIN (
          SELECT video_no, video_official_info_no, created_at
          FROM VIDEO_OFFICIAL_INFO
          WHERE open_scheduled_time <= NOW() AND NOW() < open_ended_time
        ) AS VOI ON VOI.video_no = VIDEO.video_no
        INNER JOIN VIDEO_OFFICIAL_CATEGORY AS VOC ON VOC.video_official_info_no = VOI.video_official_info_no 
          AND VOC.category_level2_no = (
            SELECT CATEGORY_LEVEL3.category_level2_no
            FROM CATEGORY_LEVEL3
            WHERE CATEGORY_LEVEL3.category_level3_No = ${category3No}
        )
      WHERE VIDEO.flag = 0 AND VIDEO.status_no = 6 
      ORDER BY VOI.created_at DESC
    `);

    return result.map((video) => video.video_no);
  }

  // 비디오 인트로 조회
  async getVideoIntroList({ option, videoNoList, userNo }, config) {
    let selectCondtion = "";
    let joinCondition = "";
    let optionCondtion = "";

    if (String(option.toLowerCase()) === "new".toLowerCase()) {
      optionCondtion = `ORDER BY VIDEO.created_at DESC`;
    } else if (
      ["hotView", "seasonView"]
        .map((v) => v.toLowerCase())
        .indexOf(String(option.toLowerCase())) !== -1
    ) {
      optionCondtion = `ORDER BY \`COUNT.count_view\` DESC`;
    } else if (
      ["hotTalk", "realtimeSurgeLike", "seasonLike"]
        .map((v) => v.toLowerCase())
        .indexOf(String(option.toLowerCase())) !== -1
    ) {
      optionCondtion = `ORDER BY \`COUNT.count_comment\` DESC`;
    } else if (
      ["realtimeSurgeLike", "hotLike"]
        .map((v) => v.toLowerCase())
        .indexOf(String(option.toLowerCase())) !== -1
    ) {
      optionCondtion = `ORDER BY \`COUNT.count_like\` DESC`;
    } else if (
      ["realtimeSurgePush", "hotPush", "seasonPush"]
        .map((v) => v.toLowerCase())
        .indexOf(String(option.toLowerCase())) !== -1
    ) {
      optionCondtion = `ORDER BY sum_push DESC`;
      selectCondtion = `,  CONVERT(IFNULL(TEMP_PUSH.sum_push, 0), UNSIGNED) AS sum_push`;
      joinCondition = `  
      INNER JOIN (
        SELECT video_no, SUM(push) AS sum_push 
        FROM PUSH_LOG 
        WHERE 
          video_no IS NOT NULL AND
          is_cancel = 0 AND
          gubun = 'PUSH' 
          ${
            option === "realtimeSurgePush"
              ? `
                AND push_time >= ${escapeQuot(
                  moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")
                )}
                `
              : option === "hotPush"
              ? `
                AND push_time >= ${escapeQuot(
                  moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss")
                )}
                `
              : ""
          }
        GROUP BY video_no
        HAVING sum_push > 0
      ) AS TEMP_PUSH ON TEMP_PUSH.video_no = VIDEO.video_no
      `;
    }
    const result = await getAll(
      `
        SELECT VIDEO.video_no, VIDEO.status_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.url_1080p, VIDEO.thumbnail, VIDEO.created_at,
        ${userNo ? `IF(AL.count > 0, true, false) AS \`is_liked\`,` : ""}
          USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.count_follower AS \`USER.COUNT.count_follower\`,
          IFNULL(COM.count, 0) AS \`COUNT.count_comment\`,
          VIDEO.count_like  AS \`COUNT.count_like\`, 
          VIDEO.count_view  AS \`COUNT.count_view\`
          ${selectCondtion}
        FROM VIDEO
          INNER JOIN USER ON USER.user_no = VIDEO.user_no
          ${
            userNo
              ? `LEFT OUTER JOIN (SELECT target_no, COUNT(active_log_no) AS count FROM ACTIVE_LOG 
                                  WHERE gubun = 'like_video' AND user_no = ${userNo} 
                                  GROUP BY target_no
                                ) AS AL ON AL.target_no = VIDEO.video_no
                `
              : ""
          }
          ${joinCondition}
          LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS count FROM COMMENT WHERE flag <= 6 GROUP BY video_no) AS COM ON COM.video_no = VIDEO.video_no
        WHERE VIDEO.video_no IN (${videoNoList.toString()})  AND VIDEO.status_no  = 6
        ${optionCondtion}
      `,
      config
    );

    // 데이터베이스에 들어온 값들은 순서대로 나타나기 때문에 fetchList순서대로 정렬해준다.

    return videoNoList
      .map(
        (v) =>
          result.splice(
            result.findIndex((video) => Number(v) === video.video_no),
            1
          )[0]
      )
      .map((video) => (video.flag === 0 ? video : null));
  }

  // 핫 비디오 인트로 조회
  async getVideoOfficialList({ videoNoList, userNo }, config) {
    const result = await getAll(
      `
        SELECT VIDEO.video_no, VIDEO.status_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.url_1080p, VIDEO.thumbnail, VIDEO.created_at,
        ${userNo ? `IF(AL.count > 0, true, false) AS \`is_liked\`,` : ""}
          IFNULL(COM.count, 0) AS \`COUNT.count_comment\`,
          VIDEO.count_like  AS \`COUNT.count_like\`, 
          VIDEO.count_view  AS \`COUNT.count_view\`
        FROM VIDEO
          ${
            userNo
              ? `LEFT OUTER JOIN (SELECT target_no, COUNT(active_log_no) AS count FROM ACTIVE_LOG 
                                  WHERE gubun = 'like_video' AND user_no = ${userNo} 
                                  GROUP BY target_no
                                ) AS AL ON AL.target_no = VIDEO.video_no
                `
              : ""
          }
          LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS count FROM COMMENT WHERE flag <= 6 GROUP BY video_no) AS COM ON COM.video_no = VIDEO.video_no
        WHERE VIDEO.video_no IN (${videoNoList.toString()})  AND VIDEO.status_no  = 6
      `,
      config
    );

    // 데이터베이스에 들어온 값들은 순서대로 나타나기 때문에 fetchList순서대로 정렬해준다.

    return videoNoList
      .map(
        (v) =>
          result.splice(
            result.findIndex((video) => Number(v) === video.video_no),
            1
          )[0]
      )
      .map((video) => (video.flag === 0 ? video : null));
  }

  async getVideoByUser({ userNo, limit, me, category3No }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    let condition = "";

    if (Boolean(category3No)) {
      condition += ` AND VIDEO.category_level3_no = ${category3No}`;
    }

    return await getAll(`
      SELECT VIDEO.video_no, VIDEO.status_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.url_1080p, VIDEO.thumbnail, VIDEO.created_at,
      ${me ? `IF(AL.count > 0, true, false) AS \`is_liked\`,` : ""}
        USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.count_follower AS \`USER.COUNT.count_follower\`,
        IFNULL(COM.count, 0) AS \`COUNT.count_comment\`,
        VIDEO.count_like  AS \`COUNT.count_like\`, 
        VIDEO.count_view  AS \`COUNT.count_view\`
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        ${
          me
            ? `LEFT OUTER JOIN (SELECT target_no, COUNT(active_log_no) AS count FROM ACTIVE_LOG 
                                WHERE gubun = 'like_video' AND user_no = ${me} 
                                GROUP BY target_no
                              ) AS AL ON AL.target_no = VIDEO.video_no
              `
            : ""
        }
        LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS count FROM COMMENT WHERE flag <= 6 GROUP BY video_no) AS COM ON COM.video_no = VIDEO.video_no
      WHERE VIDEO.user_no = ${userNo}  AND VIDEO.flag = 0 AND VIDEO.status_no  = 6 AND VIDEO.category_level1_no = 1 ${condition}
      ORDER BY VIDEO.created_at DESC
      ${limitCondition}
      
    `);
  }

  // video flag를 2까지 보여준다.
  async getMyVideoList({ me, category3No, limit }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";

    let condition = "";

    if (Boolean(category3No)) {
      condition += ` AND VIDEO.category_level3_no = ${category3No}`;
    }

    return await getAll(`
      SELECT VIDEO.video_no, VIDEO.status_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.url_1080p, VIDEO.thumbnail, VIDEO.created_at,
      ${me ? `IF(AL.count > 0, true, false) AS \`is_liked\`,` : ""}
        USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.count_follower AS \`USER.COUNT.count_follower\`,
        IFNULL(COM.count, 0) AS \`COUNT.count_comment\`,
        VIDEO.count_like  AS \`COUNT.count_like\`, 
        VIDEO.count_view  AS \`COUNT.count_view\`
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        ${
          me
            ? `LEFT OUTER JOIN (SELECT target_no, COUNT(active_log_no) AS count FROM ACTIVE_LOG 
                                WHERE gubun = 'like_video' AND user_no = ${me} 
                                GROUP BY target_no
                              ) AS AL ON AL.target_no = VIDEO.video_no
              `
            : ""
        }
        LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS count FROM COMMENT WHERE flag <= 6 GROUP BY video_no) AS COM ON COM.video_no = VIDEO.video_no
      WHERE VIDEO.user_no = ${me}  AND VIDEO.flag < 3 AND VIDEO.status_no  = 6 AND VIDEO.category_level1_no = 1 ${condition}
      ${limitCondition}
    `);
  }

  // SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.description, VIDEO.title, VIDEO.thumbnail, VIDEO.count_like, VIDEO.count_view
  // FROM VIDEO
  //   LEFT OUTER JOIN COMMENT ON COMMENT.video_no = VIDEO.video_no
  //   INNER JOIN (SELECT video_official_info_no, video_no, admin_no, open_scheduled_time, created_at FROM VIDEO_OFFICIAL_INFO) AS VOI ON VOI.video_no = VIDEO.video_no
  //   INNER JOIN (SELECT video_official_category_no, video_official_info_no, category_level2_no FROM VIDEO_OFFICIAL_CATEGORY ${
  //     !!category ? `WHERE category_level2_no = ${category}` : ""
  //   }) AS VOC ON VOC.video_official_info_no = VOI.video_official_info_no

  // WHERE VIDEO.flag = 0 and status_no = 6 and VIDEO.category_level1_no = 4 and VIDEO.category_level2_no = 7 and VIDEO.category_level3_no = 5
  // GROUP BY VIDEO.video_no, COMMENT.video_no
  // ORDER BY COUNT(COMMENT.comment_no) DESC, VIDEO.created_at DESC
  // LIMIT ${offset}, ${limit}

  // official 영상인지 체크
  async getIsOfficialByVideo({ videoNo }) {
    const result = await getOne(`
      SELECT IF(COUNT(video_no) > 0, true,false) AS is_official
      FROM VIDEO_OFFICIAL_INFO
      WHERE video_no = ${videoNo}
      GROUP BY video_no
    `);

    return Boolean(result && result.is_official) || false;
  }

  // 가장 최근의 비디오 가져오기
  async getLatestVideoThumbnailByUserList({ userList, category3No }) {
    if (!userList || !userList.length) {
      return [];
    }
    const result = await getAll(`
      SELECT V.video_no, V.user_no, V.thumbnail  
      FROM (
        SELECT *
        FROM VIDEO
        WHERE status_no = 6 AND flag = 0 AND category_level3_no = ${category3No}
        ORDER BY created_at DESC
      ) AS V
      WHERE V.user_no IN (${userList.map((user) => user.user_no).toString()})
    `);

    return userList.map((user) => ({
      ...user,
      VIDEO: result.find((video) => video.user_no === user.user_no),
    }));
  }

  // 공개 되어있는 비디오인지 체크
  async getIsOpenByVideoNo({ videoNo }) {
    const res = await getOne(`
      SELECT IF(COUNT(VIDEO.video_no) = 0 , 0, 1) AS isOpen
      FROM VIDEO
      WHERE VIDEO.video_no = ${videoNo} AND VIDEO.flag = 0
    `);

    return Boolean(res.isOpen);
  }

  // 정보를 수정할 비디오의 정보 조회
  async getEditInfoByVideoNo({ videoNo, userNo }) {
    return await getOne(`
      SELECT 
        VIDEO.video_no,
        VIDEO.category_level1_no,
        VIDEO.category_level2_no,
        VIDEO.category_level3_no,
        VIDEO.category_level4_no,
        VIDEO.flag,
        VIDEO.title,
        VIDEO.description,
        VIDEO.thumbnail,
        VIDEO.original_file_name,
        CATEGORY_LEVEL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
        CATEGORY_LEVEL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
        CATEGORY_LEVEL2.category_level2_gradient_icon AS \`CATEGORY_LEVEL2.category_level2_gradient_icon\`,
        CATEGORY_LEVEL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`, 
        CATEGORY_LEVEL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`, 
        CATEGORY_LEVEL3.start_time AS \`CATEGORY_LEVEL3.start_time\`, 
        CATEGORY_LEVEL3.end_time AS \`CATEGORY_LEVEL3.end_time\`,
        UPLOAD_POSSIBLE_USER.type AS \`UPLOAD_POSSIBLE_USER.type\`
      FROM VIDEO
        INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = VIDEO.category_level2_no
        INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = VIDEO.category_level3_no
        INNER JOIN UPLOAD_POSSIBLE_USER ON UPLOAD_POSSIBLE_USER.user_no = VIDEO.user_no AND UPLOAD_POSSIBLE_USER.category_level4_no = VIDEO.category_level4_no
      WHERE VIDEO.video_no = ${videoNo} AND VIDEO.flag < 3 AND VIDEO.user_no = ${userNo}
    `);
  }

  // 시즌의 비디오 리스트 조회
  async getSeasonVideoList({ category3No, userNo, limit }) {
    return await getAll(`
      SELECT VIDEO.video_no, VIDEO.status_no, VIDEO.flag, VIDEO.title, VIDEO.description, VIDEO.url_1080p, VIDEO.thumbnail, VIDEO.created_at,
      ${userNo ? `IF(AL.count > 0, true, false) AS \`is_liked\`,` : ""}
        USER.user_no AS \`USER.user_no\`, USER.user_name AS \`USER.user_name\`, USER.nickname AS \`USER.nickname\`, USER.count_follower AS \`USER.COUNT.count_follower\`,
        IFNULL(COM.count, 0) AS \`COUNT.count_comment\`,
        VIDEO.count_like  AS \`COUNT.count_like\`, 
        VIDEO.count_view  AS \`COUNT.count_view\`
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
        ${
          userNo
            ? `LEFT OUTER JOIN (SELECT target_no, COUNT(active_log_no) AS count FROM ACTIVE_LOG 
                                WHERE gubun = 'like_video' AND user_no = ${userNo} 
                                GROUP BY target_no
                              ) AS AL ON AL.target_no = VIDEO.video_no
              `
            : ""
        }
        LEFT OUTER JOIN (SELECT video_no, COUNT(comment_no) AS count FROM COMMENT WHERE flag <= 6 GROUP BY video_no) AS COM ON COM.video_no = VIDEO.video_no
      WHERE VIDEO.category_level3_no = ${category3No} AND VIDEO.flag = 0 AND VIDEO.status_no  = 6
      ORDER BY VIDEO.created_at DESC
      ${limit ? `LIMIT ${limit}` : ""}
    `);
  }

  // 시즌의 비디오 인덱스 조회
  async getSeasonVideoIndex({ category3No }) {
    return await getAll(`
      SELECT VIDEO.video_no
      FROM VIDEO
        INNER JOIN USER ON USER.user_no = VIDEO.user_no
      WHERE VIDEO.category_level3_no = ${category3No} AND VIDEO.flag = 0 AND VIDEO.status_no  = 6
      ORDER BY VIDEO.created_at DESC
    `);
  }
}

module.exports = VideoQuery;
