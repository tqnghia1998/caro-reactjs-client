import React from 'react';
import Config from './Config';

function Square(props) {
    const { value } = props;
    const { winCell } = props;
    
    const moveColor = value === Config.xPlayer ? Config.plColor.X : Config.plColor.O;
    const className = winCell === false ? "square" : "square-win";
    return (
        <button type="button" className={className}
                onClick={() => props.handleClick(props.row, props.col)}>
            <font color={moveColor}>{value}</font>
        </button>
    );
}

export default Square;