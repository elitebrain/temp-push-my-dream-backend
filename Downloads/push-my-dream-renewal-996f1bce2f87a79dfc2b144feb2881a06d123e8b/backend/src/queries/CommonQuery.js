const { getAll, getOne, set, modify, remove } = require("../shared/Query");
const { escapeQuot } = require("shared/functions");

class Query {
  async getCategoryList() {
    const categoryList = await getAll(`
      SELECT *
      FROM CATEGORY_LEVEL1
    `);
    const category2List = await getAll(`
      SELECT *
      FROM CATEGORY_LEVEL2
    `);
    const category3List = await getAll(`
      SELECT *
      FROM CATEGORY_LEVEL3
    `);
    const category4List = await getAll(`
      SELECT *
      FROM CATEGORY_LEVEL4
    `);

    return { categoryList, category2List, category3List, category4List };
  }

  async getCategory2List() {
    const res = await getAll(`
      SELECT \`CATEGORY_LEVEL2\`.\`category_level2_no\` AS \`CATEGORY_LEVEL2.category_level2_no\`, \`CATEGORY_LEVEL2\`.\`category_level2\` AS \`CATEGORY_LEVEL2.category_level2\`, \`CATEGORY_LEVEL2\`.\`category_level2_desc\` AS \`CATEGORY_LEVEL2.category_level2_desc\`, \`CATEGORY_LEVEL2\`.\`category_level2_url\` AS \`CATEGORY_LEVEL2.category_level2_url\`,
      \`CATEGORY_LEVEL3\`.\`category_level3_no\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.category_level3_no\`,  
      \`CATEGORY_LEVEL3\`.\`category_level2_no\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.category_level2_no\`,  
      \`CATEGORY_LEVEL3\`.\`category_level1_no\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.category_level1_no\`, 
      \`CATEGORY_LEVEL3\`.\`category_level3\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.category_level3\`, 
      \`CATEGORY_LEVEL3\`.\`category_level3_title\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.category_level3_title\`, 
      \`CATEGORY_LEVEL3\`.\`category_level3_desc\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.category_level3_desc\`, 
      \`CATEGORY_LEVEL3\`.\`is_open\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.is_open\`, 
      \`CATEGORY_LEVEL3\`.\`open_time\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.open_time\`, 
      \`CATEGORY_LEVEL3\`.\`start_time\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.start_time\`, 
      \`CATEGORY_LEVEL3\`.\`end_time\` AS \`CATEGORY_LEVEL2.CATEGORY_LEVEL3.end_time\`
      FROM CATEGORY_LEVEL2
        LEFT OUTER JOIN \`CATEGORY_LEVEL3\` ON \`CATEGORY_LEVEL3\`.\`category_level2_no\` = \`CATEGORY_LEVEL2\`.\`category_level2_no\`
      `);

    console.log;

    const result = res.map((v) => {
      const data = v.reduce((prev, currentValue) => {
        const index = prev.findIndex(
          (v) => v.category_level2_no === currentValue.category_level2_no
        );

        const copyObject = Object.assign({}, currentValue);

        delete copyObject.CATEGORY_LEVEL3;

        return index === -1
          ? prev.concat(
              Object.assign(copyObject, {
                CATEGORY_LEVEL3: currentValue.CATEGORY_LEVEL3.category_level3_no
                  ? [currentValue.CATEGORY_LEVEL3]
                  : [],
              })
            )
          : prev.filter((v, i) => {
              if (i === index) {
                v.CATEGORY_LEVEL3.push(currentValue.CATEGORY_LEVEL3);
              }
              return v;
            });
      }, []);
      const copyObject = Object.assign({}, v);
      delete copyObject.CATEGORY_LEVEL2;

      return { ...copyObject, CATEGORY_LEVEL2: data };
    });

    return result;
  }

  async getTermsList() {
    const res = await getAll(`
    SELECT terms_no, terms_gubun, terms_contents
    FROM TERMS`);

    return res;
  }

