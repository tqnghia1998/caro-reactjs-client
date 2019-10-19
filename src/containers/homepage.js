import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionClick from '../actions/actionClick';
import actionChangeSort from '../actions/actionChangeSort';
import actionJumpTo from '../actions/actionJumpTo';
import Game from '../components/homepage/game';

// Connect variables
function mapStateToProps(state) {
    return {
        history: state.gameReducers.history,
        nextMove: state.gameReducers.nextMove,
        stepNumber: state.gameReducers.stepNumber,
        winCells: state.gameReducers.winCells,
        accendingMode: state.gameReducers.accendingMode
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