import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Common/Avatar";

import profile_img_bg from "public/assets/image/profile_img_bg.png";

const UserPhoto = (props) => {
  const { user_photo } = props;
  // const avatarStyle =
  //   window.outerWidth > 1366
  //     ? {
  //         width: "80px",
  //         height: "80px",
  //         position: "absolute",
  //         top: "50%",
  //         left: "50%",
  //         transform: "translate(-50%,-50%)",
  //       }
  //     : {
  //         width: "48px",
  //         height: "48px",
  //         position: "absolute",
  //         top: "50%",
  //         left: "50%",
  //         transform: "translate(-50%,-50%)",
  //       };
  return (
    <div className="user_photo_frame_container">
      <div className="user_photo_frame_gradient" />
      <div className="user_photo_frame_box">
        <div className="user_photo_frame">
          <Avatar
            photo={user_photo || "http://via.placeholder.com/500x300"}
            // style={avatarStyle}
            style={{ width: "68px", height: "68px" }}
          />
        </div>
      </div>
      <style jsx>{`
        .user_photo_frame_container {
          position: relative;
          width: 72px;
          height: 72px;
          margin: 0 auto;
          margin-bottom: 10px;
        }
        .user_photo_frame_gradient {
          width: 213px;
          height: 213px;
          background: radial-gradient(
            rgba(0, 175, 102, 0.7) 0%,
            rgba(0, 175, 102, 0.7) 10%,
            rgba(0, 175, 102, 0.3) 20%,
            rgba(23, 24, 43, 0.2) 50%
          );
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
        .user_photo_frame_box {
          position: absolute;
          top: 0;
          left: 0;
        }
        .user_photo_frame {
          position: relative;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          overflow: hidden;
          background-image: url(${profile_img_bg});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          border: 2px solid #fff;
        }
        .user_photo_frame > img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

UserPhoto.propTypes = {
  user_photo: PropTypes.string,
};

export default UserPhoto;
