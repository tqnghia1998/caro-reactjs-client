import { combineReducers } from 'redux';
import gameReducers from './gameReducers';
import loginReducers from './loginReducers';

const rootReducers = combineReducers({
    gameReducers,
    loginReducers
});

export default rootReducers;