import ActionType from '../constants/actionTypes';

export default function actionResetGame(nextMove) {
    return {
        type: ActionType.RESET_GAME,
        nextMove
    };
}