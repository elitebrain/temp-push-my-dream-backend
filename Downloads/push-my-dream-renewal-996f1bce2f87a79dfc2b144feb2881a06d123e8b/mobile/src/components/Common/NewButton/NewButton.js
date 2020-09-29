import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import {
  WHITE_COLOR,
  MAIN_COLOR,
  GRADIENT_00F1B4_D53CF5,
  BACKGROUND_BLACK_COLOR,
  COLOR_3B3D55,
  GRADIENT_FFFFFF_C0C5DF,
} from "shared/constants/colors";

import DynamicLoader from "components/Common/DynamicLoader";

/**
 * width default 100%
 * height default 60px
 */
const NewButton = ({
  children,
  className,
  loading = false,
  loaderColor = "#fff",
  borderRadius = "5px",
  borderColor,
  width = "100%",
  height = "40px",
  fontSize = "normal",
  bgColor = MAIN_COLOR,
  bgImage,
  color = WHITE_COLOR,
  gradient,
  disabled,
  onClick,
  activeAnimation,
  style,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);

  // 버튼 클릭 시 애니메이션 설정
  const onTouchStart = useCallback(() => {
    if (activeAnimation) {
      setIsActive(true);
    }
  }, [activeAnimation]);

  // 버튼 클릭 시 애니메이션 초기화
  const onTouchEnd = useCallback(() => {
    if (activeAnimation) {
      setIsActive(false);
    }
  }, [activeAnimation]);

  // const onTouchStart = useCallback(() => {
  //   console.log("gg", activeAnimation);
  //   if (activeAnimation) {
  //     setIsActiveFontColor(true);
  //     setIsActiveBtnBG(true);
  //     setTimeout(() => {
  //       setIsActiveBtnBG(true);
  //     }, 200);
  //   }
  // }, [activeAnimation]);

  const _fontSize = useMemo(() => {
    if (["big", "normal", "small"].indexOf(fontSize) === -1) {
      if (!/(\d+)(px)/g.test(fontSize)) {
        console.error(
          "fontSize 속성은 big / normal / small / 12px 4가지 형식 중 한개로 입력해주세요."
        );

        return "16px";
      }
    }

    return fontSize === "big"
      ? "20px"
      : fontSize === "normal"
      ? "16px"
      : fontSize === "small"
      ? "14px"
      : fontSize;
  }, [fontSize]);

  const buttonClass = useMemo(
    () =>
      `button${gradient ? " gradient" : ""}${
        isActive ? " activeAnimaiton" : ""
      }${className ? ` ${className}` : ""}`,
    [gradient, isActive, className]
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      style={style}
      disabled={loading || disabled}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      {...rest}
    >
      {loading ? (
        <DynamicLoader loaderColor={loaderColor} size={height} />
      ) : (
        children
      )}

      <style jsx>{`
        .button {
          font-weight: bold;
          border-radius: ${borderRadius};
          width: ${width};
          height: ${height};
          border: ${borderColor ? `1px solid ${borderColor}` : "none"};
          font-size: ${_fontSize};
          ${bgImage ? "" : `background-color: ${bgColor};`}
          color: ${color};
          cursor:pointer;
          ${bgImage ? `background-image: ${bgImage}` : ""}
        }

        .button.gradient {
          border: solid 1px transparent !important;
              background: linear-gradient(${bgColor},${bgColor}) padding-box, 
              ${GRADIENT_00F1B4_D53CF5(90)} border-box;
        }

        .button:hover {    
          transition: 0.6s ease-in-out;
          ${
            activeAnimation
              ? `background-image: ${GRADIENT_FFFFFF_C0C5DF(90)}`
              : ""
          };      
          ${activeAnimation ? `color: ${COLOR_3B3D55}` : ""};
        }

        .button:active {
          transition: 0.6s ease-in-out;
          ${activeAnimation ? `background: transparent` : ""};
          ${activeAnimation ? `color: ${COLOR_3B3D55}` : ""};
        }

        .button:active.activeAnimaiton{
          ${
            activeAnimation
              ? `background-image: ${GRADIENT_FFFFFF_C0C5DF(90)}`
              : ""
          };
        } 
      `}</style>
    </button>
  );
};

NewButton.propTypes = {
  children: PropTypes.node,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  activeAnimation: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  rest: PropTypes.object,
};

export default NewButton;
