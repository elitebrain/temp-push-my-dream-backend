import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import person_check_ico from "public/assets/icon/person_check.svg";
import person_none_ico from "public/assets/icon/person_none.svg";
import google_icon from "public/assets/image/google_icon.png";
import kakao_icon from "public/assets/image/kakao_icon.png";
import naver_icon from "public/assets/image/naver_icon.png";
import local_icon from "public/static/favicon.ico";

const FindIdResult = ({ findUser, onChangePasswordMode }) => {
  return (
    <div className="id_confirm_container">
      <div className="id_confirm_container_title">아이디확인</div>
      <div className="content_box">
        <div className="img_ico">
          <img
            src={findUser.isExistUser ? person_check_ico : person_none_ico}
            alt="person_none_ico"
            width="100%"
            height="100%"
          />
        </div>
        {findUser.isExistUser ? (
          <>
            <div className="noti">등록된 계정 정보입니다.</div>
            <div className="notiContainer">
              <img
                className="icon"
                width="20px"
                height="20px"
                src={
                  findUser.loginType === "kakao"
                    ? kakao_icon
                    : findUser.loginType === "google"
                    ? google_icon
                    : findUser.loginType === "naver"
                    ? naver_icon
                    : findUser.loginType === "local"
                    ? local_icon
                    : ""
                }
              />
              <div className="noti">{findUser.email}</div>
            </div>
          </>
        ) : (
          <div className="noti">등록된 계정이 없습니다.</div>
        )}
      </div>
      {findUser.isExistUser ? (
        <>
          <Link href="/login">
            <button>로그인</button>
          </Link>
          {findUser.loginType === "local" && (
            <div
              className="change_password_noti"
              onClick={onChangePasswordMode}
            >
              비밀번호 변경하기
            </div>
          )}
        </>
      ) : (
        <Link href="sign-up">
          <button>회원 가입</button>
        </Link>
      )}
      <style jsx>{`
        .id_confirm_container {
          width: 575px;
          margin: 0 auto;
        }
        .id_confirm_container .id_confirm_container_title {
          font-size: 50px;
          font-weight: 400;
          color: #fff;
          text-align: center;
          margin-bottom: 120px;
        }
        .id_confirm_container .content_box {
          width: 470px;
          /* height: 260px; */
          padding: 60px 0;
          box-sizing: content-box;
          background-color: #fff;
          border-radius: 15px;
          position: relative;
          margin: 0 auto;
        }
        .id_confirm_container .noti {
          margin-bottom: 20px;
        }

        .id_confirm_container .noti,
        .id_confirm_container .email {
          text-align: center;
          font-size: 16px;
          font-weight: 400;
        }

        .id_confirm_container .notiContainer {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .id_confirm_container .notiContainer .icon {
          margin-right: 10px;
        }
        .id_confirm_container .notiContainer .noti {
          margin-bottom: 0px;
        }
        .id_confirm_container .img_ico {
          width: 65px;
          height: 65px;
          margin: 0 auto;
          margin-bottom: 20px;
        }
        .id_confirm_container button {
          width: 150px;
          height: 55px;
          line-height: 55px;
          border-radius: 50px;
          background-color: #f38400;
          border: 0;
          color: #eee;
          font-size: 16px;
          display: block;
          margin: 0 auto;
          margin-top: 40px;
        }
        .change_password_noti {
          cursor: pointer;
          margin: 20px 0 40px 0;
          color: #fff;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

FindIdResult.propTypes = {
  findUser: PropTypes.object
};

export default FindIdResult;
