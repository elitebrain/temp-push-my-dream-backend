import React from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import Dynamic from "next/dynamic";

import PushLogContainer from "containers/Push/PushLogContainer";

import LoginNotice from "components/Common/LoginNotice";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const PushLog = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | PUSH 내역</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? <LoginNotice /> : <PushLogContainer />}
      </DynamicNewLayout>
    </>
  );
};

export default PushLog;
