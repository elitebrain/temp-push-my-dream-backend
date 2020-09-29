import React, { useState, useCallback, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import LoginComponent from "components/User/LoginComponent";

import { LOG_IN_REQUEST } from "store/reducers/user";
import { OPEN_MODAL } from "store/reducers/modal";

const useInput = (initState = null) => {
  const [value, setValue] = useState(initState);

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue, setValue];
};

export const LoginContext = createContext();

const LoginContainer = () => {
  const Router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const e = { target: { value: email } };
      onChangeEmail(e);
    }
  }, []);

  useEffect(() => {
    if (Router.query.e) {
      const errorType = Number(Router.query.e);
      const error =
        errorType === 1
          ? "아이디와 비밀번호가 일치하지 않습니다."
          : errorType === 2
          ? "존재하지 않는 아이디입니다."
          : "서버에 문제가 발생하였습니다.";

      dispatch({
        type: OPEN_MODAL,
        data: {
          content: error,
          isViewClose: false,
          onConfirm() {
            Router.replace("/login");
          },
          onClose() {
            Router.replace("/login");
          },
        },
      });
    }
  }, [Router.query, dispatch]);

  // 로컬 로그인 버튼 클릭시
  const onLogin = useCallback(
    ({ email, password, loginType }) => {
      if (!email) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "이메일을 입력해주세요.",
          },
        });
        // return alert("이메일을 입력해주세요.");
      }

      if (!password) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "비밀번호를 입력해주세요.",
          },
        });
        // return alert("비밀번호를 입력해주세요.");
      }
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password,
          loginType,
        },
      });
    },
    [dispatch]
  );

  return (
    <LoginContext.Provider
      value={{ email, password, onChangeEmail, onChangePassword }}
    >
      <LoginComponent onLogin={onLogin} />
    </LoginContext.Provider>
  );
};

export default LoginContainer;
