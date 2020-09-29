import React from "react";
import { COLOR_AE46E7, COLOR_39394A } from "shared/constants/colors";

const MenuTab = () => {
  return (
    <div className="MenuTab_container">
      <div className="tab active">
        <span>신규</span>
      </div>
      <div className="line" />
      <div className="tab">
        <span>받은 PUSH</span>
      </div>
      <div className="line" />
      <div className="tab">
        <span>조회수</span>
      </div>
      <style jsx>{`
        .MenuTab_container {
          text-align: center;
          padding-top: 25px;
          padding-bottom: 20px;
        }
        .tab {
          display: inline-block;
          vertical-align: middle;
          text-align: center;
          font-weight: bold;
          font-size: 18px;
          color: ${COLOR_39394A};
        }
        .tab:first-child {
          margin-right: 30px;
        }
        .tab:last-child {
          margin-left: 30px;
          margin-right: 0;
        }
        .tab span:last-child {
          display: block;
        }
        .tab.active {
          color: ${COLOR_AE46E7};
        }
        .line {
          width: 1px;
          height: 27px;
          background-color: ${COLOR_39394A};
          display: inline-block;
          vertical-align: middle;
          margin: 0 15px;
        }
        @media (max-width: 320px) {
          .tab:first-child {
            margin-right: 10px;
          }
          .tab:last-child {
            margin-left: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuTab;
