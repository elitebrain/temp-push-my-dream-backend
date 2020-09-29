import React, { useRef, useCallback, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import GradientBox from "components/Common/GradientBox";
import NewButton from "components/Common/NewButton";
import Content from "components/Layout/Content";
import { AiFillVideoCamera, AiFillCamera } from "react-icons/ai";

import {
  WHITE_COLOR,
  COLOR_696C8C,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_2F3354_040221,
  COLOR_979CCA,
} from "shared/constants/colors";

import artist_user_ico from "public/assets/icon/artist_user.svg";
import normal_user_ico from "public/assets/icon/normal_user.svg";

import { OPEN_MODAL } from "store/reducers/modal";

import { THUMBNAIL_FILE_SIZE } from "shared/constants/variables";

const thumbnailTypes = [".PNG", ".JPG", ".JPEG", ".GIF"];

const VideoEdit = ({ isEditingVideo, video, onEditVideo }) => {
  const thumbnailRef = useRef();
  const dispatch = useDispatch();

  const [thumbnail, setThumbnail] = useState(
    video.thumbnail.substr(video.thumbnail.lastIndexOf("/") + 1)
  );
  const [fileName] = useState(video.original_file_name);
  const [description, setDescription] = useState(video.description);

  /**
   * 썸네일 버튼 클릭 시
   */
  const onUploadThumbnail = useCallback(() => {
    thumbnailRef.current.value = "";
    thumbnailRef.current.click();
  }, [thumbnailRef]);

  /**
   * 썸네일 변경
   */
  const onChangeThumbnail = useCallback(() => {
    const thumbnail = thumbnailRef.current.files[0];

    const pathPoint = thumbnail.name.lastIndexOf(".");

    const type = thumbnail.name
      .substring(pathPoint, thumbnail.name.length)
      .toUpperCase();

    // 비디오 파일 형식과 다를 시
    if (thumbnailTypes.indexOf(type) === -1) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: "썸네일 형식을 확인해주세요.",
          isViewClose: false,
        },
      });
    }

    // 파일 용량 체크
    if (thumbnail.size > THUMBNAIL_FILE_SIZE) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: "10MB 미만 썸네일만 업로드 가능합니다.",
          isViewClose: false,
        },
      });
    }

    setThumbnail(thumbnail.name);
  }, [thumbnailRef]);

  /**
   * 설명 변경
   */
  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  /**
   * 변경 버튼 클릭
   */
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (description.length === 0) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "영상소개 입력해주세요.",
            isViewClose: false,
          },
        });
      }

      if (!isEditingVideo) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "변경 내용을 적용하시겠습니까?",
            confirmText: "네",
            closeText: "아니요",
            onConfirm() {
              onEditVideo({
                thumbnail: thumbnailRef.current.files[0]
                  ? thumbnailRef.current.files[0]
                  : null,
                description,
              });
            },
          },
        });
      }
    },
    [description, isEditingVideo, thumbnailRef ** thumbnailRef.current]
  );

  return (
    <div className="VideoEdit">
      <GradientBox maxWidth>
        <div className="videoSeason_Notice">
          <div className="videoSeason_Title">
            <div className="Season">
              {video.CATEGORY_LEVEL3.category_level3}
            </div>
            <div className="Date">{`${moment(
              video.CATEGORY_LEVEL3.start_time
            ).format("YYYY.MM.DD")} ~ ${moment(
              video.CATEGORY_LEVEL3.end_time
            ).format("YYYY.MM.DD")}`}</div>
          </div>
          <div className="Icons">
            <div className="Type">
              <img
                src={
                  video.UPLOAD_POSSIBLE_USER.type === "normal"
                    ? normal_user_ico
                    : artist_user_ico
                }
                width="100%"
                height="100%"
              />
            </div>
            <div className="Season_Icon">
              <img
                src={
                  video.UPLOAD_POSSIBLE_USER.type === "normal"
                    ? video.CATEGORY_LEVEL2.category_level2_icon
                    : video.CATEGORY_LEVEL2.category_level2_gradient_icon
                }
                width="100%"
                height="100%"
              />
            </div>
          </div>
          {video.UPLOAD_POSSIBLE_USER.type === "normal" && (
            <div className="Normal_Notice">
              ※ 아티스트로 전환시 본선 진출이 가능합니다.
            </div>
          )}
        </div>
      </GradientBox>
      <Content>
        <form className="Form" onSubmit={onSubmit}>
          {/* 썸네일 업로드 */}
          <div className="FileFlex">
            <input
              className="FileName"
              readOnly
              placeholder="썸네일을 선택해주세요."
              value={thumbnail}
            />
            <input
              ref={thumbnailRef}
              type="file"
              className="File"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={onChangeThumbnail}
            />
            <div className="FileButton">
              <NewButton
                type="button"
                bgImage={GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")}
                onClick={onUploadThumbnail}
              >
                <AiFillCamera className="FileButton" />
              </NewButton>
            </div>
          </div>
          {/* 영상 업로드 */}
          <div className="FileFlex">
            <input
              className="FileName"
              readOnly
              placeholder="영상을 선택해주세요."
              value={fileName}
              readOnly
            />
            <div className="FileButton">
              <NewButton
                type="button"
                bgImage={GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")}
                disabled
              >
                <AiFillVideoCamera className="FileButton" />
              </NewButton>
            </div>
          </div>
          <div className="DescriptionContainer">
            <textarea
              className="Description"
              placeholder="영상 소개 내용을 입력해주세요."
              value={description}
              onChange={onChangeDescription}
              maxLength="100"
            />
            <div className="Length">{`${description.length}/100`}</div>
          </div>
          <div className="ButtonContainer">
            <NewButton height="40px" bgColor={BACKGROUND_BLACK_COLOR} gradient>
              변경
            </NewButton>
          </div>
        </form>
      </Content>
      <style jsx>{`
        .VideoEdit {
          padding-bottom: 30px;
        }
        .videoSeason_Notice {
          max-width: 1200px;
          margin: 0 auto;
        }
        .videoSeason_Notice .videoSeason_Title {
          margin-bottom: 10px;
        }
        .videoSeason_Notice .videoSeason_Title .Season {
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          color: ${WHITE_COLOR};
        }
        .videoSeason_Notice .videoSeason_Title .Date {
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
        }

        .videoSeason_Notice .Icons {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 30px;
        }

        .videoSeason_Notice .Icons .Type {
          width: 80px;
          height: 30px;
          margin-right: 15px;
        }

        .videoSeason_Notice .Icons .Season_Icon {
          width: 75px;
          height: 30px;
        }
        .videoSeason_Notice .Normal_Notice {
          margin-top: 15px;
          text-align: right;
          font-size: 12px;
          color: ${COLOR_696C8C};
        }

        .Form {
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .Form :global(.FileButton) {
          width: 50px;
          height: 35px;
          display: flex;
          align-items: center;
          margin: 0 auto;
          color: #44cde7;
        }

        .Form .FileFlex {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .Form .FileFlex .FileName {
          flex: 1;
          height: 40px;
          font-size: 12px;
          margin-right: 10px;
          box-sizing: border-box;
          background: ${COLOR_696C8C};
          border-radius: 10px;
          padding: 0px 15px;
          border: none;
          color: ${WHITE_COLOR};
        }

        .Form .FileFlex .File {
          display: none;
        }

        .Form .FileFlex .FileButton {
          flex-basis: 90px;
          height: 40px;
        }

        .DescriptionContainer .Description {
          width: 100%;
          height: 100px;
          padding: 15px;
          box-sizing: border-box;
          border-radius: 10px;
          font-weight: 500;
          font-size: 15px;
          color: ${COLOR_979CCA};
          resize: none;
        }

        .DescriptionContainer .Length {
          margin-top: 5px;
          text-align: right;
          font-weight: 500;
          font-size: 14px;
          color: ${WHITE_COLOR};
        }

        .ButtonContainer {
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default VideoEdit;
