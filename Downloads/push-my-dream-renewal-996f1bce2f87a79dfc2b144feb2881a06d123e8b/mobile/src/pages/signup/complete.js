import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import _ from "lodash/object";

import SignUpComplete from "components/SignUp/SignUpComplete";
import Dynamic from "next/dynamic";

import { userApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";
import { useDispatch } from "react-redux";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const SignUpCompletePage = ({ redirectPage, userState }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (redirectPage) {
      Router.replace(`/signup/${redirectPage}`);
    } else {
      setIsLoaded(true);
    }
  }, [redirectPage, Router, dispatch]);

  return (
    isLoaded && (
      <>
        <Helmet>
          <title>푸쉬 마이 드림 | 회원 가입</title>
        </Helmet>
        <DynamicNewLayout transparent whiteText>
          <SignUpComplete userState={userState} />
        </DynamicNewLayout>
      </>
    )
  );
};

SignUpCompletePage.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const {
      data: { user },
    } = await userApi.get("/mobile/check/signup", {
      withCredentials: true,
      ...serverCondition,
    });

    let userState = {};
    if (user) {
      userState = { userState: user };
    }

    return userState;
  } catch (error) {
    return {
      redirectPage: _.has(error, "response.data.redirectPage")
        ? error.response.data.redirectPage
        : null,
    };
  }
};

export default SignUpCompletePage;
