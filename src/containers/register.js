import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Register from '../components/register/register';
import fetchRegister from '../actions/actionRegister';

// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.registerReducers.isFetching,
        message: state.registerReducers.message
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchRegister
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);