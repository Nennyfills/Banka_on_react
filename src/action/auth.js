import BASE_URL from '../utils/axiosConfig';
import {
  LOGIN,
  SIGNUP,
  LOGIN_ERROR,
  SIGNUP_ERROR,

} from './type';

const signupUrl = '/auth/signup';
const loginUrl = '/auth/login';

export const login = userData => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: loginUrl,
      method: 'post',
      data: userData,
    });
    const {
      data: {
        data: { token, user },
      },
    } = response;
    const users = { ...user, token };
    sessionStorage.setItem('data', JSON.stringify(users));
    return dispatch({
      type: LOGIN,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: LOGIN_ERROR,
      message: error.response || 'Something went wrong.',
    });
  }
};
export const signup = userData => async (dispatch) => {
  try {
    const response = await BASE_URL({
      url: signupUrl,
      method: 'post',
      data: userData,
    });
    const {
      data: { data },
    } = response;
    sessionStorage.setItem('data', JSON.stringify(data));
    dispatch({
      type: SIGNUP,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_ERROR,
      message: error.response || 'Something went wrong.',
    });
  }
};
