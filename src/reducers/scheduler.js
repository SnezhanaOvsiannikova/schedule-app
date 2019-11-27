import {
  GET_SCHEDULE_DATA_SUCCESS,
  GET_SCHEDULE_DATA_FAILED
} from "../actions/actionsType";

const initialState = {
  data: {},
  error: null
};

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case GET_SCHEDULE_DATA_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default schedule;
