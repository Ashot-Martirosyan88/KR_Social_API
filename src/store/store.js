import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import usersReducer from './reducers/usersReducers/usersReducer';

const rootReducer = combineReducers({
	usersData: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
