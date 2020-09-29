import React from "react";
import { useSelector } from "react-redux";

import Loader from "components/Common/Loader";

const UploadModal = () => {
  const { isConvertedLoaded, uploadPercent } = useSelector(
    state => state.video
  );
  return (
    <div className="uploadModal">
      <Loader />
      {!isConvertedLoaded ? (
        <>
          <p>{uploadPercent}%</p>
          <p>영상이 업로드 중입니다.</p>
        </>
      ) : (
        <p>영상이 변환 중입니다.</p>
      )}
      <p>잠시만 기다려주세요.</p>
      <style jsx>{`
        .uploadModal {
          width: 400px;
          height: 300px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        p {
          margin-top: 20px;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default UploadModal;
