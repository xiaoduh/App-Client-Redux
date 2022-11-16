import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import jobReducer from "./job.reducer";
import companyReducer from "./company.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  jobReducer,
  companyReducer,
});
