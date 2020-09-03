import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleWares = [thunk];
const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleWares)
);