import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionClick from '../actions/actionClick';
import actionChangeSort from '../actions/actionChangeSort';
import actionJumpTo from '../actions/actionJumpTo';
import actionJoinRoom from '../actions/actionJoinRoom';
import actionChat from '../actions/actionChat';
import actionRequest from '../actions/actionRequest';
import actionResetGame from '../actions/actionResetGame';
import actionRefresh from '../actions/actionRefresh';
import Game from '../components/game/game';

// Connect variables
function mapStateToProps(state) {
    return {
        history: state.gameReducers.data.history,
        nextMove: state.gameReducers.data.nextMove,
        stepNumber: state.gameReducers.data.stepNumber,
        winCells: state.gameReducers.data.winCells,
        accendingMode: state.gameReducers.data.accendingMode,
        isFetching: state.gameReducers.isFetching,
        message: state.gameReducers.message,
        userInfo: state.infoReducers.userInfo,
        roomInfo: state.roomReducers.roomInfo,
        chatHistory: state.roomReducers.chatHistory
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            actionClick,
            actionChangeSort,
            actionJumpTo,
            actionJoinRoom,
            actionChat,
            actionRequest,
            actionResetGame,
            actionRefresh
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);