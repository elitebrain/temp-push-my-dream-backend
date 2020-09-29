import React from "react";
import PropTypes from "prop-types";

import SeasonCounterItem from "./SeasonCounterItem";

import week from "public/assets/image/week_bg.png";
import month from "public/assets/image/month_bg.png";
import season from "public/assets/image/season_bg.png";

const SeasonCounter = ({ rank, style }) => {
  return (
    // 랭크 객체가 존재하지 않거나 모든 랭크의 값이 없을 때 표시 하지 않는다.
    <div className="season_counter_container" style={style}>
      <SeasonCounterItem
        profileSeasonRankBg={week}
        title="Week"
        rank={rank && rank.weekRank}
      />
      <SeasonCounterItem
        profileSeasonRankBg={month}
        title="Month"
        rank={rank && rank.monthRank}
      />
      <SeasonCounterItem
        profileSeasonRankBg={season}
        title="Season"
        rank={rank && rank.seasonRank}
      />
      <style jsx>{`
        .season_counter_container {
          padding: 0 20px;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

SeasonCounter.propTypes = {
  rank: PropTypes.shape({
    weekRank: PropTypes.object,
    monthRank: PropTypes.object,
    seasonRank: PropTypes.object,
  }),
};
export default SeasonCounter;
