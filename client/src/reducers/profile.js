import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload, profile: null };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };
    case GET_PROFILES:
      return { ...state, loading: false, profiles: payload };
    case GET_REPOS:
      return { ...state, loading: false, repos: payload };
    default:
      return state;
  }
};
