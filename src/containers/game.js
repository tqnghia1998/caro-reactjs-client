import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionClick from '../actions/actionClick';
import actionChangeSort from '../actions/actionChangeSort';
import actionJumpTo from '../actions/actionJumpTo';
import Board from '../components/board';
import Config from '../constants/configs';
import Status from '../components/status';
import logo from '../logo.svg';
import '../css/Game.css';

class Game extends Component {

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

    handleClick(row, col) {
        const { actions } = this.props
        const { attrs } = this.props;
        const { stepNumber } = attrs;
        const { history } = attrs;
        const { nextMove } = attrs;
        const { winCells } = attrs;

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
            const _winCells = this.checkWin(row, col, curMove, newHistory.length - 1);
            const _history  = newHistory.concat([{
                x: row,
                y: col,
                squares
            }]);

            // Call action
            actions.actionClick(_history, _nextMove, _winCells);
        }
    }

    jumpTo(stepNumber) {
        const { actions } = this.props
        const { attrs } = this.props;
        const { history } = attrs;

        const target = history[stepNumber];
        const curMove = stepNumber % 2 === 0 ? Config.oPlayer : Config.xPlayer;
        const nextMove = stepNumber % 2 !== 0 ? Config.oPlayer : Config.xPlayer;
        const winCells = this.checkWin(target.x, target.y, curMove, stepNumber);

        // Call action
        actions.actionJumpTo(stepNumber, nextMove, winCells);
    }

    render() {
        const { actions } = this.props
        const { attrs } = this.props;
        const { history } = attrs;
        const { stepNumber } = attrs;
        const { nextMove } = attrs;
        const { winCells } = attrs;
        const { accendingMode } = attrs;

        const current = history[stepNumber];

        // eslint-disable-next-line no-alert
        // eslint-disable-next-line no-undef
        // alert(stepNumber);
        // eslint-disable-next-line no-alert
        // eslint-disable-next-line no-undef
        // alert(history.length);

        const sortMode = accendingMode ? `Nước đi tăng dần` : `Nước đi giảm dần`;
        const moves = [];

        history.map((step, move) => {
            const content = move ? `Đến bước thứ #${
                Config.makeTwoDigits(move)}:
                (${Config.makeTwoDigits(history[move].x)},
                ${  Config.makeTwoDigits(history[move].y)})`
            : `Chơi lại từ đầu !`;
            const className = (move === stepNumber) ? `board-button-bold` : `board-button`;
            
            // Get current move
            const currentMove = (
                // eslint-disable-next-line react/no-array-index-key
                <li key={move}>
                    <button type='button' className={className}>{content}</button>
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
                        <button type='button' className='function-button' onClick={actions.actionChangeSort}><b>{sortMode}</b></button>
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

function mapStateToProps(state) {
    return {
        attrs: state.gameReducers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            actionClick,
            actionChangeSort,
            actionJumpTo
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);