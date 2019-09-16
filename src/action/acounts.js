import BASE_URL from '../utils/axiosConfig';
import {
  CREATE_BANK_ACCOUNT,
  CREATE_BANK_ACCOUNT_ERROR,
  GET_ACCOUNT_BY_OWNER_ID,
  GET_ACCOUNT_BY_OWNER_ID_ERROR,
  GET_ALL_ACCOUNTS,
  GET_ALL_ACCOUNTS_ERROR,
  DELETE_ACCOUNTS,
  DELETE_ACCOUNTS_ERROR,
  ACTIVATE_AND_DEACTIVATE_ACCOUNTS,
  ACTIVATE_AND_DEACTIVATE_ACCOUNTS_ERROR,
  NEW_EMPLOYEE,
  NEW_EMPLOYEE_ERROR,
  DEBIT,
  CREDIT,
  DEBIT_ERROR,
  CREDIT_ERROR,
} from './type';

const createUrl = '/accounts';
const accountByOwnerIdUrl = '/user/accounts';
const getAllAccountsUrl = '/accounts';
const deleteAccountUrl = '/accounts';
const createNewEmployeeURL = '/auth/portal';
const { token } = JSON.parse(sessionStorage.data);
const { id } = JSON.parse(sessionStorage.data);

export const createBankAccount = userData => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: createUrl,
      method: 'post',
      headers: { Authorization: `${token}` },
      data: userData,
    });

    return dispatch({
      type: CREATE_BANK_ACCOUNT,
      payload: response.data.message,
    });
  } catch (error) {
    return dispatch({
      type: CREATE_BANK_ACCOUNT_ERROR,
      message:
        error.response.data.message.messag
        || 'Something went wrong wait for a while and try again.',
    });
  }
};

export const getAccountByOwnerId = () => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: `${accountByOwnerIdUrl}/${id}`,
      method: 'get',
      headers: { Authorization: `${token}` },
    });

    return dispatch({
      type: GET_ACCOUNT_BY_OWNER_ID,
      payload: response.data.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_ACCOUNT_BY_OWNER_ID_ERROR,
      message:
        error.response
        || 'Something went wrong wait for a while and try again.',
    });
  }
};

export const getAllAccounts = () => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: `${getAllAccountsUrl}`,
      method: 'get',
      headers: { Authorization: `${token}` },
    });

    return dispatch({
      type: GET_ALL_ACCOUNTS,
      payload: response.data.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_ALL_ACCOUNTS_ERROR,
      message:
        error.response
        || 'Something went wrong wait for a while and try again.',
    });
  }
};

export const deleteAccounts = accountnumber => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: `${deleteAccountUrl}/${accountnumber}`,
      method: 'delete',
      headers: { Authorization: `${token}` },
    });

    return dispatch({
      type: DELETE_ACCOUNTS,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: DELETE_ACCOUNTS_ERROR,
      message:
        error.response
        || 'Something went wrong wait for a while and try again.',
    });
  }
};

export const activateAndDeactivateAccounts = accountnumber => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: `/${accountnumber}`,
      method: 'patch',
      headers: { Authorization: `${token}` },
    });
    return dispatch({
      type: ACTIVATE_AND_DEACTIVATE_ACCOUNTS,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: ACTIVATE_AND_DEACTIVATE_ACCOUNTS_ERROR,
      message:
        error.response
        || 'Something went wrong wait for a while and try again.',
    });
  }
};

export const newEmployee = userData => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: createNewEmployeeURL,
      method: 'post',
      headers: { Authorization: `${token}` },
      data: userData,
    });

    return dispatch({
      type: NEW_EMPLOYEE,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: NEW_EMPLOYEE_ERROR,
      message:
        error.response.data.message
        || 'Something went wrong wait for a while and try again.',
    });
  }
};

export const creditAccount = (data, accountnumber) => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: `/transactions/${accountnumber}/credit`,
      method: 'post',
      headers: { Authorization: `${token}` },
      data,
    });

    return dispatch({
      type: CREDIT,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: CREDIT_ERROR,
      message:
               error.response.data.message
               || 'Something went wrong wait for a while and try again.',
    });
  }
};

export const debitAccount = (data, accountnumber) => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: `/transactions/${accountnumber}/debit`,
      method: 'post',
      headers: { Authorization: `${token}` },
      data
    });

    return dispatch({
      type: DEBIT,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: DEBIT_ERROR,
      message:
        error.response.data.message
        || 'Something went wrong wait for a while and try again.',
    });
  }
};
