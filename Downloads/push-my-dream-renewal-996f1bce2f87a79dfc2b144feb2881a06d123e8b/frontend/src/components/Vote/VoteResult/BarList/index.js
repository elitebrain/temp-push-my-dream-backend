import React from "react";
import PropTypes from "prop-types";

const Bar = ({ index, color, item }) => {
  return (
    <div className={`bar ${index === 0 ? "ranker" : ""}`.trim()}>
      <div className="rank">{index + 1}</div>
      <div className="turnout">{item.DATA.percent}</div>
      <style jsx>{`
        .bar {
          width: ${item.DATA.percent};
          animation: 0.5s animateBar ease-in-out;
          height: 44px;
          background-color: ${color};
          position: relative;
          border-radius: 15px;
          margin-bottom: 30px;
        }

        @keyframes animateBar {
          0% {
            width: 0%;
          }

          100% {
            width: ${item.DATA.percent};
          }
        }
        .bar:last-child {
          margin-bottom: 0;
        }
        .ranker {
          background-color: ${color};
        }
        .bar .rank {
          width: 25px;
          height: 25px;
          line-height: 25px;
          border: 2px solid #ccc;
          border-radius: 50%;
          color: #444;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          position: absolute;
          left: -40px;
          top: 50%;
          transform: translateY(-50%);
        }
        .bar .turnout {
          width: 50px;
          color: #444;
          font-size: 16px;
          font-weight: 600;
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

Bar.propTypes = {
  index: PropTypes.number,
  color: PropTypes.string,
  item: PropTypes.shape({
    DATA: PropTypes.shape({
      percent: PropTypes.string
    })
  })
};

const BarList = ({ vote, colors }) => {
  return (
    <div className="band_list">
      <div className="bar_list">
        {vote.VOTE_ITEM_LIST &&
          vote.VOTE_ITEM_LIST.map((v, i) => (
            <Bar key={i} index={i} item={v} color={colors[i]} />
          ))}
      </div>
      <style jsx>{`
        .band_list {
          margin-bottom: 60px;
        }
        .bar_list {
          border-radius: 15px;
          background-color: #f6f6f6;
          padding: 60px 70px;
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
};

BarList.propTypes = {
  vote: PropTypes.shape({
    VOTE_ITEM_LIST: PropTypes.array
  }),
  colors: PropTypes.array
};

export default BarList;
