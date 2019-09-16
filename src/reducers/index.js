import { combineReducers } from 'redux';
import authReducers from './auth';
import accountReducers from './account';
import transactionReducers from './transaction';


export default combineReducers({
  auth: authReducers,
  account: accountReducers,
  transaction: transactionReducers,
});
