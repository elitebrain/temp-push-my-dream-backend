import React, { useCallback, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import _ from "lodash/collection";
import css from "styled-jsx/css";

import Loader from "components/Common/Loader";
import MainIndex from "components/Main/MainIndex";
import { OPEN_MODAL } from "store/reducers/modal";
import { useRouter } from "next/router";
import {
  LIKE_VIDEO_REQUEST,
  GET_HOT_VIEW_VIDEO_REQUEST,
  SET_VIDEOLIST_INDEX,
  GET_HOT_LIKE_VIDEO_REQUEST,
} from "store/reducers/video";
import { SET_MAIN_SCROLL } from "store/reducers/scroll";
import { NEW_VIDEO_MORE_COUNT } from "shared/constants/variables";

const LoaderWrapper = css`
  .loaderWrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MainContainer = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const {
    isLoadedMain,
    isLoadedMoreHotViewVideo,
    hotViewVideoIndex,
    // 핫톡 주석
    // isLoadedMoreHotTalkVideo,
    // hotTalkVideoIndex,
    // isLoadedMoreHotLikeVideo,
    // hotLikeVideoIndex,
    // 뉴비디오 주석
    // isLoadedMoreNewVideo,
    // newVideoIndex,
    isLoadingLike,
  } = useSelector(
    (state) => ({
      isLoadedMain: state.video.isLoadedMain,
      isLoadedMoreHotViewVideo: state.video.isLoadedMoreHotViewVideo,
      hotViewVideoIndex: state.video.hotViewVideoIndex,
      // 핫톡 주석
      // isLoadedMoreHotTalkVideo: state.video.isLoadedMoreHotTalkVideo,
      // hotTalkVideoIndex: state.video.hotTalkVideoIndex,
      // isLoadedMoreHotLikeVideo: state.video.isLoadedMoreHotLikeVideo,
      // hotLikeVideoIndex: state.video.hotLikeVideoIndex,
      // 뉴비디오 주석
      // isLoadedMoreNewVideo: state.video.isLoadedMoreNewVideo,
      // newVideoIndex: state.video.newVideoIndex,
      isLoadingLike: state.video.isLoadingLike,
    }),
    shallowEqual
  );
  const hotViewVideoList = useSelector((state) => state.video.hotViewVideoList);
  // 핫톡 주석
  // const hotTalkVideoList = useSelector((state) => state.video.hotTalkVideoList);
  // const hotLikeVideoList = useSelector((state) => state.video.hotLikeVideoList);
  const openCategoryList = useSelector((state) =>
    state.video.openCategoryList.filter(
      (openCategory) =>
        openCategory.videoIndex && openCategory.videoIndex.length
    )
  );
  // 뉴비디오 주석
  // const newVideoList = useSelector((state) => state.video.newVideoList);

  const {
    hotViewScroll,
    // 핫톡 주석
    // hotTalkScroll,
    // hotLikeScroll,
    openCategoryScroll,
    documentScroll,
  } = useSelector(
    (state) => ({
      hotViewScroll: state.scroll.hotViewScroll,
      // 핫톡 주석
      // hotTalkScroll: state.scroll.hotTalkScroll,
      // hotLikeScroll: state.scroll.hotLikeScroll,
      openCategoryScroll: state.scroll.openCategoryScroll,
      documentScroll: state.scroll.documentScroll,
    }),
    shallowEqual
  );
  const { isLoggedIn } = useSelector(
    (state) => ({ isLoggedIn: state.user.isLoggedIn }),
    shallowEqual
  );

  const documentRef = useRef();
  const hotViewRef = useRef();
  // 핫톡 주석
  // const hotTalkRef = useRef();
  // const hotLikeRef = useRef();
  const openCategoryRef = useRef(
    Array.apply(
      null,
      Array((openCategoryList && openCategoryList.length) || 0)
    ).map((v) => React.createRef())
  );

  // 페이지 첫 진입 시 scoll 위치 지정
  useEffect(() => {
    if (hotViewRef.current) {
      hotViewRef.current.container.current.scrollLeft = hotViewScroll;
    }
    // 핫톡 주석
    // if (hotTalkRef.current) {
    //   hotTalkRef.current.container.current.scrollLeft = hotTalkScroll;
    // }
    // if (hotLikeRef.current) {
    //   hotLikeRef.current.container.current.scrollLeft = hotLikeScroll;
    // }
    if (openCategoryRef.current) {
      openCategoryRef.current.forEach((openCategory, index) => {
        if (
          openCategory &&
          openCategory.current &&
          typeof openCategory.current.container.current.scrollLeft === "number"
        ) {
          openCategory.current.container.current.scrollLeft = openCategoryScroll[
            index
          ]
            ? openCategoryScroll[index]
            : 0;
        }
      });
    }

    if (documentRef.current) {
      documentRef.current.scrollTop = documentScroll;
    }
  }, []);

  // 뉴비디오 주석
  // new video 상하 인피니티 스크롤
  // useEffect(() => {
  //   let debounce;
  //   if (documentRef.current) {
  //     documentRef.current.addEventListener("scroll", scrollEvent);
  //   }

  //   return function cleanup() {
  //     documentRef.current.removeEventListener("scroll", scrollEvent);
  //     clearTimeout(debounce);
  //   };

  //   function scrollEvent(e) {
  //     clearTimeout(debounce);
  //     debounce = setTimeout(() => {
  //       const {
  //         srcElement: { scrollTop, clientHeight, scrollHeight },
  //       } = e;

  //       if (
  //         scrollHeight - (scrollTop + clientHeight) < 900 &&
  //         !isLoadedMoreNewVideo &&
  //         newVideoIndex.length !== newVideoList.length
  //       ) {
  //         const size = newVideoList.length;
  //         dispatch({
  //           type: GET_NEW_VIDEO_REQUEST,
  //           data: {
  //             fetchList: newVideoIndex.slice(size, size + NEW_VIDEO_MORE_COUNT),
  //           },
  //         });
  //       }
  //     }, 100);
  //   }
  // }, [newVideoIndex, newVideoList, isLoadedMoreNewVideo]);

  // 좋아요 버튼 클릭
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
  //         type: LIKE_VIDEO_REQUEST,
  //         payload: {
  //           videoNo,
  //           isLiked,
  //         },
  //       });
  //     }
  //   },
  //   [isLoggedIn, dispatch, isLoadingLike, Router]
  // );

  // 비디오 클릭
  const onViewVideo = useCallback(
    (type, videoNo) => {
      let categoryNo = null;
      if (/category/g.test(type)) {
        categoryNo = Number(type.split("-")[1]);

        type = "new";
      }

      /**
       * 오픈 카테고리의 인덱스 조회
       */
      function getOpenCategoryIndex() {
        let openCategory = _.find(
          openCategoryList,
          (openCategory) => openCategory.category_level3_no === categoryNo
        );

        return openCategory && openCategory.videoIndex
          ? openCategory.videoIndex
          : [];
      }

      const indexList =
        type === "hotView"
          ? hotViewVideoIndex
          : // 핫톡 주석
          // : type === "hotTalk"
          // ? hotTalkVideoIndex
          // type === "hotLike"
          // ? hotLikeVideoIndex
          // :
          /category/g.test(type)
          ? getOpenCategoryIndex()
          : [];

      /*
       * // type === "new"
       * // ? newVideoIndex
       */

      dispatch({ type: SET_VIDEOLIST_INDEX, data: indexList });

      dispatch({
        type: SET_MAIN_SCROLL,
        data: {
          hotViewScroll: hotViewRef.current
            ? hotViewRef.current.container.current.scrollLeft
            : 0,
          // 핫톡 주석
          // hotTalkScroll: hotTalkRef.current
          //   ? hotTalkRef.current.container.current.scrollLeft
          //   : 0,
          // hotLikeScroll: hotLikeRef.current
          //   ? hotLikeRef.current.container.current.scrollLeft
          //   : 0,
          openCategoryScroll: openCategoryRef.current
            ? openCategoryRef.current.map(
                (v) => v && v.current && v.current.container.current.scrollLeft
              )
            : [],
          documentScroll: documentRef.current
            ? documentRef.current.scrollTop
            : 0,
        },
      });

      /**
       * 쿼리 스트링 생성
       */
      const query = {
        currentVideoNo: videoNo,
      };

      if (categoryNo) {
        query.category_no = categoryNo;
      }

      Router.push(
        {
          pathname: "/videos/[type]",
          query,
        },
        {
          pathname: `/videos/${type}`,
          query,
        }
      );
    },
    [
      Router,
      dispatch,
      hotViewVideoIndex,
      // 핫톡 주석
      // hotTalkVideoIndex,
      // hotLikeVideoIndex,
      openCategoryList,
      // newVideoIndex,
      hotViewRef.current,
      // 핫톡 주석
      // hotTalkRef.current,
      // hotLikeRef.current,
      openCategoryRef.current,
      documentRef.current,
    ]
  );

  // 스크롤 이벤트
  const onScroll = useCallback(
    (type, left, top, width) => {
      if (type === "hotView") {
        if (
          width - 200 <=
            hotViewRef.current.container.current.offsetWidth + left &&
          !isLoadedMoreHotViewVideo &&
          hotViewVideoIndex.length !== hotViewVideoList.length
        ) {
          const size = hotViewVideoList.length;

          dispatch({
            type: GET_HOT_VIEW_VIDEO_REQUEST,
            data: {
              fetchList: hotViewVideoIndex.slice(
                size,
                size + NEW_VIDEO_MORE_COUNT
              ),
            },
          });
        }
      }
      // 핫톡 주석
      // else if (type === "hotTalk") {
      //   if (
      //     width - 200 <=
      //       hotTalkRef.current.container.current.offsetWidth + left &&
      //     !isLoadedMoreHotTalkVideo &&
      //     hotTalkVideoIndex.length !== hotTalkVideoList.length
      //   ) {
      //     const size = hotTalkVideoList.length;
      //     dispatch({
      //       type: GET_HOTTALK_VIDEO_REQUEST,
      //       data: {
      //         fetchList: hotTalkVideoIndex.slice(
      //           size,
      //           size + NEW_VIDEO_MORE_COUNT
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
      //       type: GET_HOT_LIKE_VIDEO_REQUEST,
      //       data: {
      //         fetchList: hotLikeVideoIndex.slice(
      //           size,
      //           size + NEW_VIDEO_MORE_COUNT
      //         ),
      //       },
      //     });
      //   }
      // }
    },
    [
      dispatch,
      hotViewRef.current,
      // 핫톡 주석
      // hotTalkRef.current,
      // hotLikeRef.current,
      isLoadedMoreHotViewVideo,
      hotViewVideoIndex,
      hotViewVideoList,
      // 핫톡 주석
      // isLoadedMoreHotTalkVideo,
      // hotTalkVideoIndex,
      // hotTalkVideoList,
      // isLoadedMoreHotLikeVideo,
      // hotLikeVideoIndex,
      // hotLikeVideoList,
    ]
  );

  return !isLoadedMain ? (
    <div className="loaderWrapper">
      <Loader />
      <style jsx>{LoaderWrapper}</style>
    </div>
  ) : (
    <div className="wrapper" ref={documentRef}>
      <MainIndex
        hotViewRef={hotViewRef}
        // 핫톡 주석
        // hotTalkRef={hotTalkRef}
        // hotLikeRef={hotLikeRef}
        openCategoryRef={openCategoryRef}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
      />
      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default MainContainer;
