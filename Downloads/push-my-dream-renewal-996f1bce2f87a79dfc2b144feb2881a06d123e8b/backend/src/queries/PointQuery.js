const { getAll, getOne, set, modify, remove } = require("shared/Query");

class PointQuery {
  // 포인트 번호 조회
  async existPointNo(
    {
      producerNo,
      dreamerNo,
      categoryLevel1No,
      categoryLevel2No,
      categoryLevel3No,
      categoryLevel4No,
    },
    config
  ) {
    const result = await getOne(
      `
        SELECT point_no
        FROM POINT
        WHERE producer_no =${producerNo} AND dreamer_no = ${dreamerNo} AND category_level1_no = ${categoryLevel1No} 
            AND category_level2_no = ${categoryLevel2No} AND category_level3_no = ${categoryLevel3No} AND category_level4_no = ${categoryLevel4No}
        FOR UPDATE
        `,
      config
    );

    return result ? result.point_no : null;
  }

  // 포인트 번호 생성
  async createPointNo(
    {
      producerNo,
      dreamerNo,
      categoryLevel1No,
      categoryLevel2No,
      categoryLevel3No,
      categoryLevel4No,
    },
    config
  ) {
    const result = await set(
      `
        INSERT INTO POINT(producer_no, dreamer_no, category_level1_no, category_level2_no, category_level3_no, category_level4_no)
        VALUES (${producerNo}, ${dreamerNo}, ${categoryLevel1No}, ${categoryLevel2No}, ${categoryLevel3No}, ${categoryLevel4No})
    `,
      config
    );

    // 생성된 point 번호 반환
    return result[0];
  }

  // 포인트 수급
  async addPoint({ pointNo, push }, config) {
    await modify(
      `
        UPDATE POINT SET point = point + (
          SELECT CAST(${push} * SETTING.value * 0.01 AS SIGNED)
          FROM SETTING
          WHERE SETTING.type = 'pointPercent'
        )
        WHERE point_no = ${pointNo}
    `,
      config
    );
  }

  // 획득 포인트 조회
  async getAddPoint({ push }, config) {
    const res = await getOne(
      `
      SELECT CAST(${push} * SETTING.value * 0.01 AS SIGNED) AS addPoint 
      FROM SETTING
      WHERE SETTING.type = 'pointPercent'
    `,
      config
    );

    return res.addPoint;
  }
}

module.exports = PointQuery;
