import { createStore, combineReducers } from 'redux';
import SetUserData from './reducers/SetUserData.js';

const rootReducer = combineReducers({ 
    userData: SetUserData
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;