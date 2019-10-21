import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';

export function actionLogin(status, message, token) {
    return {
        type: ActionType.LOGIN,
        status,
        message,
        token
    };
}

export default function fetchLogin(username, password) {

    return dispatch => {
  
        dispatch(actionLogin('REQUEST', 'Xin vui lòng đợi...'));

        return fetch('https://btcn06-1612422.herokuapp.com/users/login', {
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
                dispatch(actionLogin('SUCCESS', 'Đăng nhập thành công', json.token));
            }
            else {
                dispatch(actionLogin('FAILED', json.message));
            }
        })
    }
  }