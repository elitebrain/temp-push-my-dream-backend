const moment = require("moment");

const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot } = require("shared/functions");

class PushLogQuery {
  // 푸쉬 보내기
  async sendPush(
    {
      targetUserNo,
      me,
      push,
      myPush,
      categoryLevel1No,
      categoryLevel2No,
      categoryLevel3No,
      categoryLevel4No,
      videoNo,
    },
    config
  ) {
    // targetUserNo : 받는 사람
    // userNo : 보낸 사람

    // 사용한 내 푸시
    let used_have_push = 0;
    // 사용한 내 직전 푸시
    let used_residual_push = 0;

    /**
     * 직전 푸시가 존재하면 먼저 차감
     * 그 후 남은 잔여량은 내 푸시에서 차감
     */
    const temp_used_residual_push = push - myPush.residual_push;

    if (myPush.residual_push > 0) {
      used_residual_push =
        temp_used_residual_push >= 0 ? myPush.residual_push : push;
    }

    if (temp_used_residual_push > 0) {
      used_have_push = temp_used_residual_push;
    }

    // 보낸 사람 have_push 감소
    await modify(
      `
      UPDATE USER SET have_push = have_push - ${used_have_push} WHERE user_no = ${me}
    `,
      config
    );
    // 받은 사람 receive_push 추가
    await modify(
      `
      UPDATE USER SET receive_push = receive_push + ${push} WHERE user_no = ${targetUserNo}
    `,
      config
    );

    // 카테고리 푸시 수정
    await modify(
      `
        UPDATE PUSH
        SET total_push = total_push + ${used_have_push}, residual_push = residual_push - ${used_residual_push}
        WHERE user_no = ${me} AND category_level1_no = ${categoryLevel1No} 
          AND category_level2_no = ${categoryLevel2No} AND category_level3_no = ${categoryLevel3No}
      `,
      config
    );

    // POINT LOG
    //  포인트는 반올림
    // have_push, residual_push는 앞에서 수정을 하였기 때문에 값 그대로를 넣어준다.
    const result = await set(
      `
      INSERT INTO PUSH_LOG (
        producer_no,
        dreamer_no, 
        gubun,
        category_level1_no, 
        category_level2_no, 
        category_level3_no, 
        category_level4_no,
        video_no,
        push, 
        used_have_push, 
        remaining_have_push, 
        used_category_push, 
        remaining_category_push, 
        dreamer_receive_push_before_support, 
        dreamer_remaining_receive_push, 
        gain_point,
        total_point
      ) 
      VALUES (
        ${me}, 
        ${targetUserNo},
        'PUSH',
        ${categoryLevel1No}, 
        ${categoryLevel2No}, 
        ${categoryLevel3No},
        ${categoryLevel4No},
        ${videoNo || null},
        ${push},  
        ${used_have_push},         
        (
          SELECT have_push
          FROM USER
          WHERE user_no = ${me}
        ),
        ${used_residual_push}, 
        (
          SELECT residual_push
          FROM PUSH
          WHERE user_no = ${me} AND category_level1_no = ${categoryLevel1No} AND category_level2_no = ${categoryLevel2No} AND category_level3_no = ${categoryLevel3No}
        ),
        (
          SELECT receive_push
          FROM USER
          WHERE user_no = ${targetUserNo}
        ),
        (
          SELECT receive_push
          FROM USER
          WHERE user_no = ${targetUserNo}
        ), (
          SELECT CAST(${push} * SETTING.VALUE * 0.01 AS SIGNED) FROM SETTING WHERE SETTING.TYPE = 'pointPercent'
        ),
        (
          SELECT (
            SELECT CAST(${push} * SETTING.VALUE * 0.01 AS SIGNED) FROM SETTING WHERE SETTING.TYPE = 'pointPercent'
          ) +  IFNULL((
            SELECT POINT
            FROM POINT
            WHERE producer_no = ${me} AND dreamer_no = ${targetUserNo} AND
              category_level1_no = ${categoryLevel1No} AND category_level2_no = ${categoryLevel2No} AND 
              category_level3_no = ${categoryLevel3No} AND category_level4_no = ${categoryLevel4No}
            ), 0)
          
        )
      )
    `,
      config
    );

    const pushLogNo = result[0];
    // 내 푸시에서 카테고리 푸시로 옮겨지는 로그 작성
    await set(
      `
      INSERT INTO PUSH_CATEGORY_LOG (push_log_no, user_no, category_level1_no, category_level2_no, category_level3_no, total_push, additional_push)      
      VALUES (${pushLogNo}, ${me}, ${categoryLevel1No}, ${categoryLevel2No}, ${categoryLevel3No}, 
        (
          SELECT total_push
          FROM PUSH
          WHERE user_no = ${me} AND category_level3_no = ${categoryLevel3No}
        ) ,
        ${used_have_push}
        )
    `,
      config
    );

    return pushLogNo;
  }

