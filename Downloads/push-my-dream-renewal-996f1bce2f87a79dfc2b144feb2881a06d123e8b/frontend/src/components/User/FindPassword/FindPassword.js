import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { BLACK_COLOR } from "shared/constants/colors";
import Background from "components/Common/Background";

import arrow_ico from "public/assets/icon/arrow_right_ico(white).svg";
import infinite_ico from "public/assets/icon/infinite_ico(black).svg";

import FindPasswordForm from "components/User/FindPassword/FindPasswordForm";
import ChangePasswordContainer from "containers/User/ChangePasswordContainer";
import ChangePassword from "./ChangePassword";

const FindPassword = ({
  isCheckPlusSuccess,
  localId,
  onCheckPlus,
  onChangeLocalId
}) => {
  const onChangePasswordMode = useCallback(() => {
    setIsChangePasswordMode(prev => !prev);
  }, []);

  return (
    <Background className="content" width="100%">
      <Background
        width="100%"
        color={BLACK_COLOR}
        className="content p_relative of_hidden"
      >
        <Background
          width="1200px"
          height={!isCheckPlusSuccess ? "600px" : "665px"}
          color={BLACK_COLOR}
          className="m_center"
          style={{
            paddingTop: "10px",
            paddingBottom: "30px"
          }}
        >
          <div className="search_password_navigation">
            <span>HOME</span>
            <span className="navigator_arrow">
              <img src={arrow_ico} alt="arrow_ico" width="100%" height="100%" />
            </span>
            <span>LOGIN</span>
            <span className="navigator_arrow">
              <img src={arrow_ico} alt="arrow_ico" width="100%" height="100%" />
            </span>
            <span className="my_position">비밀번호 변경</span>
          </div>
          {isCheckPlusSuccess ? (
            <ChangePasswordContainer
              Component={ChangePassword}
              email={localId}
            />
          ) : (
            <FindPasswordForm
              localId={localId}
              onChangeLocalId={onChangeLocalId}
              onCheckPlus={onCheckPlus}
            />
          )}
        </Background>
        <div className="search_password_infinite_ico">
          <img
            src={infinite_ico}
            alt="infinite_ico"
            width="100%"
            height="100%"
          />
        </div>
      </Background>
      <style jsx>{`
        .search_password_navigation {
          font-size: 15px;
          font-weight: 300;
          color: #fff;
          text-align: right;
          margin-bottom: 30px;
          position: relative;
          z-index: 1;
        }
        .search_password_navigation span {
          display: inline-block;
        }
        .search_password_navigation .navigator_arrow {
          width: 7px;
          height: 11px;
          margin: 0 20px;
        }
        .search_password_navigation .my_position {
          font-weight: 400;
        }
        .search_password_infinite_ico {
          width: 525px;
          height: 260px;
          position: absolute;
          right: -34px;
          bottom: 140px;
          z-index: 0;
          opacity: 0.9;
        }
      `}</style>
    </Background>
  );
};

FindPassword.propTypes = {
  isCheckPlusSuccess: PropTypes.bool.isRequired,
  localId: PropTypes.string.isRequired,
  onCheckPlus: PropTypes.func.isRequired,
  onChangeLocalId: PropTypes.func.isRequired
};

export default FindPassword;
