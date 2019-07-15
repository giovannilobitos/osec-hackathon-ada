import { ActionType } from 'redux-promise-middleware';

const defaultData = {
  isAuthenticated: null,
  mainUser: null,
};

export default function coreReducer(state = defaultData, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        mainUser: { ...(action.mainUser || {}) },
        forceReload: false,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        mainUser: undefined,
      };
    }

    case `USERS_PATCH_${ActionType.Fulfilled}`: {
      if (state.mainUser && state.mainUser._id && action.payload && action.payload._id === state.mainUser._id) {
        return {
          ...state,
          mainUser: { ...(state.mainUser || {}), ...action.payload },
        };
      }

      break;
    }
  }

  return state;
}
