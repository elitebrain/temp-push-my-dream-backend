import React from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import Dynamic from "next/dynamic";

import ChargingLogContainer from "containers/Charging/ChargingLogContainer";

import LoginNotice from "components/Common/LoginNotice";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const ChargingLog = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 충전 내역</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? <LoginNotice /> : <ChargingLogContainer />}
      </DynamicNewLayout>
    </>
  );
};

export default ChargingLog;
