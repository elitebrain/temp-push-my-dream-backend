import { combineReducers } from "redux";

import user from "./user";
import common from "./common";
import video from "./video";
import modal from "./modal";
import offset from "./offset";
import scroll from "./scroll";
import categoryVideo from "./categoryVideo";

const rootReducer = combineReducers({
  categoryVideo,
  scroll,
  user,
  common,
  video,
  modal,
  offset,
});

export default rootReducer;
