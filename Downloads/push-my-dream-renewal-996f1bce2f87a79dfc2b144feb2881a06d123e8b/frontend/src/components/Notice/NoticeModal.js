import React from "react";
import { dateToDotYYMDHM } from "shared/functions";

const NoticeModal = props => {
  const { notice, closeNoticeModal } = props;
  return (
    <div className="modal_rectangle">
      <div className="modal__overlay" onClick={() => closeNoticeModal()}></div>
      <div
        className="modal__content"
        style={{
          overflow: "initial",
          backgroundColor: "#1e1e25",
          color: "#fff",
          padding: "50px"
        }}
      >
        <div className="container_modal">
          <div className="title_cover"></div>
          <div className="top">
            <div className="modal_title">{notice.title}</div>
            <div className="created_at">
              {dateToDotYYMDHM(new Date(notice.created_at))}
            </div>
          </div>
          <div className="bottom_frame">
            {notice.gubun === "image" ? (
              <div className="bottom">
                {notice.photo && <img src={notice.photo} alt="notice_photo" />}
                <div>{notice.contents}</div>
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
      </div>
      <style jsx>{`
        .container_modal .title_cover {
          position: absolute;
          left: 0;
          top: 0;
          /* width: 560px; */
          width: 100%;
          /* height: 130px; */
          height: 140px;
          background-color: #1e1e25;
          z-index: -1;
          border-bottom: 1px solid #ff9000;
        }
        .container_modal .top {
          position: relative;
          height: 90px;
        }
        .container_modal .modal_title {
          font-size: 20px;
          font-weight: bold;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          color: #fff;
        }
        .container_modal .created_at {
          position: absolute;
          font-size: 16px;
          right: 0;
          bottom: 12px;
          color: #b2b2b2;
        }
        .container_modal .bottom_frame {
          width: 500px;
          height: 460px;
          overflow: hidden;
          padding-top: 50px;
        }
        .container_modal .bottom {
          width: 520px;
          height: 460px;
          overflow-y: auto;
          word-break: break-all;
        }
        .container_modal .bottom img {
          width: 100%;
          height: auto;
        }
        .container_modal .bottom .link {
          margin-top: 20px;
        }
        .container_modal .bottom .link > a {
          color: #000;
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
