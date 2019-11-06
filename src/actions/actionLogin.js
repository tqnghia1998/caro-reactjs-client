import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionLogin(status, message) {
    return {
        type: ActionType.LOGIN,
        status,
        message
    };
}

export default function fetchLogin(username, password) {

    return dispatch => {
  
        dispatch(actionLogin('REQUEST', 'Xin vui lòng đợi...'));

        return fetch(config['server-domain'] + 'users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionLogin('FAILED', 'Đã có lỗi xảy ra, vui lòng thử lại'));
            }
        )
        .then(json => {
            if (json.token) {

                // Redirect immediately, no need to dispatch SUCCESS action
                localStorage.setItem('token', json.token);
                window.location.href = '/';
            }
            else {
                dispatch(actionLogin('FAILED', json.message));
            }
        })
        .catch(err => {
            dispatch(actionLogin('FAILED', 'Đã có lỗi xảy ra, vui lòng thử lại'));
        })
    }
  }