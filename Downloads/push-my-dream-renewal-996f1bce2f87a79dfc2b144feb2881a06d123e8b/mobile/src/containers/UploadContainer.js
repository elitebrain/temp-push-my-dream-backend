import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash/collection";

import UploadIndex from "components/Upload/UploadIndex";
import UploadModal from "components/Common/Modal/UploadModal";

import {
  UPLOAD_VIDEO_REQUEST,
  GET_VIDEO_CONVERT_REQUEST,
  UPLOAD_VIDEO_INIT,
} from "store/reducers/video";
import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";
import { getError } from "shared/functions";

const UploadContainer = ({ myParticipateSeason }) => {
  const [selectedSeason, setSelectedSeason] = useState({
    value: 0,
    label: "선택",
  });

  const Router = useRouter();
  const dispatch = useDispatch();
  const {
    isVideoUpLoaded,
    isConvertedLoaded,
    isFinishedUpLoaded,
    errorVideoUpLoaded,
    errorConvertedLoad,
    uploadVideo,
    uploadErrorMessage,
  } = useSelector((state) => state.video);

  // 업로드 시
  useEffect(() => {
    let interval;
    if (isVideoUpLoaded) {
      // 업로드 후 컨버팅이 미완료시
      if (!isConvertedLoaded) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            custom: true,
            isClose: false,
            container: <UploadModal />,
          },
        });
      }
      // 업로드 후 컨버팅도 끝날시
      else {
        interval = setInterval(() => {
          dispatch({
            type: GET_VIDEO_CONVERT_REQUEST,
            data: uploadVideo.job_id,
          });
        }, 3000);
      }
    }

    return function cleanup() {
      clearInterval(interval);
    };
  }, [dispatch, isVideoUpLoaded, isConvertedLoaded, uploadVideo]);

  useEffect(() => {
    // 업로드 완료시
    if (isFinishedUpLoaded) {
      dispatch({
        type: UPLOAD_VIDEO_INIT,
      });

      dispatch({
        type: CLOSE_MODAL,
      });

      Router.push("/mypage");
    }
  }, [isFinishedUpLoaded, dispatch]);

  useEffect(() => {
    // 영상 업로드 및 변환 실패시
    if (errorVideoUpLoaded || errorConvertedLoad) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "동영상 업로드에 실패하였습니다.",
          custom: false,
          container: null,
          isViewClose: false,
          isClose: true,
          onConfirm: () => {
            dispatch({ type: CLOSE_MODAL });
            dispatch({
              type: UPLOAD_VIDEO_INIT,
            });
          },

          onClose: () => {
            dispatch({ type: CLOSE_MODAL });
            dispatch({
              type: UPLOAD_VIDEO_INIT,
            });
          },
        },
      });
    }
  }, [errorVideoUpLoaded, errorConvertedLoad, uploadErrorMessage, dispatch]);

  /**
   * 카태고리 변경
   */
  const onChangeSelectedSeason = useCallback((selectedOption) => {
    setSelectedSeason(selectedOption);
  }, []);

  /**
   * 업로딩
   */
  const onUpload = useCallback(
    async ({ file, thumbnail, description }) => {
      try {
        if (Boolean(!selectedSeason.value)) {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: "경연을 선택해주세요.",
              isViewClose: false,
              onConfirm: () => {
                dispatch({
                  type: CLOSE_MODAL,
                });
              },
            },
          });
          return;
        }

        // 검증
        const {
          data: { myParticipateSeason: checkParticipateSeason },
        } = await userApi.get(`/me/participate/${selectedSeason.value}`, {
          withCredentials: true,
        });

        /**미참가 상태 */
        if (!checkParticipateSeason.is_participate) {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: "경연에 미참가 상태입니다.",
              isViewClose: false,
              onConfirm() {
                dispatch({ type: CLOSE_MODAL });
              },
            },
          });
          return;
        }

        /**업로드 불가능 상태 */
        if (!checkParticipateSeason.is_upload) {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: "업로드가 불가능한 상태입니다.",
              isViewClose: false,
              onConfirm: () => {
                dispatch({
                  type: CLOSE_MODAL,
                });
              },
            },
          });
          return;
        }

        const selectedCategory = _.find(
          myParticipateSeason,
          (data) => data.category_level4_no === selectedSeason.value
        );

        console.log(selectedCategory);

        // /**카테고리가 변경된 상태 */
        if (
          checkParticipateSeason.category_level1_no !==
            selectedCategory.category_level1_no ||
          checkParticipateSeason.category_level2_no !==
            selectedCategory.category_level2_no ||
          checkParticipateSeason.category_level3_no !==
            selectedCategory.category_level3_no ||
          checkParticipateSeason.category_level4_no !==
            selectedCategory.category_level4_no
        ) {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: "카테고리가 변경되었습니다. 업로드를 다시 시도해주세요.",
              isViewClose: false,
              onConfirm() {
                window.location.reload();
              },
              onClose() {
                window.location.reload();
              },
            },
          });
          return;
        }

        const formData = new FormData();
        formData.append("video", file);
        if (thumbnail) {
          formData.append("thumbnail", thumbnail);
        }
        formData.append("description", description);

        formData.append("category_level4_no", selectedSeason.value);

        // formData.append("type", type);
        dispatch({
          type: UPLOAD_VIDEO_INIT,
        });
        dispatch({
          type: UPLOAD_VIDEO_REQUEST,
          data: formData,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [myParticipateSeason, selectedSeason]
  );

  return (
    <UploadIndex
      selectedSeason={selectedSeason}
      onChangeSelectedSeason={onChangeSelectedSeason}
      onUpload={onUpload}
      myParticipateSeason={myParticipateSeason}
    />
  );
};

UploadContainer.propTypes = {
  myParticipateSeason: PropTypes.array,
};

export default UploadContainer;
