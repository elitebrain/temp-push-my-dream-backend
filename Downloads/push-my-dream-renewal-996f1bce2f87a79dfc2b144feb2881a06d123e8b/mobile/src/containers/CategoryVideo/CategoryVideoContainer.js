import React, { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import css from "styled-jsx/css";
import PropTypes from "prop-types";

import CategoryIndex from "components/Category/CategoryIndex";
import Loader from "components/Common/Loader";

import { OPEN_MODAL } from "store/reducers/modal";
import {
  GET_NEW_CATEGORY_VIDEO_REQUEST,
  GET_REALTIME_SURGE_PUSH_VIDEO_REQUEST,
  GET_HOT_PUSH_VIDEO_REQUEST,
  GET_SEASON_PUSH_VIDEO_REQUEST,
  // GET_HOT_TALK_CATEGORY_VIDEO_REQUEST,
  // LIKE_CATEGORY_VIDEO_REQUEST,
  // GET_REALTIME_SURGE_LIKE_VIDEO_REQUEST,
  // GET_REALTIME_SURGE_TALK_VIDEO_REQUEST,
  // GET_HOT_LIKE_CATEGORY_VIDEO_REQUEST,
  // GET_HOT_VIEW_CATEGORY_VIDEO_REQUEST,
  // GET_SEASON_LIKE_CATEGORY_VIDEO_REQUEST,
  // GET_SEASON_VIEW_CATEGORY_VIDEO_REQUEST,
} from "store/reducers/categoryVideo";
import { SET_VIDEOLIST_INDEX } from "store/reducers/video";
import { SET_CATEGORY_SCROLL } from "store/reducers/scroll";

import {
  MORE_VIDEO_COUNT,
  NEW_VIDEO_MORE_COUNT,
} from "shared/constants/variables";

const LoaderWrapper = css`
  .loaderWrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CategoryVideoContainer = ({ category_no, banner, isPush }) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const {
    isLoadedMain,
    // isLoadedMoreRealtimeSurgeLikeVideo,
    // realtimeSurgeLikeVideoIndex,
    // isLoadedMoreRealtimeSurgeTalkVideo,
    // realtimeSurgeTalkVideoIndex,
    // isLoadedMoreHotLikeVideo,
    // hotLikeVideoIndex,
    // isLoadedMoreHotViewVideo,
    // hotViewVideoIndex,
    // isLoadedMoreHotTalkVideo,
    // hotTalkVideoIndex,
    // isLoadedMoreSeasonLikeVideo,
    // seasonLikeVideoIndex,
    // isLoadedMoreSeasonViewVideo,
    // seasonViewVideoIndex,
    isLoadedMoreRealtimeSurgePushVideo,
    realtimeSurgePushVideoIndex,
    isLoadedMoreHotPushVideo,
    hotPushVideoIndex,
    isLoadedMoreSeasonPushVideo,
    seasonPushVideoIndex,
    isLoadedMoreNewVideo,
    newVideoIndex,
    isLoadingLike,
  } = useSelector(
    (state) => ({
      isLoadedMain: state.categoryVideo.isLoadedMain,
      // isLoadedMoreRealtimeSurgeLikeVideo:
      //   state.categoryVideo.isLoadedMoreRealtimeSurgeLikeVideo,
      // realtimeSurgeLikeVideoIndex:
      //   state.categoryVideo.realtimeSurgeLikeVideoIndex,
      // isLoadedMoreRealtimeSurgeTalkVideo:
      //   state.categoryVideo.isLoadedMoreRealtimeSurgeTalkVideo,
      // realtimeSurgeTalkVideoIndex:
      //   state.categoryVideo.realtimeSurgeTalkVideoIndex,
      // isLoadedMoreHotLikeVideo: state.categoryVideo.isLoadedMoreHotLikeVideo,
      // hotLikeVideoIndex: state.categoryVideo.hotLikeVideoIndex,
      // isLoadedMoreHotViewVideo: state.categoryVideo.isLoadedMoreHotViewVideo,
      // hotViewVideoIndex: state.categoryVideo.hotViewVideoIndex,
      // isLoadedMoreHotTalkVideo: state.categoryVideo.isLoadedMoreHotTalkVideo,
      // hotTalkVideoIndex: state.categoryVideo.hotTalkVideoIndex,
      // isLoadedMoreSeasonLikeVideo:
      //   state.categoryVideo.isLoadedMoreSeasonLikeVideo,
      // seasonLikeVideoIndex: state.categoryVideo.seasonLikeVideoIndex,
      // isLoadedMoreSeasonViewVideo:
      //   state.categoryVideo.isLoadedMoreSeasonViewVideo,
      // seasonViewVideoIndex: state.categoryVideo.seasonViewVideoIndex,
      isLoadedMoreRealtimeSurgePushVideo:
        state.categoryVideo.isLoadedMoreRealtimeSurgePushVideo,
      realtimeSurgePushVideoIndex:
        state.categoryVideo.realtimeSurgePushVideoIndex,
      isLoadedMoreHotPushVideo: state.categoryVideo.isLoadedMoreHotPushVideo,
      hotPushVideoIndex: state.categoryVideo.hotPushVideoIndex,
      isLoadedMoreSeasonPushVideo:
        state.categoryVideo.isLoadedMoreSeasonPushVideo,
      seasonPushVideoIndex: state.categoryVideo.seasonPushVideoIndex,
      isLoadedMoreNewVideo: state.categoryVideo.isLoadedMoreNewVideo,
      newVideoIndex: state.categoryVideo.newVideoIndex,
      isLoadingLike: state.categoryVideo.isLoadingLike,
    }),

    shallowEqual
  );

  // const realtimeSurgeLikeVideoList = useSelector(
  //   (state) => state.categoryVideo.realtimeSurgeLikeVideoList
  // );
  // const realtimeSurgeTalkVideoList = useSelector(
  //   (state) => state.categoryVideo.realtimeSurgeTalkVideoList
  // );
  // const hotLikeVideoList = useSelector(
  //   (state) => state.categoryVideo.hotLikeVideoList
  // );
  // const hotViewVideoList = useSelector(
  //   (state) => state.categoryVideo.hotViewVideoList
  // );
  // const hotTalkVideoList = useSelector(
  //   (state) => state.categoryVideo.hotTalkVideoList
  // );
  // const seasonLikeVideoList = useSelector(
  //   (state) => state.categoryVideo.seasonLikeVideoList
  // );
  // const seasonViewVideoList = useSelector(
  //   (state) => state.categoryVideo.seasonViewVideoList
  // );

  const realtimeSurgePushVideoList = useSelector(
    (state) => state.categoryVideo.realtimeSurgePushVideoList
  );
  const hotPushVideoList = useSelector(
    (state) => state.categoryVideo.hotPushVideoList
  );
  const seasonPushVideoList = useSelector(
    (state) => state.categoryVideo.seasonPushVideoList
  );
  const newVideoList = useSelector((state) => state.categoryVideo.newVideoList);

  const {
    documentScrollInCategory,
    realtimeSurgePushScrollInCategory,
    hotPushScrollInCategory,
    seasonPushScrollInCategory,
    // realtimeSurgeLikeScrollInCategory,
    // realtimeSurgeTalkTalkScrollInCategory,
    // hotLikeScrollInCategory,
    // hotViewScrollInCategory,
    // hotTalkScrollInCategory,
    // seasonLikeScrollInCategory,
    // seasonViewScrollInCategory,
  } = useSelector(
    (state) => ({
      documentScrollInCategory: state.scroll.documentScrollInCategory,
      realtimeSurgePushScrollInCategory:
        state.scroll.realtimeSurgePushScrollInCategory,
      hotPushScrollInCategory: state.scroll.hotPushScrollInCategory,
      seasonPushScrollInCategory: state.scroll.seasonPushScrollInCategory,
      // realtimeSurgeLikeScrollInCategory:
      //   state.scroll.realtimeSurgeLikeScrollInCategory,
      // realtimeSurgeTalkTalkScrollInCategory:
      //   state.scroll.realtimeSurgeTalkTalkScrollInCategory,
      // hotLikeScrollInCategory: state.scroll.hotLikeScrollInCategory,
      // hotViewScrollInCategory: state.scroll.hotViewScrollInCategory,
      // hotTalkScrollInCategory: state.scroll.hotTalkScrollInCategory,
      // seasonLikeScrollInCategory: state.scroll.seasonLikeScrollInCategory,
      // seasonViewScrollInCategory: state.scroll.seasonViewScrollInCategory,
    }),

    shallowEqual
  );

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const documentRef = useRef();
  const realtimeSurgePushRef = useRef();
  const hotPushRef = useRef();
  const seasonPushRef = useRef();
  // const realtimeSurgeLikeRef = useRef();
  // const realtimeSurgeTalkRef = useRef();
  // const hotLikeRef = useRef();
  // const hotViewRef = useRef();
  // const hotTalkRef = useRef();
  // const seasonLikeRef = useRef();
  // const seasonViewRef = useRef();

  // 페이지 첫 진입 시 scoll 위치 지정
  useEffect(() => {
    // if (realtimeSurgeLikeRef.current) {
    //   realtimeSurgeLikeRef.current.container.current.scrollLeft = realtimeSurgeLikeScrollInCategory;
    // }
    // if (realtimeSurgeTalkRef.current) {
    //   realtimeSurgeTalkRef.current.container.current.scrollLeft = realtimeSurgeTalkTalkScrollInCategory;
    // }
    // if (hotLikeRef.current) {
    //   hotLikeRef.current.container.current.scrollLeft = hotLikeScrollInCategory;
    // }
    // if (hotViewRef.current) {
    //   hotViewRef.current.container.current.scrollLeft = hotViewScrollInCategory;
    // }
    // if (hotTalkRef.current) {
    //   hotTalkRef.current.container.current.scrollLeft = hotTalkScrollInCategory;
    // }
    // if (seasonLikeRef.current) {
    //   seasonLikeRef.current.container.current.scrollLeft = seasonLikeScrollInCategory;
    // }
    // if (seasonViewRef.current) {
    //   seasonViewRef.current.container.current.scrollLeft = seasonViewScrollInCategory;
    // }

    if (realtimeSurgePushRef.current) {
      realtimeSurgePushRef.current.container.current.scrollLeft = realtimeSurgePushScrollInCategory;
    }
    if (hotPushRef.current) {
      hotPushRef.current.container.current.scrollLeft = hotPushScrollInCategory;
    }
    if (seasonPushRef.current) {
      seasonPushRef.current.container.current.scrollLeft = seasonPushScrollInCategory;
    }
    if (documentRef.current) {
      documentRef.current.scrollTo(0, documentScrollInCategory);
    }
  }, [category_no]);

  // new video 상하 인피니티 스크롤
  useEffect(() => {
    let debounce;
    if (documentRef.current) {
      documentRef.current.addEventListener("scroll", scrollEvent);
    }

    return function cleanup() {
      if (documentRef.current) {
        documentRef.current.removeEventListener("scroll", scrollEvent);
      }
      clearTimeout(debounce);
    };

    function scrollEvent(e) {
      clearTimeout(debounce);

      debounce = setTimeout(() => {
        const {
          srcElement: { scrollTop, clientHeight, scrollHeight },
        } = e;

        if (
          scrollHeight - (scrollTop + clientHeight) < 200 &&
          !isLoadedMoreNewVideo &&
          newVideoIndex.length !== newVideoList.length
        ) {
          const size = newVideoList.length;
          dispatch({
            type: GET_NEW_CATEGORY_VIDEO_REQUEST,
            data: {
              fetchList: newVideoIndex.slice(size, size + NEW_VIDEO_MORE_COUNT),
            },
          });
        }
      }, 100);
    }
  }, [isLoadedMain, newVideoIndex, newVideoList, isLoadedMoreNewVideo]);

  // // 좋아요 버튼 클릭
  // const onLikeVideo = useCallback(
  //   (e, { videoNo, isLiked }) => {
  //     // 버블링 방지
  //     e.stopPropagation();

  //     // 미로그인시
  //     if (!isLoggedIn) {
  //       return dispatch({
  //         type: OPEN_MODAL,
  //         data: {
  //           content: "로그인 후 이용가능합니다.",
  //           isViewClose: false,
  //           onConfirm() {
  //             Router.push({
  //               pathname: "/login",
  //               query: {
  //                 ref: Router.asPath,
  //               },
  //             });
  //           },
  //         },
  //       });
  //     }

  //     // 이전 좋아요 기능의 응답을 받지 못했을 때는 새로운 좋아요 기능을 적용하지 않는다.
  //     if (!isLoadingLike) {
  //       dispatch({
  //         type: LIKE_CATEGORY_VIDEO_REQUEST,
  //         payload: {
  //           videoNo,
  //           isLiked,
  //         },
  //       });
  //     }
  //   },
  //   [isLoggedIn, dispatch, isLoadingLike, Router]
  // );

  // 스크롤 이벤트
  const onScroll = useCallback(
    (type, left, top, width) => {
      // new 타입은 상하 스크롤 이기 때문에 window scroll에 영향
      if (type === "realtimeSurgePush") {
        if (
          width - 200 <=
            realtimeSurgePushRef.current.container.current.offsetWidth + left &&
          !isLoadedMoreRealtimeSurgePushVideo &&
          realtimeSurgePushVideoIndex.length !==
            realtimeSurgePushVideoList.length
        ) {
          const size = realtimeSurgePushVideoList.length;
          dispatch({
            type: GET_REALTIME_SURGE_PUSH_VIDEO_REQUEST,
            data: {
              fetchList: realtimeSurgePushVideoIndex.slice(
                size,
                size + MORE_VIDEO_COUNT
              ),
            },
          });
        }
      } else if (type === "hotPush") {
        if (
          width - 200 <=
            hotPushRef.current.container.current.offsetWidth + left &&
          !isLoadedMoreHotPushVideo &&
          hotPushVideoIndex.length !== hotPushVideoList.length
        ) {
          const size = hotPushVideoList.length;
          dispatch({
            type: GET_HOT_PUSH_VIDEO_REQUEST,
            data: {
              fetchList: hotPushVideoIndex.slice(size, size + MORE_VIDEO_COUNT),
            },
          });
        }
      } else if (type === "seasonPush") {
        if (
          width - 200 <=
            seasonPushRef.current.container.current.offsetWidth + left &&
          !isLoadedMoreSeasonPushVideo &&
          seasonPushVideoIndex.length !== seasonPushVideoList.length
        ) {
          const size = seasonPushVideoList.length;
          dispatch({
            type: GET_SEASON_PUSH_VIDEO_REQUEST,
            data: {
              fetchList: seasonPushVideoIndex.slice(
                size,
                size + MORE_VIDEO_COUNT
              ),
            },
          });
        }
      }

      // if (type === "realtimeSurgeLike") {
      //   if (
      //     width - 200 <=
      //       realtimeSurgeLikeRef.current.container.current.offsetWidth + left &&
      //     !isLoadedMoreRealtimeSurgeLikeVideo &&
      //     realtimeSurgeLikeVideoIndex.length !==
      //       realtimeSurgeLikeVideoList.length
      //   ) {
      //     const size = realtimeSurgeLikeVideoList.length;
      //     dispatch({
      //       type: GET_REALTIME_SURGE_LIKE_VIDEO_REQUEST,
      //       data: {
      //         fetchList: realtimeSurgeLikeVideoIndex.slice(
      //           size,
      //           size + MORE_VIDEO_COUNT
      //         ),
      //       },
      //     });
      //   }
      // }
      // if (type === "realtimeSurgeTalk") {
      //   if (
      //     width - 200 <=
      //       realtimeSurgeTalkRef.current.container.current.offsetWidth + left &&
      //     !isLoadedMoreRealtimeSurgeTalkVideo &&
      //     realtimeSurgeTalkVideoIndex.length !==
      //       realtimeSurgeTalkVideoList.length
      //   ) {
      //     const size = realtimeSurgeTalkVideoList.length;
      //     dispatch({
      //       type: GET_REALTIME_SURGE_TALK_VIDEO_REQUEST,
      //       data: {
      //         fetchList: realtimeSurgeTalkVideoIndex.slice(
      //           size,
      //           size + MORE_VIDEO_COUNT
      //         ),
      //       },
      //     });
      //   }
      // }
      // else if (type === "hotLike") {
      //   if (
      //     width - 200 <=
      //       hotLikeRef.current.container.current.offsetWidth + left &&
      //     !isLoadedMoreHotLikeVideo &&
      //     hotLikeVideoIndex.length !== hotLikeVideoList.length
      //   ) {
      //     const size = hotLikeVideoList.length;
      //     dispatch({
      //       type: GET_HOT_LIKE_CATEGORY_VIDEO_REQUEST,
      //       data: {
      //         fetchList: hotLikeVideoIndex.slice(size, size + MORE_VIDEO_COUNT),
      //       },
      //     });
      //   }
      // }
      // else if (type === "hotView") {
      //   if (
      //     width - 200 <=
      //       hotViewRef.current.container.current.offsetWidth + left &&
      //     !isLoadedMoreHotViewVideo &&
      //     hotViewVideoIndex.length !== hotViewVideoList.length
      //   ) {
      //     const size = hotViewVideoList.length;
      //     dispatch({
      //       type: GET_HOT_VIEW_CATEGORY_VIDEO_REQUEST,
      //       data: {
      //         fetchList: hotViewVideoIndex.slice(size, size + MORE_VIDEO_COUNT),
      //       },
      //     });
      //   }
      // } else if (type === "hotTalk") {
      //   if (
      //     width - 200 <=
      //       hotTalkRef.current.container.current.offsetWidth + left &&
      //     !isLoadedMoreHotTalkVideo &&
      //     hotTalkVideoIndex.length !== hotTalkVideoList.length
      //   ) {
      //     const size = hotTalkVideoList.length;
      //     dispatch({
      //       type: GET_HOT_TALK_CATEGORY_VIDEO_REQUEST,
      //       data: {
      //         fetchList: hotTalkVideoIndex.slice(size, size + MORE_VIDEO_COUNT),
      //       },
      //     });
      //   }
      // }
      // seasonLike
      // else if (type === "seasonLike") {
      //   if (
      //     width - 200 <=
      //       seasonLikeRef.current.container.current.offsetWidth + left &&
      //     !isLoadedMoreSeasonLikeVideo &&
      //     seasonLikeVideoIndex.length !== seasonLikeVideoList.length
      //   ) {
      //     const size = seasonLikeVideoList.length;
      //     dispatch({
      //       type: GET_SEASON_LIKE_CATEGORY_VIDEO_REQUEST,
      //       data: {
      //         fetchList: seasonLikeVideoIndex.slice(
      //           size,
      //           size + MORE_VIDEO_COUNT
      //         ),
      //       },
      //     });
      //   }
      // }
      // seasonView
      //   else if (type === "seasonView") {
      //     if (
      //       width - 200 <=
      //         seasonViewRef.current.container.current.offsetWidth + left &&
      //       !isLoadedMoreSeasonViewVideo &&
      //       seasonViewVideoIndex.length !== seasonViewVideoList.length
      //     ) {
      //       const size = seasonViewVideoList.length;
      //       dispatch({
      //         type: GET_SEASON_VIEW_CATEGORY_VIDEO_REQUEST,
      //         data: {
      //           fetchList: seasonViewVideoIndex.slice(
      //             size,
      //             size + MORE_VIDEO_COUNT
      //           ),
      //         },
      //       });
      //     }
      //   }
      // },
    },
    [
      dispatch,
      realtimeSurgePushRef.current,
      hotPushRef.current,
      seasonPushRef.current,
      isLoadedMoreRealtimeSurgePushVideo,
      realtimeSurgePushVideoIndex,
      realtimeSurgePushVideoList,
      isLoadedMoreHotPushVideo,
      hotPushVideoIndex,
      hotPushVideoList,
      isLoadedMoreSeasonPushVideo,
      seasonPushVideoIndex,
      seasonPushVideoList,
      // realtimeSurgeLikeRef.current,
      // realtimeSurgeTalkRef.current,
      // hotLikeRef.current,
      // hotViewRef.current,
      // hotTalkRef.current,
      // seasonLikeRef.current,
      // seasonViewRef.current,
      // isLoadedMoreRealtimeSurgeLikeVideo,
      // realtimeSurgeLikeVideoIndex,
      // realtimeSurgeLikeVideoList,
      // isLoadedMoreRealtimeSurgeTalkVideo,
      // realtimeSurgeTalkVideoIndex,
      // realtimeSurgeTalkVideoList,
      // isLoadedMoreHotLikeVideo,
      // hotLikeVideoIndex,
      // hotLikeVideoList,
      // isLoadedMoreHotViewVideo,
      // hotViewVideoIndex,
      // hotViewVideoList,
      // isLoadedMoreSeasonLikeVideo,
      // seasonLikeVideoIndex,
      // seasonLikeVideoList,
      // isLoadedMoreSeasonViewVideo,
      // seasonViewVideoIndex,
      // seasonViewVideoList,
      // isLoadedMoreHotTalkVideo,
      // hotTalkVideoIndex,
      // hotTalkVideoList,
    ]
  );

  // 비디오 클릭
  const onViewVideo = useCallback(
    (type, videoNo) => {
      const indexList =
        type === "realtimeSurgePush"
          ? realtimeSurgePushVideoIndex
          : type === "hotPush"
          ? hotPushVideoIndex
          : type === "seasonPush"
          ? seasonPushVideoIndex
          : [];
      // type === "realtimeSurgeLike"
      //   ? realtimeSurgeLikeVideoIndex
      //   :
      // type === "realtimeSurgeTalk"
      //   ? realtimeSurgeTalkVideoIndex
      //   : // : type === "hotLike"
      //   // ? hotLikeVideoIndex
      //   type === "hotView"
      //   ? hotViewVideoIndex
      //   : type === "hotTalk"
      //   ? hotTalkVideoIndex
      //   : // : type === "seasonLike"
      //   // ? seasonLikeVideoIndex
      //   type === "seasonView"
      //   ? seasonViewVideoIndex
      //   : type === "new"
      //   ? newVideoIndex
      //   :

      dispatch({ type: SET_VIDEOLIST_INDEX, data: indexList });

      dispatch({
        type: SET_CATEGORY_SCROLL,
        data: {
          // realtimeSurgeLikeScrollInCategory: realtimeSurgeLikeRef.current
          //   ? realtimeSurgeLikeRef.current.container.current.scrollLeft
          //   : 0,
          // realtimeSurgeTalkTalkScrollInCategory: realtimeSurgeTalkRef.current
          //   ? realtimeSurgeTalkRef.current.container.current.scrollLeft
          //   : 0,
          // hotLikeScrollInCategory: hotLikeRef.current
          //   ? hotLikeRef.current.container.current.scrollLeft
          //   : 0,
          // hotViewScrollInCategory: hotViewRef.current
          //   ? hotViewRef.current.container.current.scrollLeft
          //   : 0,
          realtimeSurgePushScrollInCategory: realtimeSurgePushRef.current
            ? realtimeSurgePushRef.current.container.current.scrollLeft
            : 0,
          hotPushScrollInCategory: hotPushRef.current
            ? hotPushRef.current.container.current.scrollLeft
            : 0,
          seasonPushScrollInCategory: seasonPushRef.current
            ? seasonPushRef.current.container.current.scrollLeft
            : 0,
          documentScrollInCategory: documentRef.current
            ? documentRef.current.scrollTop
            : 0,
        },
      });

      Router.push(
        {
          pathname: "/videos/[type]",
          query: { currentVideoNo: videoNo, category_no },
        },
        {
          pathname: `/videos/${type}`,
          query: { currentVideoNo: videoNo, category_no },
        }
      );
    },
    [
      Router,
      category_no,
      dispatch,
      // realtimeSurgeLikeVideoIndex,
      // realtimeSurgeTalkVideoIndex,
      // hotLikeVideoIndex,
      // hotViewVideoIndex,
      // hotTalkVideoIndex,
      // seasonLikeVideoIndex,
      // seasonViewVideoIndex,

      realtimeSurgePushVideoIndex,
      hotPushVideoIndex,
      seasonPushVideoIndex,
      documentRef.current,
      realtimeSurgePushRef.current,
      hotPushRef.current,
      seasonPushRef.current,
      // realtimeSurgeLikeRef.current,
      // realtimeSurgeTalkRef.current,
      // hotLikeRef.current,
      // hotViewRef.current,
      // hotTalkRef.current,
      // seasonLikeRef.current,
      // seasonViewRef.current,
    ]
  );

  return (
    <div className="wrapper" ref={documentRef}>
      {!isLoadedMain ? (
        <div className="loaderWrapper">
          <Loader />
        </div>
      ) : (
        <CategoryIndex
          category_no={category_no}
          banner={banner}
          realtimeSurgePushRef={realtimeSurgePushRef}
          hotPushRef={hotPushRef}
          seasonPushRef={seasonPushRef}
          // realtimeSurgeLikeRef={realtimeSurgeLikeRef}
          // realtimeSurgeTalkRef={realtimeSurgeTalkRef}
          // hotLikeRef={hotLikeRef}
          // hotViewRef={hotViewRef}
          // hotTalkRef={hotTalkRef}
          // seasonLikeRef={seasonLikeRef}
          // seasonViewRef={seasonViewRef}
          onScroll={onScroll}
          // onLikeVideo={onLikeVideo}
          onViewVideo={onViewVideo}
          isPush={isPush}
        />
      )}
      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }

        .loaderWrapper {
          width: 100%;
          height: 100%;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

CategoryVideoContainer.propTypes = {
  category_no: PropTypes.number.isRequired,
  banner: PropTypes.object,
  isPush: PropTypes.bool,
};

export default CategoryVideoContainer;
