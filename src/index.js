import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

//redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import todoListReducer from './store/reducers/todoList';
import authReducer from './store/reducers/auth';

const composeEnhancers =
  process.env.NODE_ENN === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  todoList: todoListReducer,
  auth: authReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
