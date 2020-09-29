import React from "react";
import PropTypes from "prop-types";

import Button from "components/Common/Button";
import { GRAY_COLOR } from "shared/constants/colors";
import Input from "components/Common/Input";

const FindPasswordForm = ({ localId, onCheckPlus, onChangeLocalId }) => {
  return (
    <div className="search_password_container">
      <div className="search_password_container_title">비밀번호 변경</div>
      <div className="search_password_flex">
        <div className="flex_box">
          <label>아이디</label>
          <Input
            type="email"
            height="50px"
            value={localId}
            onChange={onChangeLocalId}
          />
        </div>
      </div>
      <div className="buttonContainer">
        <Button
          className="radius"
          width="300px"
          height="60px"
          onClick={onCheckPlus}
        >
          휴대폰 인증
        </Button>
      </div>
      <div className="search_password_noti">
        ※ 아이디를 입력 후 휴대폰 인증을 진행해주세요.
      </div>
      <style jsx>{`
        .search_password_container {
          width: 575px;
          height: 60px;
          margin: 0 auto;
        }
        .search_password_container .search_password_container_title {
          font-size: 50px;
          font-weight: 400;
          color: #fff;
          text-align: center;
          margin-bottom: 120px;
        }
        .search_password_container .search_password_flex {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .search_password_container .search_password_flex .flex_box {
          width: 400px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .search_password_container .search_password_flex .flex_box label {
          flex-basis: 120px;
          color: #fff;
          margin-right: 10px;
        }

        .buttonContainer {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .search_password_container .search_password_noti {
          margin-top: 20px;
          text-align: center;
          color: ${GRAY_COLOR};
        }
      `}</style>
    </div>
  );
};

FindPasswordForm.propTypes = {
  onCheckPlus: PropTypes.func.isRequired
};

export default FindPasswordForm;
