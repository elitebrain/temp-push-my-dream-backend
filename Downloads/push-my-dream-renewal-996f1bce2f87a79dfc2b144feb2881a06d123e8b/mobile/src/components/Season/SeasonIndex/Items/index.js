import React from "react";

import bg_img from "public/assets/image/apple.jpg";
import Information from "pages/contest/information";

const Items = () => {
  return (
    <div className="Items_container">
      <div className="bg_img">img</div>
      <div className="content_info">
        <span className="category">PUSH MY APPLE</span>
        <span className="title">2020 BEST APPLE CONTEST</span>
        <span className="date">2020.04.01 ~ 05.31</span>
      </div>
      <div className="content_">
        <div className="btn_group">
          <button>대회 안내</button>
          <button>참가 하기</button>
        </div>
        <div className="comment">{`최고의 명품 뒷태 선발 대회입니다.
  몸매에서 자신 있는 부분
  이것빼고 별로야?
  아니 이건 내가 최고야!
  
  가꾸어온 나의 모습에서 가치를 인정받고
  저작권을 확보하세요!`}</div>
      </div>
      <style jsx>{`
        .Items_container {
          margin-bottom: 10px;
        }
        .Items_container:last-child {
          margin-bottom: 0px;
        }
        .bg_img {
          height: 100px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background-image: url(${bg_img});
          background-size: cover;
          background-repeat: no-repeat;
          /* background-position: center center;  상황보고 사용 */
        }

        .content_info {
          background-color: #2e2e3e;
          padding: 15px 10px;
        }
        .content_info span {
          display: block;
        }
        .title {
          color: #fff;
          font-size: 14px;
          margin: 5px 0;
        }
        .category,
        .date {
          font-size: 12px;
          color: #878792;
        }
        .content_ {
          height: 200px;
          padding: 10px;
          background-color: #141418;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .btn_group {
          margin-bottom: 10px;
          overflow: hidden;
        }
        .content_ button:first-child {
          width: calc(50% - 10px);
          height: 40px;
          float: left;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          border: none;
          background: linear-gradient(180deg, #2f2f3e 0%, #23222a 100%);
          border-radius: 5px;
        }

        .content_ button:last-child {
          width: calc(50% - 10px);
          height: 40px;
          float: right;
          font-size: 16px;
          font-weight: bold;
          border: none;
          background-color: #fff;
          border-radius: 5px;
        }
        .comment {
          height: 140px;
          color: #fff;
          font-size: 14px;
          white-space: pre-line;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7; /* 라인수 */
          -webkit-box-orient: vertical;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

export default Items;
