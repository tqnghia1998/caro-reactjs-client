import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGame(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.LOGIN:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    didInvalidate: false,
                    message: action.message
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: true,
                    message: action.message
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: false,
                    message: action.message,
                    token: action.token
                }
            }
            else {
                return state;
            }
        
        default:
            return state;
    }
}