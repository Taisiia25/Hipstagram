import React, {useEffect}  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser, getFollowUserById, profileFollowingUser, cleanUser  } from "../../reducers/userReduser/userReducer";
import './style.scss';
import { Button } from 'antd';
import { LoadingOutlined} from '@ant-design/icons';
import Post from '../Post/Post'
import { UserOutlined } from '@ant-design/icons';


const UserDetailpage = () => {

    const user = useSelector(state => state.user);
    const profileFollowing = useSelector(state => state.profile.following);
    const isFollowIdLoading = useSelector(state => state.user.isFollowingLoading);
    const dispatch = useDispatch()
    
    let { id } = useParams();

    useEffect(() => {
        dispatch(fetchUser(id));
        dispatch(getFollowUserById(id))
    }, [dispatch])

    useEffect(() => {
        return () => {
            dispatch(cleanUser())
        }
    }, [dispatch])

    const onTogleFollow = () => {
        dispatch(profileFollowingUser({id, isFollowing}))
    }

    const isFollowing = profileFollowing.find((following) => following.id === id)
    const buttonLabel = isFollowIdLoading ? <LoadingOutlined /> : isFollowing ? 'Unfollow' : 'Follow';

  return (
    <>
    <div className="user-detail">
        <div className="user-detail_avatar">
            {user.avatar ? <img className="user-detail_avatar_img" src={user.avatar} alt="" /> : 
                <div className="user-detail_avatar_icon">
                    <UserOutlined />
                </div>}
        </div>
        
        <div className="user-detail_actions">
            <div className="user-detail_actions_info">
                <div>{user.posts.length} posts</div>
                <div className="user-detail_actions_info_followers">{user.followersCount} followers</div>
                <div>{user.followingsCount} followings</div>
            </div>
            <Button className="user-detail_btn" type="primary" htmlType="submit" danger={isFollowing} onClick={onTogleFollow}>{buttonLabel}</Button>
        </div>
    </div>
    <div className="user-detail-posts">
        {user.posts.map(post => 
            <Post 
                key={post._id} 
                onTogleFollow={onTogleFollow} 
                isFollowing={isFollowing} 
                buttonLabel={buttonLabel} 
                post={post} 
                user={user}
            />)}
    </div>
    </>
  );
}

export default UserDetailpage;