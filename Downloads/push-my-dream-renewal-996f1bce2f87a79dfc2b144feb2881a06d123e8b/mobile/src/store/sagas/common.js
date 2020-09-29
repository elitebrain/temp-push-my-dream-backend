import { eventChannel } from "redux-saga";
import {
  all,
  call,
  put,
  fork,
  takeLatest,
  cancelled,
  take,
} from "redux-saga/effects";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

import {
  LOAD_COMMON_DATA_REQUEST,
  LOAD_COMMON_DATA_SUCCESS,
  LOAD_COMMON_DATA_FAILURE,
  LOAD_ALL_PUSH_REQUEST,
  LOAD_ALL_PUSH_SUCCESS,
  LOAD_ALL_PUSH_FAILURE,
  SET_SSE_PUSH_REQUEST,
  SET_SSE_PUSH,
  SET_SSE_PUSH_FAILURE,
} from "store/reducers/common";

import { commonApi } from "shared/api";
import { getError } from "shared/functions";
import { ADMIN_SERVER } from "shared/constants/variables";

function loadCommonDataAPI() {
  return commonApi.get("/");
}

function* loadCommonData() {
  try {
    const result = yield call(loadCommonDataAPI);
    yield put({
      type: LOAD_COMMON_DATA_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_COMMON_DATA_FAILURE,
    });
  }
}

function* watchLoadCommonData() {
  yield takeLatest(LOAD_COMMON_DATA_REQUEST, loadCommonData);
}

function loadAllPushAPI() {
  return commonApi.get("/push/all");
}

function* loadAllPush() {
  try {
    const result = yield call(loadAllPushAPI);
    yield put({
      type: LOAD_ALL_PUSH_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_ALL_PUSH_FAILURE,
    });
  }
}

function* watchAllLoadPush() {
  yield takeLatest(LOAD_ALL_PUSH_REQUEST, loadAllPush);
}

/**
 * 푸쉬 sse
 */
function setSsePushEmitter() {
  const EventSource = NativeEventSource || EventSourcePolyfill;

  let emit;
  const channel = eventChannel((emitter) => {
    emit = emitter;

    return () => {};
  });

  const events = new EventSource(`${ADMIN_SERVER}/sse`);
  events.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    emit({ push: parsedData.push });
    console.log(event, parsedData);
  };

  return [channel];
}

function* setPushListener(payload) {
  try {
    while (true) {
      const data = yield take(payload);
      yield put({ type: SET_SSE_PUSH, data });
    }
  } finally {
    if (yield cancelled()) {
      payload.close();
    }
  }
}

function* setSsePush(action) {
  try {
    const [channel] = setSsePushEmitter(action);
    yield fork(setPushListener, channel);
  } catch (e) {
    console.error(e);
    yield put({
      type: SET_SSE_PUSH_FAILURE,
      data: getError(e),
    });
  }
}

function* watchSetSsePush() {
  yield takeLatest(SET_SSE_PUSH_REQUEST, setSsePush);
}

export default function* commonSaga() {
  yield all([
    fork(watchLoadCommonData),
    fork(watchAllLoadPush),
    fork(watchSetSsePush),
  ]);
}
