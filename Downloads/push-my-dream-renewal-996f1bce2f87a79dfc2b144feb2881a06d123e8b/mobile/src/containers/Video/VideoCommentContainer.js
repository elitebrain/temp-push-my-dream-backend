import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import VideoComment from "components/Video/ViewVideo/VideoComment";
import { OPEN_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";
import { videoApi, commentApi } from "shared/api";

const VideoCommentContainer = ({ videoNo }) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (videoNo) {
      setIsLoading(true);
      fetchComments();
    }

    /**
     * 비디오의 comment 조회
     */
    async function fetchComments() {
      try {
        const {
          data: { comments },
        } = await videoApi.get(`/${videoNo}/comments`);
        setComments(comments);
      } catch (error) {
        console.error(error);
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: getError(error),
            isViewClose: false,
          },
        });
      }

      setIsLoading(false);
    }
  }, [videoNo, dispatch]);

  /**
   * 댓글창 종료
   */
  const onCloseViewComments = useCallback(() => {
    Router.back();
  }, [Router]);

  /**
   * 댓글 작성
   */
  const onSetComment = useCallback(
    async ({ comment }) => {
      if (isLoggedIn) {
        if (!comment.length) {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: "댓글을 입력해주세요.",
              isViewClose: false,
            },
          });
          return;
        }

        try {
          await commentApi.post(
            "/",
            { videoNo, comment },
            { withCredentials: true }
          );

          /**
           * todo : 기존 댓글 이후의 댓글들만 조회하게..
           */
          const {
            data: { comments },
          } = await videoApi.get(`/${videoNo}/comments`);
          setComments(comments);
        } catch (error) {
          console.error(error);
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: getError(error),
              isViewClose: false,
            },
          });
        }
      }
    },
    [dispatch, isLoggedIn, videoNo]
  );

  /**
   * 댓글 삭제
   */

  const onDeleteComment = useCallback(
    async (commentNo) => {
      if (isLoggedIn) {
        try {
          await commentApi.delete("/", {
            params: { commentNo },
            withCredentials: true,
          });

          setComments((prev) =>
            prev.map((comment) =>
              comment.comment_no === commentNo
                ? { ...comment, comment: "ⓘ 삭제된 메시지입니다.", flag: 6 }
                : comment
            )
          );
        } catch (error) {
          console.error(error);
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: getError(error),
              isViewClose: false,
            },
          });
        }
      }
    },
    [isLoggedIn]
  );

  return (
    <div className="VideoComment">
      {!isLoading && (
        <VideoComment
          isLoading={isLoading}
          comments={comments}
          onSetComment={onSetComment}
          onDeleteComment={onDeleteComment}
          onCloseViewComments={onCloseViewComments}
        />
      )}
      <style jsx>{`
        .VideoComment {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100%;
          z-index: 1;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

VideoCommentContainer.propTypes = {
  videoNo: PropTypes.number.isRequired,
};

export default React.memo(VideoCommentContainer);
