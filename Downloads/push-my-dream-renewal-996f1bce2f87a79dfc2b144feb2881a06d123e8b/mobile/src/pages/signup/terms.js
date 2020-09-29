import React from "react";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";

import SignUpTerms from "components/SignUp/SignUpTerms";
import MainTemplate from "components/Templates/MainTemplate";
import Header from "components/Layout/Header";

import { userApi } from "shared/api";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const SignUpTermsPage = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 회원 가입</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <SignUpTerms />
      </DynamicNewLayout>
    </>
  );
};

SignUpTermsPage.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    await userApi.get("/mobile/check/terms", {
      withCredentials: true,
      ...serverCondition,
    });

    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default SignUpTermsPage;
