import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import _ from "lodash/object";
import Dynamic from "next/dynamic";

import LoginContainer from "containers/User/LoginContainer";
import withLogged from "components/Hoc/withLogged";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

// 참고 : https://www.notion.so/Login-API-75e004ab4aa64a4ba388af2207a87b7d
const Login = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const Router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      Router.replace(_.has(Router, "query.ref") ? Router.query.ref : "/");
    }
  }, [isLoggedIn, Router]);

  if (isLoggedIn) {
    return null;
  }

  return (
    <DynamicNewLayout transparent whiteText>
      <LoginContainer />
    </DynamicNewLayout>
    // <MainTemplate Header={<Header load />} fullWidth>
    //   <LoginContainer />
    // </MainTemplate>
  );
};

export default Login;
