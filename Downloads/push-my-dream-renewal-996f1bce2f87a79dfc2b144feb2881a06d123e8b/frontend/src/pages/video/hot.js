import React from "react";
import Helmet from "react-helmet";

import HotVideoContainer from "containers/Video/HotVideoContainer";

import { GET_MYVIDEOLIST_REQUEST } from "store/reducers/video";

const HotVideo = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 핫톡</title>
      </Helmet>
      <HotVideoContainer />
    </>
  );
};

// HotVideo.getInitialProps = async context => {
//   context.store.dispatch({
//     type: GET_MYVIDEOLIST_REQUEST
//   });
// };

export default HotVideo;
