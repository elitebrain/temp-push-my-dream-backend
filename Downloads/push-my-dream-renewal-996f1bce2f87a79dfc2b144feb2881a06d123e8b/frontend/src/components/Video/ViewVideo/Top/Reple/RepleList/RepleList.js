import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { CommentContext } from "containers/CommentContainer";

import closeIco from "public/assets/icon/close.svg";
import edit_ico from "public/assets/icon/edit_ico(white).svg";
import delete_ico from "public/assets/icon/close_ico(white).svg";
import video_profile_img from "public/assets/image/video_profile_img.png";
import { imgOnLoad, dateToDotYMDHM } from "shared/functions";

const RepleList = props => {
  const { commentList, userNo } = props;
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const { handleRemoveComment } = useContext(CommentContext);
  const _imgOnLoad = e => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  useEffect(() => {
    document.querySelector(".wrapper_list").scrollTop =
      commentList.length * 100;
  }, [commentList]);
  // const _setUrlInComment = () => {
  //   if (document.querySelector(".chat").innerHTML.indexOf("http") !== -1) {
  //     const url = document.querySelector(".chat").innerHTML.substr(document.querySelector(".chat").innerHTML.indexOf("http")).split(" ")[0];
  //     document.querySelector(".chat").innerHTML = document.querySelector(".chat").innerHTML.replace(url, url + "</a>").replace("http","<a href='" + url + "'>http");
  //   }
  // }
  return (
    <div className="wrapper_list">
      {commentList &&
        commentList.map(item => (
          <div className="reple_list my" key={item.comment_no}>
            <div className="profile_img">
              <img src={item.user_photo} alt="user_photo" onLoad={_imgOnLoad} />
            </div>
            <div className="reple_content_box">
              <div className="profile_name">{item.nickname}</div>
              {item.hidden === 0 ? (
                <span className="chat">{item.comment}</span>
              ) : (
                <span className="hidden_msg">ⓘ 삭제된 메시지입니다.</span>
              )}
              {userNo === item.user_no && item.hidden === 0 && (
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
        ))}
      {/* <div className="reple_list">
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
      </div> */}
      <style jsx>{`
        .wrapper_list {
          position: absolute;
          width: 400px;
          height: 570px;
          padding-left: 20px;
          left: 0;
          top: 0;
          overflow-y: auto;
        }
        .reple_list {
          margin-bottom: 20px;
        }
        .reple_list:last-child {
          margin-bottom: 0;
        }

        .reple_list .profile_img {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: top;
          margin-right: 15px;
          overflow: hidden;
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
          width: 295px;
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
      `}</style>
    </div>
  );
};

RepleList.propTypes = {
  commentList: PropTypes.array,
  userNo: PropTypes.number
};

export default RepleList;
