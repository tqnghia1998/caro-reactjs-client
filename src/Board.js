import React, {Component} from 'react';
import Square from './Square';

function Board (props) {
    var rows = [];
    for (var i = 0; i < props.squares.length; i++) {
        var cols = [];
        for (var j = 0; j < props.squares[i].length; j++) {
            cols.push(<Square winCell={checkWinCell(props.winCells, i, j)}
                            value={props.squares[i][j]}
                            row={i}
                            col={j}
                            handleClick={(row, col) => props.handleClick(row, col)}></Square>);
        }
        rows.push(<div className="board-row">{cols}</div>);
    }
    return rows;
}

function checkWinCell(winCells, row, col) {
    if (winCells == null) {
        return false;
    }

    for (var i = 0; i < winCells.length; i++) {
        var curCell = winCells[i];
        if (curCell[0] == row && curCell[1] == col) {
            return true;
        }
    }
    return false;
}

export default Board;