import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import LoginButton from "components/Common/LoginButton";
import Input from "components/Common/Input";

import { OPEN_MODAL } from "store/reducers/modal";

import { userApi } from "shared/api";
import { emailRegExp } from "shared/regExp";
import { getError } from "shared/functions";

import arrow from "public/assets/icon/arrow_right_ico(purple).svg";
import { useRouter } from "next/router";

const useInput = (initState = null) => {
  const [value, setValue] = useState(initState);

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue, setValue];
};

const SnsLogin = ({ handleSnsChange, isLocalLogin, setIsLocalLogin }) => {
  const [isIosApp, setIsIosApp] = useState(false);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const dispatch = useDispatch();
  const Router = useRouter();

  useEffect(() => {
    // check ios device for inspection
    // const agent = navigator.userAgent.toLowerCase();
    // if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    //   setIsIosApp(true);
    // }
  }, []);
  // 로컬 로그인 토글 버튼
  const onToggleLocalLogin = useCallback(() => {
    setIsLocalLogin((prev) => !prev);
  }, []);

  // 로컬 로그인 체크
  const onLocalLoginCheck = useCallback(async () => {
    try {
      if (!emailRegExp.test(email)) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "이메일 형식으로 입력해주세요.",
          },
        });
      }

      if (password.length < 8 || password.length > 20) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <>
                <p>8~20자리의 비밀번호로 입력해주세요.</p>
              </>
            ),
          },
        });
      }

      // if (!passwordRegEpx.test(password)) {
      //   return dispatch({
      //     type: OPEN_MODAL,
      //     data: {
      //       content: (
      //         <>
      //           <p>8~20자리의 특수문자 포함</p>
      //           <p>비밀번호로 입력해주세요.</p>
      //         </>
      //       )
      //     }
      //   });
      // }
      if (password.length < 8 || password.length > 20) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <>
                <p>8~20자리의 비밀번호로 입력해주세요.</p>
              </>
            ),
          },
        });
      }
      // if (!passwordRegEpx.test(passwordConfirm)) {
      //   return dispatch({
      //     type: OPEN_MODAL,
      //     data: {
      //       content: (
      //         <>
      //           <p>8~20자리의 특수문자 포함</p>
      //           <p>비밀번호로 입력해주세요.</p>
      //         </>
      //       )
      //     }
      //   });
      // }
      if (password !== passwordConfirm) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "비밀번호가 다릅니다.",
          },
        });
      }

      await userApi.post(
        "/mobile/local/check",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      location.href = "/signup/identityCertificate";
    } catch (error) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: getError(error),
        },
      });
    }
  }, [email, password, passwordConfirm, dispatch]);

  return (
    <div className="sns_login">
      {!isLocalLogin && (
        <>
          <div className="content">
            <div className="login_btns">
              <div className="login_btn ">
                <LoginButton
                  type="button"
                  loginType="local"
                  onClick={onToggleLocalLogin}
                  signup
                />
              </div>
              {!isIosApp && (
                <div className="login_btn">
                  <LoginButton type="button" loginType="kakao" signup />
                </div>
              )}
            </div>
            <div className="login_btns">
              {!isIosApp && (
                <div className="login_btn">
                  <LoginButton type="button" loginType="naver" signup />
                </div>
              )}
              <div className="login_btn">
                <LoginButton type="button" loginType="apple" signup />
              </div>
            </div>
          </div>

          <div className="sign_up_footer">
            <button
              className="back"
              style={{ marginRight: "100px" }}
              onClick={() => Router.back()}
            >
              <img src={arrow} alt="arrow" />
              <span>이전</span>
            </button>
            <button style={{ width: "54px" }}></button>
          </div>
        </>
      )}
      {isLocalLogin && (
        <>
          <div className="content column">
            <div className="inputContainer">
              <label htmlFor="email">이메일</label>
              <Input
                id="email"
                type="email"
                width="100%"
                height="40px"
                maxLength="30"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={onChangeEmail}
                style={{
                  padding: "0 10px",
                }}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">비밀번호</label>
              <Input
                id="password"
                type="password"
                width="100%"
                height="40px"
                maxLength="20"
                placeholder="8~20자리의 영문,숫자,특수문자 조합"
                value={password}
                onChange={onChangePassword}
                style={{
                  padding: "0 10px",
                }}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="passwordConfirm"></label>
              <Input
                id="passwordConfirm"
                type="password"
                width="100%"
                height="40px"
                maxLength="20"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                style={{
                  padding: "0 10px",
                }}
              />
            </div>
          </div>
          <div className="sign_up_footer">
            <button className="back" onClick={onToggleLocalLogin}>
              <img src={arrow} alt="arrow" />
              <span>이전</span>
            </button>
            <button className="next" onClick={onLocalLoginCheck}>
              <span>다음</span>
              <img src={arrow} alt="arrow" />
            </button>
          </div>
        </>
      )}
      <style jsx>{`

      .sns_login {    
          max-width: ${!isLocalLogin ? "370px;" : "450px;"}
          margin: 0 auto;
          text-align: center;   
          width: 100%;
        }

        .content{
          width: 100%;
          height: 200px;
          margin-bottom: 20px;
          padding-top: 45px;
          box-sizing: border-box;
        }

        .content.column{
          flex-direction:column;

          justify-content: flex-start;
        }

        .login_btns:first-child {
          margin-bottom: 10px;
        }
        .sns_login .content .login_btn {
          display: inline-block;
          margin-right: 10px;
        }

        .sns_login .content .login_btn:last-of-type{
          margin-right: 0px;
        }

        .sns_login .content .inputContainer {
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          margin-bottom:20px;
          box-sizing: border-box;
        }

        .sns_login .content .inputContainer:last-of-type{
          margin-bottom:0px;
        }

        .sns_login .content .inputContainer label {
          color: #fff;
          flex-basis: 130px;
          margin-right: 10px;
        }

        .sns_login .content .buttonContainer {         
          margin: 48px auto 0 auto; 
          max-width: 370px;
          display:flex;
          justify-content:space-between;
          align-items:center;
        }
        .sign_up_footer {
          width: 100%;
          text-align: center;
        }
        .sign_up_footer .back{
          margin-right: 100px;
        }
        .sign_up_footer .back img{
          margin-right: 10px;
          transform: rotate(180deg);
        }
        .sign_up_footer .next span{
          margin-right: 10px;
        }
        .sign_up_footer > button {
          border: 0;
          color: #979cca;
          font-weight: bold;
          background: none;
          font-size: 17px;
          cursor: pointer;
        }
        .sign_up_footer > button span {
          display: inline-block;
          vertical-align: middle;
        }
        .sign_up_footer > button img {
          width: 10px;
          height: 17px;
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

SnsLogin.propTypes = {
  visible: PropTypes.bool,
  handleSnsChange: PropTypes.func,
};

export default SnsLogin;
