const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuotAllowNull } = require("shared/functions");

class DeviceTokenLogQuery {
  async setTokenLog({ token, userNo }) {
    const res = await set(`
      INSERT INTO DEVICE_TOKEN_LOG (user_no, token) VALUES (${escapeQuotAllowNull(
        userNo
      )}, ${escapeQuotAllowNull(token)})
    `);
    return res;
  }
}

module.exports = DeviceTokenLogQuery;
