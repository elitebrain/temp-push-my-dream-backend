import React from "react";

import push_logo from "public/assets/icon/push_logo(white).svg";

const PushButton = () => {
  return (
    <div className="btn">
      <div className="push_btn">
        <div className="push_btn_container">
          <img src={push_logo} alt="push_logo" className="push_logo" />
        </div>
      </div>
      <style jsx>{`
        .btn {
          width: 200px;
          height: 60px;
          position: absolute;
          bottom: 4px;
          left: 20px;
          cursor: pointer;
        }
        .push_btn {
          width: 200px;
          height: 60px;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          border-radius: 0px 41px 41px 0px;
          position: relative;
        }
        .push_btn_container {
          width: calc(100% - 3px);
          height: calc(100% - 3px);
          line-height: calc(100% - 4px);
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.58);
          border-radius: 0px 38px 38px 0px;
        }
        .push_logo {
          width: 70px;
          height: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @media (max-width: 1366px) {
          .btn {
            width: 141px;
            height: 40px;
          }
          .push_btn {
            width: 141px;
            height: 40px;
          }
          .push_logo {
            width: 65px;
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default PushButton;
