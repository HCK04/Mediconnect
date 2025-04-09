import { FETCH_USERS } from "../actions/FetchUserAction";

const initialState = {
  AllUsers: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        AllUsers: action.payload,
      };
    default:
      return state;
  }
};

export default AdminReducerLaravel;