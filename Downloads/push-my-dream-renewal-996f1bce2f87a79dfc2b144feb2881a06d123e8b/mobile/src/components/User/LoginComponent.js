import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { LoginContext } from "containers/User/LoginContainer";

import Layout from "components/Layout/Layout";
import LoginButton from "components/Common/LoginButton";
import Content from "components/Layout/Content";
import Body from "components/Layout/Body";
import InfiniteLogo from "components/Common/InfiniteLogo";

import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";
import login_id_ico from "public/assets/icon/login_id_ico(purple).svg";
import login_pw_ico from "public/assets/icon/login_pw_ico(purple).svg";
import logo from "public/assets/image/main_logo.png";
import NewButton from "components/Common/NewButton";
import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

const LoginComponent = ({ onLogin }) => {
  const [activeBtnBG, setActiveBtnBG] = useState(
    "linear-gradient(90deg, #ffffff 0%, #c0c5df 100%)"
  );
  const [activefontColor, setActiveFontColor] = useState("#3b3d55");
  const _handleTouchStart = () => {
    setActiveFontColor("#3b3d55");
    //   setTimeout(() => {
    //     setActiveBtnBG(`linear-gradient(
    //   180deg,
    //   #ffffff 0%,
    //   rgba(255, 255, 255, 0) 100%
    // ),
    // linear-gradient(180deg, #ffffff 0%, #c0c5df 100%)
    // `);
    //   }, 200);
    setActiveBtnBG("linear-gradient(90deg, #ffffff 0%, #c0c5df 100%)");
  };

  const { email, password, onChangeEmail, onChangePassword } = useContext(
    LoginContext
  );
  const [isIosApp, setIsIosApp] = useState(false);
  useEffect(() => {
    // check ios device for inspection
    // const agent = navigator.userAgent.toLowerCase();
    // console.log(
    //   /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    // );
    // if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    //   setIsIosApp(true);
    // }
  }, []);
  const _handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      onLogin({ email, password, loginType: "local" });
    }
  };

  // useEffect(() => {
  //   AppleID.auth.init({
  //     clientId: "com.khanteum.apple.test",
  //     scope: "name email",
  //     redirectURI:
  //       "https://test.khanteum.com:4000/api/v2/user/mobile/login?type=apple",
  //     state: "e3l9i8t5e3",
  //   });
  // }, []);

  return (
    <>
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="login">
          <div className="title">
            <img src={logo} alt="logo" width="55px" height="55px" />
          </div>
          <div className="login_btn">
            <span>
              <img src={login_id_ico} alt="id_ico" width="20px" height="20px" />
            </span>
            <input
              type="email"
              maxLength="30"
              value={email}
              placeholder="이메일을 입력해주세요."
              onChange={onChangeEmail}
            />
          </div>
          <div className="login_btn">
            <span>
              <img src={login_pw_ico} alt="pw_ico" width="20px" height="20px" />
            </span>
            <input
              type="password"
              maxLength="20"
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={onChangePassword}
              onKeyUp={_handleKeyUp}
            />
          </div>
          <div className="find_info">
            {/* <div className="left">
              <label>
                <input type="checkbox" />
                아이디 저장
              </label>
            </div> */}
            <div className="right">
              <Link href="find-id">
                <a>아이디 찾기</a>
              </Link>
              <Link href="find-password">
                <a>비밀번호 찾기</a>
              </Link>
            </div>
          </div>
          <div className="login_btn local_login">
            <LoginButton
              email={email}
              password={password}
              type="button"
              loginType="local"
              onClick={onLogin}
              width="100%"
              height="35px"
              style={{ width: "calc(100% - 6px)", borderRadius: "5px" }}
            />
          </div>
          <div className="login_btn local_signup">
            <Link href="signup/terms">
              <a>
                <NewButton
                  width="100%"
                  height="35px"
                  bgColor={BACKGROUND_BLACK_COLOR}
                  gradient
                  activeAnimation
                >
                  회원가입
                </NewButton>
              </a>
            </Link>
          </div>
          {!isIosApp && (
            <div className="sns_login">
              <div className="login_title">간편 로그인</div>
              <div className="btn_box">
                <div className="sns_btn ">
                  <LoginButton
                    type="button"
                    loginType="kakao"
                    onClick={onLogin}
                  />
                </div>

                <div className="sns_btn">
                  <LoginButton
                    type="button"
                    loginType="naver"
                    onClick={onLogin}
                  />
                </div>

                <div className="sns_btn">
                  <LoginButton
                    type="button"
                    loginType="apple"
                    onClick={onLogin}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* .local_login:active,
        .local_signup:active,
        .local_signup .sign_up:active,
        .ico:active {
          background: ${activeBtnBG};
        } */}
      <style jsx>{`
        .signin-button > div > div > svg {
          height: 50px;
          width: 100%;
        }
        .local_signup a {
          width: 100%;
        }

        /* .local:hover {
          background: linear-gradient(90deg, #ffffff 0%, #c0c5df 100%);
        } */
        .local_signup .sign_up {
          width: calc(100% - 6px);
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
          background-color: ${BACKGROUND_BLACK_COLOR};
          font-size: 16px;
          position: relative;
          font-family: "Spoqa Han Sans", sans-serif;
          cursor: pointer;
          border: none;
          display: block;
        }
        /* .local .sign_up:hover {
          background: linear-gradient(90deg, #ffffff 0%, #c0c5df 100%);
        } */
        .local_signup .sign_up a {
          text-decoration: none;
          text-align: center;
          display: block;
          color: #fff;
        }

        .local_signup:active .sign_up a {
          color: ${activefontColor};
        }
        /* .local_signup .sign_up:hover a {
          color: #3b3d55;
        } */
        .sns_login {
          margin: 55px 0;
        }
        .sns_login .login_title {
          margin-bottom: 15px;
          text-align: center;
          font-size: 16px;
          color: #fff;
        }
        .container {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
        }
        .container .login {
          max-width: 1200px;
          min-height: calc(100% - 337px);
          position: relative;
          background-color: ${BACKGROUND_BLACK_COLOR};
          padding: 55px 20px 30px;
          margin: 0 auto;
        }
        .container .title {
          text-align: center;
          color: #fff;
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 60px;
        }
        .login_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 20px auto;
        }

        .login_btn:last-of-type {
          margin-bottom: 0px;
        }
        .login_btn > span {
          width: 40px;
          height: 40px;
          line-height: 50px;
          background-color: #fff;
          text-align: center;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          display: inline-block;
          vertical-align: middle;
          border: 1px solid #979cca;
        }
        .login_btn > input {
          width: calc(100% - 40px);
          height: 40px;
          border: 1px solid #979cca;
          padding: 0 10px;
          display: inline-block;
          vertical-align: middle;
          -webkit-appearance: none; /* 아이폰 기본 그림자 제거(input) */
          -webkit-border-radius: 0; /* 아이폰 기본 둥근 테두리 제거(input) */
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .login_btn > input::placeholder {
          color: #979cca;
          opacity: 1; /* Firefox */
        }

        .login_btn > input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #979cca;
        }

        .login_btn > input::-ms-input-placeholder {
          /* Microsoft Edge */
          color: #979cca;
        }
        .find_info {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 30px;
          font-size: 15px;
          overflow: hidden;
        }
        .find_info .left {
          float: left;
          font-size: 13px;
        }
        .find_info .right {
          float: right;
          font-size: 13px;
        }
        .find_info input {
          margin-right: 5px;
        }
        .find_info > div {
          display: inline-block;
          vertical-align: middle;
          color: #999999;
        }
        .find_info > div > a {
          display: inline-block;
          vertical-align: middle;
          text-decoration: none;
          color: #999999;
        }
        .find_info > div > a {
          position: relative;
          margin-right: 20px;
        }
        .find_info > div > a:first-child:before {
          content: "";
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 15px;
          background-color: #fff;
        }
        .find_info > div > a:last-of-type {
          position: initial;
          margin-right: initial;
        }
        .find_info > div > a:last-of-type:before {
          content: "";
        }

        .ico {
          margin-right: 10px;
        }
        /* .sns_login .ico:hover {
          background: linear-gradient(90deg, #ffffff 0.59%, #c0c5df 100.59%);
        } */
        .ico:last-child {
          margin-right: 0px;
        }
        .btn_box {
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn_box .sns_btn {
          margin-right: 10px;
        }
        .btn_box .sns_btn:last-of-type {
          margin-right: 0px;
        }
      `}</style>
    </>
  );
};

LoginComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginComponent;
