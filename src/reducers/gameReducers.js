import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

// Initial state of game
const initialState = {
    history: [{
        x: null,
        y: null,
        squares: Array(Config.brdSize).fill(null).map(() => { return Array(Config.brdSize).fill(null)})
    }],
    nextMove: Config.xPlayer,
    stepNumber: 0,
    winCells: null,
    accendingMode: false
};

export default function handle(state = initialState, action) {
    switch (action.type) {
        case ActionType.CLICK:
            return {
                ...state,
                history: action.history,
                stepNumber: action.history.length - 1,
                nextMove: action.nextMove,
                winCells: action.winCells
            }
        
        case ActionType.CHANG_SORT:
            return {
                ...state,
                accendingMode: !state.accendingMode
            };
        
        case ActionType.JUMP_TO:
            return {
                ...state,
                stepNumber: action.stepNumber,
                nextMove: action.nextMove,
                winCells: action.winCells
            };
        
        default:
            return state;
    }
}