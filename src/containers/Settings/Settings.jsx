import React, {useEffect}  from "react";
import AnautorizedLayout from '../../components/AnautorizedLayout/AnautorizedLayout';
import './style.scss';
import { Button, Form, Input, message, Upload } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../reducers/authReducer/reducer';
import { useNavigate } from 'react-router-dom'; 
import { UserOutlined } from '@ant-design/icons';
import { updateCurrentUser, updatePassword } from '../../reducers/profileReducer/profileReducer';
import { UploadOutlined } from '@ant-design/icons';

const Settings = () => {

    const currentUser = useSelector(state => state.profile);

    const dispatch = useDispatch()

    const handlerSubmit = (values) => {
        dispatch(updateCurrentUser(values))
    }
    useEffect(() => {
        if(currentUser.updateError) {
            message.error(currentUser.updateError);
        }
    }, [currentUser.updateError]) 

    useEffect(() => {
        if(currentUser.isUpdateLoaded) {
            message.success('Settings have been updated')
        }

    }, [currentUser.isUpdateLoaded])

    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
    };

    const onChangeFile  = (info) => {
        const file = info.file;
        getBase64(file)
            .then(result => {
                dispatch(updateCurrentUser({avatar: result}))
      })
    }

    const handlerSubmitPassword = (values) => {
        dispatch(updatePassword(values))
    }
    
  return currentUser.isLoading ? <div></div> : (
        <>
        <h3 className="header-settings">Settings</h3>
        <div className="settings">
            <div className="settings_avatar">
                {currentUser.avatar ? <img className="settings_avatar_img" src={currentUser.avatar} alt="" /> : 
                    <div className="settings_avatar_icon">
                        <UserOutlined />
                    </div>}
                    <Form.Item 
                        name="avatar"
                    >
                        <Upload name={'file'}  customRequest={onChangeFile} maxCount={1} showUploadList={false}>
                            <Button className="settings_avatar_button" type="primary" htmlType="submit">Change photo
                            </Button>
                        </Upload>
                    </Form.Item>
            </div>
                <Form className="settings_form_personal-info" initialValues={currentUser} onFinish={handlerSubmit} layout="vertical" >
                    <Form.Item 
                        name="login"
                        rules={[{required: true, message: 'Please input your login!' }]} 
                        label="Login"
                    >
                        <Input 
                            className="form_login-input" 
                            placeholder="Enter your login" 
                        />
                    </Form.Item>
                        <Form.Item 
                                name="firstName"
                                rules={[{required: true, message: 'Please input your firstName!' }, {max: 8, min: 2, type: "string"}]} 
                                label="First name" 
                            >
                                <Input 
                                    placeholder="Enter your firstName"
                                />
                            </Form.Item>
                            <Form.Item 
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your lastName!' }, {max: 8, min: 2, type: "string"}]} 
                                label="Last name"
                            >
                                <Input 
                                    placeholder="Enter your lastName"
                                />
                                </Form.Item>
                                <Form.Item 
                                name="email"
                                rules={[{ required: true, message: 'Please input your E-mail!' }, {type: "email"}]} 
                                label="E-mail" 
                                required 
                            >
                                <Input 
                                    placeholder="Enter your E-mail"
                                />
                            </Form.Item>
                            <Button className="settings_form_personal-info_button" type="primary" htmlType="submit">{currentUser.isUpdateLoading ? 'Loading...' : 'Save profile'}</Button>
        
                </Form>
                <Form className="settings_form_password" onFinish={handlerSubmitPassword} layout="vertical" >
                
                    <Form.Item 
                        name="password"
                        rules={[{ required: true, message: 'Enter your password' }, {max: 16, min: 8, type: "string"}]} 
                        label="Password" 
                        required 
                    >
                        <Input 
                            placeholder="Enter your password" 
                            type="password" 
                        />
                    </Form.Item>
                    <Form.Item 
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Confirm your password' }, {max: 16, min: 8, type: "string"}]} 
                        label="Password confirmation" 
                        required 
                    >
                        <Input 
                            placeholder="Confirm your password" 
                            type="password" 
                        />
                    </Form.Item>
                    <Button className="settings_form_password_button" type="primary" htmlType="submit">{currentUser.isPasswordLoading ? 'Loading...' : 'Save password'}</Button>
            </Form>
        </div>
    </>
  );
}

export default Settings;