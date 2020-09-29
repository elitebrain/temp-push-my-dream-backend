import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { PushCountContext } from "components/Hoc/withPushCount";
import Counter from "./Counter";
import khancome_ico from "public/assets/icon/logo_bird_b.svg";
import main_logo from "public/assets/image/main_logo.png";
import pushIconBlack from "public/assets/image/push_icon(black).png";
// import favicon from "public/assets/icon/favicon.ico";
import logo_ico from "public/assets/icon/push_logo(black).svg";
import logo_white_ico from "public/assets/icon/push_logo(white).svg";
import { MAIN_COLOR } from "shared/constants/colors";

const HEIGHT = 20;

// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function () {
  if (this == 0) return "0";

  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = this + "";

  while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");

  return n;
};

const CounterAnimate = ({
  moveToVideo,
  pushCount,
  defaultTime,
  between,
  slotLength,
  isHeader,
  counterColor,
  whiteText,
  style,
}) => {
  const [view, setView] = useState(true);
  const [length, setLength] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [pushMargin, setPushMargin] = useState(5);

  const { isPushLoaded } = useContext(PushCountContext);

  // 헤더가 아니면 에니메이션 끝난 후 사라지게 하기
  // useEffect(() => {
  //   let timeOut;
  //   if (!isHeader) {
  //     if (isPushLoaded) {
  //       timeOut = setTimeout(() => {
  //         setView(false);
  //       }, 1000);
  //     }
  //   }
  //   return function cleanup() {
  //     clearTimeout(timeOut);
  //   };
  // }, [isPushLoaded, isHeader]);

  useEffect(() => {
    const _length = ("" + pushCount).length;
    const numberLength = Math.pow(10, _length);

    setLength(_length);
    setRandomNumber("1000000000");
  }, [pushCount]);

  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      setPushMargin(4);
    }
  }, []);

  if (length === 0 || !view) {
    return null;
  }
  return (
    <div
      className={`counterAnimate ${!isHeader && isPushLoaded ? "disable" : ""}`}
      style={style}
    >
      {/* {isHeader ? (
        <>
          <div className="khancome_ico_header">
            <img src={khancome_ico} alt="logo_ico" width="100%" height="100%" />
          </div>
        </>
      ) : (
        <></>
      )} */}
      {!isHeader && (
        <span className="main_logo" onClick={() => moveToVideo()}>
          <img src={main_logo} alt="main_logo" />
        </span>
      )}
      <div
        className={isHeader ? "counter_container" : "counter_container splash"}
      >
        {pushCount
          .format()
          .split("")
          .map((number, i, arr) => (
            <Counter
              key={i}
              size={arr.length}
              index={i}
              defaultTime={defaultTime}
              between={between}
              number={number}
              slotLength={slotLength}
              randomNumber={Number(randomNumber[i]) || 0}
              isHeader={isHeader}
              counterColor={counterColor}
            />
          ))}
        {isHeader && (
          <span className="push_text">
            <img src={pushIconBlack} alt="push_text_icon" />
          </span>
        )}
      </div>

      {/* <div className="counter_logo">
        <img src={logo_white_ico} alt="logo_ico" width="100%" height="100%" />
      </div> */}

      {/* {isHeader ? (
        <>
          {whiteText ? (
            <div className="counter_logo_header">
              <img
                src={logo_white_ico}
                alt="logo_ico"
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <div className="counter_logo_header">
              <img src={logo_ico} alt="logo_ico" width="100%" height="100%" />
            </div>
          )}
        </>
      ) : (
        <div className="counter_logo">
          <img src={logo_white_ico} alt="logo_ico" width="100%" height="100%" />
        </div>
      )} */}
      <style jsx>{`
        .counterAnimate {
          white-space: nowrap;
          position: absolute;
          top: calc(50% + 2px);
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          opacity: 1;
          transition: 1s opacity ease-in-out;
          word-spacing: -4px;
        }
        .counterAnimate.disable {
          opacity: 0;
        }
        /* .counterAnimate {
          display: flex;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          align-items: flex-end;
        } */

        .main_logo {
          position: relative;
          width: 85px;
          height: 85px;
          left: 50%;
          transform: translateX(-50%);
          bottom: 30px;
          display: block;
          animation: fadein 0.6s linear;
        }
        .main_logo > img {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 85px;
          height: 85px;
          transform: translate(-50%, -50%);
        }
        .counter_header {
          position: absolute;
          bottom: 4px;
          padding-left: 3px;
          width: 40px;
          height: 20px;
        }
        .counter_container {
          height: 26.4px;
          opacity: ${isHeader ? 1 : 0};
          transition: 0.6s ease-in-out;
        }
        .counter_container.splash {
          height: 40px !important;

          display: flex;
          text-align: center;
          justify-content: center;
          opacity: 0;
          animation: fadein 3.3s linear 1s;
          transition: 0.6s ease-in-out;
        }

        .counter_container > .push_text {
          display: inline-block;
          width: 24px;
          position: relative;
          font-size: ${isHeader ? "12px" : "16px"};
          font-weight: 800;
          line-height: ${isHeader ? "26px" : "44px"};
          margin-left: 4px;
          font: ${isHeader ? "14px" : "30px"} "GmarketSansTTFMedium", sans-serif;

          box-sizing: border-box;
          padding-bottom: ${pushMargin}px;

          vertical-align: bottom;

          /* padding-bottom: 7px; */
        }
        .counter_container > .push_text > img {
          display: block;
          width: 100%;
          height: auto;

          vertical-align: top;
        }
        .counter_logo {
          width: 30px;
          height: ${HEIGHT}px;
          margin-left: 3px;
          display: inline-block;
          vertical-align: bottom;
        }

        .counter_logo_header {
          width: 25px;
          height: 25px;
          display: inline-block;
          vertical-align: bottom;
          margin-left: 5px;
          position: relative;
        }
        .khancome_ico {
          width: 50px;
          height: 50px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .khancome_ico_header {
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
        @media (max-width: 375px) {
          .counterAnimate {
            left: 50%;
          }
        }
        @media (max-width: 320px) {
          .counter_logo_header {
            display: none;
          }
        }
        @keyframes trans_opacity {
          from {
            opacity: 1;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

CounterAnimate.propTypes = {
  moveToVideo: PropTypes.func,
  pushCount: PropTypes.number.isRequired,
  defaultTime: PropTypes.number,
  between: PropTypes.number,
  slotLength: PropTypes.number,
  isHeader: PropTypes.bool,
  counterColor: PropTypes.string,
  whiteText: PropTypes.bool,
  style: PropTypes.object,
};

export default CounterAnimate;
