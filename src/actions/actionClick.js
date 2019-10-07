import ActionType from '../constants/actionTypes';

export default function actionClick(attr) {
    return {
        type: ActionType.CLICK,
        attr
    };
}