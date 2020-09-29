import React from "react";

const PushCountRank = () => {
  return (
    <div className="push_count_rank">
      <div className="push_count">
        <span>1,065,879,806</span>
        <span>PUSH</span>
      </div>
      <div className="rank">
        <span>Rank</span>
        <span>12</span>
      </div>
      <style jsx>{`
        .push_count_rank {
          overflow: hidden;
          margin-bottom: 20px;
        }
        .push_count {
          float: left;
        }
        .push_count span:first-child {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          margin-right: 5px;
        }
        .push_count span:last-child {
          font-size: 14px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          vertical-align: bottom;
        }
        .rank {
          float: right;
        }
        .rank span:first-child {
          font-size: 14px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          vertical-align: bottom;
          margin-right: 10px;
        }
        .rank span:last-child {
          font-size: 20px;
          font-weight: bold;
          color: #f38400;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default PushCountRank;
