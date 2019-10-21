import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleRegister(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.REGISTER:
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