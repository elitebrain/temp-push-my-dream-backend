import React, { useState } from "react";
import Input from "components/Common/Input";
import Button from "components/Common/Button";

import { GRAY_COLOR } from "shared/constants/colors";

const ChangePassword = ({
  password,
  passwordConfirm,
  setPassword,
  setPasswordConfirm
}) => {
  return (
    <div className="change_password_container">
      <div className="flex_box">
        <label>비밀번호</label>
        <Input
          type="password"
          width="100%"
          height="50px"
          maxLength="20"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ flex: "1" }}
        />
      </div>
      <div className="flex_box">
        <label>비밀번호 확인</label>
        <Input
          type="password"
          width="100%"
          height="50px"
          maxLength="20"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          style={{ flex: "1" }}
        />
      </div>
      <style jsx>{`
        .change_password_container {
          width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          margin-bottom: 30px;
          border-bottom: 1px solid #444455;
        }

        .change_password_container .flex_box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .change_password_container .flex_box:last-of-type {
          margin-bottom: 20px;
        }

        .change_password_container .flex_box.center {
          justify-content: center;
        }

        .change_password_container .flex_box label {
          flex-basis: 74px;
          color: #fff;
          margin-right: 30px;
        }
      `}</style>
    </div>
  );
};

export default ChangePassword;
