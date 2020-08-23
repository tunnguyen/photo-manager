import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleWares = [thunk];
const initialState = {};
const applyMW = process.env.NODE_ENV !== 'production' ?
  compose(
    applyMiddleware(...middleWares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : applyMiddleware(...middleWares);

export default createStore(
  rootReducer,
  initialState,
  applyMW
);