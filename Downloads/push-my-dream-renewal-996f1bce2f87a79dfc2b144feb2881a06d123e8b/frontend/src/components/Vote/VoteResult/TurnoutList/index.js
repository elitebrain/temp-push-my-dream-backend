import React from "react";

const Turnout = ({ index, item, color }) => {
  return (
    <div className="turnout_ ranker">
      <div className="rank">{index + 1}</div>
      <div className="info_box">
        <div className="flex">
          <div className="gubun" />
          <div className="band_name">{item.vote_item_title}</div>
          <div className="under_line" />
        </div>
        <div className="music_info">{item.vote_item_description}</div>
      </div>

      <div className="turnout">{item.DATA.percent}</div>
      <style jsx>{`
        .turnout_ {
          margin-bottom: 20px;
          position: relative;
          display: flex;
        }
        .turnout_:last-child {
          margin-bottom: 0;
        }
        .info_box {
          flex: 1;
          background-color: #fff;
          padding: 0 20px;
        }

        .info_box .flex {
          display: flex;
          align-items: center;
          height: 29px;
          position: relative;
        }
        .turnout_ .flex .gubun {
          flex-basis: 37px;
          width: 37px;
          height: 19px;
          background-color: #b2b2b2;
          border-radius: 15px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }

        .turnout_ .flex .band_name {
          flex: 1;
          font-size: 16px;
          font-weight: bold;
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
        }

        .turnout_ .rank {
          flex-basis: 25px;
          width: 25px;
          height: 25px;
          line-height: 25px;
          border: 2px solid #dcdcdc;
          border-radius: 50%;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          background-color: #fff;
        }

        .ranker .flex .gubun {
          background-color: ${color};
        }

        .turnout_ .music_info {
          display: inline-block;
          vertical-align: middle;
        }
        .turnout_ .music_info span {
          font-size: 16px;
          font-weight: 400;
          display: inline-block;
          vertical-align: middle;
        }
        .turnout_ .under_line {
          width: 100%;
          height: 2px;
          background-color: #e1e3e4;

          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);

          z-index: -1;
        }
        .turnout_ .turnout {
          flex-basis: 60px;
          width: 60px;
          font-size: 18px;
          font-weight: 600;
          background-color: #fff;

          /* position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%); */

          padding-left: 20px;
        }
        .ranker .turnout {
          color: #000;
        }
      `}</style>
    </div>
  );
};

const TurnoutList = ({ vote, colors }) => {
  return (
    <div className="turnout_list">
      {vote.VOTE_ITEM_LIST.map((v, i) => (
        <Turnout key={i} index={i} item={v} color={colors[i]} />
      ))}
      <style jsx>{`
        .turnout_list {
          padding: 0 30px;
          margin-bottom: 50px;
        }
      `}</style>
    </div>
  );
};

export default TurnoutList;
