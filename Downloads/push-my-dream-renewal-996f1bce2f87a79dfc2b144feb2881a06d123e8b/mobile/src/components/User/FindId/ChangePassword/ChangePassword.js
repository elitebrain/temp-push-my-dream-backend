import React, { useState } from "react";
import Layout from "components/Layout/Layout";
import Input from "components/Common/Input";
import Button from "components/Common/Button";
import TitleHeader from "components/Common/TitleHeader";
import Content from "components/Layout/Content";
import NewButton from "components/Common/NewButton";

import {
  GRAY_COLOR,
  BACKGROUND_BLACK_COLOR,
  COLOR_3B3D55,
} from "shared/constants/colors";

const ChangePassword = ({ onChangePassword, onChangePasswordMode }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      {/* <div className="change_password_container"> */}
      <TitleHeader>비밀번호 변경</TitleHeader>
      <Content style={{ height: "auto" }}>
        <div className="container">
          <div className="noti">새로운 비밀번호를 설정해주세요.</div>
          <div className="box">
            <Input
              type="password"
              width="240px"
              height="40px"
              placeholder="8~20자리의 영문, 숫자, 특수문자 조합"
              maxLength="20"
              className="fs12px"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="box">
            <Input
              type="password"
              width="240px"
              height="40px"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              maxLength="20"
              className="fs12px"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="flex_box">
            {onChangePasswordMode && (
              <NewButton
                fontSize="16px"
                borderColor={COLOR_3B3D55}
                color={COLOR_3B3D55}
                bgColor={BACKGROUND_BLACK_COLOR}
                width="110px"
                height="35px"
                onClick={onChangePasswordMode}
                style={{ marginTop: "30px", marginRight: "20px" }}
              >
                뒤로가기
              </NewButton>
            )}
            <NewButton
              fontSize="16px"
              gradient
              bgColor={BACKGROUND_BLACK_COLOR}
              width="110px"
              height="35px"
              onClick={onChangePassword.bind(this, {
                password,
                passwordConfirm,
              })}
              style={{ marginTop: "30px" }}
            >
              확인
            </NewButton>
          </div>
        </div>
      </Content>
      <style jsx>{`
        .change_password_container {
          padding-top: 50px;
          width: 280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .title {
          padding-top: 50px;
          font-size: 36px;
          color: #fff;
          margin-bottom: 60px;
        }
        .noti {
          text-align: center;
          color: #fff;
          font-size: 14px;
          margin-bottom: 30px;
        }
        .box {
          width: 100%;
          margin-bottom: 10px;
          text-align: center;
        }

        .flex_box {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
        }
      `}</style>
      {/* </div> */}
    </>
  );
};

export default ChangePassword;
