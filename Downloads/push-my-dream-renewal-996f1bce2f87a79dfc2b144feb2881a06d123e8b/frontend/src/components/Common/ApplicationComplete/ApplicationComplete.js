import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import Avatar from "components/Common/Avatar";
import Button from "components/Common/Button";
import Background from "components/Common/Background";

import { MAIN_COLOR } from "shared/constants/colors";

const ApplicationComplete = ({
  preReservation,
  isFund,
  avatar,
  name,
  nickname,
  phone,
  callableTime,
  categoryDreamer,
  style
}) => {
  const handleClickButton = useCallback(() => {
    Router.push("/login");
  }, []);

  return (
    <>
      <div style={style}>
        <div className="application_conetent_box">
          <Background width="120px" className="m_center">
            <Avatar className="big" photo={avatar} />
          </Background>
          <div className="title">회원 가입이 완료되었습니다.</div>
          <div className="user_info">
            <ul>
              <li>
                <div className="user_info_title">이름</div>
                <div className="info">{name}</div>
              </li>
              <li>
                <div className="user_info_title">닉네임</div>
                <div className="info">{nickname}</div>
              </li>
              <li>
                <div className="user_info_title">전화번호</div>
                <div className="info">{phone}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="application_button_box">
          <Button
            width="110px"
            height="55px"
            // center
            onClick={handleClickButton}
          >
            확인
          </Button>
        </div>
      </div>
      )}
      <style jsx>{`
        .application_conetent_box {
          width: 600px;
          margin: 0 auto;
          padding: 60px 0;
          text-align: center;
          background-color: #fff;
          border-radius: 15px;
          margin-bottom: 20px;
        }
        .application_conetent_box .contest_ico {
          width: 123px;
          height: 123px;
          margin: 0 auto;
          margin-bottom: 15px;
        }
        .application_conetent_box .check_ico {
          width: 66px;
          height: 66px;
          margin: 0 auto;
          margin-bottom: 15px;
        }
        .application_conetent_box .title {
          font-size: 20px;
          font-weight: 700;
          margin-top: 30px;
          margin-bottom: 10px;
        }
        .application_conetent_box .content {
          font-weight: 700;
        }
        .application_conetent_box .user_info {
          width: 295px;
          margin: 30px auto 0 auto;
        }
        .application_conetent_box .user_info li {
          width: 295px;
          position: relative;
          line-height: 38px;
          padding-left: 9px;
          text-align: left;
          list-style-type: none;
        }
        .application_conetent_box .user_info li::before {
          content: "";
          background-color: #f38400;
          font-weight: bold;
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          margin-right: 10px;
        }
        .application_conetent_box .user_info li .user_info_title {
          font-size: 16px;
          font-weight: 300;
          display: inline-block;
          /* margin-right: 115px; */
        }
        .application_conetent_box .user_info li .info {
          font-size: 16px;
          font-weight: 700;
          float: right;
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
  style: PropTypes.object
};

export default ApplicationComplete;
