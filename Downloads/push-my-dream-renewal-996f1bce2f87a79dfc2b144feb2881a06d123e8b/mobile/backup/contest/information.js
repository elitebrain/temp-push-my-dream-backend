import React from "react";
import Helmet from "react-helmet";
import InformationContainer from "containers/Contest/InformationContainer";

const Information = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 대회 안내</title>
      </Helmet>
      <InformationContainer />
    </>
  );
};

export default Information;
