import { all, fork } from "redux-saga/effects";
import { watchSchedule } from "./scheduleSaga";

export default function* rootSaga() {
  yield all([fork(watchSchedule)]);
}
