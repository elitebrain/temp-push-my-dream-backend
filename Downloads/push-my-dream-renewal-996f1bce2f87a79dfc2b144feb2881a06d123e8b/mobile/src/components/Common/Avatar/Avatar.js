import React from "react";
import PropTypes from "prop-types";

import add_image from "public/assets/image/icon_camera.png";

const Avatar = ({
  className,
  width = "60px",
  height = "60px",
  photo,
  camera,
  onClick,
  style,
  ...rest
}) => {
  return (
    <div
      className={`avatar ${className ? className : ""}`}
      onClick={onClick}
      style={style}
      {...rest}
    >
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
          .avatar.large{
            width: 86px;
            height: 86px;
          }
          .avatar.big{
            width: 120px;
            height: 120px;
          }

          .avatar .camera {
            position:absolute;
            bottom:0px;
            right:0px;
            width:30px;
            height:30px;
            border-radius:50%;
            background-color: #8048ff;
          }
          .avatar .camera > img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 18px;
            height: auto;
          }
        `}</style>
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  photo: PropTypes.string.isRequired,
  camera: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Avatar;
