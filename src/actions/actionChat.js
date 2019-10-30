import ActionType from '../constants/actionTypes';

export default function actionChat(message) {
    return {
        type: ActionType.CHAT,
        message
    };
}