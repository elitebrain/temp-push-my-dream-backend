import React from "react";

import { GRAY_COLOR, WHITE_COLOR } from "shared/constants/colors";

const NoParticipatingRound = () => {
  return (
    <div>
      <p>받은 PUSH가 없습니다.</p>
      <p>
        당신의 끼와 열정이 만드는 가치를 이제 <strong>PUSH MY DREAM</strong>
        에서 만나보세요!
      </p>
      <p>누구나 참가 하고 누구나 우승할 수 있습니다!</p>
      <p>※ 동일기간 진행되는 대회는 중복 참여가 불가능합니다.</p>

      <style jsx>{`
        p {
          font-size: 10px;
          line-height: 16px;
          color: ${GRAY_COLOR};
        }

        strong {
          font-weight: 700;
          color: ${WHITE_COLOR};
        }
      `}</style>
    </div>
  );
};

export default NoParticipatingRound;
