import React from "react";
import PropTypes from "prop-types";

import firstRankImage from "public/assets/image/rank1_ico.png";
import secondRankImage from "public/assets/image/rank2_ico.png";
import thirdRankImage from "public/assets/image/rank3_ico.png";

import { MAIN_COLOR } from "shared/constants/colors";
import add_image from "public/assets/image/add_image.png";

const Avatar = ({
  className,
  photo,
  camera,
  width = "50px",
  height = "50px",
  onClick,
  style,
}) => {
  const avatarClass = `avatar${className ? ` ${className}` : ""}`;

  return (
    <div className={avatarClass} onClick={onClick} style={style}>
      {camera && (
        <div className="camera">
          <img src={add_image} />
        </div>
      )}
      <style jsx>{`
          .avatar {
            position: relative;
            width: ${width};
            height: ${height};
            border-radius: 50%;
            background-image: url('${photo}');
            background-position : 50% 50%;
            background-repeat: no-repeat;
            background-size:cover;
            cursor:pointer;
          }
          .avatar.big{
            width: 120px;
            height: 120px;
          }

          .avatar .camera {
            position:absolute;
            bottom:0px;
            right:0px;
            width:35px;
            height:35px;
            background-color:${MAIN_COLOR};
            border-radius:50%;
          }
        `}</style>
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  photo: PropTypes.string.isRequired,
  camera: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Avatar;
