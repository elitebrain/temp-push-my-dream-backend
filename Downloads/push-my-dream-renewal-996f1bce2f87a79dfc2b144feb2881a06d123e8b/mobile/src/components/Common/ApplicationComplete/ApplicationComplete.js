import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import Avatar from "components/Common/Avatar";
import Button from "components/Common/Button";
import Background from "components/Common/Background";

import {
  MAIN_COLOR,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  GRADIENT_FFFFFF_C0C5DF,
  COLOR_696C8C,
} from "shared/constants/colors";
import NewButton from "../NewButton";

const ApplicationComplete = ({
  preReservation,
  isFund,
  avatar,
  name,
  nickname,
  phone,
  callableTime,
  categoryDreamer,
  style,
}) => {
  const handleClickButton = useCallback(() => {
    Router.push("/login");
  }, []);

  return (
    <>
      <div className="container" style={style}>
        <div className="application_content_box">
          <Background className="m_center">
            <div className="add_img_ico">
              <div className="avatar_box">
                <Avatar photo={avatar} width="65px" height="65px" />
              </div>
            </div>
          </Background>
          <div className="title">회원 가입이 완료되었습니다.</div>
          <div className="user_info">
            <div className="content_list">
              <div className="user_info_title">이름</div>
              <div className="info">{name}</div>
            </div>
            <div className="content_list">
              <div className="user_info_title">닉네임</div>
              <div className="info">{nickname}</div>
            </div>
            <div className="content_list">
              <div className="user_info_title">전화번호</div>
              <div className="info">{phone}</div>
            </div>
            <div className="underline" />
          </div>

          <div className="ButtonContainer">
            <NewButton
              bgImage={GRADIENT_FFFFFF_C0C5DF(180)}
              borderRadius="20px"
              width="100px"
              height="40px"
              color={COLOR_696C8C}
              onClick={handleClickButton}
            >
              확인
            </NewButton>
          </div>
        </div>
        {/* <div className="application_button_box">
          <Button
            width="110px"
            height="55px"
            center
            handleClick={handleClickButton}
          >
            확인
          </Button>
        </div> */}
      </div>
      <style jsx>{`
        .container {
          width: 230px;
          height: 320px;
          position: relative;
          border: solid 1px transparent;
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
          border-radius: 10px;
        }
        .application_content_box {
          /* width: calc(100vw - 40px); */
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-sizing: border-box;
          padding: 30px 20px 20px 20px;
          /* width: calc(100vw - 40px); */
          text-align: center;
          background-color: ${BACKGROUND_BLACK_COLOR};
          border-radius: 10px;
          box-sizing: border-box;
        }
        .add_img_ico {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          margin: 0 auto;
          /* overflow: hidden; */
          margin-bottom: 25px;
          position: relative;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
        }
        .avatar_box {
          width: 65px;
          height: 65px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .application_content_box .contest_ico {
          width: 123px;
          height: 123px;
          margin: 0 auto;
          margin-bottom: 15px;
        }
        .application_content_box .check_ico {
          width: 66px;
          height: 66px;
          margin: 0 auto;
          margin-bottom: 15px;
        }
        .application_content_box .title {
          font-size: 14px;
          font-weight: 400;
          color: #ae46e7;
        }
        .application_content_box .content {
          font-weight: 700;
        }
        .application_content_box .user_info {
          margin: 25px auto;
          position: relative;
        }
        .application_content_box .user_info .content_list {
          position: relative;
          line-height: 16px;
          text-align: left;
          list-style-type: none;
          margin-bottom: 5px;
        }
        .application_content_box .user_info .content_list .user_info_title {
          width: 60px;
          margin-right: 20px;
          font-size: 13px;
          font-weight: 300;
          color: #696c8c;
          display: inline-block;
          /* margin-right: 115px; */
        }
        .underline {
          height: 58px;
          width: 1px;
          background-color: #ae46e7;
          position: absolute;
          top: 0px;
          left: 65px;
        }
        .application_content_box .user_info .content_list .info {
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }

        .ButtonContainer {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .application_noti_box {
          width: 600px;
          /* height: 110px; */
          margin: 0 auto;
          padding-top: 30px;
          padding-bottom: 30px;
          padding-left: 30px;
          background-color: #262631;
          border-radius: 15px;
          font-size: 15px;
          font-weight: 300;
          color: #fff;
          text-align: left;
          box-sizing: border-box;
          line-height: 30px;
          white-space: pre-line;
        }

        .application_button_box {
          width: 100%;
          margin-top: 48px;
          height: 55px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

ApplicationComplete.propTypes = {
  preReservation: PropTypes.string,
  isFund: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  nickname: PropTypes.string,
  phone: PropTypes.string,
  callableTime: PropTypes.string,
  categoryDreamer: PropTypes.string,
  style: PropTypes.object,
};

export default ApplicationComplete;
