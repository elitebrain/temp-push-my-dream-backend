import React, { useContext } from "react";
import PropTypes from "prop-types";

import { MAIN_BLACK_COLOR } from "shared/constants/colors";

import Layout from "components/Layout/Layout";
import VideoTitle from "components/Video/ViewVideo/VideoTitle/VideoTitle";
import Top from "./Top/Top";
import Bottom from "./Bottom/Bottom";
import NextVideo from "./NextVideo/NextVideo";
import ContentLong from "components/Layout/ContentLong";
import BestUserList from "./BestUserList";

const ViewVideoComponent = (props) => {
  const { videoRef, currentVideo } = props;
  return (
    <Layout>
      {currentVideo ? (
        <div className="container">
          {/* <VideoTitle currentVideo={currentVideo} /> */}
          <BestUserList />
          <Top
            videoRef={videoRef}
            currentVideo={currentVideo}
            // commentList={commentList}
            // countComment={countComment}
          />
          <ContentLong style={{ height: "490px" }}>
            <div className="view_video_content_left">
              <Bottom currentVideo={currentVideo} />
            </div>
            <div className="view_video_content_right">
              <NextVideo />
            </div>
          </ContentLong>
        </div>
      ) : (
        <div className="empty_body" />
      )}
      <style jsx>{`
        .empty_body {
          height: calc(100vh - 216px);
          background-color: ${MAIN_BLACK_COLOR};
        }
        .container {
          width: 100%;
          min-width: 1366px;
          height: auto;
          background-color: ${MAIN_BLACK_COLOR};
          overflow: hidden;
          padding-top: 100px;
        }
        .view_video_content_left {
          vertical-align: top;
          display: inline-block;
          width: 1365px;
          margin-right: 30px;
        }
        .view_video_content_right {
          display: inline-block;
        }
      `}</style>
    </Layout>
  );
};

ViewVideoComponent.propTypes = {
  video: PropTypes.object,
  commentList: PropTypes.array,
  countComment: PropTypes.number,
  likeVideoList: PropTypes.array,
};

export default ViewVideoComponent;
