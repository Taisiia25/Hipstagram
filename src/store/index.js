import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import authReducer from '../reducers/authReducer/reducer';
import feedReducer from '../reducers/feedReducer/feedReducer';
import regReducer from '../reducers/regReducer/regReduser';
import profileReducer from '../reducers/profileReducer/profileReducer';
import usersReducer from '../reducers/usersReducer/usersReducer';
import userReducer from '../reducers/userReduser/userReducer';

export default configureStore({
    reducer: {
        auth: authReducer, 
        reg: regReducer,
        profile: profileReducer,
        users: usersReducer,
        user: userReducer,
        feed: feedReducer,
    },
})