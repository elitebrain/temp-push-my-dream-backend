import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import SignUpLogin from "components/SignUp/SignUpLogin";

import { OPEN_MODAL } from "store/reducers/modal";

const SignUpLoginContainer = () => {
  const Router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Router.query.e) {
      const errorType = Number(Router.query.e);
      const error =
        errorType === 1
          ? "이미 가입된 정보입니다."
          : "서버에 문제가 발생하였습니다.";

      dispatch({
        type: OPEN_MODAL,
        data: {
          content: error,
          isViewClose: false,
          onConfirm() {
            Router.replace("/signup/login");
          },
          onClose() {
            Router.replace("/signup/login");
          },
        },
      });
    }
  }, [Router.query, dispatch]);

  return <SignUpLogin />;
};

export default SignUpLoginContainer;
