import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import '../../css/login.css';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { message } = props;
    const { actions } = props;
  
    function validateForm() {
      return username.length > 0 && password.length > 0;
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

                <FormGroup controlId='username' bsSize='large'>
                    <FormControl
                        autoFocus
                        placeholder='Tên đăng nhập'
                        type='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                </FormGroup>

                <FormGroup controlId='password' bsSize='large'>
                    <FormControl
                        value={password}
                        placeholder='Mật khẩu'
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                </FormGroup>

                <Button block bsSize='large' disabled={!validateForm()} type='submit'>
                    Đăng nhập
                </Button>

            </form>
            <center className='link'>
                <Link to='/register' >Đăng ký tài khoản</Link><br></br><br></br>
                <p className='status-login-small'>{message}</p>
            </center>
        </div>
    );
}

export default Login;