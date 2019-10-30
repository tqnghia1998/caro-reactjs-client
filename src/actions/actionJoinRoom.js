import ActionType from '../constants/actionTypes';

export default function actionJoinRoom(roomInfo) {
    return {
        type: ActionType.JOIN_ROOM,
        roomInfo
    };
}