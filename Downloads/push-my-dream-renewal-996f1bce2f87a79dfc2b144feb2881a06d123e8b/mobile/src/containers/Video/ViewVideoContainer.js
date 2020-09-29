import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Swiper from "swiper/js/swiper";
import { useRouter } from "next/router";

import PushContainer from "containers/Push/PushContainer";
import CommentContainer from "containers/CommentContainer";
import UserProfileContainer from "containers/User/UserProfile/UserProfileContainer";

import ViewVideoComponent from "components/Video/ViewVideo/ViewVideoComponent";
import Rank from "components/Rank";
import Bottom from "components/Video/ViewVideo/Bottom/Bottom";
import LoadingCircle from "components/Common/CssIcons/LoadingCircle";
import {
  setControlBarPosition,
  getCookie,
  findSearchStringValue,
} from "shared/functions";
import { videoApi, commentApi } from "shared/api";
import { MORE_VIDEO } from "store/reducers/offset";

import arrowLeft from "public/assets/icon/arrow_left(white).svg";
import { OPEN_MODAL } from "store/reducers/modal";
import { LIKE_VIDEO_REQUEST, TOGGLE_MUTED } from "store/reducers/video";
import Body from "components/Layout/Body";
import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import VideoCommentContainer from "./VideoCommentContainer";

export const ViewVideoContext = createContext();

