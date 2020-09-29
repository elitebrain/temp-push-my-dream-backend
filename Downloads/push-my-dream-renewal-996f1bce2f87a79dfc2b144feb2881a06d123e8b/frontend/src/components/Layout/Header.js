import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import Bell from "public/assets/icon/bell_ico(white).svg";
import BellB from "public/assets/icon/bell_ico(black).svg";

import logoMain from "public/assets/icon/logo.svg";
import loginMain from "public/assets/icon/login.svg";
import loginMainB from "public/assets/icon/login_b.svg";
import logoMainB from "public/assets/icon/logo(black).svg";

import Menu from "public/assets/icon/menu_m_ico(white).svg";
import MenuB from "public/assets/icon/menu_m_ico(black).svg";

import logoApple from "public/assets/icon/logo_apple_w.svg";
import logoAppleBlack from "public/assets/icon/logo_apple_b.svg";

import logoEmergenza from "public/assets/image/emergenza_badge.png";
import logoEmergenzaBlack from "public/assets/image/emergenza_img.png";

import { LOG_OUT_REQUEST } from "store/reducers/user";
import { MORE_VIDEO } from "store/reducers/offset";
import {
  COUNTERANIMATE_DEFAULT_TIME,
  COUNTERANIMATE_BETWEEN,
} from "shared/constants/variables";

import { BLACK_COLOR } from "shared/constants/colors";

import CounterAnimate from "components/Common/CounterAnimate";
import Search from "components/Common/Search";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Terms from "pages/terms";

