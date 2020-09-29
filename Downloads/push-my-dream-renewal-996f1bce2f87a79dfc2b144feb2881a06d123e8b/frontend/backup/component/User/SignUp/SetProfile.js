import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Avatar from "components/Common/Avatar";

import default_user from "public/assets/image/default_user.png";

import { OPEN_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";
import { getError } from "shared/functions";

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
      <div className="add_img_ico">
        <Avatar
          className="big"
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
        />
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
      </div>
      <div>
        <span className="nickname">닉네임</span>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => onChangeNickname(e)}
        />
        <button onClick={onCheckNickname}>중복확인</button>
      </div>
      <div className="noti">
        {`PUSH My DREAM 서비스내에서 콘텐츠 업로드, 댓글\n등록 등 활동시 사용됩니다.`}
      </div>
      <div className="sign_up_footer">
        <button onClick={() => Router.back()}>이전</button>

        <button onClick={onSubmit}>회원가입</button>
      </div>
      <style jsx>{`
        .set_profile {
          width: 100%;
          margin: 0 auto;
        }
        .set_profile.visible {
          visibility: visible;
          height: auto;
        }
        .set_profile .add_img_ico {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          margin-top: 10px;
          overflow: hidden;
          margin-bottom: 32px;
        }
        .set_profile .add_img_ico .avatar {
          position: relative;
          top: 0;
          left: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        .set_profile .add_img_ico .avatar .user_image {
          position: relative;
          top: 0;
          left: 0;
          z-index: 1;
          border-radius: 50%;
        }

        .set_profile .add_img_ico .avatar #userPhoto {
          /* position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0; */
          display: none;
        }
        .set_profile .add_img_ico .avatar .camera {
          position: absolute;
          right: 0;
          bottom: 5px;
          z-index: 100;
        }
        .set_profile .nickname {
          display: inline-block;
          vertical-align: middle;
          width: 100px;
          font-size: 16px;
          color: #fff;
        }
        .set_profile input {
          display: inline-block;
          vertical-align: middle;
          width: 370px;
          height: 60px;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
          box-sizing: border-box;
          padding: 12px;
        }
        .set_profile button {
          display: inline-block;
          vertical-align: middle;
          width: 90px;
          height: 60px;
          background-color: #f38400;
          border-radius: 15px;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .set_profile .noti {
          width: 370px;
          line-height: 25px;
          margin: 0 auto;
          margin-top: 20px;
          padding-left: 10px;
          font-size: 15px;
          color: #d3d3d3;
          white-space: pre-line;
        }
        .sign_up_footer {
          width: 100%;
          margin-top: 48px;
          height: 55px;
          text-align: center;
        }
        .sign_up_footer > button {
          width: 87px;
          height: 45px;
          line-height: 45px;
          border-radius: 50px;
          background-color: #444455;
          border: 0;
          color: #eee;
          font-size: 16px;
          margin-right: 20px;
          cursor: pointer;
        }
        .sign_up_footer > button:last-child {
          background-color: #f38400;
          margin-right: 0;
        }
      `}</style>
    </div>
  );
};

SetProfile.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default SetProfile;