const ViewVideoContainer = ({
  videoNo: originVideoNo,
  isLoaded,
  // index, // 슬라이드가 바라보고 있는 비디오의 인덱스
  isOfficial,
  isPush, // 푸쉬 가능 여부
  totalPush, // 푸쉬 가능 여부시 유저가 참여하고 있는 시즌에서 받은 총 푸쉬
  error,
}) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const verticalSwiper = useRef();
  const { muted } = useSelector((state) => state.video);
  // const [muted, setMuted] = useState(true);
  const _toggleMuted = () => {
    console.log("_toggleMuted_toggleMuted_toggleMuted");
    dispatch({
      type: TOGGLE_MUTED,
      data: {
        muted: !muted,
      },
    });
    const mutedEl = document.querySelector(
      ".swiper-slide-active .vjs-mute-control.vjs-control.vjs-button"
    );
    if (mutedEl) {
      mutedEl.click();
    }
    // setMuted((prevState) => !prevState);
  };

  const { isLoggedIn } = useSelector((state) => state.user);
  const { videoList: originVideoList, isLoadingLike } = useSelector(
    (state) => state.video
  );

  const { category3List } = useSelector((state) => state.common);

  // null값 제거
  const videoList = originVideoList.filter((video) => video);
  const index = videoList.map((video) => video.video_no).indexOf(originVideoNo);

  // 현재 보고 있는 비디오 아이디
  const [videoNo, setVideoNo] = useState(originVideoNo);
  // 현재 보고 있는 비디오의 유저 아이디

  const [isViewComment, setIsViewComment] = useState(false);
  const [isViewBottom, setIsViewBottom] = useState(true);
  const [isViewUserProfile, setIsViewUserProfile] = useState(
    Router.query && Router.query.isViewUserProfile ? true : false
  );
  const [isViewRank, setIsViewRank] = useState(
    Router.query && Router.query.isViewRank ? true : false
  );

  const [activeBottomIdx, setActiveBottomIdx] = useState(index);

  console.log("isViewComment", isViewComment);

  // swiper 초기화
  useEffect(() => {
    if (!videoList || videoList.length === 0) {
      return;
    }

    // swiper init
    if (!verticalSwiper.current) {
      // console.log(userVideo, userVideoIdx, lastRealIdx, realIdx);
      verticalSwiper.current = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        initialSlide: index,
        direction: "vertical",
        on: {
          touchStart() {
            // 터치 end 이벤트를 이용하기 위해 터치 시작점을 객체에 저장한다.
            this.oldX = verticalSwiper.current.touches.currentX;
            this.oldY = verticalSwiper.current.touches.currentY;
          },
          touchMove: () => {
            setActiveBottomIdx(null);
          },
        },
      });
    }
    if (findSearchStringValue(location.search, "isViewComment") === "true") {
      setIsViewComment(true);
    }
  }, []);

  // 프로필 보기, 랭크 보기 상태에서 뒤로가기 이벤트
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    // if (isViewUserProfile || isViewRank) {
    //   body.style.overflow = "hidden";
    // } else {
    //   body.style.overflow = "auto";
    // }

    window.onpopstate = function () {
      const userProfile = document.querySelector(
        ".wrapper_layout > .user_profile"
      );

      const videoRank = document.querySelector(".wrapper_layout > .video_rank");

      if (isViewUserProfile && userProfile) {
        userProfile.style.left = "100vw";
        setTimeout(() => {
          setIsViewUserProfile(false);
        }, 300);
      }

      if (isViewRank && videoRank) {
        videoRank.style.left = "-100vw";
        setTimeout(() => {
          setIsViewRank(false);
        }, 300);
      }
    };

    return function () {
      window.onpopstate = null;
    };
  }, [isViewUserProfile, isViewRank]);

  // slide해서 비디오 아이디값이 변할 떄마다 동작이 달리 되는 swiper 이벤트도 새로 정의해준다.
  useEffect(() => {
    setVideoNo(originVideoNo);

    if (originVideoNo) {
      _videoView(originVideoNo);
    }

    window.onresize = () => {
      setControlBarPosition();
      document.querySelector("html").scrollTop = 0;
    };
    window.onorientationchange = () => {
      setControlBarPosition();
      document.querySelector("html").scrollTop = 0;
    };
    window.onresize = () => {
      if (verticalSwiper.current) {
        verticalSwiper.current.height = window.innerHeight - 100;
      }
    };

    if (verticalSwiper.current) {
      verticalSwiper.current.off("touchEnd");
      verticalSwiper.current.on("touchEnd", onTouchEnd);
      verticalSwiper.current.off("slideChange");
      verticalSwiper.current.on("slideChange", onSlideChange);
    }

    return () => {
      window.onresize = null;
      window.onorientationchange = null;
      window.onresize = null;
    };
  }, [originVideoNo, index, isOfficial, verticalSwiper.current]);

  // 터치 end 이벤트 isOfficial과 Router가 변할 시 이벤트는 재선언된다.
  const onTouchEnd = useCallback(() => {
    console.log("\n\n\n onTouchEnd", document.fullscreen);
    const newX = verticalSwiper.current.touches.currentX;
    const newY = verticalSwiper.current.touches.currentY;
    const diffX = verticalSwiper.current.oldX - newX;
    const diffY = Math.abs(newY - verticalSwiper.current.oldY);
    if (!isOfficial) {
      if (diffY < diffX && Math.abs(diffX) > 10) {
        if (location.pathname === "/video/user") {
          Router.back();
        } else {
          _setIsViewUserProfile();
        }
      }
      console.log("Math.abs(diffX)", Math.abs(diffX));
      if (diffX < 0 && Math.abs(diffX) > diffY && Math.abs(diffX) > 10) {
        _setIsViewRank();
      }
    }
  }, [verticalSwiper.current, Router, isOfficial]);

  // 슬라이드 이벤트
  const onSlideChange = useCallback(() => {
    console.log("\n\n\n onSlideChange", document.fullscreen);
    verticalSwiper.current.updateSlides();
    setTimeout(() => {
      setActiveBottomIdx(verticalSwiper.current.realIndex);

      // 비디오 리스트의 마지막이 현재보고 있는 슬라이드가 아닐 시에만 라우터를 변경한다.
      if (videoList.length !== verticalSwiper.current.realIndex) {
        // 쿼리스트링
        const query = Router.query;
        delete query.video_no;

        const nextVideoNo =
          videoList[verticalSwiper.current.realIndex].video_no;

        Router.replace(
          { pathname: "/video/[video_no]", query },
          {
            pathname: `/video/${nextVideoNo}`,
            query,
          }
        );
      }
    }, 200);
    document.querySelector("html").scrollTop = 0;
  }, [Router, videoList, originVideoNo]);

  const _toggleViewBottom = () => {
    setIsViewBottom((prevState) => {
      if (!prevState) {
        setActiveBottomIdx(index);
      }
      return !prevState;
    });
    _checkNaverApp();
  };

  const _checkNaverApp = () => {
    const agent = navigator.userAgent.toLowerCase();
    if (
      agent.indexOf("naver") !== -1 &&
      agent.indexOf("mobile") !== -1 &&
      agent.indexOf("iphone") === -1
    ) {
      document.querySelector("body").requestFullscreen();
    }
  };

  const _videoView = (videoNo) => {
    if (videoNo) {
      const existsCookie = getCookie(videoNo.toString());
      const tempId = getCookie("temp_id");
      // cookie에 videoNo가 존재하지 않으면
      if (!existsCookie) {
        const now = Date.now();
        // 만료시간 30분
        const expires = new Date(now + 1000 * 60 * 30);
        document.cookie = `${videoNo}=true;path=/;expires=${expires.toUTCString()}`;
        // 조회수 증가
        videoApi.post("/view", { videoNo, tempId }, { withCredentials: true });
      }
    }
  };

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

  const _setIsViewComment = (e) => {
    if (e) {
      e.stopPropagation();
    }

    console.log("ff");
    // back으로 닫기 위해 history 쌓기
    window.history.pushState({}, "", "");
    // back 이벤트에 댓글 창 닫기(setIsViewComment(false)) 등록, 이후 back 이벤트 날리기
    window.addEventListener("popstate", () => {
      setIsViewComment(false);
      window.removeEventListener("popstate", () => {});
    });
    setIsViewComment(true);
  };

  /**
   * 랭크 모달창 종료
   */
  const onCloseRankModal = useCallback(() => {
    Router.back();
  }, [Router]);

  const _setIsViewUserProfile = useCallback(() => {
    dispatch({
      type: MORE_VIDEO,
      data: {
        lastRealIdx: index,
        uploaderScrollTop: 0,
      },
    });

    // 쿼리스트링
    const query = Router.query;
    delete query.video_no;

    Router.push(
      {
        pathname: "/video/[video_no]",
        query: Object.assign({}, query, {
          isViewUserProfile: true,
        }),
      },
      {
        pathname: `/video/${originVideoNo}`,
        query: Object.assign({}, query, {
          isViewUserProfile: true,
        }),
      }
    );

    setIsViewUserProfile((prevState) => {
      console.log(prevState);
      return !prevState;
    });

    // Router.push(location.pathname + newSearchUrl);

    // setIsViewUserProfile(prevState => !prevState);
  }, [Router, originVideoNo, verticalSwiper.current]);

  // 랭크 페이지 보기 여부
  const _setIsViewRank = useCallback(() => {
    const query = Router.query;
    delete query.video_no;

    Router.push(
      {
        pathname: "/video/[video_no]",
        query: Object.assign({}, query, {
          isViewRank: true,
        }),
      },
      {
        pathname: `/video/${originVideoNo}`,
        query: Object.assign({}, query, {
          isViewRank: true,
        }),
      }
    );

    setIsViewRank((prevState) => !prevState);
  }, [Router, originVideoNo, verticalSwiper.current]);

  const _handleRemoveComment = (commentNo) => {
    console.log("handleRemoveComment ", commentNo);
    if (window.confirm("해당 댓글을 삭제 하시겠습니까?")) {
      commentApi.delete("/", { params: { commentNo } }).then((res) => {
        console.log("res.data", res.data);
      });
    }
  };

  const _handlePush = (e, currentVideo) => {
    console.log(currentVideo);
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
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "현재 카테고리의 영상은 푸쉬하기가 불가능합니다.",
          isViewClose: false,
        },
      });
      return;
    } else {
      Router.push({
        pathname: "/push",
        query: {
          targetUserNo: currentVideo.USER.user_no,
          videoNo: currentVideo.video_no,
          ref: encodeURIComponent(Router.asPath),
        },
      });
    }
  };
  console.log("muted", muted);
  return (
    <>
      <ViewVideoContext.Provider
        value={{
          onLikeVideo,
          _setIsViewComment,
          handleRemoveComment: _handleRemoveComment,
          setIsViewUserProfile: _setIsViewUserProfile,
          toggleViewBottom: _toggleViewBottom,
          setIsViewRank: _setIsViewRank,
          handlePush: _handlePush,
          isViewBottom,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 35,
            height: 50,
            left: 35,
            bottom: 0,
            zIndex: 2,
          }}
          onClick={() => _toggleMuted()}
        ></div>
        {/* <div className="history_back_frame" onClick={() => Router.back()}>
            <div className="history_back_btn">
              <img src={arrowLeft} alt="arrow_left" />
            </div>
          </div> */}
        {isLoaded ? (
          <div className="loading_container">
            <LoadingCircle borderColor="#777" borderSize="4px" size="40px" />
          </div>
        ) : (
          <div className="swiper-container" onClick={() => _toggleViewBottom()}>
            <div className="swiper-wrapper">
              {/* {Boolean(videoList.length) && */}
              {videoList &&
                videoList.map((video, i) => (
                  <div
                    className="swiper-slide"
                    key={i}
                    id={!isOfficial ? video.USER && video.USER.user_no : null}
                  >
                    {(index === i || index - 1 === i || index + 1 === i) && (
                      <>
                        <ViewVideoComponent
                          isOfficial={isOfficial}
                          currentVideo={video}
                          isPush={isPush}
                          videoNo={video.video_no}
                          isViewComment={isViewComment}
                          setIsViewComment={_setIsViewComment}
                          realIdx={index}
                          isViewBottom={isViewBottom}
                          toggleViewBottom={_toggleViewBottom}
                          error={error === 3 && index === i}
                          muted={muted}
                          _toggleMuted={_toggleMuted}
                        />
                      </>
                    )}
                  </div>
                ))}
            </div>
            {!error && Boolean(videoList.length) && (
              <Bottom
                isPush={isPush}
                isOfficial={isOfficial}
                currentVideo={videoList[index]}
                setIsViewComment={_setIsViewComment}
                totalPush={totalPush}
                videoNo={videoList[index].video_no}
                handleLike={(e) =>
                  onLikeVideo(e, {
                    videoNo: videoList[index].video_no,
                    isLiked: !Boolean(videoList[index].active_log_no),
                  })
                }
                realIdx={index}
                active={activeBottomIdx === index}
                isViewBottom={isViewBottom}
              />
            )}
          </div>
        )}
        {isViewComment && Boolean(videoList.length) && !error && (
          <VideoCommentContainer videoNo={videoNo} />
          // <CommentContainer
          //   setIsViewComment={_setIsViewComment}
          //   videoNo={videoNo}
          // />
        )}
        {isViewUserProfile && Boolean(videoList.length) && !error && (
          <div
            className="user_profile"
            // onTouchStart={_handleTouchStart}
            // onTouchEnd={_handleTouchEnd}
          >
            <UserProfileContainer userNo={videoList[index].USER.user_no} />
          </div>
        )}
        {isViewRank && Boolean(videoList.length) && (
          <div
            className="video_rank"
            // onTouchStart={_handleTouchOn}
            // onTouchEnd={_handleTouchOff}
          >
            <div className="rank_modal" onClick={onCloseRankModal} />
            <Body
              style={{
                width: "85%",
                height: "100%",
                backgroundColor: BACKGROUND_BLACK_COLOR,
                zIndex: "100",
                position: "relative",
                padding: "initial",
              }}
              isViewScroll={false}
            >
              <Rank category3No={videoList[index].category_level3_no} modal />
            </Body>
          </div>
        )}
        {/* {targetUserNo && (
            <PushContainer
              closePushModal={_closePushModal}
              handleConfirmPush={_handleConfirmPush}
              targetUserNo={targetUserNo}
            />
          )} */}

        <style jsx>{`
          .toggle_cover {
            position: fixed;
            left: 0;
            top: 100px;
            width: 100vw;
            height: calc(100vh - 300px);
            z-index: 2;
          }
          .history_back_frame {
            position: fixed;
            left: 10px;
            top: 54px;
            width: 20px;
            height: 50px;
            z-index: 2;
            padding: 0 10px;
            text-align: center;
          }
          .history_back_btn {
            position: absolute;
            width: 20px;
            height: 15px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .history_back_btn > img {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .user_profile {
            position: absolute;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            z-index: 2;
            overflow-y: auto;
            animation: slide-to-left 0.3s linear;
            transition: 0.3s ease;
            background-color: #000;
          }

          .rank_modal {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: calc(100vh - 100px);
            background-color: rgba(30, 30, 37, 0.6);
            z-index: 1;
            cursor: pointer;
          }

          .video_rank {
            position: fixed;
            width: 100vw;
            height: calc(100% - 100px);
            top: 50px;
            left: 0;
            z-index: 1;
            overflow-y: auto;
            animation: slide-to-right 0.3s linear;
            transition: 0.3s ease;
          }
          .swiper-container {
            width: 100vw;
            height: 100%;
            bottom: 0;
          }
          .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #000;

            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
          }
          @keyframes slide-to-left {
            from {
              left: 100vw;
            }
            to {
              left: 0;
            }
          }
          @keyframes slide-to-right {
            from {
              left: -100vw;
            }
            to {
              left: 0;
            }
          }
        `}</style>
      </ViewVideoContext.Provider>
    </>
  );
};

export default ViewVideoContainer;
