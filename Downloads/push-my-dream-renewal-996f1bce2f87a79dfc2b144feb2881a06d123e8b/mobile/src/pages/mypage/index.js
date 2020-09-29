import React from "react";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";
import { useSelector } from "react-redux";

import MyPageContainer from "containers/MyPage/MyPageContainer";

import LoginNotice from "components/Common/LoginNotice";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const MyPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 마이페이지</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? <LoginNotice /> : <MyPageContainer />}
      </DynamicNewLayout>
    </>
  );
};

export default MyPage;
