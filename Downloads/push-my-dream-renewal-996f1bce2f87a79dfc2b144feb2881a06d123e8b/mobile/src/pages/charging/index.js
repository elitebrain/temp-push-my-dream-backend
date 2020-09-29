import React from "react";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";
import { useSelector } from "react-redux";

import ChargingContainer from "containers/Charging/ChargingContainer";
import LoginNotice from "components/Common/LoginNotice";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const Charging = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | PUSH충전</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? <LoginNotice /> : <ChargingContainer />}
      </DynamicNewLayout>
    </>
  );
};

export default Charging;
