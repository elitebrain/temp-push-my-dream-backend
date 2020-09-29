import React from "react";
import Helmet from "react-helmet";

import NewVideoContainer from "containers/Video/NewVideoContainer";

const NewVideo = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 참가자 영상</title>
      </Helmet>
      <NewVideoContainer />
    </>
  );
};

export default NewVideo;
