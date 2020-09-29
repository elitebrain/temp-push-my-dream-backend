import React, { useRef, useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import GradientBox from "components/Common/GradientBox";
import NewButton from "components/Common/NewButton";
import Content from "components/Layout/Content";
import Noti from "components/Common/Noti";
import { AiFillVideoCamera, AiFillCamera } from "react-icons/ai";

import {
  WHITE_COLOR,
  COLOR_696C8C,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_2F3354_040221,
  COLOR_979CCA,
  FONT_WHITE_COLOR,
  BLACK_COLOR,
} from "shared/constants/colors";

import artist_user_ico from "public/assets/icon/artist_user.svg";
import normal_user_ico from "public/assets/icon/normal_user.svg";
import camera_ico from "public/assets/image/icon_camera.png";
import { OPEN_MODAL } from "store/reducers/modal";

import {
  VIDEO_FILE_SIZE,
  THUMBNAIL_FILE_SIZE,
} from "shared/constants/variables";
import Link from "next/link";

const thumbnailTypes = [".PNG", ".JPG", ".JPEG", ".GIF"];

const videoTypes = [
  ".AVI",
  ".MP4",
  ".M4V",
  ".MPG",
  ".MPEG",
  ".MOV",
  ".WEBM",
  ".WMV",
];

const customStyles = {
  singleValue: (provided) => ({
    ...provided,
    color: FONT_WHITE_COLOR,
    fontSize: "14px",
  }),
  option: (provided) => ({
    ...provided,
    color: BLACK_COLOR,
    fontSize: "14px",
  }),
  menu: (provided) => ({
    ...provided,
    color: FONT_WHITE_COLOR,
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    width: "100%",
    backgroundColor: BACKGROUND_BLACK_COLOR,
    border: "1px solid #696C8C",
    color: FONT_WHITE_COLOR,
    height: "40px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: FONT_WHITE_COLOR,
  }),
};

const UploadIndex = ({
  selectedSeason,
  onChangeSelectedSeason,
  myParticipateSeason,
  onUpload,
}) => {
  const fileRef = useRef();
  const thumbnailRef = useRef();
  const dispatch = useDispatch();
  const { isVideoUpLoaded } = useSelector((state) => state.video);

  const [thumbnail, setThumbnail] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");

  /**
   * 등록버튼 클릭
   */
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const file = fileRef.current.files[0];

      if (!file) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "파일을 선택해주세요.",
            isViewClose: false,
          },
        });
        return;
      }

      if (description.length === 0) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "영상소개 입력해주세요.",
            isViewClose: false,
          },
        });
        return;
      }

      if (!isVideoUpLoaded) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <div className="UploadNoticeModal">
                <div className="Notice">
                  <p>
                    영상 업로드 완료 후 파일 변환을 거쳐 비공개 상태에서 공개로
                    전환됩니다.
                  </p>
                  <p>
                    업로드가 완료되기 전에 네트워크 연결 끊김, 페이지 나가기,
                    새로고침 등이 발생할 경우 업로드가 취소 될 수 있습니다.
                  </p>
                </div>
                <h5 className="Check">계속 진행 하시겠습니까?</h5>
                <style jsx>{`
                  .UploadNoticeModal {
                    min-width: 200px;
                    font-size: 14px;
                    line-height: 20px;
                    color: #aaa;
                    margin: 0 auto;
                  }

                  .UploadNoticeModal .Notice {
                    margin-bottom: 60px;
                    text-align: initial;
                  }

                  .UploadNoticeModal p:first-of-type {
                    margin-bottom: 20px;
                  }

                  .UploadNoticeModal .Check {
                    font-weight: bold;
                    color: ${FONT_WHITE_COLOR};
                    font-size: 18px;
                    line-height: 22px;
                    padding-bottom: 20px;
                  }
                `}</style>
              </div>
            ),
            confirmText: "네",
            closeText: "아니요",
            onConfirm: () => {
              onUpload({
                file: fileRef.current.files[0],
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
    [
      fileName,
      description,
      fileRef,
      thumbnailRef,
      isVideoUpLoaded,
      dispatch,
      onUpload,
    ]
  );

  /**
   * 썸네일 버튼 클릭 시
   */
  const onUploadThumbnail = useCallback(() => {
    setThumbnail("");
    thumbnailRef.current.value = "";
    thumbnailRef.current.click();
  }, [thumbnailRef]);

  /**
   * 업로드 카메라 버튼 클릭 시
   */
  const onUploadVideo = useCallback(() => {
    setFileName("");
    fileRef.current.value = "";
    fileRef.current.click();
  }, [fileRef]);

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
   * 파일 변경
   */
  const onChangeFile = useCallback(() => {
    const file = fileRef.current.files[0];
    const pathPoint = file.name.lastIndexOf(".");

    const type = file.name.substring(pathPoint, file.name.length).toUpperCase();

    // 비디오 파일 형식과 다를 시
    if (videoTypes.indexOf(type) === -1) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: "비디오 형식을 확인해주세요.",
          isViewClose: false,
        },
      });
    }

    // 파일 용량 체크
    if (file.size > VIDEO_FILE_SIZE) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: "1GB 미만 영상만 업로드 가능합니다.",
          isViewClose: false,
        },
      });
    }

    setFileName(file.name);
  }, [fileRef]);

  /**
   * 설명 변경
   */
  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const options = useMemo(
    () => [
      {
        value: 0,
        label: "선택",
      },
      ...myParticipateSeason.map((data) => ({
        value: data.category_level4_no,
        label: data.CATEGORY_LEVEL3.category_level3,
      })),
    ],
    [myParticipateSeason]
  );

  return (
    <div className="UploadIndex">
      <GradientBox maxWidth>
        <div className="Select_container">
          <Select
            value={selectedSeason}
            onChange={onChangeSelectedSeason}
            options={options}
            styles={customStyles}
          />
          <h5>
            * 참가 신청 완료한 경연만 선택 가능합니다.
            <Link href="/season">
              <a>[ 대회 정보 ]</a>
            </Link>
          </h5>
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
            />
            <input
              ref={fileRef}
              type="file"
              className="File"
              accept="video/avi, video/MP4, video/m4v, video/mpg, video/mpeg, video/quicktime, video/webm, video/wmv"
              onChange={onChangeFile}
            />
            <div className="FileButton">
              <NewButton
                type="button"
                bgImage={GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")}
                onClick={onUploadVideo}
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
          <Noti title="영상 업로드">
            <p>참여중인 경연에만 영상 업로드가 가능합니다.</p>
            <p>
              경연 참여는 ‘<strong className="strong">메뉴</strong>’ &gt; ‘
              <strong className="strong">대회 정보</strong>
              ’에서 할 수 있습니다.
            </p>
            <p>
              썸네일을 별도 등록하지 않을 경우 영상에서 추출된 이미지가
              사용됩니다.
            </p>
          </Noti>
          <div className="ButtonContainer">
            <NewButton height="40px" bgColor={BACKGROUND_BLACK_COLOR} gradient>
              등록
            </NewButton>
          </div>
        </form>
      </Content>
      <style jsx>{`
        .UploadIndex {
          padding-bottom: 30px;
        }
        .Select_container {
          margin: 5px 0px;
        }

        .Select_container h5 {
          margin-left: 10px;
          margin-top: 5px;
          font-size: 12px;
          line-height: 15px;

          color: ${FONT_WHITE_COLOR};
        }

        .Select_container a {
          margin-left: 7px;
          font-weight: bold;
          color: ${FONT_WHITE_COLOR};
          text-decoration: none;
          cursor: pointer;
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

        p {
          font-size: 10px;
          line-height: 12px;
        }

        .strong {
          font-weight: bold;
          color: ${WHITE_COLOR};
        }
      `}</style>
    </div>
  );
};

UploadIndex.propTypes = {
  selectedSeason: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  onChangeSelectedSeason: PropTypes.func,
  myParticipateSeason: PropTypes.array,

  onUpload: PropTypes.func,
};

export default UploadIndex;
