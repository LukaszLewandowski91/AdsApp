import axios from "axios";
import { API_URL } from "../config";
/* SELECTORS */
export const getAds = ({ ads }) => ads.data;

/* ACTIONS */
const reducerName = "ads";
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOAD_ADS = createActionName("LOAD_ADS");
const ADD_AD = createActionName("ADD_AD");

export const loadAds = (payload) => ({ type: LOAD_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });

/* THUNKS */

export const loadAdsRequest = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${API_URL}api/ads`);
      dispatch(loadAds(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addAdRequest = (ad) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${API_URL}api/ads`, ad);
      dispatch(addAd(res));
      console.log("res", res);
    } catch (e) {
      console.log(e);
    }
  };
};

/* INITIAL STATE */

const initialState = {
  ads: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };

    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    default:
      return statePart;
  }
}
