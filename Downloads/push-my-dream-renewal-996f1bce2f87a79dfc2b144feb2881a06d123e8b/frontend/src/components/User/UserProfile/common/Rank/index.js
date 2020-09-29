import React from "react";

import rank_ico from "public/assets/icon/rank_ico(yellow).svg";

const Rank = ({ positionNone, style }) => {
  return (
    <div className={`rank${positionNone ? " positionNone" : ""}`} style={style}>
      {/* 현재 시즌 랭크 */}
      <span>
        <img src={rank_ico} alt="rank" width="100%" height="100%" />
      </span>
      <span>Rank 12</span>
      <style jsx>{`
        .rank {
          position: absolute;
          right: 25px;
        }
        .rank.positionNone {
          position: inherit;
        }
        .rank span:first-child {
          width: 11px;
          height: 18px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
        .rank span:last-child {
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          display: inline-block;
          vertical-align: middle;
        }
        @media (min-width: 2560px) {
          .rank span:first-child {
            width: 15px;
            height: 30px;
          }
          .rank span:last-child {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Rank;
