import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import Game from './game';
import fetchInfo from '../actions/actionGetInfo';
import actionJoinRoom from '../actions/actionJoinRoom';
import logo from '../logo.svg';
import socket from '../socket.io/socket.io';

function Homepage(props) {
    
    // Prevent playing game
    const { actions } = props;
    const { didInvalidate } = props;
    const { isFetching } = props;
    const { userInfo } = props;
    const { roomInfo } = props;

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

        // If success, create a room
        if (userInfo) {

            socket.removeAllListeners();
            socket.on('joinroom-success', function (roomInfo) {
                actions.actionJoinRoom(roomInfo);
            });

            if (roomInfo) {
                return <Game />
            }
            else {
                socket.emit('joinroom', userInfo);
                return (
                    <center>
                        <img src={logo} className='App-logo-big' alt='logo' />
                        <div className='status'>... ĐANG TÌM ĐỐI THỦ ...</div>
                    </center>
                );
            }
        }

        // If first time enter, this make sure not call a loop request
        else if (!isFetching) {
            const token = localStorage.getItem('token');
            actions.fetchInfo(token);
        }
        
        return (
            <center>
                <img src={logo} className='App-logo-big' alt='logo' />
                <div className='status'>... ĐANG KẾT NỐI ...</div>
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
        roomInfo: state.roomReducers.roomInfo
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchInfo,
            actionJoinRoom
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);