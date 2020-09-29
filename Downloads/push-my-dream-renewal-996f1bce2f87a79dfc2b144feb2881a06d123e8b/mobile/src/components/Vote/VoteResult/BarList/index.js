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
          height: 31px;
          background-color: ${color};
          position: relative;
          border-radius: 10px;
          margin-bottom: 15px;
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
          width: 17px;
          height: 17px;
          line-height: 17px;
          border: 1px solid #444;
          border-radius: 50%;
          color: #444;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          position: absolute;
          left: -25px;
          top: 50%;
          transform: translateY(-50%);
        }
        .bar .turnout {
          width: 50px;
          color: #444;
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          right: -55px;
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
          margin-bottom: 20px;
        }
        .bar_list {
          border-radius: 15px;
          background-color: #f6f6f6;
          padding: 30px 45px 30px 35px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default BarList;
