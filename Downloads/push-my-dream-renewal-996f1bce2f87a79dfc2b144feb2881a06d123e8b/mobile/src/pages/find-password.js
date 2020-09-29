import React, { useState, useEffect, useCallback } from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

import FindPassword from "components/User/FindPassword";

import { NICE_URL } from "shared/constants/variables";
import { OPEN_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";
import { emailRegExp } from "shared/regExp";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const FindPassowrd = (props) => {
  const { errorMessage } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCheckPlusSuccess] = useState(props.isCheckPlusSuccess);
  const [localId, setLocalId] = useState(props.localId);
  const dispatch = useDispatch();
  const Router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    if (errorMessage) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: errorMessage,
          isViewClose: false,
          onConfirm() {
            Router.replace("/find-password");
          },
          onClose() {
            Router.replace("/find-password");
          },
        },
      });
    }
  }, [dispatch, errorMessage]);

  // 나이스 인증모듈 호출
  const _handleCheckPlus = useCallback(
    (e) => {
      e.preventDefault();

      if (!emailRegExp.test(localId)) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "아이디를 이메일 형식으로 입력해주세요.",
            isViewClose: false,
          },
        });
      }

      window.location.href = `${NICE_URL}/${localId}/find-password`;
    },
    [localId]
  );

  // 로컬 아이디 변경
  const onChangeLocalId = useCallback((e) => {
    setLocalId(e.target.value);
  }, []);

  return (
    isLoaded && (
      <>
        <Helmet>
          <title>푸쉬 마이 드림 | 비밀번호 찾기</title>
        </Helmet>
        <DynamicNewLayout transparent whiteText>
          <FindPassword
            isCheckPlusSuccess={isCheckPlusSuccess}
            localId={localId}
            onCheckPlus={_handleCheckPlus}
            onChangeLocalId={onChangeLocalId}
          />
        </DynamicNewLayout>
      </>
    )
  );
};

FindPassowrd.propTypes = {
  errorMessage: PropTypes.string,
  isCheckPlusSuccess: PropTypes.bool,
  localId: PropTypes.string,
};

/**
 * e = 1 => 존재하지 않는 아이디입니다.
 * e = 2 => 정보가 일치하지 않습니다. ( 아이디와 휴대폰 인증한 아이디가 미일치 시 )
 *
 */
FindPassowrd.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const { e } = context.query;

    // 에러메세지가 존재하지 않을 시 세션에 저장된 이메일 조회
    if (!e) {
      const {
        data: { isCheckPlusSuccess = false, localId = "" },
      } = await userApi.get("/mobile/check/find-password", {
        withCredentials: true,
        ...serverCondition,
      });

      return { isCheckPlusSuccess, localId };
    } else {
      const errorMessage =
        e === "1"
          ? "존재하지 않는 이메일입니다."
          : e === "2"
          ? "계정 정보가 올바르지 않습니다."
          : null;
      return { errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { isCheckPlusSuccess: false, localId: "" };
  }
};

export default FindPassowrd;
