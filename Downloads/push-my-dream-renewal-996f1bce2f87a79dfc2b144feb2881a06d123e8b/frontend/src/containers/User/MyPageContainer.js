import React, { useEffect, useCallback, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import MyPageComponent from "components/User/MyPage/MyPageComponent";

import {
  UPDATE_VIDEO_ISOPEN_REQUEST,
  DELETE_VIDEO_REQUEST,
  GET_MYVIDEOLIST_REQUEST,
} from "store/reducers/video";
import { OPEN_MODAL } from "store/reducers/modal";
import { LOAD_USER_REQUEST } from "store/reducers/user";

export const MyPageContext = createContext();

const MyPageContainer = () => {
  const dispatch = useDispatch();
  const { myVideoList } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    dispatch({
      type: GET_MYVIDEOLIST_REQUEST,
    });
  }, [dispatch]);

  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   userApi.get("/", { withCredentials: true }).then(res => {
  //     if (res.data && res.data.message === "success load user") {
  //       setUser(res.data.user);
  //     }
  //   });
  // }, []);

  // 비디오 오픈 공개
  const onToggleFlagByVideoNo = useCallback(
    (videoNo, flag) => {
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
    (videoNo) => {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "영상을 삭제하시겠습니까?",
          confirmText: "삭제",
          isViewClose: true,
          onConfirm: () => {
            dispatch({ type: DELETE_VIDEO_REQUEST, data: videoNo });
          },
        },
      });
    },
    [dispatch]
  );

  return (
    <MyPageContext.Provider value={{ onToggleFlagByVideoNo, onRemoveVideo }}>
      <MyPageComponent />
    </MyPageContext.Provider>
  );
};

export default MyPageContainer;
