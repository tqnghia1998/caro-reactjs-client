import io from 'socket.io-client';
import config from '../config';

var socket = io(config['server-domain']);

export default socket;