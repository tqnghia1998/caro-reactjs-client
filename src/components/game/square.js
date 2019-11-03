import React from 'react';
import Config from '../../constants/configs';
import { Button } from 'react-bootstrap';

function Square(props) {
    const { value } = props;
    const { winCell } = props;
    const { isCurrentCell } = props;
    
    const moveColor = value === Config.xPlayer ? Config.plColor.X : Config.plColor.O;
    const className = isCurrentCell ? 'square-current' : (winCell === false ? 'square' : 'square-win');
    return (
        <Button className={className} variant="dark"
                onClick={() => props.handleClick(props.row, props.col)}>
            <font color={moveColor}>{value}</font>
        </Button>
    );
}

export default Square;