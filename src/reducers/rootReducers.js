import { combineReducers } from 'redux';
import gameReducers from './gameReducers';
import loginReducers from './loginReducers';
import registerReducers from './registerReducers';

const rootReducers = combineReducers({
    gameReducers,
    loginReducers,
    registerReducers
});

export default rootReducers;