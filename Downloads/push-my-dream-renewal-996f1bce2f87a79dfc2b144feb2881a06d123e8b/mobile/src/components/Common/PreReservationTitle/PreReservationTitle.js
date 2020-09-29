import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Background from "components/Common/Background";
import { MAIN_BLACK_COLOR } from "shared/constants/colors";

import arrow_ico from "public/assets/icon/arrow_right_ico(white).svg";
import infinite_ico from "public/assets/icon/infinite_ico(black).svg";

const PreReservationTitle = ({ title, navigationList, style }) => {
  return (
    <Background width="100%" color={MAIN_BLACK_COLOR} style={style}>
      <Background width="1200px" color={MAIN_BLACK_COLOR} className="m_center">
        <div className="sign_up_title">
          <div className="infinite_ico">
            <img
              src={infinite_ico}
              alt="infinite_ico"
              width="100%"
              height="100%"
            />
          </div>
          <div className="navigator_">
            <span>HOME</span>
            {navigationList &&
              navigationList.map(position => (
                <React.Fragment key={position}>
                  <span className="navigator_arrow">
                    <img
                      src={arrow_ico}
                      alt="arrow_ico"
                      width="100%"
                      height="100%"
                    />
                  </span>
                  <span>{position}</span>
                </React.Fragment>
              ))}
          </div>

          <h1>{title}</h1>
          <style jsx>{`
            .sign_up_title {
              width: 100%;
              line-height: 80px;
              /* background-color: #eee; */
              color: #fff;
              text-align: center;
              font-size: 32px;
              position: relative;
              margin: auto;
              margin-bottom: 40px;
            }
            .sign_up_title > div {
              font-size: 15px;
              font-weight: 300;
              color: #fff;
              text-align: right;
              position: relative;
              z-index: 1;
            }
            .sign_up_title > h1 {
              font-size: 50px;
              font-weight: 400;
              text-align: left;
            }
            .sign_up_title .infinite_ico {
              width: 525px;
              height: 260px;
              position: absolute;
              right: -100px;
              /* top: -7px; */
              top: -2px;
              z-index: 0;
              opacity: 0.9;
            }

            .navigator_ img {
              width: 7px;
              height: 11px;
              margin: 0 20px;
            }
          `}</style>
        </div>
      </Background>
    </Background>
  );
};

PreReservationTitle.propTypes = {
  title: PropTypes.string,
  navigationList: PropTypes.array,
  style: PropTypes.object
};

export default PreReservationTitle;
