import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { todoReducer } from "./todos/reducers";
import { authReducer } from "./auth/reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  todoStore: todoReducer,
  authStore: authReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
