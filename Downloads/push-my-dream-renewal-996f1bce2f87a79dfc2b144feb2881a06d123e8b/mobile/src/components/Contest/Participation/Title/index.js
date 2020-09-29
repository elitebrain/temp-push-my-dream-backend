import React from "react";

const Title = () => {
  return (
    <div className="title_container">
      <span>PUSH MY APPLE</span>
      <span>2020 BEST APPLE CONTEST</span>
      <style jsx>{`
        .title_container {
          padding: 23px 20px;
          background-color: #2e2e3e;
        }
        .title_container span:first-child {
          color: #d53cf5;
          font-size: 14px;
          font-weight: midium;
          display: block;
        }
        .title_container span:last-child {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Title;
