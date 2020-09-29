import React from "react";
import { useSelector } from "react-redux";

const Noti = () => {
  const { introduce } = useSelector(state => state.user);

  return (
    <div className="mypage_noti">
      {introduce}
      <style jsx>{`
        .mypage_noti {
          width: 100%;
          padding: 21px 20px;
          line-height: 20px;
          font-size: 13px;
          font-weight: 400;
          color: #fff;
          border-radius: 15px;
          background-color: #141418;
          white-space: pre-line;
          text-align: left;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Noti;
