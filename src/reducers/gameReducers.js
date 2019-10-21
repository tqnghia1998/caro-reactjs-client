import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGame(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.CLICK:
            return {
                ...state,
                data: {
                    ...state.data,
                    history: action.history,
                    stepNumber: action.history.length - 1,
                    nextMove: action.nextMove,
                    winCells: action.winCells
                }
            }
        
        case ActionType.CHANG_SORT:
            return {
                ...state,
                data: {
                    ...state.data,
                    accendingMode: !state.accendingMode
                }
            };
        
        case ActionType.JUMP_TO:
            return {
                ...state,
                data: {
                    ...state.data,
                    stepNumber: action.stepNumber,
                    nextMove: action.nextMove,
                    winCells: action.winCells   
                }
            };
        
        default:
            return state;
    }
}