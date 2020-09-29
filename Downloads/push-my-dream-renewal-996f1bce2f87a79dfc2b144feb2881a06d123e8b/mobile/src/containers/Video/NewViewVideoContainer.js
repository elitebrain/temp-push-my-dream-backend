import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import _ from "lodash/collection";

import VideoCommentContainer from "./VideoCommentContainer";

import NewViewVideo from "components/Video/NewViewVideo";
import SupportModal from "components/Common/Modal/SupportModal";

import { OPEN_MODAL } from "store/reducers/modal";
import {
  LIKE_VIDEO_REQUEST,
  GET_MORE_VIDEOLIST_REQUEST,
} from "store/reducers/video";
import { videoApi, userApi } from "shared/api";

export const NewViewVideoContext = createContext();

// videoNo,
// isPush,
// currentVideo: currentVideoInfo,
// totalPush,

const NewViewVideoContainer = ({
  type,
  initialVideoNo,
  initialVideo,
  isUserVideosPage = false,
}) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const category3List = useSelector((state) => state.common.category3List);
  const user_no = useSelector((state) => state.user.user_no);
  const isLoadingLike = useSelector((state) => state.video.isLoadingLike);
  const videoList = useSelector((state) => state.video.videoList);
  const videoIndex = useSelector((state) => state.video.videoIndex);
  const isLoadedMoreVideoList = useSelector(
    (state) => state.video.isLoadedMoreVideoList
  );

  const { isLoggedIn } = useSelector((state) => state.user, shallowEqual);

  const [videoNo, setVideoNo] = useState(Number(initialVideoNo));
  const [currentVideoInfo, setCurrentVideoInfo] = useState(initialVideo);
  const [totalPush, setTotalPush] = useState(null);
  const [isPush, setIsPush] = useState(null);
  const [error, setError] = useState(null);
  const [isOfficial, setIsOfficial] = useState(false);
  const [isViewComment, setIsViewComment] = useState(false);
  const [isLikedVideo, setIsLikedVideo] = useState(
    Boolean(currentVideoInfo && currentVideoInfo.active_log_no)
  );
  // 비디오 정보 여부
  const [isViewVideoInfo, setIsViewVideoInfo] = useState(
    Boolean(currentVideoInfo)
  );
  // 비디오 출력 여부
  const [isViewVideo, setIsViewVideo] = useState(Boolean(currentVideoInfo));

  const videoPlayerRef = useRef(null);

  useEffect(() => {
    setIsViewComment(Boolean(Router.query.isViewComment));
  }, [Router]);

  // 비디오 목록 더 조회할지 체크
  useEffect(() => {
    if (videoNo) {
      const indexInVideoList = videoList
        .map((video) => (video && video.video_no) || null)
        .indexOf(Number(videoNo));
      /**
       * 비디오 리스트 더불러오기를 진행중이면 다른 비디오를 넘겨도 다시 조회하지 않는다.
       * 즉, 비디오 리스트 더 불러오기를 마무리 해야 다시 이 로직이 실행된다.
       *  */

      if (
        // indexInVideoList > -1 &&
        videoList.length - indexInVideoList <= 5 &&
        videoList.length !== videoIndex.length &&
        !isLoadedMoreVideoList
      ) {
        dispatch({
          type: GET_MORE_VIDEOLIST_REQUEST,
          data: {
            fetchList: videoIndex.slice(
              videoList.length,
              videoList.length + 12
            ),
          },
        });
      }
    }
  }, [videoNo, videoList, videoIndex]);

  /**
   * 비디오 번호 변경 시 해당 비디오에 대한 정보 조회
   */
  useEffect(() => {
    let isCancelled = false;

    /**
     * 최신화
     */

    if (!isCancelled && currentVideoInfo) {
      getVideoInfo();
    }

    return function cleanup() {
      isCancelled = true;
    };

    async function getVideoInfo() {
      try {
        let isOpen = true;

        if (!isCancelled) {
          if (type !== "my") {
            const { data } = await videoApi.get(
              `/${currentVideoInfo.video_no}/is-open`
            );

            isOpen = data.isOpen;
          }

          if (!isOpen) {
            if (!isCancelled) {
              setError(2); // 존재하지 않는 비디오입니다. 다음 비디오로 이동
            }
          }

          // 현재 보고 있는 비디오 데이터 최신화
          else {
            // 유저에게 푸쉬가 가능하면 푸쉬버튼을 보여준다.
            if (currentVideoInfo) {
              const {
                data: { totalPush: _totalPush, isPush: _isPush },
              } = await userApi.get(
                `${currentVideoInfo && currentVideoInfo.USER.user_no}/is-push/${
                  currentVideoInfo.category_level4_no
                }`
              );
              if (!isCancelled) {
                setTotalPush(_totalPush);
                setIsPush(_isPush);

                setIsViewVideoInfo(true);
              }
            }
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
        }
      }
    }
  }, [dispatch, currentVideoInfo, user_no, type]);

  /**
   * 비디오 좋아요 최신화
   */
  useEffect(() => {
    const _currentVideo = _.find(
      videoList,
      (video) => video.video_no === Number(videoNo)
    );
    if (_currentVideo) {
      setCurrentVideoInfo(_currentVideo);

      setIsLikedVideo(Boolean(_currentVideo && _currentVideo.active_log_no));
    }
  }, [videoList]);

  /**
   * 댓글창 보기 토글
   */
  const onToggleViewComment = useCallback(() => {
    setIsViewComment((prev) => !prev);

    const query = Object.assign({}, Router.query);
    delete query.type;
    delete query.user_no;

    // 댓글창이 꺼져있으면 댓글창 오픈
    if (!query.isViewComment) {
      query.isViewComment = true;

      Router.push(
        {
          pathname: Router.pathname,
          query,
        },
        {
          pathname: Router.asPath.split("?")[0],
          query,
        },
        { shallow: true }
      );
    }
  }, [Router, type]);

  /**
   * 후원하기 모달창
   */
  const onViewSupportModal = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        custom: true,
        transparent: true,
        isViewCloseIcon: false,
        container: (
          <SupportModal
            currentVideo={currentVideoInfo}
            onToggleViewComment={onToggleViewComment}
          />
        ),
      },
    });
  }, [dispatch, currentVideoInfo]);

  /**
   * 푸쉬하기
   */
  const onPush = useCallback(
    (e) => {
      e.stopPropagation();

      /**
       * 미로그인 시
       */
      if (!isLoggedIn) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "로그인 후 이용가능합니다.",
            isViewClose: false,
            onClose() {
              Router.push({
                pathname: "/login",
                query: {
                  ref: Router.asPath,
                },
              });
            },
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
        return;
      }

      if (!isPush) {
        // todo 9월 21일 이후 if문 삭제
        // else 문이 default 되게 변경
        if (currentVideoInfo.category_level3_no === 63) {
          const category = _.find(
            category3List,
            (category) =>
              category.category_level3_no ===
              currentVideoInfo.category_level3_no
          );

          dispatch({
            type: OPEN_MODAL,
            data: {
              content: Boolean(category.is_push)
                ? "현재 카테고리의 영상은 푸쉬하기가 불가능합니다."
                : "9월 21일 부터 푸쉬 가능합니다.",
              isViewClose: false,
            },
          });
          return;
        } else {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: "현재 카테고리의 영상은 푸쉬하기가 불가능합니다.",
              isViewClose: false,
            },
          });
          return;
        }
      } else {
        console.log(currentVideoInfo);
        Router.push({
          pathname: "/push",
          query: {
            category4No: currentVideoInfo.category_level4_no,
            targetUserNo: currentVideoInfo.USER.user_no,
            videoNo: currentVideoInfo.video_no,
            ref: Router.asPath,
          },
        });
      }
    },
    [dispatch, Router, isPush, currentVideoInfo, isLoggedIn, category3List]
  );

  // 좋아요 기능
  const onLikeVideo = useCallback(
    (e) => {
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
            videoNo: currentVideoInfo.video_no,
            isLiked: !isLikedVideo,
          },
        });
      }
    },
    [
      isLoggedIn,
      dispatch,
      isLoadingLike,
      currentVideoInfo,
      isLikedVideo,
      Router,
    ]
  );

  /**
   * 비디오 변경
   */
  const onChangeVideo = useCallback(
    (_videoNo, video) => {
      setVideoNo(Number(_videoNo));
      setCurrentVideoInfo(video);
      setIsOfficial(video.category_level1_no === 4);
      setIsLikedVideo(Boolean(video && video.active_log_no));

      // 비디오 변경으로 인한 초기화
      setError(null);
      setTotalPush(null);
      setIsPush(null);

      /**
       * Router
       */
      const query = Object.assign({}, Router.query, {
        currentVideoNo: Number(_videoNo),
      });
      delete query.type;
      delete query.user_no;

      Router.replace(
        {
          pathname: Router.pathname,
          query,
        },
        {
          pathname: Router.asPath.split("?")[0],
          query,
        },
        { shallow: true }
      );
    },
    [Router]
  );

  // initialError = 1: 서버에서 오류가 발생하였습니다
  // initialError = 2: 비공개 또는 삭제된 비디오입니다.
  // initialError = 3: 존재하지 않는 비디오입니다
  // initialError = 4: 잘못된 접근입니다.

  return (
    <NewViewVideoContext.Provider
      value={{
        videoPlayerRef,
        type,
        isLikedVideo,
        videoNo,
        currentVideoInfo,
        totalPush,
        error,
        isViewVideoInfo,
        isViewVideo,
        onToggleViewComment,
        onViewSupportModal,
        onPush,
        onLikeVideo,
        onChangeVideo,
        setError,
        setCurrentVideoInfo,
        setIsViewVideoInfo,
        setIsViewVideo,
        isUserVideosPage,
      }}
    >
      <NewViewVideo />
      {isViewComment && <VideoCommentContainer videoNo={videoNo} />}
    </NewViewVideoContext.Provider>
  );
};

export default NewViewVideoContainer;
