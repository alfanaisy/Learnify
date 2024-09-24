import { legacy_createStore } from 'redux';
import loginReducer from '../loginReducer';

export const configureStore = () => {
  return legacy_createStore(loginReducer);
};
