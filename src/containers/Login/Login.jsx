import React, {useEffect}  from "react";
import AnautorizedLayout from '../../components/AnautorizedLayout/AnautorizedLayout';
import './style.scss';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../reducers/authReducer/reducer';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    console.log(auth)
    const handlerSubmit = (values) => {
        dispatch(fetchLogin(values))
    }
    

    const navigate = useNavigate()
    useEffect(() => {
        if (auth.access_token) {
            navigate('/')
        }
    }, [auth.access_token, navigate])

  return (
    <AnautorizedLayout>
        <>
            <h3 className="header_sign">Sign In</h3>
            {auth.error && <p className="error_message">Incorrect login or password</p>}
            <Form onFinish={handlerSubmit} layout="vertical" className="form_login">
                <Form.Item 
                    name="login"
                    rules={[{ required: true, message: 'Please input your login!' }]} 
                    label="Login" 
                    required 
                >
                    <Input 
                        className="form_login-input" 
                        placeholder="Enter your login" 
                    />
                </Form.Item>
                <Form.Item 
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]} 
                    label="Password" 
                    required 
                >
                    <Input 
                        className="form_login-input" 
                        placeholder="Enter your password" 
                        type="password" 
                    />
                </Form.Item>
                <Button className="form_login-button" type="primary" htmlType="submit">{auth.isLoading ? 'Loading...' : 'Sign In'}</Button>
            </Form>
        </>
    </AnautorizedLayout>
  );
}

export default Login;