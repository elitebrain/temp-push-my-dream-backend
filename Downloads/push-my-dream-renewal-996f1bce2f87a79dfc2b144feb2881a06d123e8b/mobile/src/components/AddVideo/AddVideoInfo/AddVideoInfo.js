import React, { useContext } from "react";

import { UploadContext } from "containers/UploadContainer";
import select_ico from "public/assets/icon/select_arrow(gray).svg";

const AddVideoInfo = () => {
  const {
    fileRef,
    categoryList,
    selectCategory,
    fileName,
    onClickFile,
    onChangeFile,
    onChangeCategory
  } = useContext(UploadContext);
  console.log(
    "AddVideoInfo categoryList ",
    categoryList,
    "selectCategory",
    selectCategory
  );
  return (
    <div className="add_video_info">
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
      <style jsx>{`
        .noti {
          margin: auto;
          margin-bottom: 20px;
          color: #aaa;
        }
        .noti.red {
          color: red;
        }
        .add_video_info {
          width: 100%;
          border-bottom: 1px solid #444455;
          margin: 0 auto;
          padding: 20px 0;
          margin-bottom: 20px;
        }
        .add_video_info .file_name {
          width: 100%;
          margin-bottom: 20px;
        }
        .add_video_info span {
          display: block;
          width: 74px;
          margin-bottom: 10px;
          margin-right: 30px;
          font-size: 15px;
          font-weight: 400;
          color: #fff;
        }
        .add_video_info .file_name input {
          width: calc(100% - 100px);
          height: 57px;
          display: inline-block;
          padding-left: 22px;
          font-size: 15px;
          font-weight: 400;
          background-color: #444455;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
          box-sizing: border-box;
        }
        .add_video_info .file_name button {
          width: 90px;
          height: 57px;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          background-color: #f38400;
          border-radius: 15px;
          border: none;
        }
        .file_name_category select {
          width: 100%;
          height: 57px;
          color: ${selectCategory === "" ? "#aaa" : "#000"};
          border: none;
          border-radius: 15px;
          padding-left: 22px;
          font-size: 15px;
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
        .file {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AddVideoInfo;
