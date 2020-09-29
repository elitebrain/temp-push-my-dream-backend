import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Link from "next/link";

import loginPng from "public/assets/image/login_text.png";
import logoutPng from "public/assets/image/logout_text.png";
import emergenzaLogo from "public/assets/image/emergenza_logo(black).png";
import logoPushmyappleGradation from "public/assets/image/logo_pushmyapple_gradation.png";
import logoPushmydreamGradation from "public/assets/image/logo_pushmydream_gradation.png";
import logoMain from "public/assets/image/logo_pushmydream_white.png";
import logoMainB from "public/assets/image/logo_pushmydream_black.png";
import circleBtn from "public/assets/image/main_logo.png";

import { LOG_OUT_REQUEST } from "store/reducers/user";
import { MORE_VIDEO } from "store/reducers/offset";
import {
  COUNTERANIMATE_DEFAULT_TIME,
  COUNTERANIMATE_BETWEEN,
} from "shared/constants/variables";
import CounterAnimate from "components/Common/CounterAnimate";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Terms from "pages/terms";
import { INIT_VIDEO_REDUX } from "store/reducers/video";
import { useRouter } from "next/router";
import { COLOR_696C8C } from "shared/constants/colors";
import Footer from "./Footer";

const Header = (props) => {
  const {
    transparent,
    whiteText = false,
    emergenza,
    style,
    defaultBgColor,
  } = props;
  const Router = useRouter();
  const [isScroll, setIsScroll] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [gubunProps, setGubunProps] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { totalPushCount, termsList } = useSelector((state) => state.common);

  const dispatch = useDispatch();

  const _termsModalOpen = (gubun) => {
    // window.onpopstate = () => _termsModalClose();
    switch (gubun) {
      case "이용 약관":
        return "/terms?gubun=service";

      case "개인정보 처리 방침":
        return "/terms?gubun=privacy";

      case "에머겐자 이용 약관":
        return "/terms?gubun=emergenza";

      case "청소년 보호 정책":
        return "/terms?gubun=youth";
      default:
        return "/terms?gubun=service";
    }
  };
  // const _termsModalClose = () => {
  //   setGubunProps(null);
  //   window.onpopstate = null;
  // };
  // useEffect(() => {
  //   setLogo(logoMain);
  // }, []);

  // 로그아웃
  const logoutUser = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);

  const onRouteHome = useCallback(() => {
    // home 이외의 페이지에서만 동작
    if (Router.pathname !== "/") {
      dispatch({
        type: INIT_VIDEO_REDUX,
      });

      Router.push("/");
    }
  }, [Router, dispatch]);

  const _handleMenu = () => {
    setIsOpenMenu((prev) => {
      if (!prev) {
        document.querySelector(".header .menuList").classList.add("active");
        document.querySelector("body").style.overflow = "hidden";
      } else {
        document.querySelector(".header .menuList").classList.remove("active");
        document.querySelector("body").style.overflow = "auto";
      }
      return !prev;
    });
  };
  useEffect(() => {
    return () => (document.querySelector("body").style.overflow = "auto");
  }, []);

  return (
    <div
      className={`header${
        transparent || (whiteText && defaultBgColor !== "#fff")
          ? " fc_white"
          : ""
      }${transparent ? " transparent" : ""} ${
        !transparent ? ` defaultBgColor` : ""
      }${isScroll ? " scroll" : ""}`}
      style={style}
    >
      <span className="logo" onClick={onRouteHome}>
        <img
          width="100%"
          height="100%"
          src={circleBtn}
          alt="circle_btn"
          // src={logoMainB}
          // alt="logo_main"
        />
      </span>

      <div>
        <CounterAnimate
          pushCount={totalPushCount}
          defaultTime={COUNTERANIMATE_DEFAULT_TIME}
          between={COUNTERANIMATE_BETWEEN}
          slotLength={8}
          isHeader
          counterColor="#000"
          whiteText={false}
        />
      </div>
      <span className="nav" onClick={() => _handleMenu()}>
        {!isOpenMenu ? (
          <AiOutlineMenu className="menu" />
        ) : (
          <AiOutlineClose className="menu" />
        )}
      </span>
      <div className="menuList" onClick={(e) => _handleMenu(e)}>
        <div className="userMenu" onClick={(e) => e.stopPropagation()}>
          {/* <Link href="/check-agent">
            <div className="hidden_btn" />
          </Link> */}
          <div className="top_btns">
            {!isLoggedIn ? (
              <button onClick={() => Router.push("/login")}>
                <img src={loginPng} alt="login" />
              </button>
            ) : (
              <button onClick={logoutUser}>
                <img src={logoutPng} alt="logout" />
              </button>
            )}
          </div>
          <div className="category_btns">
            <button
              onClick={() => {
                window.location.href = "https://emergenza.khanteum.com";
              }}
            >
              <img src={emergenzaLogo} alt="emergenza_logo" />
            </button>
            {/* <button>
              <span>
                <img src={logoPushmyappleGradation} alt="pushmyapple_logo" />
              </span>
            </button> */}
            <button onClick={() => Router.push("/category/4")}>
              <span>
                <img src={logoPushmydreamGradation} alt="pushmydream_logo" />
              </span>
            </button>
          </div>
          <div className="hr" />
          <div className="section_btns">
            <button onClick={() => Router.push("/mypage")}>나의 프로필</button>
            <button onClick={() => Router.push("/mypage/wallet")}>
              내 지갑
            </button>
          </div>
          <div className="hr" />
          <div className="section_btns">
            <button onClick={() => Router.push("/notice")}>공지 사항</button>
            <button onClick={() => Router.push("/event")}>이벤트</button>
            <button onClick={() => Router.push("/season")}>대회 정보</button>
            <button
              onClick={() =>
                (window.location.href = "https://emergenza.khanteum.com/vote")
              }
            >
              투표
            </button>
          </div>
          <div className="terms_group">
            {termsList &&
              termsList.map((terms, i) => (
                <Link href={_termsModalOpen(terms.terms_gubun)} key={i}>
                  <a className="terms_Link">
                    <div key={terms.terms_no} className="terms">
                      <span>{terms.terms_gubun}</span>
                    </div>
                  </a>
                </Link>
              ))}
          </div>
          <Footer style={{ marginLeft: "-20px", width: "calc(100% + 40px)" }} />
        </div>
      </div>
      <style jsx>{`
        .hidden_btn {
          position: absolute;
          top: 36px;
          left: 0;
          width: 40px;
          height: 40px;
        }
        .top_btns {
          height: 40px;
          margin-top: 36px;
          margin-bottom: 35px;
          text-align: right;
        }
        .top_btns > button {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          text-align: right;
          width: 110px;
          text-align: center;
          border-radius: 10px;
          border: none;
          color: #fff;
          background-color: transparent;
          font-weight: 700;
          font-size: 16px;
        }
        .top_btns > button > img {
          height: 18px;
        }
        .userMenu > .category_btns {
          border: none;
        }
        .userMenu > .category_btns > button:first-child {
          background: linear-gradient(91.33deg, #00f1b4 0.48%, #d53cf5 99.45%);
        }
        .userMenu > .category_btns > button {
          position: relative;
          vertical-align: middle;
          background: linear-gradient(91.66deg, #00f1b4 0.48%, #d53cf5 99.45%);
          border: none;
        }
        .userMenu > .category_btns > button > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 30px;
        }
        .userMenu > .category_btns > button > span {
          position: absolute;
          left: 1px;
          top: 1px;
          background-color: #000;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          border-radius: 10px;
        }
        .userMenu > .category_btns > button > span > img {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 70px;
          height: 30px;
          transform: translate(-50%, -50%);
        }
        .category_btns,
        .section_btns {
          margin-top: 15px;
          height: 50px;
          line-height: 50px;
          width: 100%;
          position: relative;
          margin-bottom: 15px;
        }
        .category_btns > button {
          border: none;
        }
        .category_btns > button,
        .section_btns > button {
          width: calc((100% - 20px) / 3);
          height: 50px;
          border-radius: 10px;
          border: 1px solid #fff;
          display: inline-block;
          box-sizing: border-box;
          margin-right: 10px;
          text-align: center;
          background-color: #000;
          color: #fff;
          max-width: 110px;
          margin-bottom: 10px;
        }
        .section_btns > button:last-child {
          margin-right: 0;
        }
        .hr {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(151, 156, 202, 0.3) 0%,
            rgba(151, 156, 202, 1) 50%,
            rgba(151, 156, 202, 0.3) 100%
          );
        }

        .temp {
          position: absolute;
          width: 60px;
          height: 60px;
          right: 0;
          bottom: 0;
        }
        .temp > a {
          width: 100%;
          height: 100%;
        }
        .temp > a > span {
          display: block;
          width: 60px;
          height: 60px;
        }
        .terms_group {
          text-align: left;
          font-size: 13px;
          margin-top: 100px;
          margin-bottom: 30px;
          font-weight: 700;
          color: #696c8c;
        }

        .terms_Link {
          display: block;
          text-decoration: none;
          color: ${COLOR_696C8C};
        }
        .terms {
          margin-bottom: 10px;
          display: inline-block;
        }
        .header {
          width: 100%;
          min-width: 320px;
          height: 50px;
          position: fixed;
          z-index: 1000;
          transition: 0.3s ease-in-out;
          background-color: #fff;
          box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.05);
        }
        .header.transparent {
          background-color: transparent;
          transition: 0.3s ease-in-out;
        }
        .header.defaultBgColor {
          background-color: ${defaultBgColor ? defaultBgColor : "#fff"};
        }
        .header.blackBg {
          background-color: #141418;
        }
        .header.scroll {
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
        }
        .logo {
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
          height: 30px;
        }

        .logo:hover {
          cursor: pointer;
        }
        .push {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .push span {
          display: inline-block;
          color: #fff;
          font-size: 12px;
        }
        .push > span:first-child {
          font-size: 30px;
          font-weight: 700;
          color: #000;
          margin-right: 5px;
        }
        .header.fc_white .push > span:first-child {
          color: #fff;
        }
        .push > span:last-child {
          font-size: 14px;
          font-weight: 700;
          color: #f38400;
          vertical-align: baseline;
          margin-left: 5px;
        }
        .header .push img {
          width: 25px;
          height: 7px;
          display: inline-block;
          vertical-align: baseline;
        }
        .header.fc_white .push > span:last-child {
          color: #fff;
        }
        .nav {
          width: 20px;
          height: 20px;

          display: block;
          font-size: 20px;
          cursor: pointer;
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          color: #000;
        }
        .nav :global(.menu) {
          color: #b3b3b3;
        }

        .header .menuList {
          position: absolute;
          left: 0;
          top: -200vh;
          width: 100vw;
          height: 100vh;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          box-sizing: border-box;
          animation: 0.5s menuAnimate ease-in-out;
          transition: 0.5s ease-in-out;
        }
        .link,
        .dot {
          vertical-align: middle;
        }
        .link img {
          display: inline-block;
          vertical-align: middle;
        }
        .link span {
          display: inline-block;
          vertical-align: middle;
        }

        .header .menuList .link {
          box-sizing: border-box;
          width: 100%;
          color: #fff;
          margin: 12px 0;
        }
        .header .menuList .link li {
          box-sizing: border-box;
          padding: 15px 0;
          font-size: 35px;
          line-height: 25px;
          text-align: center;
          font-weight: 700;
          cursor: pointer;
        }

        .header .menuList .menu {
          margin-bottom: 20px;
        }

        .header .menuList .userMenu {
          top: 50px;
          width: 100%;
          height: calc(100vh - 101px);
          overflow: auto;
          color: #fff;
          font-size: 16px;
          position: absolute; /* 메뉴항목 추가시 삭제 */
          background-color: #000;
          padding: 0px 20px;
          box-sizing: border-box;
          box-shadow: 0px 5px 5px #000;
        }

        .header .menuList.active {
          top: 0;
        }

        .header .menuList .userMenu .link {
          cursor: pointer;
          height: 20px;
          font-size: 20px;
          font-weight: 500;
        }

        .header .menuList .userMenu .dot {
          margin: 0px 10px;
        }

        .header .menuList .userMenu .link img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }

        .header .menuList .withdrawl {
          float: right;
        }

        @media (max-width: 425px) {
          .push > span:first-child {
            font-size: 14px;
            font-weight: 700;
            color: #000;
          }
        }
      `}</style>
    </div>
  );
};

Header.propTypes = {
  transparent: PropTypes.bool,
  whiteText: PropTypes.bool,
  defaultBgColor: PropTypes.string,
};

export default Header;
