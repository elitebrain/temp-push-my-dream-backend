import React, { useState, useCallback, useEffect } from "react";

import CircleOne from "./CircleOne";
import CircleTwo from "./CircleTwo";
import CircleThree from "./CircleThree";

// import circle_menu from "public/assets/image/button_wheel.png"; 새로운 디자인 휠버튼
import circle_menu from "public/assets/image/circle_menu(orange).png";
import circle_menu_active from "public/assets/image/circle_menu_active(orange).png";
import { useSelector } from "react-redux";

const Index = () => {
  // const { isViewMainCounterAnimate } = useSelector(state => state.common);
  const [isActive, setIsActive] = useState(false);

  const circleImage = isActive ? circle_menu_active : circle_menu;
  const circleClass = `circle_menu_container${isActive ? " active" : ""}`;

  useEffect(() => {
    if (isActive) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = null;
    }
  }, [isActive]);

  const onToggleActive = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  // if (isViewMainCounterAnimate) {
  //   return null;
  // }

  return (
    <div className={circleClass}>
      <div className="circle_menu" onClick={onToggleActive}>
        <img
          src={circleImage}
          alt="circle_menu_ico"
          width="100%"
          height="100%"
        />
      </div>
      {isActive && (
        <>
          <CircleOne viewMenu={isActive} />
          <CircleTwo viewMenu={isActive} />
          <CircleThree viewMenu={isActive} />

          {/* 
            circleTwo는 유저 푸쉬,프로필 이미지, 닉네임
            circleThree는 비디오 썸네일 
         */}
        </>
      )}
      <style jsx>{`
        .circle_menu_container.active {
          width: 100%;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.8);
          /* position: absolute;
          top: 0%;
          left: 0; */
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1001;
          overflow: hidden;
        }
        .circle_menu {
          width: 60px;
          height: 60px;
          position: fixed;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          transition: all 0.35s ease-in-out;
          z-index: 1002;
        }
        .circle_menu_container.active .circle_menu {
          width: 140px;
          height: 140px;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          z-index: 100;
        }
      `}</style>
    </div>
  );
};

export default Index;
