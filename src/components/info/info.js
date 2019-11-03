import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../login/css/login.css';

function Info(props) {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
    localStorage.setItem('userInfo', null);

    if (!userInfo) {
        window.location.href = '/';
        return;
    }

    const { message } = props;
    const { actions } = props;
  
    function validateForm() {
        const { isFetching } = props;
        const flag_1 = !isFetching && userInfo.username.length > 0 && userInfo.email.length > 0 && userInfo.fullname.length > 0;
        const flag_2 = (oldPassword.length === 0 && password.length === 0 && repassword.length === 0);
        const flag_3 = (oldPassword.length > 0 && password.length > 0 && repassword.length > 0);
        return flag_1 && (flag_2 || flag_3);
    }
  
    function handleSubmit(event) {
        event.preventDefault();
        if (password !== repassword) {
            alert('Mật khẩu mới không trùng với nhau');
        }
        else {
            actions.fetchChangeInfo(userInfo.username, oldPassword, password, userInfo.email, userInfo.fullname);
        }
    }
  
    return (
        <div className='Login'>
            <center>
                <div className='status-login'><b>CẬP NHẬT THÔNG TIN</b></div>
            </center>
            <form onSubmit={handleSubmit}>

                <FormGroup controlId='username'>
                    <FormLabel className='form-label'>Tên đăng nhập (không thể thay đổi)</FormLabel>
                    <FormControl
                        autoFocus
                        value={userInfo.username}
                        type='username'
                        readOnly />
                </FormGroup>

                <FormGroup controlId='oldpassword'>
                    <FormLabel className='form-label'>Mật khẩu cũ (bỏ trống nếu không đổi)</FormLabel>
                    <FormControl
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        type='password'/>
                </FormGroup>

                <FormGroup controlId='password'>
                    <FormLabel className='form-label'>Mật khẩu mới (bỏ trống nếu không đổi)</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'/>
                </FormGroup>

                <FormGroup controlId='repassword'>
                    <FormLabel className='form-label'>Nhập lại (bỏ trống nếu không cần đổi)</FormLabel>
                    <FormControl
                        value={repassword}
                        onChange={e => setRepassword(e.target.value)}
                        type='password'
                    />
                </FormGroup>

                <FormGroup controlId='email'>
                    <FormLabel className='form-label'>E-mail cá nhân (bắt buộc)</FormLabel>
                    <FormControl
                        value={userInfo.email}
                        onChange={e => setUserInfo({
                            ...userInfo,
                            email: e.target.value
                        })}
                        type='email'
                    />
                </FormGroup>

                <FormGroup controlId='fullname'>
                    <FormLabel className='form-label'>Họ tên (bắt buộc)</FormLabel>
                    <FormControl
                        value={userInfo.fullname}
                        onChange={e => setUserInfo({
                            ...userInfo,
                            fullname: e.target.value
                        })}
                        type='fullname' />
                </FormGroup>

                <br></br>

                <Button block disabled={!validateForm()} type='submit'>
                    Cập nhật
                </Button>
            </form>
            <center className='link'>
                <Link to='/'>Quay về trang chủ</Link><br></br><br></br>
                <p className='status-login-small'>{message}</p>
            </center>
        </div>
    );
}

export default Info;