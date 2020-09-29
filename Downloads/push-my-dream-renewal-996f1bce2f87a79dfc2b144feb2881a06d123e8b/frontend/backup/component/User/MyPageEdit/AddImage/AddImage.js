import React, { useState, useEffect, useRef } from "react";

import default_user from "public/assets/image/default_user.png";
import add_image from "public/assets/image/add_image.png";
import { imgOnLoad } from "shared/functions";

const AddImage = props => {
  const { handlePhotoChange, userPhoto, newPhoto } = props;
  const [userPhotoSrc, setUserPhotoSrc] = useState("");
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  useEffect(() => {
    setUserPhotoSrc(userPhoto || default_user);
  }, [userPhoto]);
  useEffect(() => {
    if (newPhoto && newPhoto.preview) {
      setUserPhotoSrc(newPhoto.preview);
    }
  }, [newPhoto]);
  const _handlePhoto = () => {
    document.querySelector(".d_none").click();
  };
  const _imgOnLoad = e => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  return (
    <>
      <div className="add_img_ico" onClick={() => _handlePhoto()}>
        <div className="avatar">
          <img
            src={userPhotoSrc}
            alt="add_img_ico"
            className="user_image"
            onLoad={_imgOnLoad}
          />
          <input
            type="file"
            className="d_none"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <img src={add_image} className="camera" />
      </div>
      <style jsx>{`
        .add_img_ico {
          position: relative;
          width: 118px;
          height: 118px;
          margin: 0 auto;
          margin-top: 10px;
          overflow: hidden;
          margin-bottom: 32px;
        }
        .add_img_ico .avatar {
          position: relative;
          top: 0;
          left: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
        .add_img_ico .avatar .user_image {
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
        .camera {
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
      `}</style>
    </>
  );
};

export default AddImage;
