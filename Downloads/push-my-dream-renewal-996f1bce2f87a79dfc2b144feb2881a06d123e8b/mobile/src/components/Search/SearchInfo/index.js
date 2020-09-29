import React from "react";
import {
  COLOR_AE46E7,
  COLOR_666666,
  GRADIENT_2B2C3F_020216,
} from "shared/constants/colors";

const SearchInfo = () => {
  return (
    <div className="SearchInfo_container">
      <div className="text">
        <span>'트둥이'</span>
        <span>검색 결과</span>
        <span>(1,453)</span>
      </div>
      <div className="button_list">
        <button className="active">
          <span>인물: </span>
          <span>41</span>
        </button>
        <button>
          <span>영상: </span>
          <span>1,412</span>
        </button>
      </div>
      <style jsx>{`
        .SearchInfo_container {
          background-image: ${GRADIENT_2B2C3F_020216(180)};
          padding: 20px 20px 45px 20px;
        }
        .text {
          margin-bottom: 10px;
        }
        .text span {
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          font-weight: reqular;
          color: ${COLOR_666666};
          margin-right: 5px;
        }
        .text span:first-child {
          color: #fff;
        }
        .button_list button {
          width: calc(50% - 6px);
          height: 75px;
          border-radius: 10px;
          /* background: linear-gradient(180deg, #2e2f3e 0%, #232329 100%); */
          background-color: transparent;
          border: 2px solid ${COLOR_666666};
          font-size: 16px;
          color: ${COLOR_666666};
        }
        .button_list button:first-child {
          margin-right: 10px;
        }

        .button_list button.active {
          border: 2px solid ${COLOR_AE46E7};
          color: ${COLOR_AE46E7};
        }
      `}</style>
    </div>
  );
};

export default SearchInfo;
