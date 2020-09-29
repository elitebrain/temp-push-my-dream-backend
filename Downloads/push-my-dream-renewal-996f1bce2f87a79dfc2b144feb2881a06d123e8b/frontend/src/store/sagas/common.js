import {
  all,
  call,
  put,
  fork,
  takeLatest,
  delay,
  takeEvery
} from "redux-saga/effects";

import {
  LOAD_COMMON_DATA_REQUEST,
  LOAD_COMMON_DATA_SUCCESS,
  LOAD_COMMON_DATA_FAILURE
} from "store/reducers/common";

import { commonApi } from "shared/api";

function loadCommonDataAPI() {
  return commonApi.get("/", { withCredentials: true });
}

function* loadCommonData() {
  try {
    const result = yield call(loadCommonDataAPI);
    yield put({
      type: LOAD_COMMON_DATA_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_COMMON_DATA_FAILURE
    });
  }
}

function* watchLoadCommonData() {
  yield takeLatest(LOAD_COMMON_DATA_REQUEST, loadCommonData);
}

export default function* commonSaga() {
  yield all([fork(watchLoadCommonData)]);
}
