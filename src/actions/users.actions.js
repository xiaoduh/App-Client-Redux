import axios from "axios";

export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export function updateUser(
  userId,
  identifiant,
  nom,
  prenom,
  email,
  fonction,
  salaire
) {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/edit-user/` + userId,
      data: {
        identifiant: identifiant,
        nom: nom,
        prenom: prenom,
        email: email,
        fonction: fonction,
        salary: salaire,
      },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: {
            userId,
            identifiant,
            nom,
            prenom,
            email,
            fonction,
            salaire,
          },
        });
      })
      .catch((err) => console.log(err));
  };
}
