import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import Game from './game';
import fetchInfo from '../actions/actionGetInfo';
import logo from '../logo.svg';

function Homepage(props) {
    
    // Prevent playing game
    const { actions } = props;
    const { didInvalidate } = props;
    const { isFetching } = props;
    const { userInfo } = props;

    // If it is already invalidate
    if (didInvalidate) {
        return (
            <center>
                <img src={logo} className='App-logo-big' alt='logo' />
                <div className='status'>ĐĂNG NHẬP ĐỂ TIẾP TỤC</div>
                <Button className='logout-button' variant='info' onClick={() => window.location.href = '/login'}>Đăng nhập</Button>
            </center>
        );
    }
    // If it is not invalidate (REQUESTING or SUCCESS or 'FIRST TIME ENTER')
    else {

        // If success, we have to directly pass userInfo cause state will lose after redirecting
        if (userInfo) {
            return (<Game userInfo={userInfo}/>);
        }

        // If first time enter, this make sure not call a loop request
        else if (!isFetching) {
            const token = localStorage.getItem('token');
            actions.fetchInfo(token);
        }
            
        return (
            <center>
                <img src={logo} className='App-logo-big' alt='logo' />
                <div className='status'>ĐANG KẾT NỐI</div>
            </center>
        );
    }
}

// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.infoReducers.isFetching,
        didInvalidate: state.infoReducers.didInvalidate,
        userInfo: state.infoReducers.userInfo,
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchInfo
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);