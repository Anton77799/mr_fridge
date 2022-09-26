/* eslint-disable import/prefer-default-export */
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { reducers } from './reducers';

const sagaMiddleware = createSagaMiddleware();

const composeEnchancers = composeWithDevTools(applyMiddleware(sagaMiddleware));

export const store = createStore(reducers, composeEnchancers);
