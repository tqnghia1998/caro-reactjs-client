import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/login/login';

// Connect variables
function mapStateToProps(state) {
    return {
        
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);