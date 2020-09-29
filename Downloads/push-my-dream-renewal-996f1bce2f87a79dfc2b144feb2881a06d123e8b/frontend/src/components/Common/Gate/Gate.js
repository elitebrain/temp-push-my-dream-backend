import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import Button from "components/Common/Button";
import { MAIN_COLOR } from "shared/constants/colors";

const Gate = ({
  className,
  link,
  title,
  subTitle,
  buttonTitle,
  noti,
  buttonWidth,
  src,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <Link href={link}>
      <div
        className={`gate ${className ? className : ""}`}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
      >
        <img src={src} alt="gate_img" />
        <div className="content">
          <div className="title">{title}</div>
          <div className="noti">{noti}</div>
          {/* <Button
            width={buttonWidth ? buttonWidth : "117px"}
            height="33px"
            bgColor={MAIN_COLOR}
            center
            style={{ fontSize: "14px" }}
          >{`${subTitle} ${buttonTitle}`}</Button> */}
        </div>
        <div className="filter" />
        <style jsx>{`
          .gate {
            width: 50%;
            height: 100%;
            position: absolute;
            cursor: pointer;
            display: inline-block;
            transition: 0.5s ease-in-out;
            z-index: 0;
          }
          .gate:last-child {
            right: 0;
          }
          .gate:hover {
            transform: scale(1.2);
            transition: 0.5s ease-in-out;
            z-index: 1;
          }
          .gate > img {
            position: absolute;
            width: 100%;
            height: auto;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .gate.active {
            width: 60%;
            transition: width 0.5s;
            -webkit-transition: width 0.5s;
          }
          .gate.inactive {
            width: 40%;
            transition: width 0.5s;
            -webkit-transition: width 0.5s;
            opacity: 0.5;
          }

          .gate .filte {
            width: 100%;
            height: 100%;
            background-color: #000000;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
          }

          .gate .content {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #fff;
          }
          .gate .content .title {
            font-size: 80px;
            font-weight: bold;
          }
          .gate .content .noti {
            font-size: 18px;
            white-space: pre-line;
          }
          @media (max-aspect-ratio: 16 / 9) {
            .gate > img {
              width: auto;
              height: 100%;
            }
            .gate:hover {
              transform: scale(1.2);
              transition: 0.5s ease-in-out;
            }
          }
        `}</style>
      </div>
    </Link>
  );
};

Gate.propTypes = {
  className: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  noti: PropTypes.string.isRequired,
  buttonWidth: PropTypes.string,
  src: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default Gate;
