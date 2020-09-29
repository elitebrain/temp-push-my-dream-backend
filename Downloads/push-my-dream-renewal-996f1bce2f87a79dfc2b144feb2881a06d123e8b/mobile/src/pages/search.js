import React from "react";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";

import SearchContainer from "containers/SearchContainer";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const search = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 검색하기</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <SearchContainer />
      </DynamicNewLayout>
    </>
  );
};

export default search;
