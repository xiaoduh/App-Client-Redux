import axios from "axios";

// company
export const GET_COMPANY = "GET_COMPANY";
export const UPDATE_COMPANY = "UPDATE_COMPANY";
export const ADDNEW_COMPANY = "ADDNEW_COMPANY";
export const DELETE_COMPANY = "DELETE_COMPANY";

export const getCompany = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/company/`)
      .then((res) => {
        dispatch({ type: GET_COMPANY, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateCompany = (
  companyId,
  nom,
  secteur,
  localisation,
  description,
  video
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/company/` + companyId,
      data: {
        nom,
        secteur,
        localisation,
        description,
        video,
      },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_COMPANY,
          payload: {
            companyId,
            nom,
            secteur,
            localisation,
            description,
            video,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addNewCompany = (
  nom,
  secteur,
  localisation,
  description,
  video
) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/company/`,
      data: {
        nom,
        secteur,
        localisation,
        description,
        video,
      },
    })
      .then((res) => {
        dispatch({
          type: ADDNEW_COMPANY,
          payload: {
            nom,
            secteur,
            localisation,
            description,
            video,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export function deleteCompany(companyId) {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/company/${companyId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_COMPANY, payload: { companyId } });
      })
      .catch((err) => console.log(err));
  };
}
