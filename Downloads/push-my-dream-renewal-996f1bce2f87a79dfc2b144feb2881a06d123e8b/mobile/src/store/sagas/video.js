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
} from "redux-saga/effects";

import { getError } from "shared/functions";

import {
  GET_MYVIDEOLIST_REQUEST,
  GET_MYVIDEOLIST_SUCCESS,
  GET_MYVIDEOLIST_FAILURE,
  GET_USER_VIDEOLIST_REQUEST,
  GET_USER_VIDEOLIST_SUCCESS,
  GET_USER_VIDEOLIST_FAILURE,
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
  GET_MAINPAGE_REQUEST,
  GET_MAINPAGE_SUCCESS,
  GET_MAINPAGE_FAILURE,
  LIKE_VIDEO_REQUEST,
  LIKE_VIDEO_SUCCESS,
  LIKE_VIDEO_FAILURE,
  GET_HOT_VIEW_VIDEO_REQUEST,
  GET_HOT_VIEW_VIDEO_SUCCESS,
  GET_HOT_VIEW_VIDEO_FAILURE,
  GET_HOTTALK_VIDEO_REQUEST,
  GET_HOTTALK_VIDEO_SUCCESS,
  GET_HOTTALK_VIDEO_FAILURE,
  GET_NEW_VIDEO_REQUEST,
  GET_NEW_VIDEO_SUCCESS,
  GET_NEW_VIDEO_FAILURE,
  GET_MORE_VIDEOLIST_REQUEST,
  GET_MORE_VIDEOLIST_SUCCESS,
  GET_MORE_VIDEOLIST_FAILURE,
  GET_HOT_LIKE_VIDEO_REQUEST,
  GET_HOT_LIKE_VIDEO_SUCCESS,
  GET_HOT_LIKE_VIDEO_FAILURE,
} from "store/reducers/video";

