import React, { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import List from "components/Common/List";
import Loader from "components/Common/Loader";
import VideoItem from "components/Common/VideoItem";

import { OPEN_MODAL } from "store/reducers/modal";
import {
  LIKE_VIDEO_REQUEST,
  GET_USER_VIDEOLIST_REQUEST,
  SET_VIDEOLIST_INDEX,
  SET_VIDEOLIST,
} from "store/reducers/video";
import { COLOR_696C8C } from "shared/constants/colors";
import {
  IMAGE_SERVER,
  USERVIDEO_THUMBNAIL_WIDTH,
  USERVIDEO_THUMBNAIL_HEIGHT,
} from "shared/constants/variables";

const VideoListByUserContainer = ({ currentUser, category3No }) => {
  const Router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingLike, userVideoList, isUserVideoListLoaded } = useSelector(
    (state) => state.video
  );
  const dispatch = useDispatch();
  // 유저의 신규 비디오 리스트 조회
  useEffect(() => {
    if (category3No && currentUser.user_no) {
      dispatch({
        type: GET_USER_VIDEOLIST_REQUEST,
        data: {
          userNo: currentUser.user_no,
          category3No,
        },
      });
    }
  }, [currentUser.user_no, category3No]);

  // 비디오 영상 보기
  const onViewVideo = useCallback(
    ({ videoNo }) => {
      // Router.push(
      //   {
      //     pathname: "/user/[user_no]/videos",
      //     query: {
      //       currentVideoNo: videoNo,
      //     },
      //   },
      //   {
      //     pathname: `/user/${currentUser.user_no}/videos`,
      //     query: {
      //       currentVideoNo: videoNo,
      //     },
      //   }
      // );

      window.location.href = `/user/${currentUser.user_no}/videos?currentVideoNo=${videoNo}&category_no=${category3No}`;

      // window.location.href = `/videos/userVideo?currentVideoNo=${videoNo}&user=${currentUser.user_no}`;
    },
    [Router, dispatch, currentUser.user_no, category3No]
  );

  // 좋아요 버튼 클릭
  const onLikeVideo = useCallback(
    (e, { videoNo, isLiked }) => {
      // 버블링 방지
      e.stopPropagation();

      // 미로그인시
      if (!isLoggedIn) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "로그인 후 이용가능합니다.",
            isViewClose: false,
            onConfirm() {
              Router.push({
                pathname: "/login",
                query: {
                  ref: Router.asPath,
                },
              });
            },
          },
        });
      }

      // 이전 좋아요 기능의 응답을 받지 못했을 때는 새로운 좋아요 기능을 적용하지 않는다.
      if (!isLoadingLike) {
        dispatch({
          type: LIKE_VIDEO_REQUEST,
          payload: {
            videoNo,
            isLiked,
          },
        });
      }
    },
    [isLoggedIn, dispatch, isLoadingLike, Router]
  );

  /**
   * 최적화
   */
  const userVideoListMemo = useMemo(
    () =>
      userVideoList.map((userVideo) => ({
        ...userVideo,
        thumbnail: `${IMAGE_SERVER}?file=${userVideo.thumbnail}&size=${USERVIDEO_THUMBNAIL_WIDTH}x${USERVIDEO_THUMBNAIL_HEIGHT}`,
      })),
    [userVideoList]
  );

  return isUserVideoListLoaded ? (
    <div className="LoaderContainer">
      <Loader />
      <style jsx>{`
        .LoaderContainer {
          width: 100%;
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  ) : (
    <List
      column
      list={userVideoListMemo}
      style={{ margin: "-5px" }}
      renderItem={(video) => (
        <VideoItem
          key={video.video_no}
          viewIcon
          isLiked
          video={video}
          column={3}
          style={{ height: "173px" }}
          onViewVideo={onViewVideo.bind(this, { videoNo: video.video_no })}
          onLikeVideo={onLikeVideo}
        />
      )}
      style={{ marginTop: "10px" }}
      empty={
        <div className="empty_push">
          비디오가 존재하지 않습니다.
          <style jsx>{`
            .empty_push {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              margin-top: -10px;
              width: 100%;
              height: 300px;
              line-height: 300px;
              text-align: center;
              font-size: 18px;
              color: ${COLOR_696C8C};
            }
          `}</style>
        </div>
      }
    />
  );
};

VideoListByUserContainer.propTypes = {
  currentUser: PropTypes.object,
  category3No: PropTypes.number,
};

export default VideoListByUserContainer;