  async getCategory(category) {
    const res = await getOne(`
      SELECT category_level3_no, category_level2_no, category_level1_no, is_open, open_time, start_time, end_time
      FROM CATEGORY_LEVEL3
      WHERE category_level3_no = ${category}
    `);
    return res;
  }
  async getCategoryByLv2(categoryLevel2No) {
    const res = await getAll(`
      SELECT category_level3_no, category_level2_no, category_level1_no, category_level3, category_level3_title, category_level3_desc, open_time, is_open, start_time, end_time, created_at
      FROM CATEGORY_LEVEL3
      WHERE category_level2_no = ${categoryLevel2No}
    `);
    return res;
  }
  async getSettings() {
    return await getAll(`
            SELECT setting_no, type, value
            FROM SETTING     
        `);
  }

  async getBannerByCategory({ category3No }) {
    return await getOne(`
      SELECT category_level3_no, banner_pc_url, banner_mobile_url, redirect_url
      FROM CATEGORY_LEVEL3
      WHERE category_level3_no = ${category3No} AND is_open = 1 AND open_time <= NOW() AND start_time <= NOW()
    `);
  }

  /**
   *
   *  push값이랑 곱해주세요
   *  ex) 0.05로 포인트값이 나오면 push가 1000일때 1000 * 0.05 = 20
   */

  async getPointPercent(config) {
    const result = await getOne(
      `SELECT CAST(SETTING.value * 0.01 AS DECIMAL(3, 2)) AS pointPercent FROM SETTING WHERE SETTING.TYPE ='pointPercent'`,
      config
    );

    return Number(result.pointPercent);
  }

  async getIsPushByCategory3No({ category3No }, config) {
    const result = await getOne(
      `
        SELECT IFNULL(IF(COUNT(category_level3_no) > 0 , 1, 0 ), 0) AS is_push
        FROM CATEGORY_LEVEL3
        WHERE category_level3_no = ${category3No} AND is_open = 1 AND is_push = 1 
          AND open_time <= NOW() AND start_time <= NOW() AND  NOW() < end_time
          AND category_level1_no = 1
      `,
      config
    );

    return result && Boolean(result.is_push);
  }

  async getCategory4(category4No) {
    const res = await getOne(`
      SELECT *
      FROM CATEGORY_LEVEL4
      WHERE category_level4_no = ${category4No}
    `);
    return res;
  }

  async getRoundByCategory3No(category3No) {
    const res = await getAll(`
      SELECT *
      FROM CATEGORY_LEVEL4
      WHERE category_level3_no = ${category3No}  AND start_time <= NOW()
      ORDER BY start_time DESC
    `);
    return res;
  }

  // 일일 푸쉬 한도량 조회
  async getPushLimit() {
    const res = await getOne(
      `
        SELECT value
        FROM SETTING
        WHERE type = 'pushLimit'
      `
    );

    return Number(res && res.value);
  }

  async getOpenRound({ category3No }) {
    const res = await getOne(`
      SELECT TEMP.*
      FROM (
        SELECT *
        FROM (	
          SELECT *
          FROM CATEGORY_LEVEL4
          ORDER BY open_time DESC
        ) AS CL4
        WHERE category_level3_no  = ${category3No}
      ) AS TEMP
      WHERE is_open = 1 AND TEMP.open_time <= NOW() AND TEMP.start_time <= NOW() AND NOW() < TEMP.end_time
    `);

    return res ? res : Boolean(res);
  }

  // 배너 조회
  async getBanners({ type }) {
    return await getAll(`
      SELECT banner_no, type, banner_url, redirect_url
      FROM BANNER
      WHERE ${type ? `type = ${escapeQuot(type)} AND ` : ""} is_open = 1
    `);
  }

