import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/login.css';

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');

  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
  
    return (
        <div className='Login'>
            <center>
                <div className='status-login'><b>ĐĂNG KÝ TÀI KHOẢN</b></div>
            </center>
            <form onSubmit={handleSubmit}>

                <FormGroup controlId='username' bsSize='large'>
                    <FormLabel className='form-label'>Tên đăng nhập</FormLabel>
                    <FormControl
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type='username'/>
                </FormGroup>

                <FormGroup controlId='password' bsSize='large'>
                    <FormLabel className='form-label'>Mật khẩu</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                </FormGroup>

                <FormGroup controlId='repassword' bsSize='large'>
                    <FormLabel className='form-label'>Nhập lại mật khẩu</FormLabel>
                    <FormControl
                        value={repassword}
                        onChange={e => setRepassword(e.target.value)}
                        type='password'
                    />
                </FormGroup>

                <FormGroup controlId='email' bsSize='large'>
                    <FormLabel className='form-label'>E-mail cá nhân</FormLabel>
                    <FormControl
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type='email'
                    />
                </FormGroup>

                <FormGroup controlId='fullname' bsSize='large'>
                    <FormLabel className='form-label'>Họ tên</FormLabel>
                    <FormControl
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                        type='fullname'
                    />
                </FormGroup>

                <br></br>

                <Button block bsSize='large' disabled={!validateForm()} type='submit'>
                    Đăng ký
                </Button>
            </form>
            <center className='link'>
                <Link to='/login'>Đăng nhập</Link>
            </center>
        </div>
    );
}

export default Register;