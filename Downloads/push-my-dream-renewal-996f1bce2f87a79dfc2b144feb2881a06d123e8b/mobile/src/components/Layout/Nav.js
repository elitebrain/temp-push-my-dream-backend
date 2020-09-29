import React, { useState } from "react";
import Router from "next/router";

import circleBtn from "public/assets/image/main_logo.png";
import arrowLeftBtn from "public/assets/image/button_arrow_left(purple).png";
import arrowRightBtn from "public/assets/image/button_arrow_right(purple).png";
import reloadBtn from "public/assets/image/button_reload(purple).png";
import uploadBtn from "public/assets/image/upload(purple).png";

// import wheelButtonAppleBlue from "public/assets/image/wheel_button_apple_blue.png";
// import wheelButtonAppleGradation from "public/assets/image/wheel_button_apple_gradation.png";
// import wheelButtonBestgoodBlue from "public/assets/image/wheel_button_bestgood_blue.png";
// import wheelButtonBestgoodGradation from "public/assets/image/wheel_button_bestgood_gradation.png";
// import wheelButtonChocoBlue from "public/assets/image/wheel_button_choco_blue.png";
// import wheelButtonChocoGradation from "public/assets/image/wheel_button_choco_gradation.png";
// import wheelButtonDanceBlue from "public/assets/image/wheel_button_dance_blue.png";
// import wheelButtonDanceGradation from "public/assets/image/wheel_button_dance_gradation.png";
// import wheelButtonDreamBlue from "public/assets/image/wheel_button_dream_blue.png";
// import wheelButtonDreamGradation from "public/assets/image/wheel_button_dream_gradation.png";
// import wheelButtonEmergenzaBlue from "public/assets/image/wheel_button_emergenza_blue.png";
// import wheelButtonEmergenzaGradation from "public/assets/image/wheel_button_emergenza_gradation.png";
// import wheelButtonHotpushBlue from "public/assets/image/wheel_button_hotpush_blue.png";
// import wheelButtonHotpushGradation from "public/assets/image/wheel_button_hotpush_gradation.png";
// import wheelButtonIssuereplyBlue from "public/assets/image/wheel_button_issuereply_blue.png";
// import wheelButtonIssuereplyGradation from "public/assets/image/wheel_button_issuereply_gradation.png";
// import wheelButtonNewvodBlue from "public/assets/image/wheel_button_newvod_blue.png";
// import wheelButtonNewvodGradation from "public/assets/image/wheel_button_newvod_gradation.png";
// import wheelButtonSingerBlue from "public/assets/image/wheel_button_singer_blue.png";
// import wheelButtonSingerGradation from "public/assets/image/wheel_button_singer_gradation.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

