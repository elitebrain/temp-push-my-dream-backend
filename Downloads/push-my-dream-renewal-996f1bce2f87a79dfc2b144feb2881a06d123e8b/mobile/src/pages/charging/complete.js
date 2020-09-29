import React from "react";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";
import { useSelector } from "react-redux";

import ChargingCompleteContainer from "containers/Charging/ChargingCompleteContainer";

import LoginNotice from "components/Common/LoginNotice";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const ChargingComplete = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | PUSH충전 완료</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? <LoginNotice /> : <ChargingCompleteContainer />}
      </DynamicNewLayout>
    </>
  );
};

export default ChargingComplete;
