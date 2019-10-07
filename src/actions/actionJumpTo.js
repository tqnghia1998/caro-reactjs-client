import ActionType from '../constants/actionTypes';

export default function actionJumpTo(stepNumber, nextMove, winCells) {
    return {
        type: ActionType.JUMP_TO,
        stepNumber,
        nextMove,
        winCells
    };
}