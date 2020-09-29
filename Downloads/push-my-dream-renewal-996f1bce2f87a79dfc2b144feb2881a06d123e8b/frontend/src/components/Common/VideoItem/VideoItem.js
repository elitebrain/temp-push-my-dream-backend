import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import { imgOnLoad } from "shared/functions";

import gate_videoList_img from "public/assets/image/gate_videoList_img.jpg";
import heart_none_ico from "public/assets/icon/heart_none_ico(white).svg";
import heart_active_ico from "public/assets/icon/heart_active_ico(red).svg";
import reple_ico from "public/assets/image/comment_btn(white).png";
import view_ico from "public/assets/image/gate_video_view_ico(white).png";
import person_ico from "public/assets/image/person_none(white).png";

/*
chatIcon : 채트 아이콘 표시 여부
  viewIcon : 조회수 아이콘 표시 여부
  lkeIcon : 좋아요수 아이콘 표시 여부
  followIcon : 팔로우수 아이콘 표시 여부
  isViewInfo : 비디오 상세정보 표시 여부 (비디오 하단에 표시)
  isLiked : like 기능 활성화 여부 (비디오 우측 상단 위에 표시)
  className : 커스텀 클래스
  isVideoTime : 비디오 우측 하단에 비디오 시간 표시 여부
*/
const VideoItem = ({
  chatIcon,
  viewIcon,
  likeIcon,
  followIcon,
  isViewInfo,
  isLiked,
  className,
  allVideo,
  userVideoHeight,
  isVideoTime,
  column,
  style,
  main,
  video,
  handleClick,
  openUserModal,
}) => {
  // const image = chatIcon
  //   ? reple_ico
  //   : viewIcon
  //   ? view_ico
  //   : personIcon
  //   ? person_ico
  //   : "";
  const [isLoadedFile, setIsLoadedFile] = useState(false);
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const [opacity, setOpacity] = useState(0);
  // useEffect(() => {
  //   const image = new Image();

  //   image.src = video.thumbnail;

  //   image.onload = function () {
  //     setIsLoadedFile(true);
  //   };

  //   return () => {
  //     // ima;
  //     image.onload = null;
  //   };
  // }, [video]);

  const outterClassName = `video_item_container${column ? " column" : ""}${
    main ? " main" : ""
  }${userVideoHeight ? " userVideoHeight" : ""}${allVideo ? " allVideo" : ""}`;

  const itemClassName = `video_item${isLoadedFile ? " loaded" : ""}`;
  const _onLoad = (e) => {
    imgOnLoad(
      e,
      setImgWidth,
      setImgHeight,
      e.target.parentElement.offsetWidth,
      e.target.parentElement.offsetHeight
    );
    setOpacity(1);
  };
  const _handleClick = () => {
    if (handleClick && openUserModal) {
      handleClick(video.video_no);
      openUserModal(video.USER.user_no);
    } else if (handleClick) {
      handleClick(video.video_no);
    } else if (openUserModal) {
      openUserModal(video.USER.user_no);
    } else if (video && video.USER) {
      Router.push(`/user/${video.USER.user_no}?videoNo=${video.video_no}`);
    }
  };
  return (
    <div className={outterClassName} onClick={() => _handleClick()}>
      <div className={itemClassName} style={style}>
        {video && video.thumbnail && (
          <img src={video.thumbnail} alt="thumbnail" onLoad={_onLoad} />
        )}
        {/* <div className="like_btn">
        <img src={heart_none_ico} alt="like_ico" width="100%" height="100%" />
      </div> */}
        {video && video.isLiked && (
          <div className="like_btn">
            <img
              src={heart_active_ico}
              alt="like_ico"
              width="100%"
              height="100%"
            />
          </div>
        )}
        <div className="view_counter">
          {viewIcon && (
            <div>
              <span className="view_ico">
                <img src={view_ico} alt="view_ico" width="100%" height="100%" />
              </span>
              <span className="view_count">{video.COUNT.count_view}</span>
            </div>
          )}
          {likeIcon && (
            <div>
              <span className="view_ico">
                <img
                  src={heart_none_ico}
                  alt="view_ico"
                  width="100%"
                  height="100%"
                />
              </span>
              <span className="view_count">{video.COUNT.count_like}</span>
            </div>
          )}
          {chatIcon && (
            <div>
              <span className="view_ico">
                <img
                  src={reple_ico}
                  alt="view_ico"
                  width="100%"
                  height="100%"
                />
              </span>
              <span className="view_count">{video.COUNT.count_comment}</span>
            </div>
          )}
          {followIcon && (
            <div>
              <span className="view_ico">
                <img
                  src={person_ico}
                  alt="view_ico"
                  width="100%"
                  height="100%"
                />
              </span>
              <span className="view_count">
                {video.USER.COUNT.count_follower}
              </span>
            </div>
          )}
        </div>
        {isVideoTime && <span className="video_time">3:03</span>}
      </div>
      {isViewInfo && (
        <div className="video_info">
          <span className="title">{video.title}</span>
          <span className="name">{video.USER.user_name}</span>
        </div>
      )}
      <style jsx>{`
        .video_item_container {
          width: 99px;
          height: 176px;
          display: inline-block;
          vertical-align: top;
          margin-right: 20px;
          cursor: pointer;
        }
        .video_item_container.userVideoHeight {
          height: 145px;
        }
        .video_item_container.column {
          width: calc((100% - 10px) / ${column});
          margin-right: 5px;
          margin-bottom: 5px;
        }
        .video_item_container.column:nth-child(${column}n) {
          margin-right: 0;
        }
        .video_item_container.main {
          width: 130px;
          height: 200px;
          margin-right: 15px;
        }
        .video_item_container.allVideo {
          vertical-align: inherit;
          width: 180px;
          height: 250px;
          margin-right: 23px;
          margin-bottom: 85px;
        }
        .video_item_container.allVideo:nth-child(6n) {
          margin-right: 0;
        }
        .video_item {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          position: relative;
          margin-bottom: 5px;
          opacity: ${opacity};
          transition: 0.5s opacity ease-in-out;
          overflow: hidden;
        }
        .video_item > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }

        .video_item.loaded {
          opacity: 1;
        }
        .video_item:last-child {
          margin-right: 0;
        }
        .video_item .like_btn {
          width: 20px;
          height: 18px;
          position: absolute;
          top: 5px;
          right: 5px;
        }
        .video_item .view_counter {
          position: absolute;
          bottom: 10px;
          left: 10px;
        }
        .video_time {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: #fff;
          font-size: 12px;
        }
        .video_item .view_counter .view_ico {
          width: 11px;
          height: 10px;
          display: inline-block;
          margin-right: 10px;
        }
        .video_item .view_counter .view_count {
          display: inline-block;
          color: #fff;
          font-size: 12px;
        }
        .video_info .title {
          display: block;
          font-size: 15px;
          color: #fff;
          margin-bottom: 5px;
          white-space: normal;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .video_info .name {
          display: block;
          font-size: 15px;
          font-weight: bold;
          color: #fff;
        }
        @media (max-width: 1366px) {
          .video_item_container.allVideo {
            width: 155px;
          }
          .video_item_container.allVideo:nth-child(6n) {
            margin-right: 23px;
          }
          .video_item_container.allVideo:nth-child(5n) {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

VideoItem.propTypes = {
  chatIcon: PropTypes.bool,
  viewIcon: PropTypes.bool,
  isViewInfo: PropTypes.bool,
  handleClick: PropTypes.func,
  openUserModal: PropTypes.func,
};

export default VideoItem;
