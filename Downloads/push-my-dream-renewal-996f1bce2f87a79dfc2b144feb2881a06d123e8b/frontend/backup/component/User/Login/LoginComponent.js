import React, { useContext } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { LoginContext } from "containers/User/LoginContainer";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import InfiniteLogo from "components/Common/InfiniteLogo";
import LoginButton from "components/Common/LoginButton";
import Body from "components/Layout/Body";
import Input from "components/Common/Input";

import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";

const Login = ({ onLogin }) => {
  const { email, password, onChangeEmail, onChangePassword } = useContext(
    LoginContext
  );

  return (
    <Layout>
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="login">
          <Content
            style={{
              position: "relative",
              height: "100%",
              paddingTop: "150px",
            }}
          >
            <div className="nav">
              <span>HOME</span>
              <img
                src={arrow_right_ico}
                alt="right_arrow"
                width="8px"
                height="13px"
              />
              <span className="position">LOGIN</span>
            </div>
            <div className="title">로그인</div>
            <InfiniteLogo
              style={{
                width: "528px",
                height: "265px",
                bottom: "90px",
                zIndex: -1,
                right: "-82px",
              }}
              width="528"
              height="265"
            />
          </Content>
        </div>
        <Body>
          <div className="wrapper">
            <Content
              style={{
                position: "relative",
                paddingTop: "75px",
                paddingBottom: "160px",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="subtitle">칸컴스 로그인</div>
                <div className="inputContainer">
                  <label htmlFor="email">이메일</label>
                  <Input
                    id="email"
                    type="email"
                    width="450px"
                    height="60px"
                    maxLength="30"
                    value={email}
                    placeholder="이메일을 입력해주세요."
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="inputContainer">
                  <label htmlFor="password">비밀번호</label>
                  <Input
                    id="password"
                    type="password"
                    width="450px"
                    height="60px"
                    maxLength="20"
                    value={password}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={onChangePassword}
                  />
                </div>
                <div className="login_btn">
                  <LoginButton
                    email={email}
                    password={password}
                    type="submit"
                    width="450px"
                    height="60px"
                    loginType="local"
                    onClick={onLogin}
                  />
                </div>
              </form>
              <hr />
              <div className="subtitle">SNS 로그인</div>
              {/* <div className="login_btn">
              <LoginButton
                type="button"
                width="450px"
                loginType="google"
                onClick={onLogin}
              />
            </div> */}
              <div className="login_btn">
                <LoginButton
                  type="button"
                  width="450px"
                  loginType="kakao"
                  onClick={onLogin}
                />
              </div>
              <div className="login_btn">
                <LoginButton
                  type="button"
                  width="450px"
                  loginType="naver"
                  onClick={onLogin}
                  test="55"
                />
              </div>
              <div className="sub_btn">
                <Link href="find-id">
                  <span className="link">아이디 찾기</span>
                </Link>
                <span className="dot">ㆍ</span>
                <Link href="find-password">
                  <span className="link">비밀번호 찾기</span>
                </Link>
                <span className="dot">ㆍ</span>
                <Link href="sign-up">
                  <span className="link">회원가입</span>
                </Link>
              </div>
            </Content>
          </div>
        </Body>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          min-width: 1400px;
          /* background-color: #1e1e25; */
          /* overflow: hidden; */
          margin: 0 auto;
          position: relative;
        }
        .container .login {
          height: 320px;
          position: relative;
          z-index: 0;
          background-color: #141418;
        }
        .container .login .content_box {
          width: 450px;
          position: absolute;
          top: 50%;
        }
        .container .login .nav {
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          text-align: right;
        }
        .container .login .nav span {
          display: inline-block;
        }
        .container .login .nav img {
          display: inline-block;
          margin: 0 20px;
        }
        .container .login .nav .position {
          font-weight: 300;
        }
        .container .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
          margin-bottom: 83px;
        }
        .wrapper {
          position: relative;
          background-color: rgb(30, 30, 37);
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

        .inputContainer {
          width: 450px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 60px;
          margin-bottom: 20px;
        }

        .inputContainer label {
          color: #fff;
          flex-basis: 130px;
          margin-right: 10px;
        }

        .sub_btn {
          font-size: 15px;
          font-weight: 400;
          color: #fff;
          text-align: center;
          margin-top: 60px;
        }

        hr {
          width: 450px;
          background-color: #444455;
          border: none;
          height: 1px;
          margin: 50px auto;
        }

        .sub_btn {
          cursor: pointer;
        }
        .sub_btn .dot {
          margin: 0 20px;
        }

        .subtitle {
          text-align: center;
          font-size: 36px;
          margin-bottom: 60px;
          color: #fff;
        }
      `}</style>
    </Layout>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
