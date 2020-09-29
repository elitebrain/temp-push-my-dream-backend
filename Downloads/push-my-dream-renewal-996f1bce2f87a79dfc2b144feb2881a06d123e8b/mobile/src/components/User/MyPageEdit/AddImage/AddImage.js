import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

import Avatar from "components/Common/Avatar";
import NewButton from "components/Common/NewButton";

import default_user from "public/assets/image/person_circle.png";

import {
  GRADIENT_00F1B4_D53CF5,
  BACKGROUND_WHITE_COLOR,
  BACKGROUND_BLACK_COLOR,
  COLOR_696C8C,
} from "shared/constants/colors";
import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";

const AddImageModal = ({ onInit, onClickProfileImage }) => {
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    dispatch({
      type: CLOSE_MODAL,
    });
  }, [dispatch]);

  return (
    <div className="AddImageModal">
      <div className="Tabs">
        <div className="Tab" onClick={onInit}>
          현재 사진 삭제
        </div>
        <div className="Tab" onClick={onClickProfileImage}>
          라이브러리에서 선택
        </div>
      </div>
      <div className="button">
        <NewButton
          width="80px"
          height="35px"
          borderRadius="17.5px"
          bgColor={BACKGROUND_BLACK_COLOR}
          color={COLOR_696C8C}
          gradient
          onClick={onCloseModal}
        >
          취소
        </NewButton>
      </div>
      <style jsx>{`
        .AddImageModal {
          position: fixed;
          bottom: 65px;
          left: 0;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .AddImageModal .Tabs {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          width: 100%;
          max-width: 450px;
          height: 100px;
          border-radius: 10px;
          margin: 0 30px;

          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
          border: solid 1px transparent;

          color: ${COLOR_696C8C};

          font-size: 16px;
          line-height: 20px;

          text-align: center;
        }

        .AddImageModal .Tabs .Tab {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          cursor: pointer;
        }

        .AddImageModal .Tabs .Tab:first-of-type {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;

          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
          border-bottom: solid 1px transparent;
        }

        .AddImageModal .button {
          margin-top: 25px;

          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

const AddImage = (props) => {
  const { handlePhotoChange, handlePhotoInit, userPhoto, newPhoto } = props;

  const dispatch = useDispatch();
  const [userPhotoSrc, setUserPhotoSrc] = useState("");
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");

  const fileRef = useRef(null);

  useEffect(() => {
    setUserPhotoSrc(userPhoto || default_user);
  }, [userPhoto]);
  useEffect(() => {
    if (newPhoto && newPhoto.preview) {
      setUserPhotoSrc(newPhoto.preview);
    }
  }, [newPhoto]);

  /**
   * 사진 초기화
   */
  const onInit = useCallback(
    (e) => {
      setUserPhotoSrc(
        "https://kr.object.ncloudstorage.com/khancomes-bucket001/homepage/default_user.png"
      );
      handlePhotoInit(e);

      dispatch({
        type: CLOSE_MODAL,
      });
    },
    [dispatch, setUserPhotoSrc, handlePhotoInit]
  );

  /**
   * 이미지 변경
   */
  const onClickProfileImage = useCallback(() => {
    fileRef.current.click();
  }, [fileRef.current]);

  /**
   * 모달 보기
   */
  const onViewProfileImageModal = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        custom: true,
        container: (
          <AddImageModal
            onInit={onInit}
            onClickProfileImage={onClickProfileImage}
          />
        ),
      },
    });
  }, [dispatch]);

  /**
   * 이미지 변경
   */
  const onChangeProfileImage = useCallback(
    (e) => {
      handlePhotoChange(e);
      dispatch({
        type: CLOSE_MODAL,
      });
    },
    [dispatch, handlePhotoChange]
  );

  return (
    <>
      <div className="avatar_box">
        <Avatar
          className="large"
          photo={userPhotoSrc}
          camera
          onClick={onViewProfileImageModal}
          style={{
            backgroundColor: BACKGROUND_WHITE_COLOR,
          }}
        />

        <input
          ref={fileRef}
          type="file"
          className="d_none"
          name="photo"
          accept="image/*"
          onChange={onChangeProfileImage}
        />
      </div>

      <style jsx>{`
        .add_img {
          position: relative;
          width: 61px;
          height: 61px;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        .avatar_box {
          width: 90px;
          height: 90px;
          margin: 0 auto;
          border-radius: 50%;
          background-image: ${GRADIENT_00F1B4_D53CF5(90)};
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .avatar .user_photo {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .d_none {
          display: none;
        }
        .camera_ico {
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 1;
        }
      `}</style>
    </>
  );
};

export default AddImage;
