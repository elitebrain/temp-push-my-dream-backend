import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "store/reducers/modal";

const VideoEtcModal = () => {
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    dispatch({
      type: CLOSE_MODAL,
    });
  }, [dispatch]);

  return (
    <div className="video_etc_wrapper">
      <div className="top">신고</div>
      <div className="mid">게시물 알림 설정</div>
      <div className="bottom" onClick={onCloseModal}>
        취소
      </div>
      <style jsx>{`
        .video_etc_wrapper {
          position: fixed;
          width: calc(100vw - 30px);
          background-color: #fff;
          border-radius: 10px;
          padding: 0 20px;
          box-sizing: border-box;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .video_etc_wrapper div {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #878792;
          font-size: 15px;
        }

        .video_etc_wrapper div:last-child {
          border: none;
          color: #ff3f3f;
        }
      `}</style>
    </div>
  );
};

export default VideoEtcModal;
