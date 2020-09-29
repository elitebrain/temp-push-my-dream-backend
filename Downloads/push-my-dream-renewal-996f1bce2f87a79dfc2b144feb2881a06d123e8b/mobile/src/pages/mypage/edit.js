import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";

import MyPageEditContainer from "containers/MyPage/MyPageEditContainer";

import LoginNotice from "components/Common/LoginNotice";

import { userApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const MyPageEdit = ({ errorMessage, editPhone }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);
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
            Router.replace("/mypage/edit");
          },
          onClose() {
            Router.replace("/mypage/edit");
          },
        },
      });
    }
  }, [dispatch, errorMessage]);

  return (
    <DynamicNewLayout transparent whiteText>
      {!isLoggedIn ? (
        <LoginNotice />
      ) : (
        <MyPageEditContainer editPhone={editPhone} />
      )}
    </DynamicNewLayout>
  );
};

MyPageEdit.propTypes = {
  errorMessage: PropTypes.string,
  editPhone: PropTypes.string,
};

MyPageEdit.getInitialProps = async (context) => {
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
        data: { editPhone = "" },
      } = await userApi.get("/mobile/check/edit-phone", {
        withCredentials: true,
        ...serverCondition,
      });
      return { editPhone };
    } else {
      const errorMessage =
        e === "1" ? "핸드폰의 소유자의 정보가 일치하지 않습니다." : null;
      return { errorMessage };
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default MyPageEdit;
