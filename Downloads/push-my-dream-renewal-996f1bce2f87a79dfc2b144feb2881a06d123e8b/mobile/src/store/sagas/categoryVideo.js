import { all, fork, put, call, takeLatest, debounce } from "redux-saga/effects";
import {
  GET_CATEGORYPAGE_REQUEST,
  GET_CATEGORYPAGE_SUCCESS,
  GET_CATEGORYPAGE_FAILURE,
  // GET_HOT_TALK_CATEGORY_VIDEO_REQUEST,
  // GET_HOT_TALK_CATEGORY_VIDEO_SUCCESS,
  // GET_HOT_TALK_CATEGORY_VIDEO_FAILURE,
  GET_NEW_CATEGORY_VIDEO_REQUEST,
  GET_NEW_CATEGORY_VIDEO_SUCCESS,
  GET_NEW_CATEGORY_VIDEO_FAILURE,
  LIKE_CATEGORY_VIDEO_REQUEST,
  LIKE_CATEGORY_VIDEO_SUCCESS,
  LIKE_CATEGORY_VIDEO_FAILURE,
  GET_HOT_PUSH_VIDEO_REQUEST,
  GET_HOT_PUSH_VIDEO_SUCCESS,
  GET_HOT_PUSH_VIDEO_FAILURE,
  GET_REALTIME_SURGE_PUSH_VIDEO_REQUEST,
  GET_REALTIME_SURGE_PUSH_VIDEO_SUCCESS,
  GET_REALTIME_SURGE_PUSH_VIDEO_FAILURE,
  GET_SEASON_PUSH_VIDEO_REQUEST,
  GET_SEASON_PUSH_VIDEO_SUCCESS,
  GET_SEASON_PUSH_VIDEO_FAILURE,
  // GET_REALTIME_SURGE_LIKE_VIDEO_REQUEST,
  // GET_REALTIME_SURGE_LIKE_VIDEO_SUCCESS,
  // GET_REALTIME_SURGE_LIKE_VIDEO_FAILURE,
  // GET_REALTIME_SURGE_TALK_VIDEO_REQUEST,
  // GET_REALTIME_SURGE_TALK_VIDEO_SUCCESS,
  // GET_REALTIME_SURGE_TALK_VIDEO_FAILURE,
  // GET_HOT_LIKE_CATEGORY_VIDEO_REQUEST,
  // GET_HOT_LIKE_CATEGORY_VIDEO_SUCCESS,
  // GET_HOT_LIKE_CATEGORY_VIDEO_FAILURE,
  // GET_HOT_VIEW_CATEGORY_VIDEO_REQUEST,
  // GET_HOT_VIEW_CATEGORY_VIDEO_SUCCESS,
  // GET_HOT_VIEW_CATEGORY_VIDEO_FAILURE,
  // GET_SEASON_LIKE_CATEGORY_VIDEO_REQUEST,
  // GET_SEASON_LIKE_CATEGORY_VIDEO_SUCCESS,
  // GET_SEASON_LIKE_CATEGORY_VIDEO_FAILURE,
  // GET_SEASON_VIEW_CATEGORY_VIDEO_REQUEST,
  // GET_SEASON_VIEW_CATEGORY_VIDEO_SUCCESS,
  // GET_SEASON_VIEW_CATEGORY_VIDEO_FAILURE,
} from "store/reducers/categoryVideo";

import { videoApi, categoryApi } from "shared/api";
import { LIKE_VIDEO_SUCCESS } from "store/reducers/video";

function getCategoryPageApi(payload) {
  return categoryApi.get(`/${payload.category_no}/videos`, {
    params: {
      limit: payload.limit,
    },
    withCredentials: true,
  });
}

function getUsersCategoryPageApi(payload) {
  return categoryApi.get(`/${payload.category_no}/users`, {
    withCredentials: true,
  });
}

function* getCategoryPage(action) {
  try {
    const result = yield call(getCategoryPageApi, action.payload);
    const users = yield call(getUsersCategoryPageApi, action.payload);

    yield put({
      type: GET_CATEGORYPAGE_SUCCESS,
      data: { ...result.data, ...users.data },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_CATEGORYPAGE_FAILURE,
    });
  }
}

function* watchGetCategoryPage() {
  yield takeLatest(GET_CATEGORYPAGE_REQUEST, getCategoryPage);
}

// // 실시간 급상승 좋아요 비디오 더 불러오기
// function getMoreRealtimeSurgeLikeVideoApi(data) {
//   return videoApi.get("/more", {
//     params: Object.assign({}, data, { option: "realtimeSurgeLike" }),
//     withCredentials: true,
//   });
// }

// function* getMoreRealtimeSurgeLikeVideo(action) {
//   try {
//     const result = yield call(getMoreRealtimeSurgeLikeVideoApi, action.data);

