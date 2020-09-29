import React from "react";
import PropTypes from "prop-types";

import ContentLong from "components/Layout/ContentLong";
import VideoInfo from "./VideoInfo/VideoInfo";
import NextVideo from "../NextVideo/NextVideo";

const Bottom = props => {
  const { currentVideo } = props;
  return (
    <ContentLong>
      <VideoInfo currentVideo={currentVideo} />
    </ContentLong>
  );
};

Bottom.propTypes = {
  likeVideoList: PropTypes.array
};

export default Bottom;
