import React from "react";
import Helmet from "react-helmet";
import MyPageEditContainer from "containers/User/MyPageEditContainer";

import withLogged from "components/Hoc/withLogged";

const edit = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 내 정보 수정</title>
      </Helmet>
      <MyPageEditContainer />
    </>
  );
};

export default withLogged(edit, true);
