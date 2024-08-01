import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import channelReducer from "./channel";
import videoReducer from './video'
import commentReducer from "./comment";
import historyreducer from "./history";
import likedvideoreducer from "./likedvideo";
import watchlaterreducer from "./watchlater";

export default combineReducers({
     authReducer,
     currentUserReducer,
     videoReducer,
     commentReducer,
     historyreducer,
     likedvideoreducer,
     watchlaterreducer,
     channelReducer
});