import wheelButtonBestgoodBlue from "public/assets/image/wheel_button_bestgood2_white.png";
import wheelButtonBestgoodGradation from "public/assets/image/wheel_button_bestgood2_gradation.png";
import wheelButtonDreamBlue from "public/assets/image/wheel_button_dream2_white.png";
import wheelButtonDreamGradation from "public/assets/image/wheel_button_dream2_gradation.png";
import wheelButtonEmergenzaBlue from "public/assets/image/wheel_button_emergenza2_white.png";
import wheelButtonEmergenzaGradation from "public/assets/image/wheel_button_emergenza2_gradation.png";
import wheelButtonHotpushBlue from "public/assets/image/wheel_button_hotpush2_white.png";
import wheelButtonHotpushGradation from "public/assets/image/wheel_button_hotpush2_gradation.png";
import wheelButtonIssuereplyBlue from "public/assets/image/wheel_button_issuereply2_white.png";
import wheelButtonIssuereplyGradation from "public/assets/image/wheel_button_issuereply2_gradation.png";
import wheelButtonNewvodBlue from "public/assets/image/wheel_button_newvod2_white.png";
import wheelButtonNewvodGradation from "public/assets/image/wheel_button_newvod2_gradation.png";
import wheelButtonSingerBlue from "public/assets/image/wheel_button_singer2_white.png";
import wheelButtonSingerGradation from "public/assets/image/wheel_button_singer2_gradation.png";
const circleItems = [
  // {
  //   no: 1,
  //   default: wheelButtonAppleBlue,
  //   active: wheelButtonAppleGradation,
  // },
  {
    no: 2,
    default: wheelButtonBestgoodBlue,
    active: wheelButtonBestgoodGradation,
    url: "/",
  },
  // {
  //   no: 3,
  //   default: wheelButtonChocoBlue,
  //   active: wheelButtonChocoGradation,
  // },
  {
    no: 4,
    default: wheelButtonSingerBlue,
    active: wheelButtonSingerGradation,
    url: "/category/63",
  },
  {
    no: 5,
    default: wheelButtonDreamBlue,
    active: wheelButtonDreamGradation,
    url: "/category/4",
  },
  {
    no: 6,
    default: wheelButtonEmergenzaBlue,
    active: wheelButtonEmergenzaGradation,
    url: "https://emergenza.khanteum.com",
  },
  {
    no: 7,
    default: wheelButtonHotpushBlue,
    active: wheelButtonHotpushGradation,
    url: "/",
  },
  {
    no: 8,
    default: wheelButtonIssuereplyBlue,
    active: wheelButtonIssuereplyGradation,
    url: "/",
  },
  {
    no: 9,
    default: wheelButtonNewvodBlue,
    active: wheelButtonNewvodGradation,
    url: "/",
  },
  // {
  //   no: 10,
  //   default: wheelButtonSingerBlue,
  //   active: wheelButtonSingerGradation,
  //   url: "/category/63",
  // },
];

