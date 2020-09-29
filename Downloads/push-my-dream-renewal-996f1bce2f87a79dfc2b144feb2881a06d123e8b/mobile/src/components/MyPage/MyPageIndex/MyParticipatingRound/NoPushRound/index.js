import React from "react";
import { COLOR_696C8C } from "shared/constants/colors";

const NoPushRound = () => {
  return (
    <div className="NoPushRound">
      <div>
        <span className="NoPushRound_Text">아직 받은 PUSH가 없습니다.</span>
      </div>
      <div>
        <span className="NoPushRound_Text">
          본인의 매력을 알릴 수 있는 다양한 영상을 올려주세요.
        </span>
      </div>
      <div>
        <span className="NoPushRound_Text">
          당신의 끼와 열정이 가치가 됩니다.
        </span>
      </div>
      <style jsx>{`
        .NoPushRound {
          margin-bottom: 25px;
        }
        .NoPushRound .NoPushRound_Text {
          font-size: 10px;
          line-height: 12px;
          color: ${COLOR_696C8C};
        }
      `}</style>
    </div>
  );
};

export default NoPushRound;
