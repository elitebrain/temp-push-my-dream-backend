import React, { useState } from "react";
import PropTypes from "prop-types";
import ContentHeader from "components/Common/ContentHeader";
import Video from "components/Common/Video";
import EmptyVideo from "components/Common/EmptyVideo";

const UserVideo = props => {
  const { title, count, videoList } = props;
  // const [selectedVideoNo, setSelectedVideoNo] = useState(null);
  // const _handleMenu = videoNo => {
  //   setSelectedVideoNo(prevState => {
  //     if (prevState === videoNo) {
  //       return null;
  //     } else {
  //       return videoNo;
  //     }
  //   });
  // };
  console.log(videoList);

  return (
    <div>
      <ContentHeader
        title={title}
        count={count}
        style={{ paddingTop: "65px" }}
      />
      {videoList && videoList.length > 0 ? (
        videoList.map((video, i) => (
          <Video
            key={video.video_no}
            videoNo={video.video_no}
            thumbnail={video.thumbnail}
            description={video.description}
            title={video.title}
            countView={video.countViewVideo}
            countLike={video.countLikeVideo}
            flag={video.flag}
            className={i % 4 === 3 ? "mr_0" : ""}
            category={video.category_level2_no}
            idx={i}
            isViewCateogry
            // mypage
            // handleMenu={_handleMenu}
            // selectedVideoNo={selectedVideoNo}
            // isOpen={video.isOpen}
          />
        ))
      ) : (
        <EmptyVideo />
      )}
    </div>
  );
};

UserVideo.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  videoList: PropTypes.array
};

export default UserVideo;
