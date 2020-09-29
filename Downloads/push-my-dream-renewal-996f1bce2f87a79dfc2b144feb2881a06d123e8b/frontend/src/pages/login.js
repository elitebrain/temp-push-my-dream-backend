import React from "react";
import Helmet from "react-helmet";

import withLogged from "components/Hoc/withLogged";
import LoginContainer from "containers/User/LoginContainer";

// 참고 : https://www.notion.so/Login-API-75e004ab4aa64a4ba388af2207a87b7d
const Login = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 로그인</title>
      </Helmet>
      <LoginContainer />
    </>
  );
};

export default withLogged(Login, false);
