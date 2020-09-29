import {
  all,
  call,
  put,
  fork,
  delay,
  takeLatest,
  takeEvery,
  debounce,
} from "redux-saga/effects";

import { userApi } from "shared/api";

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LEAVE_USER_REQUEST,
  LEAVE_USER_SUCCESS,
  LEAVE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  APPLY_CONTEST_REQUEST,
  APPLY_CONTEST_SUCCESS,
  APPLY_CONTEST_FAILURE,
  ADD_FOLLOW_REQUEST,
  ADD_FOLLOW_SUCCESS,
  ADD_FOLLOW_FAILURE,
  DELETE_FOLLOW_REQUEST,
  DELETE_FOLLOW_SUCCESS,
  DELETE_FOLLOW_FAILURE,
} from "store/reducers/user";

function logInAPI(data) {
  console.log(userApi);
  return userApi.post("/mobile/login", data, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);

    yield put({
      type: LOG_IN_SUCCESS,
      data: { ...result.data.user },
    });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
    });
    console.log(e);
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function loadUserAPI() {
  return userApi.get("/", {
    withCredentials: true,
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);

    yield put({
      type: LOAD_USER_SUCCESS,
      data: { ...result.data.user },
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function logOutAPI() {
  return userApi.get("/logout", {
    withCredentials: true,
  });
}

function* logOut() {
  try {
    yield call(logOutAPI);
    // yield put({
    //   type: LOG_OUT_SUCCESS,
    // });

    window.location.href = "/";
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function leaveUserAPI() {
  return userApi.delete("/", {
    withCredentials: true,
  });
}

function* leaveUser() {
  try {
    yield call(leaveUserAPI);
    window.location.replace("/login");
  } catch (e) {
    yield put({
      type: LEAVE_USER_FAILURE,
    });
  }
}

function* watchLeaveUser() {
  yield takeLatest(LEAVE_USER_REQUEST, leaveUser);
}

function updateUserAPI(data) {
  return userApi.put("/", data, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

function* updateUser(action) {
  try {
    const result = yield call(updateUserAPI, action.data);
    action.success();
    yield put({
      type: UPDATE_USER_SUCCESS,
      data: result.data.user,
    });
  } catch (e) {
    action.failure(e);
    yield put({
      type: UPDATE_USER_FAILURE,
    });
  }
}

function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER_REQUEST, updateUser);
}

function applyContestAPI(data) {
  return userApi.post("/pre/reservation", data, {
    withCredentials: true,
  });
}

function* applyContest(action) {
  try {
    const result = yield call(applyContestAPI, action.data);
    yield delay(1000);
    action.success();
    yield put({
      type: APPLY_CONTEST_SUCCESS,
      data: result.data.ContestLog,
    });
  } catch (e) {
    yield put({
      type: APPLY_CONTEST_FAILURE,
    });
    console.log(e.response.data);
    action.failure(e);
  }
}

function* watchApplyContest() {
  yield takeLatest(APPLY_CONTEST_REQUEST, applyContest);
}

// 팔로우 추가
function addFollowAPI(data) {
  return userApi.post("/follow", data, {
    withCredentials: true,
  });
}

function* addFollow(action) {
  try {
    yield delay(200);
    yield call(addFollowAPI, action.data);
    yield put({
      type: ADD_FOLLOW_SUCCESS,
      data: action.data.targetNo,
    });
    action.success();
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_FOLLOW_FAILURE,
    });
  }
}

function* watchAddFollow() {
  yield takeLatest(ADD_FOLLOW_REQUEST, addFollow);
}

// 팔로우 삭제
function deleteFollowAPI(data) {
  return userApi.delete(`/follow?targetNo=${data.targetNo}`, {
    withCredentials: true,
  });
}

function* deleteFollow(action) {
  try {
    yield call(deleteFollowAPI, action.data);
    yield put({
      type: DELETE_FOLLOW_SUCCESS,
      data: action.data.targetNo,
    });
    action.success();
  } catch (e) {
    yield put({
      type: DELETE_FOLLOW_FAILURE,
    });
  }
}

function* watchDeleteFollow() {
  yield takeLatest(DELETE_FOLLOW_REQUEST, deleteFollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLoadUser),
    fork(watchLogOut),
    fork(watchLeaveUser),
    fork(watchUpdateUser),
    fork(watchApplyContest),
    fork(watchAddFollow),
    fork(watchDeleteFollow),
  ]);
}
