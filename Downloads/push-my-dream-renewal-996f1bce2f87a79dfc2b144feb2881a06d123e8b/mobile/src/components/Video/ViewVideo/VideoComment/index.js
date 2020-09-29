import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import VideoCommentItem from "./VideoCommentItem";
import NewButton from "components/Common/NewButton";
import glassIcon from "public/assets/image/button_glass.png";
import List from "components/Common/List";

import {
  GRADIENT_2F3354_040221,
  WHITE_COLOR,
  COLOR_808080,
  COLOR_696C8C,
} from "shared/constants/colors";
import {
  IMAGE_SERVER,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from "shared/constants/variables";

const VideoComment = ({
  isLoading,
  comments,
  onSetComment,
  onCloseViewComments,
  onDeleteComment,
}) => {
  const commentRef = useRef(null);

  const [comment, setComment] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);

  /**
   * 스크롤 이벤트를 위한 useEffect
   */
  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.addEventListener("scroll", scrollEvent);

      return function cleanup() {
        commentRef.current.removeEventListener("scroll", scrollEvent);
      };
    }

    function scrollEvent(e) {
      const { scrollTop } = e.srcElement;

      setIsScrollTop(!scrollTop ? false : true);
    }
  }, [commentRef]);

  /**
   * 최적화
   */
  const commentsMemo = useMemo(
    () =>
      comments.map((comment) => ({
        ...comment,
        user_photo: `${IMAGE_SERVER}?file=${comment.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
      })),
    [comments]
  );

  const renderCommentItem = useCallback(
    (comment) => (
      <VideoCommentItem
        key={comment.comment_no}
        comment={comment}
        onDeleteComment={onDeleteComment}
      />
    ),
    []
  );

  /**
   * 댓글 작성 클릭
   */
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (isLoggedIn) {
        setComment("");
        onSetComment({ comment: comment.trim() });
      }
    },
    [onSetComment, comment, isLoggedIn]
  );

  /**
   * 댓글 작성
   */
  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  // document.querySelectorAll(".VideoComment_Comments").onscroll = function () {
  //   this.classList[this.scrollTop < 20 ? "add" : "remove"]("shadow-top");
  //   this.classList[
  //     this.scrollHeight - this.clientHeight - this.scrollTop < 20
  //       ? "add"
  //       : "remove"
  //   ]("shadow-bottom");
  // };
  console.log("\n\n\n comments", comments)
  return (
    <>
      <div className="CloseOveray" onClick={onCloseViewComments} />
      <div className="VideoComment_Content">
        <div className="VideoComment_Header">{`댓글 ${comments.filter(v => v.flag === 0).length}`}</div>

        {/* <div className="VideoComment_Comments" ref={commentRef}>
          {comments && comments.length ? (
            <List list={comments} renderItem={renderCommentItem} />
          ) : (
            <div className="Empty">댓글이 없습니다.</div>
          )}
        </div> */}

        {isScrollTop && <div className="ShadowTop" />}
        <div className="VideoComment_Comments" ref={commentRef}>
          {commentsMemo && commentsMemo.length ? (
            <List list={commentsMemo} renderItem={renderCommentItem} />
          ) : (
              <div className="Empty">댓글이 없습니다.</div>
            )}
        </div>
        <form
          className="VideoComment_Input"
          onSubmit={onSubmit}
        // style={
        //   /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        //     ? isFocus
        //       ? { marginBottom: "80px" }
        //       : { marginBottom: "30px" }
        //     : {}
        // }
        >
          <div className="InnerInput">
            <textarea
              className="TextArea"
              placeholder={
                isLoggedIn
                  ? "댓글을 입력해 주세요."
                  : "로그인 후 이용할 수 있습니다."
              }
              value={comment}
              onChange={onChangeComment}
              readOnly={!isLoggedIn}
              onClick={() => {
                setIsFocus(true);
              }}
            />
            <div className="Button">
              <NewButton width="100%" height="100%" bgColor="transparent">
                <img className="GlassButton" src={glassIcon} />
                <span className="Content">등록</span>
              </NewButton>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .CloseOveray {
          flex: 3;
          cursor: pointer;
        }

        .VideoComment_Content {
          box-sizing: border-box;
          padding: 10px 15px 20px 15px;
          flex: 7;
          background-image: ${GRADIENT_2F3354_040221(180, "-27.65%", "68.61%")};
          border-radius: 10px 10px 0px 0px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: hidden;

          position: relative;
        }

        .VideoComment_Content .VideoComment_Header {
          font-size: 15px;
          line-height: 20px;
          color: ${WHITE_COLOR};
          text-align: center;
          flex-basis: 20px;
          margin-bottom: 10px;
        }

        .VideoComment_Content .VideoComment_Comments {
          overflow-y: auto;
          flex: 1;
          transition: 0.5s all ease-in-out;

          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .VideoComment_Content .VideoComment_Comments ::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }

        .ShadowTop {
          box-sizing: border-box;
          width: calc(100% - 30px);
          height: 10px;
          margin: 0 15px;

          position: absolute;
          left: 0;
          top: 40px;
          -webkit-box-shadow: inset 0px 10px 10px -5px rgba(0, 0, 0, 0.25);
          -moz-box-shadow: inset 0px 10px 10px -5px rgba(0, 0, 0, 0.25);
          box-shadow: inset 0px 10px 10px -5px rgba(0, 0, 0, 0.25);
          animation: 0.5s shadowAnimate ease-in-out;
        }

        @keyframes shadowAnimate {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .VideoComment_Content .VideoComment_Comments .Empty {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: ${COLOR_696C8C};
          font-size: 14px;
        }

        .VideoComment_Content .VideoComment_Input {
          margin-top: 10px;
          flex-basis: 50px;
          position: relative;

          border-radius: 10px;
          background: linear-gradient(
            180deg,
            #4c4c62 0%,
            #4c4c62 7.29%,
            #11172f 23.96%,
            #4c4c62 36.98%,
            #4c4c62 62.5%,
            #11172f 76.04%,
            #4c4c62 89.58%,
            #373d54 100%
          );
        }

        .VideoComment_Content .VideoComment_Input .InnerInput {
          margin: 2px;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          background: #040221;
          border-radius: 10px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          position: absolute;
          top: 0;
          left: 0;
        }

        .VideoComment_Content .VideoComment_Input .InnerInput .TextArea {
          display: flex;
          align-items: center;

          flex: 1;
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          border: none;
          background: transparent;
          box-sizing: border-box;
          padding: 15px 0 0 10px;
          resize: none;
          color: ${COLOR_808080};
        }

        .VideoComment_Content
          .VideoComment_Input
          .InnerInput
          .TextArea:placeholder {
          color: ${COLOR_808080};
        }

        .VideoComment_Content .VideoComment_Input .InnerInput .Button {
          margin-left: 10px;
          margin-right: 15px;
          flex-basis: 30px;
          width: 30px;
          height: 30px;

          position: relative;
        }

        .VideoComment_Content
          .VideoComment_Input
          .InnerInput
          .Button
          .GlassButton {
          width: 100%;
          height: 100%;
        }

        .VideoComment_Content .VideoComment_Input .InnerInput .Button .Content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: 12px;
          line-height: 30px;

          color: ${WHITE_COLOR};
          text-align: center;
        }
      `}</style>
    </>
  );
};

VideoComment.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,

  onSetComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onCloseViewComments: PropTypes.func.isRequired,
};

export default VideoComment;
