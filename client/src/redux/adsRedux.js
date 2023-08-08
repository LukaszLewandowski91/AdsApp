import axios from "axios";
import { API_URL } from "../config";
/* SELECTORS */
export const getAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);
/* ACTIONS */
const reducerName = "ads";
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOAD_ADS = createActionName("LOAD_ADS");
const ADD_AD = createActionName("ADD_AD");
const REMOVE_AD = createActionName("REMOVE_AD");
const EDIT_AD = createActionName("EDIT_AD");

export const loadAds = (payload) => ({ type: LOAD_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
/* THUNKS */

export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(loadAds(""));
    try {
      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loadSearchedAdsRequest = (searchPhrase) => {
  return async (dispatch) => {
    dispatch(loadAds(""));
    try {
      let res = await axios.get(`${API_URL}/ads/search/${searchPhrase}`, {
        withCredentials: true,
      });
      dispatch(loadAds(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addAdRequest = (ad) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API_URL}/ads`, ad, {
        withCredentials: true,
      });
      dispatch(loadAdsRequest());
    } catch (e) {
      console.log(e);
    }
  };
};

export const editAdRequest = (ad, id) => {
  return async (dispatch) => {
    try {
      await axios.put(`${API_URL}/ads/${id}`, ad, {
        withCredentials: true,
      });
      dispatch(loadAdsRequest());
    } catch (e) {
      console.log(e);
    }
  };
};

export const removeAdRequest = (id) => {
  return async (dispatch) => {
    try {
      await axios
        .delete(`${API_URL}/ads/${id}`, { withCredentials: true })
        .then(() => dispatch(removeAd(id)));
    } catch (e) {
      console.log(e);
    }
  };
};

/* REDUCER */

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_AD:
      return [...statePart, { ...action.payload }];
    case LOAD_ADS:
      return [...action.payload];
    case REMOVE_AD:
      return [...statePart.filter((ad) => ad._id !== action.payload)];
    case EDIT_AD:
      return statePart.map((ad) =>
        ad._id === action.payload._id ? { ...ad, ...action.payload } : ad
      );
    default:
      return statePart;
  }
};

export default adsReducer;
