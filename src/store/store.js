import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import usersReducer from './reducers/usersReducers/usersReducer';
import authReducer from './reducers/authReducer/authReducer';
import profileReducer from './reducers/profileReducer/profileReducer';

const rootReducer = combineReducers({
	usersData: usersReducer,
	auth: authReducer,
	profile: profileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
