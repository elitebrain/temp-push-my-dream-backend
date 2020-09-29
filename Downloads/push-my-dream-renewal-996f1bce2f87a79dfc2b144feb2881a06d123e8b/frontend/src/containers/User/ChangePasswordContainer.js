import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { OPEN_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";
import { userApi } from "shared/api";

const ChangePasswordContainer = ({
  Component,
  email,
  onChangePasswordMode
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onChangePassword = useCallback(
    async ({ password, passwordConfirm }) => {
      try {
        if (password.length < 8 || password.length > 20) {
          return dispatch({
            type: OPEN_MODAL,
            data: {
              content: (
                <>
                  <p>8~20자리의 비밀번호로 입력해주세요.</p>
                </>
              )
            }
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
              )
            }
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
              content: "비밀번호가 다릅니다."
            }
          });
        }

        let result;
        // 마이페이지에서 실행되는 비밀번호 변경

        result = await userApi.put("/password", {
          email,
          password,
          passwordConfirm
        });

        if (result.status === 200) {
          return dispatch({
            type: OPEN_MODAL,
            data: {
              content: "비밀번호를 변경하였습니다.",
              onConfirm() {
                router.push("/login");
              }
            }
          });
        }
      } catch (error) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: getError(error)
          }
        });
      }
    },
    [dispatch, email, router]
  );

  return (
    <Component
      onChangePasswordMode={onChangePasswordMode}
      onChangePassword={onChangePassword}
    />
  );
};

ChangePasswordContainer.propTypes = {
  Component: PropTypes.elementType.isRequired,
  email: PropTypes.string.isRequired,
  onChangePasswordMode: PropTypes.func
};

export default ChangePasswordContainer;
