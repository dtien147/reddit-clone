import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import App from './containers/App';
import AppReducer from './containers/App/reducer';
import './index.css';


const stateTransformer = (state) => {
  const newState = {};
  const keys = Object.keys(state);
  keys.forEach(key => {
    const value = state[key];
    if (Iterable.isIterable(value)) {
      newState[key] = value.toJS();
    } else {
      newState[key] = value;
    }
  });

  return newState;
};


const middlewares = [thunk, promiseMiddleware];

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const logger = createLogger({ stateTransformer });
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(
  combineReducers({ AppReducer })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
