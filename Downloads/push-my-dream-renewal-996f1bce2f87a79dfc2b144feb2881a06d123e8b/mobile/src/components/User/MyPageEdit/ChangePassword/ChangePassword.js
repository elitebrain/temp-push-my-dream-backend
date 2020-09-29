import React, { useState } from "react";
import Input from "components/Common/Input";
import Button from "components/Common/Button";

import { GRAY_COLOR, COLOR_696C8C } from "shared/constants/colors";

const ChangePassword = ({
  password,
  passwordConfirm,
  setPassword,
  setPasswordConfirm,
}) => {
  return (
    <div className="change_password_container">
      <div className="flex_box">
        <label>신규 비밀번호</label>
        <Input
          type="password"
          width="100%"
          height="40px"
          maxLength="20"
          value={password}
          placeholder="변경할 비밀번호를 입력해 주세요."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex_box">
        <label>신규 비밀번호 확인</label>
        <Input
          type="password"
          width="100%"
          height="40px"
          maxLength="20"
          value={passwordConfirm}
          placeholder="변경할 비밀번호를 한 번 더 입력해 주세요."
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <style jsx>{`
        .change_password_container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .change_password_container .flex_box {
          width: 100%;
          margin-bottom: 20px;
        }

        .change_password_container .flex_box label {
          color: ${COLOR_696C8C};
          font-size: 13px;
          font-weight: 400;
          display: block;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default ChangePassword;
