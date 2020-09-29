import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import _ from "lodash/collection";
import _array from "lodash/array";

import { NewViewVideoContext } from "containers/Video/NewViewVideoContainer";
import UserProfileContainer from "containers/User/UserProfile/UserProfileContainer";

import CustomSwiper from "./Swiper";
import Rank from "components/Rank";
import VideoInfo from "./VideoInfo";
import ThumbnailItem from "./ThumbnailItem";
import VideoPlayer from "./VideoInfo/VideoPlayer";
import VideoError from "./VideoError";

import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import { getCookie } from "shared/functions";
import { videoApi } from "shared/api";

const NewViewVideo = () => {
  const {
    type,
    videoPlayerRef,
    videoNo,
    currentVideoInfo,
    totalPush,
    isViewVideoInfo,
    isViewVideo,
    error,
    setError,
    onChangeVideo,
    setCurrentVideoInfo,
    setIsViewVideoInfo,
    setIsViewVideo,
    isUserVideosPage,
  } = useContext(NewViewVideoContext);
  const rootSwiperRef = useRef();
  const innerSwiperRef = useRef();

  const Router = useRouter();

  const [isViewRank, setIsViewRank] = useState(
    Boolean(Router.query.page === "rank")
  );
  const [isViewUserProfile, setIsViewUserProfile] = useState(
    Boolean(Router.query.page === "userProfile")
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { videoList, videoIndex } = useSelector((state) => ({
    videoList: state.video.videoList,
    videoIndex: state.video.videoIndex,
  }));

  useEffect(() => {
    const onFullscreenchange = (e) => {
      setIsFullscreen((prev) => {
        console.log("prev", prev);
        if (!prev) {
          // fadein ~
          // document.body.style.opacity = 0;
          // document.body.style.transition = "0.5s ease-in-out";
          // setTimeout(() => (document.body.style.opacity = 1), 500);
          // setTimeout(() => (document.body.style.transition = "initial"), 1000);
          // ~ fadein
        }
        return !prev;
      });
    };

    videoPlayerRef.current.on("fullscreenchange", onFullscreenchange);

    return function cleanup() {
      videoPlayerRef.current.off("fullscreenchange", onFullscreenchange);
    };
  }, [videoPlayerRef && videoPlayerRef.current]);

  /**
   * ex) 뒤로가기 , 앞으로 가기
   * 라우터 쿼리를 기준으로 슬라이드 실행
   */
  useEffect(() => {
    if (!Boolean(Router.query.page)) {
      // 300은 transition 디폴트값
      rootSwiperRef.current.slideTo(1, 300, false);
    }

    if (Boolean(Router.query.page)) {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.pause();
      }

      if (Router.query.page === "rank") {
        // 300은 transition 디폴트값
        rootSwiperRef.current.slideTo(0, 300, false);
      }

      if (Router.query.page === "userProfile") {
        // 300은 transition 디폴트값
        rootSwiperRef.current.slideTo(2, 300, false);
      }
    }

    setIsViewRank(Boolean(Router.query.page === "rank"));
    setIsViewUserProfile(Boolean(Router.query.page === "userProfile"));
    setIsViewVideoInfo(true);
    setIsViewVideo(true);
  }, [Router, rootSwiperRef]);

  // 조회수 증가 함수
  useEffect(() => {
    let isCancelled = false;

    if (currentVideoInfo && !isCancelled) {
      viewVideo();
    }

    return function cleanup() {
      isCancelled = true;
    };

    async function viewVideo() {
      const videoNo = currentVideoInfo.video_no;
      if (videoNo) {
        const existsCookie = getCookie(videoNo.toString());
        const tempId = getCookie("temp_id");
        // cookie에 videoNo가 존재하지 않으면
        if (!existsCookie) {
          try {
            if (!isCancelled) {
              const now = Date.now();
              // 만료시간 30분
              const expires = new Date(now + 1000 * 60 * 30);
              document.cookie = `${videoNo}=true;path=/;expires=${expires.toUTCString()}`;
              // 조회수 증가
              await videoApi.post(
                "/view",
                { videoNo, tempId },
                { withCredentials: true }
              );
            }

            // if (!isCancelled) {
            //   setCurrentVideoInfo((prev) => ({
            //     ...prev,
            //     countViewVideo: prev.countViewVideo + 1,
            //   }));
            // }
          } catch (error) {
            if (!isCancelled) {
              console.error(error);
            }
          }
        }
      }
    }
  }, [currentVideoInfo && currentVideoInfo.video_no]);

  // callbackSlidePrev 캐싱
  const callbackSlidePrev = useCallback(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }

    /**
     * 비디오 정보 숨기기
     */
    setIsViewVideoInfo(false);
    setIsViewVideo(false);
    setError(null);
    setCurrentVideoInfo(null);
  }, [videoPlayerRef]);

  // // callbackSlideNext 캐싱
  const callbackSlideNext = useCallback(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }

    /**
     * 비디오 정보 숨기기
     */
    setIsViewVideoInfo(false);
    setIsViewVideo(false);
    setError(null);
    setCurrentVideoInfo(null);
  }, [videoPlayerRef]);

  const callbackSlidePrevEndTransition = useCallback(() => {
    /**
     * 이전 비디오 아이디 조회
     * 이전 비디오 아이디가 없으면 null값으로 변경하여서 라우터 변경이 안되게합니다.
     */

    const prevVideoNo = videoIndex[innerSwiperRef.current.realIndex]
      ? videoIndex[innerSwiperRef.current.realIndex]
      : null;

    const prevVideo = videoList[innerSwiperRef.current.realIndex]
      ? videoList[innerSwiperRef.current.realIndex]
      : null;

    /**
     * video preload를 위한 작업
     * renderVideo는 slide transition이 실행되면 currentVideo보다 먼저 비디오 정보를 가져온다.
     */
    if (prevVideoNo) {
      onChangeVideo(prevVideoNo, prevVideo);
    }
  }, [onChangeVideo, videoIndex, videoList, innerSwiperRef.current]);

  const callbackSlideNextEndTransition = useCallback(() => {
    /**
     * 다음번 비디오 아이디 조회
     * 다음 비디오 아이디가 없으면 루프를 돌리게합니다
     */

    const nextVideoNo = videoIndex[innerSwiperRef.current.realIndex]
      ? videoIndex[innerSwiperRef.current.realIndex]
      : videoIndex[0];

    const nextVideo = videoList[innerSwiperRef.current.realIndex]
      ? videoList[innerSwiperRef.current.realIndex]
      : videoList[0];

    // /**
    //  * video preload를 위한 작업
    //  * renderVideo는 slide transition이 실행되면 currentVideo보다 먼저 비디오 정보를 가져온다.
    //  */
    // // setRenderVideo(videoList[index + 1] ? videoList[index + 1] : videoList[0]);

    onChangeVideo(nextVideoNo, nextVideo);
  }, [onChangeVideo, videoIndex, videoList, innerSwiperRef.current]);

  /**
   * 스와이프할 시 비디오는 출력하지 않는다.
   */
  const callbackNotViewVideoOnTouchMove = useCallback((event) => {
    setIsViewVideo(false);
  }, []);

  /**
   * 스와이프를 마무리 하면 비디오를 출력한다.
   */
  const callbackViewVideoOnTouchEnd = useCallback((event) => {
    if (isFullscreen) {
      // document.body.classList.remove("fadein");
      document.exitFullscreen();
    } else {
      // document.body.classList.add("fadein");
    }
    setIsViewVideo(true);
  }, []);

  // callbackSlidePrev 캐싱
  // 좌측으로 슬라이드 할시 랭킹 출력
  const callbackViewRankSlide = useCallback(() => {
    const query = Object.assign({}, Router.query);
    delete query.type;
    delete query.user_no;

    // 유저 프로필 페이지 일시
    if (isViewUserProfile) {
      delete query.page;

      if (videoPlayerRef.current) {
        videoPlayerRef.current.play();
      }
      Router.back();
      return;
    }
    // 비디오 페이지 일시
    else {
      query.page = "rank";

      if (videoPlayerRef.current) {
        videoPlayerRef.current.pause();
      }
      if (rootSwiperRef.current) {
        rootSwiperRef.current.slideTo(0, 300, false);
      }

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
  }, [Router, videoNo, type, isViewUserProfile, videoPlayerRef, rootSwiperRef]);

  // callbackSlidePrev 캐싱
  // 우측으로 슬라이드 할시 유저 프로필 출력
  const callbackViewUserProfileSlide = useCallback(
    (e) => {
      // 이벤트 존재시
      if (e) {
        e.stopPropagation();
      }
      const query = Object.assign({}, Router.query);
      delete query.type;
      delete query.user_no;

      // 랭킹 페이지 일시
      if (isViewRank) {
        delete query.page;

        if (videoPlayerRef.current) {
          videoPlayerRef.current.play();
        }
        Router.back();
        return;
      }
      // // 비디오 페이지 일시
      else {
        query.page = "userProfile";

        if (videoPlayerRef.current) {
          videoPlayerRef.current.pause();
        }

        if (rootSwiperRef.current) {
          rootSwiperRef.current.slideTo(2, 300, false);
        }

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
    },
    [Router, videoNo, type, isViewRank, videoPlayerRef, rootSwiperRef]
  );

  // callbackSlidePrev
  // callbackSlideNext

  /**
   * 부모 스와이프
   * 랭킹 비디오 유저프로필로 구성
   */
  const params = useMemo(
    () => ({
      ref: rootSwiperRef,
      containerClass: "SlideContainer",
      // 에러메세지가 있으면 비디오페이지를 출력
      initialSlide: error ? 1 : isViewRank ? 0 : isViewUserProfile ? 2 : 1,
      // 랭킹 페이지일 땐 좌로 스와이프 불가
      allowSlidePrev: !error && !isViewRank,
      /**
       * 유저 프로필 페이지일 시 랭킹페이지일 떄만 우측 스와이프 가능
       * 유저 프로필 페이지가 아니면 유저프로필 컴포넌트를 포커싱하지 않는 이상 우측 스와이프 가능
       */
      allowSlideNext:
        (!isUserVideosPage && !error && !isViewUserProfile) ||
        (isUserVideosPage && isViewRank),
      callbackSlidePrev: callbackViewRankSlide,
      callbackSlideNext: callbackViewUserProfileSlide,
    }),
    [
      isUserVideosPage,
      rootSwiperRef,
      error,
      isViewRank,
      isViewUserProfile,
      callbackViewRankSlide,
      callbackViewUserProfileSlide,
    ]
  );

  /**
   * 자식 스와이프
   * 비디오의 썸네일로 구성
   */
  const innerParams = useMemo(
    () => ({
      ref: innerSwiperRef,
      containerClass: "VideoSlideContainer",
      direction: "vertical",
      subSlideClass: "ThumbnailSlide",
      initialSlide: _array.findIndex(
        videoList,
        (video) => video.video_no === Number(videoNo)
      ),

      /**
       * 비디오의 첫영상이면 루프가 안되게 해야한다.
       * 비디오 페이지가 아니면 상하 스와이프가 불가능 하게한다.
       */

      allowSlidePrev:
        !isViewRank &&
        !isViewUserProfile &&
        Number(videoNo) !== (videoList[0] && videoList[0].video_no),
      allowSlideNext: !isViewRank && !isViewUserProfile,
      // loop: Boolean(videoIndex.length > 3),
      callbackSlidePrev,
      callbackSlideNext,
      callbackTouchMove: callbackNotViewVideoOnTouchMove,
      callbackTouchEnd: callbackViewVideoOnTouchEnd,
      callbackSlidePrevEndTransition: callbackSlidePrevEndTransition,
      callbackSlideNextEndTransition: callbackSlideNextEndTransition,
    }),
    [
      innerSwiperRef,
      isViewRank,
      isViewUserProfile,
      videoNo,
      videoList,
      videoIndex,
      callbackSlidePrev,
      callbackSlideNext,
      callbackNotViewVideoOnTouchMove,
      callbackViewVideoOnTouchEnd,
      callbackSlidePrevEndTransition,
      callbackSlideNextEndTransition,
    ]
  );

  /**
   * 출력할 비디오 캐싱
   */
  const renderVideoList = useMemo(() => {
    const realIndex =
      innerSwiperRef.current && innerSwiperRef.current.realIndex;

    return videoIndex.map((videoNo, i) => {
      const video = _.find(
        videoList,
        (video) => video.video_no === Number(videoNo)
      );
      return (
        <div index={i} className="slide" key={videoNo}>
          {
            // active
            (i === realIndex ||
              // prev
              i === realIndex - 1 ||
              // next
              i === realIndex + 1) && (
              // <ThumbnailItem thumbnail={undefined} />
              <ThumbnailItem thumbnail={video && video.start_thumbnail_url} />
            )
          }
        </div>
      );
    });
  }, [
    videoIndex,
    videoList,
    videoNo,
    innerSwiperRef.current,
    error,

    window.innerWidth,
    window.innerHeight,
  ]);

  /**
   * 업로더 프로필 사진 클릭 시
   */
  const onClickAvatar = useCallback(
    (e) => {
      if (isUserVideosPage) {
        Router.back();
      } else {
        callbackViewUserProfileSlide(e);
      }
    },
    [isUserVideosPage, Router, callbackViewUserProfileSlide]
  );

  const _thumbnailTouchEnd = (e) => {
    const clientY = e.changedTouches[0].clientY;
    // 영상이 전체화면이고 터치 위치가 컨트롤러위치(50)보다 위쪽에 있을때 전체화면 닫기
    if (isFullscreen && window.innerHeight - 50 > clientY) {
      document.exitFullscreen();
    }
  };
  return (
    <>
      <CustomSwiper {...params} isFullscreen={isFullscreen}>
        {/* 비디오 정보를 조회할 수 있을 때 랭크 슬라이드가 가능하게 한다.*/}
        <div className="slide scroll">
          {currentVideoInfo && (
            <Rank category3No={currentVideoInfo.category_level3_no} modal />
          )}
        </div>

        <div className="ThumbnailSwiper" onTouchEnd={_thumbnailTouchEnd}>
          <CustomSwiper
            {...innerParams}
            floating={
              Boolean(!error) ? (
                <VideoInfo
                  isViewVideoInfo={isViewVideoInfo}
                  currentVideoInfo={currentVideoInfo}
                  totalPush={totalPush}
                  onClickAvatar={onClickAvatar}
                >
                  <VideoPlayer
                    isFullscreen={isFullscreen}
                    isViewVideo={isViewVideo}
                    setIsViewVideoInfo={setIsViewVideoInfo}
                    setIsViewVideo={setIsViewVideo}
                  />
                </VideoInfo>
              ) : (
                <VideoError error={error} />
              )
            }
            isFullscreen={isFullscreen}
          >
            {renderVideoList}
          </CustomSwiper>
        </div>
        {/* 비디오 정보를 조회할 수 있을 때 유저프로필 슬라이드가 가능하게 한다.*/}
        {/* 유저 페이지에선 안나오게 한다. */}
        {!isUserVideosPage && (
          <div className="slide scroll">
            {currentVideoInfo && (
              <UserProfileContainer
                userNo={currentVideoInfo.USER.user_no}
                videoPage
                category3No={currentVideoInfo.category_level3_no}
              />
            )}
          </div>
        )}
      </CustomSwiper>

      <style jsx>{`
        :global(.VideoSlideContainer) {
          width: 100%;
          height: 100%;
        }

        :global(.SlideContainer) {
          height: 100%;
        }

        :global(.ThumbnailSlide) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        :global(.slide) {
          width: 100%;
          height: 100%;
        }

        :global(.slide.scroll) {
          overflow-y: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        :global(.slide.scroll::-webkit-scrollbar) {
          display: none; /* Chrome, Safari, Opera*/
        }

        .ThumbnailSwiper {
          height: 100%;
          background-color: ${BACKGROUND_BLACK_COLOR};
        }
      `}</style>
    </>
  );
};

export default React.memo(NewViewVideo);
