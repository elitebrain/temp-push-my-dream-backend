import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Avatar from "components/Common/Avatar";

import default_user from "public/assets/image/default_user.png";
import arrow from "public/assets/icon/arrow_right_ico(purple).svg";

import { OPEN_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";
import { getError } from "shared/functions";
import {
  GRADIENT_00F1B4_D53CF5,
  BACKGROUND_BLACK_COLOR,
} from "shared/constants/colors";
import NewButton from "components/Common/NewButton";

const SetProfile = ({ onSignUp }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [isCheckNickname, setIsCheckNickname] = useState(false);
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);
  const [nickname, setNickname] = useState("");
  const [userPhotoSrc, setUserPhotoSrc] = useState("");

  const fileRef = useRef(null);

  useEffect(() => {
    setUserPhotoSrc(userPhotoPreview || default_user);
  }, [userPhotoPreview]);

  // 닉네임 작성
  const onChangeNickname = useCallback((e) => {
    setIsCheckNickname(false);
    setNickname(e.target.value);
  });

  // 닉네임 중복확인
  const onCheckNickname = useCallback(async () => {
    try {
      if (nickname.length === 0) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "닉네임을 입력해주세요.",
            isViewClose: false,
          },
        });
      }

      const result = await userApi.get("/check/nickname", {
        withCredentials: true,
        params: { nickname },
      });
      if (result.status === 200) {
        setIsCheckNickname(true);
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "사용 가능한 닉네임입니다.",
            isViewClose: false,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: getError(error),
          isViewClose: false,
        },
      });
    }
  }, [dispatch, nickname]);

  // 아바타 변경
  const onChangeAvatar = useCallback(() => {
    const file = fileRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener(
      "load",
      function () {
        setUserPhotoPreview(reader.result);
      },
      false
    );
  }, []);

  // 회원 가입 버튼 클릭
  const onSubmit = useCallback(() => {
    if (!isCheckNickname) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: "닉네임 중복 확인 후 진행해주세요.",
          isViewClose: false,
        },
      });
    }
    onSignUp({ file: fileRef.current.files[0], nickname });
  }, [onSignUp, fileRef, nickname, isCheckNickname]);

  return (
    <div className="set_profile">
      <div className="content">
        <div className="avatar_box">
          <Avatar
            className="large"
            photo={userPhotoSrc}
            camera
            onClick={() => fileRef.current.click()}
          />
          <input
            ref={fileRef}
            type="file"
            id="userPhoto"
            name="photo"
            accept="image/*"
            onChange={(e) => onChangeAvatar(e)}
            style={{ display: "none" }}
          />
        </div>
        {/* <div className="avatar" onClick={() => fileRef.current.click()}>
          <img
            src={userPhotoSrc}
            alt="add_img_ico"
            width="100%"
            height="100%"
            className="user_image"
          />
          <input
            ref={fileRef}
            type="file"
            id="userPhoto"
            name="photo"
            accept="image/*"
            onChange={e => handleProfileChange(e, fileRef)}
          />
          <img src={add_image} className="camera"></img>
        </div> */}
        <div>
          <span className="nickname">닉네임</span>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => onChangeNickname(e)}
            placeholder="2~10자리 한글 영문, 숫자 조합"
            maxLength="10"
          />
          <NewButton
            fontSize="12px"
            gradient
            bgColor={BACKGROUND_BLACK_COLOR}
            width="77px"
            height="40px"
            onClick={onCheckNickname}
          >
            중복확인
          </NewButton>
          {/* <div className="button_box">
            <button onClick={onCheckNickname}>중복확인</button>
          </div> */}
        </div>
        <div className="noti">
          {`칸테움 플랫폼 서비스 내에서 콘텐츠 업로드, 댓글 등록 등 활동시 사용됩니다.`}
        </div>
      </div>
      <div className="sign_up_footer">
        <button className="back" onClick={() => Router.back()}>
          <img src={arrow} alt="arrow" />
          <span>이전</span>
        </button>

        <button className="next" onClick={onSubmit}>
          <span>다음</span>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
      <style jsx>{`
        .set_profile {
          width: 100%;
          margin: 0 auto;
        }

        .content {
          width: 100%;
          margin-bottom: 40px;
        }

        .set_profile.visible {
          visibility: visible;
          height: auto;
        }
        .set_profile .add_img_ico {
          width: 105px;
          height: 105px;
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 5px;
          /* overflow: hidden; */
          margin-bottom: 16px;
          position: relative;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
        }
        .set_profile .avatar_box {
          width: 90px;
          height: 90px;
          margin: 0 auto;
          border-radius: 50%;
          background-image: ${GRADIENT_00F1B4_D53CF5(90)};
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .set_profile .avatar {
          position: relative;
          top: 0;
          left: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        .set_profile .avatar .user_image {
          position: relative;
          top: 0;
          left: 0;
          z-index: 1;
          border-radius: 50%;
        }
        .set_profile .avatar #userPhoto {
          /* position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0; */
          display: none;
        }
        .set_profile .avatar .camera {
          position: absolute;
          right: 0;
          bottom: 5px;
          z-index: 100;
        }
        .set_profile .nickname {
          font-size: 16px;
          color: #fff;
          margin-right: 60px;
          display: block;
          margin-bottom: 10px;
        }
        .set_profile input {
          width: calc(100% - 87px);
          height: 40px;
          border-radius: 5px;
          border: none;
          margin-right: 10px;
          box-sizing: border-box;
          padding: 10px;
          font-size: 12px;
        }

        .set_profile input::-webkit-input-placeholder {
          color: #979cca;
        }
        .set_profile input:-ms-input-placeholder {
          color: #979cca;
        }
        .set_profile .button_box {
          width: 77px;
          height: 40px;
          border-radius: 5px;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          position: relative;
          display: inline-block;
          vertical-align: middle;
        }
        .set_profile .button_box button {
          width: 73px;
          height: 36px;
          background-color: #141418;
          border-radius: 5px;
          color: #fff;
          border: none;
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .set_profile .noti {
          width: 100%;
          line-height: 17px;
          margin: 0 auto;
          margin-top: 15px;
          font-size: 11px;
          color: #979cca;
        }
        .sign_up_footer {
          width: 100%;
          text-align: center;
        }
        .sign_up_footer .back {
          margin-right: 100px;
        }
        .sign_up_footer .back img {
          margin-right: 10px;
          transform: rotate(180deg);
        }
        .sign_up_footer .next span {
          margin-right: 10px;
        }
        .sign_up_footer > button {
          border: 0;
          color: #979cca;
          font-weight: bold;
          background: none;
          font-size: 17px;
          cursor: pointer;
        }
        .sign_up_footer > button span {
          display: inline-block;
          vertical-align: middle;
        }
        .sign_up_footer > button img {
          width: 10px;
          height: 17px;
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

SetProfile.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default SetProfile;
