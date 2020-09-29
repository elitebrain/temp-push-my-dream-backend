import { eventChannel, END } from "redux-saga";
import {
  all,
  call,
  put,
  fork,
  take,
  takeLatest,
  cancelled,
  delay,
  takeEvery,
} from "redux-saga/effects";

import { getError } from "shared/functions";

import {
  GET_MYVIDEOLIST_REQUEST,
  GET_MYVIDEOLIST_SUCCESS,
  GET_MYVIDEOLIST_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  UPLOAD_PROGRESS,
  GET_VIDEO_CONVERT_REQUEST,
  GET_VIDEO_CONVERT_SUCCESS,
  GET_VIDEO_CONVERT_FAILURE,
  UPDATE_VIDEO_ISOPEN_REQUEST,
  UPDATE_VIDEO_ISOPEN_SUCCESS,
  UPDATE_VIDEO_ISOPEN_FAILURE,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAILURE,
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_FAILURE,
} from "store/reducers/video";

import { uploadApi, videoApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";

function uploadEmitter(action) {
  let emit;
  const channel = eventChannel((emitter) => {
    emit = emitter;

    return () => {};
  });

  const uploadPromise = uploadApi
    .post("/", action.data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
      onUploadProgress(e) {
        emit(Math.floor((e.loaded * 100) / e.total));
      },
    })
    .then((result) => {
      emit(END);
      return result;
    })
    .catch((err) => {
      emit(new Error(err.message));
      emit(END);
    });

  return [uploadPromise, channel];
}

// // 비디오 업로드
// function uploadVideoApi(formData, onProgress) {
//   return uploadApi.post("/", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//     withCredentials: true,
//     onUploadProgress: onProgress
//   });
// }

function* progressListener(payload) {
  try {
    while (true) {
      const data = yield take(payload);
      yield put({ type: UPLOAD_PROGRESS, data });
    }
  } finally {
    if (yield cancelled()) {
      payload.close();
    }
  }
}

function* uploadVideo(action) {
  try {
    // const result = yield call(uploadVideoApi, action.data, onProgress);
    const [uploadPromise, channel] = uploadEmitter(action);
    yield fork(progressListener, channel);

    const result = yield call(() => uploadPromise);

    yield put({
      type: UPLOAD_VIDEO_SUCCESS,
      data: result.data.video,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_VIDEO_FAILURE,
      data: getError(e),
    });
  }
}

function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}

// 내 비디오 목록 조회
function getMyVideoListApi() {
  return videoApi.get("/my-video", {
    withCredentials: true,
  });
}

function* getMyVideoList() {
  try {
    const result = yield call(getMyVideoListApi);

    yield put({
      type: GET_MYVIDEOLIST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_MYVIDEOLIST_FAILURE,
    });
  }
}

function* watchGetMyVideoList() {
  yield takeLatest(GET_MYVIDEOLIST_REQUEST, getMyVideoList);
}

// 비디오 변환 여부 조회
function getConvertVideoApi(jobId) {
  return uploadApi.get("/job/status", {
    params: {
      jobId,
    },
  });
}

function* getConvertVideo(action) {
  try {
    const result = yield call(getConvertVideoApi, action.data);

    // 영상 컨버팅 성공
    if (result.data.code === 200) {
      yield put({
        type: GET_VIDEO_CONVERT_SUCCESS,
        data: result.data.video,
      });
    }

    // 영상 컨버팅 실패
    else if (result.data.code === 400) {
      yield put({
        type: GET_VIDEO_CONVERT_FAILURE,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_VIDEO_CONVERT_FAILURE,
      data: getError(e),
    });
  }
}

function* watchUpGetConvertVideo() {
  yield takeLatest(GET_VIDEO_CONVERT_REQUEST, getConvertVideo);
}

// 내 비디오 공개 유무 변경
function updateVideoOpenApi(data) {
  return videoApi.put("/is-open", data, {
    withCredentials: true,
  });
}

function* updateVideoOpen(action) {
  try {
    yield call(updateVideoOpenApi, action.data);

    yield put({
      type: UPDATE_VIDEO_ISOPEN_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPDATE_VIDEO_ISOPEN_FAILURE,
    });

    yield put({
      type: OPEN_MODAL,
      data: {
        content: getError(e),
        isViewClose: false,
      },
    });
  }
}

function* watchUpdateVideoOpen() {
  yield takeLatest(UPDATE_VIDEO_ISOPEN_REQUEST, updateVideoOpen);
}

// 내 비디오 공개 유무 변경
function deleteVideoApi(data) {
  return videoApi.delete(`/${data}`, {
    withCredentials: true,
  });
}

function* deleteVideo(action) {
  try {
    yield call(deleteVideoApi, action.data);

    yield put({
      type: DELETE_VIDEO_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_VIDEO_FAILURE,
    });
  }
}

function* watchDeleteVideo() {
  yield takeLatest(DELETE_VIDEO_REQUEST, deleteVideo);
}

// 비디오 조회
function getVideoApi(data) {
  return videoApi.get("/", {
    params: { videoNo: data },
  });
}

function* getVideo(action) {
  try {
    const result = yield call(getVideoApi, action.data);

    yield put({
      type: GET_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_VIDEO_FAILURE,
    });
  }
}

function* watchGetVideo() {
  yield takeLatest(GET_VIDEO_REQUEST, getVideo);
}

export default function* videoSaga() {
  yield all([
    fork(watchGetMyVideoList),
    fork(watchUploadVideo),
    fork(watchUpGetConvertVideo),
    fork(watchUpdateVideoOpen),
    fork(watchDeleteVideo),
    fork(watchGetVideo),
  ]);
}
