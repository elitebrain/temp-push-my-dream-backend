import React from "react";

import VideoItem from "components/Common/VideoItem";

const UserVideoList = ({ ItemComponent, style }) => {
  return (
    <div className="video_list" style={style}>
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />
      <VideoItem
        viewIcon
        likeIcon
        chatIcon
        column={3}
        style={{ height: "173px" }}
      />

      <style jsx>{`
        .video_list {
          min-height: 520px;
          height: 520px;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default UserVideoList;
