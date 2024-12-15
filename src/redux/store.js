import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const combineReducer = combineReducers({
});

export const store = legacy_createStore(combineReducer, applyMiddleware(thunk));
