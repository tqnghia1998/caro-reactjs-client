import React from 'react';
import Config from './Config';

function Status(props) {
    
    let message;
    if (props.winCells !== null) {
        let winner = props.nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
        message = `Chúc mừng ${  winner  } đã giành chiến thắng !`;
    }
    else {
        message = `Lượt đi kế tiếp: ${  props.nextMove}`;
    }
    return (
        <div className="status">{message}</div>
    )
}

export default Status;