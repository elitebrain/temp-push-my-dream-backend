import React from "react";

const Introduction = () => {
  return (
    <div className="introduction">
      {`노래를 좋아합니다.
어렸을때 친구들과 함께 취미로 춤을 추다가 밴드를 만들
고 악기도 연주하고 보컬로 활동을 시작했습니다.`}
      <style jsx>{`
        .introduction {
          width: 100%;
          min-height: 86px;
          padding: 16px;
          box-sizing: border-box;
          background-color: #141418;
          border-radius: 5px;
          font-size: 13px;
          color: #fff;
          white-space: pre-line;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default Introduction;
