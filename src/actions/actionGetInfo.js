import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionGetInfo(status, userInfo) {
    return {
        type: ActionType.GET_INFO,
        status,
        userInfo
    };
}

export default function fetchInfo(token) {

    return dispatch => {
  
        dispatch(actionGetInfo('REQUEST'));

        var bearerToken = 'Bearer ' + token;

        return fetch(config['server-domain'] + 'me', {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionGetInfo('FAILED'));
            }
        )
        .then(json => {
            dispatch(actionGetInfo('SUCCESS', json));
        })
        .catch(err => {
            dispatch(actionGetInfo('FAILED'));
        })
    }
  }