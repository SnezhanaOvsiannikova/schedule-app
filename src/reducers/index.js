import { combineReducers } from "redux";
import schedulerReducer from "./scheduler";

export default combineReducers({
  scheduler: schedulerReducer
});
