import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { imgOnLoad, numberWithCommas, formatRatio } from "shared/functions";
import {
  MAIN_COLOR,
  WHITE_COLOR,
  COLOR_3B3D55,
  GRADIENT_00F1B4_D53CF5,
  COLOR_696C8C,
} from "shared/constants/colors";

const ProducerRanking = (props) => {
  const { rank, profileSrc, nickname, ratio, push, big } = props;
  const [height, setHeight] = useState(40);
  const [rankClass, setRankClass] = useState("rank");
  const [profileImgMarginRight, setProfileImgMarginRight] = useState(10);
  const [profileWidth, setProfileWidth] = useState("auto");
  const [profileHeight, setProfileHeight] = useState("auto");
  useEffect(() => {
    if (big) {
      setHeight(64);
      setRankClass("rank big");
      setProfileImgMarginRight(20);
    }
  }, []);
  return (
    <div className="item">
      <span className={rankClass}>{rank}</span>
      <span className="profile_img">
        <img
          src={profileSrc}
          alt="profile_photo"
          onLoad={(e) => imgOnLoad(e, setProfileWidth, setProfileHeight)}
        />
      </span>
      {!big && (
        <>
          <span className="nickname">{nickname}</span>
          <span className="gauge">
            <span className="active" style={{ width: `${ratio}%` }} />
            <span className="ratio">{ratio}%</span>
          </span>
        </>
      )}
      {big && (
        <div className="big_gauge">
          <div className="nickname">{nickname}</div>
          <div className="push">
            <span>{numberWithCommas(push)}</span>
            <span className="push_title">PUSH</span>
          </div>
          <div className="gauge_radtio_box">
            <div className="gauge">
              <span className="active" style={{ width: `${ratio}%` }} />
            </div>
            <span className="ratio">{formatRatio(ratio, "%")}</span>
          </div>
        </div>
      )}
      <style jsx>{`
        .item {
          height: ${height}px;
          line-height: ${height}px;
          margin-bottom: 20px;
        }
        .item:last-child {
          margin-bottom: 0;
        }
        .item > span {
          display: inline-block;
          vertical-align: middle;
        }
        .item .rank {
          width: 20px;
          font-size: 14px;
          color: ${WHITE_COLOR};
        }
        .item .rank.big {
          width: 30px;
          font-size: 16px;
          font-weight: 400;
          color: ${WHITE_COLOR};
        }
        .item .profile_img {
          position: relative;
          width: ${height}px;
          height: ${height}px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: ${profileImgMarginRight}px;
        }
        .item .profile_img > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${profileWidth};
          height: ${profileHeight};
        }
        .item .nickname {
          font-size: 16px;
          font-weight: 400;
          color: ${WHITE_COLOR};
          width: calc(45% - 70px);
          max-width: 180px;
          line-height: 20px;
        }
        .item .gauge {
          padding: 3px;
          box-sizing: border-box;
          min-width: calc(55% - 10px);
          /* width: calc(100% - 260px); */
          width: calc(100% - 45px);
          margin-right: 10px;
          height: 15px;
          text-align: right;
          border-radius: 30px;
          overflow: hidden;
          background-color: ${COLOR_3B3D55};
          display: inline-block;
          vertical-align: middle;
        }
        .gauge_radtio_box .gauge > .active {
          display: block;
          height: 100%;
          border-radius: 30px;
          background-image: ${GRADIENT_00F1B4_D53CF5(95.74)};
        }
        .gauge_radtio_box .ratio {
          display: inline-block;
          vertical-align: middle;
          white-space: nowrap;
          height: 11px;
          line-height: 11px;
          color: ${WHITE_COLOR};
          font-size: 10px;
        }
        .big_gauge {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: calc(100% - 120px);
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
        }
        .big_gauge > .nickname {
          color: ${WHITE_COLOR};
          width: 100%;
        }
        .big_gauge > .push {
          color: ${WHITE_COLOR};
        }
        .big_gauge > .push .push_title {
          font-size: 12px;
          font-weight: 400;
          margin-left: 5px;
          color: ${COLOR_696C8C};
        }
        .big_gauge > .gauge {
          position: relative;
          width: 100%;
          height: 15px;
          margin-top: 3px;
          border-radius: 30px;
          text-align: right;
          color: ${WHITE_COLOR};
          font-size: 10px;
          overflow: hidden;
          background-color: ${COLOR_3B3D55};
          margin-left: 0;
        }
      `}</style>
    </div>
  );
};

ProducerRanking.propTypes = {
  rank: PropTypes.number,
  profileSrc: PropTypes.string,
  nickname: PropTypes.string,
  ratio: PropTypes.string,
  push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  big: PropTypes.bool,
};

export default ProducerRanking;
