import React from "react";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";

import NoticeContainer from "containers/NoticeContainer";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const Notice = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 공지사항</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <NoticeContainer />
      </DynamicNewLayout>
    </>
  );
};

export default Notice;
