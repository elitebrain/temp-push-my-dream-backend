import React, { useState, useCallback } from "react";
import Dynamic from "next/dynamic";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import FindId from "components/User/FindId";

import { userApi } from "shared/api";
import { NICE_URL } from "shared/constants/variables";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const FindIdPage = (props) => {
  const [isCheckPlusSuccess] = useState(props.isCheckPlusSuccess);
  const [findUser] = useState({
    isExistUser: props.isExistUser,
    loginType: props.loginType,
    email: props.email,
  });

  const _handleCheckPlus = useCallback(() => {
    window.location.href = `${NICE_URL}/find-id`;
  }, []);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 아이디 찾기</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <FindId
          isCheckPlusSuccess={isCheckPlusSuccess}
          findUser={findUser}
          onCheckPlus={_handleCheckPlus}
        />
      </DynamicNewLayout>
    </>
  );
};

FindIdPage.propTypes = {
  isCheckPlusSuccess: PropTypes.bool,
  isExistUser: PropTypes.bool,
  email: PropTypes.string,
  loginType: PropTypes.string,
};

FindIdPage.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const {
      data: {
        isCheckPlusSuccess = false,
        isExistUser = false,
        email = null,
        loginType = null,
      },
    } = await userApi.get("/mobile/check/find-id", {
      withCredentials: true,
      ...serverCondition,
    });

    return { isCheckPlusSuccess, isExistUser, email, loginType };
  } catch (error) {
    return { isCheckPlusSuccess: false, isExistUser: false };
  }
};

export default FindIdPage;
