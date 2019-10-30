import React, { useState } from 'react';
import { Button, Card, FormControl } from 'react-bootstrap';
import Board from './board';
import Config from '../../constants/configs';
import Status from './status';
import logo from '../../logo.svg';
import './css/game.css';
import socket from '../../socket.io/socket.io';
import ScrollToBottom from 'react-scroll-to-bottom';

function Game(props) {
    const { actions } = props;
    const { history } = props;
    const { stepNumber } = props;
    const { nextMove } = props;
    const { winCells } = props;
    const { accendingMode } = props;
    const { userInfo } = props;
    const { roomInfo } = props;

    // Setup socket
    setupSocket();

    // Setup chat engine
    const { chatHistory } = props;
    const [message, setMessage] = useState('');
    const chatHistoryUI = [];
    for (var i = 0; i < chatHistory.length; i++) {
        const color = chatHistory[i].sender === 'Mình' ? 'blue' : 'red';
        const style = { color: color };
        chatHistoryUI.push(<b style={style}>{chatHistory[i].sender}</b>);
        chatHistoryUI.push(': ' + chatHistory[i].message);
        chatHistoryUI.push(<br></br>);
    }

    // Setup disable state for components
    const needToDisable = (roomInfo.playerO === 'DISCONNECTED');

    // Setup board game
    const current = history[stepNumber];
    const sortMode = accendingMode ? `Nước đi tăng dần` : `Nước đi giảm dần`;
    const moves = [];

    history.map((step, move) => {
        const content = move ? `Xin về lượt #${
            Config.makeTwoDigits(move)}:
            (${Config.makeTwoDigits(history[move].x)},${Config.makeTwoDigits(history[move].y)})`
        : `Xin chơi lại từ đầu !`;
        const variant = (move === stepNumber) ? `danger` : `success`;
        
        // Get current move
        const currentMove = (
            // eslint-disable-next-line react/no-array-index-key
            <li key={move}>
                <Button onClick={() => jumpTo(move)} variant={variant} disabled={needToDisable}
                    className='board-button'>{content}</Button>
            </li>
        )

        // Push head or tail depends on sort mode
        if (accendingMode) {
            moves.push(currentMove);
        }
        else {
            moves.splice(0, 0, currentMove);
        }

        return moves;
    })

    // Setup players info
    const ourname = userInfo.fullname;
    const isPlayerX = ourname === roomInfo.playerX;
    const rivalname = isPlayerX ? roomInfo.playerO : roomInfo.playerX;

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <Status nextMove={nextMove} winCells={winCells} rivalname={roomInfo.playerO}/>
                <div className='board-game'>
                    <div>
                        {/* Our infomation */}
                        <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>[{isPlayerX ? `X` : `O`}] Mình [{isPlayerX ? `X` : `O`}]</Card.Title>
                                <Card.Text className='card-text-bold'><b>{ourname}</b></Card.Text>
                                <Button className='logout-button' variant='info' onClick={() => goHome()}>Trang chủ</Button>
                            </Card.Body>
                        </Card>
                        <br></br>
                        {/* Rival infomation */}
                        <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>[{!isPlayerX ? `X` : `O`}] Đối thủ [{!isPlayerX ? `X` : `O`}]</Card.Title>
                                <Card.Text className='card-text-bold'><b>{rivalname}</b></Card.Text>
                                <Button className='logout-button' variant='info' onClick={() => requestSurrender()}
                                        disabled={needToDisable}>Đầu hàng</Button>&nbsp;&nbsp;
                                <Button className='logout-button' variant='info' onClick={() => requestCeasefire()}
                                        disabled={needToDisable}>Xin hoà</Button>
                            </Card.Body>
                        </Card>
                        <br></br>
                        {/* Chat panel */}
                        <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>Nhắn tin</Card.Title>
                                <ScrollToBottom className='scroll-view-chat'>
                                    {chatHistoryUI}
                                </ScrollToBottom>
                                <form onSubmit={e => handleChat(e)}>
                                    <FormControl type='message'
                                        className='input-message'
                                        placeholder='Nhập và nhấn Enter'
                                        value={message}
                                        disabled={needToDisable}
                                        onChange={e => setMessage(e.target.value)}>
                                    </FormControl>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div>
                        <Board  winCells={winCells}
                                squares={current.squares}
                                handleClick={(i, j) => userClick(i, j)}/>
                    </div>
                    <div>
                        {/* Change sort mode */}
                        <Button className='change-sort-button' onClick={actions.actionChangeSort}>{sortMode}</Button>
                        <br></br>
                        <ScrollToBottom className='scroll-view' mode={accendingMode ? `bottom` : `top`}>
                            <ol >{moves}</ol>
                        </ScrollToBottom>
                    </div>
                </div>
            </header>
        </div>
    );

    function goHome() {
        window.location.href = '/';
    }

    function checkWin(row, col, user, stepNumber) {

        if (stepNumber === 0) {
            return null;
        }

        const { history } = props;
        const current = history[stepNumber];
        const squares = current.squares.slice();

        // Get coordinates
        let coorX = row;
        let coorY = col;
 
        let countCol = 1;
        let countRow = 1;
        let countMainDiagonal = 1;
        let countSkewDiagonal = 1;
        let isBlock;
        const rival = (user === Config.xPlayer) ? Config.oPlayer : Config.xPlayer;
 
        // Check col
        isBlock = true;
        let winCells = [];
        coorX -= 1;
        while(coorX >= 0 && squares[coorX][coorY] === user) {
            countCol += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
        }
        if (coorX >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        winCells.push([coorX, coorY]);
        coorX += 1;
        while(coorX <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countCol += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
        }
        if (coorX <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        if (isBlock === false && countCol >= 5) return winCells;
 
        // Check row
        isBlock = true;
        winCells = [];
        coorY -= 1;
        while(coorY >= 0 && squares[coorX][coorY] === user) {
            countRow += 1;
            winCells.push([coorX, coorY]);
            coorY -= 1;
        }
        if (coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        winCells.push([coorX, coorY]);
        coorY += 1;
        while(coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countRow += 1;
            winCells.push([coorX, coorY]);
            coorY += 1;
        }
        if (coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        if (isBlock === false && countRow >= 5) return winCells;

        // Check main diagonal
        isBlock = true;
        winCells = [];
        coorX -= 1;
        coorY -= 1;
        while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
            countMainDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
            coorY -= 1;
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        winCells.push([coorX, coorY]);
        coorX += 1;
        coorY += 1;
        while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countMainDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
            coorY += 1;
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        if (isBlock === false && countMainDiagonal >= 5) return winCells;

        // Check skew diagonal
        isBlock = true;
        winCells = [];
        coorX -= 1;
        coorY += 1;
        while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
            countSkewDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
            coorY += 1;
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        winCells.push([coorX, coorY]);
        coorX += 1;
        coorY -= 1;
        while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countSkewDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
            coorY -= 1;
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        if (isBlock === false && countSkewDiagonal >= 5) return winCells;

        return null;
    }

    function userClick(row, col) {
        const { nextMove } = props;
        const { roomInfo } = props;

        // Prevent user click if rival is disconnected
        if (roomInfo.playerO === 'DISCONNECTED') {
            return;
        }

        // Prevent user click if not his turn
        if ((isPlayerX && nextMove === Config.oPlayer) || (!isPlayerX && nextMove === Config.xPlayer)) {
            return;
        }
        
        // Send move to server
        socket.emit('move', { row: row, col: col });
        handleClick(row, col);
    }

    function handleClick(row, col) {
        const { actions } = props
        const { stepNumber } = props;
        const { history } = props;
        const { nextMove } = props;
        const { winCells } = props;

        // It should be named 'curMove'
        const curMove = nextMove;
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];

        // Attention: Slice does not work properly with 2D array
        const squares = JSON.parse(JSON.stringify(current.squares));

        if (winCells == null && squares[row][col] == null) {

            // Assign value
            squares[row][col] = curMove;
            const _nextMove = curMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
            const _winCells = checkWin(row, col, curMove, newHistory.length - 1);
            const _history  = newHistory.concat([{
                x: row,
                y: col,
                squares
            }]);

            // Call action
            actions.actionClick(_history, _nextMove, _winCells);
        }
    }

    function jumpTo(stepNumber) {
        const { actions } = props
        const { history } = props;

        const target = history[stepNumber];
        const curMove = stepNumber % 2 === 0 ? Config.oPlayer : Config.xPlayer;
        const nextMove = stepNumber % 2 !== 0 ? Config.oPlayer : Config.xPlayer;
        const winCells = checkWin(target.x, target.y, curMove, stepNumber);

        // Call action
        actions.actionJumpTo(stepNumber, nextMove, winCells);
    }

    function handleChat(e) {
        e.preventDefault();
        socket.emit('chat', message);
        setMessage('');
    }

    function setupSocket() {
        socket.removeAllListeners();
        socket.on('move', function (data) {
            handleClick(data.row, data.col);
        });
        socket.on('disconnect', function (data) {
            actions.actionJoinRoom(data);
        });
        socket.on('chat', function (data) {
            actions.actionChat(data);
        });
        socket.on('surrender-request', function (data) {
            if (window.confirm(`Đối thủ muốn đầu hàng ván này!`)) {
                socket.emit('surender-result', 'yes');
            }
            else {
                socket.emit('surender-result', 'no');
            }
        });
        socket.on('surrender-result', function (data) {
            if (data === `yes`) {
                alert(`Đối thủ đã chấp nhận!`);
            }
            else {
                alert(`Đối thủ đã từ chối!`);
            }
        });
        socket.on('ceasefire-request', function (data) {
            if (window.confirm(`Đối thủ muốn xin hoà ván này `)) {
                socket.emit('ceasefire-result', 'yes');
            }
            else {
                socket.emit('ceasefire-result', 'no');
            }
        });
        socket.on('ceasefire-result', function (data) {
            if (data === `yes`) {
                alert(`Đối thủ đã chấp nhận!`);
            }
            else {
                alert(`Đối thủ đã từ chối!`);
            }
        });
    }

    function requestSurrender(socket) {
        socket.emit('surender-request', userInfo.username);
    }

    function requestCeasefire(socket) {
        if (window.confirm(`Bạn muốn xin hoà ván này?`)) {
            socket.emit('ceasefire-request', userInfo.username);
        }
    }
}

export default Game;