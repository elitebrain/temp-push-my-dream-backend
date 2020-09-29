import React, { useContext } from "react";
import { useSelector } from "react-redux";
import ContentLong from "components/Layout/ContentLong";
// import { ViewVideoContext } from "containers/ViewVideoContainer";

const VideoTitle = props => {
  const { currentVideo } = props;
  // const { title } = useSelector(state => state.video);
  // const { currentVideo } = useContext(ViewVideoContext);

  return (
    <ContentLong>
      {/* <div className="video_title">{title}</div> */}
      <div className="video_title">{currentVideo.title || ""}</div>
      <style jsx>{`
        /* .video_title {
          width: 100%;
          height: 70px;
          line-height: 70px;
          background-color: #f38400;
          color: #fff;
          font-size: 20px;
          text-align: center;
          border-radius: 15px;
          margin-top: 145px;
          margin-bottom: 20px;
        } */
        .video_title {
          margin-bottom: 100px;
        }
      `}</style>
    </ContentLong>
  );
};

export default VideoTitle;
