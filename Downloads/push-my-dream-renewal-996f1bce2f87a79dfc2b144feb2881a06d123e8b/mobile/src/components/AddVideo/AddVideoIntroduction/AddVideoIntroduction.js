import React, { useContext } from "react";

import { UploadContext } from "containers/UploadContainer";

const AddVideoIntroduction = () => {
  const { title, onChangeTitle, description, onChangeDescription } = useContext(
    UploadContext
  );
  return (
    <div className="video_info">
      <div className="title">
        <span>영상제목</span>
        <input
          type="text"
          maxLength="20"
          value={title}
          onChange={onChangeTitle}
          placeholder="20자 이하로 작성해주세요."
        />
      </div>
      <div className="introduce">
        <span>영상소개</span>
        <textarea
          maxLength="100"
          value={description}
          onChange={onChangeDescription}
          placeholder="100자 이하로 작성해주세요."
        />
      </div>
      <style jsx>{`
        .video_info {
          width: 100%;
          margin: 0 auto;
        }
        .title span,
        .introduce span {
          display: block;
          margin-bottom: 10px;
          margin-right: 30px;
          font-size: 15px;
          font-weight: 400;
          color: #fff;
          margin-top: 20px;
        }
        .title input {
          height: 60px;
          width: 100%;
          border-radius: 15px;
          border: none;
          font-size: 16px;
          padding: 0 30px;
          box-sizing: border-box;
        }
        .introduce textarea {
          width: 100%;
          height: 139px;
          overflow: auto;
          border-radius: 15px;
          padding: 21px;
          display: inline-block;
          box-sizing: border-box;
          font-size: 15px;
          font-weight: 400;
          line-height: 21px;
          resize: none;
        }
      `}</style>
    </div>
  );
};

export default AddVideoIntroduction;
