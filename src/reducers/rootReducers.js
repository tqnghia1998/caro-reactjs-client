import { combineReducers } from 'redux';
import gameReducers from './gameReducers';
import loginReducers from './loginReducers';
import registerReducers from './registerReducers';
import infoReducers from './infoReducers';
import roomReducers from './roomReducers';

const rootReducers = combineReducers({
    gameReducers,
    loginReducers,
    registerReducers,
    infoReducers,
    roomReducers
});

export default rootReducers;