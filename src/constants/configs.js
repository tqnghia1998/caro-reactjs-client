import { Component } from 'react';

class Config extends Component {
    
    static brdSize = 20;

    static xPlayer = 'X';

    static oPlayer = 'O';

    static plColor = {
        X: 'red',
        O: 'blue'
    };

    static makeTwoDigits(src) {
        return (src < 10 ? `0${ src }` : src)
    }

    static initialState = {

        // This section is for login & register
        isFetching: false,
        message: null,

        // This section & isFetching are for getting info
        didInvalidate: false,
        userInfo: null,
        roomInfo: null,
        chatHistory: [],

        // This section is for game play
        data: {
            history: [{
                x: null,
                y: null,
                squares: Array(Config.brdSize).fill(null).map(() => {
                    return Array(Config.brdSize).fill(null)
                })
            }],
            nextMove: Config.xPlayer,
            stepNumber: 0,
            winCells: null,
            accendingMode: false,
        }
    };
}

export default Config;