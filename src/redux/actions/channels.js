import * as actionTypes from "./actionTypes";
import { resetErrors } from "./errors";

import axios from "axios";

export const setChLoading = () => ({
  type: actionTypes.SET_CHANNELS_LOADING
});

export const fetchChannels = () => {
  return async dispatch => {
    try {
      dispatch(setChLoading());
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      dispatch({ type: actionTypes.FETCH_CHANNELS, payload: channels });
    } catch (err) {
      console.error(err);
    }
  };
};

export const filterChannels = query => {
  return {
    type: actionTypes.FILTER_CHANNELS,
    payload: query
  };
};

// use it to post channel

// //POST THE Channel TO https://api-chatr.herokuapp.com/channels/create/
export const postChannel = (newChannelName, resetForm, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        newChannelName
      );
      const channel = res.data;
      dispatch(resetErrors());
      dispatch({
        type: actionTypes.POST_CHANNEL,
        payload: channel
      });
      //check the next line

      dispatch(filterChannels(""));

      resetForm();
      history.replace(`/channels/${channel.id}`); // NOTE!!! this must redirect to the new channel url not home
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};
