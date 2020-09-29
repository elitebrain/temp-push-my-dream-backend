import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import Layout from "components/Layout/Layout";
import Button from "components/Common/Button";

import ChangePasswordContainer from "containers/User/ChangePasswordContainer";
import ChangePassword from "./ChangePassword";
import FindIdForm from "./FindIdForm";

import person_check_ico from "public/assets/icon/person_check.svg";
import person_none_ico from "public/assets/icon/person_none.svg";
import google_icon from "public/assets/image/google_icon.png";
import kakao_icon from "public/assets/image/kakao_icon.png";
import naver_icon from "public/assets/image/naver_icon.png";
import local_icon from "public/static/favicon.ico";
import NoneId from "./NoneId";
import TitleHeader from "components/Common/TitleHeader";
import Content from "components/Layout/Content";
import {
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  GRADIENT_FFFFFF_C0C5DF,
  COLOR_BLACK,
} from "shared/constants/colors";
import NewButton from "components/Common/NewButton";

const FindIdComponent = (props) => {
  const { onCheckPlus, isCheckPlusSuccess, findUser } = props;
  const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
  const [loginTypeIco, setLoginTypeIco] = useState("#");
  useEffect(() => {
    switch (findUser.loginType) {
      case "kakao":
        return setLoginTypeIco(kakao_icon);
      case "google":
        return setLoginTypeIco(google_icon);
      case "naver":
        return setLoginTypeIco(naver_icon);
      default:
        return setLoginTypeIco(local_icon);
    }
  }, [findUser]);
  console.log("onCheckPlus", onCheckPlus, isCheckPlusSuccess, findUser);

  const onChangePasswordMode = useCallback(() => {
    setIsChangePasswordMode((prev) => !prev);
  }, []);

  return (
    <>
      {isCheckPlusSuccess ? (
        !isChangePasswordMode ? (
          <div className="container">
            {findUser.isExistUser ? (
              <>
                <TitleHeader>아이디 확인</TitleHeader>
                <Content
                  style={{
                    height: "auto",
                  }}
                >
                  <div className="container_box">
                    <div className="wrapper">
                      <div className="noti">등록된 계정 정보입니다.</div>
                      <div className="login_type">
                        <img src={loginTypeIco} alt="login_type_ico" />
                        <div className="email">{findUser.email}</div>
                      </div>
                      <NewButton
                        width="100px"
                        height="35px"
                        color={COLOR_BLACK}
                        borderRadius="20px"
                        bgImage={GRADIENT_FFFFFF_C0C5DF(90)}
                        onClick={() => Router.push("/login")}
                      >
                        로그인
                      </NewButton>
                      {/* {findUser.loginType === "local" && (
                        <div
                          className="change_password_noti"
                          onClick={onChangePasswordMode}
                        >
                          비밀번호 변경하기
                        </div>
                      )} */}
                    </div>
                    <div
                      className="change_password_noti"
                      onClick={onChangePasswordMode}
                    >
                      비밀번호 변경하기
                    </div>
                  </div>
                </Content>
              </>
            ) : (
              <NoneId />
            )}
          </div>
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
      <style jsx>{`
        .container {
          height: auto;
        }
        .container_box {
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
        .wrapper > img {
          width: 50px;
          height: 50px;
        }
        .noti,
        .login_type {
          margin-top: 10px;
          margin-bottom: 50px;
        }
        .login_type > img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        .login_type > .email {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
        }
        .my_100px {
          margin-top: 100px;
          margin-bottom: 100px;
        }
        .change_password_noti {
          font-size: 14px;
          cursor: pointer;
          color: #fff;
          text-align: center;
        }
      `}</style>
    </>
  );
};

FindIdComponent.propTypes = {};

export default FindIdComponent;
