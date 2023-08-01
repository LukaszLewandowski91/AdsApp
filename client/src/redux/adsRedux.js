import axios from "axios";
import { API_URL } from "../config";
/* SELECTORS */
export const getAds = ({ ads }) => ads.data;
export const getRequest = ({ ads }) => ads.request;

/* ACTIONS */
const reducerName = "ads";
const createActionName = (name) => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

const LOAD_ADS = createActionName("LOAD_ADS");
const ADD_AD = createActionName("ADD_AD");

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ payload, type: ADD_AD });

/* THUNKS */

export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: "LOAD_ADS" }));
    try {
      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: "LOAD_ADS" }));
    } catch (e) {
      dispatch(errorRequest({ name: "LOAD_ADS", error: e.message }));
    }
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */
