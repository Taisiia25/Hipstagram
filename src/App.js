import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from './reducers/profileReducer/profileReducer';
import { useEffect } from 'react';
import './App.css';
import  Router from './router/router';



function App() {
  const { access_token } = useSelector((state) => state.auth)

  const userId = useSelector(state => state.profile.id);
  const loaded = useSelector(state => state.profile.isLoaded);
  const loading = useSelector(state => state.profile.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (access_token){
      console.log('hjhgclg')
      dispatch(fetchCurrentUser());
    }  
  }, [access_token])

  return (
    <Router/>
  );
}

export default App;
