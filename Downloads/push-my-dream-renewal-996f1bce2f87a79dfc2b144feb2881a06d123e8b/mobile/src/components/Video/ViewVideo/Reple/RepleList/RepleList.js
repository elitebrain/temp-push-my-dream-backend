import React from "react";

import edit_ico from "public/assets/icon/edit_ico(white).svg";
import delete_ico from "public/assets/icon/close_ico(white).svg";
import video_profile_img from "public/assets/image/video_profile_img.png";

const RepleList = () => {
  return (
    <>
      <div className="reple_list my">
        <div className="profile_img" />
        <div className="reple_content_box">
          <div className="reple_chat">
            <em>Music my life</em>the quantum financial system is AI it will run
            the stock market, hands are for men. quantum leap quantum
            entanglement superposition we are in a flux created by the Large
            hadron collider CERN
          </div>
          <div className="reple_date_ico_btn">
            <div className="reple_date_box">
              <div className="date">20.01.02 15:45</div>
              <div className="ico_btn" style={{ marginRight: "15px" }}>
                <img src={edit_ico} alt="edit_ico" width="100%" height="100%" />
              </div>
              <div className="ico_btn">
                <img
                  src={delete_ico}
                  alt="delete_ico"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reple_list">
        <div className="profile_img" />
        <div className="reple_content_box">
          <div className="reple_chat">
            <em>Music my life</em>the quantum financial system is AI it will run
            the stock market, hands are for men. quantum leap quantum
            entanglement superposition we are in a flux created by the Large
            hadron collider CERN
          </div>
          <div className="reple_date_ico_btn">
            <div className="reple_date_box">
              <div className="date">20.01.02 15:52</div>
              <div className="ico_btn" style={{ marginRight: "15px" }}>
                <img src={edit_ico} alt="edit_ico" width="100%" height="100%" />
              </div>
              <div className="ico_btn">
                <img
                  src={delete_ico}
                  alt="delete_ico"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .reple_list {
          margin-bottom: 20px;
          padding: 0 20px;
        }
        .reple_list:last-child {
          margin-bottom: 0;
        }
        .reple_list .profile_img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-image: url(${video_profile_img});
          background-size: cover;
          background-position: center center;
          display: inline-block;
          vertical-align: top;
          margin-right: 15px;
        }
        .reple_list .reple_content_box {
          /* width: 295px; */
          width: calc(100% - 45px);
          display: inline-block;
        }
        .reple_list .reple_content_box .reple_chat {
          color: #fff;
          font-size: 15px;
          line-height: 27px;
        }
        .reple_list .reple_content_box .reple_chat em {
          color: #acacac;
          font-style: normal;
          margin-right: 10px;
          font-size: 15px;
        }
        .reple_list .reple_content_box .chat {
          font-size: 15px;
          color: #ffffff;
          display: inline-block;
          line-height: 27px;
          white-space: pre-line;
        }
        .reple_list .reple_date_ico_btn .reple_date_box .date {
          font-size: 14px;
          color: #b2b2b2;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .reple_list
          .reple_content_box
          .reple_date_ico_btn
          .reple_date_box
          .ico_btn {
          width: 15px;
          height: 15px;
          display: inline-block;
          vertical-align: middle;
          opacity: 0;
        }
        .my .reple_content_box .reple_date_ico_btn .reple_date_box .ico_btn {
          opacity: 1;
        }
        .my {
          padding-top: 10px;
          padding-bottom: 10px;
          background-color: #1e1e25;
        }
        .my .reple_content_box .reple_chat em {
          color: #f38400;
        }
        @media (max-width: 320px) {
        }
      `}</style>
    </>
  );
};

export default RepleList;
