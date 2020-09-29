import { all, call } from "redux-saga/effects";
import user from "./user";
import common from "./common";
import video from "./video";

export default function* rootSaga() {
  yield all([call(user), call(common), call(video)]);
}
