import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { WHITE_COLOR } from "shared/constants/colors";

const VideoError = ({ error }) => {
  const { isLoggedIn } = useSelector((state) => state.user.isLoggedIn);

  const errorMessage =
    error === 1
      ? "서버에 오류가 발생하였습니다."
      : error === 2
      ? "비공개 또는 삭제된 비디오입니다."
      : error === 3
      ? isLoggedIn
        ? "권한이 없습니다."
        : "로그인 후 이용해주세요"
      : "";

  return (
    <div className="VideoErrorContainer">
      <span>{errorMessage}</span>
      <style jsx>{`
        .VideoErrorContainer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.75);
        }

        .VideoErrorContainer span {
          font-size: 16px;
          color: ${WHITE_COLOR};
        }
      `}</style>
    </div>
  );
};

export default VideoError;
