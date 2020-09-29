import React from "react";

import ContentLong from "components/Layout/ContentLong";
import VideoView from "./VideoView/VideoView";
import CommentContainer from "containers/CommentContainer";
import { BLACK_COLOR } from "shared/constants/colors";
import UserProfile from "./UserProfile";

const Top = props => {
  const { currentVideo } = props;
  // const { video, commentList, countComment } = props;
  return (
    <ContentLong>
      <div className="main_content">
        <UserProfile />
        <VideoView currentVideo={currentVideo} />
        <CommentContainer />
      </div>
      <style jsx>{`
        .main_content {
          width: 1200px;
          height: 805px;
          background-color: ${BLACK_COLOR};
          margin: 0 auto;
        }
      `}</style>
    </ContentLong>
  );
};

export default Top;