//     yield put({
//       type: GET_REALTIME_SURGE_LIKE_VIDEO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_REALTIME_SURGE_LIKE_VIDEO_FAILURE,
//     });
//   }
// }

// function* watchGetMoreCategoryRealtimeSurgeLikeVideo() {
//   yield takeLatest(
//     GET_REALTIME_SURGE_LIKE_VIDEO_REQUEST,
//     getMoreRealtimeSurgeLikeVideo
//   );
// }

// // 실시간 급상승 채팅 비디오 더 불러오기
// function getMoreRealtimeSurgeTalkVideoApi(data) {
//   return videoApi.get("/more", {
//     params: Object.assign({}, data, { option: "realtimeSurgeTalk" }),
//     withCredentials: true,
//   });
// }

// function* getMoreRealtimeSurgeTalkVideo(action) {
//   try {
//     const result = yield call(getMoreRealtimeSurgeTalkVideoApi, action.data);

//     yield put({
//       type: GET_REALTIME_SURGE_TALK_VIDEO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_REALTIME_SURGE_TALK_VIDEO_FAILURE,
//     });
//   }
// }

// function* watchGetMoreCategoryRealtimeSurgeTalkVideo() {
//   yield takeLatest(
//     GET_REALTIME_SURGE_TALK_VIDEO_REQUEST,
//     getMoreRealtimeSurgeTalkVideo
//   );
// }

// // 핫 라이크 비디오 더 불러오기
// function getMoreHotLikeVideoApi(data) {
//   return videoApi.get("/more", {
//     params: Object.assign({}, data, { option: "hotLike" }),
//     withCredentials: true,
//   });
// }

// function* getMoreHotLikeVideo(action) {
//   try {
//     const result = yield call(getMoreHotLikeVideoApi, action.data);

//     yield put({
//       type: GET_HOT_LIKE_CATEGORY_VIDEO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_HOT_LIKE_CATEGORY_VIDEO_FAILURE,
//     });
//   }
// }

// function* watchGetMoreCategoryHotLikeVideo() {
//   yield takeLatest(GET_HOT_LIKE_CATEGORY_VIDEO_REQUEST, getMoreHotLikeVideo);
// }

// // 핫 비디오 더 불러오기
// function getMoreHotViewVideoApi(data) {
//   return videoApi.get("/more", {
//     params: Object.assign({}, data, { option: "hotView" }),
//     withCredentials: true,
//   });
// }

// function* getMoreHotViewVideo(action) {
//   try {
//     const result = yield call(getMoreHotViewVideoApi, action.data);

//     yield put({
//       type: GET_HOT_VIEW_CATEGORY_VIDEO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_HOT_VIEW_CATEGORY_VIDEO_FAILURE,
//     });
//   }
// }

// function* watchGetMoreCategoryHotViewVideo() {
//   yield takeLatest(GET_HOT_VIEW_CATEGORY_VIDEO_REQUEST, getMoreHotViewVideo);
// }

// // 핫톡 비디오 더 불러오기
// function getMoreHotTalkVideoApi(data) {
//   return videoApi.get("/more", {
//     params: Object.assign({}, data, { option: "hotTalk" }),
//     withCredentials: true,
//   });
// }

// function* getMoreHotTalkVideo(action) {
//   try {
//     const result = yield call(getMoreHotTalkVideoApi, action.data);

//     yield put({
//       type: GET_HOT_TALK_CATEGORY_VIDEO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_HOT_TALK_CATEGORY_VIDEO_FAILURE,
//     });
//   }
// }

// function* watchGetMoreCategoryHotTalkVideo() {
//   yield takeLatest(GET_HOT_TALK_CATEGORY_VIDEO_REQUEST, getMoreHotTalkVideo);
// }

// // 넘사벽 Like 비디오 더 불러오기
// function getMoreSeasonLikeVideoApi(data) {
//   return videoApi.get("/more", {
//     params: Object.assign({}, data, { option: "seasonLike" }),
//     withCredentials: true,
//   });
// }

// function* getMoreSeasonLikeVideo(action) {
//   try {
//     yield delay(50);
//     const result = yield call(getMoreSeasonLikeVideoApi, action.data);

//     yield put({
//       type: GET_SEASON_LIKE_CATEGORY_VIDEO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_SEASON_LIKE_CATEGORY_VIDEO_FAILURE,
//     });
//   }
// }

// function* watchGetMoreCategorySeasonLikeVideo() {
//   yield takeLatest(
//     GET_SEASON_LIKE_CATEGORY_VIDEO_REQUEST,
//     getMoreSeasonLikeVideo
//   );
// }

