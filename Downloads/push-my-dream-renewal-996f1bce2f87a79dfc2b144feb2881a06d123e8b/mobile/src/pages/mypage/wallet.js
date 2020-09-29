import React from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import Dynamic from "next/dynamic";

import WalletComponent from "components/MyPage/Wallet";
import LoginNotice from "components/Common/LoginNotice";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const WalletPage = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 내 지갑</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? <LoginNotice /> : <WalletComponent />}
      </DynamicNewLayout>
    </>
  );
};

export default WalletPage;
