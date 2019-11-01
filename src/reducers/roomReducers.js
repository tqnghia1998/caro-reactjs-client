import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleRoom(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.JOIN_ROOM:
            return {
                ...state,
                roomInfo: action.roomInfo
            };
        
        case ActionType.CHAT:
            return {
                ...state,
                chatHistory: [...state.chatHistory, action.message]
            };
        
        case ActionType.REFRESH:
            return Config.initialState;
        
        default:
            return state;
    }
}