import React, { useState, useEffect, createContext } from "react";
import { commentApi } from "shared/api";
import VideoReple from "components/Video/ViewVideo/Bottom/VideoReple/VideoReple";

import { findSearchStringValue } from "shared/functions";
import CommentComponent from "components/Video/ViewVideo/Comment/CommentComponent";
import CommentPreviewComponent from "components/Video/ViewVideo/Comment/CommentPreviewComponent";

export const CommentContext = createContext();

const CommentContainer = (props) => {
  const { preview, setIsViewComment, videoNo } = props;
  const [commentList, setCommentList] = useState([]);
  // const [videoNo, setVideoNo] = useState("");
  useEffect(() => {
    console.log("sdfsdfsdfsd");

    _getCommentList(videoNo);
  }, [videoNo]);
  const _getCommentList = (videoNo) => {
    commentApi.get("/", { params: { videoNo } }).then((res) => {
      if (res.data) {
        setCommentList(res.data);
      }
    });
  };
  const _handleSave = (sendData) => {
    commentApi.post("/", sendData, { withCredentials: true }).then((res) => {
      if (res.data && res.data.message === "insert success") {
        _getCommentList(videoNo);
      }
    });
  };
  const _handleRemoveComment = (commentNo) => {
    console.log("handleRemoveComment ", commentNo);
    if (window.confirm("해당 댓글을 삭제 하시겠습니까?")) {
      commentApi
        .delete("/", { params: { commentNo }, withCredentials: true })
        .then((res) => {
          console.log("res.data", res.data);
          _getCommentList(videoNo);
        });
    }
  };
  return preview ? (
    <CommentPreviewComponent
      commentList={commentList}
      countComment={commentList.length}
      videoNo={videoNo}
      handleSave={_handleSave}
    />
  ) : (
    <CommentContext.Provider
      value={{ handleRemoveComment: _handleRemoveComment }}
    >
      <CommentComponent
        commentList={commentList}
        countComment={commentList.length}
        videoNo={videoNo}
        handleSave={_handleSave}
        setIsViewComment={setIsViewComment}
      />
    </CommentContext.Provider>
  );
};

export default CommentContainer;
