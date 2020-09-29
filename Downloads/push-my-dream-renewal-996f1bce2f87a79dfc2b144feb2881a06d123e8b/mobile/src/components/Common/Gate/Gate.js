import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const Gate = ({ className, link, title, noti, src }) => {
  return (
    <Link href={link}>
      <div className={`gate ${className ? className : ""}`}>
        <div className="content">
          <div className="title">{title}</div>
          <div className="noti">{noti}</div>
        </div>
        <div className="filter" />
        <style jsx>{`
          .gate {
            width: 100%;
            /* width: 50%; */
            ${src ? `background-image: url(${src})` : ""};
            /* height: 100%; */
            height: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            position: relative;
            cursor: pointer;
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
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .gate .content .noti {
            font-size: 13px;
            white-space: pre-line;
          }
          @media (max-width: 320px) {
            .gate .content .title {
              font-size: 35px;
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
  noti: PropTypes.string.isRequired,
  src: PropTypes.string
};

export default Gate;
