import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WIDTH = 83;
const HEADER_WIDTH = 20;

const HEIGHT = 115;
const HEADER_HEIGHT = 30;

const FONT_SIZE = 130;
const HEADER_FONT_SIZE = 30;

const Counter = ({
  index,
  size,
  defaultTime,
  between,
  number,
  randomNumber,
  slotLength,
  isHeader,
  counterColor,
}) => {
  const [position, setPosition] = useState(
    isHeader ? (9 - randomNumber) * HEADER_HEIGHT : (9 - randomNumber) * HEIGHT
  );

  // const [position, setPosition] = useState(
  //   isHeader
  //     ? (9 - randomNumber) * HEADER_HEIGHT + HEADER_HEIGHT * size * 5
  //     : (9 - randomNumber) * HEIGHT + HEIGHT * size * 5
  // );

  // useEffect(() => {
  //   if (number !== ",") {
  //     if (isHeader) {
  //       setPosition((9 - number) * HEADER_HEIGHT);
  //     } else {
  //       setPosition((9 - number) * HEIGHT);
  //     }
  //   }
  // }, [number, isHeader]);

  useEffect(() => {
    if (number !== ",") {
      if (isHeader) {
        setPosition(
          HEADER_HEIGHT * slotLength * 10 -
            number * HEADER_HEIGHT -
            HEADER_HEIGHT
        );
      } else {
        setPosition(HEIGHT * slotLength * 10 - number * HEIGHT - HEIGHT);
      }
    }
  }, [number, isHeader]);

  if (number === ",") {
    return (
      <div className="wrap">
        <div className="counter">
          <div className="item">,</div>
        </div>
        <style jsx>{`
          /* .wrap {
            width: 83px;
            height: ${HEIGHT}px;
            line-height: ${HEIGHT}px;
            overflow: hidden;
            font: 130px "Montserrat", sans-serif;
            color: #fff;
            text-align: center;
            box-sizing: border-box;
            font-weight: bold;
          } */
           .wrap {
            width: ${isHeader ? 10 : 55}px;
            height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
            /* line-height: ${HEIGHT}px; */
            overflow: hidden;
            font: ${
              isHeader ? HEADER_FONT_SIZE : FONT_SIZE
            }px "Montserrat", sans-serif;
      color: ${counterColor ? counterColor : "#000"};
            text-align: center;
            box-sizing: border-box;
            font-weight: 700;
            display: inline-block;
          }
          .wrap:last-child {
            margin-right: 0;
          }

          .wrap .counter {
            width: 100%;
            height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
            line-height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
          }

          .wrap .counter .item {
            width: 100%;
            height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
            line-height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="counter">
        {Array.apply(null, Array(+slotLength)).map((v, i) => (
          <React.Fragment key={i}>
            <div className="item">9</div>
            <div className="item">8</div>
            <div className="item">7</div>
            <div className="item">6</div>
            <div className="item">5</div>
            <div className="item">4</div>
            <div className="item">3</div>
            <div className="item">2</div>
            <div className="item">1</div>
            <div className="item">0</div>
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        /* .wrap {
          width: 83px;
          height: ${HEIGHT}px;
          line-height: ${HEIGHT}px;
          overflow: hidden;
          font: 130px "Montserrat", sans-serif;
          color: #fff;
          text-align: center;
          box-sizing: border-box;
          font-weight: bold;
        } */
        .wrap {
        width: ${isHeader ? HEADER_WIDTH : WIDTH}px;
          height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
          line-height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
          overflow: hidden;
          font: ${
            isHeader ? HEADER_FONT_SIZE : FONT_SIZE
          }px "Montserrat", sans-serif;
      color: ${counterColor ? counterColor : "#000"};
          text-align: center;
          box-sizing: border-box;
          font-weight: 900;
          display: inline-block;
        }
        .wrap:last-child {
          margin-right: 0;
        }

        .wrap .counter {
          width: 100%;
          height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
          /* line-height: ${HEIGHT}px; */
          /* Math.floor((size - index - 1) / 4) * between , 갯수만큼 0.5배 해서 제외 */
          /* 역순으로 0.5초씩 증가 */
          animation-name : countAnimate;
          animation-duration : ${
            defaultTime +
            between * (size - index - 1) -
            Math.floor((size - index - 1) / 4) * between
          }s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }

        .wrap .counter .item {
          width: 100%;
          height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
          line-height: ${isHeader ? HEADER_HEIGHT : HEIGHT}px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes countAnimate {
          0%{

          }

          100%{
            transform: translateY(${-position}px)
          }
        }
      `}</style>
    </div>
  );
};

Counter.propTypes = {
  index: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  defaultTime: PropTypes.number.isRequired,
  between: PropTypes.number.isRequired,
  number: PropTypes.string.isRequired,
  randomNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  slotLength: PropTypes.number,
  isHeader: PropTypes.bool,
};

export default Counter;
