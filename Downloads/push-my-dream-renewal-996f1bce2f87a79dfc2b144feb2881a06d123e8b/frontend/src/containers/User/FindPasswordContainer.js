import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { NICE_URL, NICE_ORIGIN_URL } from "shared/constants/variables";
import { OPEN_MODAL } from "store/reducers/modal";

import FindPassword from "components/User/FindPassword";

import { getError } from "shared/functions";
import { userApi } from "shared/api";
import { emailRegExp } from "shared/regExp";

const FindPasswordContainer = () => {
  const [isCheckPlusSuccess, setIsCheckPlusSuccess] = useState(false);
  const [localId, setLocalId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // localid를 새로 입력하면 나이스 모듈에서 받아오는 메세지 함수를 초기화 시킨다.
    return function cleanup() {
      window.removeEventListener("message", onEventByCheckplus);
    };
  }, [localId]);

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

              // 로컬 아이디
              if (user.local_id !== localId) {
                dispatch({
                  type: OPEN_MODAL,
                  data: {
                    content: "입력하신 아이디와 정보가 일치하지 않습니다."
                  }
                });
              } else {
                setIsCheckPlusSuccess(true);
              }
            }
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
    [dispatch, localId]
  );

  // 나이스 인증모듈 호출
  const _handleCheckPlus = useCallback(() => {
    if (!emailRegExp.test(localId)) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: "아이디를 이메일 형식으로 입력해주세요."
        }
      });
    }

    window.open(
      NICE_URL,
      "popupChk",
      "width=410, height=715, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
    );
    window.addEventListener("message", onEventByCheckplus);
  }, [localId]);

  // 로컬 아이디 변경
  const onChangeLocalId = useCallback(e => {
    setLocalId(e.target.value);
  }, []);

  return (
    <FindPassword
      isCheckPlusSuccess={isCheckPlusSuccess}
      localId={localId}
      onCheckPlus={_handleCheckPlus}
      onChangeLocalId={onChangeLocalId}
    />
  );
};

export default FindPasswordContainer;
