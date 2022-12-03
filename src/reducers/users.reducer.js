import { GET_USERS, UPDATE_USER } from "../actions/users.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;

    case UPDATE_USER:
      return state.map((user) => {
        if (user._id === action.payload.userId) {
          return {
            ...user,
            identifiant: action.payload.identifiant,
            nom: action.payload.nom,
            prenom: action.payload.prenom,
            email: action.payload.email,
            fonction: action.payload.fonction,
            salary: action.payload.salaire,
          };
        } else return user;
      });

    default:
      return state;
  }
}
