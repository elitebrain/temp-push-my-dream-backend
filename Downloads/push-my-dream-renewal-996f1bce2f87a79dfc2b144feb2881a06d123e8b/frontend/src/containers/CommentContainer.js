import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { commentApi } from "shared/api";

import Reple from "components/Common/Reple";

import video_profile_img from "public/assets/image/video_profile_img.png";
import { findSearchStringValue } from "shared/functions";
import { OPEN_MODAL } from "store/reducers/modal";

import { UserContext } from "containers/User/UserContainer";
export const CommentContext = createContext();

const CommentContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAdmin } = useSelector((state) => state.common);
  const [commentList, setCommentList] = useState([]);
  const [videoNo, setVideoNo] = useState(router.query.video_no);
  const { selectedVideoNo } = useContext(UserContext);
  useEffect(() => {
    if (selectedVideoNo) {
      setVideoNo(selectedVideoNo);
    }
  }, [selectedVideoNo]);
  useEffect(() => {
    // const videoNo = findSearchStringValue(location.search, "videoNo");
    if (videoNo) {
      _getCommentList(videoNo);
    }
    // setVideoNo(videoNo);
  }, [videoNo]);

  const _getCommentList = (videoNo) => {
    commentApi.get("/", { params: { videoNo } }).then((res) => {
      if (res.data) {
        setCommentList(res.data);
      }
    });
  };
  const _handleSave = useCallback(
    (sendData) => {
      if (isAdmin) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "관리자 모드에선 댓글 작성이 불가능합니다.",
          },
        });
      }

      commentApi.post("/", sendData, { withCredentials: true }).then((res) => {
        if (res.data && res.data.message === "insert success") {
          _getCommentList(videoNo);
        }
      });
    },
    [dispatch, videoNo, isAdmin]
  );
  const _handleRemoveComment = (commentNo) => {
    console.log("handleRemoveComment ", commentNo);
    if (window.confirm("해당 댓글을 삭제 하시겠습니까?")) {
      commentApi
        .delete("/", { params: { commentNo }, withCredentials: true })
        .then((res) => {
          console.log("res.data", res.data);
          // const videoNo = findSearchStringValue(location.search, "videoNo");
          _getCommentList(videoNo);
        });
    }
  };
  console.log("CommentContainer~~~~~~~~~~~~~~~~~~~");
  return (
    <CommentContext.Provider
      value={{ handleRemoveComment: _handleRemoveComment }}
    >
      <Reple
        commentList={commentList}
        countComment={commentList.length}
        videoNo={videoNo}
        handleSave={_handleSave}
      />
    </CommentContext.Provider>
  );
};

export default CommentContainer;
