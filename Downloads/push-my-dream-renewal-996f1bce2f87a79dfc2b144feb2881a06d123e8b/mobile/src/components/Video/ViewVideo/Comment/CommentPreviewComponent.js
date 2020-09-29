import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CommentPreviewComponent = props => {
  const { commentList } = props;
  const { user_no } = useSelector(state => state.user);
  useEffect(() => {
    const el = document.querySelector(
      ".swiper-slide-active .comment_container"
    );
    if (el) {
      el.scrollTop = commentList.length * 100;
    }
  }, [commentList]);
  return (
    <div className="comment_container">
      <div className="comment_wrapper">
        {commentList &&
          commentList
            .filter(v => v.hidden === 0)
            .map(comment => (
              <div
                className={`comment_list${
                  user_no === comment.user_no ? " my_comment_list" : ""
                }`}
                key={comment.comment_no}
              >
                <span className="nick_name">{comment.nickname}</span>
                <span className="comment_content">{comment.comment}</span>
              </div>
            ))}
      </div>
      <style jsx>{`
        .comment_container {
          height: 185px;
          margin-bottom: 21px;
          padding: 0 20px;
          overflow: hidden;
          -ms-overflow-style: none;
          position: relative;
        }
        .comment_wrapper {
          position: absolute;
          width: calc(100% - 40px);
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
        }
        .comment_container::-webkit-scrollbar {
          display: none !important;
        }
        .comment_list {
          line-height: 21px;
        }
        .comment_list .nick_name {
          font-size: 12px;
          font-weight: 400;
          color: #adadad;
          display: inline-block;
          margin-right: 7px;
        }
        .comment_list .comment_content {
          font-size: 12px;
          font-weight: 400;
          color: #fff;
          display: inline-block;
          word-break: break-all;
        }
        .my_comment_list .nick_name {
          font-size: 12px;
          font-weight: bold;
          color: #f38400;
        }
        .my_comment_list .comment_content {
          font-size: 12px;
          font-weight: bold;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default CommentPreviewComponent;
