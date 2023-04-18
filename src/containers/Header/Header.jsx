import React, { useMemo, useState, useCallback }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { logOut } from "../../reducers/authReducer/reducer";
import { useLocation, useMatch } from 'react-router-dom';
import { Input, Space } from 'antd';
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import { fetchUsers } from "../../reducers/usersReducer/usersReducer"

const { Search } = Input;


const Header = () => {
    const [searchName, setSearchName] = useState('')
    const userLogin = useSelector(state => state.user.login);
    // const feed = useSelector(state => state.feed);
    const dispatch = useDispatch();

    let location = useLocation();

    const isUserDetailPage = useMatch("users/:id");
    const isUserListPage = useMatch("users/");
    
    const onLogout = () => {
        dispatch(logOut())
    }

    const serchUsers = useCallback(() => {
        dispatch(fetchUsers(searchName))
    }, [searchName])

    const debouncedSendRequest = useMemo(() => {
        return debounce(serchUsers, 1000);
    }, [serchUsers]);

    const onSearch = (event) => {
        setSearchName(event.target.value)
        debouncedSendRequest()
    }
    

  return (
    <div className="header">
        <div className="header_options">
            <div>
                <Link className="header_options_title" to={'/users'}>
                    <h2>Hipstagram</h2>
                </Link>
            </div>
            { isUserDetailPage && <p className="header_login">{userLogin}</p> }
            <div>
                {isUserListPage && <Search value={searchName} className="header_options_search" placeholder="search user..." onChange={onSearch} style={{ width: 200 }}/>}
                <Link to={'/settings'}>
                    <UserOutlined className="header_options_profile-icon" />
                </Link>
                <LoginOutlined className="header_options_logout-icon" fontSize="30px" onClick={onLogout}/>
            </div>
        </div>
    </div>
  );
}

export default Header;