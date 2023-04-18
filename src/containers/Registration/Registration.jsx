import React, {useEffect} from "react";
import AnautorizedLayout from '../../components/AnautorizedLayout/AnautorizedLayout';
import './style.scss';
import { Button, Form, Input } from 'antd';
import { fetchRegistration } from "../../reducers/regReducer/regReduser";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

const Registration = () => {

  const id = useSelector(state => state.reg.id);
  const loading = useSelector(state => state.reg.isLoading);
  const error = useSelector(state => state.reg.error);

  const dispatch = useDispatch()
  const handlerSubmit = (values) => {
      dispatch(fetchRegistration(values))
  }

  const navigate = useNavigate()
  useEffect(() => {
      if (id) {
          navigate('/login')
      }
  }, [navigate, id])

  return (
    <AnautorizedLayout>
        <>
            <h3 className="header_sign">Sign Up</h3>
            {error && <p className="error_message">{error}</p>}
            <Form onFinish={handlerSubmit} layout="vertical" className="form_registration">
                <Form.Item 
                    name="login"
                    rules={[{ required: true, message: 'Enter your login' }, {max: 30, min: 2, type: "string"}]} 
                    label="Login" 
                    required 
                >
                    <Input 
                        className="form_registration-input" 
                        placeholder="Enter your login" 
                    />
                </Form.Item>
                <Form.Item 
                    name="email"
                    rules={[{ required: true, message: 'Enter your email' }, {type: "email"}]} 
                    label="Email" 
                    required 
                >
                    <Input 
                        className="form_registration-input" 
                        placeholder="Enter your email" 
                        type="email"
                    />
                </Form.Item>
                <Form.Item 
                    name="password"
                    rules={[{ required: true, message: 'Enter your password' }, {max: 16, min: 8, type: "string"}]} 
                    label="Password" 
                    required 
                >
                    <Input 
                        className="form_registration-input" 
                        placeholder="Enter your password" 
                        type="password" 
                    />
                </Form.Item>
                <Button className="form_login-button" type="primary" htmlType="submit">{loading ? 'Loading...' : 'Sign Up'}</Button>
            </Form>
        </>
    </AnautorizedLayout>
  );
}

export default Registration;