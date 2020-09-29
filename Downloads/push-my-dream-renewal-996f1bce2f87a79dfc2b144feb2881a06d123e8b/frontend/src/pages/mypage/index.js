import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import Router from "next/router";

import MyPageContainer from "containers/User/MyPageContainer";

import { GET_MYVIDEOLIST_REQUEST } from "store/reducers/video";

import withLogged from "components/Hoc/withLogged";

const MyPage = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  //todo :hoc으로 변경
  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/login");
    }
  }, [isLoggedIn]);
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 마이 페이지</title>
      </Helmet>
      {isLoggedIn && <MyPageContainer />}
    </>
  );
};

MyPage.getInitialProps = async (context) => {
  context.store.dispatch({
    type: GET_MYVIDEOLIST_REQUEST,
  });
};

export default MyPage;
