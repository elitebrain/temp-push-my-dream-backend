import React, { useContext } from "react";

import { UserContext } from "containers/User/UserContainer";

import VideoItem from "components/Common/VideoItem";

const UserVideoList = ({ ItemComponent, style }) => {
  const { currentUser, handleVideo } = useContext(UserContext);
  const { VIDEO } = currentUser;
  // const videoStyle =
  //   window.outerWidth > 1366 ? { height: "173px" } : { height: "116px" };
  return (
    <div className="video_list" style={style}>
      {VIDEO &&
        VIDEO.map((video) => (
          <VideoItem
            column={3}
            //  style={videoStyle}
            userVideoHeight
            key={video.video_no}
            video={video}
            handleClick={handleVideo}
          />
        ))}
      <style jsx>{`
        .video_list {
          height: 438px;
          overflow: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .video_list::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
        @media (max-width: 1366px) {
          .video_list {
            height: 286px;
          }
        }
        @media (min-width: 2560px) {
          .video_list {
            height: 635px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserVideoList;
