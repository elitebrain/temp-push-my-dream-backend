import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import _ from "lodash/object";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

import SignUpLoginContainer from "containers/SignUp/SignUpLoginContainer";

import { userApi } from "shared/api";

const SignUpLogin = ({ redirectPage }) => {
  const Router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const DynamicNewLayout = Dynamic(
    () => import("components/Layout/NewLayout"),
    {
      ssr: false,
    }
  );

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
          <SignUpLoginContainer />
        </DynamicNewLayout>
      </>
    )
  );
};

SignUpLogin.propTypes = {
  redirectPage: PropTypes.string,
};

SignUpLogin.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    await userApi.get("/mobile/check/login", {
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

export default SignUpLogin;
