import React from "react";
import Helmet from "react-helmet";

// import socketClient from "shared/socket";

import SignUpContainer from "containers/User/SignUpContainer";

import MainTemplate from "components/Templates/MainTemplate";
import Header from "components/Layout/Header";
import withLogged from "components/Hoc/withLogged";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 회원 가입</title>
      </Helmet>
      <MainTemplate Header={<Header />} fullWidth>
        <SignUpContainer />
      </MainTemplate>
    </>
  );
};

export default withLogged(SignUp, false);
