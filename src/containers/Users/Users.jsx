import React, {useEffect, useCallback}  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, followUser } from "../../reducers/usersReducer/usersReducer";
import { LoadingOutlined, FrownOutlined } from '@ant-design/icons';
import './style.scss';
import UserItem from "./UserItem/UserItem";


const Users = () => {

    const users = useSelector(state => state.users.userList);
    const loading = useSelector(state => state.users.isLoading);
    const isFollowIdLoading = useSelector(state => state.users.isFollowIdLoading);
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(fetchUsers())
    }, [])

    const togleFollow = useCallback((userId) => {
        dispatch(followUser(userId))
    }, [dispatch, followUser])
    

  return loading ?
        <LoadingOutlined className="loading" /> : 
        ( 
        <div className="user-list">
            <div className="user-list_wrapper"> 

                {
                !users.length ?
                    <div className="text">
                        <p className="text-message">Users not found</p>
                        <FrownOutlined 
                            style={{fontSize: '100px', color: 'grey' }} 
                            className="text-icon"
                        />
                    </div> 
                :
                users.map(user => <UserItem key={user._id} user={user} togleFollow={togleFollow} isFollowIdLoading={isFollowIdLoading}/>)
                }
            </div>
        </div>
  )
}

export default Users;