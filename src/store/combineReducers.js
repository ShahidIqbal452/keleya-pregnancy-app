import {combineReducers} from 'redux';
import appReducer from './reducers/app';

export default combineReducers({
  app: appReducer,
});
