import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { imgOnLoad } from "shared/functions";
import personCircle from "public/assets/image/person_circle.png";
import buttonGlass from "public/assets/image/button_glass.png";
import arrow_left_ico from "public/assets/icon/arrow_left(white).svg";
import Layout from "components/Layout/Layout";
import Button from "components/Common/Button";
import RepleList from "../Reple/RepleList/RepleList";
import Comment from "./Comment";

const CommentComponent = (props) => {
  const {
    commentList,
    countComment,
    videoNo,
    handleSave,
    setIsViewComment,
  } = props;
  const { user_no: userNo, user_photo } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const [repleHeight, setRepleHeight] = useState("calc(100vh - 101px)");
  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("safari") === -1) {
      setRepleHeight("calc(100vh - 121px)");
    }
  }, []);
  const _imgOnLoad = (e) => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  useEffect(() => {
    document.querySelector(".reple_list_box").scrollTop =
      commentList.length * 100;
  }, [commentList]);
  const _onKeyUp = (e) => {
    if (e.keyCode === 13) {
      _handleSave();
    }
  };
  const _handleSave = () => {
    if (comment.length > 0) {
      const sendData = {
        videoNo,
        userNo,
        comment,
      };
      setComment("");
      handleSave(sendData);
    }
  };
  const _handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };
  return (
    <div className="reple_container">
      {/* <Layout transparent whiteText className="footer_none"> */}
      <div className="container">
        <div className="reple">
          <div className="reple_length">
            {/* <img
              src={arrow_left_ico}
              alt="arrow_left_ico"
              width="20px"
              height="15px"
              onClick={setIsViewComment}
            /> */}
            <span>댓글</span>
            {/* <span>({countComment})</span> */}
          </div>
          <div className="reple_list_box">
            {/* <RepleList /> */}
            {commentList &&
              commentList.map((comment) => (
                <Comment
                  userNo={userNo}
                  comment={comment}
                  key={comment.comment_no}
                />
              ))}
          </div>
          <div className="input_reple_box">
            <div className="input_reple_box_container">
              <div className="wrapper">
                {/* <span>댓글 수정중</span> */}
                {userNo ? (
                  <div className="input_reple">
                    {/* <div className="profile_img">
                      <img
                        src={user_photo}
                        alt="user_photo"
                        onLoad={_imgOnLoad}
                      />
                    </div> */}
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
                    <button className="register_btn" onClick={_handleSave}>
                      등록
                    </button>
                  </div>
                ) : (
                  <div className="input_reple">
                    {/* <div className="profile_img">
                      <img
                        src={personCircle}
                        alt="user_photo"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div> */}
                    <div className="input_text_box">
                      <input
                        type="text"
                        placeholder="로그인 하셔야 이용하실 수 있습니다."
                        readOnly
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                    <button className="register_btn">등록</button>
                    {/* <Button
                      style={{
                        width: "31px",
                        height: "31px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    >
                      등록
                    </Button> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Layout> */}
      <style jsx>{`
        .reple_container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: calc(100vh - 51px);
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 100;
          animation: slide-to-top 0.3s linear;
        }
        .container {
          height: 100%;
        }
        .reple {
          width: 100%;
          height: ${repleHeight};
          display: inline-block;
          background: linear-gradient(to top, #040221, #2f3354);
          box-sizing: border-box;
          margin-top: 50px;
          position: relative;
          overflow: hidden;
        }
        .reple .reple_length {
          width: 100%;
          height: 77px;
          line-height: 77px;
          text-align: center;
          font-size: 21px;
          color: #fff;
          font-weight: 700;
          box-sizing: border-box;
          background-color: #141418;
          position: relative;
        }
        .reple .reple_length img {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .reple .reple_list_box {
          width: 100vw;
          text-align: left;
          height: calc(100vh - 200px);
          overflow-y: auto;
          padding-top: 30px;
        }
        .reple .input_reple_box {
          background-color: transparent;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 20px 0;
        }
        .reple .input_reple_box .input_reple_box_container {
          position: relative;
          width: calc(100% - 20px);
          height: 50px;
          margin: 0 auto;
          background: linear-gradient(
            180deg,
            #4b4c5b 0%,
            #192031 19.27%,
            rgba(75, 76, 91, 0.887963) 53.12%,
            #192031 91.67%,
            #4b4c5b 100%
          );
          border-radius: 15px;
        }
        .input_reple_box_container > .wrapper {
          position: absolute;
          width: calc(100% - 4px);
          height: 46px;
          line-height: 46px;
          left: 2px;
          top: 2px;
          border-radius: 15px;
          background-color: #040221;
        }
        .reple .input_reple_box span {
          display: block;
          text-align: center;
          font-size: 13px;
          font-weight: 400;
          color: #f38900;
          padding: 15px 0;
        }
        .reple .input_reple {
          width: 100%;
          background-color: transparent;
          padding: 0 12px;
          border-radius: 15px;
          box-sizing: border-box;
        }
        .reple .input_reple .profile_img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
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
        .reple .input_reple .input_text_box {
          width: calc(100% - 46px);
          margin-right: 15px;
          display: inline-block;
          vertical-align: middle;
        }
        .reple .input_reple .input_text_box input {
          width: 100%;
          height: 30px;
          border: none;
          position: relative;
          background-color: inherit;
          font-size: 12px;
          color: #fff;
        }
        .register_btn {
          width: 31px;
          height: 31px;
          line-height: 31px;
          font-size: 12px;
          color: #fff;
          background: url(${buttonGlass});
          border: none;
          background-size: cover;
        }
        @keyframes slide-to-top {
          from {
            top: 100vh;
          }
          to {
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CommentComponent;
