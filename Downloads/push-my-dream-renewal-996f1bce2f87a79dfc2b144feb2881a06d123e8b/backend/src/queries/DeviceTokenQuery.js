const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuotAllowNull } = require("shared/functions");

class DeviceTokenQuery {
  async setToken({ token, userNo, os }) {
    // // token이 존재 하지 않을 때만 INSERT하기
    // const res = await set(`
    //   INSERT INTO DEVICE_TOKEN (token)
    //     SELECT ${escapeQuotAllowNull(token)}
    //     FROM DUAL
    //     WHERE NOT EXISTS
    //       (SELECT token FROM DEVICE_TOKEN WHERE token = ${escapeQuotAllowNull(
    //         token
    //       )})
    //     LIMIT 1
    // `);
    // 해당 token정보가 존재하는지 확인
    const existToken = await getOne(
      `SELECT device_token_no FROM DEVICE_TOKEN WHERE token = ${escapeQuotAllowNull(
        token
      )}`
    );
    let res;
    // 존재하면 userNo, os정보 업데이트
    if (existToken) {
      let set = "";
      if (userNo) {
        set += ` SET user_no = ${userNo}`;
      }
      if (os) {
        if (set.length === 0) {
          set += ` SET os = ${escapeQuotAllowNull(os)}`;
        } else {
          set += `, os = ${escapeQuotAllowNull(os)}`;
        }
      }
      if (set.length > 0) {
        res = await modify(
          `UPDATE DEVICE_TOKEN${set} WHERE device_token_no = ${existToken.device_token_no}`
        );
      }
      // 존재하지 않으면 token, os정보 삽입
    } else {
      res = await set(
        `INSERT INTO DEVICE_TOKEN (token, os) VALUES (${escapeQuotAllowNull(
          token
        )}, ${escapeQuotAllowNull(os)})`
      );
    }
    return res;
  }

  async getTokenList() {
    const tokenList = await getAll(`
      SELECT device_token_no, token FROM DEVICE_TOKEN
    `);
    return tokenList;
  }

  // user_no, os 업데이트
  async modifyToken({ token, userNo, os }) {
    let set = "";
    if (userNo) {
      set += ` SET user_no = ${userNo}`;
    }
    if (os) {
      if (set.length === 0) {
        set += ` SET os = ${os}`;
      } else {
        set += `, os = ${os}`;
      }
    }
    const res = await modify(`UPDATE DEVICE_TOKEN SET `);
  }
}

module.exports = DeviceTokenQuery;
