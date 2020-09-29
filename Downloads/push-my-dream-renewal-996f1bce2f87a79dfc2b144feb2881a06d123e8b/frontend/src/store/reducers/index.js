import { combineReducers } from "redux";

import user from "./user";
import common from "./common";
import video from "./video";
import modal from "./modal";
import offset from "./offset";

const rootReducer = combineReducers({
  user,
  common,
  video,
  modal,
  offset
});

export default rootReducer;
