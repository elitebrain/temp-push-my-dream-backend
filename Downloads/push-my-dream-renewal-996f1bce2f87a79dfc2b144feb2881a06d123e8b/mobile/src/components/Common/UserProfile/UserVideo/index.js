import React from "react";
import PropTypes from "prop-types";

import Video from "components/Common/Video";
import Button from "components/Common/Button";

import arrowDownWhite from "public/assets/image/arrow_down_white.png";

const UserVideo = (props) => {
  const { title, count, videoList, currentUser } = props;
  console.log("count", count, videoList);
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
  return (
    <div>
      {videoList &&
        videoList.map((video, i) => (
          <Video
            key={video.video_no}
            videoNo={video.video_no}
            thumbnail={video.thumbnail}
            description={video.description}
            title={video.title}
            countView={video.countViewVideo}
            countLike={video.countLikeVideo}
            idx={i}
            listGubun="user"
            isViewCategory
            currentUserNo={currentUser.user_no}
            category={video.category_level2_no}
            // mypage
            // handleMenu={_handleMenu}
            // selectedVideoNo={selectedVideoNo}
            // isOpen={video.isOpen}
          />
        ))}
      {count > videoList.length && (
        <div className="more_btn">
          <Button
            className="bg_transparent border_solid_white"
            // handleClick={_handleMore}
            style={{ width: "130px", height: "53px", fontSize: "15px" }}
          >
            더보기
            <img
              src={arrowDownWhite}
              alt="arrow_down_white"
              style={{ marginLeft: "9px" }}
            />
          </Button>
        </div>
      )}
      <style jsx>{`
        .more_btn {
          text-align: center;
          margin-bottom: 150px;
        }
      `}</style>
    </div>
  );
};

UserVideo.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  videoList: PropTypes.array,
};

export default UserVideo;
