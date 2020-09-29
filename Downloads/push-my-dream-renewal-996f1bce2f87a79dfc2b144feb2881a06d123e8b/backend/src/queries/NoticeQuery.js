const { getAll, getOne } = require("shared/Query");
const moment = require("moment");
const { escapeQuot } = require("shared/functions");

class NoticeQuery {
  // 게시글 조회
  async getNotice(type, offset, limit) {
    const notice = await getOne(`
      SELECT COUNT(1) AS noticeCount
      FROM NOTICE
      WHERE is_pin = 0 AND type = ${escapeQuot(type)}
    `);
    const noticeIsPinList = await getAll(`
      SELECT NOTICE.notice_no, ADMIN.admin_name, NOTICE.is_pin, NOTICE.is_popup, NOTICE.title, NOTICE.contents, NOTICE.gubun, NOTICE.photo, NOTICE.event_photo, NOTICE.url, NOTICE.event_url, NOTICE.pin_start_time, NOTICE.pin_end_time, NOTICE.popup_start_time, NOTICE.popup_end_time, NOTICE.popup_close, NOTICE.event_start_time, NOTICE.event_end_time, NOTICE.created_at, NOTICE.updated_at
      FROM NOTICE
        INNER JOIN ADMIN ON ADMIN.admin_no = NOTICE.admin_no
      WHERE is_pin = 1 AND type = ${escapeQuot(type)}
      ORDER BY created_at DESC
    `);
    const noticeList = await getAll(`
      SELECT NOTICE.notice_no, ADMIN.admin_name, NOTICE.is_pin, NOTICE.is_popup, NOTICE.title, NOTICE.contents, NOTICE.gubun, NOTICE.photo, NOTICE.event_photo, NOTICE.url, NOTICE.event_url, NOTICE.pin_start_time, NOTICE.pin_end_time, NOTICE.popup_start_time, NOTICE.popup_end_time, NOTICE.popup_close, NOTICE.event_start_time, NOTICE.event_end_time, NOTICE.created_at, NOTICE.updated_at
      FROM NOTICE
        INNER JOIN ADMIN ON ADMIN.admin_no = NOTICE.admin_no
      WHERE is_pin = 0 AND type = ${escapeQuot(type)}
      ORDER BY created_at DESC, notice_no DESC
      LIMIT ${offset}, ${limit}
    `);
    if (type === "notice") {
      return {
        noticeCount: notice.noticeCount,
        offset: parseInt(offset, 10) + parseInt(limit, 10),
        noticeIsPinList,
        noticeList,
      };
    } else if (type === "event") {
      return {
        eventCount: notice.noticeCount,
        offset: parseInt(offset, 10) + parseInt(limit, 10),
        eventPinList: noticeIsPinList,
        eventList: noticeList,
      };
    }
  }
  // 팝업 게시글 조회
  async getPopupNotice() {
    const result = await getAll(`
      SELECT notice_no, title, contents, gubun, photo, url, popup_close
      FROM NOTICE
      WHERE is_popup = 1 AND '${moment().format()}' BETWEEN popup_start_time AND popup_end_time
    `);
    return result;
  }
}

module.exports = NoticeQuery;
