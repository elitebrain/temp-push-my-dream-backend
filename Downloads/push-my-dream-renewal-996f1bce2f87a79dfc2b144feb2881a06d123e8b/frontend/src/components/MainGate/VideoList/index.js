import React from "react";
import PropTypes from "prop-types";

const VideoList = ({ ItemComponent }) => {
  return (
    <div className="video_list_container">
      {React.cloneElement(ItemComponent, {
        // 비디오 정보가 들갑니다.
        time: "03:03"
      })}
      {React.cloneElement(ItemComponent, {
        // 비디오 정보가 들갑니다.
        time: "03:03"
      })}
      {React.cloneElement(ItemComponent, {
        // 비디오 정보가 들갑니다.
        time: "03:03"
      })}
      {/* <VideoItem />
      <VideoItem />
      <VideoItem /> */}
      <style jsx>{`
        .video_list_container {
          /* width: calc(100% - 20px); */
          margin-right: -20px;
          overflow: auto;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

VideoList.propTypes = {
  ItemComponent: PropTypes.node
};

export default VideoList;
