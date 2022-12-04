import {
  ADDNEW_COMPANY,
  GET_COMPANY,
  UPDATE_COMPANY,
} from "../actions/company.actions";

const initialState = {};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY:
      return action.payload;

    case ADDNEW_COMPANY:
      return state;

    case UPDATE_COMPANY:
      return state.map((company) => {
        if (company._id === action.payload.companyId) {
          return {
            ...company,
            nom: action.payload.nom,
            secteur: action.payload.secteur,
            localisation: action.payload.localisation,
            description: action.payload.description,
            video: action.payload.video,
          };
        } else return company;
      });

    default:
      return state;
  }
}