import { uploadApi, videoApi, mainApi, userApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";
import { LIKE_CATEGORY_VIDEO_SUCCESS } from "store/reducers/categoryVideo";

function uploadEmitter(action) {
  let emit;
  const channel = eventChannel((emitter) => {
    emit = emitter;

    return () => {};
  });

  const uploadPromise = uploadApi
    .post("/season", action.data, {
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
      console.log(err.message);
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
function getMyVideoListApi({ category3No }) {
  return userApi.get("/my-video", {
    params: { category3No },
    withCredentials: true,
  });
}

function* getMyVideoList(action) {
  try {
    const result = yield call(getMyVideoListApi, action.payload);

    yield put({
      type: GET_MYVIDEOLIST_SUCCESS,
      data: result.data.list,
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

// 내 비디오 목록 조회
function getUserVideoListApi(data) {
  return userApi.get(`/video/${data.userNo}`, {
    params: {
      category3No: data.category3No,
    },
    withCredentials: true,
  });
}

function* getUserVideoList(action) {
  try {
    const result = yield call(getUserVideoListApi, action.data);

    yield put({
      type: GET_USER_VIDEOLIST_SUCCESS,
      data: result.data.list,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_USER_VIDEOLIST_FAILURE,
    });
  }
}

function* watchGetUserVideoList() {
  yield takeLatest(GET_USER_VIDEOLIST_REQUEST, getUserVideoList);
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

// 내 비디오 삭제
function deleteVideoApi(data) {
  return videoApi.delete(`/${data.videoNo}`, {
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

    if (action.data.success) {
      action.data.success();
    }
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

function getMainPageApi(payload) {
  return mainApi.get("/videos", {
    params: payload,
    withCredentials: true,
  });
}

function* getMainPage(action) {
  try {
    const result = yield call(getMainPageApi, action.payload);

    yield put({
      type: GET_MAINPAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_MAINPAGE_FAILURE,
    });
  }
}

function* watchGetMainPage() {
  yield takeLatest(GET_MAINPAGE_REQUEST, getMainPage);
}

// 좋아요 토글
function updateLikeVideoApi(payload) {
  return payload.isLiked
    ? videoApi.post(
        "/like",
        { videoNo: payload.videoNo },
        {
          withCredentials: true,
        }
      )
    : videoApi.delete("/like", {
        params: {
          videoNo: payload.videoNo,
        },
        withCredentials: true,
      });
}

function* updateLikeVideo(action) {
  try {
    yield delay(50);
    yield call(updateLikeVideoApi, action.payload);

    yield put({
      type: LIKE_VIDEO_SUCCESS,
      payload: action.payload,
    });

    yield put({
      type: LIKE_CATEGORY_VIDEO_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LIKE_VIDEO_FAILURE,
    });
  }
}

function* watchUpdateLikeVideo() {
  yield takeLatest(LIKE_VIDEO_REQUEST, updateLikeVideo);
}

// 핫 비디오 더 불러오기
function getMoreHotVideoApi(data) {
  return videoApi.get("/more", {
    params: Object.assign({}, data, { option: "hoView" }),
    withCredentials: true,
  });
}

function* getMoreHotVideo(action) {
  try {
    const result = yield call(getMoreHotVideoApi, action.data);

    yield put({
      type: GET_HOT_VIEW_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_HOT_VIEW_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreHotVideo() {
  yield takeLatest(GET_HOT_VIEW_VIDEO_REQUEST, getMoreHotVideo);
}

// 핫톡 비디오 더 불러오기
function getMoreHotTalkVideoApi(data) {
  return videoApi.get("/more", {
    params: Object.assign({}, data, { option: "hotTalk" }),
    withCredentials: true,
  });
}

function* getMoreHotTalkVideo(action) {
  try {
    const result = yield call(getMoreHotTalkVideoApi, action.data);

    yield put({
      type: GET_HOTTALK_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_HOTTALK_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreHotTalkVideo() {
  yield takeLatest(GET_HOTTALK_VIDEO_REQUEST, getMoreHotTalkVideo);
}

// 핫 라이크 비디오 더 불러오기
function getMoreHotLikeVideoApi(data) {
  return videoApi.get("/more", {
    params: Object.assign({}, data, { option: "hotLike" }),
    withCredentials: true,
  });
}

function* getMoreHotLikeVideo(action) {
  try {
    const result = yield call(getMoreHotLikeVideoApi, action.data);

    yield put({
      type: GET_HOT_LIKE_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_HOT_LIKE_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreHotLikeVideo() {
  yield takeLatest(GET_HOT_LIKE_VIDEO_REQUEST, getMoreHotLikeVideo);
}

// 뉴 비디오 더 불러오기
function getMoreNewVideoApi(data) {
  return videoApi.get("/more", {
    params: Object.assign({}, data, { option: "new" }),
    withCredentials: true,
  });
}

function* getMoreNewVideo(action) {
  try {
    const result = yield call(getMoreNewVideoApi, action.data);

    yield put({
      type: GET_NEW_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_NEW_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreNewVideo() {
  yield takeLatest(GET_NEW_VIDEO_REQUEST, getMoreNewVideo);
}

// 비디오 리스트 더 불러오기
function getMoreVideoListApi(data) {
  return videoApi.get("/list", {
    params: data,
    withCredentials: true,
  });
}

function* getMoreVideoList(action) {
  try {
    const result = yield call(getMoreVideoListApi, action.data);

    yield put({
      type: GET_MORE_VIDEOLIST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_MORE_VIDEOLIST_FAILURE,
    });
  }
}

function* watchGetMoreVideoList() {
  yield takeLatest(GET_MORE_VIDEOLIST_REQUEST, getMoreVideoList);
}

export default function* videoSaga() {
  yield all([
    fork(watchGetMyVideoList),
    fork(watchUploadVideo),
    fork(watchUpGetConvertVideo),
    fork(watchUpdateVideoOpen),
    fork(watchDeleteVideo),
    fork(watchGetMainPage),
    fork(watchUpdateLikeVideo),
    fork(watchGetMoreHotVideo),
    fork(watchGetMoreHotTalkVideo),
    fork(watchGetMoreHotLikeVideo),
    fork(watchGetMoreNewVideo),
    fork(watchGetMoreVideoList),
    fork(watchGetUserVideoList),
  ]);
}
