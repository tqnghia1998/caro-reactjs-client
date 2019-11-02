import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/login/login';
import fetchLogin from '../actions/actionLogin';

// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.loginReducers.isFetching,
        message: state.loginReducers.message
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchLogin
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);