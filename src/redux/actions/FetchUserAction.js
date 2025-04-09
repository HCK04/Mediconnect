import axios from "axios";

// Action types
export const FETCH_USERS = "FETCH_USERS";

// Action to fetch users
export const fetchUsersAction = (users) => {
  return {
    type: FETCH_USERS,
    payload: users,
  };
};

// Action to fetch users from API
export const fetchUsersFromAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      dispatch(fetchUsersAction(response.data));
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
};
