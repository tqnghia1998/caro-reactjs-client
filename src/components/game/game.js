import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Board from './board';
import Config from '../../constants/configs';
import Status from './status';
import logo from '../../logo.svg';
import './css/game.css';

function Game(props) {
    const { actions } = props;
    const { history } = props;
    const { stepNumber } = props;
    const { nextMove } = props;
    const { winCells } = props;
    const { accendingMode } = props;
    const { userInfo } = props;
    const { fullname } = userInfo;

    const current = history[stepNumber];
    const sortMode = accendingMode ? `Nước đi tăng dần` : `Nước đi giảm dần`;
    const moves = [];

    console.log("CHANGECHANGE");

    history.map((step, move) => {
        const content = move ? `Lượt #${
            Config.makeTwoDigits(move)}:
            (${Config.makeTwoDigits(history[move].x)},${Config.makeTwoDigits(history[move].y)})`
        : `Chơi lại từ đầu !`;
        const variant = (move === stepNumber) ? `danger` : `success`;
        
        // Get current move
        const currentMove = (
            // eslint-disable-next-line react/no-array-index-key
            <li key={move}>
                <Button onClick={() => jumpTo(move)} variant={variant}
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

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <Status nextMove={nextMove} winCells={winCells} />
                <div className='board-game'>
                    <div>
                        <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>Thông tin</Card.Title>
                                <Card.Text className='card-text'>
                                    {fullname}
                                </Card.Text>
                                <Button className='logout-button' variant='info' onClick={() => logOut()}>Đăng xuất</Button>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Button className='function-button'
                                onClick={actions.actionChangeSort}>
                            {sortMode}
                        </Button>
                    </div>
                    
                    <div>
                        <Board  winCells={winCells}
                                squares={current.squares}
                                handleClick={(i, j) => handleClick(i, j)}/>
                    </div>
                    <div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </header>
        </div>
    );

    function logOut() {
        localStorage.setItem('token', null);
        window.location.href = '/login';
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
}

export default Game;