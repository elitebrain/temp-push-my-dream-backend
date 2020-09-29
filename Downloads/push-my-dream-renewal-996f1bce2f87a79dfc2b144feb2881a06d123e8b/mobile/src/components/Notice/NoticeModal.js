import React from "react";
import { dateToDotYYMD } from "shared/functions";

const NoticeModal = (props) => {
  const { notice, closeNoticeModal } = props;
  console.log("notice", notice);
  return (
    <div className="modal_rectangle" style={{ zIndex: 999 }}>
      <div className="modal__content notice_modal">
        <div className="container_modal">
          <div className="title_cover">
            <div className="top">
              <div className="created_at">
                {dateToDotYYMD(new Date(notice.created_at))}
              </div>
              <div className="modal_title">{notice.title}</div>
            </div>
          </div>
          {notice.gubun === "image" ? (
            <div className="bottom">
              {/* {notice.photo && <img src={notice.photo} alt="notice_photo" />} */}
              <div
                // style={{ marginTop: "30px" }}
                dangerouslySetInnerHTML={{ __html: notice.contents }}
              />
              {notice.url && (
                <div className="link">
                  <a href={notice.url} target="blank">
                    {notice.url}
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="bottom">
              <div dangerouslySetInnerHTML={{ __html: notice.contents }} />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .notice_modal {
          width: 100vw;
          overflow: auto;
          background-color: #000;
          color: #fff;
          height: calc(100vh - 178px);
          top: 127px;
          transform: initial;
          left: 0;
        }
        .container_modal .title_cover {
          position: relative;
          width: calc(100% + 40px);
          margin-left: -20px;
          margin-top: -20px;
          background: linear-gradient(180deg, #2f3354 0%, #040221 93.28%);
          z-index: -1;
          padding: 25px 20px;
          box-sizing: border-box;
        }
        .container_modal .top {
          position: relative;
          color: #b2b2b2;
        }
        .container_modal .modal_title {
          font-size: 14px;
          font-weight: 700;
          line-height: 17px;
          word-break: break-all;
          color: #fff;
          margin-top: 2px;
        }
        .container_modal .created_at {
          font-size: 12px;
          color: #808080;
        }
        .container_modal .bottom {
          width: calc(100% + 20px);
          padding: 20px 0 30px;
          padding-right: 20px;
          box-sizing: border-box;
          word-break: break-all;
          font-size: 13px;
          line-height: 16px;
        }
        .container_modal .bottom img {
          width: 100%;
          height: auto;
        }
        .container_modal .bottom .link {
          margin-top: 20px;
        }
        .container_modal .bottom .link > a {
          color: #007aff;
          text-decoration: none;
        }
        .container_modal .bottom .link > a:hover {
          text-decoration: underline;
        }
      `}</style>
      <style jsx global>{`
        .bottom img {
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default NoticeModal;
