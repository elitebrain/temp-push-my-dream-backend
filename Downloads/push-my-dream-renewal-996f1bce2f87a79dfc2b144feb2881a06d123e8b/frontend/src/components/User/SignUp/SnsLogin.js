import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";

import LoginButton from "components/Common/LoginButton";
import Input from "components/Common/Input";
import Button from "components/Common/Button";

import { OPEN_MODAL } from "store/reducers/modal";

import { userApi } from "shared/api";
import { emailRegExp, passwordRegEpx } from "shared/regExp";
import { getError } from "shared/functions";

const useInput = (initState = null) => {
  const [value, setValue] = useState(initState);

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue, setValue];
};

const SnsLogin = ({ visible, handleSnsChange }) => {
  const [isLocalLogin, setIsLocalLogin] = useState(false);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const dispatch = useDispatch();

  // 로컬로그인으로 가입시 다음페이지 이동

  // 로그인 버튼 클릭시
  const onLogin = useCallback(({ id, email, loginType, error }) => {
    // 에러 존재시 종료
    if (error) {
      return;
    }

    handleSnsChange({ id, email, loginType, error });
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

      const checkUser = await userApi.get("/check/local/login", {
        params: {
          email,
        },
      });

      handleSnsChange({ email, password, loginType: "local" });
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
    <div className={`sns_login${visible ? " visible" : ""}`}>
      {!isLocalLogin && (
        <>
          <div className="login_btn">
            <LoginButton
              type="button"
              width="370px"
              height="60px"
              loginType="local"
              onClick={onToggleLocalLogin}
              flex
              signup
            />
          </div>
          {/* <div className="login_btn">
            <LoginButton type="button" loginType="google" onClick={onLogin} />
          </div> */}
          <div className="login_btn">
            <LoginButton
              type="button"
              loginType="kakao"
              onClick={onLogin}
              signup
            />
          </div>
          <div className="login_btn">
            <LoginButton
              type="button"
              loginType="naver"
              onClick={onLogin}
              signup
            />
          </div>
        </>
      )}
      {isLocalLogin && (
        <>
          <div className="inputContainer">
            <label htmlFor="email">이메일</label>
            <Input
              id="email"
              type="email"
              width="100%"
              height="60px"
              maxLength="30"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">비밀번호</label>
            <Input
              id="password"
              type="password"
              width="100%"
              height="60px"
              maxLength="20"
              placeholder="8~20자리의 영문,숫자,특수문자 조합"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="passwordConfirm"></label>
            <Input
              id="passwordConfirm"
              type="password"
              width="100%"
              height="60px"
              maxLength="20"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
          </div>
          <div className="buttonContainer">
            <Button className="bg_grey" onClick={onToggleLocalLogin}>
              이전
            </Button>
            <Button onClick={onLocalLoginCheck}>다음</Button>
          </div>
        </>
      )}
      <style jsx>{`
        .sns_login {
          width: ${!isLocalLogin ? "370px;" : "450px;"}
          margin: 0 auto;
          visibility: hidden;
          height: 0;
        }
        .sns_login.visible {
          visibility: visible;
          height: auto;
          text-align: center;
        }
        .sns_login .login_btn {
          width: 370px;
          height: 60px;
          margin-bottom: 20px;
          position: relative;
        }
        .sns_login .login_btn .ico {
          width: 35px;
          height: 35px;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .sns_login .login_btn .sns_name {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .sns_login .inputContainer {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60px;
          margin-bottom:20px;
        }

        .sns_login .inputContainer:last-of-type{
          margin-bottom:0px;
        }

        .sns_login .inputContainer label {
          color: #fff;
          flex-basis: 130px;
          margin-right: 10px;
        }

        .sns_login .buttonContainer {         
          margin: 48px auto 0 auto; 
          width: 370px;
          display:flex;
          justify-content:space-between;
          align-items:center;
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
