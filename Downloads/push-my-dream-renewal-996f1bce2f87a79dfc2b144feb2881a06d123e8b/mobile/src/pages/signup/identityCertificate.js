import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import _ from "lodash/object";

import SignUpIdentityCertificate from "components/SignUp/SignUpIdentityCertificate";

import MainTemplate from "components/Templates/MainTemplate";
import Header from "components/Layout/Header";

import { userApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";
import { useDispatch } from "react-redux";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const SignUpIdentityCertificatePage = ({
  redirectPage,
  identityCertState,
  isExist,
}) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isExist) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "이미 가입된 정보입니다.",
          isViewClose: false,
        },
      });
    }
    if (redirectPage) {
      Router.replace(`/signup/${redirectPage}`);
    } else {
      setIsLoaded(true);
    }
  }, [redirectPage, Router, isExist, dispatch]);

  return (
    isLoaded && (
      <>
        <Helmet>
          <title>푸쉬 마이 드림 | 회원 가입</title>
        </Helmet>
        <DynamicNewLayout transparent whiteText>
          <SignUpIdentityCertificate identityCertState={identityCertState} />
        </DynamicNewLayout>
      </>
    )
  );
};

SignUpIdentityCertificatePage.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const {
      data: { checkplus },
    } = await userApi.get("/mobile/check/identityCertificate", {
      withCredentials: true,
      ...serverCondition,
    });

    let identityCertState = {};
    if (checkplus) {
      identityCertState = { identityCertState: checkplus };
    }

    return identityCertState;
  } catch (error) {
    console.log(error);
    return {
      redirectPage: _.has(error, "response.data.redirectPage")
        ? error.response.data.redirectPage
        : null,
      isExist: _.has(error, "response.data.isExist")
        ? error.response.data.isExist
        : null,
    };
  }
};

export default SignUpIdentityCertificatePage;
