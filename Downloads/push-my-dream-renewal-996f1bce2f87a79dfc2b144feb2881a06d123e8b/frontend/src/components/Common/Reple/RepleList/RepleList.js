import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { CommentContext } from "containers/CommentContainer";

import closeIco from "public/assets/icon/close.svg";
import { imgOnLoad, dateToDotYMDHM } from "shared/functions";
// import MenuList from "../../MenuList";

const RepleList = (props) => {
  const { commentList, userNo } = props;
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const { handleRemoveComment } = useContext(CommentContext);
  const _imgOnLoad = (e) => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  useEffect(() => {
    document.querySelector(".wrapper_list").scrollTop =
      commentList.length * 100;
  }, [commentList]);

  console.log(commentList);
  return (
    <>
      <div className="wrapper_list">
        {commentList &&
          commentList.map((item) => (
            <div className="reple_list my" key={item.comment_no}>
              <div className="profile_img">
                <img
                  src={item.user_photo}
                  alt="user_photo"
                  onLoad={_imgOnLoad}
                />
              </div>
              <div className="reple_content_box">
                <div className="profile_name">{item.nickname}</div>
                <span className={item.flag === 0 ? "chat" : "hidden_msg"}>
                  {item.comment}
                </span>
                {userNo === item.user_no && item.flag === 0 && (
                  <div
                    className="close_btn"
                    onClick={() => handleRemoveComment(item.comment_no)}
                  >
                    <img src={closeIco} alt="close_ico" />
                  </div>
                )}
                <div className="reple_date_ico_btn">
                  <div className="reple_date_box">
                    <div className="date">
                      {dateToDotYMDHM(new Date(item.created_at))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <MenuList /> */}
      <style jsx>{`
        .wrapper_list {
          width: calc(100% + 17px);
          height: 450px;
          padding: 20px;
          background: linear-gradient(180deg, #2f3354 0%, #040221 150.92%);
          border-radius: 10px 0px 10px 10px;
          box-sizing: border-box;
          margin-bottom: 20px;
          overflow: auto;
        }
        .reple_list {
          margin-bottom: 20px;
        }
        .reple_list:last-child {
          margin-bottom: 0;
        }

        .reple_list .profile_img {
          position: relative;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: top;
          margin-right: 15px;
          overflow: hidden;
          border: 2px solid #fff;
        }
        .profile_img > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .reple_list .reple_content_box {
          width: calc(100% - 53px);
          display: inline-block;
          word-break: break-all;
        }
        .reple_list .reple_content_box .reple_chat {
          color: #fff;
          font-size: 15px;
          line-height: 27px;
        }
        .reple_list .reple_content_box .reple_chat em {
          color: #f38400;
          font-style: normal;
          margin-right: 10px;
          font-size: 15px;
        }
        .reple_list .reple_content_box .profile_name {
          font-size: 15px;
          color: #f38400;
          display: inline-block;
          margin-right: 10px;
          line-height: 27px;
        }
        .reple_list .reple_content_box .chat {
          font-size: 15px;
          color: #ffffff;
          display: inline-block;
          line-height: 27px;
          white-space: pre-line;
          margin-right: 10px;
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
        .hidden_msg {
          color: #b2b2b2;
        }
        .reple_content_box .close_btn {
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          height: 20px;
        }
        .reple_content_box .close_btn:hover {
          cursor: pointer;
        }
        .reple_content_box .close_btn > img {
          width: 100%;
          height: 100%;
        }
        @media (max-width: 1366px) {
          .wrapper_list {
            width: 235px;
            height: 380px;
            margin-bottom: 10px;
          }
        }
        @media (min-width: 2560px) {
          .wrapper_list {
            height: 650px;
          }
        }
      `}</style>
    </>
  );
};

RepleList.propTypes = {
  commentList: PropTypes.array,
  userNo: PropTypes.number,
};

export default RepleList;
