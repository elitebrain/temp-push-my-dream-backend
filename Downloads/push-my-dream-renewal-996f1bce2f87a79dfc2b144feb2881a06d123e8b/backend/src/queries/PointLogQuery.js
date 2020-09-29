const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot } = require("shared/functions");

class PointLogQuery {
  async setLogByPush({ pointNo, fkNo, push }, config) {
    await set(
      `
        INSERT INTO POINT_LOG(point_no, fk_no, gubun, total_point, point)
        VALUES (${pointNo}, ${fkNo}, 'PUSH', 
          (
            SELECT point
            FROM POINT
            WHERE point_no = ${pointNo}
          )
        ,(
            SELECT CAST(${push} * SETTING.value * 0.01 AS SIGNED)
            FROM SETTING
            WHERE SETTING.type = 'pointPercent'
          )
        )
    
    `,
      config
    );
  }
}

module.exports = PointLogQuery;
