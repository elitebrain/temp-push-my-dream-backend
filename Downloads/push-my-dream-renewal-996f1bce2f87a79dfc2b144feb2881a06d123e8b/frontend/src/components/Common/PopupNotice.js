import React, { useState } from "react";
import PropTypes from "prop-types";

import closeIco from "public/assets/icon/close_ico.svg";

function getCookie(noticeNo) {
  var nameOfCookie = `popup_${noticeNo}=`;
  var x = 0;
  while (x <= document.cookie.length) {
    var y = x + nameOfCookie.length;
    if (document.cookie.substring(x, y) == nameOfCookie) {
      let endOfCookie;
      if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
        endOfCookie = document.cookie.length;
      return unescape(document.cookie.substring(y, endOfCookie));
    }
    x = document.cookie.indexOf(" ", x) + 1;
    if (x == 0) break;
  }
  return "";
}

const PopupNotice = props => {
  const { popupNotice } = props;
  const [width, setWidth] = useState("auto");
  const [height, setHeight] = useState("auto");
  const imageOnLoad = e => {
    const ratioImage = e.target.naturalWidth / e.target.naturalHeight;
    const ratioFrame = 450 / 660;
    if (ratioFrame > ratioImage) {
      setWidth("auto");
      setHeight("100%");
    } else {
      setWidth("100%");
      setHeight("auto");
    }
  };
  const handleClose = noticeNo => {
    document.getElementById(noticeNo).style.display = "none";
  };
  const _closeOneDay = noticeNo => {
    let expiredays = 1;
    let today = new Date();
    today = new Date(
      parseInt(today.getTime() / 86400000) * 86400000 + 54000000
    );
    if (today > new Date()) {
      expiredays--;
    }
    today.setDate(today.getDate() + expiredays);
    document.cookie = `popup_${noticeNo}=hidden;path=/;expires=${today.toUTCString()};`;
    handleClose(noticeNo);
  };

  return (
    <div>
      {popupNotice &&
        popupNotice.map((notice, i) =>
          getCookie(notice.notice_no) !== "hidden" &&
          notice.gubun === "image" ? (
            <div
              key={notice.notice_no}
              id={notice.notice_no}
              className="popup_container"
              style={{
                top: `${(i + 1) * 40}px`,
                right: `${(i + 1) * 40}px`,
                zIndex: i + 1000
              }}
            >
              <div
                className="popup_close"
                onClick={() => handleClose(notice.notice_no)}
              >
                <img src={closeIco} alt="close_ico" />
              </div>
              <a href={notice.url} target="_blank">
                <img
                  src={notice.photo}
                  alt="notice_photo"
                  className="popup_image"
                  onLoad={imageOnLoad}
                />
              </a>
              <div
                className="close_term"
                onClick={() => _closeOneDay(notice.notice_no)}
              >
                오늘 하루 안보기
              </div>
            </div>
          ) : (
            getCookie(notice.notice_no) !== "hidden" && (
              <div
                key={notice.notice_no}
                id={notice.notice_no}
                className="popup_container bg_white"
                style={{
                  top: `${(i + 1) * 40}px`,
                  right: `${(i + 1) * 40}px`,
                  zIndex: i + 1000
                }}
              >
                <div className="title_container">
                  <div className="title">{notice.title}</div>
                </div>
                <div
                  className="contents"
                  dangerouslySetInnerHTML={{ __html: notice.contents }}
                />
                <div
                  className="popup_close"
                  onClick={() => handleClose(notice.notice_no)}
                >
                  <img src={closeIco} alt="close_ico" />
                </div>
                <div
                  className="close_term"
                  onClick={() => _closeOneDay(notice.notice_no)}
                >
                  오늘 하루 안보기
                </div>
              </div>
            )
          )
        )}
      <style jsx>{`
        .popup_container {
          position: fixed;
          width: 450px;
          height: 660px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        }
        .close_term {
          position: absolute;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
          width: calc(100% - 6px);
          text-align: right;
          right: -1px;
          height: 30px;
          bottom: -32px;
          padding-right: 6px;
          border: 1px solid #000;
        }
        .close_term:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        .popup_close {
          position: absolute;
          width: 20px;
          height: 20px;
          top: 4px;
          right: 4px;
        }
        .popup_close:hover {
          cursor: pointer;
        }
        .title_container {
          padding: 40px 20px 20px;
          background-color: #f38400;
        }
        .title {
          height: 64px;
          line-height: 32px;
          font-size: 22px;
          font-weight: 700;
          overflow: hidden;
          color: #fff;
        }
        .contents {
          height: 494px;
          padding: 20px;
          overflow-x: hidden;
          overflow-y: auto;
          word-break: break-all;
        }
        .popup_close > img {
          width: 100%;
          height: 100%;
        }
        .popup_image {
          width: ${width};
          height: ${height};
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .bg_white {
          background-color: #fff;
        }
      `}</style>
      <style jsx global>{`
        .contents img {
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

PopupNotice.propTypes = {
  popupNotice: PropTypes.array
};

export default PopupNotice;
