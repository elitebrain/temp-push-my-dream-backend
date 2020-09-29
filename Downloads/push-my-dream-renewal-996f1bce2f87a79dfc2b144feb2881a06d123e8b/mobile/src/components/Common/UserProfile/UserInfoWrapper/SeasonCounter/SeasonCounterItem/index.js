import React from "react";
import PropTypes from "prop-types";

import RankerFluctuations from "components/Common/RankerFluctuations";

import profile_season_counter_bg from "public/assets/image/profile_season_counter_bg.png";
import medal_ico from "public/assets/image/medal_purple.png";
import { numberWithCommas } from "shared/functions";
import { GRADIENT_2F3354_040221, COLOR_696C8C } from "shared/constants/colors";

const SeasonCounterItem = ({ rank, title, profileSeasonRankBg }) => {
  return (
    <div className="season_counter_item">
      <div className="wrapper">
        <div className="season_title">
          <img src={medal_ico} alt="medal_ico" width="15px" height="30px" />
          <span>{title}</span>
        </div>
        <div className="rank_badge">
          <div className="season_counter">{(rank && rank.ranking) || "-"}</div>
          <RankerFluctuations
            fluctuation={(rank && rank.fluctuation) || "-"}
            noBorder
            style={{ textAlign: "right" }}
          />
        </div>
      </div>
      <style jsx>{`
        .season_counter_item {
          width: calc((100% / 3) - 7px);
          height: 60px;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 5px;
          position: relative;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          background: ${GRADIENT_2F3354_040221(180)};
        }
        .wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 100%;
          max-width: 100px;
        }
        .season_title {
          position: absolute;
          top: 1px;
          left: 0px;
          width: 15px;
          z-index: -1;
        }
        .season_title > span {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: ${COLOR_696C8C};
        }
        .season_counter_item:last-child {
          margin: 0;
        }
        .season_counter {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          text-align: right;
        }
        .rank_badge {
          margin-top: 9px;
        }
        .rank {
          text-align: right;
        }
        @media (max-widrh: 320px) {
          .season_counter_item {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

SeasonCounterItem.propTypes = {
  rank: PropTypes.shape({
    ranking: PropTypes.number,
    fluctuation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

export default SeasonCounterItem;
