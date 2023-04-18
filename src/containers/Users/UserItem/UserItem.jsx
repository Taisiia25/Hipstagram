import React, {useEffect}  from "react";
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LoadingOutlined} from '@ant-design/icons';
import './style.scss';
import { Link } from "react-router-dom";

const UserItem = ({user, togleFollow, isFollowIdLoading}) => {

    const onTogleFollow = (event) => {
        event.stopPropagation()
        event.preventDefault()
        togleFollow(user._id)
    }
    const buttonLabel = isFollowIdLoading === user._id ? <LoadingOutlined /> : !user.isFollow ? 'Follow' : 'Unfollow';

    return (
        <Link to={`/users/${user._id}`}>
            <div className="user-item">
                {user.avatar ? <img className="user-item_img" src={user.avatar} alt="" /> : 
                <div className="user-item_icon">
                    <UserOutlined />
                </div>}
                <div className="user-item_login">{user.login}</div>
                <Button className="user-item_btn" type="primary" htmlType="submit" danger={user.isFollow} onClick={onTogleFollow}>{buttonLabel}</Button>
            </div>
        </Link>
        
    )
}

export default UserItem;

