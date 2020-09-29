import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import _ from "lodash/object";

const withLogged = (Component, loggedIn) => props => {
  const { isLoggedIn } = useSelector(state => state.user);
  const Router = useRouter();

  useEffect(() => {
    // 로그인 필요 페이지일시
    if (isLoggedIn !== loggedIn && loggedIn) {
      Router.replace("/login");
    }
    if (isLoggedIn !== loggedIn && !loggedIn) {
      Router.replace(
        _.has(Router, "query.redirect") ? Router.query.redirect : "/"
      );
    }
  }, [isLoggedIn, loggedIn, Router]);

  if (isLoggedIn !== loggedIn) {
    return null;
  }

  return <Component {...props} />;
};

export default withLogged;
