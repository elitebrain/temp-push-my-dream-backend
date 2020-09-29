import React from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";

import Rank from "components/Rank";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const rankingPage = () => {
  const Router = useRouter();

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 랭킹</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <Rank
          category3No={Number(Router.query.category3No)}
          userType={Router.query.userType}
        />
      </DynamicNewLayout>
    </>
  );
};

export default rankingPage;
