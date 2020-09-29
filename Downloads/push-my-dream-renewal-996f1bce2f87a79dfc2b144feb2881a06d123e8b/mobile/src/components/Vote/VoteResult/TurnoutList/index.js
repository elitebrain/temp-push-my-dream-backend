import React from "react";

const Turnout = ({ index, item, color }) => {
  return (
    <div className="turnout_ ranker">
      <div className="rank">{index + 1}</div>
      <div className="info_box">
        <div className="flex">
          <div className="gubun" />
          <div className="band_name">{item.vote_item_title}</div>
        </div>
        <div className="music_info">{item.vote_item_description}</div>
      </div>
      <div className="turnout">{item.DATA.percent}</div>
      <style jsx>{`
        .turnout_ {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
          position: relative;
        }
        .turnout_:last-child {
          margin-bottom: 0;
        }
        .turnout_ .rank {
          flex-basis: 17px;
          width: 17px;
          height: 17px;
          line-height: 17px;
          border: 1px solid #888;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          color: #fff;

          margin-right: 10px;
        }
        .turnout_ .gubun {
          width: 30px;
          height: 15px;
          background-color: #b2b2b2;
          border-radius: 3px;
           {
            /* display: inline-block; */
          }
           {
            /* vertical-align: middle; */
          }
          margin-right: 10px;
        }
        .ranker .gubun {
          background-color: ${color};
        }
        .info_box {
          flex: 1;
          display: inline-block;
        }

        .info_box .flex {
          display: flex;
          align-items: flex-start;
          height: 15px;
          line-height: 15px;
        }

        .turnout_ .band_name {
          font-size: 13px;
          font-weight: bold;
          margin-right: 10px;
           {
            /* display: inline-block; */
          }
           {
            /* vertical-align: middle; */
          }
          color: #fff;
        }
        .turnout_ .music_info {
          font-size: 12px;
          display: inline-block;
          vertical-align: middle;
          color: #c4c4c4;
        }
        .turnout_ .music_info span {
          font-size: 12px;
          font-weight: 400;
          display: inline-block;
          vertical-align: middle;
          color: #c4c4c4;
        }
        .turnout_ .turnout {
          flex-basis: 40px;
          font-size: 12px;
          font-weight: 600;
          padding-left: 10px;
          color: #b2b2b2;
        }

        /* .turnout_ .turnout {
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 20px;
          color: #b2b2b2;
        } */
        .ranker .turnout {
          color: #dcdcdc;
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
          margin-bottom: 50px;
        }
      `}</style>
    </div>
  );
};

export default TurnoutList;
