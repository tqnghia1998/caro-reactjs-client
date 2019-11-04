import io from 'socket.io-client';

var socket = io('localhost:3000');
//var socket = io('https://btcn06-1612422.herokuapp.com');

export default socket;