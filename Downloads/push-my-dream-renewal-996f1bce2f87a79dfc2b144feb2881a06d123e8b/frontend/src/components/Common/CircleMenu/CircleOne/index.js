import React, { useState, useCallback } from "react";

import CircleRootItem from "./CircleRootItem";

import new_ico from "public/assets/icon/new_ico(white).svg";
import hotPush_ico from "public/assets/image/hotPush_ico(white).png";
import comment_ico from "public/assets/image/comment_btn(white).png";
import like_ico from "public/assets/icon/like2_ico(white).svg";
import logo_dream from "public/assets/icon/logo.svg";
import logo_choco from "public/assets/image/logo_choco(white).png";
import logo_dance from "public/assets/image/logo_dance(white).png";
import logo_singer from "public/assets/image/logo_singer(white).png";

import { MAIN_BLACK_COLOR } from "shared/constants/colors";

const circleRootList = [
  {
    image: {
      src: new_ico,
      alt: "new_ico",
      width: "57px",
      height: "59px",
    },
    content: "신규 영상",
  },
  {
    image: {
      src: hotPush_ico,
      alt: "hotPush_ico",
      width: "56px",
      height: "56px",
    },
    content: "인기 푸쉬",
  },
  {
    image: {
      src: comment_ico,
      alt: "comment_ico",
      width: "52px",
      height: "52px",
    },
    content: "댓글 화제",
  },
  {
    image: {
      src: like_ico,
      alt: "like_ico",
      width: "48px",
      height: "58px",
    },
    content: "많은 좋아요",
  },
  {
    image: {
      src: logo_dream,
      alt: "logo_dream",
      width: "92px",
      height: "38px",
    },
    isOngoing: true,
  },
  {
    image: {
      src: logo_dance,
      alt: "logo_dance",
      width: "92px",
      height: "38px",
    },
  },
  {
    image: {
      src: logo_choco,
      alt: "logo_choco",
      width: "92px",
      height: "38px",
    },
  },
  {
    image: {
      src: logo_singer,
      alt: "logo_singer",
      width: "92px",
      height: "38px",
    },
  },
];

const CircleOne = () => {
  const [idx, setIdx] = useState(1);
  const [list, setList] = useState(circleRootList);
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
            top: `calc(50% + ${150 * (i - idx) + 75}px)`,
            right: `calc(${(i - idx) * (i - idx + 1) * 15 + 15}px)`,
          }}
        >
          <CircleRootItem content={item.content} isOngoing={item.isOngoing}>
            <img
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
            />
          </CircleRootItem>
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
          left: -1600px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background-color: ${MAIN_BLACK_COLOR};
          transition: 0.2s ease-in-out;
          z-index: 3;
        }
        .item {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 93px;
          height: 90px;
          transition: 0.2s ease-in-out;
        }
        img {
          display: block;
          margin: 0 auto;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default CircleOne;
