import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import _ from "lodash/object";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  AiFillLock,
  AiFillUnlock,
  AiFillDelete,
  AiOutlineEllipsis,
  AiTwotoneEdit,
} from "react-icons/ai";

import gate_videoList_img from "public/assets/image/gate_videoList_img.jpg";
import heart_none_ico from "public/assets/image/heart_none_ico(white).png";
import heart_active_ico from "public/assets/icon/heart_active_ico(purple).svg";
import reple_ico from "public/assets/image/comment_btn(white).png";
import view_ico from "public/assets/image/view_eye.png";
import person_ico from "public/assets/image/person_none(white).png";
import LazyImage from "../LazyImage";
import {
  WHITE_COLOR,
  BACKGROUND_BLACK_COLOR,
  COLOR_696C8C,
} from "shared/constants/colors";
import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";
import { numberWithCommasAndCheckNone } from "shared/functions";

/*
  chatIcon : 채트 아이콘 표시 여부
  viewIcon : 조회수 아이콘 표시 여부
  likeIcon : 좋아요수 아이콘 표시 여부
  followIcon : 팔로우수 아이콘 표시 여부
  isViewInfo : 비디오 상세정보 표시 여부 (비디오 하단에 표시)
  isLiked : like 기능 활성화 여부 (비디오 우측 상단 위에 표시)
  className : 커스텀 클래스
  isVideoTime : 비디오 우측 하단에 비디오 시간 표시 여부
*/
const VideoItem = React.forwardRef(
  (
    {
      chatIcon,
      viewIcon,
      likeIcon,
      followIcon,
      isViewInfo,
      isLiked,
      isMyPage,
      className,
      isVideoTime,
      vertical,
      horizontal,
      column,
      style,
      onLikeVideo,
      onViewVideo,
      handleLockVideo,
      handleRemoveVideo,
      video = {},
      ...rest
    },
    ref
  ) => {
    // const image = chatIcon
    //   ? reple_ico
    //   : viewIcon
    //   ? view_ico
    //   : personIcon
    //   ? person_ico
    //   : "";
    const agent = useSelector((state) => state.common.agent);
    // 메뉴 생략 여부
    const [isEllipsis, setIsEllipsis] = useState(true);
    const [isLoadedFile, setIsLoadedFile] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
      const image = new Image();

      image.src = video.thumbnail;

      image.onload = function () {
        setIsLoadedFile(true);
      };

      return () => {
        // ima;
        image.onload = null;
      };
    }, [video.thumbnail]);

    const outterClassName = `video_item_container${column ? " column" : ""}${
      horizontal ? " horizontal" : ""
    }${vertical ? " vertical" : ""}${
      String(agent).indexOf("rv:11.0") !== -1 ? " verticalFlexGap" : ""
    }${className ? ` ${className}` : ""}`;

    const itemClassName = `video_item${isLoadedFile ? " loaded" : ""}`;

    /**
     * 메뉴 생략 여부
     */
    const onClickEllipsisMenu = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsEllipsis((prev) => !prev);
    }, []);

    const _handleLockDisabled = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "신고로 인해 잠긴 영상 입니다. 관리자에게 문의해주세요.",
          confirmText: "확인",
          isViewClose: false,
        },
      });
    };

    return (
      <div
        ref={ref}
        className={outterClassName}
        onClick={onViewVideo && onViewVideo.bind(this, video.video_no)}
        style={style}
      >
        <div className="gradient_cover" />
        <div className={itemClassName} style={style}>
          <LazyImage
            width="100%"
            height="100%"
            // src={video.thumbnail}
            src={video.thumbnail}
          />
          {/* <div className="like_btn">
        <img src={heart_none_ico} alt="like_ico" width="100%" height="100%" />
      </div> */}

          {isMyPage && (
            <div className="icons">
              {video.flag === 0 ? ( // 공개
                // <img className="icon lock" src={AiFillUnlock} alt="unlock_icon" />

                <AiFillUnlock
                  style={{ width: "24px", height: "24px", color: "#fff" }}
                  onClick={(e) => {
                    handleLockVideo(e, video.video_no, 1);
                  }}
                />
              ) : video.flag === 1 ? (
                // <img className="icon lock" src={AiFillLock} alt="lock_icon" />

                <AiFillLock
                  style={{ width: "24px", height: "24px", color: "#666" }}
                  onClick={(e) => {
                    handleLockVideo(e, video.video_no, 0);
                  }}
                />
              ) : (
                <AiFillLock
                  style={{ width: "24px", height: "24px", color: "#f00" }}
                  onClick={_handleLockDisabled}
                />
              )}

              <div className="EllipsisContainer">
                <AiOutlineEllipsis
                  className="EllipsisIcon"
                  onClick={onClickEllipsisMenu}
                />
                {!isEllipsis && (
                  <div className="EllipsisMenu">
                    <div
                      className="EllipsisMenu_Li"
                      onClick={(e) => handleRemoveVideo(e, video.video_no)}
                    >
                      <AiFillDelete className="EllipsisMenu_Li_Icon" />
                      <span>삭제</span>
                    </div>
                    <Link
                      href="/video/[video_no]/edit"
                      as={`/video/${video.video_no}/edit`}
                    >
                      <div className="EllipsisMenu_Li">
                        <AiTwotoneEdit className="EllipsisMenu_Li_Icon" />
                        <span>수정</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* {isLiked && (
            <div
              className="like_btn"
              onClick={(e) =>
                onLikeVideo(e, {
                  videoNo: video.video_no,
                  isLiked: !video.is_liked,
                })
              }
            >
              <img
                src={
                  _.has(video, "is_liked") && video.is_liked
                    ? heart_active_ico
                    : heart_none_ico
                }
                alt="heart_ico"
                width="100%"
                height="auto"
              />
            </div>
          )} */}
          <div className="view_counter">
            {chatIcon && (
              <div>
                <span className="view_ico">
                  <img
                    src={reple_ico}
                    alt="reple_ico"
                    width="100%"
                    height="auto"
                  />
                </span>
                <span className="view_count">
                  {numberWithCommasAndCheckNone(
                    video && video.COUNT && video.COUNT.count_comment
                  )}
                </span>
              </div>
            )}
            {followIcon && (
              <div>
                <span className="view_ico">
                  <img
                    src={person_ico}
                    alt="person_ico"
                    width="100%"
                    height="auto"
                  />
                </span>
                <span className="view_count">
                  {numberWithCommasAndCheckNone(
                    video && video.COUNT && video.USER.COUNT.count_follower
                  )}
                </span>
              </div>
            )}
            {/* {likeIcon && (
              <div>
                <span className="view_ico">
                  <img
                    src={heart_none_ico}
                    alt="heart_none_ico"
                    width="100%"
                    height="auto"
                  />
                </span>
                <span className="view_count">
                  {numberWithCommasAndCheckNone(
                    video && video.COUNT && video.COUNT.count_like
                  )}
                </span>
              </div>
            )} */}
            {viewIcon && (
              <div>
                <span className="view_ico">
                  <img
                    src={view_ico}
                    alt="view_ico"
                    width="100%"
                    height="auto"
                  />
                </span>
                <span className="view_count">
                  {numberWithCommasAndCheckNone(
                    video && video.COUNT && video.COUNT.count_view
                  )}
                </span>
              </div>
            )}
          </div>
          {isVideoTime && <span className="video_time">3:03</span>}
        </div>
        {isViewInfo && (
          <div className="video_info">
            <span className="title">여름휴가 보내러 왔어요</span>
            <span className="name">손예진</span>
          </div>
        )}
        <style jsx>{`
          .EllipsisContainer {
            float: right;
            position: relative;
            width: 24px;
            height: 24px;
          }
          .EllipsisContainer :global(.EllipsisIcon) {
            width: 100%;
            height: 100%;

            transform: rotate(90deg);

            color: #ffffff;
          }

          .EllipsisContainer .EllipsisMenu {
            position: absolute;
            top: 0;
            right: 32px;
            width: 55px;
            height: 50px;
            border-radius: 5px;
            background-color: ${BACKGROUND_BLACK_COLOR};
            z-index: 1;
            padding: 5px;
            box-sizing: border-box;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }

          .EllipsisContainer .EllipsisMenu .EllipsisMenu_Li {
            flex: 1;
            color: ${COLOR_696C8C};
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            text-decoration: none;
          }

          .EllipsisContainer
            .EllipsisMenu
            .EllipsisMenu_Li
            :global(.EllipsisMenu_Li_Icon) {
            color: ${COLOR_696C8C};

            height: 100%;
            display: flex;
            align-items: center;
          }

          .EllipsisMenu .EllipsisMenu_Li span {
            line-height: 100%;
          }

          .icons {
            position: absolute;
            width: calc(100% - 20px);
            height: 24px;
            top: 12px;
            left: 10px;
          }
          .icons > svg,
          .icons > img {
            position: absolute;
            width: 24px;
            height: 24px;
            top: 0;
          }
          .icons .trash {
            right: 0;
          }
          .icons .lock {
            left: 0;
          }
          .video_item_container {
            width: 110px;
            /*height: 237px;*/
            display: inline-block;
            vertical-align: top;
            margin-right: 7px;
            cursor: pointer;
            background-color: #444;

            position: relative;
          }
          .video_item_container > .gradient_cover {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40%;
            background: linear-gradient(
              180deg,
              rgba(30, 30, 37, 0) 0%,
              rgba(30, 30, 37, 0.4) 51.56%,
              rgba(30, 30, 37, 0.5) 100%
            );
            z-index: 1;
          }
          .video_item_container.horizontal {
            /*margin-bottom: 10px;*/
            height: 168px;
          }

          .video_item_container.horizontal:first-of-type {
            margin-left: 20px;
          }

          .video_item_container.horizontal:last-of-type {
            margin-right: 20px;
          }
          .video_item_container.vertical {
            display: block;
            /*flex-basis: 120px;*/

            width: 120px;
            height: 190px;
            margin: initial;
            box-sizing: border-box;
            /*height: 190px;*/
            /*margin: 10px 10px;*/
            /*flex: 1;*/
             {
              /* height: 50px; */
            }
          }
          /*
        .video_item_container.vertical.verticalFlexGap {
          margin: 2.5px;
        }
*/
          .video_item_container.column {
            box-sizing: border-box;
            flex-basis: calc(100% / ${column} - 10px);
            margin: 5px;
          }

          .video_item {
            width: 100%;
            height: 100%;

            position: relative;
            opacity: 0;
            transition: 0.5s all ease-in-out;
          }

          .video_item.loaded {
            opacity: 1;
          }
          .video_item:last-child {
            margin-right: 0;
          }
          .video_item .like_btn {
            z-index: 1;
            width: 20px;
            height: 18px;
            position: absolute;
            top: 10px;
            right: 10px;
          }
          .video_item .view_counter {
            z-index: 1;
            position: absolute;
            bottom: 10px;
            left: 10px;
          }
          .video_time {
            position: absolute;
            bottom: 10px;
            right: 10px;
            color: ${WHITE_COLOR};
            font-size: 11px;
          }
          .video_item .view_counter .view_ico {
            width: 11px;
            height: 10px;
            display: inline-block;
            margin-right: 10px;
          }
          .video_item .view_counter .view_count {
            display: inline-block;
            color: ${WHITE_COLOR};
            font-size: 11px;
          }
          .video_info .title {
            display: block;
            font-size: 15px;
            color: ${WHITE_COLOR};
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
            font-size: 13px;
            color: #878792;
          }
        `}</style>
      </div>
    );
  }
);

VideoItem.propTypes = {
  chatIcon: PropTypes.bool,
  viewIcon: PropTypes.bool,
  likeIcon: PropTypes.bool,
  isViewInfo: PropTypes.bool,
  isLiked: PropTypes.bool,
  isMyPage: PropTypes.bool,
  isVideoTime: PropTypes.bool,
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  style: PropTypes.object,
  column: PropTypes.number,
  className: PropTypes.string,
  onLikeVideo: PropTypes.func,
  onViewVideo: PropTypes.func,
  handleLockVideo: PropTypes.func,
  handleRemoveVideo: PropTypes.func,
  video: PropTypes.object,
  rest: PropTypes.object,
};

export default React.memo(VideoItem);
