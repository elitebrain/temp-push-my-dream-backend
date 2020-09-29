import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import SignUpProfile from "components/SignUp/SignUpProfile";

import { getError } from "shared/functions";
import { userApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";
import { useRouter } from "next/router";

const SignUpProfileContainer = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const onSignUp = useCallback(
    async ({ file, nickname }) => {
      if (!isSignUp) {
        setIsSignUp(true);
        try {
          const formData = new FormData();

          formData.append("photo", file);
          formData.append("nickname", nickname);

          await userApi.post("/mobile/sign-up", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });

          setIsSignUp(false);
          Router.push("/signup/complete");
        } catch (error) {
          console.error(error);
          setIsSignUp(false);

          if (error.response.data.sessionError) {
            dispatch({
              type: OPEN_MODAL,
              data: {
                content: getError(error),
                isViewClose: false,
                onConfirm() {
                  Router.replace("/signup/terms");
                },
                onClose() {
                  Router.replace("/signup/terms");
                },
              },
            });
          } else {
            dispatch({
              type: OPEN_MODAL,
              data: {
                content: getError(error),
                isViewClose: false,
              },
            });
          }
        }
      }
    },
    [isSignUp, Router]
  );
  return <SignUpProfile onSignUp={onSignUp} />;
};

export default SignUpProfileContainer;
