import React, { useState, useEffect, useCallback, createContext } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { videoApi, commonApi, userApi } from "shared/api";

import { findSearchStringValue } from "shared/functions";

import {
  ADD_FOLLOW_REQUEST,
  DELETE_FOLLOW_REQUEST,
  VIDEO_LIKE_UPDATE,
} from "store/reducers/user";
import { OPEN_MODAL } from "store/reducers/modal";
import ModalUserProfile from "components/User/UserProfile/ModalUserProfile";
import Loader from "components/Common/Loader";

export const UserContext = createContext();

const UserContainer = ({ _currentUser, userNo, videoNo }) => {
  // user : 로그인 한 사용자(본인) 정보
  // currentUser : 사용자 정보 (/user?userNo=n) 조회 시 해당 사용자에 대한 정보
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(_currentUser);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [selectedVideoNo, setVideoNo] = useState(null);
  const [myPush, setMyPush] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const { isAdmin } = useSelector((state) => state.common);
  const { followingList, isLoggedIn, likeVideoList } = user;

  // useEffect(() => {
  //   userApi
  //     .get("/info", {
  //       params: { userNo: findSearchStringValue(location.search, "userNo") }
  //     })
  //     .then(res => {
  //       if (res.data) {
  //         if (res.data.user_no) {
  //           setCurrentUser(res.data);
  //         } else {
  //           alert("존재하지 않는 사용자 입니다.");
  //           Router.replace("/");
  //         }
  //       }
  //     });
  // }, []);
  // 팔로우 신청/ 해제
  const _handleFollow = useCallback(
    async (gubun) => {
      setFollowLoading(true);
      const targetNo = currentUser.user_no;
      if (isAdmin) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "관리자 모드로 팔로우 기능은 이용할 수 없습니다.",
          },
        });
        setFollowLoading(false);
      }
      if (isLoggedIn) {
        if (gubun === "follow") {
          dispatch({
            type: ADD_FOLLOW_REQUEST,
            data: {
              targetNo,
            },
            success() {
              setCurrentUser((prevState) =>
                Object.assign({}, prevState, {
                  countFollowUser: prevState.countFollowUser + 1,
                })
              );
              setFollowLoading(false);
            },
          });
        } else {
          dispatch({
            type: DELETE_FOLLOW_REQUEST,
            data: {
              targetNo,
            },
            success() {
              setCurrentUser((prevState) =>
                Object.assign({}, prevState, {
                  countFollowUser: prevState.countFollowUser - 1,
                })
              );
              setFollowLoading(false);
            },
          });
        }
      } else {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "로그인 후 이용 가능합니다.",
          },
        });
        setFollowLoading(false);
      }
    },
    [currentUser, isLoggedIn, dispatch, isAdmin]
  );
  const _handleVideo = (videoNo) => {
    if (
      currentUser.VIDEO.filter((v) => v.video_no === parseInt(videoNo, 10))
        .length > 0
    ) {
      setVideoNo(parseInt(videoNo, 10));
      setCurrentVideo(
        currentUser.VIDEO.filter((v) => v.video_no === parseInt(videoNo, 10))[0]
      );
    }
  };
  useEffect(() => {
    if (videoNo && currentUser) {
      _handleVideo(videoNo);
    } else if (currentUser) {
      _handleVideo(currentUser.VIDEO[0].video_no);
    }
  }, [videoNo, currentUser]);
  console.log("currentUser", currentUser);
  const _getMyPush = (targetUserNo) => {
    console.log("\n\n_getMyPush");
    commonApi
      .get(`/my-push?targetUserNo=${targetUserNo}`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setMyPush(res.data);
        }
      });
  };
  useEffect(() => {
    console.log("\n\n currentUser", currentUser);
    if (currentUser) {
      _getMyPush(currentUser.user_no);
    }
  }, [currentUser]);
  const _handleLike = async (gubun, videoNo) => {
    console.log("_handleLike", gubun, videoNo);
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
          await videoApi.post("/like", { videoNo }, { withCredentials: true });

          // const result = await videoApi.get("/", {
          //   params: { videoNo, listGubun },
          //   withCredentials: true,
          // });
          dispatch({
            type: VIDEO_LIKE_UPDATE,
            data: [...likeVideoList, videoNo],
          });
          // setVideoList(result.data.videoList);
        } else {
          await videoApi.delete("/like", {
            params: { videoNo },
            withCredentials: true,
          });

          // const result = await videoApi.get("/", {
          //   params: { videoNo, listGubun },
          //   withCredentials: true,
          // });
          dispatch({
            type: VIDEO_LIKE_UPDATE,
            data: likeVideoList.filter((v) => v !== videoNo),
          });
          // setVideoList(result.data.videoList);
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
  };
  console.log("userNouserNouserNouserNo", userNo);
  useEffect(() => {
    setLoading(true);
    userApi
      .get("/info", { params: { userNo }, withCredentials: true })
      .then((res) => {
        if (res.data) {
          setCurrentUser(res.data.user);
          setLoading(false);
        }
      });
  }, [userNo]);
  return (
    // <UserComponent
    //   user={user}
    //   currentUser={currentUser}
    //   handleFollow={_handleFollow}
    //   followingList={followingList}
    // />
    <UserContext.Provider
      value={{
        currentUser,
        user,
        handleVideo: _handleVideo,
        currentVideo,
        selectedVideoNo,
        myPush,
        getMyPush: _getMyPush,
        handleLike: _handleLike,
        handleFollow: _handleFollow,
        followLoading,
      }}
    >
      {loading ? <Loader /> : currentUser && <ModalUserProfile />}
    </UserContext.Provider>
  );
};

