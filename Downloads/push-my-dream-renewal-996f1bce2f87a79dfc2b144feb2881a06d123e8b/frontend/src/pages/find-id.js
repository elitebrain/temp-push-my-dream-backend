import React from "react";
import Helmet from "react-helmet";

import FindIdContainer from "containers/User/FindIdContainer";
import MainTemplate from "components/Templates/MainTemplate";
import Header from "components/Layout/Header";
import withLogged from "components/Hoc/withLogged";

const FindId = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 아이디 찾기</title>
      </Helmet>
      <MainTemplate Header={<Header />} fullWidth>
        <FindIdContainer />
      </MainTemplate>
    </>
  );
};

export default withLogged(FindId, false);
