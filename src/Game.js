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
                squares: Array(Config.brdSize).fill(null).map(() => { return Array(Config.brdSize).fill(null)})
            }],
            nextMove: Config.xPlayer,
            stepNumber: 0,
            winCells: null,
            accendingMode: true
        }
    }

    checkWin(row, col, user, step) {

        if (step === 0) {
            return null;
        }

        const {history} = this.state;
        const current = history[step];
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

    changeSortMode() {
        const { accendingMode } = this.state;
        this.setState({
            accendingMode: !accendingMode
        })
    }

    handleClick(row, col) {      
        const { stepNumber } = this.state;
        const { history } = this.state;
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];

        // Attention: Slice does not work properly with 2D array
        const squares = JSON.parse(JSON.stringify(current.squares));

        // It should be named 'curMove'
        const { nextMove } = this.state;
        const { winCells } = this.state;
        const curMove = nextMove;

        if (winCells == null && squares[row][col] == null) {

            // Assign value
            squares[row][col] = curMove;

            this.setState({
                history: newHistory.concat([{
                    x: row,
                    y: col,
                    squares
                }]),
                stepNumber: newHistory.length,
                nextMove: (curMove === Config.xPlayer) ? Config.oPlayer : Config.xPlayer,
                winCells: this.checkWin(row, col, curMove, newHistory.length - 1)
            });
        }
    }

    jumpTo(step)
    {
        const {history} = this.state;
        const target = history[step];
        const curMove = step % 2 === 0 ? Config.oPlayer : Config.xPlayer;
        const nextMove = step % 2 !== 0 ? Config.oPlayer : Config.xPlayer;

        this.setState({
            stepNumber: step,
            nextMove,
            winCells: this.checkWin(target.x, target.y, curMove, step)
        })
    }

    render() {
        const { history } = this.state;
        const { stepNumber } = this.state;
        const current = history[stepNumber];
        const { nextMove } = this.state;
        const { winCells } = this.state;
        const { accendingMode } = this.state;

        const moves = [];
        history.map((step, move) => {
            const content = move ? `Đến bước thứ #${
             Config.makeTwoDigits(move)  }: (${  Config.makeTwoDigits(history[move].x)  }, ${  Config.makeTwoDigits(history[move].y)  })`
            : `Chơi lại từ đầu !`;
            const className = (move === stepNumber) ? `board-button-bold` : `board-button`;
            
            // Get current move
            const currentMove = (
                // eslint-disable-next-line react/no-array-index-key
                <li key={move}>
                    <button type='button' onClick={() => this.jumpTo(move)}
                            className={className}>{content}</button>
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

        const sortMode = accendingMode ? `Nước đi tăng dần` : `Nước đi giảm dần`;

        return (
            <div className='App'>
				<header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
					<Status nextMove={nextMove} winCells={winCells} />
                    <div className='board-game'>
                        <button type='button' className='function-button' onClick={() => this.changeSortMode()}><b>{sortMode}</b></button>
                        <div>
                            <Board  winCells={winCells}
                                    squares={current.squares}
                                    handleClick={(i, j) => this.handleClick(i, j)}/>
                        </div>
                        <div>
                            <ol>{moves}</ol>
                        </div>
                    </div>
				</header>
            </div>
        );
    }
}

export default Game;