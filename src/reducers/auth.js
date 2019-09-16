import {
  LOGIN,
  SIGNUP,
  LOGIN_ERROR,
  SIGNUP_ERROR,
} from '../action/type';

const initialState = {
  items: [],
  item: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        items: action.payload,
      };
    case SIGNUP:
      return {
        ...state,
        items: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        items: action.message,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        items: action.message,
      };
    default:
      return state;
  }
};
