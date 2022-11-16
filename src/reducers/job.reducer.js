import { GET_JOBS, LIKE_JOB, UNLIKE_JOB } from "../actions/job.actions";

const initialState = {};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return action.payload;

    case LIKE_JOB:
      return {
        ...state,
        likers: action.payload,
      };

    case UNLIKE_JOB:
      return {
        ...state,
        likers: action.payload,
      };

    default:
      return state;
  }
}
