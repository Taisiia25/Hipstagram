import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { fetchCurrentUser } from '../reducers/profileReducer/profileReducer';
import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect} from 'react';
import Header from '../containers/Header/Header';

const ProtectedRoute = () => {
  const { access_token } = useSelector((state) => state.auth)

 
  // show unauthorized screen if no user is found in redux store
  if (!access_token) {
    return (
        <Navigate to="/login" replace />
    )
  }

  // returns child route elements
  return <>
            <Header />
            <Outlet />
        </>
}
export default ProtectedRoute