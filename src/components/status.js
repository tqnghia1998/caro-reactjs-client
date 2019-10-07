import React from 'react';
import Config from '../constants/configs';

function Status(props) {
    const { winCells } = props;
    
    let message;
    if (winCells !== null) {
        const winner = props.nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
        message = `Chúc mừng ${  winner  } đã giành chiến thắng !`;
    }
    else {
        message = `Lượt đi kế tiếp: ${  props.nextMove}`;
    }
    return (
        <div className='status'>{message}</div>
    )
}

export default Status;