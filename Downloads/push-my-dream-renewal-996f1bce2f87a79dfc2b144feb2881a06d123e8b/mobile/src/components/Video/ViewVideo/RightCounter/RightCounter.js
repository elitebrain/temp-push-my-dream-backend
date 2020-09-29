import React from "react";

const RightCounter = () => {
  return (
    <div className="right_counter_container">
      <div className="box week">
        <div className="counter">1</div>
        <div className="title">Week</div>
      </div>
      <div className="box Month">
        <div className="counter">6</div>
        <div className="title">Month</div>
      </div>
      <div className="box Season">
        <div className="counter">13</div>
        <div className="title">Season</div>
      </div>

      <style jsx>{`
        .right_counter_container {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }
        .right_counter_container .box {
          text-align: center;
          color: #fff;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .right_counter_container .box:last-child {
          margin-bottom: 0;
        }

        .right_counter_container .box .counter {
          width: 43px;
          height: 43px;
          line-height: 43px;
          background-color: rgba(255, 255, 255, 0.2);
          font-size: 15px;
          border-radius: 50%;
          margin: 0 auto;
          margin-bottom: 5px;
        }
        .right_counter_container .box .title {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};

export default RightCounter;
