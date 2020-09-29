import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { NICE_URL, NICE_ORIGIN_URL } from "shared/constants/variables";
import { OPEN_MODAL } from "store/reducers/modal";

import FindId from "components/User/FindId";

import { getError } from "shared/functions";
import { userApi } from "shared/api";

const FindIdContainer = () => {
  const [isCheckPlusSuccess, setIsCheckPlusSuccess] = useState(false);
  const [findUser, setFindUser] = useState({
    isExistUser: false,
    loginType: "",
    email: ""
  });

  const dispatch = useDispatch();

  useEffect(() => {
    return function cleanup() {
      window.removeEventListener("message", onEventByCheckplus);
    };
  }, []);

  const onEventByCheckplus = useCallback(
    async e => {
      if (e.origin === NICE_ORIGIN_URL) {
        const { dupinfo: di, code } = e.data;
        if (+code === 200) {
          try {
            const result = await userApi.get("/di", {
              params: {
                di
              }
            });
            if (result.data.isExist) {
              const user = result.data.user;
              setFindUser({
                isExistUser: true,
                loginType: !!user.kakao_id
                  ? "kakao"
                  : !!user.naver_id
                  ? "naver"
                  : !!user.google_id
                  ? "google"
                  : !!user.local_id
                  ? "local"
                  : "",
                email: user.email
              });
            }
            setIsCheckPlusSuccess(true);
          } catch (error) {
            dispatch({
              type: OPEN_MODAL,
              data: {
                content: getError(error)
              }
            });
          }
        } else {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: (
                <>
                  <h1>errorCode : {code}</h1>
                  <h1>인증에 실패하였습니다.</h1>
                  <h1>관리자에게 문의해주세요.</h1>
                </>
              )
            }
          });
        }
      }
    },
    [dispatch]
  );

  const _handleCheckPlus = useCallback(() => {
    window.open(
      NICE_URL,
      "popupChk",
      "width=410, height=715, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
    );
    window.addEventListener("message", onEventByCheckplus);
  }, []);

  return (
    <FindId
      isCheckPlusSuccess={isCheckPlusSuccess}
      findUser={findUser}
      onCheckPlus={_handleCheckPlus}
    />
  );
};

export default FindIdContainer;
