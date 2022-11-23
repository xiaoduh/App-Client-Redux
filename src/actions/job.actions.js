import axios from "axios";

// jobs
export const GET_JOBS = "GET_JOBS";
export const LIKE_JOB = "LIKE_JOB";
export const UNLIKE_JOB = "UNLIKE_JOB";

export const getJobs = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/job/`)
      .then((res) => {
        //methode slice pour manipuler des données d'1 point de départ à un point d'arrivé
        const array = res.data.slice(0, num);
        dispatch({ type: GET_JOBS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const likeJob = (jobId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/job/like-job/` + jobId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_JOB, payload: { jobId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikeJob = (jobId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/job/unlike-job/` + jobId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_JOB, payload: { jobId, userId } });
      })
      .catch((err) => console.log(err));
  };
};
