import React from 'react';
import './style.scss';
import logo from '../../assets/logo_1.png';


const AnautorizedLayout = ({children}) => {
    return (
    <div className='anautorized_layout'>
            <div className='anautorized_layout-header'>
                <img className='logo' src={logo} alt="hipstagram logo" />
                <h1>HIPSTAGRAM</h1>
            </div>
            <div className='anautorized_layout-content'>{children}</div>
    </div>
    )
}

export default AnautorizedLayout;