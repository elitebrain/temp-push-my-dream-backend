import React, { useContext } from "react";

import { UploadContext } from "containers/UploadContainer";

const UploadIntroduction = () => {
  const { title, onChangeTitle, description, onChangeDescription } = useContext(
    UploadContext
  );

  return (
    <div className="UploadIntroduction">
      <div className="UploadIntroductionList">
        <span>영상제목</span>
        <input
          type="text"
          maxLength="20"
          value={title}
          onChange={onChangeTitle}
          placeholder="20자 이하로 작성해주세요."
        />
      </div>
      <div className="UploadIntroductionList">
        <span>영상소개</span>
        <textarea
          maxLength="100"
          value={description}
          onChange={onChangeDescription}
          placeholder="100자 이하로 작성해주세요."
        />
      </div>
      <style jsx>{`
        .UploadIntroduction {
          width: 600px;
          /*height: 200px;*/
          margin: 0 auto;
          margin-bottom: 30px;
        }
        .UploadIntroduction .UploadIntroductionList:first-of-type {
          margin-bottom: 20px;
        }

        .UploadIntroduction .UploadIntroductionList span {
          display: inline-block;
          width: 74px;
          margin-right: 30px;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          vertical-align: top;
          margin-top: 20px;
          line-height: 28px;
        }

        .UploadIntroduction .UploadIntroductionList input {
          width: 465px;
          height: 60px;
          padding-left: 30px;
          font-size: 16px;
          font-weight: 400;
          display: inline-block;
          border-radius: 15px;
          border: none;
        }

        .UploadIntroduction .UploadIntroductionList textarea {
          width: 495px;
          height: 170px;
          border-radius: 15px;
          padding: 20px 30px;
          display: inline-block;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
        }
      `}</style>
    </div>
  );
};

export default UploadIntroduction;
