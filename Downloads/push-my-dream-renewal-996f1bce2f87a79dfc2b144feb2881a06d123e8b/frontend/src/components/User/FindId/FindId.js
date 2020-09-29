import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { BLACK_COLOR } from "shared/constants/colors";
import Background from "components/Common/Background";

import arrow_ico from "public/assets/icon/arrow_right_ico(white).svg";
import infinite_ico from "public/assets/icon/infinite_ico(black).svg";

import FindIdForm from "components/User/FindId/FindIdForm";
import FindIdResult from "components/User/FindId/FindIdResult";
import ChangePasswordContainer from "containers/User/ChangePasswordContainer";
import ChangePassword from "./ChangePassword";

const FindId = ({ isCheckPlusSuccess, findUser, onCheckPlus }) => {
  const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);

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
          <div className="search_id_navigation">
            <span>HOME</span>
            <span className="navigator_arrow">
              <img src={arrow_ico} alt="arrow_ico" width="100%" height="100%" />
            </span>
            <span>LOGIN</span>
            <span className="navigator_arrow">
              <img src={arrow_ico} alt="arrow_ico" width="100%" height="100%" />
            </span>
            <span className="my_position">
              {!isChangePasswordMode ? "아이디찾기" : "비밀번호 변경"}
            </span>
          </div>
          {isCheckPlusSuccess ? (
            !isChangePasswordMode ? (
              <FindIdResult
                findUser={findUser}
                onChangePasswordMode={onChangePasswordMode}
              />
            ) : (
              <ChangePasswordContainer
                Component={ChangePassword}
                onChangePasswordMode={onChangePasswordMode}
                email={findUser.email}
              />
            )
          ) : (
            <FindIdForm onCheckPlus={onCheckPlus} />
          )}
        </Background>
        <div className="search_id_infinite_ico">
          <img
            src={infinite_ico}
            alt="infinite_ico"
            width="100%"
            height="100%"
          />
        </div>
      </Background>
      <style jsx>{`
        .search_id_navigation {
          font-size: 15px;
          font-weight: 300;
          color: #fff;
          text-align: right;
          margin-bottom: 30px;
          position: relative;
          z-index: 1;
        }
        .search_id_navigation span {
          display: inline-block;
        }
        .search_id_navigation .navigator_arrow {
          width: 7px;
          height: 11px;
          margin: 0 20px;
        }
        .search_id_navigation .my_position {
          font-weight: 400;
        }
        .search_id_infinite_ico {
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

FindId.propTypes = {
  isCheckPlusSuccess: PropTypes.bool.isRequired,
  findUser: PropTypes.object.isRequired,
  onCheckPlus: PropTypes.func.isRequired
};

export default FindId;