// // 넘사벽 View 비디오 더 불러오기
// function getMoreSeasonViewVideoApi(data) {
//   return videoApi.get("/more", {
//     params: Object.assign({}, data, { option: "seasonView" }),
//     withCredentials: true,
//   });
// }

// function* getMoreSeasonViewVideo(action) {
//   try {
//     const result = yield call(getMoreSeasonViewVideoApi, action.data);

//     yield put({
//       type: GET_SEASON_VIEW_CATEGORY_VIDEO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_SEASON_VIEW_CATEGORY_VIDEO_FAILURE,
//     });
//   }
// }

// function* watchGetMoreCategorySeasonViewVideo() {
//   yield takeLatest(
//     GET_SEASON_VIEW_CATEGORY_VIDEO_REQUEST,
//     getMoreSeasonViewVideo
//   );
// }

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
      type: GET_NEW_CATEGORY_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_NEW_CATEGORY_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreCategoryNewVideo() {
  yield takeLatest(GET_NEW_CATEGORY_VIDEO_REQUEST, getMoreNewVideo);
}

// 실시간 급상승 PUSH 비디오 더 불러오기
function getMoreRealtimeSurgePushVideoApi(data) {
  return videoApi.get("/more", {
    params: Object.assign({}, data, { option: "realtimeSurgePush" }),
    withCredentials: true,
  });
}

function* getMoreRealtimeSurgePushVideo(action) {
  try {
    const result = yield call(getMoreRealtimeSurgePushVideoApi, action.data);

    yield put({
      type: GET_REALTIME_SURGE_PUSH_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_REALTIME_SURGE_PUSH_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreCategoryRealtimeSurgePushVideo() {
  yield takeLatest(
    GET_REALTIME_SURGE_PUSH_VIDEO_REQUEST,
    getMoreRealtimeSurgePushVideo
  );
}

// 핫 PUSH 비디오 더 불러오기
function getMoreHotPushVideoApi(data) {
  return videoApi.get("/more", {
    params: Object.assign({}, data, { option: "hotPush" }),
    withCredentials: true,
  });
}

function* getMoreHotPushVideo(action) {
  try {
    const result = yield call(getMoreHotPushVideoApi, action.data);

    yield put({
      type: GET_HOT_PUSH_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_HOT_PUSH_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreCategoryHotPushVideo() {
  yield takeLatest(GET_HOT_PUSH_VIDEO_REQUEST, getMoreHotPushVideo);
}

// 누적 PUSH 비디오 더 불러오기
function getMoreSeasonPushVideoApi(data) {
  return videoApi.get("/more", {
    params: Object.assign({}, data, { option: "seasonPush" }),
    withCredentials: true,
  });
}

function* getMoreSeasonPushVideo(action) {
  try {
    const result = yield call(getMoreSeasonPushVideoApi, action.data);

    yield put({
      type: GET_SEASON_PUSH_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_SEASON_PUSH_VIDEO_FAILURE,
    });
  }
}

function* watchGetMoreCategorySeasonPushVideo() {
  yield takeLatest(GET_SEASON_PUSH_VIDEO_REQUEST, getMoreSeasonPushVideo);
}

// 좋아요 토글
function updateLikeCategoryVideoApi(payload) {
  console.log(payload);
  return payload.isLiked
    ? videoApi.post(
        "/like",
        {
          videoNo: payload.videoNo,
        },
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

function* updateLikeCategoryVideo(action) {
  try {
    yield call(updateLikeCategoryVideoApi, action.payload);

    yield put({
      type: LIKE_CATEGORY_VIDEO_SUCCESS,
      payload: action.payload,
    });

    yield put({
      type: LIKE_VIDEO_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LIKE_CATEGORY_VIDEO_FAILURE,
    });
  }
}

function* watchUpdateLikeVideo() {
  yield takeLatest(LIKE_CATEGORY_VIDEO_REQUEST, updateLikeCategoryVideo);
}

export default function* categoryVideoSage() {
  yield all([
    fork(watchGetCategoryPage),
    // fork(watchGetMoreCategoryRealtimeSurgeLikeVideo),
    // fork(watchGetMoreCategoryRealtimeSurgeTalkVideo),
    // fork(watchGetMoreCategoryHotLikeVideo),
    // fork(watchGetMoreCategoryHotTalkVideo),
    // fork(watchGetMoreCategoryHotViewVideo),
    // fork(watchGetMoreCategorySeasonLikeVideo),
    // fork(watchGetMoreCategorySeasonViewVideo),
    fork(watchGetMoreCategoryRealtimeSurgePushVideo),
    fork(watchGetMoreCategoryHotPushVideo),
    fork(watchGetMoreCategorySeasonPushVideo),
    fork(watchGetMoreCategoryNewVideo),
    fork(watchUpdateLikeVideo),
  ]);
}
