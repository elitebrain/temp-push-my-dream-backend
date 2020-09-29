import React from "react";
import PropTypes from "prop-types";

import {
  BACKGROUND_BLACK_COLOR,
  COLOR_696C8C,
  COLOR_AE46E7,
  GRADIENT_00F1B4_D53CF5,
} from "shared/constants/colors";

const RankNav = ({ mainTab, tab, onMainTab, onTab }) => {
  return (
    <div className="rank_nav_wrapper">
      <div className="rank_main_nav_container">
        <div
          className={`nav_main_btn${mainTab === "dreamer" ? " check" : ""}`}
          onClick={onMainTab.bind(this, "dreamer")}
        >
          드리머
          {mainTab === "dreamer" && <span className="underLine" />}
        </div>
        <div
          className={`nav_main_btn${mainTab === "producer" ? " check" : ""}`}
          onClick={onMainTab.bind(this, "producer")}
        >
          프로듀서
          {mainTab === "producer" && <span className="underLine" />}
        </div>
      </div>
      <div className="rank_nav_container">
        <div
          className={`nav_btn ${tab === "week" ? "check" : ""}`}
          onClick={onTab.bind(this, "week")}
        >
          <span>주간</span>
        </div>
        <div className="line" />
        <div
          className={`nav_btn ${tab === "month" ? "check" : ""}`}
          onClick={onTab.bind(this, "month")}
        >
          <span>월간</span>
        </div>
        <div className="line" />
        <div
          className={`nav_btn ${tab === "season" ? "check" : ""}`}
          onClick={onTab.bind(this, "season")}
        >
          <span>시즌</span>
        </div>
      </div>
      <style jsx>{`
        .rank_nav_wrapper {
          width: 100%;
          height: 100%;
        }
        .rank_nav_container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          box-sizing: border-box;
        }

        .rank_main_nav_container {
          max-width: 1200px;
          margin: 0 auto 25px 0;
          display: flex;
          justify-content: space-around;
          box-sizing: border-box;
        }

        .nav_main_btn {
          text-align: center;
          flex: 1;
          padding-bottom: 10px;
          color: ${COLOR_696C8C};
          cursor: pointer;
          position: relative;
        }

        .nav_main_btn.check {
          font-weight: 800;
          color: ${COLOR_AE46E7};
        }

        .nav_main_btn.check .underLine {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-image: ${GRADIENT_00F1B4_D53CF5(90)};
        }

        .nav_btn {
          flex: 1;
          height: 30px;
          font-size: 12px;
          color: ${COLOR_696C8C};
          display: flex;

          justify-content: center;

          cursor: pointer;
        }

        .line {
          width: 0px;
          margin-top: 1px;

          height: 12px;
          border: 1px solid rgba(105, 108, 140, 0.4);
        }
        .nav_btn:last-child {
          margin: 0;
        }
        /* .nav_btn span {
          margin-bottom: 17px;
        } */
        .nav_btn.check {
          color: #fff;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

RankNav.propTypes = {
  mainTab: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  onMainTab: PropTypes.func.isRequired,
  onTab: PropTypes.func.isRequired,
};

export default RankNav;
