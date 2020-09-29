import React, { useState, useCallback, createContext } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";

import { LOG_IN_REQUEST } from "store/reducers/user";

import Login from "components/User/Login";

const useInput = (initState = null) => {
  const [value, setValue] = useState(initState);

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue, setValue];
};

export const LoginContext = createContext();

const LoginContainer = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();

  // 로그인 버튼 클릭시
  const onLogin = useCallback(({ id, email, password, loginType, error }) => {
    if (loginType === "local") {
      if (!email) {
        return alert("이메일을 입력해주세요.");
      }

      if (!password) {
        return alert("비밀번호를 입력해주세요.");
      }
    }

    // 에러 존재시 종료
    if (error) {
      return;
    }

    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        id,
        email,
        password,
        loginType,
      },
    });
  }, []);

  return (
    <LoginContext.Provider
      value={{ email, password, onChangeEmail, onChangePassword }}
    >
      <Login onLogin={onLogin} />
    </LoginContext.Provider>
  );
};

export default LoginContainer;
