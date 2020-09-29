import React, { useContext } from "react";
import { useSelector } from "react-redux";

import Button from "components/Common/Button";
import SharedSNSButton from "components/Common/SharedSNSButton";

import like_img_bg from "public/assets/image/like_img(white).png";
import btn_bg from "public/assets/image/button_glass.png";

import { UserContext } from "containers/User/UserContainer";

const ButtonGroup = () => {
  const { currentUser, currentVideo, handleLike } = useContext(UserContext);
  const { likeVideoList } = useSelector((state) => state.user);
  console.log("likeVideoList", likeVideoList, currentVideo);
  return (
    <div className="button_group_container">
      <div className="share_ico">
        <SharedSNSButton
          icon
          style={{
            width: "20px",
            height: "20px",
            lineHeight: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          userNo={currentUser.user_no}
          videoNo={currentVideo.video_no}
        />
      </div>
      {likeVideoList.indexOf(currentVideo.video_no) === -1 ? (
        <div
          className="heart_ico"
          onClick={() => handleLike("like", currentVideo.video_no)}
        >
          ♥
        </div>
      ) : (
        <div
          className="heart_ico"
          style={{ color: "#AE46E7" }}
          onClick={() => handleLike("dislike", currentVideo.video_no)}
        >
          ♥
        </div>
      )}{" "}
      {/* 하트 누르면 보라색으로 바뀔 것.     */}
      {/* <Button
        style={{
          width: "105px",
          height: "44px",
          fontSize: "15px",
          padding: "0 8px",
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        <img
          src={like_img_bg}
          alt="like_img_bg"
          width="19px"
          height="17px"
          className="mr_10px va_m"
        />
        좋아요
      </Button> */}
      <style jsx>{`
        .mr_10px {
          margin-right: 10px;
        }
        .va_m {
          vertical-align: middle;
        }
        .button_group_container {
          position: absolute;
          bottom: 100px;
          right: 20px;
        }
        .share_ico {
          width: 35px;
          height: 35px;
          background-image: url(${btn_bg});
          background-repeat: no-repeat;
          background-size: cover;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
          position: relative;
        }
        .heart_ico {
          width: 35px;
          height: 35px;
          text-align: center;
          line-height: 37px;
          color: #fff;
          font-size: 17px;
          background-image: url(${btn_bg});
          background-repeat: no-repeat;
          background-size: cover;
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ButtonGroup;