  async getDreamersByProducerNo({ producerNo }) {
    return await getAll(`
      SELECT PUSH_LOG.dreamer_no, PUSH_LOG.category_level1_no, PUSH_LOG.category_level2_no, PUSH_LOG.category_level3_no, PUSH_LOG.category_level4_no,
        CL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
        CL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
        CL2.category_level2_desc AS \`CATEGORY_LEVEL2.category_level2_desc\`,
        
        CL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CL3.category_level2_no AS \`CATEGORY_LEVEL3.category_level2_no\`,
        CL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        
        CL4.category_level4_no AS \`CATEGORY_LEVEL4.category_level4_no\`,
        CL4.category_level3_no AS \`CATEGORY_LEVEL4.category_level3_no\`,
        CL4.title AS \`CATEGORY_LEVEL4.title\`,
        CL4.ordinalNumber AS \`CATEGORY_LEVEL4.ordinalNumber\`,
        CL4.start_time AS \`CATEGORY_LEVEL4.start_time\`,
        CL4.end_time AS \`CATEGORY_LEVEL4.end_time\`
      FROM PUSH_LOG
        INNER JOIN (
          SELECT category_level4_no, category_level3_no, title, ordinalNumber, start_time, end_time
          FROM CATEGORY_LEVEL4
          WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
        ) AS CL4 ON CL4.category_level4_no = PUSH_LOG.category_level4_no
        INNER JOIN (
          SELECT category_level3_no, category_level2_no, CATEGORY_LEVEL3
          FROM CATEGORY_LEVEL3
          WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
        ) AS CL3 ON CL3.category_level3_no = CL4.category_level3_no
        INNER JOIN (
          SELECT category_level2_no, category_level2, category_level2_desc
          FROM CATEGORY_LEVEL2
        ) AS CL2 ON CL2.category_level2_no = CL3.category_level2_no
      WHERE PUSH_LOG.gubun = 'PUSH' AND PUSH_LOG.producer_no = ${producerNo}
      GROUP BY PUSH_LOG.dreamer_no, PUSH_LOG.category_level2_no, PUSH_LOG.category_level3_no, PUSH_LOG.category_level4_no
    `);
  }

  // 진행중인 대회 조회
  async getOpenedParticipationSeason({ me }) {
    const isParticipationCondition = me
      ? `,(
      SELECT IF(COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no) > 0 , 1, 0)
      FROM UPLOAD_POSSIBLE_USER
      WHERE UPLOAD_POSSIBLE_USER.user_no = ${me} AND UPLOAD_POSSIBLE_USER.category_level4_no = CATEGORY_LEVEL4.category_level4_no
    ) AS is_participation`
      : "";
    // AND CATEGORY_LEVEL4.open_time <= NOW()
    return getAll(`
      SELECT 
        CL3.category_level3_no,
        CL3.category_level2_no, 
        CL3.category_level1_no, 
        CL3.start_time, 
        CL3.end_time, 
        CL3.banner_pc_url, 
        CL3.banner_mobile_url, 
        CL3.banner_representative_url,
        CL3.category_level3, CL3.category_level3_desc, CL3.eligibility_participate, CL3.judging_method, CL3.reward, CL3.progress_schedule, CL3.notice,
        CL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,  
        CL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`, 
        CL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`
        ${isParticipationCondition}
      FROM CATEGORY_LEVEL4
        INNER JOIN (
          SELECT *
          FROM CATEGORY_LEVEL3
          WHERE is_open = 1 AND start_time <= NOW() AND NOW() < end_time
        ) AS CL3 ON CL3.category_level3_no = CATEGORY_LEVEL4.category_level3_no
        INNER JOIN (
          SELECT category_level2_no, category_level2, category_level2_icon
          FROM CATEGORY_LEVEL2
        ) AS CL2 ON CL2.category_level2_no = CL3.category_level2_no
      WHERE CATEGORY_LEVEL4.ordinalNumber = 1  AND CATEGORY_LEVEL4.start_time <= NOW() AND NOW() < CATEGORY_LEVEL4.end_time
    `);
  }

