import React, {
  useState,
  createContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";

import Upload from "components/Upload";
import UploadModal from "components/Common/Modal/UploadModal";
import { videoApi, commonApi } from "shared/api";

import {
  UPLOAD_VIDEO_REQUEST,
  GET_VIDEO_CONVERT_REQUEST,
  UPLOAD_VIDEO_INIT,
} from "store/reducers/video";
import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";

import { VIDEO_FILE_SIZE, VIDEO_DURATION } from "shared/constants/variables";

export const UploadContext = createContext();

const UploadContainer = () => {
  const [fileName, setFileName] = useState("");
  //todo :0으로 바꾸기
  const [selectCategory, setSelectCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const {
    isVideoUpLoaded,
    isConvertedLoaded,
    isFinishedUpLoaded,
    errorVideoUpLoaded,
    errorConvertedLoad,
    uploadVideo,
    uploadErrorMessage,
  } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const fileRef = useRef();

  useEffect(() => {
    commonApi.get("/category-by-lv2").then((res) => {
      if (res.data) {
        setCategoryList(res.data);
      }
    });
  }, []);

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
          isClose: true,
          onClose: () => {
            dispatch({
              type: UPLOAD_VIDEO_INIT,
            });
          },
        },
      });
    }
  }, [errorVideoUpLoaded, errorConvertedLoad, uploadErrorMessage, dispatch]);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  // 카테고리 변경
  const onChangeCategory = useCallback((e) => {
    setSelectCategory(e.target.value);
  }, []);

  // 파일찾기 버튼 클릭
  const onClickFile = useCallback(() => {
    // 기존 파일 초기화
    fileRef.current.value = "";
    fileRef.current.click();
  }, [fileRef]);

  // 파일찾기 버튼 클릭 후 파일 선택 시 파일 변경
  const onChangeFile = useCallback(() => {
    const file = fileRef.current.files[0];
    setFileName(file.name);
  }, [fileRef]);

  const onUpload = useCallback(async () => {
    try {
      // todo: 영상 한개만 제어
      // const result = await videoApi.get("/my/video/count", {
      //   withCredentials: true
      // });
      // if (result.data.count > 0) {
      //   dispatch({
      //     type: OPEN_MODAL,
      //     data: {
      //       content: "현재 영상은 1개만 업로드가 가능합니다."
      //     }
      //   });
      //   return;
      // }

      // type validate
      if (fileName.length === 0) {
        return alert("파일명을 입력해주세요.");
      }

      if (selectCategory.length === 0) {
        return alert("카테고리를 선택해주세요.");
      }

      if (title.length === 0) {
        return alert("영상제목을 입력해주세요.");
      }

      if (description.length === 0) {
        return alert("영상소개 입력해주세요.");
      }

      const file = fileRef.current.files[0];

      if (file.size > VIDEO_FILE_SIZE) {
        alert("1GB 미만 영상만 업로드 가능합니다.");
        return;
      }

      const formData = new FormData();
      formData.append("video", file);
      formData.append("selectCategory", selectCategory);
      formData.append("title", title);
      formData.append("description", description);
      // formData.append("type", type);
      dispatch({
        type: UPLOAD_VIDEO_INIT,
      });
      dispatch({
        type: UPLOAD_VIDEO_REQUEST,
        data: formData,
      });

      // const video = document.createElement("video");
      // video.preload = "metadata";

      // video.onloadedmetadata = function() {
      //   window.URL.revokeObjectURL(video.src);
      //   if (video.duration > VIDEO_DURATION) {
      //     alert("10분 이내 곡으로만 선정해주세요.");
      //     return;
      //   } else {
      //     const formData = new FormData();
      //     formData.append("video", file);
      //     formData.append("selectCategory", selectCategory);
      //     formData.append("title", title);
      //     formData.append("description", description);
      //     // formData.append("type", type);
      //     dispatch({
      //       type: UPLOAD_VIDEO_INIT
      //     });
      //     dispatch({
      //       type: UPLOAD_VIDEO_REQUEST,
      //       data: formData
      //     });
      //   }
      // };

      // video.src = URL.createObjectURL(file);
    } catch (error) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "동영상 업로드에 실패하였습니다.",
        },
      });
    }
  }, [fileName, selectCategory, title, description, fileRef, dispatch]);

  return (
    <UploadContext.Provider
      value={{
        fileRef,
        categoryList,
        fileName,
        selectCategory,
        title,
        description,
        onClickFile,
        onChangeFile,
        onChangeTitle,
        onChangeDescription,
        onChangeCategory,
        onUpload,
      }}
    >
      <Upload />
    </UploadContext.Provider>
  );
};

export default UploadContainer;
