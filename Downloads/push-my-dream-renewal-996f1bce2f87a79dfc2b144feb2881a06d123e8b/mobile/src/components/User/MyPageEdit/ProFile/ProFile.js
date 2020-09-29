import React from "react";
import {
  COLOR_696C8C,
  COLOR_AE46E7,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
} from "shared/constants/colors";
import NewButton from "components/Common/NewButton";

const ProFile = ({ myInfo, nickname, onChangeNickname, onCheckNickname }) => {
  return (
    <div className="profile">
      {myInfo && (
        <>
          <div>
            <div className="content_box">
              <span className="title ">이름</span>
              <span className="under_line" />
              <span className="content name">{myInfo.user_name}</span>
            </div>
            <div className="content_box">
              <span className="title">성별</span>
              <span className="under_line" />
              <span className="content">{myInfo.gender ? "남자" : "여자"}</span>
            </div>
          </div>
          <div>
            <div className="content_box">
              <span className="title">가입일</span>
              <span className="under_line" />
              <span className="content">
                {myInfo.created_at
                  ? myInfo.created_at.substr(0, 10).replace(/-/g, ".")
                  : ""}
              </span>
            </div>
          </div>
          <div>
            <div className="content_box">
              <span className="title login_title">로그인계정</span>
              <span className="under_line" />
              <span className="content">{myInfo.email}</span>
            </div>
          </div>
          {/* <div>
            <div className="content_box">
              <span className="title">닉네임</span>
              <span className="under_line" />
              <span className="content nickname">{myInfo.nickname}</span>
            </div>
          </div> */}
          <div>
            <div className="content_box w_full">
              <form className="phone_number">
                <div className="phone">
                  <span>닉네임</span>
                  <input
                    type="text"
                    maxLength="10"
                    name="nickname"
                    value={nickname}
                    onChange={onChangeNickname}
                  />
                  <div className="button_box">
                    <NewButton
                      type="button"
                      gradient
                      height="40px"
                      width="84px"
                      fontSize="13px"
                      bgColor={BACKGROUND_BLACK_COLOR}
                      onClick={onCheckNickname}
                    >
                      중복확인
                    </NewButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <style jsx>{`
        .profile {
          width: 100%;
          /* width: 335px;
            height: 114px; */
          box-sizing: border-box;
          font-size: 13px;
          margin: 0 auto;
        }
        .content_box {
          display: inline-block;
          margin-bottom: 20px;
        }
        .content_box.w_full {
          width: 100%;
        }
        .profile .title {
          width: 70px;
          display: inline-block;
          vertical-align: middle;
          color: ${COLOR_696C8C};
          font-weight: 300;
        }
        .nickname,
        .name {
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          width: 130px;
          overflow: hidden;
        }
        .profile .under_line {
          width: 1px;
          height: 14px;
          background-color: ${COLOR_AE46E7};
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
        }
        .profile .content {
          display: inline-block;
          vertical-align: middle;
          color: #fff;
          font-weight: 400;
        }

        .phone_number {
          width: 100%;
          margin: 0 auto;
        }
        .phone_number span {
          display: block;
          width: 74px;
          margin-bottom: 5px;
          margin-right: 30px;
          font-size: 13px;
          font-weight: 400;
          color: ${COLOR_696C8C};
        }
        .phone_number button {
          width: 90px;
          height: 57px;
          text-align: center;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          background-image: ${GRADIENT_00F1B4_D53CF5(180)};
          border-radius: 15px;
          border: none;
          cursor: pointer;
          vertical-align: middle;
        }
        .phone_number .re {
          width: 90px;
          height: 60px;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          background-color: #141418;
          border-radius: 15px;
          border: none;
        }
        .phone_number .phone input {
          width: calc(100% - 94px);
          height: 40px;
          display: inline-block;
          padding-left: 20px;
          font-size: 13px;
          font-weight: 400;
          background-color: #fff;
          border-radius: 5px;
          border: none;
          margin-right: 10px;
          box-sizing: border-box;
          vertical-align: middle;
        }
        .button_box {
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default ProFile;
