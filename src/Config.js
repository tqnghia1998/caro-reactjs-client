import {Component} from 'react';

class Config extends Component {
    static brdSize = 20;

    static xPlayer = "X";

    static oPlayer = "O";

    static plColor = {
        X: "red",
        O: "blue"
    };

    static makeTwoDigits(src) {
        return (src < 10 ? `0${ src }` : src)
    }
}

export default Config;