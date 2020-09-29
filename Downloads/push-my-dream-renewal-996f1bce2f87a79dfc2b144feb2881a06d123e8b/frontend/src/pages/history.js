import React from "react";
import Helmet from "react-helmet";

import HistoryContainer from "containers/History/HistoryContainer";

const history = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림</title>
      </Helmet>
      <HistoryContainer />
    </>
  );
};

export default history;
