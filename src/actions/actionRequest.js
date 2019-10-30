import ActionType from '../constants/actionTypes';

export default function actionRequest(isRequesting, message) {
    return {
        type: ActionType.REQUEST,
        isRequesting,
        message
    };
}