import {
  CREATE_BANK_ACCOUNT,
  CREATE_BANK_ACCOUNT_ERROR,
  GET_ACCOUNT_BY_OWNER_ID,
  GET_ACCOUNT_BY_OWNER_ID_ERROR,
  DELETE_ACCOUNTS,
  DELETE_ACCOUNTS_ERROR,
  ACTIVATE_AND_DEACTIVATE_ACCOUNTS,
  ACTIVATE_AND_DEACTIVATE_ACCOUNTS_ERROR,
  NEW_EMPLOYEE,
  NEW_EMPLOYEE_ERROR,
  DEBIT,
  DEBIT_ERROR,
  CREDIT,
  CREDIT_ERROR,
} from '../action/type';

const initialState = {
  items: [],
  item: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BANK_ACCOUNT:
      return {
        ...state,
        items: action.payload,
      };
    case CREATE_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    case GET_ACCOUNT_BY_OWNER_ID:
      return {
        ...state,
        items: action.payload,
      };
    case GET_ACCOUNT_BY_OWNER_ID_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    case DELETE_ACCOUNTS:
      return {
        ...state,
        items: action.payload,
      };
    case DELETE_ACCOUNTS_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    case ACTIVATE_AND_DEACTIVATE_ACCOUNTS:
      return {
        ...state,
        items: action.payload,
      };
    case ACTIVATE_AND_DEACTIVATE_ACCOUNTS_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    case NEW_EMPLOYEE:
      return {
        ...state,
        items: action.payload,
      };
    case NEW_EMPLOYEE_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    case DEBIT:
      return {
        ...state,
        items: action.payload,
      };
    case DEBIT_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    case CREDIT:
      return {
        ...state,
        items: action.payload,
      };
    case CREDIT_ERROR:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
