const { getAll, getOne, set, modify, remove } = require("shared/Query");
const {
  setLog,
  escapeQuot,
  escapeQuotAllowNull,
  YYMDtoDashForm,
  dashFormYYMDHMS,
} = require("shared/functions");

class PgLogQuery {
  async setPgLog({ userNo, pgcode, product, amount, pushPoint }) {
    setLog("setPgLog", {
      query: `INSERT INTO PG_LOG (user_no, pgcode, product, amount, push_point) VALUES (${userNo}, ${escapeQuot(
        pgcode
      )}, ${escapeQuot(product)}, ${escapeQuot(amount)}, ${escapeQuotAllowNull(
        pushPoint
      )})`,
    });
    const res = await set(`
      INSERT INTO PG_LOG (user_no, pgcode, product, amount, push_point) VALUES (${userNo}, ${escapeQuot(
      pgcode
    )}, ${escapeQuot(product)}, ${escapeQuot(amount)}, ${escapeQuotAllowNull(
      pushPoint
    )})
    `);
    return res;
  }
  // 충전내역 by pgLogNo
  async getPgLog({ pgLogNo }) {
    const res = await getOne(`
      SELECT PG_LOG.pg_log_no, PG_LOG.user_no, PG_LOG.pgcode, PG_LOG.bank_name, PG_LOG.pay_info, PG_LOG.expire_date, PG_LOG.product, PG_LOG.amount, PG_LOG.push_point, PG_LOG.have_push, PG_LOG.status, PG_LOG.tid, PG_LOG.charging_time, PG_LOG.created_at
      FROM PG_LOG WHERE pg_log_no = ${pgLogNo}
    `);
    return res;
  }
  // 충전내역 by parent_no (creditcard|banktransfer 결제 완료 data)
  async getPgLogByParent({ pgLogNo }) {
    const res = await getOne(`
      SELECT PG_LOG.pg_log_no, PG_LOG.parent_no, PG_LOG.user_no, PG_LOG.pgcode, PG_LOG.bank_name, PG_LOG.pay_info, PG_LOG.expire_date, PG_LOG.product, PG_LOG.amount, PG_LOG.push_point, PG_LOG.have_push, PG_LOG.status, PG_LOG.tid, PG_LOG.charging_time, PG_LOG.created_at
      FROM PG_LOG WHERE parent_no = ${pgLogNo}
    `);
    return res;
  }
  // 내 충전내역 전체조회 by userNo
  async getMyPgLog({ userNo, pgcode, startDate, endDate }) {
    let andCondition = "";
    if (pgcode) {
      andCondition += ` AND PG_LOG.pgcode = ${escapeQuot(pgcode)}`;
    }
    if (startDate) {
      andCondition += ` AND PG_LOG.updated_at BETWEEN ${escapeQuot(
        startDate
      )} AND ${escapeQuot(endDate + " 23:59:59")}`;
    }
    const NOW = dashFormYYMDHMS(new Date());
    const res = await getAll(`
      SELECT PG_LOG.pg_log_no, PG_LOG.user_no, PG_LOG.pgcode, PG_LOG.bank_name, PG_LOG.pay_info, PG_LOG.expire_date, PG_LOG.product, PG_LOG.amount, PG_LOG.push_point, PG_LOG.have_push, PG_LOG.status, PG_LOG.charging_time, PG_LOG.created_at, PG_LOG.updated_at
      FROM PG_LOG WHERE user_no = ${userNo}${andCondition} AND status BETWEEN 1 AND 2 AND (expire_date > '${NOW}' OR pgcode != 'virtualaccount')
      ORDER BY PG_LOG.updated_at DESC
    `);
    return res;
  }

  async modifyPayInfo({ pgLogNo, accountNo, bank_name, expire_date, status }) {
    await modify(`
      UPDATE PG_LOG SET pay_info = ${escapeQuotAllowNull(
        accountNo
      )}, bank_name = ${escapeQuotAllowNull(
      bank_name
    )}, expire_date = ${YYMDtoDashForm(expire_date)}
    ${status ? `, status = ${status}` : ""}
    
    WHERE pg_log_no = ${pgLogNo}
    `);
    return "modifyPayInfo success";
  }

  // PUSH 충전 성공
  async modifyPgLog({ pgLogNo, status, havePush, charging_time, pay_info }) {
    await modify(`
      UPDATE PG_LOG SET status = ${status}, have_push = ${havePush}, charging_time = '${
      charging_time
        ? dashFormYYMDHMS(new Date(charging_time))
        : dashFormYYMDHMS(new Date())
    }', pay_info = ${escapeQuotAllowNull(pay_info)} WHERE pg_log_no = ${pgLogNo}
    `);
    return "modifyPgLog success";
  }

  // PUSH 충전 실패
  async failureCharging({ pgLogNo, status }) {
    await modify(`
      UPDATE PG_LOG SET status = ${status} WHERE pg_log_no = ${pgLogNo}
    `);
    return "modifyPgLog success";
  }

  // PUSH 충전 결과
  async setPgCallback({
    parentNo,
    userNo,
    pgcode,
    bank_name,
    pay_info,
    product,
    amount,
    pushPoint,
    havePush,
    status,
    charging_time,
    tid,
  }) {
    setLog("setPgCallback", {
      query: `INSERT INTO PG_LOG (parent_no, user_no, pgcode, bank_name, pay_info, product, amount, push_point, have_push, status, tid, charging_time)
    VALUES (${escapeQuotAllowNull(parentNo)}, ${escapeQuotAllowNull(
        userNo
      )}, ${escapeQuotAllowNull(pgcode)}, ${escapeQuotAllowNull(
        bank_name
      )}, ${escapeQuotAllowNull(pay_info)}, ${escapeQuotAllowNull(
        product
      )}, ${escapeQuotAllowNull(amount)}, ${escapeQuotAllowNull(
        pushPoint
      )}, ${escapeQuotAllowNull(havePush)}, ${escapeQuotAllowNull(
        status
      )}, ${escapeQuotAllowNull(tid)}, ${escapeQuotAllowNull(charging_time)})`,
    });
    const res = await set(`
      INSERT INTO PG_LOG (parent_no, user_no, pgcode, bank_name, pay_info, product, amount, push_point, have_push, status, tid, charging_time)
      VALUES (${escapeQuotAllowNull(parentNo)}, ${escapeQuotAllowNull(
      userNo
    )}, ${escapeQuotAllowNull(pgcode)}, ${escapeQuotAllowNull(
      bank_name
    )}, ${escapeQuotAllowNull(pay_info)}, ${escapeQuotAllowNull(
      product
    )}, ${escapeQuotAllowNull(amount)}, ${escapeQuotAllowNull(
      pushPoint
    )}, ${escapeQuotAllowNull(havePush)}, ${escapeQuotAllowNull(
      status
    )}, ${escapeQuotAllowNull(tid)}, ${escapeQuotAllowNull(charging_time)})
    `);
    return res;
  }
}
module.exports = PgLogQuery;
