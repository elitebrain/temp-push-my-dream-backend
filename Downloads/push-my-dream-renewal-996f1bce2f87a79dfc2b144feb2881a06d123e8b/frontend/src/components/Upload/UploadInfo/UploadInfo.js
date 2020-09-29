import React, { useContext, useCallback } from "react";

import { UploadContext } from "containers/UploadContainer";
import select_ico from "public/assets/icon/select_arrow(gray).svg";

const UploadInfo = () => {
  const {
    fileRef,
    categoryList,
    selectCategory,
    fileName,
    onClickFile,
    onChangeFile,
    onChangeCategory
  } = useContext(UploadContext);

  return (
    <div className="upload_info">
      <div className="file_name">
        <span>파일명</span>
        <input type="text" readOnly value={fileName} />
        <button onClick={onClickFile}>파일찾기</button>
      </div>
      <input
        ref={fileRef}
        className="file"
        type="file"
        accept="video/*"
        onChange={onChangeFile}
      />
      <div className="noti">
        ※ 1GB 미만 10분 이내의 영상만 업로드 가능합니다.
      </div>
      <div className="file_name_category">
        <span>카테고리</span>
        <select value={selectCategory} onChange={onChangeCategory}>
          <option value="">카테고리 선택</option>
          {categoryList &&
            categoryList.map(category => (
              <option
                key={category.category_level3_no}
                value={category.category_level3_no}
              >
                {category.category_level3}
              </option>
            ))}
        </select>
      </div>
      {/* <div className="file_name_category">
        <span>카테고리</span>
        <select value={selectCategory} onChange={onChangeCategory}>
          <option key="0" value="0">
            -
          </option>
          {categoryList &&
            categoryList.map(level1 =>
              level1.CATEGORY_LEVEL2.map(level2 =>
                level2.CATEGORY_LEVEL3.map(category => (
                  <option
                    key={category.category_level3_no}
                    value={category.category_level3_no}
                  >
                    {category.category_level3_title}
                  </option>
                ))
              )
            )}
        </select>
      </div> */}
      <style jsx>{`
        .noti {
          margin: auto;
          margin-bottom: 20px;
          color: #aaa;
        }
        .noti.red {
          color: red;
        }
        .upload_info {
          width: 600px;
          border-bottom: 1px solid #444455;
          margin: 0 auto;
          margin-bottom: 30px;
        }

        .upload_info .file_name {
          width: 100%;
          margin-bottom: 20px;
        }
        .upload_info span {
          width: 70px;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          margin-right: 30px;
          display: inline-block;
        }
        .upload_info .file_name input {
          width: 370px;
          height: 60px;
          padding-left: 30px;
          font-size: 16px;
          color: #fff;
          font-weight: 400;
          display: inline-block;
          margin-right: 10px;
          border-radius: 15px;
          background-color: #444455;
          border: none;
        }
        .upload_info .file_name button {
          width: 90px;
          height: 60px;
          font-size: 16px;
          color: #fff;
          font-weight: 400;
          background-color: #f38400;
          border: none;
          border-radius: 15px;
          display: inline-block;
          cursor: pointer;
        }

        .upload_info .file {
          display: none;
        }

        .file_name_category {
          margin-bottom: 30px;
        }
        .file_name_category select {
          width: 500px;
          height: 60px;
          color: ${selectCategory === "" ? "#aaa" : "#000"};
          border: none;
          border-radius: 15px;
          padding-left: 30px;
          font-size: 16px;
          font-weight: 400;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: url(${select_ico}) 96% / 3% no-repeat #fff;
        }
        .file_name_category select > option {
          color: #000;
        }
        .file_name_category select > option:first-child {
          color: #aaa;
        }
      `}</style>
    </div>
  );
};

export default UploadInfo;
