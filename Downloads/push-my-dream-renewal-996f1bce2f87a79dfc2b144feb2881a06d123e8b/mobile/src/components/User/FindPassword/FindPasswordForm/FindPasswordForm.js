import React from "react";
import PropTypes from "prop-types";

import Button from "components/Common/Button";
import { GRAY_COLOR, BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import Input from "components/Common/Input";
import TitleHeader from "components/Common/TitleHeader";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import NewButton from "components/Common/NewButton";

const FindPasswordForm = ({ localId, onCheckPlus, onChangeLocalId }) => {
  return (
    // <div className="search_password_container">
    <>
      <TitleHeader>비밀번호 찾기</TitleHeader>
      <Content style={{ height: "auto" }}>
        <div className="container">
          <div className="search_password_flex">
            <div className="box">
              <label>아이디</label>
              <Input
                name="email"
                type="email"
                width="240px"
                height="40px"
                placeholder="이메일을 입력해주세요."
                value={localId}
                onChange={onChangeLocalId}
                className="fs12px"
              />
            </div>
          </div>
          <NewButton
            fontSize="16px"
            gradient
            bgColor={BACKGROUND_BLACK_COLOR}
            width="240px"
            height="40px"
            onClick={(e) => onCheckPlus(e)}
          >
            휴대폰 인증
          </NewButton>
        </div>
      </Content>
      <style jsx>{`
        .search_password_container {
          width: 100%;
          margin: 0 auto;
          padding: 50px 10px;
        }
        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .search_password_flex {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .search_password_flex .box {
          margin: 0 auto 20px auto;
        }

        .search_password_flex .box label {
          font-size: 14px;
          color: #fff;
          margin-bottom: 10px;
          display: block;
        }
      `}</style>
    </>
    // </div>
  );
};

FindPasswordForm.propTypes = {
  onCheckPlus: PropTypes.func.isRequired,
};

export default FindPasswordForm;
