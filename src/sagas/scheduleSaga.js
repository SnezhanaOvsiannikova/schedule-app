import { put, call, takeLatest } from "redux-saga/effects";
import { fetchScheduleData } from "../api";
import {
  GET_SCHEDULE_DATA_REQUEST,
  GET_SCHEDULE_DATA_SUCCESS,
  GET_SCHEDULE_DATA_FAILED,
} from "../actions/actionsType";

function* getSchedule() {
  try {
    const scheduleData = yield call(fetchScheduleData);
    yield put({ type: GET_SCHEDULE_DATA_SUCCESS, payload: scheduleData });
  } catch (error) {
    yield put({ type: GET_SCHEDULE_DATA_FAILED, payload: error });
  }
}

export function* watchSchedule() {
  yield takeLatest(GET_SCHEDULE_DATA_REQUEST, getSchedule);
}
