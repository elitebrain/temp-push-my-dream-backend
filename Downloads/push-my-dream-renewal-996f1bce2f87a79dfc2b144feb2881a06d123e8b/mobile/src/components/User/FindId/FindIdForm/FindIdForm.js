import React from "react";

import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import TitleHeader from "components/Common/TitleHeader";
import Content from "components/Layout/Content";
import NewButton from "components/Common/NewButton";

const FindIdForm = ({ onCheckPlus }) => {
  return (
    <>
      <TitleHeader>아이디 찾기</TitleHeader>
      <Content>
        <div className="container">
          <NewButton
            fontSize="16px"
            gradient
            bgColor={BACKGROUND_BLACK_COLOR}
            width="240px"
            height="100px"
            onClick={onCheckPlus}
          >
            휴대폰 인증
          </NewButton>
        </div>
      </Content>
      <style jsx>{`
        .container {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};

export default FindIdForm;
