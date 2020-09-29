import React from "react";
import { useSelector } from "react-redux";

const Noti = () => {
  const { introduce } = useSelector(state => state.user);

  return introduce && introduce.length > 0 ? (
    <div className="mypage_noti">
      {introduce}
      <style jsx>{`
        .mypage_noti {
          width: 100%;
          line-height: 28px;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          border-radius: 15px;
          background-color: #141418;
          white-space: pre-line;
          text-align: center;
          margin-bottom: 60px;
          padding: 25px;
        }
      `}</style>
    </div>
  ) : (
    <div></div>
  );
};

export default Noti;
