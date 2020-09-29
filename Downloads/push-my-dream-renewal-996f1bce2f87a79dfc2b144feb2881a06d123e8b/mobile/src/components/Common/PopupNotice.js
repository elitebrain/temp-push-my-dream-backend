import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import closeIco from "public/assets/icon/close_ico.svg";
import { handleRedirectUrl } from "shared/functions";

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

const PopupNotice = (props) => {
  const { popupNotice, popupOpacity, handleClose } = props;
  const [closedNoticeNo, setClosedNoticeNo] = useState([]);
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("auto");
  const imageOnLoad = (e) => {
    // const ratioImage = e.target.naturalWidth / e.target.naturalHeight;
    // const ratioFrame = 450 / 660;
    // if (ratioFrame > ratioImage) {
    //   setWidth("auto");
    //   setHeight("100%");
    // } else {
    //   setWidth("100%");
    //   setHeight("auto");
    // }
  };
  const _handleClose = (noticeNo) => {
    document.getElementById(noticeNo).style.display = "none";
    setClosedNoticeNo((prev) => [...prev, noticeNo]);
    // handleClose();
  };
  const _closeOneDay = (noticeNo) => {
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
    _handleClose(noticeNo);
  };
  // useEffect(() => {
  //   if (popupOpacity === 0) {
  //     setTimeout(() => handleClose(), 1000);
  //   }
  //   return console.log("a");
  // }, [popupOpacity]);

  // popupNotice 모두 닫으면 handleClose() 영상보기로 이동
  useEffect(() => {
    if (
      popupNotice.filter((v) => closedNoticeNo.indexOf(v.notice_no) === -1)
        .length === 0
    ) {
      handleClose();
    }
  }, [closedNoticeNo]);
  console.log("closedNoticeNo", closedNoticeNo, popupNotice);
  return (
    <div>
      {popupNotice &&
        popupNotice.map((notice, i) =>
          getCookie(notice.notice_no) !== "hidden" &&
          notice.gubun === "image" ? (
            <div
              key={notice.notice_no}
              id={notice.notice_no}
              className="popup_container gubun_image"
              style={{
                zIndex: i + 1000,
              }}
            >
              <div className="wrapper">
                <div
                  className="popup_close"
                  onClick={() => _handleClose(notice.notice_no)}
                >
                  <img src={closeIco} alt="close_ico" />
                </div>
                <div
                  className="popup_image_wrapper"
                  onClick={() => handleRedirectUrl(notice.url)}
                >
                  {/* <a href={notice.url} target="_blank"> */}
                  <img
                    src={notice.photo}
                    alt="notice_photo"
                    className="popup_image"
                    onLoad={imageOnLoad}
                  />
                  {/* </a> */}
                </div>
                <div
                  className="close_term"
                  onClick={() => _closeOneDay(notice.notice_no)}
                >
                  오늘 하루 안보기
                </div>
              </div>
            </div>
          ) : (
            getCookie(notice.notice_no) !== "hidden" && (
              <div
                key={notice.notice_no}
                id={notice.notice_no}
                className="popup_container bg_white"
                style={{
                  zIndex: i + 1000,
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
                  onClick={() => _handleClose(notice.notice_no)}
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
          opacity: ${popupOpacity};
          width: 300px;
          height: 440px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: 0.3s ease-in-out;
        }
        .gubun_image {
          /* max-width: 400px;
          width: 95vw;
          height: 100vh; */
          overflow-y: auto;
          overflow-x: hidden;
        }
        .wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
        .close_term {
          position: absolute;
          color: #aaa;
          width: calc(100% - 6px);
          text-align: right;
          right: -1px;
          height: 30px;
          bottom: 0;
          padding-right: 6px;
          font-size: 12px;
        }
        .wrapper .close_term {
          position: relative;
        }
        .close_term:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        .popup_close {
          position: absolute;
          width: 20px;
          height: 20px;
          right: 4px;
          top: 4px;
        }
        .wrapper .popup_close {
          position: static;
          margin-bottom: 10px;
          margin-left: auto;
        }
        .popup_close:hover {
          cursor: pointer;
        }
        .title_container {
          padding: 40px 20px 20px;
          background-color: #f38400;
        }
        .title {
          height: 72px;
          line-height: 24px;
          font-size: 20px;
          font-weight: 700;
          overflow: hidden;
          color: #fff;
        }
        .contents {
          height: 268px;
          padding: 20px;
          overflow-x: hidden;
          overflow-y: auto;
          word-break: break-all;
        }
        .popup_close > img {
          width: 100%;
          height: 100%;
        }
        .popup_image_wrapper {
          width: 100%;
          height: 380px;
          overflow: auto;
        }
        .popup_image {
          width: ${width};
          height: ${height};
          position: relative;
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
  popupNotice: PropTypes.array,
};

export default PopupNotice;
