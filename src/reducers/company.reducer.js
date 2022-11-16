import { GET_COMPANY } from "../actions/company.actions";

const initialState = {};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY:
      return action.payload;

    default:
      return state;
  }
}
