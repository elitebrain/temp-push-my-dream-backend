import React from "react";

import { COLOR_696C8C } from "shared/constants/colors";

import add_circle_purple_ico from "public/assets/icon/add_circle_ico(purple).svg";

const NoParticipate = () => {
  return (
    <div className="NoParticipate">
      <img src={add_circle_purple_ico}></img>
      <span>
        <p>"참가 신청" 후 영상을 등록 할 수 있습니다.</p>
      </span>
      <style jsx>{`
        .NoParticipate {
          width: 100%;
          height: 170px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .NoParticipate img {
          margin-bottom: 20px;
          display: block;
        }
        .NoParticipate span {
          display: block;
        }
        .NoParticipate p {
          display: block;
          font-size: 15px;
          color: ${COLOR_696C8C};
        }
      `}</style>
    </div>
  );
};

export default NoParticipate;
