import React from "react";
import Helmet from "react-helmet";
import ViewVideoContainer from "containers/Video/ViewVideoContainer";

const UserVideo = ({ videoNo }) => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 비디오 정보</title>
      </Helmet>
      <ViewVideoContainer userVideo videoNo={videoNo} />
    </>
  );
};

UserVideo.getInitialProps = async context => {
  const { videoNo } = context.query;

  return { videoNo: Number(videoNo) };
};

export default UserVideo;
