import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import './css/login.css';
import config from '../../config';

function Login(props) {

    // Bad code for facebook redirect and get token
    const address = window.location.href;
    if (address.indexOf('?token=') !== -1) {
        var token = address.substr(address.indexOf('?token=') + '?token='.length);
        if (token.indexOf('#nghiatq') !== -1) {
            token = token.substr(0, token.indexOf('#nghiatq'));
        }
        localStorage.setItem('token', token);
        window.location.href = '/';
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { message } = props;
    const { actions } = props;
  
    function validateForm() {
        const { isFetching } = props;
        return !isFetching && username.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
        event.preventDefault();
        actions.fetchLogin(username, password);
    }

    return (
        <div className='Login'>
            <center>
                <img src={logo} className='App-logo-login' alt='logo' />
                <div className='status-login'><b>ĐĂNG NHẬP ĐỂ TIẾP TỤC</b></div>
            </center>
            <form onSubmit={handleSubmit}>

                <FormGroup controlId='username'>
                    <FormControl
                        autoFocus
                        placeholder='Tên đăng nhập'
                        type='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                </FormGroup>

                <FormGroup controlId='password'>
                    <FormControl
                        value={password}
                        placeholder='Mật khẩu'
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                </FormGroup>

                <Button block disabled={!validateForm()} type='submit' variant='success'>
                    Đăng nhập
                </Button>

                <Button className='social-button' onClick={() => goToFacebookLogin()}>
                    Facebook
                </Button>
                <Button className='social-button' variant='danger' onClick={() => goToGoogleLogin()}>
                    Google
                </Button>

            </form>
            <center className='link'>
                <Link to='/register'>Đăng ký tài khoản</Link><br></br><br></br>
                <p className='status-login-small'>{message}</p>
            </center>
        </div>
    );

    function goToFacebookLogin()
    {
        window.location.href = config['server-domain'] + 'users/login/facebook/';
    }

    function goToGoogleLogin()
    {
        window.location.href = config['server-domain'] + 'users/login/google/';
    }
}

export default Login;