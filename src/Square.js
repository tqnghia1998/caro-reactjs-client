import React from 'react';
import Config from './Config';

function Square(props) {
    let moveColor = props.value === Config.xPlayer ? Config.plColor.X : Config.plColor.O;
    let className = props.winCell === false ? "square" : "square-win";
    return (
        <button className={className}
                onClick={() => props.handleClick(props.row, props.col)}>
            <font color={moveColor}>{props.value}</font>
        </button>
    );
}

export default Square;