import React, { useState, useContext } from "react";

import closeIco from "public/assets/icon/close.svg";
import edit_ico from "public/assets/icon/edit_ico(white).svg";
import delete_ico from "public/assets/icon/close_ico(white).svg";
import video_profile_img from "public/assets/image/video_profile_img.png";
import { imgOnLoad, dateToDotYMDHM } from "shared/functions";

import { CommentContext } from "containers/CommentContainer";

const Comment = (props) => {
  const { userNo, comment } = props;
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const { handleRemoveComment } = useContext(CommentContext);
  const _imgOnLoad = (e) => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  console.log("comment", comment);
  return (
    <>
      <div className={`comment${userNo === comment.user_no ? " my" : ""}`}>
        <div className="profile_img">
          <img src={comment.user_photo} alt="user_photo" onLoad={_imgOnLoad} />
        </div>
        <div className="reple_content_box">
          <div className="reple_chat">
            <em>{comment.nickname}</em>
            <span className={comment.flag === 0 ? "chat" : "hidden_msg"}>
              {comment.comment}
            </span>
            {userNo === comment.user_no && comment.flag === 0 && (
              <div
                className="close_btn"
                onClick={() => handleRemoveComment(comment.comment_no)}
              >
                <img src={closeIco} alt="close_ico" />
              </div>
            )}
          </div>
          <div className="reple_date_ico_btn">
            <div className="reple_date_box">
              <div className="date">
                {dateToDotYMDHM(new Date(comment.created_at))}
              </div>
              {/* <div className="ico_btn" style={{ marginRight: "15px" }}>
                <img src={edit_ico} alt="edit_ico" width="100%" height="100%" />
              </div>
              <div className="ico_btn">
                <img
                  src={delete_ico}
                  alt="delete_ico"
                  width="100%"
                  height="100%"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .comment {
          margin-bottom: 10px;
          padding: 0 20px;
        }
        .profile_img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: top;
          margin-right: 15px;
          position: relative;
          overflow: hidden;
        }
        .profile_img > img {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .reple_content_box {
          width: calc(100% - 55px);
          display: inline-block;
        }
        .reple_content_box .reple_chat {
          color: #fff;
          font-size: 12px;
          word-break: break-all;
        }
        .reple_content_box .reple_chat em {
          color: #acacac;
          font-style: normal;
          margin-right: 10px;
          font-size: 12px;
        }
        .reple_chat span {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .hidden_msg {
          color: #808080;
        }
        .reple_chat .close_btn {
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          height: 20px;
        }
        .reple_chat .close_btn > img {
          width: 100%;
          height: 100%;
        }
        .reple_content_box .chat {
          font-size: 12px;
          color: #ffffff;
          display: inline-block;
          line-height: 15px;
          white-space: pre-line;
        }
        .reple_date_ico_btn .reple_date_box .date {
          font-size: 10px;
          color: #808080;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .reple_content_box .reple_date_ico_btn .reple_date_box .ico_btn {
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

export default Comment;