const Header = (props) => {
  const Router = useRouter();
  const { className, transparent, style, headerNone } = props;
  const whiteText = false;
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [gubunProps, setGubunProps] = useState(null);
  const _termsModalOpen = (gubun) => {
    document.querySelector("body").style.overflow = "hidden";
    switch (gubun) {
      case "이용 약관":
        return setGubunProps("service");
      case "개인정보 처리 방침":
        return setGubunProps("privacy");
      case "에머겐자 이용 약관":
        return setGubunProps("emergenza");
      case "청소년 보호 정책":
        return setGubunProps("youth");
      default:
        return setGubunProps("service");
    }
  };
  const _termsModalClose = () => {
    setGubunProps(null);
    document.querySelector("body").style.overflow = "auto";
  };
  const { totalPushCount, isAdmin, isViewHeader, termsList } = useSelector(
    (state) => state.common
  );
  const dispatch = useDispatch();

  // 로그아웃
  const logoutUser = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);

  const _handleHome = (url) => {
    console.log("url", url);
    dispatch({
      type: MORE_VIDEO,
      data: {
        scrollTop: 0,
      },
    });
    Router.push(url);
  };
  const _handleMenu = () => {
    setIsOpenMenu((prev) => {
      if (!prev) {
        document
          .querySelector(".header .menuList .userMenu")
          .classList.add("active");
      } else {
        document
          .querySelector(".header .menuList .userMenu")
          .classList.remove("active");
        // document.querySelector("body").style.overflow = "auto";
      }
      return !prev;
    });
  };

  const headerClass = `header${whiteText ? " fc_white" : ""}${
    transparent ? " transparent" : ""
  }${headerNone ? " header_none" : ""}${className ? ` ${className}` : ""}`;
  console.log("termsList", termsList);
  return (
    <div className={headerClass} style={style}>
      <div className="logo">
        <img
          src={whiteText ? logoMain : logoMainB}
          alt="logo_main"
          onClick={() => _handleHome("/")}
        />
        {/* {!Router.pathname.includes("apple") && (
          <img
            src={whiteText ? logoApple : logoAppleBlack}
            alt="logo_apple"
            onClick={() => _handleHome("/apple")}
          />
        )}
        {!Router.pathname.includes("emergenza") && (
          <img
            src={whiteText ? logoEmergenza : logoEmergenzaBlack}
            alt="logo_emergenza"
            onClick={() => _handleHome("/emergenza")}
          />
        )} */}
      </div>
      <div>
        <CounterAnimate
          whiteText={whiteText}
          pushCount={totalPushCount}
          defaultTime={COUNTERANIMATE_DEFAULT_TIME}
          between={COUNTERANIMATE_BETWEEN}
          slotLength={8}
          isHeader
        />
      </div>
      <span className="nav">
        <Search long placeholder="검색" style={{ marginRight: "40px" }} />
        <span>
          <img
            src={whiteText ? Bell : BellB}
            alt="bell"
            onClick={() => _handleHome("/")}
          />
        </span>
        {/* <span>
          <img
            src={whiteText ? Menu : MenuB}
            alt="menu"
            onClick={() => _handleHome("/")}
          />
        </span>*/}
      </span>
      <span
        className="nav menu"
        onClick={() => _handleMenu()}
        style={{ right: "10px" }}
      >
        {/* <span>Upload</span>
        <img src={whiteText ? loginMain : loginMainB} alt="login_main" />
        <span>Login</span> */}
        {!isOpenMenu ? (
          <AiOutlineMenu color={whiteText ? "#fff" : "#000"} size="21px" />
        ) : (
          <AiOutlineClose color={whiteText ? "#fff" : "#000"} size="21px" />
        )}
      </span>
      {/* {isOpenMenu && ( */}
      <div className="menuList">
        <div className="userMenu">
          {/* <div className="link">
            <Link href="/apple">
              <span>PUSH MY APPLE</span>
            </Link>
          </div> */}
          <div className="link">
            <Link href="/emergenza">
              <span>EMERGENZA</span>
            </Link>
          </div>
          <div className="link">
            <Link href="/vote">
              <span>VOTE</span>
            </Link>
          </div>
          {isLoggedIn && (
            <>
              <div className="link">
                {/* <img
                      src={Login_ico}
                      alt="login_ico"
                      className="login_ico"
                      width="100%"
                      height="100%"
                    /> */}
                <Link href="/mypage">
                  <span>MYPAGE</span>
                </Link>
              </div>
              {/* <span className="dot">·</span> */}
              <div className="link">
                <span onClick={logoutUser}>LOGOUT</span>
              </div>
            </>
          )}
          {!isLoggedIn && (
            <div className="link">
              {/* <img
                    src={Login_ico}
                    alt="login_ico"
                    className="login_ico"
                    width="100%"
                    height="100%"
                  /> */}
              <Link href="/login">
                <span>LOGIN</span>
              </Link>
            </div>
          )}
          <div className="terms_group">
            {termsList &&
              termsList.map((terms, i) => (
                <div key={terms.terms_no} className="terms">
                  <span onClick={() => _termsModalOpen(terms.terms_gubun)}>
                    {terms.terms_gubun}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <span className="nav">
        {isAdmin && <span>관리자 모드로 접속 중입니다.</span>}
        <Link href="/vote">
          <span>Vote</span>
        </Link>
        <span className="centerClone isLoggedIn">·</span>
        {isLoggedIn ? (
          <>
            <Link href="/mypage">
              <span className="isLoggedIn">
                <img
                  src={whiteText ? loginMain : loginMainB}
                  alt="login_ico"
                  className="login_ico"
                  width="100%"
                  height="100%"
                />
                Mypage
              </span>
            </Link>
            <span className="centerClone isLoggedIn">·</span>
            <p onClick={logoutUser}>Logout</p>
          </>
        ) : (
          <Link href="/login">
            <span>
              <img
                src={whiteText ? loginMain : loginMainB}
                alt="login_ico"
                className="login_ico"
                width="100%"
                height="100%"
              />
              Login
            </span>
          </Link>
        )}
      </span> */}
      {gubunProps && (
        <div className="modal_rectangle">
          <div
            className="modal__overlay"
            onClick={() => _termsModalClose()}
          ></div>
          <div className="modal__content">
            <Terms gubunProps={gubunProps} />
          </div>
        </div>
      )}
      <style jsx>{`
        .header {
          width: 100%;
          /* min-width: 1400px; */
          min-width: 1300px;
          height: 60px;
          position: relative;
          border-bottom: 2px solid rgba(0, 0, 0, 0.05);
          z-index: 1000;
          /* background-color: rgba(0, 0, 0, 0.4); */
          background-color: #fff;
          transition: 1s ease-in-out;
        }
        .header.header_none {
          display: none;
        }
        .header.transparent {
          position: absolute;
          background-color: transparent;
        }
        .header.blackBg {
          background-color: #141418;
        }
        .header.whiteBg {
          background-color: #fff;
        }
        .logo {
          position: absolute;
          left: 50px;
          top: 50%;
          transform: translateY(-50%);
          height: 37px;
        }
        .logo img {
          width: 90px;
          height: 37px;
          display: inline-block;
          margin-right: 40px;
        }
        .logo img:last-child {
          margin-right: initial;
        }
        .logo img:hover {
          cursor: pointer;
        }
        .push {
          display: inline-block;
          position: absolute;
          top: 0;
          left: 50%;
          color: #fff;
          margin-top: 35px;
          width: 500px;
          transform: translate(-50%, 0);
        }
        .push > span:first-child {
          font-size: 30px;
          font-weight: 700;
          color: #000;
        }
        .header.fc_white .push > span:first-child {
          color: #fff;
        }
        .push > span:last-child {
          font-size: 16px;
          font-weight: 700;
          color: #f38400;
          vertical-align: baseline;
          margin-left: 5px;
        }
        .header.fc_white .push > span:last-child {
          color: #fff;
        }
        .nav {
          display: flex;
          align-items: center;
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          color: #000;
        }
        .nav.menu:hover {
          cursor: pointer;
        }
        .header.fc_white .nav {
          color: #fff;
        }
        .nav > p:hover {
          cursor: pointer;
        }
        .nav > span.isLoggedIn {
          margin-right: 20px;
        }
        .nav > span > img {
          width: 20x;
          height: 21px;
          vertical-align: middle;
          margin-right: 9px;
        }
        .nav > span {
          display: inline-block;
          margin-right: 40px;
        }
        .nav > span:hover {
          cursor: pointer;
        }
        .nav > span:first-child {
          font-size: 17px;
          font-weight: 600;
        }
        .nav > span:last-child {
          margin-right: 0;
          font-size: 15px;
          font-weight: 500;
        }
        .emergenza_header {
          color: #fff;
          background-color: rgba(0, 0, 0, 0.1);
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
          top: -100vh;
          width: 100%;
          color: #fff;
          font-size: 15px;
          position: absolute; /* 메뉴항목 추가시 삭제 */
          background-color: #1e1e25;
          padding: 25px 20px;
          box-sizing: border-box;
          box-shadow: 0px 5px 5px #000;
          transition: 0.5s ease-in-out;
        }
        .header .menuList .userMenu.active {
          top: 62px;
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
        .terms > span:hover {
          cursor: pointer;
        }
        @media (max-width: 1366px) {
          .header {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

Header.propTypes = {
  transparent: PropTypes.bool,
  whiteText: PropTypes.bool,
  className: PropTypes.string,
};

export default Header;
