import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createBrowserRouter} from "react-router-dom";
import App from '../App'  
import Login from "../containers/Login/Login";
import Registration from "../containers/Registration/Registration";
import ProtectedRoute from './ProtectedRouter';
import UserDetailpage from '../containers/UserDetailPage/UserDetailPage';
import Feed from '../containers/Feed/Feed';
import Users from '../containers/Users/Users';
import Header from '../containers/Header/Header';
import Settings from '../containers/Settings/Settings';

  const RouterContainer = () => {
    return (
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Users />} />
            <Route path='/users' exact element={<Users />} />
            <Route path='/users/:id' element={<UserDetailpage />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/feed' element={<Feed />} />
          </Route>
        </Routes>
      </Router>
    )
  }

export default RouterContainer;