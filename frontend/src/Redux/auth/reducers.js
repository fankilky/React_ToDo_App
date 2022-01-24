import { LOGIN_USER, LOGOUT_USER } from "./actions";

const initialState = {
  auth: false || localStorage.getItem("LoggedInToken") != null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { auth: true });
    case LOGOUT_USER:
      return Object.assign({}, state, { auth: false });
    default:
      return state;
  }
}
