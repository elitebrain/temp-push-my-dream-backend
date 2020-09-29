import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import defaultUser from "public/assets/image/default_user.png";

import RepleList from "./RepleList/RepleList";
import { useSelector } from "react-redux";
import { imgOnLoad } from "shared/functions";

import PushCount from "./PushCount";

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
    <div
      className="reple"
      // onClick={() => {
      //   alert("댓글 기능은 준비 중입니다.");
      // }}
    >
      <PushCount />
      <div className="reple_list_box">
        <RepleList commentList={commentList} userNo={userNo} />
      </div>
      {userNo ? (
        <div className="input_reple">
          <div className="profile_img">
            <img src={userPhoto} alt="user_photo" onLoad={_imgOnLoad} />
          </div>
          <div className="input_text_box">
            <input
              type="text"
              placeholder="댓글을 입력하세요."
              value={comment}
              onChange={_handleChange}
              onKeyUp={_onKeyUp}
              maxLength={100}
            />
          </div>
        </div>
      ) : (
        <div className="input_reple">
          <div className="profile_img">
            <img
              src={defaultUser}
              alt="user_photo"
              width="100%"
              height="100%"
              onLoad={_imgOnLoad}
            />
          </div>
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
      <style jsx>{`
        .reple {
          width: 405px;
          height: 100%;
          padding: 25px 25px;
          display: inline-block;
          /* background-color: #282834; */
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
        .reple .input_reple .profile_img {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
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
        .reple .input_reple {
          height: 60px;
          line-height: 60px;
          background-color: #39394a;
          padding-left: 20px;
          border-radius: 15px;
          box-sizing: border-box;
          position: absolute;
          bottom: 20px;
        }
        .reple .input_reple .input_text_box {
          display: inline-block;
          vertical-align: middle;
          width: 297px;
        }
        .reple .input_reple .input_text_box input {
          width: 100%;
          height: 30px;
          border: none;
          background-color: inherit;
          font-size: 15px;
          color: #b2b2b2;
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
