import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors, resetErrors } from "./errors";

const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);
    //Fetching channels should've happened here after setting the headers of the axios requests
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }

  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "https://api-chatr.herokuapp.com/login/",
        userData
      );
      const user = response.data;
      dispatch(setCurrentUser(user.token));
      dispatch(resetErrors());

      history.replace("/");
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: error.response.data
      });
      // console.log("An error occurred.", error);
      // dispatch(setErrors(error.response.data));
      // console.error(error.response.data);
      // //must use setErrors
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      dispatch(resetErrors());

      history.replace("/");
    } catch (error) {
      //another possible solution for catching errors
      console.error(error.response.data);

      dispatch(setErrors(error.response.data));
    }
  };
};

export const logout = () => setCurrentUser();

export const checkForExpiredToken = () => {
  // Check for token expiration
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;

    // Decode token and get user info
    user = jwt_decode(token);

    // Check token expiration
    if (user.exp >= currentTimeInSeconds) {
      // Set user
      return setCurrentUser(token);
    }
  }
  return logout();
};
