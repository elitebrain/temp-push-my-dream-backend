import React from "react";
import PropTypes from "prop-types";

import person_transparent from "public/assets/image/person_transparent.png";
import person_gradation from "public/assets/image/person_gradation.png";
import { GRADIENT_2F3354_040221, COLOR_3B3D55 } from "shared/constants/colors";

const SeasonApplyTypes = ({ onApplySeason }) => {
  return (
    <>
      {/* <div
        className="types_container"
        onClick={onApplySeason.bind(this, "normal")}
      >
        <div className="content_image">
          <img src={person_transparent} alt="person_ico" />
        </div>
        <div className="content">
          <div className="content_">
            <span className="title">일반</span>
            <span className="noti">{`※ 본선 진출이 불가능합니다.
예선 기간내 언제든
아티스트로 전환 할 수 있습니다.`}</span>
          </div>
        </div>
      </div> */}
      <div
        className="types_container"
        onClick={onApplySeason.bind(this, "artist")}
      >
        <div className="content_image">
          <img src={person_gradation} alt="person_ico" />
        </div>
        <div className="content">
          <div className="content_">
            <span className="title">아티스트</span>
            {/* <span className="noti">{`※ 인플루언서 활동 중 또는 
인플루언서 데뷔 희망자만 참가 가능합니다.`}</span> */}
          </div>
        </div>
      </div>
      <style jsx>{`
        .types_container {
          max-width: 330px;
          margin: 0 auto 20px auto;
          box-sizing: border-box;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};
          border-radius: 10px;
          cursor: pointer;
        }
        .types_container:last-child {
          margin-bottom: 0px;
        }
        .content_image {
          width: 113px;
          height: 113px;
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
          position: relative;
        }
        .content_image img {
          width: 66px;
          height: 70px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .content {
          width: calc(100% - 125px);
          position: relative;
          display: inline-block;
          vertical-align: middle;
          border-radius: 5px;
          text-align: center;
        }
        .content_ {
          border-left: 0.7px solid ${COLOR_3B3D55};
          width: 100%;
          line-height: 15px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .content .title {
          line-height: 40px;
          display: block;
          font-size: 25px;
          font-weight: bold;
          color: #fff;
        }
        .content .noti {
          font-size: 10px;
          color: #878792;
          white-space: pre-line;
        }
      `}</style>
    </>
  );
};

SeasonApplyTypes.propTypes = {
  onApplySeason: PropTypes.func,
};

export default SeasonApplyTypes;
