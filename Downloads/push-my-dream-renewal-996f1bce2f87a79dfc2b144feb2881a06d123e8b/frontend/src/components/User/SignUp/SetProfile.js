import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Button from "components/Common/Button";
import Avatar from "components/Common/Avatar";

import add_image from "public/assets/image/add_image.png";
import default_user from "public/assets/image/default_user.png";

import { MAIN_COLOR } from "shared/constants/colors";
import { OPEN_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";
import { getError } from "shared/functions";

const SetProfile = ({
  visible,
  profileState,
  setProfileState,
  handleProfileChange,
  userPhotoPreview,
}) => {
  const dispatch = useDispatch();
  const [userPhotoSrc, setUserPhotoSrc] = useState("");

  const fileRef = useRef(null);

  useEffect(() => {
    setUserPhotoSrc(userPhotoPreview || default_user);
  }, [userPhotoPreview]);

  const onCheckNickname = useCallback(async () => {
    try {
      if (profileState.nickname.length === 0) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "닉네임을 입력해주세요.",
          },
        });
      }

      const result = await userApi.get("/check/nickname", {
        params: {
          nickname: profileState.nickname,
        },
      });
      if (result.status === 200) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "사용 가능한 닉네임입니다.",
          },
        });
        setProfileState((profileState) => ({
          ...profileState,
          isCheckedNickname: true,
        }));
      }
    } catch (error) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: getError(error),
        },
      });
    }
  }, [dispatch, profileState]);

  return (
    <div className={`set_profile${visible ? " visible" : ""}`}>
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
          onChange={(e) => handleProfileChange(e, fileRef)}
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
          value={profileState.nickname}
          onChange={handleProfileChange}
        />
        <button onClick={onCheckNickname}>중복확인</button>
      </div>
      <div className="noti">
        {`PUSH My DREAM 서비스내에서 콘텐츠 업로드, 댓글\n등록 등 활동시 사용됩니다.`}
      </div>
      <style jsx>{`
        .set_profile {
          width: 575px;
          height: 0;
          margin: 0 auto;
          visibility: hidden;
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
      `}</style>
    </div>
  );
};

SetProfile.propTypes = {
  visible: PropTypes.bool,
  profileState: PropTypes.object,
  setProfileState: PropTypes.func,
  handleProfileChange: PropTypes.func,
  userPhotoPreview: PropTypes.string,
};

export default SetProfile;
