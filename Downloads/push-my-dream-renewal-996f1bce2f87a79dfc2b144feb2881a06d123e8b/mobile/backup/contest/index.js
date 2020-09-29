import React from "react";
import Helmet from "react-helmet";
import ApplicationContainer from "containers/Contest/ApplicationContainer";

const Contest = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 참가 신청 하기</title>
      </Helmet>
      <ApplicationContainer />
    </>
  );
};

export default Contest;
