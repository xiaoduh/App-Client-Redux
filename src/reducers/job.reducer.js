import {
  DELETE_JOB,
  GET_JOBS,
  LIKE_JOB,
  UNLIKE_JOB,
  UPDATE_JOB,
} from "../actions/job.actions";

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

    case UPDATE_JOB:
      return state.map((job) => {
        if (job._id === action.payload.jobId) {
          return {
            ...job,
            titre: action.payload.title,
            entreprise: action.payload.company,
            service: action.payload.service,
            projet: action.payload.projet,
            description: action.payload.desc,
            profil: action.payload.profil,
            tjm: action.payload.tjm,
          };
        } else return job;
      });

    case DELETE_JOB:
      return state.filter((job) => job._id !== action.payload.jobId);

    default:
      return state;
  }
}
