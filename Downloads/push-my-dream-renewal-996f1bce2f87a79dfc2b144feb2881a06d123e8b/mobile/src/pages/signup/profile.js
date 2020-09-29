import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import _ from "lodash/object";
import Dynamic from "next/dynamic";

import SignUpProfileContainer from "containers/SignUp/SignUpProfileContainer";

import { userApi } from "shared/api";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const SignUpProfile = ({ redirectPage }) => {
  const Router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (redirectPage) {
      Router.replace(`/signup/${redirectPage}`);
    } else {
      setIsLoaded(true);
    }
  }, [redirectPage, Router]);

  return (
    isLoaded && (
      <>
        <Helmet>
          <title>푸쉬 마이 드림 | 회원 가입</title>
        </Helmet>
        <DynamicNewLayout transparent whiteText>
          <SignUpProfileContainer />
        </DynamicNewLayout>
      </>
    )
  );
};

SignUpProfile.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    await userApi.get("/mobile/check/profile", {
      withCredentials: true,
      ...serverCondition,
    });

    return {};
  } catch (error) {
    return {
      redirectPage: _.has(error, "response.data.redirectPage")
        ? error.response.data.redirectPage
        : null,
    };
  }
};

export default SignUpProfile;
