import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGetInfo(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.GET_INFO:
            if (action.status === 'REQUEST') {
                return {
                    ...state,
                    isFetching: true,
                    didInvalidate: false,
                    userInfo: null,
                }
            }
            else if (action.status === 'FAILED') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: true,
                    userInfo: null
                }
            }
            else if (action.status === 'SUCCESS') {
                return {
                    ...state,
                    isFetching: false,
                    didInvalidate: false,
                    userInfo: action.userInfo
                }
            }
            else {
                return state;
            }
        
        default:
            return state;
    }
}