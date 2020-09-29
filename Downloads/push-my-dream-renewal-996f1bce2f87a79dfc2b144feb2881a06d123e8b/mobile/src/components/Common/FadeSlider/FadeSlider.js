import React, { useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

const FadeSlider = ({ type, height, list, time = 7000 }) => {
  const fadeSliderRef = useRef(null);

  useEffect(() => {
    // type이 horizontal 또는 vertical로 설정되면서 \
    //list의 길이가 1 이상일 때 slide가 실행된다.
    if (
      [`${"horizontal".toLowerCase()}`, `${"vertical".toLowerCase()}`].indexOf(
        type
      ) !== -1 &&
      list.length !== 0
    ) {
      slide();
    }
  }, [type, list]);

  const slide = useCallback(() => {
    const target = fadeSliderRef.current;
    const len = list.length; // .slide li 갯수
    const targetHeight = target.clientHeight;

    // .slide ul의 너비 조정
    if (type === "horizontal") {
      target.style.cssText = `width:calc(100% * ${len});display:flex;transition:1s;`;
      // .slide li의 너비 조정
      Array.from(target.children).forEach(
        (ele) => (ele.style.cssText = `width:calc(100% / ${len});`)
      );
    } else {
      target.style.cssText = `height:calc(100% * ${len});transition:1s;`;
      // .slide li의 너비 조정
      Array.from(target.children).forEach(
        (ele) => (ele.style.cssText = `height:calc(100% / ${len});`)
      );
    }

    let pos = 0;
    setInterval(() => {
      pos = (pos + 1) % len; // 장면 선택

      if (type === "horizontal") {
        target.style.marginLeft = `${-pos * 100}%`; // 장면 전환
      } else {
        target.style.marginTop = `${-pos * height}px`;
      }
    }, time); // 1500 = 1500ms = 1.5sec. 즉, 1.5초 마다 실행}
  }, [type, list, time]);

  // type 검증
  if (
    [`${"horizontal".toLowerCase()}`, `${"vertical".toLowerCase()}`].indexOf(
      type
    ) === -1
  ) {
    console.log("type을 horizontal 또는 vertical로 선언해 주세요.");
    return null;
  }

  // list 검증
  if (list.length === 0) {
    console.log("list를 1개 이상 넣어주세요.");
    return null;
  }

  // 세로형이지만 height값을 입력 안했을 시
  if (type === "vertical" && !height) {
    console.log("vertical로 선택하면 height값은 필수로 입력해주셔야합니다.");
    return null;
  }

  return (
    <div className="slide">
      <ul ref={fadeSliderRef}>
        {list.map((component, i) => (
          <li key={i}>{component}</li>
        ))}
      </ul>
      <style jsx>{`
        ul,
        li {
          list-style: none;
        }
        .slide {
          /* min-width: 1366px; */

          height: ${type === "vertical" && !!height ? `${height}px` : "100%"};
          overflow: hidden;
        }
        .slide ul {
          height: 100%;
        }
        .slide li {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

FadeSlider.propTypes = {
  type: PropTypes.oneOf([
    `${"horizontal".toLowerCase()}`,
    `${"vertical".toLowerCase()}`,
  ]),
  list: PropTypes.array,
  time: PropTypes.number,
  height: PropTypes.number,
};

export default FadeSlider;
