import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleLogin(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.LOGIN:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    message: action.message
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    message: action.message
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    message: action.message
                }
            }
            else {
                return state;
            }
        
        default:
            return state;
    }
}