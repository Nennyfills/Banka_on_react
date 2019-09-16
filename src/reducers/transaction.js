import {
  GET_TRANSACTION_HISTORY,
  TRANSACTION_HISTORY_ERROR,
} from '../action/type';

const initialState = {
  items: [],
  item: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_HISTORY:
      return {
        ...state,
        items: action.payload,
      };
    case TRANSACTION_HISTORY_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
