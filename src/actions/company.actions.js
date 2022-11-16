import axios from "axios";

// company
export const GET_COMPANY = "GET_COMPANY";

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