const Nav = () => {
  const [isViewMenu, setIsViewMenu] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const _handleArrow = (direction) => {
    if (direction === "left") {
      Router.back();
    } else if (direction === "right") {
      window.history.go(1);
    }
  };
  const _openMenu = () => {
    document.querySelector("body").style.overflow = "hidden";
    setIsViewMenu(true);
  };
  const _closeMenu = () => {
    document.querySelector("body").style.overflow = "auto";
    setIsViewMenu(false);
  };
  const _toggleMenu = () => {
    setIsViewMenu((prevState) => !prevState);
  };
  const _handleReload = () => {
    Router.reload();
  };
  let oldX = 0;
  let oldY = 0;
  let oldRotate = 0;
  let oldBtnRotate = 0;
  const _handleTouchStart = (e) => {
    oldX = e.touches[0].clientX;
    oldY = e.touches[0].clientY;
    const el = document.querySelector(".circle_btn_active");
    const elBtn = document.querySelector(".circle_btn_active > img");
    if (el) {
      oldRotate = el.style.transform
        .split("deg)")[0]
        .substr(el.style.transform.split("deg)")[0].indexOf("rotate") + 7);
      oldRotate = oldRotate.length === 0 ? 0 : parseInt(oldRotate);
    }
    if (elBtn) {
      oldBtnRotate = elBtn.style.transform
        .split("deg)")[0]
        .substr(elBtn.style.transform.split("deg)")[0].indexOf("rotate") + 7);
      oldBtnRotate = oldBtnRotate.length === 0 ? 0 : parseInt(oldBtnRotate);
    }
  };

  const _handleTouchEnd = (e) => {
    const newX = e.changedTouches[0].clientX;
    const newY = e.changedTouches[0].clientY;
    const diffX = oldX - newX;
    const diffY = oldY - newY;

    const el = document.querySelector(".circle_btn_active");
    if (el) {
      let oldRotate = el.style.transform
        .split("deg)")[0]
        .substr(el.style.transform.split("deg)")[0].indexOf("rotate") + 7);
      if (oldRotate.length > 0) {
        oldRotate = parseInt(oldRotate);
        const stepRotate = Math.round(oldRotate / 45);
        el.style.transitionDuration = "300ms";
        el.style.transform = `translateX(-50%) rotate(${stepRotate * 45}deg)`;
        setCurrentIdx(-stepRotate);
      }
    }
    const elBtn = document.querySelector(".circle_btn_active > img");
    if (elBtn) {
      let oldBtnRotate = elBtn.style.transform
        .split("deg)")[0]
        .substr(elBtn.style.transform.split("deg)")[0].indexOf("rotate") + 7);
      if (oldBtnRotate.length > 0) {
        oldBtnRotate = parseInt(oldBtnRotate);
        const stepRotate = Math.round(oldBtnRotate / 45);
        elBtn.style.transform = `translate(-50%, -50%) rotate(${
          stepRotate * 45
        }deg)`;
      }
    }
    // if (diffX > 30) {
    //   // swipe to right
    //   setTimeout(
    //     () =>
    //       setCurrentIdx(
    //         // prevState === circleItems.length - 1 ? prevState : prevState + 1
    //         (prevState) =>
    //           prevState % 8 === circleItems.length - 1
    //             ? prevState + (9 - circleItems.length)
    //             : prevState + Math.ceil(diffX / 100)
    //       ),
    //     200
    //   );
    // } else if (diffX < -30) {
    //   // swipe to left
    //   setTimeout(
    //     () =>
    //       setCurrentIdx(
    //         // (prevState) => (prevState === 0 ? prevState : prevState - 1)
    //         (prevState) => {
    //           if (prevState % 8 === 0) {
    //             if (prevState - (9 - circleItems.length) < 0) {
    //               return 0;
    //             } else {
    //               return prevState - (9 - circleItems.length);
    //             }
    //           } else {
    //             if (prevState + Math.floor(diffX / 100) < 0) {
    //               return 0;
    //             } else {
    //               return prevState + Math.floor(diffX / 100);
    //             }
    //           }
    //         }
    //       ),
    //     200
    //   );
    // }
  };
  const _handleTouchMove = (e) => {
    const lastX = e.touches[0].clientX;
    const lastY = e.touches[0].clientY;
    const diff = oldX - lastX;
    // swipe to right
    // if (diff < 0) {
    console.log(oldX, oldY, lastX, lastY, diff);
    const el = document.querySelector(".circle_btn_active");
    const elBtn = document.querySelector(".circle_btn_active > img");
    el.style.transitionDuration = "0ms";
    // 시작점에서 반대쪽으로 스와이핑 안되게
    if (-diff + oldRotate > 0) {
      el.style.transform = `translateX(-50%) rotate(0deg)`;
    } else {
      el.style.transform = `translateX(-50%) rotate(${-diff + oldRotate}deg)`;
    }
    elBtn.style.transitionDuration = "0ms";
    console.log(diff, oldBtnRotate);
    if (diff + oldBtnRotate < 0) {
      elBtn.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    } else {
      elBtn.style.transform = `translate(-50%, -50%) rotate(${
        diff + oldBtnRotate
      }deg)`;
    }
    // } else {

    // }
    // setAddRotate(diffX);
  };
  const _handleMenu = (item) => {
    console.log("_handleMenu item", item);
    if (item.no === 6) {
      window.location.href = item.url;
    } else {
      Router.push(item.url);
    }
  };
  const _handleWheel = (e) => {
    console.log(e.deltaY);
    e.persist();
    if (e.deltaY > 0) {
      setCurrentIdx((prevState) => prevState + 1);
    } else {
      setCurrentIdx((prevState) => (prevState === 0 ? 0 : prevState - 1));
    }
  };
  console.log("currentIdx", currentIdx);
  return (
    <div className="container">
      <span className="arrow_left_btn" onClick={() => _handleArrow("left")}>
        <img src={arrowLeftBtn} alt="arrow_left_btn" />
      </span>
      <span className="arrow_right_btn" onClick={() => _handleArrow("right")}>
        <img src={arrowRightBtn} alt="arrow_right_btn" />
      </span>
      {/* {isViewMenu ? (
        <span className="circle_btn_active">
          <img src={circleBtn} alt="circle_btn" onClick={() => _closeMenu()} />
        </span>
      ) : (
        <span className="circle_btn" onClick={() => _openMenu()}>
          <img src={circleBtn} alt="circle_btn" />
        </span>
      )} */}
      {isViewMenu && <div className="overlay" onClick={() => _closeMenu()} />}
      <span
        className={`no_drag ${isViewMenu ? "circle_btn_active" : "circle_btn"}`}
        onTouchStart={_handleTouchStart}
        onTouchEnd={_handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
        onTouchMove={_handleTouchMove}
        onWheel={_handleWheel}
      >
        {circleItems.map((item, i) => (
          <span
            className="item"
            key={i}
            style={{ zIndex: currentIdx % 8 === i ? 1 : 0 }}
          >
            <span className="circle" onClick={() => _handleMenu(item)}>
              {currentIdx % 8 === i ? (
                <img src={item.active} alt="circle_menu_active" />
              ) : (
                <img
                  src={item.default}
                  alt="circle_menu_default"
                  style={{ opacity: 0.4 }}
                />
              )}
            </span>
            {/* <span className={currentIdx % 8 === i ? "circle_active" : "circle"}>
              {e.no}
            </span> */}
          </span>
        ))}
        {/* <span className="item">
          <span className="circle">1</span>
        </span>
        <span className="item">
          <span className="circle">2</span>
        </span>
        <span className="item">
          <span className="circle">3</span>
        </span>
        <span className="item">
          <span className="circle">4</span>
        </span>
        <span className="item">
          <span className="circle">5</span>
        </span>
        <span className="item">
          <span className="circle">6</span>
        </span>
        <span className="item">
          <span className="circle">7</span>
        </span>
        <span className="item">
          <span className="circle">8</span>
        </span> */}
        <img
          src={circleBtn}
          alt="circle_btn"
          onClick={() => (isViewMenu ? _closeMenu() : _openMenu())}
        />
      </span>
      <span className="reload_btn" onClick={() => _handleReload()}>
        <img src={reloadBtn} alt="reload_btn" width="25px" height="21px" />
      </span>
      <span className="upload_btn" onClick={() => Router.push("/upload")}>
        <img src={uploadBtn} alt="reload_btn" width="25px" height="21px" />
      </span>
      {/* <AiOutlinePlusCircle
        className="upload_btn"
        onClick={() => Router.push("/upload")}
      /> */}
      {/* <span className="upload_btn" onClick={() => Router.push("/upload")}>
        <img src={uploadBtn} alt="upload_btn" />
      </span> */}
      <style jsx>{`
        .container {
          min-width: 320px;
          position: fixed;
          width: 100%;
          height: 51px;
          left: 0;
          bottom: 0;
          background-color: #fff;
          z-index: 1000;
        }
        .container > .overlay {
          position: absolute;
          width: 100%;
          height: 100vh;
          left: 0;
          bottom: 0;
        }
        .arrow_left_btn,
        .arrow_right_btn,
        .reload_btn,
        :global(.upload_btn) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding: 10px;
        }
        .arrow_left_btn > img,
        .arrow_right_btn > img {
          width: 10px;
          height: 17px;
        }
        .arrow_left_btn {
          left: 6vw;
        }
        .arrow_right_btn {
          left: 22vw;
        }
        .circle_btn,
        .circle_btn_active {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) rotate(${currentIdx * -45}deg);
          border-radius: 50%;
          box-shadow: -3px -3px 6px 6px #d443f811, 3px -3px 6px 6px #9279e311,
            -3px 3px 6px 6px #9279e311, 3px 3px 6px 6px #43b8ca11;
          transition: 0.3s ease-in-out;
          z-index: 1;
        }
        .circle_btn {
          width: 57px;
          height: 57px;
          bottom: 9px;
          background-color: #fff;
        }
        .circle_btn_active {
          width: calc(100vw - 60px);
          height: calc(100vw - 60px);
          bottom: calc((100vw - 60px) / -2 + 50px);
          background-color: rgba(20, 30, 60, 0.6);
        }
        .circle_btn > img,
        .circle_btn_active > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(${currentIdx * 45}deg);
          width: 42px;
          height: 42px;
          z-index: 1;
        }
        .circle_btn .item {
          display: none;
        }
        .circle_btn_active .item {
          position: absolute;
          width: 18vw;
          height: 100%;
          top: 0;
          left: calc(41vw - 30px);
          border-radius: 30px;
        }
        .circle_btn_active .item img {
          width: 100%;
          height: 100%;
        }
        .circle_btn_active .item > .circle,
        .circle_btn_active .item > .circle_active {
          position: absolute;
          width: 18vw;
          height: 18vw;
          line-height: 18vw;
          text-align: center;
          color: #aaa;
          border-radius: 50%;
          top: 10px;
          left: 0;
          transition: 0.3s ease-in-out;
        }
        .circle_active {
          background-color: transparent;
          box-shadow: 1.6px 1.6px #d53cf5, 1.6px -1.6px #d53cf5,
            -1.6px 1.6px #00f1b4, -1.6px -1.6px #00f1b4;
        }
        .circle_btn_active .item:nth-child(1) {
          transform: rotate(0deg);
        }
        .circle_btn_active .item:nth-child(1) > span {
          transform: rotate(${currentIdx * 45 - 0}deg);
        }
        .circle_btn_active .item:nth-child(2) {
          transform: rotate(45deg);
        }
        .circle_btn_active .item:nth-child(2) > span {
          transform: rotate(${currentIdx * 45 - 45}deg);
        }
        .circle_btn_active .item:nth-child(3) {
          transform: rotate(90deg);
        }
        .circle_btn_active .item:nth-child(3) > span {
          transform: rotate(${currentIdx * 45 - 90}deg);
        }
        .circle_btn_active .item:nth-child(4) {
          transform: rotate(135deg);
        }
        .circle_btn_active .item:nth-child(4) > span {
          transform: rotate(${currentIdx * 45 - 135}deg);
        }
        .circle_btn_active .item:nth-child(5) {
          transform: rotate(180deg);
        }
        .circle_btn_active .item:nth-child(5) > span {
          transform: rotate(${currentIdx * 45 - 180}deg);
        }
        .circle_btn_active .item:nth-child(6) {
          transform: rotate(225deg);
        }
        .circle_btn_active .item:nth-child(6) > span {
          transform: rotate(${currentIdx * 45 - 225}deg);
        }
        .circle_btn_active .item:nth-child(7) {
          transform: rotate(270deg);
        }
        .circle_btn_active .item:nth-child(7) > span {
          transform: rotate(${currentIdx * 45 - 270}deg);
        }
        .circle_btn_active .item:nth-child(8) {
          transform: rotate(315deg);
        }
        .circle_btn_active .item:nth-child(8) > span {
          transform: rotate(${currentIdx * 45 - 315}deg);
        }
        .reload_btn {
          right: 22vw;
          width: 25px;
          height: 22px;
        }
        :global(.upload_btn) {
          right: 6vw;
          width: 23px;
          height: 22px;
          color: #979cca;
        }
        @media (min-width: 580px) {
          .circle_btn_active {
            width: 520px;
            height: 520px;
            bottom: -210px;
          }
          .circle_btn_active .item {
            width: 104px;
            left: 208px;
          }
          .circle_btn_active .item > .circle,
          .circle_btn_active .item > .circle_active {
            width: 104px;
            height: 104px;
            line-height: 104px;
          }
        }
      `}</style>
    </div>
  );
};

export default Nav;
