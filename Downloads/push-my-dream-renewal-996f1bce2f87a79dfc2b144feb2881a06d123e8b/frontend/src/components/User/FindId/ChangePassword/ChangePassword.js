import React, { useState } from "react";
import Input from "components/Common/Input";
import Button from "components/Common/Button";

import { GRAY_COLOR } from "shared/constants/colors";

const ChangePassword = ({ onChangePassword, onChangePasswordMode }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className="change_password_container">
      <div className="title">비밀번호 변경</div>
      <div className="flex_box">
        <label>비밀번호</label>
        <Input
          type="password"
          height="50px"
          maxLength="20"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="flex_box">
        <label>비밀번호 확인</label>
        <Input
          type="password"
          height="50px"
          maxLength="20"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
      </div>
      <div className="flex_box center">
        {onChangePasswordMode && (
          <Button
            onClick={onChangePasswordMode}
            style={{ backgroundColor: GRAY_COLOR, marginRight: "20px" }}
          >
            뒤로가기
          </Button>
        )}
        <Button
          onClick={onChangePassword.bind(this, { password, passwordConfirm })}
        >
          변경
        </Button>
      </div>
      <style jsx>{`
        .change_password_container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .change_password_container .title {
          font-size: 50px;
          color: #fff;
          margin-bottom: 60px;
        }

        .change_password_container .flex_box {
          width: 400px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .change_password_container .flex_box.center {
          justify-content: center;
        }

        .change_password_container .flex_box label {
          flex-basis: 120px;
          color: #fff;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default ChangePassword;
