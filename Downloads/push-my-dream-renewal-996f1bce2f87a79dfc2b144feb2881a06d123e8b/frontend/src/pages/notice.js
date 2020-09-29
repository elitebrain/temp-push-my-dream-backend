import React from "react";
import Helmet from "react-helmet";
import NoticeContainer from "containers/NoticeContainer";

const Notice = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 공지사항</title>
      </Helmet>
      <NoticeContainer />
    </>
  );
};

export default Notice;
