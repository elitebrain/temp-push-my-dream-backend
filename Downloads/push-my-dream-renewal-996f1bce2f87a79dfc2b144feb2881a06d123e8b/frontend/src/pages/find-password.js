import React from "react";
import Helmet from "react-helmet";

import FindPasswordContainer from "containers/User/FindPasswordContainer";
import MainTemplate from "components/Templates/MainTemplate";
import Header from "components/Layout/Header";
import withLogged from "components/Hoc/withLogged";

const FindPassowrd = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 비밀번호 찾기</title>
      </Helmet>
      <MainTemplate Header={<Header />} fullWidth>
        <FindPasswordContainer />
      </MainTemplate>
    </>
  );
};

export default withLogged(FindPassowrd, false);
