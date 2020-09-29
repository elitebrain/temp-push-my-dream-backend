import React, { useState, useEffect, useCallback, useRef } from "react";
import { emergenzaApi, videoApi } from "shared/api";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import {
  UPLOAD_VIDEO_REQUEST,
  GET_VIDEO_CONVERT_REQUEST,
  UPLOAD_VIDEO_INIT
} from "store/reducers/video";
import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";

import EmergenzaApplyComponent from "components/Emergenza/Apply/EmergenzaApplyComponent";
import UploadModal from "components/Common/Modal/UploadModal";

import { getError } from "shared/functions";

import { VIDEO_FILE_SIZE, VIDEO_DURATION } from "shared/constants/variables";

const EmergenzaApplyContainer = () => {
  const [isApply, setIsApply] = useState(false);
  const [selectCategory, setSelectCategory] = useState("2");
  const [emergenzaTeamNo, setEmergenzaTeamNo] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    Video: [],
    isUploadVideo: false
  });
  const {
    isVideoUpLoaded,
    isConvertedLoaded,
    isFinishedUpLoaded,
    errorVideoUpLoaded,
    errorConvertedLoad,
    uploadVideo,
    uploadErrorMessage
  } = useSelector(state => state.video);
  const dispatch = useDispatch();

  const fileRef = useRef();

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
            container: <UploadModal />
          }
        });
      }
      // 업로드 후 컨버팅도 끝날시
      else {
        interval = setInterval(() => {
          dispatch({
            type: GET_VIDEO_CONVERT_REQUEST,
            data: uploadVideo.job_id
          });
        }, 3000);
      }
    }

    return function cleanup() {
      clearInterval(interval);
    };
  }, [dispatch, isVideoUpLoaded, isConvertedLoaded, uploadVideo]);
  // 업로드 완료시
  useEffect(() => {
    if (isFinishedUpLoaded) {
      setApplicationForm(prev => ({
        ...prev,
        Video: prev.Video.concat({
          video_no: uploadVideo.video_no,
          description: uploadVideo.description,
          original_file_name: uploadVideo.original_file_name,
          url_1080p: uploadVideo.url_1080p,
          url_720p: uploadVideo.url_720p,
          url_480p: uploadVideo.url_480p,
          duration: uploadVideo.duration
        }),
        isUploadVideo: true
      }));

      dispatch({
        type: UPLOAD_VIDEO_INIT
      });

      dispatch({
        type: OPEN_MODAL,
        data: {
          custom: false,
          container: null,
          isClose: true,
          content: "참가신청이 완료되었습니다."
        }
      });
    }
  }, [isFinishedUpLoaded, dispatch, uploadVideo]);
  // 영상 업로드 및 변환 실패시
  useEffect(() => {
    if (errorVideoUpLoaded || errorConvertedLoad) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "동영상 업로드에 실패하였습니다.",
          custom: false,
          container: null,
          isClose: true,
          onClose: () => {
            dispatch({
              type: UPLOAD_VIDEO_INIT
            });
          }
        }
      });
    }
  }, [errorVideoUpLoaded, errorConvertedLoad, uploadErrorMessage, dispatch]);

  // 참가신청
  const _handleApply = useCallback(
    (sendData, uploadData) => {
      emergenzaApi.post("/", sendData, { withCredentials: true }).then(res => {
        if (res.data && res.data[0]) {
          setEmergenzaTeamNo(res.data[0]);
          setIsApply(true);
          const file = fileRef.current.files[0];
          fileRef.current.value = "";

          if (file) {
            _uploadVideo({ file, description: uploadData.description });
          } else {
            dispatch({
              type: OPEN_MODAL,
              data: {
                custom: false,
                container: null,
                isClose: true,
                content: "참가신청이 완료되었습니다.",
                onConfirm() {
                  Router.push("/");
                }
              }
            });
          }
        }
      });
    },
    [fileRef, dispatch]
  );

  useEffect(() => _getApplicationForm(), []);
  // 참가신청서 조회
  const _getApplicationForm = () => {
    emergenzaApi
      .get("/", { withCredentials: true, params: { selectCategory } })
      .then(res => {
        if (res.data.emergenza_team_no) {
          setApplicationForm(res.data);
          setEmergenzaTeamNo(res.data.emergenza_team_no);
        }
      });
  };
  // 참가신청 수정
  const _handleSave = useCallback(
    async (sendData, uploadData) => {
      try {
        const file = fileRef.current.files[0];
        fileRef.current.value = "";
        // 업로드한 비디오가 없을 시
        if (applicationForm.isUploadVideo && file) {
          const videoNo = applicationForm.Video[0].video_no;
          await videoApi.delete("/", {
            withCredentials: true,
            params: {
              videoNo
            }
          });
        }

        const res = await emergenzaApi.put("/", sendData, {
          withCredentials: true
        });
        if (res.data && res.data.length === 2) {
          if (file) {
            _uploadVideo({ file, description: uploadData.description });
          } else {
            dispatch({
              type: OPEN_MODAL,
              data: {
                custom: false,
                container: null,
                isClose: true,
                content: "저장되었습니다.",
                onConfirm() {
                  Router.push("/");
                }
              }
            });
          }
        }
      } catch (error) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: getError(error)
          }
        });
      }
    },
    [applicationForm, dispatch, fileRef]
  );
  // 업로드 동영상
  const _uploadVideo = uploadData => {
    const { file, description } = uploadData;
    const fileName = file.name;

    try {
      if (fileName.length === 0) {
        return alert("파일을 등록해주세요.");
      }
      if (description.length === 0) {
        return alert("영상소개를 입력해주세요.");
      }
      if (file.size > VIDEO_FILE_SIZE) {
        alert("1GB 미만 영상만 업로드 가능합니다.");
        return;
      }

      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > VIDEO_DURATION) {
          alert("10분 이내 곡으로만 선정해주세요.");
          return;
        } else {
          const formData = new FormData();
          formData.append("video", file);
          formData.append("selectCategory", selectCategory);
          formData.append("description", description);
          formData.append("title", "[ EMERGENZA 2020 참가 영상 ]");
          dispatch({
            type: UPLOAD_VIDEO_INIT
          });
          dispatch({
            type: UPLOAD_VIDEO_REQUEST,
            data: formData
          });
          dispatch({
            type: OPEN_MODAL,
            data: {
              onConfirm() {
                Router.push("/");
              }
            }
          });
        }
      };
      video.src = URL.createObjectURL(file);
    } catch (error) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "동영상 업로드에 실패하였습니다."
        }
      });
    }
  };
  return (
    <EmergenzaApplyComponent
      fileRef={fileRef}
      handleApply={_handleApply}
      handleSave={_handleSave}
      emergenzaTeamNo={emergenzaTeamNo}
      isApply={isApply}
      setIsApply={setIsApply}
      applicationForm={applicationForm}
    />
  );
};

export default EmergenzaApplyContainer;
