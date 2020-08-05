import { createStore, combineReducers } from 'redux';
import foodReducer from '../reducers/LoginRecer';

const rootReducer = combineReducers({
  foodReducer: foodReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;