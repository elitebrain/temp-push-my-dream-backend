import React from "react";
import Helmet from "react-helmet";

import UploadContainer from "containers/UploadContainer";
import withLogged from "components/Hoc/withLogged";

const Upload = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 업로드</title>
      </Helmet>
      <UploadContainer />
    </>
  );
};

export default withLogged(Upload, true);
