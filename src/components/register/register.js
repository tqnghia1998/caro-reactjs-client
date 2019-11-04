import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../login/css/login.css';

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');

    const { message } = props;
    const { actions } = props;
  
    function validateForm() {
        const { isFetching } = props;
        return !isFetching
            && username.length > 0
            && password.length > 0
            && repassword.length > 0
            && email.length > 0
            && fullname.length > 0;
    }
  
    function handleSubmit(event) {
        event.preventDefault();
        if (password !== repassword) {
            alert('Mật khẩu không trùng với nhau');
        }
        else {
            actions.fetchRegister(username, password, email, fullname);
        }
    }

    return (
        <div className='Login'>
            <center>
                <div className='status-login'><b>ĐĂNG KÝ TÀI KHOẢN</b></div>
            </center>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId='username'>
                    <FormLabel className='form-label'>Tên đăng nhập (bắt buộc)</FormLabel>
                    <FormControl
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type='username'/>
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel className='form-label'>Mật khẩu (bắt buộc)</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'/>
                </FormGroup>
                <FormGroup controlId='repassword'>
                    <FormLabel className='form-label'>Nhập lại mật khẩu (bắt buộc)</FormLabel>
                    <FormControl
                        value={repassword}
                        onChange={e => setRepassword(e.target.value)}
                        type='password'/>
                </FormGroup>
                <FormGroup controlId='email'>
                    <FormLabel className='form-label'>E-mail cá nhân (bắt buộc)</FormLabel>
                    <FormControl
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type='email'/>
                </FormGroup>
                <FormGroup controlId='fullname'>
                    <FormLabel className='form-label'>Họ tên (bắt buộc)</FormLabel>
                    <FormControl
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                        type='fullname'/>
                </FormGroup><br></br>
                <Button block disabled={!validateForm()} type='submit'>Đăng ký</Button>
            </form>
            <center className='link'>
                <Link to='/login'>Đăng nhập</Link><br></br><br></br>
                <p className='status-login-small'>{message}</p>
            </center>
        </div>
    );
}

export default Register;