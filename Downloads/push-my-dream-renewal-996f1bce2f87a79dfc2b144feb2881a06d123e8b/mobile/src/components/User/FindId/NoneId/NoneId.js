import React from "react";
import { Router } from "next/router";

import person_none_ico from "public/assets/icon/person_none.svg";
import default_user from "public/assets/image/default_user.png";
import {
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  GRADIENT_FFFFFF_C0C5DF,
  COLOR_BLACK,
} from "shared/constants/colors";

import Content from "components/Layout/Content";
import TitleHeader from "components/Common/TitleHeader";
import NewButton from "components/Common/NewButton";
import Avatar from "components/Common/Avatar";

const NoneId = () => {
  return (
    <>
      <TitleHeader>아이디 확인</TitleHeader>
      <Content style={{ position: "relative", height: "calc(100vh - 260px)" }}>
        <div className="container">
          <div className="wrapper">
            <Avatar
              photo={default_user}
              width="65px"
              height="65px"
              style={{ margin: "0 auto" }}
            />
            <div className="noti">등록된 계정이 없습니다.</div>
            <NewButton
              width="100px"
              height="35px"
              fontSize="16px"
              color={COLOR_BLACK}
              borderRadius="20px"
              bgImage={GRADIENT_FFFFFF_C0C5DF(90)}
              onClick={() => Router.push("/sign-up")}
            >
              회원가입
            </NewButton>
          </div>
        </div>
      </Content>
      <style jsx>{`
        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .wrapper {
          text-align: center;
          width: 90vw;
          color: #fff;
          border-radius: 15px;
          margin: auto;
          margin-bottom: 20px;
          padding: 50px 20px;
          box-sizing: border-box;
          border: solid 1px transparent;
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
        }
        .noti {
          margin-top: 40px;
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
};

export default NoneId;
