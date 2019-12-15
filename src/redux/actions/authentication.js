import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { setErrors, resetErrors } from "./errors";
import { fetchChannels } from "./channels";

const setCurrentUser = token => {
  return async dispatch => {
    let user;
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      user = jwt_decode(token);
      dispatch(fetchChannels());
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
      user = null;
    }

    dispatch({
      type: actionTypes.SET_CURRENT_USER,
      payload: user
    });
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
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: error.response.data
      });
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
      //another approach for setting the errors
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
