import axios from "axios";

// jobs
export const GET_JOBS = "GET_JOBS";
export const LIKE_JOB = "LIKE_JOB";
export const UNLIKE_JOB = "UNLIKE_JOB";

export const getJobs = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/job/`)
      .then((res) => {
        dispatch({ type: GET_JOBS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const likeJob = (jobId, idToLike) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/job/like-job/` + jobId,
      data: { idToLike },
    })
      .then((res) => {
        dispatch({ type: LIKE_JOB, payload: { idToLike } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikeJob = (jobId, idToUnLike) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/job/unlike-job/` + jobId,
      data: { idToUnLike },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_JOB, payload: { idToUnLike } });
      })
      .catch((err) => console.log(err));
  };
};