  // PUSH 결과 조회
  async getPushResult({ targetUserNo, userNo }) {
    const result = await getAll(`
      SELECT producer_no, SUM(push) AS totalPush, SUM(gain_point) AS totalPoint, SUM(push) / (SELECT SUM(push) FROM PUSH_LOG WHERE dreamer_no = ${targetUserNo}) * 100 AS ratioPush
      FROM PUSH_LOG
      WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${targetUserNo}
      GROUP BY producer_no
      ORDER BY totalPush DESC
    `);
    let totalPush = 0;
    for (let i = 0; i < result.length; i++) {
      totalPush += parseInt(result[i].totalPush, 10);
    }
    const myIdx = result.findIndex(
      (v) => v.producer_no === parseInt(userNo, 10)
    );
    const myRank = myIdx + 1;
    const myPush = parseInt(result[myIdx].totalPush, 10);
    const myPoint = parseInt(result[myIdx].totalPoint, 10);
    const ratioPush = parseFloat(result[myIdx].ratioPush).toFixed(1);
    const pushResult = { totalPush, myPush, myPoint, myRank, ratioPush };
    return pushResult;
  }
  // 내 PUSH 내역 전체 조회
  async getMyPushLog({
    producerNo,
    categoryLevel2No,
    startDate,
    endDate,
    support,
  }) {
    let categoryCondition = "";
    let dateCondition = "";
    let supportCondition = "";

    if (categoryLevel2No) {
      categoryCondition = ` AND PUSH_LOG.category_level2_no = ${categoryLevel2No}`;
    }

    if (startDate && endDate) {
      dateCondition = ` AND PUSH_LOG.created_at BETWEEN ${escapeQuot(
        moment(startDate).format("YYYY-MM-DD 00:00:00")
      )} AND ${escapeQuot(moment(endDate).format("YYYY-MM-DD 23:59:59"))}`;
    }

    if (support) {
      supportCondition = ` AND PUSH_LOG.gubun = 'SUPPORT'`;
    }

    const res = await getAll(`
      SELECT 
        PUSH_LOG.*,
        USER.user_no AS \`DREAMER.user_no\`,
        USER.nickname AS \`DREAMER.nickname\`,
        CATEGORY_LEVEL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
        CATEGORY_LEVEL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
        CATEGORY_LEVEL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CATEGORY_LEVEL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        CATEGORY_LEVEL4.category_level4_no AS \`CATEGORY_LEVEL4.category_level4_no\`,
        CATEGORY_LEVEL4.title AS \`CATEGORY_LEVEL4.title\`,
        CATEGORY_LEVEL4.ordinalNumber AS \`CATEGORY_LEVEL4.ordinalNumber\`
      FROM PUSH_LOG
        INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = PUSH_LOG.category_level2_no
        INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = PUSH_LOG.category_level3_no
        INNER JOIN CATEGORY_LEVEL4 ON CATEGORY_LEVEL4.category_level4_no = PUSH_LOG.category_level4_no
        INNER JOIN USER ON USER.user_no = PUSH_LOG.dreamer_no
      WHERE PUSH_LOG.producer_no = ${producerNo}${categoryCondition}${dateCondition}${supportCondition}
      ORDER BY PUSH_LOG.created_at DESC
    `);
    return res;
  }

  /**
   * 후원 하기
   */
  async supportUser({ me, targetUserNo, push, isPush, videoNo }, config) {
    /**
     * 프로듀서의 push를 뺀다.
     */
    await modify(
      `
        UPDATE USER SET have_push = have_push - ${push}
        WHERE user_no = ${me}
      `,
      config
    );

    /**
     * 드리머의 push를 더해준다.
     */

    await modify(
      `
        UPDATE USER SET receive_push = receive_push + ${push}
        WHERE user_no = ${targetUserNo}
      `,
      config
    );

    /**
     * 로깅
     */
    await set(
      `
      INSERT INTO PUSH_LOG (
        producer_no,
        dreamer_no,
        gubun,
        category_level1_no,
        category_level2_no,
        category_level3_no,
        category_level4_no,
        video_no,
        push,
        used_have_push,
        remaining_have_push,
        used_category_push,
        remaining_category_push,
        dreamer_receive_push_before_support,
        dreamer_remaining_receive_push,
        gain_point,
        total_point
      )
      VALUES (
        ${me},
        ${targetUserNo},
        'SUPPORT',
        ${isPush.category_level1_no},
        ${isPush.category_level2_no},
        ${isPush.category_level3_no},
        ${isPush.category_level4_no},
        ${videoNo || null},
        ${push},  
        ${push},
        (
          SELECT IF(have_push  > 0, have_push, 0)
          FROM USER  
          WHERE user_no = ${me}
        ),
        0,
        (
          SELECT IFNULL((
            SELECT residual_push
            FROM PUSH
            WHERE user_no = ${me} 
              AND category_level1_no = ${isPush.category_level1_no} 
              AND category_level2_no = ${isPush.category_level2_no} 
              AND category_level3_no = ${isPush.category_level3_no}
            ), 
          0)
        ),
        (
          SELECT IF(receive_push - ${push} > 0, receive_push - ${push}, 0)
          FROM USER  
          WHERE user_no = ${targetUserNo}
        ),
        (
          SELECT IF(receive_push > 0, receive_push , 0)
          FROM USER  
          WHERE user_no = ${targetUserNo}
        ),
        0,
        (
          SELECT IFNULL((
            SELECT POINT
            FROM POINT
            WHERE producer_no = ${me} AND dreamer_no = ${targetUserNo} AND
              category_level1_no = ${
                isPush.category_level1_no
              } AND category_level2_no = ${isPush.category_level2_no} AND 
              category_level3_no = ${
                isPush.category_level3_no
              } AND category_level4_no = ${isPush.category_level4_no}
            ), 0)
        )
      )
    `,
      config
    );
  }

  // 해당 시즌에 드리머가 받은 푸쉬가 존재하는 지 여부 체크
  async existPushInSeasonByDreamer({ category4No, dreamerNo }) {
    const res = await getOne(`
      SELECT IFNULL(IF(COUNT(push_log_no) > 0 ,1 ,0), 0) AS is_exist_push
      FROM PUSH_LOG
      WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${dreamerNo} AND category_level4_no = ${category4No}
    `);

    return res && Boolean(res.is_exist_push);
  }
}

module.exports = PushLogQuery;
