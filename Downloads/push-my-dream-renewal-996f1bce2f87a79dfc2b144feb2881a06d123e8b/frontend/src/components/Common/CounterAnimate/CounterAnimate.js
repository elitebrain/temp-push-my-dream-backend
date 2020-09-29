import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { PushCountContext } from "components/Hoc/withPushCount";
import Counter from "./Counter";
import khancome_ico from "public/assets/icon/logo_bird_b.svg";
import khancome_ico_white from "public/assets/icon/logo_bird_w.svg";
import logo_ico from "public/assets/icon/push_logo(black).svg";
import logo_white_ico from "public/assets/icon/push_logo(white).svg";
import { MAIN_COLOR } from "shared/constants/colors";

// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function () {
  if (this == 0) return "0";

  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = this + "";

  while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");

  return n;
};

const CounterAnimate = ({
  whiteText,
  pushCount,
  defaultTime,
  between,
  slotLength,
  isHeader,
  style,
  counterColor,
}) => {
  const [view, setView] = useState(true);
  const [length, setLength] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  const { isPushLoaded } = useContext(PushCountContext);

  // 헤더가 아니면 에니메이션 끝난 후 사라지게 하기
  useEffect(() => {
    let timeOut;
    if (!isHeader) {
      if (isPushLoaded) {
        timeOut = setTimeout(() => {
          setView(false);
        }, 1000);
      }
    }
    return function cleanup() {
      clearTimeout(timeOut);
    };
  }, [isPushLoaded, isHeader]);

  useEffect(() => {
    const _length = ("" + pushCount).length;
    const numberLength = Math.pow(10, _length);

    const _randomNumber = Math.floor(Math.random() * numberLength).format();

    setLength(_length);
    setRandomNumber(_randomNumber);
  }, [pushCount]);

  if (length === 0 || !view) {
    return null;
  }

  return (
    <div
      className={`counterAnimate ${!isHeader && isPushLoaded ? "disable" : ""}`}
      style={style}
    >
      {isHeader ? (
        <>
          {whiteText ? (
            <div className="khancome_ico_header">
              <img
                src={khancome_ico_white}
                alt="logo_ico"
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <div className="khancome_ico_header">
              <img
                src={khancome_ico}
                alt="logo_ico"
                width="100%"
                height="100%"
              />
            </div>
          )}
        </>
      ) : (
        <div className="khancome_ico">
          <img
            src={khancome_ico_white}
            alt="logo_ico"
            width="100%"
            height="100%"
          />
        </div>
      )}
      <div className="counter_container">
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
              randomNumber={randomNumber[i] || 0}
              isHeader={isHeader}
              counterColor={counterColor}
            />
          ))}
      </div>
      {isHeader ? (
        <>
          <div className="counter_logo_header">PUSH</div>
          {/* {whiteText ? (
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
          )} */}
        </>
      ) : (
        <div className="counter_logo">
          <img src={logo_white_ico} alt="logo_ico" width="100%" height="100%" />
        </div>
      )}
      <style jsx>{`
        .counterAnimate {
          position: absolute;
          top: 50%;
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

        .counter_header {
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          bottom: 7px;
          padding-left: 7px;
          color: ${MAIN_COLOR};
        }
        .khancome_ico {
          width: 100px;
          height: 100px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .khancome_ico_header {
          width: 40px;
          height: 47px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .counter_container {
          display: inline-block;
          vertical-align: middle;
        }
        .counter_logo {
          width: 163px;
          height: 38px;
          display: inline-block;
          vertical-align: bottom;
        }

        .counter_logo_header {
          font-size: 20px;
          font-weight: 900;
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          position: relative;
          letter-spacing: -1px;
        }
      `}</style>
    </div>
  );
};

CounterAnimate.propTypes = {
  whiteText: PropTypes.bool,
  pushCount: PropTypes.number.isRequired,
  defaultTime: PropTypes.number,
  between: PropTypes.number,
  slotLength: PropTypes.number,
  isHeader: PropTypes.bool,
  style: PropTypes.object,
};

export default CounterAnimate;
