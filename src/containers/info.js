import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Info from '../components/info/info';
import fetchChangeInfo from '../actions/actionChangeInfo';

// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.infoReducers.isFetching,
        message: state.infoReducers.message
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchChangeInfo
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);