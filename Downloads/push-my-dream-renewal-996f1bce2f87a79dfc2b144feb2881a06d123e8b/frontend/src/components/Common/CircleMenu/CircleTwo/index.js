import React, { useState, useCallback } from "react";

import movie_thumnail from "public/assets/image/gate_videoList_img.jpg";

import Items from "./Items";

const imgList = [
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
  {
    src: movie_thumnail,
  },
];
const CircleTwo = () => {
  const [idx, setIdx] = useState(1);
  const [list, setList] = useState(imgList);
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
    setIdx((prev) => (prev < list.length - 1 ? prev + 1 : prev));
    setIsWheel(false);
  }, [list]);

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
      {list.map((item, i) => (
        <div
          key={i}
          className="item"
          style={{
            top: `calc(50% + ${215 * (i - idx) + 108}px)`,
            right: `calc(${(i - idx) * (i - idx + 1) * 20 + 80}px)`,
          }}
        >
          <Items src={item.src} />
        </div>
      ))}
      <style jsx>{`
        .container {
          position: absolute;
          width: 2000px;
          height: 2000px;
          left: -1315px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background-color: #22222b;
          transition: 0.2s ease-in-out;
          z-index: 2;
        }
        .item {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 150px;
          height: 215px;
          background-color: #088;
          transition: 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CircleTwo;