  // 대회 조회
  async getSeasonBySeasonNo({ me, category3No }, config) {
    const isParticipationCondition = me
      ? ` ,(
        SELECT IF(COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no) > 0 , 1, 0)
        FROM UPLOAD_POSSIBLE_USER
        INNER JOIN (
            SELECT CATEGORY_LEVEL3.category_level3_no, CATEGORY_LEVEL3.category_level3
            FROM CATEGORY_LEVEL3
            WHERE CATEGORY_LEVEL3.is_open = 1  AND CATEGORY_LEVEL3.open_time <= NOW() AND CATEGORY_LEVEL3.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL3.end_time
          ) AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
          INNER JOIN (
            SELECT CATEGORY_LEVEL4.category_level1_no, CATEGORY_LEVEL4.category_level2_no, 
              CATEGORY_LEVEL4.category_level3_no,CATEGORY_LEVEL4.category_level4_no, CATEGORY_LEVEL4.ordinalNumber, CATEGORY_LEVEL4.title
            FROM CATEGORY_LEVEL4
            WHERE CATEGORY_LEVEL4.is_open = 1 AND CATEGORY_LEVEL4.open_time <= NOW() AND CATEGORY_LEVEL4.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL4.end_time
          ) AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
        WHERE UPLOAD_POSSIBLE_USER.user_no = ${me} AND UPLOAD_POSSIBLE_USER.is_participate = 1 AND UPLOAD_POSSIBLE_USER.category_level3_no = ${category3No}
      ) AS is_participation_this_season`
      : "";

    // AND CATEGORY_LEVEL4.open_time <= NOW()
    return getOne(
      `
      SELECT CL3.category_level3_no, CL3.category_level2_no, CL3.category_level1_no, CL3.start_time, CL3.end_time, CL3.banner_pc_url, CL3.banner_mobile_url, 
        CL3.category_level3, CL3.category_level3_desc, CL3.eligibility_participate, CL3.judging_method, CL3.reward, CL3.eligibility_participate, CL3.progress_schedule, CL3.notice,
        CL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,  
        CL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`, 
        CL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
        CATEGORY_LEVEL4.category_level4_no AS \`CATEGORY_LEVEL4.category_level4_no\`,
        CATEGORY_LEVEL4.start_time AS \`CATEGORY_LEVEL4.start_time\`,
        CATEGORY_LEVEL4.end_time AS \`CATEGORY_LEVEL4.end_time\`
        ${isParticipationCondition}
      FROM CATEGORY_LEVEL4
        INNER JOIN (
          SELECT *
          FROM CATEGORY_LEVEL3
          WHERE is_open = 1 
        ) AS CL3 ON CL3.category_level3_no = CATEGORY_LEVEL4.category_level3_no
        INNER JOIN (
          SELECT category_level2_no, category_level2, category_level2_icon
          FROM CATEGORY_LEVEL2
        ) AS CL2 ON CL2.category_level2_no = CL3.category_level2_no
      WHERE CATEGORY_LEVEL4.ordinalNumber = 1 AND CATEGORY_LEVEL4.category_level3_no = ${category3No}
      FOR UPDATE
    `,
      config
    );
  }

  // 진행중인 경연(CATEGORY_LEVEL3) 목록
  async getRunningCategoryLv3List({ orderByCreatedAt }) {
    let orderCondition = "";

    if (orderByCreatedAt) {
      orderCondition = "ORDER BY CATEGORY_LEVEL3.start_time DESC";
    }

    return getAll(`
      SELECT CATEGORY_LEVEL3.category_level3_no, 
      CATEGORY_LEVEL3.title,
      CATEGORY_LEVEL2.category_level2_no, 
      CATEGORY_LEVEL2.category_level2, 
      CATEGORY_LEVEL2.category_level2_korean_title, 
      CATEGORY_LEVEL2.category_level2_gradient_icon
      FROM CATEGORY_LEVEL3
        INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = CATEGORY_LEVEL3.category_level2_no
      WHERE is_open = 1 AND NOW() BETWEEN start_time AND end_time
      ${orderCondition}
    `);
  }
}

module.exports = Query;
