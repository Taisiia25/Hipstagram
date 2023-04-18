import React, {useState}  from "react";
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { logOut } from "../../reducers/authReducer/reducer";
import { useLocation, useMatch } from 'react-router-dom';
import { Button, Modal } from 'antd';
import useOnClickOutside from '../../../src/hooks/useOnClickOutside'


const Post = ({
  user, 
  post, 
  onTogleFollow, 
  isFollowing, 
  buttonLabel
  }) => {
  const [isOpen, setOpenModal] = useState(false);

  const onOpenPost = () => {
    setOpenModal(true)
  }

  const onClosePost = () => {
    setOpenModal(false)
  }

  // console.log(post)

  return (
    <>
    <div className="post" onClick={onOpenPost}>
       <img className="post_item" src={post.imgUrl}/>
    </div>
    <Modal className="post_modal" open={isOpen} onCancel={onClosePost}>
          <div className="post_content">
            <img className="post_content_picture" src={post.imgUrl}/>
            <div className="post_content_detail">
              <div  className="post_content_detail_main">
                <img className="post_content_detail_main_logo" src={user.avatar}/>
                <p className="post_content_detail_main_login">{user.login}</p>
                <Button className="post_content_detail_main_btn" type="text" htmlType="submit" danger={isFollowing} onClick={onTogleFollow}>{buttonLabel}</Button>
              </div>
              <h3 className="post_content_title">{user.login}: <span>{post.title}</span></h3>
            </div>
          </div>
          
    </Modal>
    </>
  );
}

export default Post;