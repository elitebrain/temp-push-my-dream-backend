import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useDispatch } from "react-redux";

import NoParticipate from "./NoParticipate";
import NoVideo from "./NoVideo";
import VideoItem from "components/Common/VideoItem";
import List from "components/Common/List";

import { COLOR_696C8C } from "shared/constants/colors";

import add_circle_purple_ico from "public/assets/icon/add_circle_ico(purple).svg";
import { SET_VIDEOLIST_INDEX } from "store/reducers/video";
import {
  IMAGE_SERVER,
  USERVIDEO_THUMBNAIL_HEIGHT,
  USERVIDEO_THUMBNAIL_WIDTH,
} from "shared/constants/variables";

const MyVideoListTab = ({
  isParticipate,
  videoList,
  onToggleFlagByVideoNo,
  onRemoveVideo,
}) => {
  const dispatch = useDispatch();

  // 비디오 조회 시 비디오 인덱스 세팅
  const setIndexList = useCallback(() => {
    dispatch({
      type: SET_VIDEOLIST_INDEX,
      data: videoList.map((video) => video.video_no),
    });
  }, [dispatch, videoList]);

  // 업로드 아이템
  const preItemUpload = useMemo(
    () => (
      <Link href="/upload">
        <a className="PreItem_Upload">
          <img src={add_circle_purple_ico}></img>
          <style jsx>{`
            .PreItem_Upload {
              box-sizing: border-box;
              flex-basis: calc(100% / 3 - 10px);
              margin: 5px;
              width: 150px;
              display: inline-block;
              cursor: pointer;
              border-radius: 10px;
              border: 1px solid #696c8c;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-decoration: none;
            }

            .PreItem_Upload p {
              margin-top: 20px;
              padding: 0px 15px;
              font-size: 12px;
              line-height: 15px;
              color: ${COLOR_696C8C};
              text-align: center;
            }
          `}</style>
        </a>
      </Link>
    ),
    [isParticipate]
  );

  // 비디오 리스트 렌더링
  const renderVideoItem = useCallback(
    (video) => (
      <Link
        key={video.video_no}
        href={{
          pathname: "/videos/[type]",
          query: { currentVideoNo: video.video_no },
        }}
        as={{
          pathname: `/videos/my`,
          query: { currentVideoNo: video.video_no },
        }}
      >
        <a className="VideoItem" onClick={setIndexList}>
          <VideoItem
            chatIcon
            // likeIcon
            viewIcon
            isMyPage
            // isLiked
            video={video}
            style={{ width: "100%", height: "173px" }}
            handleLockVideo={onToggleFlagByVideoNo}
            handleRemoveVideo={onRemoveVideo}
            // onViewVideo={onViewVideo.bind(this, { videoNo: video.video_no })}
          />
          <style jsx>{`
            .VideoItem {
              flex-basis: calc(100% / 3 - 10px);
              box-sizing: border-box;
              margin: 5px;
            }
          `}</style>
        </a>
      </Link>
    ),
    []
  );

  /**
   * 최적화
   */

  const videoListMemo = useMemo(
    () =>
      videoList.map((video) => ({
        ...video,
        thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${USERVIDEO_THUMBNAIL_WIDTH}x${USERVIDEO_THUMBNAIL_HEIGHT}`,
      })),
    [videoList]
  );

  return (
    <div className="MyVideoList">
      <List
        empty={<NoVideo />}
        column
        list={videoListMemo}
        preItem={preItemUpload}
        renderItem={renderVideoItem}
      />

      <style jsx>{`
        .MyVideoList {
          padding-top: 15px;
        }
      `}</style>
    </div>
  );
};

MyVideoListTab.propTypes = {
  isParticipate: PropTypes.bool,
  videoList: PropTypes.array.isRequired,
  onToggleFlagByVideoNo: PropTypes.func,
  onRemoveVideo: PropTypes.func,
};

export default MyVideoListTab;
