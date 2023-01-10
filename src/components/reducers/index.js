import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';

const rootReducer = combineReducers({
    homeRedu: HomeReducer
});

export default rootReducer;