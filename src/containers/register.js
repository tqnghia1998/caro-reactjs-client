import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Register from '../components/register/register';

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

export default connect(mapStateToProps, mapDispatchToProps)(Register);