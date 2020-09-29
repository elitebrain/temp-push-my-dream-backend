import React from "react";
import PropTypes from "prop-types";

import rankBadge from "public/assets/image/rank_badge.png";

const RankBadge = props => {
  const { rank } = props;
  return (
    <div className="badge">
      {rank} 위
      <style jsx>{`
        .badge {
          display: inline-block;
          position: relative;
          width: 79px;
          height: 22px;
          background-image: url('${rankBadge}');
          font-size: 16px;
          color: #fff;
          text-align: center;
          line-height: 22px;
          background-size: cover;
          box-sizing: border-box;
          vertical-align: middle;
          margin-left: 12px;
        }
        @media(max-width:425px) {
          .badge{
            font-size: 13px;
            width: 60px;
            height: 17px;
            line-height: 17px;
            margin-left: 6px;
          }
        }
      `}</style>
    </div>
  );
};

RankBadge.propTypes = {
  rank: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default RankBadge;
