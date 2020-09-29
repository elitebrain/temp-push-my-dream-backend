import React from "react";

import trophy_ico from "public/assets/icon/trophy_ico(white).svg";

const Awards = () => {
  return (
    <div className="Awards_container">
      <div className="trophy_ico">
        <img src={trophy_ico} alt="trophy_ico" />
        <span>AWARDS</span>
      </div>
      <div className="awards_hostpry">
        <div className="link" />
        <div className="awards_item">
          <span className="title">2020년 2월 2째주</span>
          <span className="dot" />
          <span className="rank">1위</span>
        </div>
      </div>
      <style jsx>{`
        .Awards_container {
          display: inline-block;
          vertical-align: top;
        }
        .trophy_ico {
          width: 200px;
          height: 60px;
          border-bottom: 1px solid #fff;
          margin-bottom: 30px;
        }
        .Awards_container .trophy_ico img {
          width: 30px;
          height: 25px;
          margin: 0 auto;
          margin-bottom: 10px;
          display: block;
        }
        .Awards_container .trophy_ico span {
          font-size: 15px;
          font-weight: bold;
          color: #fff;
          text-align: center;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Awards;
