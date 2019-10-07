import ActionType from '../constants/actionTypes';

export default function actionClick(history, nextMove, winCells) {
    return {
        type: ActionType.CLICK,
        history,
        nextMove,
        winCells
    };
}