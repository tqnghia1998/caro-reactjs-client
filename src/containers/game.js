import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionClick from '../actions/actionClick';
import actionChangeSort from '../actions/actionChangeSort';
import actionJumpTo from '../actions/actionJumpTo';
import Game from '../components/game/game';

// Connect variables
function mapStateToProps(state) {
    return {
        history: state.gameReducers.data.history,
        nextMove: state.gameReducers.data.nextMove,
        stepNumber: state.gameReducers.data.stepNumber,
        winCells: state.gameReducers.data.winCells,
        accendingMode: state.gameReducers.data.accendingMode
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            actionClick,
            actionChangeSort,
            actionJumpTo
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);