export default UserContainer;

// import React, { useState, useEffect } from "react";
// import Router from "next/router";
// import { useSelector } from "react-redux";

// import { userApi } from "shared/api";

// import { findSearchStringValue } from "shared/functions";

// import UserComponent from "components/User/UserVideo/UserComponent";

// const UserContainer = ({ currentUser }) => {
//   // user : 로그인 한 사용자(본인) 정보
//   // currentUser : 사용자 정보 (/user?userNo=n) 조회 시 해당 사용자에 대한 정보
//   const [currentUser, setCurrentUser] = useState({});
//   const [followingList, setFollowingList] = useState([]);
//   const user = useSelector(state => state.user);

//   console.log(followingList);
//   useEffect(() => {
//     setFollowingList(user.followingList);
//   }, [user]);
//   useEffect(() => {
//     userApi
//       .get("/info", {
//         params: { userNo: findSearchStringValue(location.search, "userNo") }
//       })
//       .then(res => {
//         if (res.data) {
//           if (res.data.user_no) {
//             setCurrentUser(res.data);
//           } else {
//             alert("존재하지 않는 사용자 입니다.");
//             Router.replace("/");
//           }
//         }
//       });
//   }, []);
//   const _handleFollow = async gubun => {
//     const userNo = user.user_no;
//     const targetNo = currentUser.user_no;
//     if (userNo) {
//       if (gubun === "follow") {
//         await userApi.post("/follow", { targetNo, userNo }).then(res => {
//           setFollowingList(prevState => [...prevState, targetNo]);
//           setCurrentUser(prevState =>
//             Object.assign({}, prevState, {
//               countFollowUser: prevState.countFollowUser + 1
//             })
//           );
//         });
//       } else {
//         await userApi
//           .delete("/follow", { params: { targetNo, userNo } })
//           .then(res => {
//             setFollowingList(prevState =>
//               prevState.filter(v => v !== targetNo)
//             );
//             setCurrentUser(prevState =>
//               Object.assign({}, prevState, {
//                 countFollowUser: prevState.countFollowUser - 1
//               })
//             );
//           });
//       }
//     } else {
//       alert("로그인 후 이용 가능합니다.");
//     }
//   };
//   return (
//     <UserComponent
//       user={user}
//       currentUser={currentUser}
//       handleFollow={_handleFollow}
//       followingList={followingList}
//     />
//   );
// };

// export default UserContainer;
