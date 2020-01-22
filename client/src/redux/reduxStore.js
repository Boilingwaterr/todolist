import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authReducer';
import todoListReducer from './todoListReducer';

let reducers = combineReducers({
    authData: authReducer,
    todoListData: todoListReducer,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;