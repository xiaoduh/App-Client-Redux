import axios from "axios";

// jobs
export const GET_JOBS = "GET_JOBS";
export const LIKE_JOB = "LIKE_JOB";
export const UNLIKE_JOB = "UNLIKE_JOB";
export const UPDATE_JOB = "UPDATE_JOB";
export const ADD_JOB = "ADD_JOB";
export const DELETE_JOB = "DELETE_JOB";

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

export const updateJob = (jobId, title, service, projet, desc, profil, tjm) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/job/` + jobId,
      data: {
        titre: title,
        service: service,
        projet: projet,
        description: desc,
        profil: profil,
        tjm: tjm,
      },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_JOB,
          payload: {
            jobId,
            title,
            service,
            projet,
            desc,
            profil,
            tjm,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addJob = (
  titre,
  companyId,
  service,
  projet,
  description,
  competence,
  profil,
  tjm
) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/job/`,
      data: {
        titre,
        companyId,
        service,
        projet,
        description,
        competence,
        profil,
        tjm,
      },
    });
  };
};

export function deleteJob(jobId) {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/job/${jobId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_JOB, payload: { jobId } });
      })
      .catch((err) => console.log(err));
  };
}
