//Config for redux globel store
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './combineReducers';
import {persistStore, persistReducer} from 'redux-persist';
import Storage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initialState = {};
const persistConfig = {
  key: 'root',
  storage: Storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['temp'],
};

const middleware = compose(applyMiddleware(thunk));
const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, initialState, middleware);
export const persistor = persistStore(store);
