import React, { useState, useCallback } from "react";

import Avatar from "components/Common/Avatar";

import movie_thumnail from "public/assets/image/gate_producer_img.png";

const arr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];
const CircleThree = () => {
  const [idx, setIdx] = useState(1);
  const [isWheel, setIsWheel] = useState(true);
  const _handleWheel = useCallback(
    (e) => {
      e.persist();
      if (isWheel) {
        // setIsWheel(false);
        if (e.deltaY > 0) {
          // down
          _wheelDown();
        } else {
          // up
          _wheelUp();
        }

        setTimeout(() => {
          setIsWheel(true);
        }, 50);
      }
    },
    [isWheel]
  );

  let oldX = 0;
  let oldY = 0;

  const _wheelUp = useCallback(() => {
    setIdx((prev) => (prev > 1 ? prev - 1 : prev));
    setIsWheel(false);
  }, []);
  const _wheelDown = useCallback(() => {
    setIdx((prev) => (prev < arr.length - 1 ? prev + 1 : prev));
    setIsWheel(false);
  }, []);

  const _handleTouchStart = useCallback((e) => {
    oldX = e.touches[0].screenX;
    oldY = e.touches[0].screenY;
  }, []);

  const _handleTouchEnd = useCallback(
    (e) => {
      const newX = e.changedTouches[0].screenX;
      const newY = e.changedTouches[0].screenY;
      const diffX = Math.abs(newX - oldX);
      const diffY = newY - oldY;
      if (Math.abs(diffY) > diffX) {
        if (diffY > 0) {
          // up
          _wheelUp();
        } else {
          // down
          _wheelDown();
        }
      }
    },
    [oldX, oldY]
  );

  return (
    <div
      className="container"
      onWheel={_handleWheel}
      onTouchStart={_handleTouchStart}
      onTouchEnd={_handleTouchEnd}
    >
      {arr.map((item, i) => (
        <div
          key={item}
          className="item"
          style={{
            top: `calc(50% + ${200 * (i - idx) + 100}px)`,
            right: `calc(${(i - idx) * (i - idx + 1) * 50 + 30}px)`,
          }}
        >
          <div className="content_container">
            <Avatar
              photo={movie_thumnail}
              style={{
                width: "100px",
                height: "100px",
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "15px",
              }}
            />
            <div className="user_info">
              <div className="badge">2020 4th Choco</div>
              <div className="name">손예진</div>
              <div className="height_weight">
                <span>175cm</span>
                <span>,</span>
                <span>72kg</span>
              </div>
            </div>
            <div className="push_rank">
              <div className="rank">
                <span>Rank</span>
                <span>12</span>
              </div>
              <div className="push">
                <span>1,045,900</span>
                <span>PUSH</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        .container {
          position: absolute;
          width: 2000px;
          height: 2000px;
          left: -685px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background-color: #2e2e3b;
          transition: 0.2s ease-in-out;
          z-index: 1;
        }
        .item {
          width: 540px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          transition: 0.2s ease-in-out;
          color: #fff;
        }
        .content_container {
          position: relative;
        }

        .user_info {
          display: inline-block;
          vertical-align: middle;
        }
        .user_info .badge {
          font-size: 16px;
          font-weight: bold;
          padding: 3px 10px;
          background-color: #f38400;
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .user_info .name {
          font-weight: bold;
          font-size: 21px;
          margin-bottom: 5px;
        }
        .user_info .height_weight {
          font-size: 16px;
          font-weight: 400;
        }
        .push_rank {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          text-align: center;
        }
        .push_rank .rank {
          margin-bottom: 10px;
        }
        .push_rank .rank span:first-child {
          font-size: 29px;
          font-weight: bold;
          margin-right: 10px;
        }
        .push_rank .rank span:last-child {
          font-size: 41px;
          font-weight: bold;
          color: #f38400;
        }
        .push_rank .push {
          font-size: 16px;
          font-weight: bold;
        }
        .push_rank .push span:first-child {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default CircleThree;
