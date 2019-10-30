import React from 'react';
import Config from '../../constants/configs';

function Status(props) {
    const { winCells } = props;
    const { rivalname } = props;
    const { messages } = props;
    
    let message;

    if (rivalname === 'DISCONNECTED') {
        message = 'Đối thủ đã thoát khỏi phòng chơi !';
    }
    else if (messages) {
        message = messages;
    }
    else if (winCells !== null) {
        const winner = props.nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
        message = `Chúc mừng ${  winner  } đã giành chiến thắng !`;
    }
    else {
        message = `Lượt đi kế tiếp: ${  props.nextMove}`;
    }
    return (
        <div className='status'><b>{message}</b></div>
    )
}

export default Status;