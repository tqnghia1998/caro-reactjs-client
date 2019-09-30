import React, {Component} from 'react';
import logo from './logo.svg';
import Status from './Status';
import Config from './Config';
import Board from './Board';
import './css/Game.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                x: null,
                y: null,
                squares: Array(Config.brdSize).fill(null).map(a => { return Array(Config.brdSize).fill(null)})
            }],
            nextMove: Config.xPlayer,
            stepNumber: 0,
            winCells: null,
            accendingMode: true
        }
    }

    render() {
        const history = this.state.history;
        const stepNumber = this.state.stepNumber;
        const current = history[stepNumber];
        const nextMove = this.state.nextMove;
        const winCells = this.state.winCells;

        var moves = [];
        history.map((step, move) => {
            const content = move ? "Đến bước thứ #"
            + Config.makeTwoDigits(move) + ": (" + Config.makeTwoDigits(history[move].x) + ", " + Config.makeTwoDigits(history[move].y) + ")"
            : "Chơi lại từ đầu !";
            const className = (move == stepNumber) ? "board-button-bold" : "board-button";
            
            // Get current move
            var current = (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}
                            className={className}>{content}</button>
                </li>
            )

            // Push head or tail depends on sort mode
            if (this.state.accendingMode) {
                moves.push(current);
            }
            else {
                moves.splice(0, 0, current);
            }
        })

        const sortMode = this.state.accendingMode ? "Nước đi tăng dần" : "Nước đi giảm dần";

        return (
            <div className="App">
				<header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
					<Status nextMove={nextMove} winCells={winCells}></Status>
                    <div class="board-game">
                        <button className="function-button" onClick={() => this.changeSortMode()}><b>{sortMode}</b></button>
                        <div>
                            <Board winCells={winCells}
                                    squares={current.squares}
                                    handleClick={(i, j) => this.handleClick(i, j)}></Board>
                        </div>
                        <div>
                            <ol>{moves}</ol>
                        </div>
                    </div>
				</header>
            </div>
        );
    }

    changeSortMode() {
        this.setState({
            accendingMode: !this.state.accendingMode
        })
    }

    handleClick(row, col) {      
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        // Attention: Slice does not work properly with 2D array
        const squares = JSON.parse(JSON.stringify(current.squares));

        // It should be named 'curMove'
        const curMove = this.state.nextMove;
        const winCells = this.state.winCells;

        if (winCells == null && squares[row][col] == null) {

            // Assign value
            squares[row][col] = curMove;

            // Update next move
            var nextMove = curMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;

            this.setState({
                history: history.concat([{
                    x: row,
                    y: col,
                    squares: squares
                }]),
                stepNumber: history.length,
                nextMove: nextMove,
                winCells: this.checkWin(row, col, curMove, history.length - 1)
            });
        }
    }

    jumpTo(step)
    {
        const history = this.state.history;
        const target = history[step];
        const curMove = step % 2 == 0 ? Config.oPlayer : Config.xPlayer;
        const nextMove = step % 2 != 0 ? Config.oPlayer : Config.xPlayer;

        this.setState({
            stepNumber: step,
            nextMove: nextMove,
            winCells: this.checkWin(target.x, target.y, curMove, step)
        })
    }

    checkWin(row, col, user, step) {

        if (step == 0) {
            return null;
        }

        const history = this.state.history;
        const current = history[step];
        const squares = current.squares.slice();

        // Get coordinates
        var coorX = row;
        var coorY = col;
 
        var countCol = 1;
        var countRow = 1;
        var countMainDiagonal = 1;
        var countSkewDiagonal = 1;
        var isBlock;
        var rival = (user === Config.xPlayer) ? Config.oPlayer : Config.xPlayer;
 
        // Check col
        isBlock = true;
        var win_cells = [];
        while(--coorX >= 0 && squares[coorX][coorY] === user) {
            countCol++;
            win_cells.push([coorX, coorY]);
        }
        if (coorX >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        win_cells.push([coorX, coorY]);
        while(++coorX <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countCol++;
            win_cells.push([coorX, coorY]);
        }
        if (coorX <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        if (isBlock === false && countCol >= 5) return win_cells;
 
        // Check row
        isBlock = true;
        win_cells = [];
        while(--coorY >= 0 && squares[coorX][coorY] === user) {
            countRow++;
            win_cells.push([coorX, coorY]);
        }
        if (coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        win_cells.push([coorX, coorY]);
        while(++coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countRow++;
            win_cells.push([coorX, coorY]);
        }
        if (coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        if (isBlock === false && countRow >= 5) return win_cells;

        // Check main diagonal
        isBlock = true;
        win_cells = [];
        while(--coorX >= 0 && --coorY >= 0 && squares[coorX][coorY] === user) {
            countMainDiagonal++;
            win_cells.push([coorX, coorY]);
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        win_cells.push([coorX, coorY]);
        while(++coorX <= Config.brdSize - 1 && ++coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countMainDiagonal++;
            win_cells.push([coorX, coorY]);
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        if (isBlock === false && countMainDiagonal >= 5) return win_cells;

        // Check skew diagonal
        isBlock = true;
        win_cells = [];
        while(--coorX >= 0 && ++coorY >= 0 && squares[coorX][coorY] === user) {
            countSkewDiagonal++;
            win_cells.push([coorX, coorY]);
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        win_cells.push([coorX, coorY]);
        while(++coorX <= Config.brdSize - 1 && --coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countSkewDiagonal++;
            win_cells.push([coorX, coorY]);
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        if (isBlock === false && countSkewDiagonal >= 5) return win_cells;

        return null;
    }
}

export default Game;