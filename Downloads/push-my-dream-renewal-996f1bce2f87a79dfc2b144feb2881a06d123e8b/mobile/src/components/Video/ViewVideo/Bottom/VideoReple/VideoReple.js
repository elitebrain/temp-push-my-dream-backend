import React from "react";
import { useSelector } from "react-redux";

const VideoReple = props => {
  const { commentList } = props;
  const { user_no } = useSelector(state => state.user);
  return (
    <div className="video_reple">
      {commentList &&
        commentList.map(comment => (
          <div
            className={`reple_list${
              user_no === comment.user_no ? " my_reple_list" : ""
            }`}
            key={comment.comment_no}
          >
            <span className="nick_name">{comment.nickname}</span>
            <span className="reple_content">{comment.comment}}</span>
          </div>
        ))}
      <div className="reple_list ">
        <span className="nick_name">Music my life</span>
        <span className="reple_content">이분 최소 지망생</span>
      </div>
      <div className="reple_list my_reple_list">
        <span className="nick_name">Jane Musa</span>
        <span className="reple_content">옷 잘입는다~</span>
      </div>

      <style jsx>{`
        .video_reple {
          height: 85px;
          margin-bottom: 21px;
          padding: 0 20px;
          overflow: auto;
          padding-top: 100px;
          -ms-overflow-style: none;
        }
        .video_reple::-webkit-scrollbar {
          display: none !important;
        }
        .video_reple .reple_list {
          line-height: 21px;
        }
        .video_reple .reple_list .nick_name {
          font-size: 12px;
          font-weight: 400;
          color: #adadad;
          display: inline-block;
          margin-right: 7px;
        }
        .video_reple .reple_list .reple_content {
          font-size: 12px;
          font-weight: 400;
          color: #fff;
          display: inline-block;
        }
        .video_reple .my_reple_list .nick_name {
          font-size: 12px;
          font-weight: bold;
          color: #f38400;
        }
        .video_reple .my_reple_list .reple_content {
          font-size: 12px;
          font-weight: bold;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default VideoReple;
