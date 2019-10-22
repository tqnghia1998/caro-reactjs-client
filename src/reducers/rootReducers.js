import { combineReducers } from 'redux';
import gameReducers from './gameReducers';
import loginReducers from './loginReducers';
import registerReducers from './registerReducers';
import infoReducers from './infoReducers';

const rootReducers = combineReducers({
    gameReducers,
    loginReducers,
    registerReducers,
    infoReducers
});

export default rootReducers;