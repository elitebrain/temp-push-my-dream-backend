import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import follow_btn_bg from "public/assets/image/button_glass.png";

import RepleList from "./RepleList/RepleList";
import { useSelector } from "react-redux";
import { imgOnLoad } from "shared/functions";

import PushCount from "components/Common/PushCount";
import PushButton from "components/Common/PushButton";

const Reple = (props) => {
  const { commentList, countComment, videoNo, handleSave } = props;
  const [comment, setComment] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const { user_no: userNo, user_photo } = useSelector((state) => state.user);
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const _imgOnLoad = (e) => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  const _onKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (comment.length > 0) {
        const sendData = {
          videoNo,
          comment,
        };
        setComment("");
        handleSave(sendData);
      }
    }
  };
  const _handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };
  useEffect(() => {
    if (user_photo) {
      setUserPhoto(user_photo);
    }
  }, [user_photo]);
  return (
    <div className="reple">
      {/* <PushCount /> */}
      <div className="reple_list_box">
        <RepleList commentList={commentList} userNo={userNo} />
      </div>
      {userNo ? (
        <div className="input_reple">
          <div className="input_text_box">
            <input
              type="text"
              placeholder="댓글을 입력하세요."
              value={comment}
              onChange={_handleChange}
              onKeyUp={_onKeyUp}
              maxLength={100}
            />
            <div className="reple_btn">등록</div>
          </div>
        </div>
      ) : (
        <div className="input_reple">
          <div className="input_text_box">
            <input
              type="text"
              placeholder="로그인 하셔야 이용하실 수 있습니다."
              value={comment}
              onChange={_handleChange}
              onKeyUp={_onKeyUp}
              readOnly
            />
          </div>
        </div>
      )}
      {/* <PushButton /> */}
      <style jsx>{`
        .reple {
          width: 320px;
          height: 100%;
          display: inline-block;
          box-sizing: border-box;
          position: relative;
        }
        .reple .reple_length {
          width: 362px;
          font-size: 18px;
          color: #fff;
          height: 45px;
          margin: 0 auto;
          padding: 0 10px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          box-sizing: border-box;
        }
        .reple_list_box {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        /* .reple .reple_list_box {
          position: absolute;
          left: 0;
          bottom: 80px;
          width: 380px;
          height: 570px;
          padding-left: 20px;
          padding-right: 20px;
          margin-bottom: 30px;
          overflow: hidden;
          box-sizing: border-box;
        } */
        .profile_img > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .reple .input_reple {
          height: 50px;
          background: linear-gradient(
            180deg,
            #4b4c5b 0%,
            #192031 19.27%,
            rgba(75, 76, 91, 0.887963) 53.12%,
            #192031 91.67%,
            #4b4c5b 100%
          );
          border-radius: 9px;
          position: relative;
        }
        .reple .input_reple .input_text_box {
          width: calc(100% - 8px);
          height: 45px;
          line-height: 45px;
          background: #050519;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 9px;
          padding-left: 20px;
          box-sizing: border-box;
        }
        .reple .input_reple .input_text_box input {
          width: 240px;
          height: 30px;
          border: none;
          background-color: inherit;
          font-size: 12px;
          color: #b2b2b2;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .reple .input_reple .input_text_box input::placeholder {
          color: #808080;
        }
        .reple_btn {
          width: 36px;
          height: 36px;
          line-height: 36px;
          font-size: 9px;
          display: inline-block;
          vertical-align: middle;
          border-radius: 50%;
          background-image: url(${follow_btn_bg});
          background-size: cover;
          background-repeat: no-repeat;
          box-sizing: border-box;
          text-align: center;
          color: #fff;
          font-weight: 500;
          cursor: pointer;
        }
        @media (max-width: 1366px) {
          .reple {
            width: 260px;
          }
          .reple .input_reple .input_text_box input {
            width: 160px;
          }
          .reple .input_reple {
            width: 235px;
          }
        }
        @media (min-width: 2560px) {
          .reple {
            width: 410px;
          }
          .reple .input_reple {
            height: 60px;
            line-height: 60px;
          }
          .reple .input_reple .input_text_box {
            height: 50px;
            line-height: 50px;
          }
          .reple .input_reple .input_text_box input {
            width: 320px;
            height: 45px;
            line-height: 45px;
            font-size: 18px;
          }
          .reple_btn {
            width: 45px;
            height: 45px;
            line-height: 45px;
            font-size: 17px;
          }
        }
      `}</style>
    </div>
  );
};

Reple.propTypes = {
  commentList: PropTypes.array,
  countComment: PropTypes.number,
};

export default Reple;
