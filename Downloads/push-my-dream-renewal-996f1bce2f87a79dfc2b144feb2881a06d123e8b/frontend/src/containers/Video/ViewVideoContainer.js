import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { videoApi, commentApi } from "shared/api";

import ViewVideoComponent from "components/Video/ViewVideo/ViewVideoComponent";
import { findSearchStringValue, getCookie } from "shared/functions";

import { GET_VIDEO_REQUEST, LIKE_VIDEO_REQUEST } from "store/reducers/video";
import { OPEN_MODAL } from "store/reducers/modal";

export const ViewVideoContext = createContext();

const ViewVideoContainer = ({ videoNo, _videoList, isOfficial, listGubun }) => {
  const dispatch = useDispatch();
  const [videoList, setVideoList] = useState(_videoList);

  const { user_no, isLoggedIn } = useSelector((state) => state.user);
  const { isAdmin } = useSelector((state) => state.common);

  // 비디오 조회수 증가
  useEffect(() => {
    async function videoView(videoNo) {
      if (videoNo) {
        const existsCookie = getCookie(videoNo.toString());
        const tempId = getCookie("temp_id");
        // cookie에 videoNo가 없으면 cookie에 추가 & 조회수 증가
        if (!existsCookie) {
          const now = Date.now();
          // 만료시간 30분
          const expires = new Date(now + 1000 * 60 * 30);
          document.cookie = `${videoNo}=true;path=/;expires=${expires.toUTCString()}`;
          // 조회수 증가
          try {
            await videoApi.post(
              "/view",
              { videoNo, userNo: user_no || null, tempId },
              { withCredentials: true }
            );
          } catch (error) {}
        }
      }
    }

    // 관리자 모드가 아닐시 비디오 조회 수 카운트 증가
    if (!isAdmin) {
      videoView(videoNo);
    }
  }, [videoNo, isAdmin]);

  // 좋아요 버튼 클릭
  const _handleLike = useCallback(
    async (gubun) => {
      if (isAdmin) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "관리자 모드에선 좋아요 버튼을 클릭할 수 없습니다.",
          },
        });
      }

      if (isLoggedIn) {
        try {
          if (gubun === "like") {
            await videoApi.post(
              "/like",
              { videoNo },
              { withCredentials: true }
            );

            const result = await videoApi.get("/", {
              params: { videoNo, listGubun },
              withCredentials: true,
            });

            setVideoList(result.data.videoList);
          } else {
            await videoApi.delete("/like", {
              params: { videoNo },
              withCredentials: true,
            });

            const result = await videoApi.get("/", {
              params: { videoNo, listGubun },
              withCredentials: true,
            });

            setVideoList(result.data.videoList);
          }
        } catch (error) {}
      } else {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "로그인 후 이용하실 수 있습니다.",
          },
        });
      }
    },
    [dispatch, isAdmin, isLoggedIn, listGubun, videoNo]
  );

  return (
    <ViewVideoContext.Provider
      value={{
        _handleLike,
        isOfficial,
      }}
    >
      <ViewVideoComponent currentVideo={videoList[0]} />
    </ViewVideoContext.Provider>
  );
};

export default ViewVideoContainer;

// custom video player의 플레이버튼 클릭시 조회수 올라가기

// const [video, setVideo] = useState({});
// const [commentList, setCommentList] = useState([]);
// const [countComment, setCountComment] = useState(0);

// useEffect(() => {
//   videoApi
//     .get("/", {
//       params: {
//         videoNo: parseInt(findSearchStringValue(location.search, "videoNo"))
//       }
//     })
//     .then(res => {
//       if (res.data) {
//         setVideo(res.data);
//       }
//     });
// commentApi
//   .get("/", {
//     params: {
//       videoNo: parseInt(findSearchStringValue(location.search, "videoNo"))
//     }
//   })
//   .then(res => {
//     if (res.data) {
//       setCommentList(res.data.commentList);
//       setCountComment(res.data.countComment);
//     }
//   });
// }, []);
// console.log("video : ", video, commentList, countComment);

// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useRef,
//   useCallback
// } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { videoApi, commentApi } from "shared/api";

// import ViewVideoComponent from "components/Video/ViewVideo/ViewVideoComponent";
// import { findSearchStringValue, getCookie } from "shared/functions";

// import { GET_VIDEO_REQUEST, LIKE_VIDEO_REQUEST } from "store/reducers/video";

// export const ViewVideoContext = createContext();

// const ViewVideoContainer = () => {
//   const [videoList, setVideoList] = useState([]);
//   // const { currentVideo } = useSelector(state => state.video);
//   const [currentVideo, setCurrentVideo] = useState({});
//   const [isView, setIsView] = useState(false);
//   // const [likeVideoList, setLikeVideoList] = useState([]);
//   const dispatch = useDispatch();
//   const { user_no } = useSelector(state => state.user);
//   const [videoNo, setVideoNo] = useState(null);
//   const [listGubun, setListGubun] = useState(null);
//   const [isOfficial, setIsOfficial] = useState(false);
//   // useEffect(() => {
//   //   setLikeVideoList(user.likeVideoList);
//   // }, [user]);
//   useEffect(() => {
//     const videoNo = parseInt(findSearchStringValue(location.search, "videoNo"));
//     const listGubun = findSearchStringValue(location.search, "listGubun");
//     if (videoNo) {
//       if (listGubun) {
//         setListGubun(listGubun);
//         _getVideo(videoNo, listGubun);
//       } else {
//         setVideoNo(videoNo);
//         _getVideo(videoNo);
//       }
//     }
//   }, []);
//   const _getVideo = (videoNo, listGubun) => {
//     videoApi
//       .get("/", { params: { videoNo, listGubun }, withCredentials: true })
//       .then(res => {
//         if (res.data) {
//           console.log("res.data", res.data);
//           setVideoList(res.data.videoList);
//           setIsOfficial(res.data.isOfficial);
//         }
//       });
//   };

//   useEffect(() => {
//     _videoView(videoNo);
//   }, [videoNo]);

//   const _videoView = videoNo => {
//     if (videoNo) {
//       const existsCookie = getCookie(videoNo.toString());
//       const tempId = getCookie("temp_id");
//       // cookie에 videoNo가 없으면 cookie에 추가 & 조회수 증가
//       if (!existsCookie) {
//         const now = Date.now();
//         // 만료시간 30분
//         const expires = new Date(now + 1000 * 60 * 30);
//         document.cookie = `${videoNo}=true;path=/;expires=${expires.toUTCString()}`;
//         // 조회수 증가
//         videoApi.post(
//           "/view",
//           { videoNo, userNo: user_no || null, tempId },
//           { withCredentials: true }
//         );
//       }
//     }
//   };

//   // 조회수 증가
//   const onIncreaseView = useCallback(() => {
//     // 이 페이지에서 영상을 조회하지 않았으면 비디오 조회 수 증가
//     if (!isView) {
//       dispatch({});
//       setIsView(true);
//     }
//   }, [dispatch, isView]);

//   const _handleLike = gubun => {
//     if (user_no) {
//       if (gubun === "like") {
//         videoApi
//           .post(
//             "/like",
//             { videoNo, userNo: user_no },
//             { withCredentials: true }
//           )
//           .then(() => {
//             _getVideo(videoNo);
//           });
//       } else {
//         videoApi
//           .delete("/like", { params: { videoNo }, withCredentials: true })
//           .then(() => {
//             _getVideo(videoNo);
//           });
//       }
//     } else {
//       alert("로그인 후 이용하실 수 있습니다.");
//     }
//   };
//   return (
//     <ViewVideoContext.Provider
//       value={{
//         onIncreaseView,
//         _handleLike,
//         isOfficial
//       }}
//     >
//       <ViewVideoComponent currentVideo={videoList[0]} />
//     </ViewVideoContext.Provider>
//   );
// };

// export default ViewVideoContainer;
