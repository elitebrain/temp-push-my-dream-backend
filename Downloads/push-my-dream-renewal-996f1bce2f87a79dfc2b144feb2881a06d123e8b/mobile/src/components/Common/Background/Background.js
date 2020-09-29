import React from "react";
import PropTypes from "prop-types";

const Background = ({
  children,
  className,
  width,
  height,
  color,
  onMouseOver,
  style,
  url
}) => {
  return (
    <div
      className={`background-container ${className ? className : ""}`}
      onMouseOver={onMouseOver}
      style={style}
    >
      {children}
      <style jsx>{`
        .background-container {
          ${width ? `width: ${width};` : ""};
          ${height ? `height: ${height};` : ""};
          ${color ? `background-color: ${color};` : ""};
          /* cursor: pointer; */
          overflow: hidden;
        }
        .background-container.border_b_w {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .background-container.radius {
          border-radius: 10px;
        }
        .background-container.footer_wrapper {
          z-index: 100;
        }
        .background-container.main_container {
          padding: 40px;
          box-sizing: border-box;
        }
        .background-container.inline {
          display: inline-block;
        }
        .background-container.v_md {
          vertical-align: middle;
        }
        .background-container.p_relative {
          position: relative;
        }
        .background-container.content {
          padding-top: 95px;
        }
        .background-container.m_center {
          margin: 0 auto;
        }
        .background-container.banner_bg {
          /* background-image: url("public/assets/image/competition_banner_bg.png"); */
          background-image: url(${url});
          background-repeat: no-repeat;
          background-position: center center; /* 가운데 가운데 정렬 */
          background-size: cover;
          width: 100%;
          height: 585px;
        }
        .background-container.contest_producing_insert {
          /* background-image: url("public/assets/image/competition_banner_bg.png"); */
          background-image: url(${url});
          background-repeat: no-repeat;
          background-position: center center; /* 가운데 가운데 정렬 */
          background-size: cover;
          width: 100%;
        }
        /* .background-container.contest_reservation_bg{

        } */
        .background-container.of_hidden {
          overflow: hidden;
        }
        .background-container .z1 {
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

Background.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  onMouseOver: PropTypes.func,
  style: PropTypes.object,
  url: PropTypes.string
};

export default Background;
