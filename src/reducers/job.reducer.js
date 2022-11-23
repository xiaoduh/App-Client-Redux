import { GET_JOBS, LIKE_JOB, UNLIKE_JOB } from "../actions/job.actions";

const initialState = {};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return action.payload;

    case LIKE_JOB:
      return state.map((job) => {
        if (job._id === action.payload.jobId) {
          return {
            ...job,
            likers: [action.payload.userId, ...job.likers],
          };
        }
        return job;
      });

    case UNLIKE_JOB:
      return state.map((job) => {
        if (job._id === action.payload.jobId) {
          return {
            ...job,
            likers: job.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return job;
      });

    default:
      return state;
  }
}
