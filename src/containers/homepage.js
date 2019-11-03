import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import Game from './game';
import fetchInfo from '../actions/actionGetInfo';
import actionJoinRoom from '../actions/actionJoinRoom';
import actionRefresh from '../actions/actionRefresh';
import actionResetGame from '../actions/actionResetGame';
import Config from '../constants/configs';
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
                socket.joinroom = true;
                actions.actionJoinRoom(roomInfo);
            });
            socket.on('joinroom-success-ai', function (roomInfo) {
                socket.joinroom = true;
                actions.actionJoinRoom(roomInfo);
                actions.actionResetGame(Config.oPlayer);
            });

            // If found a rival, start game
            if (roomInfo) {
                return <Game />
            }
            // Choose to play with AI or other user
            else {
                return (
                    <center>
                        <img src={logo} className='App-logo-big' alt='logo' />
                        <div className='status'>... {userInfo.fullname.toUpperCase()} ...</div>
                        <div className='container-button-home'>
                            <Button className='home-buttons' variant='danger' onClick={(e) => findRival(e, userInfo)} as='input' type='button' value='Tìm đối thủ' onChange={() => { }}></Button>
                            <Button className='home-buttons' variant='primary' onClick={(e) => playWithAI(e, userInfo)}>Chơi với AI</Button>
                            <Button className='home-buttons' variant='success' onClick={() => changeInfo()}>Cập nhật thông tin</Button>
                            <Button className='home-buttons' variant='info' onClick={() => logOut()}>Đăng xuất</Button>
                        </div>
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

    function logOut() {
        localStorage.setItem('token', null);
        window.location.href = '/login';
        actions.actionRefresh();
    }

    function findRival(e, userInfo) {
        e.target.value = '..Đang chờ đối thủ..';
        e.target.disabled = true;
        socket.emit('joinroom', userInfo);
    }

    function playWithAI(e, userInfo) {
        e.target.disabled = true;
        socket.emit('joinroom-ai', userInfo);
    }

    function changeInfo() {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        window.location.href = '/changeinfo';
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
            actionJoinRoom,
            actionRefresh,
            actionResetGame
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);