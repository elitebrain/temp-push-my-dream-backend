const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot } = require("shared/functions");

class PreReservationQuery {
  // 경연 참가 조회
  async getPreReservation({ userNo, preReservation, isFund }) {
    return await getOne(`
    SELECT *
    FROM PRE_RESERVATION
    WHERE user_no = ${userNo} AND pre_reservation=${escapeQuot(
      preReservation
    )} AND is_fund = ${isFund}`);
  }

  // 사전예약 등록
  async setPreReservation({ userNo, preReservation, isFund }) {
    return await set(
      `INSERT INTO PRE_RESERVATION (user_no, pre_reservation, is_fund)
       VALUES (${escapeQuot(userNo)}, ${escapeQuot(preReservation)}, ${isFund})`
    );
  }

  // 프로듀서 사전예약 조회
  async getPreProducerByUserId(userNo) {
    return await getOne(`
      SELECT *
      FROM PRE_RESERVATION
      WHERE user_no =${userNo} AND pre_reservation = 'producer' AND is_fund = false
    `);
  }
}

module.exports = PreReservationQuery;
