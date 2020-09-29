import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import MyVideoListTab from "components/MyPage/MyPageIndex/MyProfileTab/MyVideoListTab";
import Loader from "components/Common/Loader";

import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";
import {
  LIKE_VIDEO_REQUEST,
  GET_MYVIDEOLIST_REQUEST,
  UPDATE_VIDEO_ISOPEN_REQUEST,
  DELETE_VIDEO_REQUEST,
} from "store/reducers/video";

const MyVideoListContainer = ({ category3No }) => {
  const dispatch = useDispatch();
  const { isLoadingLike, isMyVideoListLoaded, myVideoList } = useSelector(
    (state) => state.video
  );
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch({
        type: GET_MYVIDEOLIST_REQUEST,
        payload: {
          category3No,
        },
      });
    }
  }, [isLoggedIn, dispatch, category3No]);

  // 비디오 오픈 공개
  const onToggleFlagByVideoNo = useCallback(
    (e, videoNo, flag) => {
      e.preventDefault();
      e.stopPropagation();

      const originVideo =
        myVideoList.filter((video) => video.video_no === videoNo)[0] || null;

      // 신고잠근인지 체크
      if (originVideo && originVideo.flag === 2) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <>
                <p>신고로 인한 비디오 상태는</p>
                <p>공개로 전환될 수 없습니다.</p>
                <p>관리자에게 문의해주세요.</p>
              </>
            ),
          },
        });
      }

      dispatch({
        type: UPDATE_VIDEO_ISOPEN_REQUEST,
        data: {
          videoNo,
          flag,
        },
      });
    },
    [dispatch, myVideoList]
  );

  // 비디오 삭제
  const onRemoveVideo = useCallback(
    (e, videoNo) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "영상을 삭제하시겠습니까?",
          confirmText: "삭제",
          isViewClose: true,
          onConfirm: () => {
            dispatch({
              type: DELETE_VIDEO_REQUEST,
              data: {
                videoNo,
                success() {
                  dispatch({ type: CLOSE_MODAL });
                },
              },
            });
          },
        },
      });
    },
    [dispatch]
  );

  const onViewVideo = useCallback((videoNo) => {
    console.log(videoNo);
  });

  // fetch 시 로딩
  if (isMyVideoListLoaded) {
    return (
      <div className="LoaderContainer">
        <Loader />
        <style jsx>{`
          .LoaderContainer {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }

  console.log("myVideoList", myVideoList);
  return (
    <MyVideoListTab
      videoList={myVideoList.filter((v) => [0, 1, 2].indexOf(v.flag) !== -1)}
      onToggleFlagByVideoNo={onToggleFlagByVideoNo}
      onRemoveVideo={onRemoveVideo}
      onViewVideo={onViewVideo}
    />
  );
};

MyVideoListContainer.propTypes = {
  category3No: PropTypes.number,
};

export default MyVideoListContainer;
