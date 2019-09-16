import BASE_URL from '../utils/axiosConfig';
import { GET_TRANSACTION_HISTORY, TRANSACTION_HISTORY_ERROR } from './type';

const { token } = JSON.parse(sessionStorage.data);
const transactionHistoryUrl = '/transactions';

// eslint-disable-next-line import/prefer-default-export
export const transactionHistory = accountnumber => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: `${accountnumber}${transactionHistoryUrl}`,
      method: 'get',
      headers: { Authorization: `${token}` },
    });

    return dispatch({
      type: GET_TRANSACTION_HISTORY,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: TRANSACTION_HISTORY_ERROR,
      message:
               error.response
               || 'Something went wrong wait for a while and try again.',
    });
  }
};
